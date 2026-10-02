import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FilePlus2, Layers } from "lucide-react";
import { Panel, Tag } from "@/components/ui-bits";
import { useCase } from "@/lib/case-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Insurancly Authorization Intelligence" },
      { name: "description", content: "Insurancly demo dashboard: authorization pre-check queue, readiness and insurer interaction intelligence." },
      { property: "og:title", content: "Insurancly — Authorization Intelligence Dashboard" },
      { property: "og:description", content: "Improve authorization-request quality before NPHIES submission. Demo simulation." },
    ],
  }),
  component: Dashboard,
});

export const LAYERS = [
  { n: 1, name: "Technical Compliance", d: "NPHIES requirements, coding, mandatory fields, documentation structure." },
  { n: 2, name: "Hospital Knowledge", d: "Hospital-approved protocols, internal documentation standards and workflows." },
  { n: 3, name: "Saudi Knowledge", d: "Applicable Saudi clinical/regulatory guidance, national standards and SFDA information." },
  { n: 4, name: "International Knowledge", d: "International classifications and guidelines — only when local guidance is insufficient." },
  { n: 5, name: "Hospital-Specific Insurer Intelligence", d: "Rolling analysis of this hospital's own authorization interactions." },
];

function Dashboard() {
  const { stage, readiness } = useCase();
  const queue = [
    { id: "AUTH-24817", p: "Sara Alharbi", s: "Lumbar Spine MRI", ins: "Insurer X (Demo)", st: stage === "submitted" ? "Submitted" : stage === "ready" ? "Ready for NPHIES" : stage === "draft" ? "Awaiting pre-check" : "In review", r: stage === "draft" ? null : readiness, live: true },
    { id: "AUTH-24811", p: "Faisal Alqahtani", s: "Knee arthroscopy", ins: "Insurer Y (Demo)", st: "Ready for NPHIES", r: 100 },
    { id: "AUTH-24806", p: "Huda Alzahrani", s: "Cardiac echo", ins: "Insurer X (Demo)", st: "In review", r: 82 },
    { id: "AUTH-24799", p: "Omar Alshehri", s: "Biologic therapy (SFDA-registered)", ins: "Insurer Z (Demo)", st: "Clinician input required", r: 64 },
  ];
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Riyadh Medical Center (Demo) · Authorization Office</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Good afternoon, Nora</h1>
        </div>
        <Link to="/new-authorization" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-card hover:bg-primary/90">
          <FilePlus2 className="h-4 w-4" /> New Authorization
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Requests pre-checked (30d)", "1,142"],
          ["Avg. Authorization Readiness at first check", "78%"],
          ["Additional-info requests (90d, observed)", "74 / 318"],
          ["Issues resolvable from existing EHR", "61%"],
        ].map(([k, v]) => (
          <Panel key={k}><p className="text-xs text-muted-foreground">{k}</p><p className="mt-2 font-display text-2xl font-semibold">{v}</p></Panel>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Pre-check queue" subtitle="Requests awaiting human review before NPHIES" className="lg:col-span-2">
          <div className="divide-y">
            {queue.map((q) => (
              <div key={q.id} className="flex flex-wrap items-center gap-3 py-3 text-sm">
                <span className="w-24 font-mono text-xs text-muted-foreground">{q.id}</span>
                <div className="min-w-40 flex-1"><div className="font-medium">{q.p}</div><div className="text-xs text-muted-foreground">{q.s} · {q.ins}</div></div>
                <Tag tone={q.st.startsWith("Ready") || q.st === "Submitted" ? "success" : q.st.includes("input") ? "danger" : "warning"}>{q.st}</Tag>
                <span className="w-12 text-right font-medium">{q.r ? `${q.r}%` : "—"}</span>
                {q.live ? (
                  <Link to={stage === "draft" ? "/new-authorization" : "/precheck"} className="inline-flex items-center gap-1 text-xs font-medium text-primary">Open <ArrowRight className="h-3 w-3" /></Link>
                ) : <span className="w-12" />}
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Intelligence layers" subtitle="Powering the Next-Best-Action Engine" tag={<Layers className="h-4 w-4 text-primary" />}>
          <ol className="space-y-3">
            {LAYERS.map((l) => (
              <li key={l.n} className="flex gap-3">
                <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-semibold ${l.n === 5 ? "bg-intel-soft text-intel" : "bg-primary/10 text-primary"}`}>{l.n}</span>
                <div><div className="text-sm font-medium">{l.name}</div><div className="text-xs text-muted-foreground">{l.d}</div></div>
              </li>
            ))}
          </ol>
        </Panel>
      </div>

      <Panel title="Where Insurancly sits">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {["Hospital EHR", "Insurancly Pre-Check", "Human Review", "NPHIES", "Insurer"].map((s, i, a) => (
            <span key={s} className="flex items-center gap-2">
              <span className={`rounded-lg border px-3 py-2 ${s === "Insurancly Pre-Check" ? "border-primary bg-primary/10 font-medium text-primary" : "bg-secondary"}`}>{s}</span>
              {i < a.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
            </span>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Insurancly improves request quality before submission. It does not replace NPHIES and does not make coverage decisions.</p>
      </Panel>
    </div>
  );
}
