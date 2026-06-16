"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCompact } from "../../lib/labels";

export function TrendChart({
  data,
}: {
  data: { label: string; created: number; won: number; wonValue: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
        <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="#94a3b8" />
        <YAxis yAxisId="left" allowDecimals={false} tick={{ fontSize: 12 }} stroke="#94a3b8" />
        <YAxis
          yAxisId="right"
          orientation="right"
          tick={{ fontSize: 11 }}
          stroke="#94a3b8"
          tickFormatter={(v) => formatCompact(v)}
          width={70}
        />
        <Tooltip
          contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }}
          formatter={(value: number, name: string) =>
            name === "Kazanılan Ciro" ? [formatCompact(value), name] : [value, name]
          }
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Bar yAxisId="left" dataKey="created" name="Yeni Fırsat" fill="#c7d2fe" radius={[4, 4, 0, 0]} barSize={18} />
        <Bar yAxisId="left" dataKey="won" name="Kazanılan" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={18} />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="wonValue"
          name="Kazanılan Ciro"
          stroke="#22c55e"
          strokeWidth={2.5}
          dot={{ r: 3 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
