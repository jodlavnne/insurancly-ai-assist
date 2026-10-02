import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { Panel, Tag } from "@/components/ui-bits";
import { useCase } from "@/lib/case-store";

export const Route = createFileRoute("/new-authorization")({
  head: () => ({
    meta: [
      { title: "New Authorization — Lumbar Spine MRI | Insurancly" },
      { name: "description", content: "Simulated prior-authorization request details, ready for a pre-check without access to medical reports." },
      { property: "og:title", content: "New Authorization — Insurancly" },
      { property: "og:description", content: "Simulated MRI authorization case for Sara Alharbi, Riyadh Medical Center (Demo)." },
    ],
  }),
  component: NewAuth,
});

function Field({ k, v }: { k: string; v: string }) {
  return <div><dt className="text-xs text-muted-foreground">{k}</dt><dd className="mt-0.5 text-sm font-medium">{v}</dd></div>;
}

function NewAuth() {
  const { setStage, stage } = useCase();
  const nav = useNavigate();
  const run = () => { if (stage === "draft") setStage("checking"); nav({ to: "/precheck" }); };
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
           <p className="text-sm text-muted-foreground">AUTH-24817 · Simulated authorization request · Medical reports not accessible to Insurancly</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Lumbar Spine MRI — Sara Alharbi</h1>
        </div>
        <button onClick={run} className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-elegant hover:bg-primary/90">
          <Sparkles className="h-4 w-4" /> {stage === "draft" ? "Run Insurancly Pre-Check" : "Open Pre-Check results"}
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Patient & coverage" className="lg:col-span-1">
          <dl className="grid grid-cols-2 gap-4">
            <Field k="Patient" v="Sara Alharbi" /><Field k="Age / Sex" v="46 · F" />
            <Field k="MRN" v="RMC-0045821" /><Field k="National ID" v="1•••••••47" />
            <Field k="Insurer" v="Insurer X (Demo)" /><Field k="Policy class" v="Gold B" />
            <Field k="Member ID" v="IX-88231-04" /><Field k="Hospital" v="Riyadh Medical Center (Demo)" />
          </dl>
        </Panel>
        <Panel title="Requested service" className="lg:col-span-2" tag={<Tag tone="primary">Orthopedics</Tag>}>
          <dl className="grid grid-cols-2 gap-4 md:grid-cols-3">
            <Field k="Service" v="MRI Lumbar Spine without contrast" />
            <Field k="Diagnosis" v="Chronic low-back pain with radicular symptoms" />
            <Field k="ICD-10-AM" v="M54.16 · Radiculopathy, lumbar region" />
            <Field k="Requesting physician" v="Dr. Khalid Almutairi" />
            <Field k="Encounter date" v="28 Sep 2026" />
            <Field k="Priority" v="Elective" />
          </dl>
        </Panel>
      </div>

       <Panel title="Clinical information in request" subtitle="Fictional request details provided for this demo; not verified against a medical report">
        <div className="space-y-2 rounded-xl bg-secondary/60 p-4 text-sm leading-relaxed">
          <p>46-year-old female with 5-month history of low-back pain radiating to the left leg along the L5 dermatome. Reports numbness over dorsum of left foot. SLR positive at 40° on the left. No bowel/bladder dysfunction. No red flags for malignancy or infection.</p>
          <p>Previously managed with physiotherapy and analgesics. Symptoms persist and affect daily function and work.</p>
          <p className="font-medium">Plan: MRI lumbar spine to evaluate for disc herniation / nerve-root compression and guide further management.</p>
        </div>
         <p className="mt-4 text-xs text-muted-foreground">Report contents and supporting attachments are not visible here. The authorization team must confirm them before submission.</p>
      </Panel>
    </div>
  );
}
