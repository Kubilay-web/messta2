import { EMLAK_FEATURE_GROUPS, type EmlakFeatures } from "../lib/emlak-features";

export default function EmlakFeaturesView({ features }: { features: EmlakFeatures }) {
  const groups = EMLAK_FEATURE_GROUPS.filter((g) => (features[g.id] ?? []).length > 0);
  if (groups.length === 0) return null;

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4">
      <h2 className="mb-3 text-lg font-bold text-gray-800">Özellikler</h2>
      <div className="space-y-4">
        {groups.map((g) => (
          <div key={g.id}>
            <p className="mb-2 text-sm font-semibold text-gray-600">
              {g.icon} {g.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {(features[g.id] ?? []).map((opt) => (
                <span
                  key={opt}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                >
                  ✓ {opt}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
