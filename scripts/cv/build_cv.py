"""Sober, ATS-friendly CV (US Letter, single column, built-in Helvetica)."""
import sys
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import HRFlowable, KeepTogether, ListFlowable, ListItem, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

OUT = sys.argv[1]
INK = HexColor("#111111")
MUTED = HexColor("#4a4a4a")
ACCENT = HexColor("#0f5257")

base = dict(fontName="Helvetica", alignment=TA_LEFT)
name = ParagraphStyle("name", **{**base, "fontName": "Helvetica-Bold"}, fontSize=20, leading=23, textColor=INK)
headline = ParagraphStyle("headline", **base, fontSize=10.5, leading=13.5, textColor=ACCENT)
contact = ParagraphStyle("contact", **base, fontSize=8.8, leading=11.5, textColor=MUTED)
section = ParagraphStyle("section", **{**base, "fontName": "Helvetica-Bold"}, fontSize=9.6, leading=12, textColor=ACCENT, spaceBefore=9, spaceAfter=2)
body = ParagraphStyle("body", **base, fontSize=9.2, leading=12.2, textColor=INK)
role = ParagraphStyle("role", **{**base, "fontName": "Helvetica-Bold"}, fontSize=9.6, leading=12.2, textColor=INK)
meta = ParagraphStyle("meta", **base, fontSize=8.8, leading=11.4, textColor=MUTED)
bullet = ParagraphStyle("bullet", **base, fontSize=9.0, leading=11.9, textColor=INK)

def link(url, text):
    return f'<link href="{url}" color="#0f5257">{text}</link>'

def heading(text):
    return [Paragraph(text.upper(), section), HRFlowable(width="100%", thickness=0.6, color=ACCENT, spaceBefore=0, spaceAfter=4)]

def bullets(items):
    return ListFlowable(
        [ListItem(Paragraph(t, bullet), leftIndent=11, value="-") for t in items],
        bulletType="bullet", start="-", bulletFontSize=8, leftIndent=11, bulletOffsetY=0,
    )

def entry(title, org, dates, place, items):
    head = Table(
        [[Paragraph(f"{title} <font color='#4a4a4a'>· {org}</font>", role), Paragraph(dates, ParagraphStyle("d", parent=meta, alignment=2))]],
        colWidths=[5.25 * inch, 1.85 * inch],
    )
    head.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 0)]))
    parts = [head]
    if place:
        parts.append(Paragraph(place, meta))
    parts += [Spacer(1, 2), bullets(items), Spacer(1, 6)]
    return KeepTogether(parts)

story = [
    Paragraph("Esteban Garzon", name),
    Paragraph("Civil engineer turned CTO · Data engineering, LLM agents, and evaluation", headline),
    Paragraph(
        "Quito, Ecuador (UTC-5, remote-ready) · estebandre2@hotmail.es · +593 99 678 8376 · "
        + link("https://www.estebangarzon.com", "estebangarzon.com") + " · "
        + link("https://www.linkedin.com/in/esteban-garzon2", "linkedin.com/in/esteban-garzon2") + " · "
        + link("https://github.com/estebandre2", "github.com/estebandre2"),
        contact,
    ),
    *heading("Summary"),
    Paragraph(
        "Five years moving from hydrology and energy engineering to production data pipelines and LLM agents. "
        "I design AI systems the way hydraulic structures are designed: sized for the worst case, with explicit margins. "
        "In practice that means numbers computed by code rather than by the model, no report without evidence, reproducible "
        "benchmarks before accuracy claims, and a person approving every write. I want to move into full-time empirical AI safety research.",
        body,
    ),
    *heading("Experience"),
    entry("Chief Technology Officer", "BynD Bits", "Mar 2026 – Present", "Quito, Ecuador", [
        "Lead technology strategy, software architecture, infrastructure, and the development, support, and design teams.",
        "Building an ERP for flooring and countertop operations (bids, jobs, scheduling, purchasing, shop production) with an AI document importer that drafts orders from PDFs; auto-commit is disabled and every write is approved by a person under permissions and row-level security.",
        "Set development, code-quality, and deployment standards; own vendor and platform selection.",
    ]),
    entry("External AI Consultant", "AI analytics company (confidential)", "Jan 2026 – Present", "Remote", [
        "Built an autonomous insight-discovery agent: 20 business hypotheses per run, filtered against a graveyard of past failures and validated on real data; at most five confirmed insights are reported, ranked by P&amp;L impact.",
        "Guardrail by design: the model never computes a reported figure. Python computes every number from raw SQL rows, and a run with no confirmed evidence produces no report.",
        "Designed reproducible SQL and data-accuracy benchmarks for an analytics agent platform, plus a conversational onboarding agent that connects client databases.",
        "Built a multitenant conversational BI studio and a document RAG assistant over SharePoint files (local model first, then a hosted model).",
    ]),
    entry("Data Engineer · AI-Driven Automation &amp; Business Intelligence", "EcuAssist", "Sep 2024 – Mar 2026", "Quito, Ecuador · for a U.S.-based stone and flooring manufacturer", [
        "Built the data infrastructure connecting Moraware, RFMS, Slabsmith, Samsara, CNC machine logs, and Microsoft Dynamics 365 through REST APIs and Python, with incremental near-real-time sync on Linux (cron, Supervisor).",
        "Delivered an ETL and BI layer on PostgreSQL and Power BI covering machine OEE, utilization and downtime, cutting output per shift, material yield, and job-level profitability.",
        "Wrote a custom RFMS API connector (token auth, pagination, data-quality controls) feeding COGS, gross-margin, and supplier-performance reporting.",
        "Trained scikit-learn and XGBoost models for predictive maintenance, anomaly detection, material-demand and cutting-waste forecasting.",
    ]),
    entry("Civil Engineering Consultant", "Public hydropower consultancy", "Sep 2024 – Dec 2024", "Ecuador · for Ecuador's public water company (EPA)", [
        "Authored the net-head evaluations for four hydropower plants at existing dams (Poza Honda, La Esperanza, Chone, Tahuín): drone photogrammetry with ground control points, Pix4Dmatic processing, and elevations read from dense point clouds.",
        "Built the energy evaluation tables (flows, gross and net head, turbine configurations, annual generation) and the powerhouse and substation sections.",
    ]),
    entry("Design Engineer", "Gringconstruc", "Jan 2022 – Sep 2024", "Quito, Ecuador", [
        "Energy assessment from a typical meteorological year, road design, and topography for the San Antonio 100 MW photovoltaic project (now in financing).",
        "Hydrology for three run-of-river plants (Río Verde 4.5 MW, Río Blanco 9 MW, Toabunche 9.5 MW) for prefeasibility and definitive studies, including maximum-flood modeling in HEC-HMS, HEC-RAS, and HEC-SSP.",
        "Led a 20 km² drone topographic survey; produced all project maps in ArcGIS and AutoCAD.",
    ]),
    *heading("Selected projects"),
    bullets([
        "<b>Real-time structural-break detection</b> (ADIA Lab challenge): causal detectors, evidence trees, and a mixture of experts under a strict no-look-ahead constraint; best official time-stratified AUC 0.632. Questioned whether the evaluation series could be exploited by competitors.",
        "<b>Engineering report generators</b> (Python): solar resource reports from four irradiance sources with BSRN quality control, ground-station bias correction, and P50/P90 yield; a hydrology pipeline (GR2M rainfall-runoff, flood frequency, sediments) covered by 17 test files.",
        "<b>" + link("https://www.estebangarzon.com", "estebangarzon.com") + "</b>: an interactive portfolio rendered on a real contour survey, with tested scene math (flood frequency, contouring) and an automated anonymity guard.",
    ]),
    Spacer(1, 4),
    *heading("Education"),
    entry("M.Sc. Business Intelligence &amp; Data Science", "Universidad de Las Américas (UDLA)", "Feb 2025 – May 2026", "Quito, Ecuador", [
        "Thesis: monthly predictive model of residential construction permits in Texas (1990–2025) with ElasticNet, benchmarked against baselines and validated out of sample on 2025 · "
        + link("https://github.com/estebandre2/modelo-predictivo-construccion-texas", "public repository") + ".",
    ]),
    entry("B.Sc. Civil Engineering", "Universidad San Francisco de Quito (USFQ)", "Aug 2018 – Dec 2023", "Quito, Ecuador", [
        "Thesis: design of a hydroelectric plant on the Toabunche River, Intag Valley (hydrology, ArcGIS mapping, 3D intake model, conveyance design in Civil 3D).",
    ]),
    *heading("Skills"),
    Paragraph("<b>AI and ML:</b> LLM agents, evaluation and benchmarks, RAG, guardrail design, scikit-learn, XGBoost, time-series forecasting, change-point detection", body),
    Paragraph("<b>Data:</b> Python (pandas, SQLAlchemy), SQL, PostgreSQL, SQL Server, ETL, REST API integration, Power BI, Tableau", body),
    Paragraph("<b>Software:</b> TypeScript, Next.js, Linux, Git, automated testing", body),
    Paragraph("<b>Engineering:</b> hydrology and hydraulics (HEC-HMS, HEC-RAS, HEC-SSP), drone photogrammetry (Pix4D), ArcGIS, AutoCAD, Civil 3D, energy yield", body),
    Paragraph("<b>Languages:</b> Spanish (native), English (full professional proficiency)", body),
]

doc = SimpleDocTemplate(
    OUT, pagesize=letter, leftMargin=0.7 * inch, rightMargin=0.7 * inch, topMargin=0.6 * inch, bottomMargin=0.6 * inch,
    title="Esteban Garzon - CV", author="Esteban Garzon", subject="Curriculum vitae",
)
doc.build(story)
print("ok")
