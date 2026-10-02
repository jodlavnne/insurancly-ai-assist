import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { LayoutDashboard, FilePlus2, ShieldCheck, LineChart, History, Info } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import { useCase } from "@/lib/case-store";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/new-authorization", label: "New Authorization", icon: FilePlus2 },
  { to: "/precheck", label: "Authorization Pre-Check", icon: ShieldCheck },
  { to: "/intelligence", label: "Insurer Intelligence", icon: LineChart },
  { to: "/history", label: "Authorization History", icon: History },
] as const;

const journey = [
  { label: "Dashboard", to: "/" },
  { label: "MRI Case", to: "/new-authorization" },
  { label: "Pre-Check", to: "/precheck" },
  { label: "Prepare", to: "/precheck" },
  { label: "Ready for NPHIES", to: "/precheck" },
  { label: "Insurer Interaction", to: "/precheck" },
  { label: "Intelligence", to: "/intelligence" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { stage, readiness } = useCase();
  const step =
    path === "/intelligence" ? 6
    : path === "/new-authorization" ? 1
    : path === "/precheck"
      ? stage === "submitted" || stage === "submitting" ? 5
        : stage === "ready" ? 4
        : readiness > 71 ? 3
        : 2
    : 0;

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="hidden w-64 shrink-0 flex-col border-r bg-sidebar lg:flex">
        <div className="flex items-center gap-3 px-5 py-5">
          <img src={logo.url} alt="Insurancly" className="h-10 w-10 rounded-xl" />
          <div>
            <div className="font-display text-lg font-semibold leading-none">Insurancly</div>
            <div className="mt-1 text-[11px] text-muted-foreground">Authorization Intelligence</div>
          </div>
        </div>
        <nav className="mt-2 flex flex-col gap-1 px-3">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: true }}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent"
              activeProps={{ className: "bg-sidebar-accent font-medium text-primary" }}
            >
              <n.icon className="h-4 w-4" />
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto m-4 rounded-xl border bg-card p-3 text-xs text-muted-foreground">
          <div className="mb-1 font-medium text-foreground">Riyadh Medical Center (Demo)</div>
          Authorization Office · Orthopedics
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2 border-b bg-warning-soft px-6 py-2 text-xs text-warning-foreground">
          <Info className="h-3.5 w-3.5 shrink-0" />
          Demo simulation with fictional data. No live connection to NPHIES, EHR, insurers, SFDA or government systems.
          Final review stays with the authorization team; the coverage decision stays with the insurer.
        </div>
        <header className="flex items-center justify-between gap-4 border-b bg-card px-6 py-3">
          <div className="flex items-center gap-3 lg:hidden">
            <img src={logo.url} alt="Insurancly" className="h-8 w-8 rounded-lg" />
            <span className="font-display font-semibold">Insurancly</span>
          </div>
          <ol className="hidden items-center gap-1 overflow-x-auto text-xs md:flex">
            {journey.map((j, i) => (
              <li key={j.label} className="flex items-center gap-1">
                <Link
                  to={j.to}
                  className={`rounded-full px-2.5 py-1 whitespace-nowrap ${
                    i === step ? "bg-primary text-primary-foreground"
                    : i < step ? "bg-success-soft text-success" : "text-muted-foreground"
                  }`}
                >
                  {i + 1}. {j.label}
                </Link>
                {i < journey.length - 1 && <span className="text-border">—</span>}
              </li>
            ))}
          </ol>
          <div className="flex items-center gap-2 text-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">NA</div>
            <span className="hidden text-muted-foreground sm:inline">Nora A. · Auth. Specialist</span>
          </div>
        </header>
        <div className="flex gap-1 overflow-x-auto border-b px-4 py-2 lg:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: true }} className="whitespace-nowrap rounded-md px-3 py-1 text-xs text-muted-foreground" activeProps={{ className: "bg-secondary text-primary" }}>
              {n.label}
            </Link>
          ))}
        </div>
        <main className="flex-1 px-4 py-6 md:px-8">{children}</main>
      </div>
    </div>
  );
}
