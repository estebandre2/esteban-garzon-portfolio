export type Project = {
  title: string;
  tag: string;
  summary: string;
  outcome: string;
  stack: string[];
  accent: string;
};

export type CodeSample = {
  id: string;
  title: string;
  file: string;
  category: string;
  summary: string;
  notes: string[];
  snippet: string;
};

export type ResourceItem = {
  title: string;
  tag: string;
  summary: string;
  points: string[];
  downloadHref: string;
  repoHref?: string;
};

export type LabSignal = {
  label: string;
  value: string;
  detail: string;
};

export type LabTrack = {
  title: string;
  summary: string;
  points: string[];
};

export type LabRequirement = {
  title: string;
  detail: string;
};

export type LabWorkflowStep = {
  step: string;
  title: string;
  detail: string;
};

export type LabGuide = {
  title: string;
  audience: string;
  summary: string;
  requirements: string[];
  steps: string[];
  outputs: string[];
};

export const profile = {
  name: "Esteban Garzon",
  role: "CTO - Data, Automation, and AI Systems",
  heroEyebrow: "Civil engineer → Data engineer → CTO",
  heroTitle: "From watersheds to AI systems.",
  heroText:
    "I started in hydrology and energy: seven hydropower sites and a 100 MW solar project. I brought the same discipline into data pipelines, automation, and AI agents built to hold up in production.",
  linkedin: "https://www.linkedin.com/in/esteban-garzon2",
  email: "estebandre2@hotmail.es",
  phone: "+593996788376",
  resumeHref: "/downloads/resume/Esteban_Garzon_CV_Final.pdf",
};

export type Station = {
  id: "top" | "survey" | "transition" | "pipelines" | "ai" | "safety" | "gauging" | "career" | "contact";
  code: string;
  label: string;
};

export const stations: Station[] = [
  { id: "top", code: "STA. 01", label: "Watershed" },
  { id: "survey", code: "STA. 02", label: "Intake" },
  { id: "transition", code: "STA. 03", label: "Transition" },
  { id: "pipelines", code: "STA. 04", label: "Conduit" },
  { id: "ai", code: "STA. 05", label: "Powerhouse" },
  { id: "safety", code: "STA. 06", label: "Safety Factor" },
  { id: "gauging", code: "STA. 07", label: "Gauging Station" },
  { id: "career", code: "STA. 08", label: "Hydrograph" },
  { id: "contact", code: "STA. 09", label: "Grid" },
];

export type BridgeTool = {
  title: string;
  summary: string;
  proof: string;
  tags: string[];
};

/** The first tools where the engineering work itself became software. */
export const bridgeTools: BridgeTool[] = [
  {
    title: "Solar resource report generator",
    summary:
      "From coordinates and a client's electricity bills to a full engineering report: hourly irradiance from NASA POWER, PVGIS-ERA5, Open-Meteo, and NREL, quality control under BSRN criteria, ground-truth correction with INAMHI stations, P50/P90, and energy yield.",
    proof: "Every formula numbered, every data source validated in its own annex, every figure reproducible from code.",
    tags: ["Python", "Data quality", "Solar energy", "PDF/DOCX reports"],
  },
  {
    title: "Hydrology report generator",
    summary:
      "Rainfall-runoff modeling (GR2M), flood frequency, curve number, gap filling of station series, sediment yield, and energy with uncertainty, ending in GIS maps and a complete hydrological report.",
    proof: "17 test files cover the hydrology, from flood frequency to the energy integral.",
    tags: ["Python", "Hydrology", "Testing", "GIS"],
  },
  {
    title: "Drone photogrammetry to net head",
    summary:
      "Ground control points, Pix4Dmatic processing, and dense point clouds used to measure crest and powerhouse elevations for four public hydro plants.",
    proof: "No elevation was used until the ground-control quality report said it could be trusted.",
    tags: ["Drones", "Point clouds", "Pix4D", "Survey data"],
  },
];

export type Translation = { civil: string; ai: string; why: string };

/** The same engineering ideas, carried from water into data and AI. */
export const translations: Translation[] = [
  {
    civil: "100-year design flood",
    ai: "Worst-case evaluation",
    why: "You do not size a spillway for the average year, and you should not ship a model on its average benchmark.",
  },
  {
    civil: "Safety factor and freeboard",
    ai: "Guardrails and human approval",
    why: "Margin you hope never to use, built in before anything fails.",
  },
  {
    civil: "Stream gauging",
    ai: "Evals and monitoring",
    why: "You cannot manage a river you do not measure, and you cannot trust an agent you do not measure.",
  },
  {
    civil: "Topographic survey",
    ai: "Data discovery",
    why: "Before designing anything, map the terrain: which sources exist, where they are wrong, and what they hide.",
  },
  {
    civil: "Desander",
    ai: "Data validation and cleaning",
    why: "Remove what would erode the turbines downstream before it reaches them.",
  },
  {
    civil: "Design flow",
    ai: "Capacity and latency budget",
    why: "Size the conduit for the flow it has to carry, with headroom for the day it carries more.",
  },
];

export type CivilProject = {
  title: string;
  figure: string;
  unit: string;
  summary: string;
  tools: string[];
};

export const civilProjects: CivilProject[] = [
  {
    title: "San Antonio Solar Plant · Machala",
    figure: "100",
    unit: "MW",
    summary:
      "Energy assessment from a typical meteorological year, road design, and topographic analysis with field work for a 100 MW photovoltaic project, now in its financing stage.",
    tools: ["Solar resource", "Energy yield", "Road design", "Topography"],
  },
  {
    title: "Three run-of-river hydro plants",
    figure: "4.5 · 9 · 9.5",
    unit: "MW",
    summary:
      "Hydrological analysis of Río Verde, Río Blanco, and Toabunche for prefeasibility and definitive studies, including maximum-flood modeling.",
    tools: ["HEC-HMS", "HEC-RAS", "HEC-SSP", "Hydraulic design"],
  },
  {
    title: "Four hydro plants at existing dams · public consultancy",
    figure: "4",
    unit: "plants",
    summary:
      "For Ecuador's public water company (2024): net-head evaluation by drone photogrammetry with ground control points, energy analysis by flows and turbine count, and powerhouse and substation sections for Poza Honda, La Esperanza, Chone, and Tahuín.",
    tools: ["Pix4D", "Photogrammetry", "Energy analysis", "Structural sections"],
  },
  {
    title: "Drone topographic survey",
    figure: "20",
    unit: "km²",
    summary: "Drone survey, terrain processing, and every project map produced in ArcGIS and AutoCAD.",
    tools: ["Drones", "ArcGIS", "AutoCAD"],
  },
  {
    title: "Thesis · Toabunche hydro design, Intag valley",
    figure: "9.5",
    unit: "MW",
    summary:
      "Hydroelectric plant design integrating hydrology, ArcGIS mapping, satellite topography, a 3D model of the intake, and conveyance design in Civil 3D.",
    tools: ["Hydrology", "Civil 3D", "ArcGIS", "3D modeling"],
  },
  {
    title: "Potable water system · General Antonio Elizalde",
    figure: "—",
    unit: "",
    summary:
      "Academic design of a full water system: population growth analysis, intake, desander, conveyance, sedimentation and treatment tanks, and distribution.",
    tools: ["Population forecast", "Hydraulics", "Treatment alternatives"],
  },
];

export type AiSystem = {
  title: string;
  context: string;
  summary: string;
  guardrail: string;
  stack: string[];
};

export const aiSystems: AiSystem[] = [
  {
    title: "Autonomous insight-discovery agent",
    context: "External AI consultant · AI analytics company",
    summary:
      "Generates 20 business hypotheses per run, filters them against a graveyard of past failures, validates the rest against real data, and reports at most five confirmed insights ranked by P&L impact.",
    guardrail: "The model never computes a reported number. Python does, from raw SQL rows, and no confirmed insight means no report.",
    stack: ["LLM agents", "SQL", "Python", "Human review loop"],
  },
  {
    title: "SQL accuracy benchmarks + onboarding agent",
    context: "External AI consultant · AI analytics company",
    summary:
      "Reproducible SQL and data-accuracy benchmarks for an analytics agent platform, plus a conversational agent that connects a client's databases and turns business questions into guidelines.",
    guardrail: "Reproducible benchmark cases come before any claim of accuracy, and improvements must generalize across clients.",
    stack: ["Evals", "PostgreSQL", "SQL Server", "Agents"],
  },
  {
    title: "Conversational BI studio",
    context: "External AI consultant · AI analytics company",
    summary:
      "Builds executive dashboards from conversation across multiple databases, with filters and a multitenant architecture.",
    guardrail: "Tenant isolation by design: one client's data never reaches another client's conversation.",
    stack: ["Next.js", "Multitenancy", "LLMs", "Data visualization"],
  },
  {
    title: "Document RAG assistant",
    context: "External AI consultant",
    summary:
      "Answers questions over SharePoint and OneDrive Excel and PDF files with vector indexing and live document updates; started on a local model and moved to a hosted one.",
    guardrail: "Answers are grounded in the indexed documents, and updated files are re-indexed before they are quoted.",
    stack: ["RAG", "Vector search", "SharePoint", "Local + hosted LLMs"],
  },
  {
    title: "ERP AI document importer",
    context: "CTO · BynD Bits",
    summary:
      "Reads purchase PDFs and drafts orders inside a flooring and countertop ERP covering bids, jobs, scheduling, purchasing, and shop production.",
    guardrail: "Auto-commit is disabled: a person approves every write, with permissions and row-level security enforced.",
    stack: ["Document AI", "PostgreSQL RLS", "ERP", "Human approval"],
  },
  {
    title: "Deterministic claims pre-auditor",
    context: "Healthcare client",
    summary:
      "Validates and reconciles invoice PDFs against structured records, predicts likely claim rejections, and keeps versions, reasons, and a full audit trail.",
    guardrail: "No AI by design: when stakes are high, every decision has to be reproducible and auditable.",
    stack: ["Python", "Rules engine", "Audit trail"],
  },
];

export type SafetyGuard = {
  id: string;
  title: string;
  detail: string;
  threshold: number;
};

export const safetyGuards: SafetyGuard[] = [
  {
    id: "numbers-by-code",
    title: "Numbers come from code",
    detail: "Models write and classify; every reported figure is computed by deterministic code from source data.",
    threshold: 0,
  },
  {
    id: "no-evidence-no-report",
    title: "No evidence, no report",
    detail: "A claim that cannot be traced back to data is dropped instead of softened.",
    threshold: 0.25,
  },
  {
    id: "human-approves-writes",
    title: "A person approves every write",
    detail: "Agents draft; humans commit. Permissions and row-level security sit underneath.",
    threshold: 0.5,
  },
  {
    id: "deterministic-when-critical",
    title: "Deterministic when it is critical",
    detail: "Where an error is expensive, the system runs on rules that can be replayed and audited.",
    threshold: 0.75,
  },
];

export type CareerEvent = {
  start: string;
  end: string | null;
  title: string;
  org: string;
  kind: "civil" | "data" | "ai" | "education";
  summary: string;
};

export const careerEvents: CareerEvent[] = [
  {
    start: "2018-08",
    end: "2023-12",
    title: "B.Sc. Civil Engineering",
    org: "Universidad San Francisco de Quito",
    kind: "education",
    summary: "Hydraulics, hydrology, and project economics; thesis on the Toabunche hydro plant in the Intag valley.",
  },
  {
    start: "2022-01",
    end: "2024-09",
    title: "Design Engineer",
    org: "Gringconstruc",
    kind: "civil",
    summary: "Energy analysis for a 100 MW solar plant, hydrology for three hydro plants, and a 20 km² drone survey.",
  },
  {
    start: "2024-09",
    end: "2026-03",
    title: "Data Engineer · AI-Driven Automation & BI",
    org: "EcuAssist",
    kind: "data",
    summary:
      "ETL pipelines, API connectors, BI, and machine learning connecting ERP, production machines, logistics, and finance for a U.S.-based client.",
  },
  {
    start: "2025-02",
    end: "2026-05",
    title: "M.Sc. Business Intelligence & Data Science",
    org: "Universidad de Las Américas",
    kind: "education",
    summary: "Thesis: a monthly predictive model of residential construction permits in Texas with out-of-sample validation.",
  },
  {
    start: "2026-01",
    end: null,
    title: "External AI Consultant",
    org: "AI analytics company",
    kind: "ai",
    summary: "Autonomous analysis agents, accuracy benchmarks, conversational BI, and document RAG.",
  },
  {
    start: "2026-03",
    end: null,
    title: "Chief Technology Officer",
    org: "BynD Bits",
    kind: "ai",
    summary: "Technology strategy, architecture, and teams; an ERP with AI document import under human approval.",
  },
];

export const projects: Project[] = [
  {
    title: "Slab ETL Nexus",
    tag: "Data Pipeline",
    summary:
      "Production ETL that blends SQL Server, shop-floor Excel logs, and PostgreSQL into a trustworthy reporting layer for operations.",
    outcome:
      "Defensive deduplication, slab-level enrichment, atomic exports, and freshness checks that reduce operational friction and data drift.",
    stack: ["Python", "PostgreSQL", "SQL Server", "ETL", "Operations"],
    accent: "var(--cyan)",
  },
  {
    title: "Moraware Sync Engine",
    tag: "Sync Infrastructure",
    summary:
      "A multiprocessing sync engine that collects fabrication, CAD, and install activity and restructures it into analytics-ready records.",
    outcome:
      "Parallel processing, resilient logging, notes normalization, and vendor resolution to surface cleaner business signals from noisy source systems.",
    stack: ["Python", "PostgreSQL", "API Sync", "Concurrency", "Monitoring"],
    accent: "var(--amber)",
  },
  {
    title: "Ops Board Bridge",
    tag: "Workflow Automation",
    summary:
      "A data bridge that transforms operational status into structured task cards and visible execution layers for the team.",
    outcome:
      "Less manual coordination, clearer priorities, and a software layer that connects field activity with visual workflow management.",
    stack: ["Python", "SQLite", "Automation", "Dashboards", "Systems Design"],
    accent: "var(--rose)",
  },
  {
    title: "RFMS API Connector",
    tag: "API Integration",
    summary:
      "Custom connector for a flooring ERP with token-based authentication, pagination, exception handling, and data-quality controls.",
    outcome:
      "Job, customer, and cost data flow into Power BI layers for COGS, gross margin, supplier performance, and sales by material.",
    stack: ["Python", "REST APIs", "PostgreSQL", "Power BI"],
    accent: "var(--cyan)",
  },
];

export const techStack = [
  "Python",
  "SQL",
  "PostgreSQL",
  "SQL Server",
  "REST APIs",
  "ETL",
  "Power BI",
  "Next.js",
  "LLM agents",
  "Evals",
];

export const resources: ResourceItem[] = [
  {
    title: "Outlook Attachment Extractor",
    tag: "Free Utility",
    summary:
      "A Windows-based OST attachment extraction utility with GUI and CLI workflows, designed to browse Outlook data files, filter messages, and export attachments in a structured way.",
    points: [
      "Sanitized public package with source code only.",
      "No client data, extracted mail content, temporary mailboxes, or build artifacts included.",
      "Useful as a practical download for teams that need OST attachment extraction workflows.",
    ],
    downloadHref: "/downloads/outlook-attachment-extractor-source.zip",
    repoHref: "https://github.com/estebandre2/esteban-garzon-portfolio",
  },
  {
    title: "Live Data Integration Lab",
    tag: "Public Source Bundle",
    summary:
      "A curated package of sanitized integration scripts covering Moraware, RFMS, Microsoft Graph, Samsara, and Excel-based ingestion patterns.",
    points: [
      "Built from real operational automations, rewritten to remove secrets, internal IDs, private paths, and raw business data.",
      "Useful for demonstrating ETL, API authentication, batch backfills, desktop automation, and schema-shaping patterns.",
      "Safe to share as a public engineering sample without exposing the original `livedataproj` workspace.",
    ],
    downloadHref: "/downloads/live-data-integration-lab-source.zip",
    repoHref: "https://github.com/estebandre2/esteban-garzon-portfolio",
  },
];

export const codeLabSignals: LabSignal[] = [
  {
    label: "Public Samples",
    value: "16",
    detail: "Curated excerpts from flood frequency and contour maps to ETL, APIs, telemetry, Graph, Excel automation, schema bridges, and batching flows.",
  },
  {
    label: "Integration Families",
    value: "5",
    detail: "Moraware, RFMS, Microsoft Graph, Samsara, and spreadsheet-driven shop-floor pipelines.",
  },
  {
    label: "Download Bundles",
    value: "2",
    detail: "Sanitized public utilities and source packages that are safe to share in a portfolio context.",
  },
  {
    label: "Usage Guides",
    value: "2",
    detail: "Step-by-step instructions, prerequisites, and expected outputs for the public downloads.",
  },
];

export const codeLabTracks: LabTrack[] = [
  {
    title: "Operational Ingestion",
    summary:
      "Patterns for turning shop-floor logs, ERP signals, and structured exports into cleaner analytical layers.",
    points: [
      "Spreadsheet normalization and sheet harmonization.",
      "Controlled joins between job, slab, and activity records.",
      "Incremental exports that preserve business context without leaking raw internals.",
    ],
  },
  {
    title: "API Orchestration",
    summary:
      "Session handling, credential flows, pagination, and defensive parsing across vendor APIs and cloud services.",
    points: [
      "RFMS session bootstrap and estimate hydration.",
      "Microsoft Graph client-credentials token exchange.",
      "Samsara polling windows built for historical backfills.",
    ],
  },
  {
    title: "Reliability Layers",
    summary:
      "The code emphasizes safe writes, deduplication, placeholder handling, and shape checks before records hit storage.",
    points: [
      "Completeness scoring before duplicate removal.",
      "Batch inserts and time-window chunking for long runs.",
      "Selective updates instead of blunt full-table churn where possible.",
    ],
  },
  {
    title: "Desktop + Internal Tooling",
    summary:
      "Not everything lives in a web app. Some of the strongest leverage comes from automating the awkward middle ground.",
    points: [
      "PythonNET bridges into .NET-based vendor tooling.",
      "Excel automation with `xlwings` and downstream dataframe cleanup.",
      "Utilities packaged for non-technical operators when needed.",
    ],
  },
];

export const codeLabRequirements: LabRequirement[] = [
  {
    title: "Python 3.11+",
    detail:
      "Most samples assume a modern Python runtime and common data tooling such as `requests`, `pandas`, and `psycopg2-binary`.",
  },
  {
    title: "Windows-first utilities",
    detail:
      "The Outlook tool and some spreadsheet or desktop flows are designed around Windows environments and local desktop automation.",
  },
  {
    title: "Service credentials",
    detail:
      "Public packages replace all secrets with placeholders. To run them, you must provide your own API keys, database credentials, and tenant identifiers.",
  },
  {
    title: "External systems",
    detail:
      "Some samples expect access to third-party systems such as Moraware, Microsoft Graph, RFMS, SQL Server, PostgreSQL, or Samsara.",
  },
];

export const codeLabWorkflow: LabWorkflowStep[] = [
  {
    step: "01",
    title: "Choose a bundle",
    detail:
      "Pick the public package that matches your need: Outlook extraction for email attachments or Live Data Integration Lab for ETL and API examples.",
  },
  {
    step: "02",
    title: "Read the guide first",
    detail:
      "Each bundle is sanitized and intentionally selective. Start with the README to understand the expected environment and what has been redacted.",
  },
  {
    step: "03",
    title: "Install prerequisites",
    detail:
      "Create a clean environment, install the listed packages, and replace placeholders like `***` with your own safe local configuration.",
  },
  {
    step: "04",
    title: "Run a narrow test",
    detail:
      "Begin with a single script or a reduced date range so you can validate connectivity, schema behavior, and output shape before scaling up.",
  },
  {
    step: "05",
    title: "Adapt to your stack",
    detail:
      "The samples are meant to be templates. Rename tables, adjust schemas, and route outputs to your own storage and monitoring setup.",
  },
];

export const codeLabGuides: LabGuide[] = [
  {
    title: "How to use the Live Data Integration Lab",
    audience: "For engineers exploring ETL, API sync, and data-platform patterns",
    summary:
      "This package is best used as a reference implementation. It shows structure, flow control, and integration techniques rather than pretending to be a plug-and-play app.",
    requirements: [
      "Python 3.11 or newer",
      "A virtual environment",
      "Your own PostgreSQL or SQL-compatible destination",
      "Your own vendor credentials for whichever script you want to test",
    ],
    steps: [
      "Download the zip and extract it into a clean folder.",
      "Create a virtual environment and install `requirements.txt`.",
      "Open the script you want to study first, such as the RFMS bridge or the Microsoft Graph sync.",
      "Replace the placeholder values with your own local configuration.",
      "Run a small test scope first, then expand the date range or dataset size once the shape looks correct.",
    ],
    outputs: [
      "Understanding of auth flows, polling windows, and ETL control patterns",
      "Reusable code structure for ingestion jobs",
      "A safe starting point for adapting to your own systems",
    ],
  },
  {
    title: "How to use the Outlook Attachment Extractor",
    audience: "For teams or operators who need a practical attachment-export utility",
    summary:
      "This package is intended as a usable Windows utility sample. It demonstrates both packaging discipline and a real-world local workflow.",
    requirements: [
      "Windows environment",
      "Python installed locally if running from source",
      "Access to an OST file you are authorized to inspect",
      "Enough local disk space for exported attachments",
    ],
    steps: [
      "Download the source package and extract it locally.",
      "Review the README and install the dependencies if you plan to run it from source.",
      "Launch the GUI or CLI entrypoint depending on your workflow.",
      "Point the tool to your OST file, filter by the criteria you need, and choose an export folder.",
      "Verify a small sample export first before running a broader extraction.",
    ],
    outputs: [
      "Structured attachment exports",
      "A reusable local utility for mailbox recovery or audit workflows",
      "A reference implementation for GUI-driven Python tooling",
    ],
  },
];

export const codeSamples: CodeSample[] = [
  {
    id: "flood-frequency",
    title: "Flood Frequency (Gumbel) Behind the Safety Slider",
    file: "lib/scene-math.ts",
    category: "Engineering → Code",
    summary:
      "The hydrology I used to size structures, written as a tested function: the homepage safety slider moves water with the same Gumbel distribution used for design floods.",
    notes: [
      "Return periods are clamped to the 2–100 year design range.",
      "The reduced variate makes the 10-year flood land at 44.5% of the 2→100 year range, which a unit test pins.",
      "Same idea as a worst-case evaluation: size for the tail, not the mean.",
    ],
    snippet: `const gumbel = (t: number) => -Math.log(-Math.log(1 - 1 / t));

/** Normalized water level (0..1) for a flood of the given return period, 2..100 years. */
export function floodLevel(returnPeriodYears: number): number {
  const t = Math.min(100, Math.max(2, returnPeriodYears));
  return (gumbel(t) - gumbel(2)) / (gumbel(100) - gumbel(2));
}

// tests/scene-math.test.ts
assert.equal(floodLevel(2), 0);
assert.equal(floodLevel(100), 1);
assert.ok(Math.abs(floodLevel(10) - 0.445) < 0.001);`,
  },
  {
    id: "contour-marching-squares",
    title: "Contour Lines with Marching Squares",
    file: "lib/terrain.ts",
    category: "Engineering → Code",
    summary:
      "How the homepage draws a topographic sheet: each grid cell is classified against a contour elevation and the crossing is interpolated along its edges.",
    notes: [
      "Sixteen corner cases collapse into a handful of edge pairs.",
      "Linear interpolation places each line where the terrain actually crosses the elevation.",
      "Segments are sorted by distance from the river so the map reveals outward, like water spreading.",
    ],
    snippet: `const code =
  (tl >= elevation ? 8 : 0) | (tr >= elevation ? 4 : 0) |
  (br >= elevation ? 2 : 0) | (bl >= elevation ? 1 : 0);
if (code === 0 || code === 15) continue; // cell entirely above or below

const lerp = (a: number, b: number) => (elevation - a) / (b - a);
const top = () => [u0 + lerp(tl, tr) * du, v0];
const right = () => [u0 + du, v0 + lerp(tr, br) * dv];
const bottom = () => [u0 + lerp(bl, br) * du, v0 + dv];
const left = () => [u0, v0 + lerp(tl, bl) * dv];

switch (code) {
  case 1: case 14: pairs.push([left, bottom]); break;
  case 2: case 13: pairs.push([bottom, right]); break;
  case 3: case 12: pairs.push([left, right]); break;
  case 4: case 11: pairs.push([top, right]); break;
  case 5: pairs.push([left, top], [bottom, right]); break; // saddle
  case 6: case 9: pairs.push([top, bottom]); break;
  case 7: case 8: pairs.push([left, top]); break;
  case 10: pairs.push([left, bottom], [top, right]); break; // saddle
}`,
  },
  {
    id: "survey-to-grid",
    title: "From a Contour Survey to a Height Grid",
    file: "scripts/terrain/shp_to_grid.py",
    category: "Engineering → Code",
    summary:
      "The homepage terrain is a real survey: 9,582 contour lines from a dam site, read straight from the shapefile bytes and interpolated into a compact height grid.",
    notes: [
      "Parses PolyLine records and DBF elevations without GIS dependencies.",
      "Linear interpolation with a nearest-neighbour fill for gaps at the edges.",
      "Light Gaussian smoothing and a crop keep the sheet legible at screen size.",
    ],
    snippet: `elev = read_dbf(dbf_path, "Elevacion")
shapes = read_shp(shp_path)
assert len(elev) == len(shapes)

xy = np.concatenate([s for s in shapes if len(s)])
z = np.concatenate([np.full(len(s), e) for s, e in zip(shapes, elev) if len(s)])

gx, gy = np.meshgrid(np.linspace(x0, x1, COLS), np.linspace(y1, y0, rows))  # row 0 = north
grid = griddata(xy, z, (gx, gy), method="linear")
near = griddata(xy, z, (gx, gy), method="nearest")
grid = np.where(np.isnan(grid), near, grid)
grid = gaussian_filter(grid, SIGMA)`,
  },
  {
    id: "dedupe",
    title: "Inventory Deduplication Logic",
    file: "slab_project/etl_slabsmith.py",
    category: "ETL Reliability",
    summary:
      "A practical deduplication pass that protects downstream merges from repeated inventory identifiers.",
    notes: [
      "Ranks rows by completeness before removing duplicates.",
      "Preserves rows without a usable key instead of discarding them.",
      "Makes the ETL safer for reporting and enrichment joins.",
    ],
    snippet: `def deduplicate_by_inventory_id(df, key_col):
    if df.empty or key_col not in df.columns:
        return df.copy(), 0

    deduped = df.copy()
    deduped[key_col] = deduped[key_col].apply(normalize_inventory_key)

    mask_has_key = deduped[key_col].notna()
    with_key = deduped[mask_has_key].copy()
    without_key = deduped[~mask_has_key].copy()

    if with_key.empty:
        return deduped, 0

    completeness_score = pd.Series(0, index=with_key.index, dtype="int64")
    for col in [col for col in with_key.columns if col != key_col]:
        if pd.api.types.is_numeric_dtype(with_key[col]):
            completeness_score += with_key[col].notna().astype("int64")
        else:
            completeness_score += (
                with_key[col].fillna("").astype(str).str.strip().ne("").astype("int64")
            )

    with_key["_dedupe_score"] = completeness_score
    with_key = with_key.sort_values([key_col, "_dedupe_score"], ascending=[True, False])
    duplicate_rows_removed = len(with_key) - with_key[key_col].nunique()
    with_key = with_key.drop_duplicates(subset=[key_col], keep="first")

    deduped = pd.concat([with_key.drop(columns=["_dedupe_score"]), without_key], ignore_index=True)
    return deduped, duplicate_rows_removed`,
  },
  {
    id: "sync",
    title: "Parallel Job Processing",
    file: "moraware_project/moraware_sync.py",
    category: "Concurrency",
    summary:
      "A multiprocessing pattern that spreads job extraction across workers and streams inserts through dedicated consumer threads.",
    notes: [
      "Separates API calls from insert throughput concerns.",
      "Uses shared counters and queues for progress reporting.",
      "Scales long-running sync jobs more gracefully.",
    ],
    snippet: `for i, chunk in enumerate(chunks):
    p = multiprocessing.Process(target=worker_process, args=(i, chunk, result_queue))
    p.start()
    processes.append(p)

while workers_done < len(chunks):
    msg = result_queue.get(timeout=5)
    msg_type = msg[0]
    worker_id = msg[1]

    if msg_type == "progress":
        w_processed = msg[2]
        prev = worker_progress.get(worker_id, 0)
        delta = w_processed - prev
        worker_progress[worker_id] = w_processed

        if worker_id in bars:
            bars[worker_id].update(delta)
    elif msg_type == "done":
        workers_done += 1
        total_processed += msg[2]
        total_inserted += msg[3]
        total_errors += msg[4]`,
  },
  {
    id: "merge",
    title: "Controlled Enrichment Layer",
    file: "slab_project/build_cad_table.py",
    category: "Data Enrichment",
    summary:
      "A controlled enrichment step that connects fabrication activity with slab metadata and operator information.",
    notes: [
      "Combines Moraware activity notes with slab lookup tables.",
      "Keeps the final output business-friendly instead of exposing full internals.",
      "Matches the same selective-access philosophy used in this portfolio.",
    ],
    snippet: `for rec in records:
    sid = rec["slab_id"]
    slab_info = slab_map.get(sid)
    operator_info = operator_map.get(sid)
    operator_shop = normalize_operator(
        operator_info["operator_shop"] if operator_info else None
    )

    if slab_info:
        data = {
            **rec,
            "inventoryid": slab_info["inventoryid"],
            "JobName": slab_info["JobName"],
            "Utilized": slab_info["Utilized"],
            "Material": slab_info["Material"],
            "operator_shop": operator_shop,
        }
    else:
        data = {
            **rec,
            "inventoryid": sid,
            "JobName": None,
            "Utilized": None,
            "Material": None,
            "operator_shop": operator_shop,
        }

    pg_cur.execute(insert_sql, data)`,
  },
  {
    id: "moraware-bridge",
    title: "Moraware Activity Bridge",
    file: "live-data-integration-lab/moraware_activity_sync.py",
    category: ".NET Interop",
    summary:
      "A PythonNET flow that connects to a .NET vendor SDK, shapes activity metadata, and persists job-level signals for reporting.",
    notes: [
      "Bridges Python and .NET rather than relying on flat exports.",
      "Converts vendor date objects into safe ISO timestamps.",
      "Extracts structured fields from noisy activity notes.",
    ],
    snippet: `def convert_to_iso_string(value):
    if value is None:
        return None
    if isinstance(value, datetime):
        return value.isoformat()
    try:
        return datetime(
            value.Year, value.Month, value.Day, value.Hour, value.Minute, value.Second
        ).isoformat()
    except AttributeError:
        return None

for activity in job_activities:
    activity_name = activity.JobActivityTypeName
    if activity_name in activity_data:
        if "assigned_to" in activity_data[activity_name]:
            assignees = []
            enumerator = activity.Assignees.GetEnumerator()
            while enumerator.MoveNext():
                assignee = enumerator.Current
                assignees.append(str(assignee.AssigneeName))
            activity_data[activity_name]["assigned_to"] = ", ".join(assignees)

        if "date" in activity_data[activity_name]:
            activity_data[activity_name]["date"] = convert_to_iso_string(activity.StartDate)`,
  },
  {
    id: "rfms-session",
    title: "RFMS Session + Estimate Hydration",
    file: "live-data-integration-lab/rfms_estimate_bridge.py",
    category: "API Ingestion",
    summary:
      "A vendor session bootstrap followed by estimate-level hydration and schema-friendly extraction for local storage.",
    notes: [
      "Uses Basic auth only for session creation, then pivots into a short-lived session token.",
      "Parses nested customer fields defensively.",
      "Computes useful derived values like total square-foot area.",
    ],
    snippet: `def get_session_token():
    auth_string = f"{STORE_QUEUE}:{API_KEY}"
    auth_base64 = base64.b64encode(auth_string.encode()).decode()
    headers = {"Authorization": f"Basic {auth_base64}"}

    response = requests.post(f"{BASE_URL}/session/begin", headers=headers, timeout=30)
    response.raise_for_status()
    return response.json().get("sessionToken")

def get_estimate_data(estimate_number, session_token):
    headers = {
        "Authorization": f"Basic {base64.b64encode(f'{STORE_QUEUE}:{session_token}'.encode()).decode()}",
        "Content-Type": "application/json",
    }

    response = requests.get(f"{BASE_URL}/estimate/{estimate_number}?locked=false", headers=headers, timeout=30)
    response.raise_for_status()
    result = response.json().get("result") or {}
    lines = result.get("lines", [])
    total_area = sum(line.get("quantity", 0) for line in lines if line.get("saleUnits", "").upper() == "SF")
    return {
        "job_number": result.get("jobNumber"),
        "line_count": len(lines),
        "total_area": total_area,
    }`,
  },
  {
    id: "teams-graph",
    title: "Microsoft Graph Timecard Sync",
    file: "live-data-integration-lab/teams_timecards_sync.py",
    category: "Cloud Automation",
    summary:
      "An OAuth client-credentials flow that exchanges app credentials for a token and pulls shift/timecard records from Microsoft Graph.",
    notes: [
      "Uses app-level auth for service-style automation.",
      "Keeps token acquisition separate from data collection.",
      "Demonstrates comfort with enterprise APIs beyond simpler webhook use cases.",
    ],
    snippet: `def get_access_token():
    token_url = f"https://login.microsoftonline.com/{TENANT_ID}/oauth2/v2.0/token"
    data = {
        "grant_type": "client_credentials",
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "scope": "https://graph.microsoft.com/.default",
    }
    response = requests.post(token_url, data=data, timeout=30)
    response.raise_for_status()
    return response.json()["access_token"]

def get_time_cards(access_token):
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
    }
    response = requests.get(f"{GRAPH_URL}/teams/{TEAM_ID}/schedule/timeCards", headers=headers, timeout=30)
    response.raise_for_status()
    return response.json().get("value", [])`,
  },
  {
    id: "samsara-backfill",
    title: "Telemetry Backfill Windowing",
    file: "live-data-integration-lab/samsara_history_backfill.py",
    category: "Telemetry Pipelines",
    summary:
      "A time-sliced polling loop that backfills vehicle history in manageable windows rather than making one brittle bulk request.",
    notes: [
      "Chunks historical ranges into predictable intervals.",
      "Supports long-running recovery jobs and partial reruns.",
      "Pairs cleanly with batch inserts downstream.",
    ],
    snippet: `def fetch_and_store_historical_data(start_date, end_date):
    current_start = start_date
    while current_start < end_date:
        current_end = min(current_start + timedelta(minutes=30), end_date)
        start_ms = int(current_start.timestamp() * 1000)
        end_ms = int(current_end.timestamp() * 1000)

        vehicle_data = get_vehicle_data(start_ms, end_ms)
        if vehicle_data:
            save_to_postgres(vehicle_data)

        current_start = current_end`,
  },
  {
    id: "excel-normalize",
    title: "Excel Cut Log Normalization",
    file: "live-data-integration-lab/excel_cutlog_normalizer.py",
    category: "Spreadsheet Automation",
    summary:
      "A multi-sheet cleanup flow that standardizes inconsistent headers and merges shop-floor exports into one usable dataset.",
    notes: [
      "Maps variant column names into a unified schema.",
      "Keeps only the fields needed for downstream analysis.",
      "Shows practical Excel automation where APIs do not exist.",
    ],
    snippet: `COLUMN_ALIASES = {
    "Date": ["Date", "DATE"],
    "SF Utilized": ["SF Utilized", "SFT"],
    "Material Name": ["Marerial Name", "Material Name"],
    "Job Name": ["Job Name", "JOB NAME ", "JOB NAME"],
}

def normalize_columns(df, aliases):
    mapped = {}
    for canonical_name, variants in aliases.items():
        for variant in variants:
            if variant in df.columns:
                mapped[variant] = canonical_name
    return df.rename(columns=mapped)

for sheet in TARGET_SHEETS:
    df = pd.read_csv(export_path_for(sheet))
    df = normalize_columns(df, COLUMN_ALIASES)
    df = df[[col for col in COLUMN_ALIASES if col in df.columns]]
    df["Source"] = sheet
    frames.append(df)`,
  },
  {
    id: "duplicate-cleanup",
    title: "Normalized Duplicate Cleanup",
    file: "live-data-integration-lab/job_cleanup.py",
    category: "Data Quality",
    summary:
      "A cleanup pass that compares normalized job names in SQL so duplicate operational records can be removed deterministically.",
    notes: [
      "Uses trimmed, lower-cased keys instead of fragile direct matches.",
      "Keeps one survivor row per logical job.",
      "Pairs raw ingestion with controlled post-load cleanup.",
    ],
    snippet: `find_duplicates_query = """
SELECT LOWER(TRIM(job_name)) AS normalized_name, COUNT(*)
FROM job_data
GROUP BY LOWER(TRIM(job_name))
HAVING COUNT(*) > 1;
"""

delete_query = """
DELETE FROM job_data
WHERE ctid IN (
    SELECT ctid
    FROM job_data
    WHERE LOWER(TRIM(job_name)) = LOWER(TRIM(%s))
      AND ctid NOT IN (
          SELECT MIN(ctid)
          FROM job_data
          WHERE LOWER(TRIM(job_name)) = LOWER(TRIM(%s))
      )
);
"""`,
  },
  {
    id: "schema-bootstrap",
    title: "Schema Bootstrap for Operational Tables",
    file: "livedataproj/RFMSorders.py",
    category: "Database Design",
    summary:
      "A lightweight schema bootstrap pattern that creates the target table before ingestion and avoids brittle manual setup.",
    notes: [
      "Ensures the destination exists before the fetch loop starts.",
      "Useful for internal tools that must be deployable by operators.",
      "Pairs cleanly with insert-on-conflict or append-only workflows.",
    ],
    snippet: `create_table_query = """
CREATE TABLE IF NOT EXISTS purchase_orders_rfms (
    id SERIAL PRIMARY KEY,
    document_number VARCHAR(255) NOT NULL
);
"""

alter_queries = [
    "DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='purchase_orders_rfms' AND column_name='document_number') THEN ALTER TABLE purchase_orders_rfms ADD COLUMN document_number VARCHAR(255) NOT NULL; END IF; END $$;"
]

cursor.execute(create_table_query)
for query in alter_queries:
    cursor.execute(query)
    connection.commit()`,
  },
  {
    id: "scheduler-orchestration",
    title: "Scheduled Pipeline Orchestration",
    file: "livedataproj/Scheduledopen2.py",
    category: "Automation Ops",
    summary:
      "A simple but effective scheduler that chains multiple scripts into one recurring operational workflow.",
    notes: [
      "Good example of pragmatic orchestration before introducing a full scheduler stack.",
      "Useful for internal recurring jobs that need fast deployment.",
      "Shows comfort with turning separate scripts into a repeatable pipeline.",
    ],
    snippet: `def ejecutar_programa():
    try:
        comando1 = ["python", "Slabsmithfinal.py"]
        subprocess.run(comando1, check=True)

        comando2 = ["python", "cutlogsconv.py"]
        subprocess.run(comando2, check=True)

        comando3 = ["python", "cutlogsinslabsmith.py"]
        subprocess.run(comando3, check=True)

        hora_actual = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"Programas ejecutados exitosamente a las {hora_actual}.")
    except subprocess.CalledProcessError as e:
        print(f"Error al ejecutar un programa: {e}")

schedule.every(15).minutes.do(ejecutar_programa)`,
  },
  {
    id: "sqlserver-bridge",
    title: "SQL Server to PostgreSQL Bridge",
    file: "livedataproj/Slabsmithfinal.py",
    category: "Cross-Database Sync",
    summary:
      "A cross-database bridge that reads from SQL Server, reshapes units, and lands the result into PostgreSQL for downstream analytics.",
    notes: [
      "Practical pattern for moving line-of-business data out of an operational database.",
      "Includes unit conversion before persistence so downstream consumers get analytics-ready fields.",
      "Demonstrates comfort with ODBC, pandas, and SQLAlchemy in one flow.",
    ],
    snippet: `query = """
SELECT
    slabs.[InventoryID],
    slabs.[Material],
    slabs.[Manufacturer],
    slabs.[Product],
    slabs.[Area$Usable],
    jobslabs.[Utilized],
    jobslabs.[Reserved],
    jobslabs.[Waste],
    jobs.[ID] AS JobName
FROM [SSSlabBrowser].[All Slabs] slabs
INNER JOIN [dbo].[JobSlabs] jobslabs ON slabs.[SlabID] = jobslabs.[SlabUID]
INNER JOIN [dbo].[JobItems] jobitems ON jobslabs.[JobItemUID] = jobitems.[JobItemID]
INNER JOIN [dbo].[Jobs] jobs ON jobitems.[JobUID] = jobs.[JobID];
"""

for column in ["Area$Usable", "Utilized", "Reserved", "Waste"]:
    data[column] = data[column] * 10.7639

data.to_sql("job_slabs_data", engine, if_exists="replace", index=False)`,
  },
  {
    id: "batch-insert",
    title: "Batch Event Insert Pattern",
    file: "livedataproj/Samsara2.py",
    category: "Write Throughput",
    summary:
      "A batching pattern that accumulates event rows and persists them in one database operation instead of writing one row at a time.",
    notes: [
      "Reduces overhead on long-running event ingestion jobs.",
      "Improves clarity by separating event parsing from persistence.",
      "Good foundation for later swapping in COPY or queue-based writes.",
    ],
    snippet: `def guardar_eventos_lote(entries):
    if not entries:
        print("No hay eventos para guardar.")
        return

    cursor.executemany(
        """
        INSERT INTO vehiculos_ubicacion (vehiculo_id, tipo_evento, timestamp, latitud, longitud, ubicacion)
        VALUES (%s, %s, %s, %s, %s, %s)
        """,
        entries
    )
    conn.commit()

for evento in eventos:
    tipo_evento = evento.get("type", "Desconocido")
    timestamp = datetime.fromisoformat(evento["time"].replace("Z", "+00:00"))
    ubicacion = evento.get("location", {})
    entries.append((vehiculo_id, tipo_evento, timestamp, latitud, longitud, direccion))`,
  },
];

export type AnalyticsSignal = {
  label: string;
  value: string;
  detail: string;
};

export type AnalyticsProject = {
  title: string;
  tag: string;
  summary: string;
  outcome: string;
  stack: string[];
  accent: string;
  href: string;
  hrefLabel: string;
};

export type AnalyticsArchiveItem = {
  title: string;
  tag: string;
  summary: string;
  format: string;
  href: string;
  hrefLabel?: string;
};

export type AnalyticsCaseStudy = {
  slug: string;
  title: string;
  tag: string;
  summary: string;
  overview: string;
  whatItShows: string[];
  focusAreas: string[];
  deliverables: string[];
};

export const analyticsSignals: AnalyticsSignal[] = [
  {
    label: "Portfolio Layer",
    value: "25",
    detail: "Visible analytics deliverables across BI, visualization, graph analysis, applied reporting, databases, optimization, and strategy briefs.",
  },
  {
    label: "Featured Cases",
    value: "9",
    detail: "The strongest pieces are separated from the broader archive so the narrative stays sharp and every link stays live.",
  },
  {
    label: "Download Types",
    value: "PDF / PBIX / TWB / PPTX / DOCX / Briefs",
    detail: "The page combines direct downloads with internal case briefs so every analytics item remains accessible without broken links.",
  },
];

export const analyticsFeatured: AnalyticsProject[] = [
  {
    title: "Predictive model of residential construction in Texas",
    tag: "M.Sc. Thesis",
    summary:
      "Monthly forecast of residential building permits in Texas (1990–2025) from Census permits, mortgage rates, construction employment, house prices, and recession indicators.",
    outcome:
      "ElasticNet benchmarked against baseline models and trained through 2024, then validated out of sample on all of 2025.",
    stack: ["Time series", "ElasticNet", "Python", "Out-of-sample validation"],
    accent: "var(--cyan)",
    href: "https://github.com/estebandre2/modelo-predictivo-construccion-texas",
    hrefLabel: "View repository",
  },
  {
    title: "Real-time structural-break detection",
    tag: "ML Competition",
    summary:
      "Model for the ADIA Lab Structural Break Challenge: it reads a clean history, then one observation at a time, and outputs the probability that a structural break has already happened.",
    outcome: "Causal detectors, evidence trees, and a mixture of experts; best official time-stratified AUC of 0.632.",
    stack: ["Time series", "Change-point detection", "PyTorch", "Evaluation"],
    accent: "var(--amber)",
    href: "https://hub.crunchdao.com/competitions/structural-break-real-time",
    hrefLabel: "View competition",
  },
  {
    title: "Applied Analytics Final Report",
    tag: "Analytics Report",
    summary:
      "A polished long-form analytics report included as a public artifact to show structured analysis, report composition, and executive-facing presentation.",
    outcome:
      "Adds a substantial document to the portfolio that shows Esteban can package analysis into a complete deliverable, not only dashboards and code.",
    stack: ["Applied Analytics", "Reporting", "Business Framing", "Documentation"],
    accent: "var(--cyan)",
    href: "/downloads/analytics-portfolio/reporte-final-analitica-aplicada.pdf",
    hrefLabel: "Open final report",
  },
  {
    title: "Executive BI Dashboard for Commissions, Market, Pareto, and Traders",
    tag: "Power BI",
    summary:
      "A multi-page Power BI project covering commissions, market participation, Pareto logic, decomposition views, and trader-level reporting.",
    outcome:
      "Shows that Esteban can translate data into managerial dashboards, not only backend systems.",
    stack: ["Power BI", "Executive Reporting", "Market Analysis", "Dashboards"],
    accent: "var(--rose)",
    href: "/downloads/analytics-portfolio/proyecto-power-bi-fase-3.pbix",
    hrefLabel: "Download PBIX",
  },
  {
    title: "Safety Factor: will an AI sign off on an unsafe hydraulic design?",
    tag: "AI Safety Research",
    summary:
      "5,408 trials of five language models reviewing dam, spillway and pipeline checks with code-computed ground truth, neutral and under client, authority, flawed-calculation and deadline pressure.",
    outcome:
      "No model caved to pressure; every unsafe approval came from a misplaced lever arm in dam overturning, which a calculator tool did not fix.",
    stack: ["AI safety", "LLM evaluation", "Python", "Hydraulics"],
    accent: "var(--amber)",
    href: "/research/safety-factor",
    hrefLabel: "Read the study",
  },
  {
    title: "Property and Price Exploration in Tableau",
    tag: "Data Visualization",
    summary:
      "A Tableau workbook focused on property-level analysis, pricing patterns, housing attributes, and real-estate-oriented visual storytelling.",
    outcome:
      "Expands the public portfolio into analytics communication and exploratory visualization.",
    stack: ["Tableau", "Real Estate", "Visual Analysis", "Storytelling"],
    accent: "var(--cyan)",
    href: "/downloads/analytics-portfolio/proyecto-tableau-fase-3.twb",
    hrefLabel: "Download TWB",
  },
  {
    title: "Fraud Detection Through Graph Analytics",
    tag: "Neo4j",
    summary:
      "A Cypher-based report exploring duplicated cards, shared identity data, overlapping products, and risky loan balances in a fraud scenario.",
    outcome:
      "Introduces graph thinking and pattern analysis without repeating the existing code-lab samples.",
    stack: ["Neo4j", "Cypher", "Fraud Analysis", "Graph Modeling"],
    accent: "var(--amber)",
    href: "/downloads/analytics-portfolio/reporte-fraude-neo4j.pdf",
    hrefLabel: "Open fraud report",
  },
  {
    title: "Healthcare Relationships and Conflict-of-Interest Analysis",
    tag: "Graph Analysis",
    summary:
      "A graph-based healthcare case focused on pharmaceutical influence, overloaded doctors, incompatible treatments, and relational risks.",
    outcome:
      "Broadens the analytical range of the site while staying aligned with structured problem solving.",
    stack: ["Neo4j", "Healthcare", "Risk Analysis", "Relational Data"],
    accent: "var(--rose)",
    href: "/downloads/analytics-portfolio/reporte-medicina-neo4j.pdf",
    hrefLabel: "Open healthcare report",
  },
  {
    title: "Business Intelligence Concept Map",
    tag: "Conceptual Design",
    summary:
      "A visual support piece that complements the applied BI work with a structured overview of business intelligence concepts and relationships.",
    outcome:
      "Shows that Esteban can communicate analytical structure clearly, not only deliver implementation files.",
    stack: ["BI", "Concept Mapping", "Analytical Communication", "Structure"],
    accent: "var(--cyan)",
    href: "/downloads/analytics-portfolio/bi-mapa-conceptual.pdf",
    hrefLabel: "Open concept map",
  },
];

export const analyticsArchive: AnalyticsArchiveItem[] = [
  {
    title: "Net Head by Drone Photogrammetry for Four Hydro Plants",
    tag: "Civil Engineering",
    summary: "Where the data work started: survey data, quality control, and energy decisions for public hydropower plants.",
    format: "Case Brief",
    href: "/analytics/cases/hydro-net-head-photogrammetry",
    hrefLabel: "Open case brief",
  },
  {
    title: "Predictive Model of Residential Construction in Texas",
    tag: "M.Sc. Thesis",
    summary: "Monthly permits forecast with ElasticNet, validated out of sample on 2025.",
    format: "Case Brief",
    href: "/analytics/cases/texas-construction-permits",
    hrefLabel: "Open case brief",
  },
  {
    title: "Real-Time Structural-Break Detection",
    tag: "ML Competition",
    summary: "Causal change-point model for the ADIA Lab challenge, judged on time-stratified AUC.",
    format: "Case Brief",
    href: "/analytics/cases/structural-break-detection",
    hrefLabel: "Open case brief",
  },
  {
    title: "Big Data Use in a Custom Manufacturing Operation",
    tag: "Big Data",
    summary:
      "Applied essay on operational, customer, logistics, HR, and financial data inside a U.S. manufacturing context.",
    format: "Case Brief",
    href: "/analytics/cases/big-data-uso-tts",
    hrefLabel: "Open case brief",
  },
  {
    title: "Factors Affecting Big Data Adoption in a Service Operations Company",
    tag: "Big Data",
    summary:
      "Technology and organization analysis using TOE and UTAUT perspectives.",
    format: "Case Brief",
    href: "/analytics/cases/big-data-factores-adopcion",
    hrefLabel: "Open case brief",
  },
  {
    title: "Comparative Review of Big Data Technologies",
    tag: "Big Data",
    summary:
      "Comparison across storage, NoSQL, batch, real-time, ML, and visualization platforms.",
    format: "Case Brief",
    href: "/analytics/cases/big-data-cuadro-comparativo",
    hrefLabel: "Open case brief",
  },
  {
    title: "Case Analysis S1",
    tag: "Analytics",
    summary:
      "Case-based analysis of analytics applications in Ecuador with a business-value lens.",
    format: "Case Brief",
    href: "/analytics/cases/analitica-caso-s1",
    hrefLabel: "Open case brief",
  },
  {
    title: "Case Analysis S2 on Public Procurement",
    tag: "Analytics",
    summary:
      "Descriptive and associative analysis of Ecuador's public procurement market using Python.",
    format: "DOCX",
    href: "/downloads/analytics-portfolio/analitica-caso-s2.docx",
  },
  {
    title: "Innovative Analytics Solution S4",
    tag: "Analytics",
    summary:
      "Presentation on cycle prediction, rework risk, and phased implementation planning.",
    format: "PPTX",
    href: "/downloads/analytics-portfolio/analitica-soluciones-innovadoras-s4.pptx",
  },
  {
    title: "Power BI Integrated Project - Phase 1",
    tag: "BI",
    summary:
      "Initial dashboard structure and model setup for the larger reporting workflow.",
    format: "PBIX",
    href: "/downloads/analytics-portfolio/bi-proyecto-fase-1.pbix",
  },
  {
    title: "Power BI Integrated Project - Phase 2",
    tag: "BI",
    summary:
      "Intermediate iteration with more developed layout and expanded analytical views.",
    format: "PBIX",
    href: "/downloads/analytics-portfolio/bi-proyecto-fase-2.pbix",
  },
  {
    title: "Data Visualization Assignment 1",
    tag: "Visualization",
    summary:
      "Additional visual work included to broaden the portfolio footprint beyond one Tableau project.",
    format: "Case Brief",
    href: "/analytics/cases/visualizacion-tarea-1",
    hrefLabel: "Open case brief",
  },
  {
    title: "Graph Database Design and Exploration Task",
    tag: "Graph Databases",
    summary:
      "A Neo4j-oriented task artifact that broadens the graph-analysis footprint of the portfolio.",
    format: "PDF",
    href: "/downloads/analytics-portfolio/analisis-red-tarea-s2.pdf",
  },
  {
    title: "MongoDB Exploration and Querying Task",
    tag: "Databases",
    summary:
      "Collection exploration, filters, counts, and query interpretation in a document database setting.",
    format: "Case Brief",
    href: "/analytics/cases/bases-datos-mongodb",
    hrefLabel: "Open case brief",
  },
  {
    title: "Linear Programming Task S1",
    tag: "Optimization",
    summary:
      "Production-planning model solved with Excel Solver and AMPL.",
    format: "Case Brief",
    href: "/analytics/cases/optimizacion-lineal-s1",
    hrefLabel: "Open case brief",
  },
  {
    title: "Integer Programming Task S3",
    tag: "Optimization",
    summary:
      "Capacity-constrained product-mix optimization with multiple what-if scenarios.",
    format: "Case Brief",
    href: "/analytics/cases/optimizacion-lineal-s3",
    hrefLabel: "Open case brief",
  },
];

export const analyticsCaseStudies: Record<string, AnalyticsCaseStudy> = {
  "texas-construction-permits": {
    slug: "texas-construction-permits",
    title: "Predictive Model of Residential Construction in Texas",
    tag: "M.Sc. Thesis",
    summary:
      "Monthly forecast of residential building permits in Texas from public economic series, validated out of sample on all of 2025.",
    overview:
      "The thesis treats construction activity like a river gauge: a monthly series driven by mortgage rates, construction employment, house prices, and recessions. Models were trained on 1990–2024 and judged only on a year they never saw.",
    whatItShows: [
      "Time-series modeling with honest, out-of-sample validation instead of in-sample fit.",
      "Benchmarking a regularized model (ElasticNet) against simple baselines before claiming improvement.",
      "A fully public, reproducible repository: data, script, and figures.",
    ],
    focusAreas: ["Time series", "Feature engineering", "Model evaluation", "Construction economics"],
    deliverables: ["Public repository", "Benchmark tables", "Thesis document and defense"],
  },
  "structural-break-detection": {
    slug: "structural-break-detection",
    title: "Real-Time Structural-Break Detection",
    tag: "ML Competition",
    summary:
      "A competition model that reads one observation at a time and estimates the probability that a series has already changed regime.",
    overview:
      "Built for the ADIA Lab Structural Break Challenge (real-time edition). The model combines causal detectors, evidence trees, and a mixture of experts, and was judged on time-stratified AUC; the best official score reached 0.632.",
    whatItShows: [
      "Online change-point detection under a strict, causal (no look-ahead) constraint.",
      "Careful evaluation, including questioning whether competitors could exploit the evaluation series.",
      "Packaging a reproducible submission with a model card and validation notes.",
    ],
    focusAreas: ["Change-point detection", "Time series", "Evaluation integrity", "Model packaging"],
    deliverables: ["Competition submission", "Model card", "Local evaluation harness"],
  },
  "hydro-net-head-photogrammetry": {
    slug: "hydro-net-head-photogrammetry",
    title: "Net Head by Drone Photogrammetry for Four Hydro Plants",
    tag: "Civil Engineering · Survey Data",
    summary:
      "Public consultancy (2024): measuring the elevations that set the energy of four hydropower plants at existing dams, using drones instead of assumptions.",
    overview:
      "Net head decides how much energy a plant can produce. For the rehabilitation of two plants and the definitive design of two more, I planned drone flights, placed ground control points, processed the imagery in Pix4Dmatic, and read crest and powerhouse elevations from dense point clouds before any energy table was built.",
    whatItShows: [
      "The data mindset applied to civil work: quality reports on ground control before trusting a single elevation.",
      "Turning field data into decisions: energy analysis by flows and number of turbines.",
      "Engineering documentation authored end to end, reviewed and approved within a formal project structure.",
    ],
    focusAreas: ["Photogrammetry", "Point clouds", "Hydropower", "Data quality"],
    deliverables: ["Net-head evaluation reports", "Energy evaluation tables", "Powerhouse and substation sections"],
  },
  "big-data-uso-tts": {
    slug: "big-data-uso-tts",
    title: "Big Data Use in a Custom Manufacturing Operation",
    tag: "Big Data",
    summary:
      "A portfolio brief covering how operational, customer, logistics, HR, and finance signals can be combined into a practical big-data agenda for a custom manufacturing business.",
    overview:
      "This case frames big data as an operational leverage layer rather than a buzzword. The work maps where value appears first: demand visibility, rework reduction, delivery coordination, workforce planning, and financial control.",
    whatItShows: [
      "Ability to connect data strategy with real manufacturing pain points.",
      "Clear thinking around operational KPIs, process bottlenecks, and decision support.",
      "Communication that translates technical topics into business language.",
    ],
    focusAreas: ["Operations analytics", "Manufacturing systems", "Decision support", "Data strategy"],
    deliverables: ["Structured case brief", "Business framing", "Portfolio-safe summary artifact"],
  },
  "big-data-factores-adopcion": {
    slug: "big-data-factores-adopcion",
    title: "Factors Affecting Big Data Adoption in a Service Operations Company",
    tag: "Big Data",
    summary:
      "A case brief focused on organizational and technological factors that influence adoption, using TOE and UTAUT-inspired framing.",
    overview:
      "The emphasis here is adoption, not only tooling. The brief examines how readiness, capability, cost, trust, and organizational context shape whether analytics initiatives actually move from idea to execution.",
    whatItShows: [
      "Comfort with analytical frameworks beyond dashboards and coding tasks.",
      "Ability to assess digital transformation risk from both technical and organizational angles.",
      "Experience translating theory into practical business recommendations.",
    ],
    focusAreas: ["Technology adoption", "Organizational readiness", "Analytics strategy", "Change management"],
    deliverables: ["Executive-style brief", "Adoption risk framing", "Portfolio-safe internal page"],
  },
  "big-data-cuadro-comparativo": {
    slug: "big-data-cuadro-comparativo",
    title: "Comparative Review of Big Data Technologies",
    tag: "Big Data",
    summary:
      "A concise comparative brief across storage, NoSQL, batch, real-time, machine learning, and visualization technologies.",
    overview:
      "This piece organizes the ecosystem in a decision-friendly way. Instead of listing tools in isolation, it highlights where each category fits, what tradeoffs matter, and how different layers support different analytical goals.",
    whatItShows: [
      "Technical breadth across databases, processing models, and analytics stacks.",
      "Structured comparison rather than tool-name accumulation.",
      "Ability to communicate architecture choices clearly.",
    ],
    focusAreas: ["Architecture comparison", "Data platforms", "Tool evaluation", "Systems thinking"],
    deliverables: ["Comparative matrix brief", "Architecture notes", "Public-facing case page"],
  },
  "analitica-caso-s1": {
    slug: "analitica-caso-s1",
    title: "Case Analysis S1",
    tag: "Analytics",
    summary:
      "A business-oriented analytics case brief focused on applying descriptive and evaluative analysis to real decision scenarios.",
    overview:
      "The goal of this piece is to show analytical framing discipline: understanding the problem, identifying the right variables, and turning observations into usable recommendations instead of generic commentary.",
    whatItShows: [
      "Ability to structure analytical work around decision quality.",
      "Clear business framing and concise recommendation writing.",
      "A broader analytical footprint beyond code-heavy portfolio pieces.",
    ],
    focusAreas: ["Analytical reasoning", "Business framing", "Decision support", "Structured reporting"],
    deliverables: ["Case summary", "Recommendation-focused writeup", "Internal brief page"],
  },
  "visualizacion-tarea-1": {
    slug: "visualizacion-tarea-1",
    title: "Data Visualization Assignment 1",
    tag: "Visualization",
    summary:
      "A visualization-focused case brief showing additional exploratory and presentation work beyond the main Tableau artifact.",
    overview:
      "This entry exists to widen the visual layer of the analytics portfolio. It highlights the ability to shape a narrative through layout, comparison, and explanatory structure rather than relying only on one flagship dashboard.",
    whatItShows: [
      "Additional proof of visual communication skills.",
      "Comfort with presenting data stories to non-technical audiences.",
      "Range beyond operational systems and ETL work.",
    ],
    focusAreas: ["Data storytelling", "Visualization design", "Analytical communication", "Presentation clarity"],
    deliverables: ["Visualization brief", "Portfolio narrative support", "Viewable internal artifact"],
  },
  "bases-datos-mongodb": {
    slug: "bases-datos-mongodb",
    title: "MongoDB Exploration and Querying Task",
    tag: "Databases",
    summary:
      "A case brief centered on collection design, document queries, filtering patterns, counts, and interpretation in a MongoDB context.",
    overview:
      "The portfolio value here is database range. This brief demonstrates familiarity with document-oriented thinking, query construction, and the differences between relational and NoSQL-style exploration workflows.",
    whatItShows: [
      "Range across both relational and document databases.",
      "Understanding of exploratory querying and data inspection patterns.",
      "Ability to communicate technical database work in a digestible format.",
    ],
    focusAreas: ["MongoDB", "NoSQL", "Query logic", "Database literacy"],
    deliverables: ["Database case brief", "Query-focused notes", "Internal page instead of missing raw file"],
  },
  "optimizacion-lineal-s1": {
    slug: "optimizacion-lineal-s1",
    title: "Linear Programming Task S1",
    tag: "Optimization",
    summary:
      "A case brief showing production-planning logic solved with optimization tooling such as Excel Solver and AMPL.",
    overview:
      "This work adds operations research signal to the portfolio. It focuses on objective functions, constraints, and structured decision tradeoffs rather than only descriptive analytics or dashboards.",
    whatItShows: [
      "Comfort with optimization and constrained decision modeling.",
      "Ability to bridge engineering thinking with business tradeoffs.",
      "Analytical depth that complements ETL and BI work.",
    ],
    focusAreas: ["Linear programming", "Operations research", "Constraint modeling", "Decision optimization"],
    deliverables: ["Optimization brief", "Modeling summary", "Public-safe internal case page"],
  },
  "optimizacion-lineal-s3": {
    slug: "optimizacion-lineal-s3",
    title: "Integer Programming Task S3",
    tag: "Optimization",
    summary:
      "A case brief focused on capacity-constrained product mix optimization and scenario-based decision making.",
    overview:
      "This entry pushes the optimization layer a bit further by making discrete choices matter. It highlights scenario evaluation, capacity planning, and the impact of operational limits on final recommendations.",
    whatItShows: [
      "Capability in integer programming and what-if analysis.",
      "Structured reasoning under operational constraints.",
      "A stronger quantitative layer inside the analytics page.",
    ],
    focusAreas: ["Integer programming", "Scenario analysis", "Capacity planning", "Optimization"],
    deliverables: ["Scenario brief", "Optimization framing", "Internal portfolio case page"],
  },
};
