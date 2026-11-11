// Research shown on /research and in the landing feature. Every number comes from the published write-ups
// in the safety-factor-eval repository; the thesis and the competition reuse their existing case pages.

const REPO = "https://github.com/estebandre2/safety-factor-eval";

export type ResearchEntry = {
  title: string;
  tag: string;
  date: string;
  summary: string;
  href: string;
  hrefLabel: string;
  repo?: string; // public GitHub repository, when the code is published
};

export type KeyNumber = { value: string; label: string; detail: string };
export type Finding = { title: string; detail: string };
export type ResearchLink = { label: string; href: string; note: string };

export type ResearchStudy = {
  slug: string;
  title: string;
  shortTitle: string;
  published: string; // ISO date of the first public write-up
  modified: string; // ISO date of the last revision
  tag: string;
  date: string;
  question: string;
  summary: string;
  correction?: string;
  keyNumbers: KeyNumber[];
  design: string[];
  findings: Finding[];
  takeaway: string;
  limitations: string[];
  facts: { label: string; value: string }[]; // the title block on the study page
  figure: { src: string; alt: string; width: number; height: number };
  documents: ResearchLink[];
  links: ResearchLink[];
};

export const researchStudies: ResearchStudy[] = [
  {
    slug: "safety-factor-ii",
    shortTitle: "Safety Factor II",
    published: "2026-11-10",
    modified: "2026-11-11",
    title: "Safety Factor II: confident set-up errors, effort, and what catches them",
    tag: "AI Safety Research · Pre-registered",
    date: "November 2026",
    question: "Is the lever-arm error from Study I real, does it generalize, and what kind of review catches it?",
    summary:
      "A pre-registered follow-up on 180 new hydraulic checks. Language models misplace a load's lever arm in dam overturning depending on the reasoning-effort setting, other providers make the same mistake, and a reviewer that rebuilds the set-up first catches almost all of it.",
    keyNumbers: [
      {
        value: "18–50%",
        label: "Wrong dam-overturning answers at effort “high”",
        detail: "0–3% at “max”. Asked only where each load acts, the same models are right at least 90% of the time.",
      },
      {
        value: "74% → 98%",
        label: "Errors Opus catches in its own answers",
        detail: "Plain self-review against a procedure that rebuilds the set-up first, on held-out answers. Haiku with the procedure also reaches 98%.",
      },
      {
        value: "27.5%",
        label: "Wrong answers from OpenAI's gpt-oss-120b",
        detail: "Gemini 3 Flash: 6.9%. The same two lever-arm mistakes appear, so the error is not specific to Claude.",
      },
    ],
    design: [
      "Pre-registered: hypotheses, thresholds, sample sizes, analysis and budget were frozen before the first trial. Four dated amendments, each public before the data it governs.",
      "180 new cases: 80 dam-overturning checks, 40 hinged gates, 40 retaining walls and 20 sliding controls, each re-derived from its prompt text by an independent script.",
      "Authors: Claude Haiku, Sonnet and Opus 5.5 at effort “high” and “max”, with DeepSeek, Gemini 3 Flash and gpt-oss-120b for comparison.",
      "Review: 156 case-matched answers (one wrong and one correct per dam) checked by every reviewer under three protocols: plain review, independent set-up, and assumption audit.",
      "Measurement: an answer is wrong when its value is more than 2% from the truth; case-cluster bootstrap 95% intervals; a frozen regex reader agrees with the judge on 1,627 of 1,628 values.",
    ],
    findings: [
      {
        title: "The error depends on effort and wording, not on knowledge.",
        detail:
          "Inside a full check at “high” effort the Claude models misplace a resultant in 18–50% of overturning answers; at “max”, in 0–3%. Study I ran at “medium” and now carries a correction.",
      },
      {
        title: "It belongs to the dam check, and not only to Claude.",
        detail:
          "On 80 new dams the Study I mechanisms reappear, but a gate and a retaining wall with the same triangle orientation show almost no errors, so the orientation hypothesis is not supported. gpt-oss-120b gets 27.5% wrong, Gemini 3 Flash 6.9%.",
      },
      {
        title: "A procedure makes review work.",
        detail:
          "Plain review by the Claude models detects 74% (Haiku) to 97% (Sonnet) of wrong values. Asking Opus to rebuild the set-up first raises it from 88% to 100%. A weaker model with that procedure checked a stronger one at least as well as the stronger model checked itself.",
      },
      {
        title: "Review is cheaper than maximum effort.",
        detail: "An answer at “high” plus one review at “high” matches the author alone at “max” with about 3–8 times fewer output tokens.",
      },
      {
        title: "One sentence can do what “max” does, for model-specific reasons (exploratory).",
        detail:
          "Asking the author to locate every load first removes most errors at every effort; Opus reaches 0% even at “low”. But the same fix does not help gpt-oss, and stating the triangle's apex fixes Opus while harming Haiku and Sonnet.",
      },
    ],
    takeaway:
      "A capable model can write a fluent, wrong engineering calculation that a single plain review by a weaker model misses a quarter of the time, and whether the error appears at all depends on a deployment setting the user may not see.",
    limitations: [
      "One task family carries the effect: almost all errors are in dam overturning.",
      "Synthetic, idealized checks with illustrative acceptance criteria, not a design standard.",
      "Effort is a vendor setting that is not defined in tokens and may change between versions.",
      "Exploratory runs were designed after the main results and published after they ran.",
    ],
    facts: [
      { label: "Published", value: "10 Nov 2026" },
      { label: "Design", value: "Pre-registered, 4 dated amendments" },
      { label: "Cases", value: "180 new checks in 4 families" },
      { label: "Models", value: "7 models from 4 providers" },
    ],
    figure: {
      src: "/research/safety-factor-ii-effort.png",
      alt: "Line charts of wrong dam-overturning answers by reasoning effort for Haiku, Sonnet and Opus. With the base prompt, errors fall from 80%, 29% and 64% at low effort to between 0% and 3% at max. Asking for the set-up first lowers them at every effort, to 0% for Opus.",
      width: 1800,
      height: 620,
    },
    documents: [
      { label: "Read the paper (PDF)", href: "/downloads/research/safety-factor-ii.pdf", note: "7 pages" },
      { label: "Appendix (PDF)", href: "/downloads/research/safety-factor-ii-appendix.pdf", note: "Tables and exploratory runs" },
    ],
    links: [
      { label: "Code and data", href: REPO, note: "GitHub repository" },
      {
        label: "Pre-registration",
        href: `${REPO}/blob/main/docs/superpowers/specs/2026-11-10-safety-factor-ii-design.md`,
        note: "Frozen spec and dated amendments",
      },
    ],
  },
  {
    slug: "safety-factor",
    shortTitle: "Safety Factor I",
    published: "2026-11-06",
    modified: "2026-11-11",
    title: "Safety Factor: will an AI sign off on an unsafe hydraulic design?",
    tag: "AI Safety Research",
    date: "November 2026",
    question:
      "Do language models approve unsafe hydraulic designs when a client, a superior, a flawed calculation or a deadline pushes them to?",
    summary:
      "5,408 trials of five language models reviewing dam, spillway and pipeline checks with code-computed ground truth. No model caved to pressure; every unsafe approval came from a confident lever-arm error in dam overturning.",
    correction:
      "Correction, 10 November 2026: this study ran Claude at effort “medium”. Safety Factor II shows that at “max” the lever-arm errors almost disappear, so the findings below describe Claude at “medium”.",
    keyNumbers: [
      {
        value: "5,408",
        label: "Trials across five models",
        detail: "Claude Haiku, Sonnet and Opus 5.5, DeepSeek Flash and V4-Pro, on 40 design checks, neutral and under four kinds of pressure.",
      },
      {
        value: "0 of 537",
        label: "Correct rejections reversed after pushback",
        detail: "Pressure made no measurable difference to approvals.",
      },
      {
        value: "67 of 2,784",
        label: "Unsafe-case answers approved",
        detail: "All were calculation errors in dam overturning. No model approved an unsafe design after computing the correct value.",
      },
    ],
    design: [
      "40 checks with code-computed ground truth: gravity-dam sliding and overturning, spillway capacity against the 100-year flood, and pipeline delivery pressure.",
      "Per family: safe designs, clearly unsafe ones, and borderline ones that fail by less than 5%. Every prompt states inputs, assumptions, formula and acceptance criterion.",
      "Each case presented neutrally or under client, authority, flawed-calculation or urgency pressure, plus a multi-turn mode with scripted pushback after a rejection.",
      "Mitigations from engineering practice, including a calculator tool and a same-model verifier.",
    ],
    findings: [
      {
        title: "No capitulation.",
        detail: "No model approved an unsafe design after computing the correct value, and none reversed a correct rejection after pushback (0 of 537).",
      },
      {
        title: "Two lever-arm mistakes explain the failures.",
        detail:
          "They account for 280 of 281 wrong overturning values from the Claude models; both place a triangular load's resultant at the wrong third of the base.",
      },
      {
        title: "The direction of the mistake decides the harm.",
        detail:
          "Haiku and Sonnet mostly misplace the uplift, which inflates the safety factor, so they approve unsafe dams. Opus misplaces the concrete triangle, which deflates it: it never approved an unsafe design but rejected 6.7% of safe ones.",
      },
      {
        title: "A calculator did not help at “medium” effort.",
        detail: "The models applied it faithfully to a wrongly set-up equation. A same-model verifier both caught and created errors.",
      },
    ],
    takeaway: "The risk measured is not sycophancy but confident, systematic miscalculation that looks like sound engineering.",
    limitations: [
      "Claude ran at effort “medium” while DeepSeek ran at “high”, which confounds the provider comparison.",
      "The unsafe approvals came from only 4 cases.",
      "Illustrative textbook criteria; the write-up compares them with USACE, FEMA P-94 and Bulletin 17C.",
    ],
    facts: [
      { label: "Published", value: "6 Nov 2026" },
      { label: "Trials", value: "5,408" },
      { label: "Cases", value: "40 checks in 4 families" },
      { label: "Models", value: "5 models from 2 providers" },
    ],
    figure: {
      src: "/research/safety-factor-pressure.png",
      alt: "Bar chart of unsafe approvals by pressure condition for five models. Rates stay between 0% and 10% under authority, client budget, flawed calculation, neutral and urgency framing, with overlapping intervals, so pressure makes no measurable difference.",
      width: 1440,
      height: 720,
    },
    documents: [{ label: "Read the paper (PDF)", href: "/downloads/research/safety-factor.pdf", note: "Write-up with correction" }],
    links: [{ label: "Code and data", href: REPO, note: "GitHub repository" }],
  },
];

export const featuredStudy = researchStudies[0];

export const researchEntries: ResearchEntry[] = [
  ...researchStudies.map((study) => ({
    title: study.title,
    tag: study.tag,
    date: study.date,
    summary: study.summary,
    href: `/research/${study.slug}`,
    hrefLabel: "Read the study",
    repo: REPO,
  })),
  {
    title: "Predictive model of residential construction in Texas",
    tag: "M.Sc. Thesis",
    date: "Universidad de Las Américas, 2026",
    summary:
      "Monthly forecast of residential building permits in Texas (1990–2025) from public economic series, with ElasticNet benchmarked against baselines and validated out of sample on all of 2025.",
    href: "/analytics/cases/texas-construction-permits",
    hrefLabel: "Read the case",
    repo: "https://github.com/estebandre2/modelo-predictivo-construccion-texas",
  },
  {
    title: "Real-time structural-break detection",
    tag: "ML Competition",
    date: "ADIA Lab challenge",
    summary:
      "A model for the ADIA Lab Structural Break Challenge that reads one observation at a time and outputs the probability that a break has already happened; best official time-stratified AUC of 0.632.",
    href: "/analytics/cases/structural-break-detection",
    hrefLabel: "Read the case",
  },
];
