import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { ChevronDown, Loader2, Sparkles, Paperclip, ShieldCheck, Send, Lightbulb, Check, BookOpen, ArrowRight, UserCheck } from "lucide-react";
import { Panel, Tag, StatusIcon, ReadinessRing, SourceTrail, type Source } from "@/components/ui-bits";
import { useCase } from "@/lib/case-store";
import { LAYERS } from "@/lib/layers";

export const Route = createFileRoute("/precheck")({
  head: () => ({
    meta: [
      { title: "Authorization Pre-Check — Insurancly" },
      { name: "description", content: "Layered pre-check of request details and insurer interaction patterns without access to medical reports." },
      { property: "og:title", content: "Authorization Pre-Check — Insurancly" },
      { property: "og:description", content: "See findings, evidence sources and the next best action before NPHIES submission." },
    ],
  }),
  component: PreCheck,
});

function Analysis({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (i >= LAYERS.length) { const t = setTimeout(onDone, 500); return () => clearTimeout(t); }
    const t = setTimeout(() => setI(i + 1), 850);
    return () => clearTimeout(t);
  }, [i, onDone]);
  return (
    <Panel className="mx-auto max-w-2xl">
      <div className="mb-5 flex items-center gap-3">
        <Sparkles className="h-5 w-5 text-primary" />
        <div><h2 className="font-display text-lg font-semibold">Running Insurancly Pre-Check</h2><p className="text-xs text-muted-foreground">AUTH-24817 · Lumbar Spine MRI · Insurer X (Demo)</p></div>
      </div>
      <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full bg-primary transition-all duration-700" style={{ width: `${(i / LAYERS.length) * 100}%` }} /></div>
      <ol className="space-y-3">
        {LAYERS.map((l, idx) => (
          <li key={l.n} className={`flex items-center gap-3 rounded-xl border p-3 transition-all ${idx === i ? "border-primary bg-primary/5" : idx < i ? "opacity-100" : "opacity-40"}`}>
            {idx < i ? <Check className="h-4 w-4 text-success" /> : idx === i ? <Loader2 className="h-4 w-4 animate-spin text-primary" /> : <span className="h-4 w-4 rounded-full border" />}
            <div><div className="text-sm font-medium">Layer {l.n} — {l.name}</div><div className="text-xs text-muted-foreground">{l.d}</div></div>
          </li>
        ))}
      </ol>
    </Panel>
  );
}

function Row({ s, children, extra }: { s: "ok" | "fail" | "warn"; children: ReactNode; extra?: ReactNode }) {
  return (
    <li className="py-2">
      <div className="flex items-start gap-2 text-sm"><StatusIcon s={s} /><div className="flex-1">{children}</div></div>
      {extra && <div className="ml-6 mt-2">{extra}</div>}
    </li>
  );
}

function Why({ children, used }: { children: ReactNode; used: Source[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-lg border bg-secondary/40">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between gap-2 px-3 py-2 text-xs font-medium text-primary">
        Why was this flagged? <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="space-y-2 border-t px-3 py-3 text-xs animate-fade-in">{children}<div className="pt-1"><span className="mr-2 text-muted-foreground">Sources used:</span><SourceTrail used={used} /></div></div>}
    </div>
  );
}

function PreCheck() {
  const c = useCase();
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const [prepare, setPrepare] = useState(false);

  useEffect(() => {
    if (c.stage === "submitting") { const t = setTimeout(() => c.setStage("submitted"), 2200); return () => clearTimeout(t); }
    return undefined;
  }, [c.stage]); // eslint-disable-line react-hooks/exhaustive-deps

  if (c.stage === "draft") {
    return (
      <Panel className="mx-auto max-w-xl text-center">
        <ShieldCheck className="mx-auto h-8 w-8 text-primary" />
        <h2 className="mt-3 font-display text-lg font-semibold">No pre-check running</h2>
        <p className="mt-1 text-sm text-muted-foreground">Open the MRI case and run an Insurancly Pre-Check.</p>
        <Link to="/new-authorization" className="mt-4 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Open MRI case</Link>
      </Panel>
    );
  }
  if (c.stage === "checking") return <Analysis onDone={() => c.setStage("reviewed")} />;

  const ready = c.readiness === 100;
  const done = c.stage === "submitting" || c.stage === "submitted";

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <Panel>
        <div className="flex flex-wrap items-center gap-6">
          <ReadinessRing value={c.readiness} />
          <div className="min-w-60 flex-1">
            <p className="text-xs text-muted-foreground">AUTH-24817 · Sara Alharbi, 46 · Lumbar Spine MRI · Insurer X (Demo)</p>
            <h1 className="mt-1 font-display text-2xl font-semibold">Authorization Readiness: {c.readiness}%</h1>
             <p className="mt-1 text-sm text-muted-foreground">Measures available request details and team-confirmed items, not medical-report contents or the insurer’s decision.</p>
             <p className="mt-1 text-xs text-muted-foreground">Insurancly cannot view medical reports. Items below are prompts to confirm, not claims that information is absent from a report.</p>
            <div className="mt-3 flex flex-wrap gap-2">
               {ready ? <Tag tone="success"><Check className="h-3 w-3" /> Ready for NPHIES</Tag> : <Tag tone="warning">{(c.treatmentResponse ? 0 : 1) + (c.imagingConfirmed ? 0 : 1)} confirmation(s) needed</Tag>}
              <Tag>ICD-10-AM · Saudi / NPHIES terminology checked</Tag>
            </div>
          </div>
        </div>
      </Panel>

      {/* Three cards */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="1. NPHIES Technical Validation" subtitle="Layer 1 · Technical requirements" tag={<Tag tone="primary">Technical</Tag>}>
          <ul className="divide-y">
            <Row s="ok">Required NPHIES fields complete</Row>
            <Row s="ok">Patient and coverage identifiers valid</Row>
            <Row s="ok">Diagnosis code structurally valid <span className="text-xs text-muted-foreground">(M54.16, ICD-10-AM)</span></Row>
            <Row s="ok">Requested service linked to diagnosis</Row>
            <Row s="ok">Encounter dates consistent</Row>
             <Row s={c.imagingConfirmed ? "ok" : "warn"}>{c.imagingConfirmed ? "Supporting imaging status confirmed by team" : "Confirm whether supporting imaging is required and included"}</Row>
          </ul>
        </Panel>

         <Panel title="2. Clinical Documentation" subtitle="Layers 2–4 · Request details and team confirmation, not report review" tag={<Tag tone="success">Clinical</Tag>}>
          <ul className="divide-y">
             <Row s="ok" extra={<SourceTrail used={["Hospital"]} />}>Diagnosis listed in request</Row>
             <Row s="ok" extra={<SourceTrail used={["Hospital"]} />}>Clinical indication listed in request</Row>
             <Row s="warn" extra={<SourceTrail used={["Hospital"]} />}>Team must confirm supporting details against hospital protocol</Row>
            <Row s={c.treatmentResponse ? "ok" : "warn"} extra={
              <div className="space-y-2">
                <SourceTrail used={["Hospital", "Saudi", "International"]} />
                <Why used={["Hospital", "Saudi", "International"]}>
                  <p className="font-medium">Evidence hierarchy used</p>
                  <ol className="space-y-1.5">
                     <li><Tag tone="primary">Hospital</Tag> 1. Simulated hospital Orthopedic Imaging Protocol (RMC-ORTH-IMG-07) — <b>checked first</b>. Calls for confirmation of the response to ≥6 weeks of conservative treatment.</li>
                    <li><Tag tone="primary">Saudi</Tag> 2. Applicable Saudi guidance — checked where needed; supports documenting failed conservative management for elective imaging.</li>
                     <li><Tag tone="primary">International</Tag> 3. International guideline/reference (e.g. ACR Appropriateness Criteria, low-back pain) — consulted only where local guidance needs clarification.</li>
                  </ol>
                   <p className="text-muted-foreground">These sources guide the request-level prompt; they do not verify what is in an unseen medical report.</p>
                </Why>
              </div>
             }>{c.treatmentResponse ? "Conservative-treatment response confirmed by clinician" : "Confirm whether response to conservative treatment is documented"}</Row>
            <Row s="ok" extra={<SourceTrail used={["Hospital", "Saudi"]} />}>Relevant Saudi guidance reviewed</Row>
          </ul>
        </Panel>

         <Panel title="3. Information Available" subtitle="Request-level details only · no medical report or EHR access" tag={<Tag>Request</Tag>}>
          <ul className="divide-y">
             <Row s="ok">Physiotherapy and analgesics mentioned in request</Row>
             <Row s="warn">Duration and response cannot be verified from the request alone</Row>
             <Row s={c.treatmentResponse ? "ok" : "warn"} extra={!c.treatmentResponse && <Tag tone="warning">Team confirmation required</Tag>}>
               {c.treatmentResponse ? "Treatment response confirmed by clinician" : "Confirm treatment response with clinician"}
            </Row>
             <Row s={c.imagingConfirmed ? "ok" : "warn"}>{c.imagingConfirmed ? "Imaging requirements confirmed by team" : "Imaging report availability and attachment status unknown"}</Row>
          </ul>
        </Panel>
      </div>

      {/* Next action + intel */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel className="border-primary/40 lg:col-span-2" title={<span className="flex items-center gap-2"><Lightbulb className="h-4 w-4 text-primary" /> Recommended Next Action</span>} subtitle="Next-Best-Action Engine">
          {ready ? (
            <p className="text-sm">All identified items are resolved. Request is ready for final human review and NPHIES submission.</p>
          ) : (
             <p className="text-base leading-relaxed">“The request mentions prior treatment, but its response and any supporting imaging cannot be verified from unseen reports. Ask the clinical team to confirm both before submission.”</p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={() => setEvidenceOpen(!evidenceOpen)} className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-secondary"><BookOpen className="h-4 w-4" /> Review Evidence</button>
            {!done && <button onClick={() => setPrepare(true)} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"><Paperclip className="h-4 w-4" /> Prepare Request</button>}
          </div>
          {evidenceOpen && (
            <div className="mt-4 space-y-3 rounded-xl bg-secondary/50 p-4 text-sm animate-fade-in">
               <div><div className="text-xs font-medium text-muted-foreground">Available request information (simulated)</div><p className="mt-1">The request lists persistent radicular symptoms and prior physiotherapy and analgesics; it does not give treatment duration or response in enough detail to confirm the protocol prompt.</p></div>
               <div><div className="text-xs font-medium text-muted-foreground">Medical reports and attachments</div><p className="mt-1">Not accessible to Insurancly. Their contents and attachment status are unknown, not presumed missing.</p></div>
               <p className="text-xs text-muted-foreground">The team confirms these items from its own records. Insurancly does not invent or extract unseen clinical facts.</p>
            </div>
          )}
        </Panel>
        <Panel className="bg-intel-soft/40" title="Insurer interaction intelligence" subtitle="Layer 5 · Observed patterns, not insurer rules" tag={<Tag tone="intel">Observed</Tag>}>
          <p className="text-sm leading-relaxed">“In similar authorization interactions from this hospital during the previous 3 months, Insurer X frequently requested documentation of previous conservative treatment.”</p>
          <p className="mt-3 text-xs text-muted-foreground">Suggested: include treatment history and documented response before submission.</p>
          <Link to="/intelligence" className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-intel">View Insurer Intelligence <ArrowRight className="h-3 w-3" /></Link>
        </Panel>
      </div>

      {/* Prepare */}
      {(prepare || done) && (
        <Panel title="Prepare Request" subtitle="Human review — each item needs explicit confirmation by the authorization team or clinician">
          <div className="grid gap-4 md:grid-cols-2">
            <div className={`rounded-xl border p-4 ${c.treatmentResponse ? "border-success/40 bg-success-soft/40" : ""}`}>
               <div className="flex items-center justify-between"><span className="text-sm font-medium">Confirm treatment response</span><span className="text-xs text-muted-foreground">+17%</span></div>
               <p className="mt-2 rounded-lg bg-secondary/60 p-3 text-xs">The request mentions physiotherapy and analgesics. The clinician must check the underlying record and supply any relevant duration and response; Insurancly cannot see the report.</p>
               <textarea value={c.clinicianNote} onChange={(e) => c.setClinicianNote(e.target.value)} disabled={done} placeholder="Clinician-confirmed treatment response…" className="mt-2 w-full rounded-lg border bg-background p-2 text-xs" rows={2} />
               <p className="mt-1 text-[11px] text-muted-foreground">Enter the confirmed response before marking this item complete.</p>
               <button disabled={done || (!c.treatmentResponse && !c.clinicianNote.trim())} onClick={() => c.setTreatmentResponse(!c.treatmentResponse)} className={`mt-2 inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-50 ${c.treatmentResponse ? "bg-success text-success-foreground" : "bg-primary text-primary-foreground"}`}>
                 <UserCheck className="h-3.5 w-3.5" /> {c.treatmentResponse ? "Confirmed by clinician" : "Confirm response"}
              </button>
            </div>
             <div className={`rounded-xl border p-4 ${c.imagingConfirmed ? "border-success/40 bg-success-soft/40" : ""}`}>
               <div className="flex items-center justify-between"><span className="text-sm font-medium">Confirm supporting imaging status</span><span className="text-xs text-muted-foreground">+12%</span></div>
               <p className="mt-2 text-xs text-muted-foreground">The team should check whether an imaging report is required and, if so, include it in the submission. Insurancly cannot see or attach that report.</p>
               <button disabled={done} onClick={() => c.setImagingConfirmed(!c.imagingConfirmed)} className={`mt-3 inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium ${c.imagingConfirmed ? "bg-success text-success-foreground" : "bg-primary text-primary-foreground"}`}>
                 <UserCheck className="h-3.5 w-3.5" /> {c.imagingConfirmed ? "Confirmed by team" : "Team confirms status"}
              </button>
            </div>
          </div>
          {ready && !done && (
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-success/40 bg-success-soft/50 p-4">
               <div><div className="flex items-center gap-2 font-display text-lg font-semibold text-success"><ShieldCheck className="h-5 w-5" /> Ready for NPHIES</div><p className="text-xs text-muted-foreground">Team-confirmed demo items complete. Final submission review and coverage decision remain with the team and insurer respectively.</p></div>
              <button onClick={() => c.setStage("submitting")} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"><Send className="h-4 w-4" /> Simulate NPHIES submission</button>
            </div>
          )}
        </Panel>
      )}

      {done && <InsurerInteraction submitted={c.stage === "submitted"} />}
    </div>
  );
}

function InsurerInteraction({ submitted }: { submitted: boolean }) {
  const steps = [
     { t: "16:21", l: "Request submitted to NPHIES (simulated)", d: "Pre-authorization request · supporting materials confirmed by team, not accessed by Insurancly" },
    { t: "16:21", l: "NPHIES technical acknowledgement (simulated)", d: "Message structure accepted" },
    { t: "16:34", l: "Insurer X (Demo) response received (simulated)", d: "Decision made by the insurer: Authorized — MRI Lumbar Spine, 1 study, valid 30 days. No additional-information request." },
  ];
  return (
    <Panel title="Simulated Insurer Interaction" subtitle="Demo timeline — no real NPHIES or insurer connection" tag={<Tag tone="neutral">Simulation</Tag>}>
      {!submitted ? (
        <div className="flex items-center gap-3 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin text-primary" /> Sending through simulated NPHIES channel…</div>
      ) : (
        <>
          <ol className="relative space-y-4 border-l pl-6">
            {steps.map((s) => (
              <li key={s.l} className="animate-fade-in">
                <span className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-primary" />
                <div className="text-xs text-muted-foreground">{s.t}</div>
                <div className="text-sm font-medium">{s.l}</div>
                <div className="text-xs text-muted-foreground">{s.d}</div>
              </li>
            ))}
          </ol>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-intel-soft/50 p-4 text-sm">
            <span>This interaction has been added to the hospital's rolling Insurer Intelligence (Layer 5).</span>
            <Link to="/intelligence" className="inline-flex items-center gap-1 rounded-lg bg-intel px-3 py-2 text-xs font-medium text-intel-foreground">Open Insurer Intelligence <ArrowRight className="h-3 w-3" /></Link>
          </div>
        </>
      )}
    </Panel>
  );
}
