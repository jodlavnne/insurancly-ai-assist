import { createFileRoute } from "@tanstack/react-router";
import { Panel, Tag } from "@/components/ui-bits";
import { useCase } from "@/lib/case-store";

export const Route = createFileRoute("/intelligence")({
  head: () => ({
    meta: [
      { title: "Insurer Intelligence — Insurancly" },
      { name: "description", content: "Observed patterns from this hospital's own authorization interactions with insurers over the previous 3 months." },
      { property: "og:title", content: "Insurer Intelligence — Insurancly" },
      { property: "og:description", content: "Hospital-specific insurer interaction patterns. Observed behavior, not official insurer rules." },
    ],
  }),
  component: Intel,
});

function Intel() {
  const { stage } = useCase();
  const extra = stage === "submitted" ? 1 : 0;
  const reasons = [
    { r: "Prior conservative-treatment documentation", n: 31 },
    { r: "Imaging report / prior study", n: 22 },
    { r: "Neurological exam detail", n: 11 },
    { r: "Duration of symptoms", n: 6 },
    { r: "Other", n: 4 },
  ];
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">Layer 5 · Hospital-Specific Insurer Intelligence</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Insurer X (Demo) — Lumbar spine MRI</h1>
        <p className="mt-1 max-w-3xl text-sm text-muted-foreground">Observed patterns from Riyadh Medical Center's own interactions during the previous 3 months. These are not official insurer rules and do not predict approval or rejection.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Similar authorizations", String(318 + extra)],
          ["Additional-information requests", "74"],
          ["Addressable from existing EHR data", "61%"],
          ["Avg. response time (observed)", "11.4 h"],
        ].map(([k, v]) => <Panel key={k}><p className="text-xs text-muted-foreground">{k}</p><p className="mt-2 font-display text-2xl font-semibold">{v}</p></Panel>)}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel className="lg:col-span-2" title="What was requested in additional-information requests" subtitle="74 requests · previous 3 months · observed">
          <div className="space-y-3">
            {reasons.map((x) => (
              <div key={x.r}>
                <div className="flex justify-between text-sm"><span>{x.r}</span><span className="text-muted-foreground">{x.n}</span></div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-intel" style={{ width: `${(x.n / 31) * 100}%` }} /></div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2"><Tag tone="intel">Prior-treatment documentation frequently requested</Tag><Tag tone="intel">Imaging reports frequently requested</Tag></div>
        </Panel>
        <Panel className="bg-intel-soft/40" title="Insurancly Insight" tag={<Tag tone="intel">Observed</Tag>}>
          <p className="text-sm leading-relaxed">“In similar authorization interactions from this hospital during the previous 3 months, Insurer X frequently requested documentation of previous conservative treatment.”</p>
          <div className="mt-4 rounded-lg bg-card p-3 text-sm"><div className="text-xs font-medium text-muted-foreground">Suggested next action</div>Include treatment history and documented response before submission.</div>
          {extra > 0 && <p className="mt-4 text-xs text-intel">AUTH-24817 (Sara Alharbi) was added to this rolling analysis.</p>}
        </Panel>
      </div>
      <Panel title="How to read this">
        <div className="grid gap-4 text-sm md:grid-cols-3">
          <div><Tag tone="primary">NPHIES technical</Tag><p className="mt-2 text-muted-foreground">Format, coding and mandatory fields. Checked in Layer 1.</p></div>
          <div><Tag tone="success">Clinical readiness</Tag><p className="mt-2 text-muted-foreground">Documentation quality against Hospital → Saudi → International (when needed) evidence.</p></div>
          <div><Tag tone="intel">Insurer intelligence</Tag><p className="mt-2 text-muted-foreground">What this hospital has observed. The insurer alone makes coverage decisions.</p></div>
        </div>
      </Panel>
    </div>
  );
}
