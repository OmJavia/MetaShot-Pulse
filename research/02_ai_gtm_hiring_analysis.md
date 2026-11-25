# AI GTM hiring analysis

## Method

Fifteen live/recent company career pages were reviewed on 25 Nov 2026; URLs are in `source_references.md`. Postings can change or close. The extraction below captures the recurring, project-relevant requirements—not a claim that every firm uses every tool.

| Company / role | Responsibilities | Technical + GTM signals | Project implication |
|---|---|---|---|
| Multiverse / GTM Engineer | AI workflows, middleware, CRM flow | RevOps, Salesforce, APIs, automation | observable jobs + integrations |
| Humaans / GTM Engineer | enrichment, scoring, signals, outbound | HubSpot, Clay, SQL/Python/JS, deliverability | data lineage + scoring + guardrails |
| Zyphra / GTM Engineer | prospecting through pipeline | AI tools, segmentation, messaging | end-to-end workflow |
| HUD / GTM Engineer | targeting to meeting booking | Clay/Apollo, coding, metrics | pipeline feedback loop |
| Pogo / GTM Engineer | internal agents and attribution | RAG, evals, tool use, webhooks | AI evaluation lab |
| Fireworks / GTM Engineer | CRM governance, reporting | Salesforce, GTM tools | source-of-truth metrics |
| Mitek / GTM Engineer | lifecycle, routing, data quality | Salesforce, agents, structured outputs | governed lifecycle states |
| Nash / GTM Engineer | agent evaluation, provenance | CRM, entity resolution, signal logic | freshness + evidence types |
| Softdocs / GTM Engineer | attribution and outbound automation | Clay, Outreach, HubSpot, APIs | integrations with fallback |
| Runway / GTM Engineer | scoring, routing, seller adoption | Clay, SQL, APIs, agents | actionable work queue |
| Forgepoint / GTM Engineer | enrichment and AI internal tools | scripts, APIs, LLMs | resilient job orchestration |
| Nova/Titan / GTM Engineer | AI agents for GTM operations | Claude workflows, internal tools | human approval controls |
| True Talent / GTM Engineer | ICP mapping and playbooks | Clay, n8n, AI coding | configurable ICP templates |
| Concourse / Founding GTM Engineer | account engine and pipeline measurement | agents, CRM, enrichment | account-level evidence + feedback |
| Clera / GTM Engineer | targeting, messaging, funnel optimization | automation, Clay/Apollo | safe personalisation |

## Prioritised skills matrix

| Capability | Priority | ChannelSignal proof |
|---|---:|---|
| Data model, provenance, hygiene | Critical | accounts, sources, evidence, dedupe, audit log |
| API/webhook integrations | Critical | provider adapters, HubSpot sync, replayable jobs |
| AI workflows with structured outputs | Critical | research/score/draft schemas + validation |
| ICP, segmentation and scoring | Critical | configurable weighted criteria + reasons |
| GTM lifecycle/routing | Critical | explicit pipeline state machine + tasks |
| Measurement and attribution | Critical | denominator-defined funnel metrics |
| Human-in-the-loop governance | Critical | review queues, override audit, no autonomous send |
| Deliverability/compliance | Important | suppression, send gate, simulation |
| Experiment design | Important | evaluation runs and message variants |
| SQL/Python/TypeScript | Important | production stack and tests |

The portfolio feature to optimize for is not “an agent”; it is a trustworthy operating system that a seller can challenge, correct, and use.
