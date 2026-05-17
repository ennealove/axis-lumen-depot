import sys, json, re
sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\chauv\Documents\JE SUIS\je-suis-site\phosphene-studio\js\axis-apprendre-courses-1h.js', 'r', encoding='utf-8', errors='replace') as f:
    content = f.read()

# Find courses array
courses_pos = content.find('window.AXIS_ONE_HOUR_COURSES')
arr_start = content.find('[', courses_pos)

# Scan for balanced bracket close
depth = 0
i = arr_start
in_string = False
escape_next = False
str_char = None
arr_end = arr_start
while i < len(content):
    c = content[i]
    if escape_next:
        escape_next = False
    elif c == '\\' and in_string:
        escape_next = True
    elif in_string:
        if c == str_char:
            in_string = False
    elif c in ('"', "'"):
        in_string = True
        str_char = c
    elif c in ('[', '{'):
        depth += 1
    elif c in (']', '}'):
        depth -= 1
        if depth == 0:
            arr_end = i + 1
            break
    i += 1

print(f"Array: {arr_start} to {arr_end}", file=sys.stderr)
arr_str = content[arr_start:arr_end]

try:
    data = json.loads(arr_str)
    print(f"Parsed OK: {len(data)} courses", file=sys.stderr)

    # Now load enriched files
    enriched_files = [
        r'C:\Users\chauv\Documents\JE SUIS\je-suis-site\phosphene-studio\js\axis-courses-enriched-9-32.js',
        r'C:\Users\chauv\Documents\JE SUIS\je-suis-site\phosphene-studio\js\axis-courses-enriched-33-36.js',
        r'C:\Users\chauv\Documents\JE SUIS\je-suis-site\phosphene-studio\js\axis-courses-enriched-37-56.js',
        r'C:\Users\chauv\Documents\JE SUIS\je-suis-site\phosphene-studio\js\axis-courses-enriched-57-80.js',
        r'C:\Users\chauv\Documents\JE SUIS\je-suis-site\phosphene-studio\js\axis-courses-enriched-81-112.js',
    ]

    all_enriched = {}
    for ef in enriched_files:
        try:
            with open(ef, 'r', encoding='utf-8', errors='replace') as f:
                ec = f.read()
            # Find ENRICHED array
            m = re.search(r'(?:var|let|const)\s+ENRICHED_\w+\s*=\s*\[', ec)
            if not m:
                print(f"No ENRICHED array in {ef}", file=sys.stderr)
                continue

            es = m.end() - 1  # position of [
            depth2 = 0
            j = es
            in_s = False
            esc = False
            sc = None
            end_j = es
            while j < len(ec):
                ch = ec[j]
                if esc:
                    esc = False
                elif ch == '\\' and in_s:
                    esc = True
                elif in_s:
                    if ch == sc:
                        in_s = False
                elif ch in ('"', "'"):
                    in_s = True
                    sc = ch
                elif ch in ('[', '{'):
                    depth2 += 1
                elif ch in (']', '}'):
                    depth2 -= 1
                    if depth2 == 0:
                        end_j = j + 1
                        break
                j += 1

            arr2_str = ec[es:end_j]
            # Convert JS object shorthand to JSON (number: 9 -> "number": 9)
            # Replace unquoted keys
            arr2_str = re.sub(r'(?<!["\w])(\b[a-zA-Z_]\w*\b)\s*:', r'"\1":', arr2_str)
            # Fix double-quoted already quoted keys
            arr2_str = re.sub(r'"+"(\w+)"+"\s*:', r'"\1":', arr2_str)

            try:
                arr2 = json.loads(arr2_str)
                for item in arr2:
                    if item.get('number'):
                        all_enriched[item['number']] = item
                print(f"{ef}: {len(arr2)} enriched", file=sys.stderr)
            except Exception as e2:
                print(f"JSON parse error for {ef}: {e2}", file=sys.stderr)
                # Save failed parse for debugging
                with open(ef + '.failed.txt', 'w', encoding='utf-8') as dbg:
                    dbg.write(arr2_str[:2000])
        except Exception as ex:
            print(f"Error reading {ef}: {ex}", file=sys.stderr)

    # Merge
    for course in data:
        num = course.get('number')
        if num and num in all_enriched:
            course.update(all_enriched[num])

    # Save merged
    out_path = r'C:\Users\chauv\Documents\JE SUIS\je-suis-site\phosphene-studio\courses-data.json'
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Saved {len(data)} courses to {out_path}", file=sys.stderr)

    # Stats
    has_long = sum(1 for c in data if c.get('longSummary'))
    has_teaching = sum(1 for c in data if c.get('teaching', {}).get('sections'))
    print(f"With longSummary: {has_long}/{len(data)}", file=sys.stderr)
    print(f"With teaching sections: {has_teaching}/{len(data)}", file=sys.stderr)

except Exception as e:
    print(f"ERROR: {e}", file=sys.stderr)
    print(f"First 300 chars: {repr(arr_str[:300])}", file=sys.stderr)
