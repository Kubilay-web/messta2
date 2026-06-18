"use client";

import { EMLAK_FEATURE_GROUPS, type EmlakFeatures } from "../lib/emlak-features";

export default function EmlakFeaturesPicker({
  value,
  onChange,
}: {
  value: EmlakFeatures;
  onChange: (next: EmlakFeatures) => void;
}) {
  function toggle(groupId: string, option: string) {
    const cur = value[groupId] ?? [];
    const next = cur.includes(option) ? cur.filter((o) => o !== option) : [...cur, option];
    onChange({ ...value, [groupId]: next });
  }

  return (
    <div className="space-y-4">
      {EMLAK_FEATURE_GROUPS.map((g) => (
        <div key={g.id}>
          <p className="mb-2 text-sm font-semibold text-gray-700">
            {g.icon} {g.label}
          </p>
          <div className="flex flex-wrap gap-2">
            {g.options.map((opt) => {
              const active = (value[g.id] ?? []).includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggle(g.id, opt)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                    active
                      ? "border-yellow-400 bg-yellow-400 text-gray-900"
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-400"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
