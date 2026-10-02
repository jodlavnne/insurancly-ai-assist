import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type Stage = "draft" | "checking" | "reviewed" | "ready" | "submitting" | "submitted";

type CaseState = {
  stage: Stage;
  treatmentResponse: boolean;
  imagingAttached: boolean;
  clinicianNote: string;
  setStage: (s: Stage) => void;
  setTreatmentResponse: (v: boolean) => void;
  setImagingAttached: (v: boolean) => void;
  setClinicianNote: (v: string) => void;
  readiness: number;
  reset: () => void;
};

const Ctx = createContext<CaseState | null>(null);

export const EHR_TREATMENT_EXCERPT =
  "Physiotherapy (RMC Rehab, 6 weeks, 12 sessions, Jun–Jul 2026): partial improvement in axial pain; persistent left L5 radicular pain. NSAID (naproxen 500 mg BID, 4 weeks) — limited response, VAS 7/10 at last review (14 Aug 2026).";

export function CaseProvider({ children }: { children: ReactNode }) {
  const [stage, setStage] = useState<Stage>("draft");
  const [treatmentResponse, setTreatmentResponse] = useState(false);
  const [imagingAttached, setImagingAttached] = useState(false);
  const [clinicianNote, setClinicianNote] = useState("");
  const readiness = 71 + (treatmentResponse ? 17 : 0) + (imagingAttached ? 12 : 0);
  const value = useMemo(
    () => ({
      stage,
      treatmentResponse,
      imagingAttached,
      clinicianNote,
      setStage,
      setTreatmentResponse,
      setImagingAttached,
      setClinicianNote,
      readiness,
      reset: () => {
        setStage("draft");
        setTreatmentResponse(false);
        setImagingAttached(false);
        setClinicianNote("");
      },
    }),
    [stage, treatmentResponse, imagingAttached, clinicianNote, readiness],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCase() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCase outside provider");
  return c;
}
