import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type Stage = "draft" | "checking" | "reviewed" | "ready" | "submitting" | "submitted";

type CaseState = {
  stage: Stage;
  treatmentResponse: boolean;
  imagingConfirmed: boolean;
  clinicianNote: string;
  setStage: (s: Stage) => void;
  setTreatmentResponse: (v: boolean) => void;
  setImagingConfirmed: (v: boolean) => void;
  setClinicianNote: (v: string) => void;
  readiness: number;
  reset: () => void;
};

const Ctx = createContext<CaseState | null>(null);

export function CaseProvider({ children }: { children: ReactNode }) {
  const [stage, setStage] = useState<Stage>("draft");
  const [treatmentResponse, setTreatmentResponse] = useState(false);
  const [imagingConfirmed, setImagingConfirmed] = useState(false);
  const [clinicianNote, setClinicianNote] = useState("");
  const readiness = 71 + (treatmentResponse ? 17 : 0) + (imagingConfirmed ? 12 : 0);
  const value = useMemo(
    () => ({
      stage,
      treatmentResponse,
      imagingConfirmed,
      clinicianNote,
      setStage,
      setTreatmentResponse,
      setImagingConfirmed,
      setClinicianNote,
      readiness,
      reset: () => {
        setStage("draft");
        setTreatmentResponse(false);
        setImagingConfirmed(false);
        setClinicianNote("");
      },
    }),
    [stage, treatmentResponse, imagingConfirmed, clinicianNote, readiness],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCase() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCase outside provider");
  return c;
}
