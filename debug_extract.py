import sys, re, json5
sys.stdout.reconfigure(encoding='utf-8')

BACKSLASH = chr(92)

def extract(code):
    m = re.search(r'(?:var|let|const)\s+ENRICHED_\w+\s*=\s*\[', code)
    if not m:
        return None, None
    start = m.end() - 1
    depth = 0; i = start; in_s = False; esc = False; sc = None; end = start
    while i < len(code):
        ch = code[i]
        if esc:
            esc = False
        elif ch == BACKSLASH and in_s:
            esc = True
        elif in_s:
            if ch == sc:
                in_s = False
        elif ch in ('"', "'", '`'):
            in_s = True
            sc = ch
        elif ch in ('[', '{'):
            depth += 1
        elif ch in (']', '}'):
            depth -= 1
            if depth == 0:
                end = i + 1
                break
        i += 1
    return start, end

files = [
    r'js/axis-courses-enriched-9-32.js',
    r'js/axis-courses-enriched-33-36.js',
    r'js/axis-courses-enriched-37-56.js',
    r'js/axis-courses-enriched-57-80.js',
    r'js/axis-courses-enriched-81-112.js',
]

BASE = r'C:\Users\chauv\Documents\JE SUIS\je-suis-site\phosphene-studio'

for fname in files:
    fpath = BASE + '\\' + fname
    with open(fpath, 'r', encoding='utf-8', errors='replace') as f:
        code = f.read()
    s, e = extract(code)
    print(f'{fname}: start={s}, end={e}, len={e-s if e else 0}')
    if s and e:
        arr = code[s:e]
        print(f'  First 100: {repr(arr[:100])}')
        print(f'  Last 100: {repr(arr[-100:])}')
        try:
            data = json5.loads(arr)
            print(f'  Parsed OK: {len(data)} items')
        except Exception as ex:
            print(f'  Parse error: {ex}')
            # Find position of error
            err_str = str(ex)
            import re as re2
            m2 = re2.search(r'line (\d+) col(?:umn)? (\d+)', err_str)
            if m2:
                line_n = int(m2.group(1))
                lines = arr.split('\n')
                print(f'  Error line {line_n}: {repr(lines[line_n-1][:150]) if line_n <= len(lines) else "N/A"}')
    print()
