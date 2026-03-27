import Link from "next/link";
import { BarChart3, GitBranch, Radar } from "lucide-react";
import { EntitySwitcher } from "@/components/entity-switcher";
import type { EntityOption } from "@/types/demo";

type StudioShellProps = {
  currentPath: "/overview" | "/relationships" | "/scenarios";
  currentSlug: string;
  options: EntityOption[];
  children: React.ReactNode;
};

const links = [
  { href: "/overview", label: "Overview", icon: BarChart3 },
  { href: "/relationships", label: "Relationships", icon: GitBranch },
  { href: "/scenarios", label: "Scenarios", icon: Radar },
] as const;

export function StudioShell({
  currentPath,
  currentSlug,
  options,
  children,
}: StudioShellProps) {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-6 py-8 md:px-10 md:py-10">
      <header className="rounded-[1.75rem] border border-white/70 bg-white/80 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link
              href="/"
              className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700"
            >
              Entity Insight Studio
            </Link>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
              Fixture-backed entity analytics with a focused dashboard, a
              relationship graph, and a scenario explorer.
            </p>
          </div>
          <EntitySwitcher currentSlug={currentSlug} options={options} />
        </div>
        <nav className="mt-5 flex flex-wrap gap-3">
          {links.map(({ href, label, icon: Icon }) => {
            const active = href === currentPath;
            return (
              <Link
                key={href}
                href={`${href}?entity=${currentSlug}`}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-slate-950 text-white"
                    : "border border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:text-slate-950"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>
      </header>
      {children}
    </div>
  );
}
