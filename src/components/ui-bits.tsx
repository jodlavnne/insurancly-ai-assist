import type { ReactNode } from "react";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

export function Panel({ title, subtitle, tag, children, className = "" }: { title?: ReactNode; subtitle?: ReactNode; tag?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border bg-card p-5 shadow-card ${className}`}>
      {(title || tag) && (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            {title && <h3 className="font-display text-base font-semibold">{title}</h3>}
            {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
          </div>
          {tag}
        </div>
      )}
      {children}
    </section>
  );
}

export function Tag({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "primary" | "success" | "warning" | "danger" | "intel" }) {
  const map = {
    neutral: "bg-secondary text-secondary-foreground",
    primary: "bg-primary/10 text-primary",
    success: "bg-success-soft text-success",
    warning: "bg-warning-soft text-warning-foreground",
    danger: "bg-destructive/10 text-destructive",
    intel: "bg-intel-soft text-intel",
  } as const;
  return <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${map[tone]}`}>{children}</span>;
}

export function StatusIcon({ s }: { s: "ok" | "fail" | "warn" }) {
  if (s === "ok") return <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />;
  if (s === "warn") return <AlertTriangle className="h-4 w-4 shrink-0 text-warning" />;
  return <XCircle className="h-4 w-4 shrink-0 text-destructive" />;
}

export function ReadinessRing({ value, size = 120 }: { value: number; size?: number }) {
  const r = (size - 14) / 2;
  const c = 2 * Math.PI * r;
  const tone = value >= 100 ? "var(--success)" : value >= 85 ? "var(--primary)" : "var(--warning)";
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--muted)" strokeWidth="10" fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke={tone} strokeWidth="10" fill="none" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)} style={{ transition: "stroke-dashoffset 800ms ease" }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-2xl font-semibold">{value}%</span>
        <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Readiness</span>
      </div>
    </div>
  );
}

export const SOURCES = ["Hospital", "Saudi", "International"] as const;
export type Source = (typeof SOURCES)[number];

/** Shows the evidence hierarchy; sources actually used are highlighted, others greyed. */
export function SourceTrail({ used }: { used: Source[] }) {
  return (
    <div className="flex flex-wrap items-center gap-1 text-[10px]">
      {SOURCES.map((s, i) => (
        <span key={s} className="flex items-center gap-1">
          <span className={`rounded px-1.5 py-0.5 font-medium ${used.includes(s) ? "bg-primary text-primary-foreground" : "border border-dashed text-muted-foreground/60 line-through decoration-muted-foreground/30"}`}>
            {s}
          </span>
          {i < 2 && <span className="text-muted-foreground">→</span>}
        </span>
      ))}
    </div>
  );
}
