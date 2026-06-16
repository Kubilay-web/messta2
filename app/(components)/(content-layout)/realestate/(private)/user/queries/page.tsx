import Link from "next/link";
import { MessageSquare, Phone, Mail, ExternalLink } from "lucide-react";
import { getMyInquiries } from "../../../actions/my-listings";
import { requireRealestateUser } from "../../../lib/auth";

export const dynamic = "force-dynamic";

function fmtDate(d: Date | string) {
  return new Date(d).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" });
}

export default async function MyQueriesPage() {
  await requireRealestateUser();
  const inquiries = await getMyInquiries();

  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 py-4">
      <div className="mx-auto max-w-[1100px]">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20">
            <MessageSquare className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-2xl font-black tracking-tight">Taleplerim</h1>
            <p className="text-sm text-slate-500">İlanlarınıza gelen {inquiries.length} talep</p>
          </div>
        </div>

        {inquiries.length === 0 ? (
          <div className="mt-5 rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center text-slate-500">
            Henüz talep yok. İlanlarınız görüntülendikçe talepler burada görünür.
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            {inquiries.map((q) => (
              <div key={q.id} className="rounded-2xl border bg-white p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold">{q.contactName}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                      {q.contactPhone && (
                        <a href={`tel:${q.contactPhone}`} className="flex items-center gap-1 hover:text-blue-600">
                          <Phone className="h-3.5 w-3.5" /> {q.contactPhone}
                        </a>
                      )}
                      {q.contactEmail && (
                        <a href={`mailto:${q.contactEmail}`} className="flex items-center gap-1 hover:text-blue-600">
                          <Mail className="h-3.5 w-3.5" /> {q.contactEmail}
                        </a>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{fmtDate(q.createdAt)}</span>
                </div>

                {q.value != null && (
                  <p className="mt-2 text-sm">
                    <span className="text-gray-400">Teklif:</span>{" "}
                    <span className="font-semibold text-emerald-700">
                      {Number(q.value).toLocaleString("tr-TR")} {q.currency ?? "TRY"}
                    </span>
                  </p>
                )}
                {q.requirements && (
                  <p className="mt-1 rounded-lg bg-gray-50 p-2.5 text-sm text-gray-600">{q.requirements}</p>
                )}

                {q.listing && (
                  <Link
                    href={`/realestate/property/${q.listing.id}`}
                    target="_blank"
                    className="mt-2 inline-flex items-center gap-1 text-xs text-blue-600 hover:underline"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> {q.listing.title}
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
