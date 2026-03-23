export type Metric = {
  label: string;
  value: string;
};

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

export type ResumeItem = {
  period: string;
  title: string;
  description: string;
};

export const profile = {
  name: "Esteban Garzon",
  role: "CTO - Data, Automation, and AI Systems",
  heroTitle: "I design software that turns complex operations into elegant systems.",
  heroText:
    "I am a CTO with a background in data engineering, automation, business intelligence, and applied analytics. I build ETL pipelines, AI-enabled workflows, and internal platforms that turn operational complexity into clear, high-leverage systems.",
  resumeSummary:
    "CTO, data engineer, and automation specialist with a multidisciplinary background spanning civil engineering, data science, business intelligence, and operational systems. Experienced in building ETL pipelines, analytics layers, AI-driven automations, dashboards, and backend workflows that improve decision-making, reduce manual work, and create reliable infrastructure for growing teams.",
  linkedin: "https://www.linkedin.com/in/esteban-garzon2",
  email: "estebandre2@hotmail.es",
  phone: "+593996788376",
};

export const metrics: Metric[] = [
  { label: "Focus", value: "Automation + Data Systems" },
  { label: "Specialty", value: "ETL, integrations, reliability" },
  { label: "Approach", value: "Operational software with premium UX" },
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
];

export const capabilities = [
  "Robust ETL pipelines",
  "API and ERP integrations",
  "Multi-source data synchronization",
  "SQL analytics and data modeling",
  "Operational automation",
  "Business intelligence dashboards",
  "Machine learning and predictive analytics",
  "Interactive frontends for complex systems",
];

export const resumeHighlights = [
  "Currently operating at CTO level, leading technical direction across data, automation, and AI-driven systems.",
  "Built production ETL pipelines connecting SQL Server, Excel-based shop data, PostgreSQL, APIs, and operational platforms.",
  "Designed synchronization workflows for manufacturing, CAD, installation, finance, and vendor intelligence.",
  "Experienced with Power BI, Python, SQL, machine learning, and automation-first system design.",
  "Able to bridge technical execution, strategic thinking, and multidisciplinary business contexts.",
];

export const resumeItems: ResumeItem[] = [
  {
    period: "Latest Position",
    title: "Chief Technology Officer (CTO)",
    description:
      "Leading technical strategy across automation, AI, business intelligence, and data systems while shaping solutions that improve operational visibility, efficiency, and decision-making.",
  },
  {
    period: "2024 - Present",
    title: "Data Engineer | AI-Driven Automation & Business Intelligence Specialist",
    description:
      "Designed and implemented ETL pipelines, API integrations, reporting systems, and AI-enabled automations for a U.S.-based client, connecting platforms such as Moraware, RFMS, Slabsmith, Samsara, and production machine logs.",
  },
  {
    period: "2022 - 2023",
    title: "Data Scientist, Data Analyst, and Financial Modeling Roles",
    description:
      "Worked across hydroelectric, photovoltaic, construction, and water system projects, applying data analysis, forecasting, financial modeling, and feasibility studies to support strategic decisions.",
  },
  {
    period: "Education",
    title: "Civil Engineer + Master's in Data Science and Business Intelligence",
    description:
      "Blending engineering discipline with analytics, machine learning, business intelligence, and applied data strategy to solve real-world operational problems.",
  },
];

export const codeSamples: CodeSample[] = [
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
];
