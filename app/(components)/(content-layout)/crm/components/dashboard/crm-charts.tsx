"use client";

import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { leadSourceLabel } from "../../lib/labels";

const SOURCE_COLORS = [
  "#6366f1", "#10b981", "#f59e0b", "#ef4444", "#0ea5e9",
  "#a855f7", "#ec4899", "#14b8a6", "#f97316", "#64748b",
];

export function FunnelChart({ data }: { data: { name: string; color: string; count: number }[] }) {
  if (!data.length)
    return <EmptyChart label="Hat verisi yok" />;

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16, top: 4, bottom: 4 }}>
        <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} stroke="#94a3b8" />
        <YAxis
          type="category"
          dataKey="name"
          width={120}
          tick={{ fontSize: 12 }}
          stroke="#94a3b8"
        />
        <Tooltip
          cursor={{ fill: "rgba(148,163,184,0.1)" }}
          contentStyle={{
            borderRadius: 8,
            border: "1px solid #e2e8f0",
            fontSize: 12,
          }}
          formatter={(v: number) => [`${v} fırsat`, "Adet"]}
        />
        <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={22}>
          {data.map((d, i) => (
            <Cell key={i} fill={d.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function SourcesChart({ data }: { data: { source: string; count: number }[] }) {
  const chartData = data
    .filter((d) => d.count > 0)
    .map((d) => ({ name: leadSourceLabel[d.source] ?? d.source, value: d.count }));

  if (!chartData.length) return <EmptyChart label="Kaynak verisi yok" />;

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={95}
          paddingAngle={2}
          label={(e: any) => `${e.name} (${e.value})`}
          labelLine={false}
          fontSize={11}
        >
          {chartData.map((_, i) => (
            <Cell key={i} fill={SOURCE_COLORS[i % SOURCE_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

function EmptyChart({ label }: { label: string }) {
  return (
    <div className="h-[260px] flex items-center justify-center text-sm text-muted-foreground">
      {label}
    </div>
  );
}
