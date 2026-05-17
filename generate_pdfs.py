"""
generate_pdfs.py
Génère les 112 PDFs de cours (minimum 10 pages) pour l'École du Temple Vivant.
Usage: python generate_pdfs.py
"""

import os, sys, re, json, json5
from pathlib import Path
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm, mm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, PageBreak, KeepTogether
)
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

sys.stdout.reconfigure(encoding='utf-8')

BASE = Path(r'C:\Users\chauv\Documents\JE SUIS\je-suis-site\phosphene-studio')
ENRICHED_FILES = [
    'js/axis-courses-enriched-9-32.js',
    'js/axis-courses-enriched-33-36.js',
    'js/axis-courses-enriched-37-56.js',
    'js/axis-courses-enriched-57-80.js',
    'js/axis-courses-enriched-81-112.js',
]

# ── Couleurs ─────────────────────────────────────────────────────────────────
GOLD       = colors.HexColor('#8B6914')
DARK       = colors.HexColor('#1A1A1A')
IVORY      = colors.HexColor('#FEFDF8')
LIGHT_GRAY = colors.HexColor('#F0EFEA')
BORDER     = colors.HexColor('#D4C89A')

# ── Extraction JS → Python dict ───────────────────────────────────────────────
def extract_enriched_array(code):
    """Extrait le tableau ENRICHED_XX d'un fichier JS et le parse via json5."""
    m = re.search(r'(?:var|let|const)\s+ENRICHED_\w+\s*=\s*\[', code)
    if not m:
        return []
    start = m.end() - 1  # position du [
    depth = 0
    i = start
    in_s = False; esc = False; sc = None; end = start
    while i < len(code):
        ch = code[i]
        if esc: esc = False
        elif ch == '\\' and in_s: esc = True
        elif in_s:
            if ch == sc: in_s = False
        elif ch in ('"', "'", '`'):
            in_s = True; sc = ch
        elif ch in ('[', '{'): depth += 1
        elif ch in (']', '}'):
            depth -= 1
            if depth == 0: end = i + 1; break
        i += 1
    arr_str = code[start:end]
    try:
        return json5.loads(arr_str)
    except Exception as e:
        print(f"  json5 parse error: {e}", file=sys.stderr)
        return []

def load_all_enriched():
    enriched = {}
    for fname in ENRICHED_FILES:
        fpath = BASE / fname
        if not fpath.exists():
            continue
        code = fpath.read_text(encoding='utf-8', errors='replace')
        arr = extract_enriched_array(code)
        for item in arr:
            n = item.get('number')
            if n: enriched[n] = item
        print(f"  {fname}: {len(arr)} courses", file=sys.stderr)
    return enriched

def load_base_courses():
    """Extrait les titres et données de base depuis axis-apprendre-courses-1h.js."""
    fpath = BASE / 'js/axis-apprendre-courses-1h.js'
    code = fpath.read_text(encoding='utf-8', errors='replace')
    # Find all number + title pairs
    courses = {}
    # Pattern: "number": N, ... "title": "..."
    blocks = re.findall(r'\{\s*"id"\s*:\s*"(course-\d+[^"]*)".*?"number"\s*:\s*(\d+).*?"title"\s*:\s*"([^"]*)"', code[:600000], re.DOTALL)
    for id_, num, title in blocks:
        n = int(num)
        if n not in courses:
            courses[n] = {'id': id_, 'number': n, 'title': title}
    # Also try to get subtitle, family
    for m in re.finditer(r'"number"\s*:\s*(\d+)[^}]*?"subtitle"\s*:\s*"([^"]*)"', code[:600000], re.DOTALL):
        n = int(m.group(1))
        if n in courses: courses[n]['subtitle'] = m.group(2)
    for m in re.finditer(r'"number"\s*:\s*(\d+)[^}]*?"familyTitle"\s*:\s*"([^"]*)"', code[:600000], re.DOTALL):
        n = int(m.group(1))
        if n in courses: courses[n]['familyTitle'] = m.group(2)
    return courses

# ── Styles ReportLab ──────────────────────────────────────────────────────────
def make_styles():
    styles = getSampleStyleSheet()

    s_cover_title = ParagraphStyle('CoverTitle',
        fontSize=28, leading=36, textColor=DARK,
        alignment=TA_CENTER, spaceAfter=8, fontName='Helvetica-Bold')

    s_cover_sub = ParagraphStyle('CoverSub',
        fontSize=14, leading=20, textColor=GOLD,
        alignment=TA_CENTER, spaceAfter=6, fontName='Helvetica-Oblique')

    s_cover_school = ParagraphStyle('CoverSchool',
        fontSize=10, leading=14, textColor=colors.grey,
        alignment=TA_CENTER, fontName='Helvetica')

    s_h1 = ParagraphStyle('H1',
        fontSize=18, leading=24, textColor=GOLD,
        spaceBefore=18, spaceAfter=8,
        fontName='Helvetica-Bold', borderPadding=(0,0,4,0))

    s_h2 = ParagraphStyle('H2',
        fontSize=13, leading=18, textColor=DARK,
        spaceBefore=14, spaceAfter=6,
        fontName='Helvetica-Bold')

    s_h3 = ParagraphStyle('H3',
        fontSize=11, leading=15, textColor=DARK,
        spaceBefore=10, spaceAfter=4,
        fontName='Helvetica-BoldOblique')

    s_body = ParagraphStyle('Body',
        fontSize=10.5, leading=16, textColor=DARK,
        alignment=TA_JUSTIFY, spaceAfter=8,
        fontName='Helvetica')

    s_quote = ParagraphStyle('Quote',
        fontSize=11, leading=17, textColor=GOLD,
        alignment=TA_CENTER, spaceBefore=10, spaceAfter=10,
        fontName='Helvetica-Oblique',
        leftIndent=30, rightIndent=30)

    s_bullet = ParagraphStyle('Bullet',
        fontSize=10, leading=15, textColor=DARK,
        leftIndent=20, spaceAfter=4,
        fontName='Helvetica')

    s_label = ParagraphStyle('Label',
        fontSize=9, leading=12, textColor=colors.grey,
        fontName='Helvetica-BoldOblique', spaceAfter=2)

    s_footer = ParagraphStyle('Footer',
        fontSize=8, leading=10, textColor=colors.grey,
        alignment=TA_CENTER, fontName='Helvetica')

    s_box_title = ParagraphStyle('BoxTitle',
        fontSize=11, leading=15, textColor=GOLD,
        fontName='Helvetica-Bold', spaceAfter=4)

    s_box_body = ParagraphStyle('BoxBody',
        fontSize=10, leading=15, textColor=DARK,
        fontName='Helvetica', alignment=TA_JUSTIFY)

    s_number = ParagraphStyle('Number',
        fontSize=72, leading=80, textColor=colors.HexColor('#E8E0C8'),
        alignment=TA_CENTER, fontName='Helvetica-Bold')

    return {
        'cover_title': s_cover_title,
        'cover_sub': s_cover_sub,
        'cover_school': s_cover_school,
        'h1': s_h1, 'h2': s_h2, 'h3': s_h3,
        'body': s_body, 'quote': s_quote,
        'bullet': s_bullet, 'label': s_label,
        'footer': s_footer, 'box_title': s_box_title,
        'box_body': s_box_body, 'number': s_number,
    }

# ── Helpers ───────────────────────────────────────────────────────────────────
def txt(s):
    """Sanitize text for ReportLab."""
    if not s: return ''
    s = str(s)
    s = s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
    return s

def sep(story, color=BORDER):
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width='100%', thickness=0.5, color=color))
    story.append(Spacer(1, 8))

def section_box(story, title, content_paras, st):
    """Encadré avec titre doré et contenu."""
    inner = [[Paragraph(txt(title), st['box_title'])]]
    for p in content_paras:
        inner.append([p])
    t = Table(inner, colWidths=[14.5*cm])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#FDFCF5')),
        ('BOX', (0,0), (-1,-1), 0.8, BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(t)
    story.append(Spacer(1, 10))

def practice_box(story, title, items, st):
    """Encadré de pratique avec étapes numérotées."""
    rows = [[Paragraph(txt(title), st['box_title'])]]
    for i, step in enumerate(items, 1):
        rows.append([Paragraph(f"{i}. {txt(step)}", st['box_body'])])
    t = Table(rows, colWidths=[14.5*cm])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,0), colors.HexColor('#F5F2E8')),
        ('BACKGROUND', (0,1), (-1,-1), colors.HexColor('#FDFCF5')),
        ('BOX', (0,0), (-1,-1), 0.8, BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(t)
    story.append(Spacer(1, 10))

# ── Génération d'un PDF ───────────────────────────────────────────────────────
def generate_pdf(course, out_path, st):
    num = course.get('number', 0)
    title = course.get('title', f'Cours {num}')
    # Clean title: remove "Cours N — " prefix
    title_clean = re.sub(r'^Cours\s+\d+\s*[—-]\s*', '', title).strip()
    subtitle = course.get('subtitle', '')
    family = course.get('familyTitle', course.get('family', ''))
    long_summary = course.get('longSummary', course.get('summary', ''))
    short_summary = course.get('shortSummary', '')
    ped_obj = course.get('pedagogicalObjective', '')
    init_obj = course.get('initiaticObjective', '')
    essential = course.get('essentialPhrase', '')
    short_phrase = course.get('shortPhrase', '')
    teaching = course.get('teaching', {}) or {}
    teaching_intro = teaching.get('intro', '')
    sections = teaching.get('sections', []) or []
    minute_plan = course.get('minutePlan', course.get('plan', [])) or []
    practice = course.get('practice', {}) or {}
    contemplation = course.get('contemplation', {}) or {}
    journal_qs = course.get('journalQuestions', []) or []
    validation = course.get('validation', []) or []
    references = course.get('references', []) or []

    doc = SimpleDocTemplate(
        str(out_path),
        pagesize=A4,
        leftMargin=3*cm, rightMargin=2.5*cm,
        topMargin=2.5*cm, bottomMargin=2.5*cm,
        title=title_clean,
        author='École du Temple Vivant — Axis Lumen Studio'
    )

    story = []
    W = A4[0] - 5.5*cm  # usable width

    # ── PAGE DE COUVERTURE ────────────────────────────────────────────────────
    story.append(Spacer(1, 1.5*cm))
    story.append(Paragraph(f"{num:03d}", st['number']))
    story.append(Spacer(1, 0.3*cm))
    story.append(HRFlowable(width='80%', thickness=2, color=GOLD, hAlign='CENTER'))
    story.append(Spacer(1, 0.5*cm))
    story.append(Paragraph(txt(title_clean), st['cover_title']))
    if subtitle:
        story.append(Paragraph(txt(subtitle), st['cover_sub']))
    story.append(Spacer(1, 0.5*cm))
    story.append(HRFlowable(width='80%', thickness=1, color=BORDER, hAlign='CENTER'))
    story.append(Spacer(1, 0.8*cm))
    if family:
        story.append(Paragraph(txt(family), st['cover_school']))
    story.append(Paragraph("École du Temple Vivant  ·  Axis Lumen Studio", st['cover_school']))
    story.append(Spacer(1, 0.4*cm))
    story.append(Paragraph("Support pédagogique personnel — usage privé de l'élève", st['cover_school']))

    if essential:
        story.append(Spacer(1, 1.5*cm))
        story.append(Paragraph(f"« {txt(essential)} »", st['quote']))

    story.append(PageBreak())

    # ── SOMMAIRE ──────────────────────────────────────────────────────────────
    story.append(Paragraph("Sommaire", st['h1']))
    sep(story)
    toc_items = [
        "Introduction",
        "Objectifs pédagogique et initiatique",
        "Enseignement",
    ]
    if sections:
        for s in sections:
            toc_items.append(f"    · {s.get('title','')}")
    if minute_plan:
        toc_items.append("Plan de la séance d'une heure")
    toc_items.append("Pratique guidée")
    if contemplation:
        toc_items.append("Contemplation")
    toc_items.append("Journal de pratique")
    toc_items.append("Conclusion")
    if references:
        toc_items.append("Pour aller plus loin")

    for item in toc_items:
        prefix = "■ " if not item.startswith("    ") else "  ◦ "
        story.append(Paragraph(f"{prefix}{txt(item)}", st['bullet']))
    story.append(PageBreak())

    # ── INTRODUCTION ──────────────────────────────────────────────────────────
    story.append(Paragraph("Introduction", st['h1']))
    sep(story)
    if long_summary:
        for para in long_summary.split('\n'):
            if para.strip():
                story.append(Paragraph(txt(para.strip()), st['body']))
    elif short_summary:
        story.append(Paragraph(txt(short_summary), st['body']))
    else:
        story.append(Paragraph(
            f"Ce cours explore {txt(title_clean.lower())} dans le cadre de l'École du Temple Vivant. "
            "Il s'inscrit dans une progression pédagogique cohérente visant à développer la qualité "
            "de présence intérieure du pratiquant.",
            st['body']))
    story.append(Spacer(1, 0.5*cm))

    # ── OBJECTIFS ─────────────────────────────────────────────────────────────
    story.append(Paragraph("Objectifs du cours", st['h1']))
    sep(story)
    if ped_obj:
        story.append(Paragraph("Objectif pédagogique", st['h2']))
        story.append(Paragraph(txt(ped_obj), st['body']))
    if init_obj:
        story.append(Paragraph("Objectif initiatique", st['h2']))
        story.append(Paragraph(txt(init_obj), st['body']))
    if short_phrase:
        story.append(Spacer(1, 0.3*cm))
        story.append(Paragraph(f"« {txt(short_phrase)} »", st['quote']))
    story.append(PageBreak())

    # ── ENSEIGNEMENT ──────────────────────────────────────────────────────────
    story.append(Paragraph("Enseignement", st['h1']))
    sep(story)

    if teaching_intro:
        story.append(Paragraph(txt(teaching_intro), st['body']))
        story.append(Spacer(1, 0.3*cm))

    if sections:
        for sec in sections:
            s_title = sec.get('title', '')
            s_content = sec.get('content', '')
            story.append(Paragraph(txt(s_title), st['h2']))
            if s_content:
                for para in s_content.split('\n'):
                    if para.strip():
                        story.append(Paragraph(txt(para.strip()), st['body']))
            story.append(Spacer(1, 0.2*cm))
    elif teaching_intro:
        # Expand with generic content blocks
        story.append(Paragraph("Approfondissement", st['h2']))
        story.append(Paragraph(
            "Ce cours s'inscrit dans la progression de l'École du Temple Vivant. "
            "Chaque séance de pratique régulière contribue à l'intégration progressive des enseignements. "
            "La régularité sobre — dix minutes le matin et dix minutes le soir — produit des effets "
            "durables que ne peut pas produire une seule séance longue et irrégulière.",
            st['body']))
        story.append(Paragraph(
            "L'enseignement de ce cours repose sur l'observation directe et la pratique expérientielle. "
            "Aucune croyance préalable n'est requise. Il suffit d'observer avec honnêteté ce qui se passe "
            "dans la pratique et de noter les résultats dans le carnet d'expérience.",
            st['body']))

    story.append(PageBreak())

    # ── PLAN DE SÉANCE ────────────────────────────────────────────────────────
    story.append(Paragraph("Plan de la séance d'une heure", st['h1']))
    sep(story)
    if minute_plan:
        plan_data = [["Temps", "Étape", "Contenu"]]
        for step in minute_plan:
            t_val = step.get('time', '')
            ti_val = step.get('title', '')
            c_val = step.get('content', '')
            if isinstance(step, str):
                plan_data.append(['—', step, ''])
            else:
                plan_data.append([txt(t_val), txt(ti_val), txt(c_val)])
        col_widths = [2.8*cm, 3.5*cm, 8.2*cm]
        plan_table = Table(plan_data, colWidths=col_widths, repeatRows=1)
        plan_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), GOLD),
            ('TEXTCOLOR', (0,0), (-1,0), colors.white),
            ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
            ('FONTSIZE', (0,0), (-1,0), 9),
            ('FONTNAME', (0,1), (-1,-1), 'Helvetica'),
            ('FONTSIZE', (0,1), (-1,-1), 9),
            ('ROWBACKGROUNDS', (0,1), (-1,-1), [IVORY, LIGHT_GRAY]),
            ('BOX', (0,0), (-1,-1), 0.5, BORDER),
            ('INNERGRID', (0,0), (-1,-1), 0.3, BORDER),
            ('TOPPADDING', (0,0), (-1,-1), 5),
            ('BOTTOMPADDING', (0,0), (-1,-1), 5),
            ('LEFTPADDING', (0,0), (-1,-1), 6),
            ('RIGHTPADDING', (0,0), (-1,-1), 6),
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ('WORDWRAP', (0,0), (-1,-1), True),
        ]))
        story.append(plan_table)
    else:
        default_plan = [
            ("0–5 min", "Seuil", "Installation, respiration, intention courte."),
            ("5–20 min", "Introduction", "Présentation du thème du cours."),
            ("20–40 min", "Enseignement", "Corps de l'enseignement avec exemples et références."),
            ("40–50 min", "Pratique guidée", "Exercice de 10 minutes lié au cours."),
            ("50–57 min", "Carnet", "Note de pratique : état avant/après, observations."),
            ("57–60 min", "Clôture", "Retour au souffle naturel. Geste de fermeture."),
        ]
        plan_data = [["Temps", "Étape", "Contenu"]] + [[t, ti, c] for t, ti, c in default_plan]
        plan_table = Table(plan_data, colWidths=[2.8*cm, 3.5*cm, 8.2*cm], repeatRows=1)
        plan_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), GOLD),
            ('TEXTCOLOR', (0,0), (-1,0), colors.white),
            ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
            ('FONTSIZE', (0,0), (-1,0), 9),
            ('FONTNAME', (0,1), (-1,-1), 'Helvetica'),
            ('FONTSIZE', (0,1), (-1,-1), 9),
            ('ROWBACKGROUNDS', (0,1), (-1,-1), [IVORY, LIGHT_GRAY]),
            ('BOX', (0,0), (-1,-1), 0.5, BORDER),
            ('INNERGRID', (0,0), (-1,-1), 0.3, BORDER),
            ('TOPPADDING', (0,0), (-1,-1), 5),
            ('BOTTOMPADDING', (0,0), (-1,-1), 5),
            ('LEFTPADDING', (0,0), (-1,-1), 6),
            ('RIGHTPADDING', (0,0), (-1,-1), 6),
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ]))
        story.append(plan_table)

    story.append(PageBreak())

    # ── PRATIQUE GUIDÉE ───────────────────────────────────────────────────────
    story.append(Paragraph("Pratique guidée", st['h1']))
    sep(story)

    p_name = practice.get('name', 'Exercice de pratique')
    p_duration = practice.get('duration', '')
    p_intention = practice.get('intention', '')
    p_material = practice.get('material', '')
    p_posture = practice.get('posture', '')
    p_steps = practice.get('steps', []) or []
    p_safety = practice.get('safety', '')

    if p_name:
        story.append(Paragraph(txt(p_name), st['h2']))
    if p_duration:
        story.append(Paragraph(f"Durée : {txt(p_duration)}", st['label']))
    if p_intention:
        story.append(Paragraph(f"Intention : {txt(p_intention)}", st['body']))

    meta_items = []
    if p_material:
        meta_items.append(('Matériel', p_material))
    if p_posture:
        meta_items.append(('Posture', p_posture))

    for label, val in meta_items:
        story.append(Paragraph(f"<b>{txt(label)} :</b> {txt(val)}", st['body']))

    if p_steps:
        story.append(Spacer(1, 0.3*cm))
        practice_box(story, "Étapes de la pratique", p_steps, st)
    else:
        story.append(Paragraph(
            "Installez-vous confortablement. Fermez les yeux et prenez 3 respirations profondes. "
            "Portez votre attention sur le thème de ce cours. Observez ce qui se présente sans forcer. "
            "Restez dans cet espace d'observation pendant 10 à 15 minutes. Notez ensuite dans le carnet.",
            st['body']))

    if p_safety:
        story.append(Spacer(1, 0.3*cm))
        story.append(Paragraph(f"<i>Précaution : {txt(p_safety)}</i>", st['label']))

    story.append(PageBreak())

    # ── CONTEMPLATION ─────────────────────────────────────────────────────────
    story.append(Paragraph("Contemplation", st['h1']))
    sep(story)
    c_duration = contemplation.get('duration', '8 minutes')
    c_question = contemplation.get('question', '')
    c_guidance = contemplation.get('guidance', '')

    story.append(Paragraph(f"Durée recommandée : {txt(c_duration)}", st['label']))
    story.append(Spacer(1, 0.3*cm))

    if c_question:
        section_box(story, "Question de contemplation",
                   [Paragraph(txt(c_question), st['box_body'])], st)
    if c_guidance:
        story.append(Paragraph("Orientation intérieure", st['h2']))
        story.append(Paragraph(txt(c_guidance), st['body']))
    else:
        story.append(Paragraph(
            "Asseyez-vous en silence. Laissez la question résonner sans chercher une réponse immédiate. "
            "Observez simplement ce qui monte : images, sensations, mots, résistances. "
            "Ne jugez pas ce qui vient. Notez l'essentiel dans le carnet après la contemplation.",
            st['body']))

    story.append(Spacer(1, 0.5*cm))

    # ── JOURNAL DE PRATIQUE ───────────────────────────────────────────────────
    story.append(Paragraph("Journal de pratique", st['h1']))
    sep(story)

    if journal_qs:
        story.append(Paragraph("Questions pour le carnet", st['h2']))
        for q in journal_qs:
            story.append(Paragraph(f"■ {txt(q)}", st['bullet']))
        story.append(Spacer(1, 0.4*cm))

    # Tableau 21 jours
    story.append(Paragraph("Tableau de suivi — 21 jours", st['h2']))
    journal_data = [["Jour", "Durée", "État avant", "État après", "Note"]]
    for i in range(1, 22):
        journal_data.append([str(i), "", "", "", ""])
    j_table = Table(journal_data,
                    colWidths=[1.2*cm, 2*cm, 3.8*cm, 3.8*cm, 3.7*cm],
                    repeatRows=1)
    j_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), GOLD),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,0), 8),
        ('FONTNAME', (0,1), (-1,-1), 'Helvetica'),
        ('FONTSIZE', (0,1), (-1,-1), 8),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [IVORY, LIGHT_GRAY]),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.3, BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
        ('ALIGN', (0,0), (0,-1), 'CENTER'),
    ]))
    story.append(j_table)

    story.append(PageBreak())

    # ── VALIDATION ────────────────────────────────────────────────────────────
    if validation:
        story.append(Paragraph("Validation du cours", st['h1']))
        sep(story)
        story.append(Paragraph(
            "Cochez les cases lorsque vous estimez avoir intégré chaque point :", st['body']))
        story.append(Spacer(1, 0.3*cm))
        for v in validation:
            story.append(Paragraph(f"☐  {txt(v)}", st['bullet']))
        story.append(Spacer(1, 0.5*cm))

    # ── CONCLUSION ────────────────────────────────────────────────────────────
    story.append(Paragraph("Conclusion", st['h1']))
    sep(story)
    story.append(Paragraph(
        f"Le cours {num:03d} vous a donné les bases nécessaires pour {txt(title_clean.lower())}. "
        "Comme pour toutes les pratiques de l'École du Temple Vivant, ce qui compte "
        "n'est pas l'intensité d'une séance unique mais la régularité sobre sur plusieurs semaines. "
        "Les effets de ces pratiques sont cumulatifs : chaque séance, même courte, renforce le "
        "circuit et approfondit la qualité de la présence intérieure.",
        st['body']))
    story.append(Spacer(1, 0.3*cm))
    story.append(Paragraph(
        "Notez vos observations dans le carnet d'expérience. Ne cherchez pas à interpréter "
        "immédiatement — laissez le temps faire son œuvre. Revenez à ce cours après 7 et 21 jours "
        "pour relire vos notes et observer l'évolution.",
        st['body']))

    if references:
        story.append(Spacer(1, 0.5*cm))
        story.append(Paragraph("Pour aller plus loin", st['h2']))
        for ref in references:
            story.append(Paragraph(f"· {txt(ref)}", st['bullet']))

    story.append(PageBreak())

    # ── NOTES PERSONNELLES ────────────────────────────────────────────────────
    story.append(Paragraph("Notes personnelles", st['h1']))
    sep(story)
    story.append(Paragraph(
        "Espace libre pour vos observations, intuitions et questions personnelles "
        "au fil de la pratique de ce cours.",
        st['body']))
    story.append(Spacer(1, 0.5*cm))
    for _ in range(18):
        story.append(HRFlowable(width='100%', thickness=0.3, color=BORDER))
        story.append(Spacer(1, 0.75*cm))

    # ── BUILD PDF ─────────────────────────────────────────────────────────────
    def footer(canvas, doc):
        canvas.saveState()
        canvas.setFont('Helvetica', 7)
        canvas.setFillColor(colors.grey)
        short_t = title_clean[:50] + '...' if len(title_clean) > 50 else title_clean
        canvas.drawString(3*cm, 1.5*cm, f"Cours {num:03d} — {short_t}")
        canvas.drawRightString(A4[0] - 2.5*cm, 1.5*cm,
                               f"École du Temple Vivant  ·  p. {doc.page}")
        canvas.restoreState()

    doc.build(story, onFirstPage=footer, onLaterPages=footer)

# ── Main ──────────────────────────────────────────────────────────────────────
def main():
    print("=== Génération des 112 PDFs ===", file=sys.stderr)

    data_path = BASE / 'courses-data.json'
    print(f"Chargement des données depuis {data_path}...", file=sys.stderr)
    with open(data_path, 'r', encoding='utf-8') as f:
        courses_list = json.load(f)
    courses = {c['number']: c for c in courses_list if c.get('number')}
    print(f"  {len(courses)} cours chargés", file=sys.stderr)

    st = make_styles()

    ok = 0; errors = 0
    for num in sorted(courses.keys()):
        course = courses[num]
        # Find output path
        pack_dir = BASE / 'data' / 'courses' / f'Axis_Lumen_Cours_{num:03d}_PACK' / 'pdf'
        if not pack_dir.exists():
            pack_dir.mkdir(parents=True, exist_ok=True)

        title_slug = re.sub(r'[^\w\s-]', '', course.get('title', f'cours_{num}')).lower()
        title_slug = re.sub(r'[^a-z0-9]+', '_', title_slug)[:60]
        title_slug = re.sub(r'cours_\d+_', '', title_slug)
        out_name = f'Cours_{num:03d}_{title_slug}.pdf'

        # Remove old PDFs in this dir
        for old in pack_dir.glob('*.pdf'):
            old.unlink()

        out_path = pack_dir / out_name

        try:
            generate_pdf(course, out_path, st)
            ok += 1
            if num % 10 == 0 or num <= 5:
                print(f"  [{num:03d}] OK — {out_path.name}", file=sys.stderr)
        except Exception as e:
            print(f"  [{num:03d}] ERROR: {e}", file=sys.stderr)
            errors += 1

    print(f"\nTerminé : {ok} PDFs générés, {errors} erreurs", file=sys.stderr)

if __name__ == '__main__':
    main()
