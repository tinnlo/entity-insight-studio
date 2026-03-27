"use client";

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type PeerComparisonChartProps = {
  data: Array<{
    label: string;
    value: number;
  }>;
};

const colors = ["#0f172a", "#0ea5e9", "#38bdf8", "#7dd3fc"];

export function PeerComparisonChart({ data }: PeerComparisonChartProps) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barCategoryGap={24}>
          <XAxis
            dataKey="label"
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
            cursor={{ fill: "rgba(148,163,184,0.12)" }}
            contentStyle={{
              borderRadius: 16,
              border: "1px solid rgba(148,163,184,0.22)",
              backgroundColor: "rgba(255,255,255,0.96)",
            }}
          />
          <Bar dataKey="value" radius={[18, 18, 6, 6]}>
            {data.map((entry, index) => (
              <Cell
                key={entry.label}
                fill={colors[index] ?? colors[colors.length - 1]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
