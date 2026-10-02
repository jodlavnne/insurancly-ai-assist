import { createFileRoute } from "@tanstack/react-router";
import { Panel, Tag } from "@/components/ui-bits";
import { useCase } from "@/lib/case-store";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Authorization History — Insurancly" },
      { name: "description", content: "Past authorization requests with readiness at first check, at submission, and the insurer's simulated response." },
      { property: "og:title", content: "Authorization History — Insurancly" },
      { property: "og:description", content: "Track how pre-checks improved request quality before NPHIES submission." },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  const { stage } = useCase();
  const rows = [
    ...(stage === "submitted" ? [{ id: "AUTH-24817", d: "02 Oct 2026", p: "Sara Alharbi", s: "Lumbar Spine MRI", i: "Insurer X (Demo)", a: 71, b: 100, r: "Authorized by insurer" }] : []),
    { id: "AUTH-24790", d: "01 Oct 2026", p: "Ahmed Alotaibi", s: "Cervical MRI", i: "Insurer X (Demo)", a: 76, b: 100, r: "Authorized by insurer" },
    { id: "AUTH-24772", d: "30 Sep 2026", p: "Reem Aldossary", s: "Shoulder arthroscopy", i: "Insurer Y (Demo)", a: 88, b: 100, r: "Additional info requested" },
    { id: "AUTH-24751", d: "29 Sep 2026", p: "Majed Alghamdi", s: "Biologic therapy (SFDA-registered)", i: "Insurer Z (Demo)", a: 62, b: 94, r: "Under insurer review" },
    { id: "AUTH-24733", d: "28 Sep 2026", p: "Lama Alharthi", s: "Knee MRI", i: "Insurer X (Demo)", a: 81, b: 100, r: "Authorized by insurer" },
  ];
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <h1 className="font-display text-3xl font-semibold tracking-tight">Authorization History</h1>
      <Panel>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs text-muted-foreground">
              <tr>{["ID", "Date", "Patient", "Service", "Insurer", "Readiness: first check → submitted", "Insurer response (simulated)"].map((h) => <th key={h} className="pb-3 pr-4 font-medium">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y">
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className="py-3 pr-4 font-mono text-xs">{r.id}</td><td className="pr-4">{r.d}</td><td className="pr-4 font-medium">{r.p}</td><td className="pr-4">{r.s}</td><td className="pr-4">{r.i}</td>
                  <td className="pr-4">{r.a}% → <b>{r.b}%</b></td>
                  <td><Tag tone={r.r.startsWith("Authorized") ? "success" : r.r.includes("info") ? "warning" : "neutral"}>{r.r}</Tag></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">Insurer responses are decisions made by the insurer, shown here as simulated records.</p>
      </Panel>
    </div>
  );
}
