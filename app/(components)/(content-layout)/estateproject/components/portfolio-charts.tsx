"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { unitStatusLabel } from "../lib/labels";

const STATUS_COLORS: Record<string, string> = {
  AVAILABLE: "#10b981",
  RESERVED: "#f59e0b",
  SOLD: "#ef4444",
  DELIVERED: "#0ea5e9",
  BLOCKED: "#94a3b8",
};

export function UnitStatusChart({ data }: { data: { status: string; count: number }[] }) {
  const chartData = data.map((d) => ({
    name: unitStatusLabel[d.status] ?? d.status,
    value: d.count,
    key: d.status,
  }));

  if (!chartData.length)
    return (
      <div className="h-[240px] flex items-center justify-center text-sm text-muted-foreground">
        Henüz daire yok
      </div>
    );

  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={90}
          paddingAngle={2}
        >
          {chartData.map((d) => (
            <Cell key={d.key} fill={STATUS_COLORS[d.key] ?? "#94a3b8"} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
