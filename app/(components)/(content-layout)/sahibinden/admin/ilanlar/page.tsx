import Link from "next/link";
import { getModerationListings } from "../../data";
import AdminListingRow from "../../components/admin-listing-row";

export const dynamic = "force-dynamic";

const FILTERS = [
  { key: "", label: "Tümü" },
  { key: "PENDING", label: "Onay Bekleyen" },
  { key: "ACTIVE", label: "Yayında" },
  { key: "REJECTED", label: "Reddedilen" },
  { key: "PASSIVE", label: "Pasif" },
];

export default async function AdminIlanlar({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const listings = await getModerationListings(status || undefined);

  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Link
            key={f.key}
            href={f.key ? `/sahibinden/admin/ilanlar?status=${f.key}` : "/sahibinden/admin/ilanlar"}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
              (status || "") === f.key ? "bg-yellow-400 text-gray-900" : "border border-gray-200 bg-white text-gray-600"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>
      {listings.length === 0 ? (
        <p className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
          Kayıt yok.
        </p>
      ) : (
        <div className="space-y-3">
          {listings.map((l) => (
            <AdminListingRow key={l.id} listing={l} />
          ))}
        </div>
      )}
    </div>
  );
}
