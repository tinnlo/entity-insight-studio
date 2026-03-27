"use client";

import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ScenarioPoint } from "@/types/demo";

type ScenarioExplorerProps = {
  entityName: string;
  points: ScenarioPoint[];
};

type PathMode = "committed" | "accelerated";

const pathLabels: Record<PathMode, string> = {
  committed: "Transition Plan",
  accelerated: "Accelerated Path",
};

export function ScenarioExplorer({
  entityName,
  points,
}: ScenarioExplorerProps) {
  const [mode, setMode] = useState<PathMode>("committed");
  const [selectedYear, setSelectedYear] = useState(points.at(-1)?.year ?? 2036);

  const selectedPoint = useMemo(
    () =>
      points.find((point) => point.year === selectedYear) ??
      points.at(-1) ??
      null,
    [points, selectedYear],
  );

  return (
    <div className="grid gap-6">
      <div className="rounded-[1.75rem] border border-white/70 bg-white/85 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
              Scenario Explorer
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">
              Modeled portfolio intensity pathways for {entityName}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
              Compare the baseline trajectory against a management plan or an
              accelerated path, then read the selected year against two
              benchmark curves.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(pathLabels) as PathMode[]).map((path) => (
              <button
                key={path}
                type="button"
                onClick={() => setMode(path)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  mode === path
                    ? "bg-slate-950 text-white"
                    : "border border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-950"
                }`}
              >
                {pathLabels[path]}
              </button>
            ))}
          </div>
        </div>

        <div className="h-[420px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={points}>
              <CartesianGrid stroke="rgba(148,163,184,0.18)" />
              <XAxis
                dataKey="year"
                tick={{ fill: "#475569", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#475569", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 16,
                  border: "1px solid rgba(148,163,184,0.22)",
                  backgroundColor: "rgba(255,255,255,0.96)",
                }}
              />
              <Legend />
              <ReferenceLine x={selectedYear} stroke="#0f172a" strokeDasharray="4 4" />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#0f172a"
                strokeWidth={3}
                dot={false}
                name="Baseline"
              />
              <Line
                type="monotone"
                dataKey={mode}
                stroke="#0ea5e9"
                strokeWidth={3}
                dot={false}
                name={pathLabels[mode]}
              />
              <Line
                type="monotone"
                dataKey="benchmark2"
                stroke="#f97316"
                strokeWidth={2}
                strokeDasharray="6 4"
                dot={false}
                name="Below 2°C"
              />
              <Line
                type="monotone"
                dataKey="benchmark15"
                stroke="#84cc16"
                strokeWidth={2}
                strokeDasharray="6 4"
                dot={false}
                name="1.5°C"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[1.75rem] border border-white/70 bg-white/85 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Selected Year
              </p>
              <h3 className="mt-2 text-xl font-semibold text-slate-950">
                {selectedYear}
              </h3>
            </div>
            <div className="text-right text-sm text-slate-500">
              {selectedPoint
                ? `${pathLabels[mode]} requires $${selectedPoint.capex.toFixed(1)}B cumulative capex`
                : "No scenario point found"}
            </div>
          </div>
          <input
            type="range"
            min={points[0]?.year ?? 2024}
            max={points.at(-1)?.year ?? 2040}
            step={1}
            value={selectedYear}
            onChange={(event) => setSelectedYear(Number(event.target.value))}
            className="mt-6 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-slate-950"
          />
          <div className="mt-3 flex items-center justify-between text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
            <span>{points[0]?.year}</span>
            <span>{points.at(-1)?.year}</span>
          </div>
        </div>

        <div className="grid gap-4">
          <MetricChip
            label="Baseline"
            value={selectedPoint?.actual}
            accent="bg-slate-950 text-white"
          />
          <MetricChip
            label={pathLabels[mode]}
            value={selectedPoint?.[mode]}
            accent="bg-sky-500 text-white"
          />
          <MetricChip
            label="1.5°C Benchmark"
            value={selectedPoint?.benchmark15}
            accent="bg-lime-500 text-slate-950"
          />
          <MetricChip
            label="Below 2°C Benchmark"
            value={selectedPoint?.benchmark2}
            accent="bg-orange-400 text-slate-950"
          />
        </div>
      </div>
    </div>
  );
}

function MetricChip({
  label,
  value,
  accent,
}: {
  label: string;
  value: number | undefined;
  accent: string;
}) {
  return (
    <div className="rounded-[1.75rem] border border-white/70 bg-white/85 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            {label}
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">
            {value?.toFixed(2) ?? "n/a"}
          </p>
        </div>
        <div className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${accent}`}>
          Intensity
        </div>
      </div>
    </div>
  );
}
