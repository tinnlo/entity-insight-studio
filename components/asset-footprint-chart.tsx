"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type AssetFootprintChartProps = {
  data: Array<{
    region: string;
    assets: number;
    capacityMw: number;
  }>;
};

export function AssetFootprintChart({ data }: AssetFootprintChartProps) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 8, right: 8 }}>
          <CartesianGrid horizontal={false} stroke="rgba(148,163,184,0.18)" />
          <XAxis
            type="number"
            tick={{ fill: "#475569", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="region"
            tick={{ fill: "#475569", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={96}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 16,
              border: "1px solid rgba(148,163,184,0.22)",
              backgroundColor: "rgba(255,255,255,0.96)",
            }}
          />
          <Bar dataKey="capacityMw" radius={[0, 16, 16, 0]} fill="#0ea5e9" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
