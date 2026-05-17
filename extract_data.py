"""
extract_data.py - Extrait les données de cours directement depuis les fichiers JS
en lisant chaque champ individuellement par regex.
"""
import sys, re, json
sys.stdout.reconfigure(encoding='utf-8')

BACKSLASH = chr(92)

BASE = r'C:\Users\chauv\Documents\JE SUIS\je-suis-site\phosphene-studio'

def read_file(path):
    with open(path, 'r', encoding='utf-8', errors='replace') as f:
        return f.read()

def find_array_end(code, start):
    """Find the matching ] for [ at position start."""
    depth = 0
    i = start
    in_s = False
    esc = False
    sc = None
    while i < len(code):
        ch = code[i]
        if esc:
            esc = False
        elif in_s:
            if ch == BACKSLASH:
                esc = True
            elif ch == sc:
                in_s = False
        elif ch in ('"', "'"):
            in_s = True
            sc = ch
        elif ch in ('[', '{'):
            depth += 1
        elif ch in (']', '}'):
            depth -= 1
            if depth == 0:
                return i + 1
        i += 1
    return len(code)

def extract_string_value(code, pos):
    """Extract a JS string value starting at position pos (quote character)."""
    if pos >= len(code):
        return '', pos
    quote = code[pos]
    if quote not in ('"', "'", '`'):
        return '', pos
    i = pos + 1
    result = []
    while i < len(code):
        ch = code[i]
        if ch == BACKSLASH and quote != '`':
            i += 1
            if i < len(code):
                escaped = code[i]
                if escaped == 'n': result.append('\n')
                elif escaped == 't': result.append('\t')
                elif escaped == 'r': result.append('\r')
                else: result.append(escaped)
        elif ch == quote:
            return ''.join(result), i + 1
        else:
            result.append(ch)
        i += 1
    return ''.join(result), i

def parse_course_block(code, start, end):
    """Parse a course object from the JS code."""
    block = code[start:end]
    course = {}

    # Simple string fields
    str_fields = [
        'shortSummary', 'longSummary', 'pedagogicalObjective', 'initiaticObjective',
        'essentialPhrase', 'shortPhrase', 'subtitle', 'title', 'family',
        'familyTitle', 'id', 'summary'
    ]
    for field in str_fields:
        # Match: fieldname: "..." or fieldname: '...'
        m = re.search(rf'\b{re.escape(field)}\s*:\s*(["\'])', block)
        if m:
            val, _ = extract_string_value(block, m.start(1))
            course[field] = val

    # Number field
    m = re.search(r'\bnumber\s*:\s*(\d+)', block)
    if m:
        course['number'] = int(m.group(1))

    # Parse teaching object
    m_teaching = re.search(r'\bteaching\s*:\s*\{', block)
    if m_teaching:
        t_start = m_teaching.end() - 1
        t_end = find_array_end(block, t_start)
        t_block = block[t_start:t_end]

        m_intro = re.search(r'\bintro\s*:\s*(["\'])', t_block)
        if m_intro:
            val, _ = extract_string_value(t_block, m_intro.start(1))
            course.setdefault('teaching', {})['intro'] = val

        # Parse sections array
        m_secs = re.search(r'\bsections\s*:\s*\[', t_block)
        if m_secs:
            secs_start = m_secs.end() - 1
            secs_end = find_array_end(t_block, secs_start)
            secs_block = t_block[secs_start:secs_end]
            sections = []
            # Find each { title: ..., content: ... } block
            i = 0
            while i < len(secs_block):
                if secs_block[i] == '{':
                    obj_end = find_array_end(secs_block, i)
                    obj = secs_block[i:obj_end]
                    sec = {}
                    for fld in ('title', 'content'):
                        mm = re.search(rf'\b{fld}\s*:\s*(["\'])', obj)
                        if mm:
                            v, _ = extract_string_value(obj, mm.start(1))
                            sec[fld] = v
                    if sec:
                        sections.append(sec)
                    i = obj_end
                else:
                    i += 1
            course.setdefault('teaching', {})['sections'] = sections

    # Parse minutePlan array
    m_mp = re.search(r'\bminutePlan\s*:\s*\[', block)
    if m_mp:
        mp_start = m_mp.end() - 1
        mp_end = find_array_end(block, mp_start)
        mp_block = block[mp_start:mp_end]
        minute_plan = []
        i = 0
        while i < len(mp_block):
            if mp_block[i] == '{':
                obj_end = find_array_end(mp_block, i)
                obj = mp_block[i:obj_end]
                step = {}
                for fld in ('time', 'title', 'content'):
                    mm = re.search(rf'\b{fld}\s*:\s*(["\'])', obj)
                    if mm:
                        v, _ = extract_string_value(obj, mm.start(1))
                        step[fld] = v
                if step:
                    minute_plan.append(step)
                i = obj_end
            else:
                i += 1
        course['minutePlan'] = minute_plan

    # Parse practice object
    m_pr = re.search(r'\bpractice\s*:\s*\{', block)
    if m_pr:
        pr_start = m_pr.end() - 1
        pr_end = find_array_end(block, pr_start)
        pr_block = block[pr_start:pr_end]
        practice = {}
        for fld in ('name', 'duration', 'intention', 'material', 'posture', 'safety'):
            mm = re.search(rf'\b{fld}\s*:\s*(["\'])', pr_block)
            if mm:
                v, _ = extract_string_value(pr_block, mm.start(1))
                practice[fld] = v
        # Steps array
        m_steps = re.search(r'\bsteps\s*:\s*\[', pr_block)
        if m_steps:
            st_start = m_steps.end() - 1
            st_end = find_array_end(pr_block, st_start)
            steps_block = pr_block[st_start:st_end]
            steps = []
            i = 0
            while i < len(steps_block):
                if steps_block[i] in ('"', "'"):
                    v, next_i = extract_string_value(steps_block, i)
                    if v:
                        steps.append(v)
                    i = next_i
                else:
                    i += 1
            practice['steps'] = steps
        course['practice'] = practice

    # Parse contemplation
    m_c = re.search(r'\bcontemplation\s*:\s*\{', block)
    if m_c:
        c_start = m_c.end() - 1
        c_end = find_array_end(block, c_start)
        c_block = block[c_start:c_end]
        contemplation = {}
        for fld in ('duration', 'question', 'guidance'):
            mm = re.search(rf'\b{fld}\s*:\s*(["\'])', c_block)
            if mm:
                v, _ = extract_string_value(c_block, mm.start(1))
                contemplation[fld] = v
        course['contemplation'] = contemplation

    # Parse journalQuestions array of strings
    m_jq = re.search(r'\bjournalQuestions\s*:\s*\[', block)
    if m_jq:
        jq_start = m_jq.end() - 1
        jq_end = find_array_end(block, jq_start)
        jq_block = block[jq_start:jq_end]
        qs = []
        i = 0
        while i < len(jq_block):
            if jq_block[i] in ('"', "'"):
                v, ni = extract_string_value(jq_block, i)
                if v: qs.append(v)
                i = ni
            else:
                i += 1
        course['journalQuestions'] = qs

    # Parse validation array
    m_v = re.search(r'\bvalidation\s*:\s*\[', block)
    if m_v:
        v_start = m_v.end() - 1
        v_end = find_array_end(block, v_start)
        v_block = block[v_start:v_end]
        vals = []
        i = 0
        while i < len(v_block):
            if v_block[i] in ('"', "'"):
                vv, ni = extract_string_value(v_block, i)
                if vv: vals.append(vv)
                i = ni
            else:
                i += 1
        course['validation'] = vals

    # Parse references array
    m_r = re.search(r'\breferences\s*:\s*\[', block)
    if m_r:
        r_start = m_r.end() - 1
        r_end = find_array_end(block, r_start)
        r_block = block[r_start:r_end]
        refs = []
        i = 0
        while i < len(r_block):
            if r_block[i] in ('"', "'"):
                rv, ni = extract_string_value(r_block, i)
                if rv: refs.append(rv)
                i = ni
            else:
                i += 1
        course['references'] = refs

    return course

def parse_enriched_file(code):
    """Find all course objects in an enriched file."""
    courses = []
    # Find start of ENRICHED array
    # Patterns: const ENRICHED = [ OR var ENRICHED_XX_YY = [
    m = re.search(r'(?:const|var|let)\s+ENRICHED[\w_]*\s*=\s*\[', code)
    if not m:
        return courses

    arr_start = code.rfind('[', m.start(), m.end())
    arr_end = find_array_end(code, arr_start)
    arr_block = code[arr_start:arr_end]

    # Find each { number: N, ... } block
    i = 0
    while i < len(arr_block):
        if arr_block[i] == '{':
            obj_end = find_array_end(arr_block, i)
            obj = arr_block[i:obj_end]
            # Only parse if it has a number field
            if re.search(r'\bnumber\s*:\s*\d+', obj):
                course = parse_course_block(obj, 0, len(obj))
                if course.get('number'):
                    courses.append(course)
            i = obj_end
        else:
            i += 1
    return courses

# ── Load all data ─────────────────────────────────────────────────────────────
enriched_files = [
    BASE + r'\js\axis-courses-enriched-9-32.js',
    BASE + r'\js\axis-courses-enriched-33-36.js',
    BASE + r'\js\axis-courses-enriched-37-56.js',
    BASE + r'\js\axis-courses-enriched-49-56.js',
    BASE + r'\js\axis-courses-enriched-57-80.js',
    BASE + r'\js\axis-courses-enriched-81-112.js',
]

all_enriched = {}
for fpath in enriched_files:
    code = read_file(fpath)
    arr = parse_enriched_file(code)
    for c in arr:
        n = c.get('number')
        if n:
            all_enriched[n] = c
    fname = fpath.split('\\')[-1]
    print(f"{fname}: {len(arr)} courses", file=sys.stderr)

print(f"Total enriched: {len(all_enriched)}", file=sys.stderr)

# Also extract basic course titles from main file
main_code = read_file(BASE + r'\js\axis-apprendre-courses-1h.js')
# Extract titles using JSON-style double quotes
base_courses = {}
for m in re.finditer(r'"number"\s*:\s*(\d+)', main_code):
    n = int(m.group(1))
    if n in base_courses:
        continue
    # Get surrounding block for title
    block_start = max(0, m.start() - 200)
    block_end = min(len(main_code), m.start() + 1000)
    block = main_code[block_start:block_end]
    tm = re.search(r'"title"\s*:\s*"([^"]+)"', block)
    stm = re.search(r'"subtitle"\s*:\s*"([^"]+)"', block)
    fm = re.search(r'"familyTitle"\s*:\s*"([^"]+)"', block)
    idm = re.search(r'"id"\s*:\s*"(course-[^"]+)"', block)
    base_courses[n] = {
        'number': n,
        'title': tm.group(1) if tm else f'Cours {n}',
        'subtitle': stm.group(1) if stm else '',
        'familyTitle': fm.group(1) if fm else '',
        'id': idm.group(1) if idm else f'course-{n:03d}',
    }

print(f"Base courses found: {len(base_courses)}", file=sys.stderr)

# Merge
final = {}
for n, b in base_courses.items():
    final[n] = dict(b)
for n, e in all_enriched.items():
    if n in final:
        final[n].update(e)
    else:
        final[n] = dict(e)

print(f"Total final: {len(final)}", file=sys.stderr)
stats_long = sum(1 for c in final.values() if c.get('longSummary'))
stats_secs = sum(1 for c in final.values() if c.get('teaching', {}).get('sections'))
print(f"With longSummary: {stats_long}, with teaching sections: {stats_secs}", file=sys.stderr)

# Save
out = sorted(final.values(), key=lambda c: c.get('number', 0))
with open(BASE + r'\courses-data.json', 'w', encoding='utf-8') as f:
    json.dump(out, f, ensure_ascii=False, indent=2)
print("Saved courses-data.json", file=sys.stderr)
