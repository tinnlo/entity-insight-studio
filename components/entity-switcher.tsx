"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { EntityOption } from "@/types/demo";

type EntitySwitcherProps = {
  currentSlug: string;
  options: EntityOption[];
};

export function EntitySwitcher({
  currentSlug,
  options,
}: EntitySwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <label className="flex min-w-[220px] flex-col gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
      Selected Entity
      <select
        value={currentSlug}
        onChange={(event) => {
          const params = new URLSearchParams(searchParams.toString());
          params.set("entity", event.target.value);
          router.push(`${pathname}?${params.toString()}`);
        }}
        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium tracking-normal text-slate-950 shadow-sm outline-none transition focus:border-sky-400"
      >
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
