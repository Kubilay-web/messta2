import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../../actions/auth";
import { getContractById } from "../../../../../actions/contracts";
import PrintButton from "./PrintButton";
import { redirect, notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Sözleşme Belgesi - EstatePro" };

const typeLabel: Record<string, string> = { SALE: "SATIŞ SÖZLEŞMESİ", RENTAL: "KİRA SÖZLEŞMESİ", PRE_SALE: "SATIŞ VAADİ SÖZLEŞMESİ" };
const payStatusLabel: Record<string, string> = { PENDING: "Beklemede", PAID: "Ödendi", PARTIAL: "Kısmi", FAILED: "Başarısız", REFUNDED: "İade" };

function money(v?: number | null, c = "TRY") {
  if (v === null || v === undefined) return "—";
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: c, maximumFractionDigits: 2 }).format(v);
}
function fmtDate(d?: Date | string | null) {
  return d ? new Date(d).toLocaleDateString("tr-TR", { day: "2-digit", month: "long", year: "numeric" }) : "—";
}

export default async function ContractPrintPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency   = await AgencyUser(user.id);
  const contract = await getContractById(id);
  if (!contract) notFound();

  const c: any = contract;
  const cur = c.currency || "TRY";
  const amount = c.salePrice ?? c.rentalPrice ?? null;

  return (
    <div className="w-full bg-gray-100 min-h-screen p-2 sm:p-6 print:bg-white print:p-0">
      {/* Yazdırma izolasyonu: ekranda her şey, baskıda sadece belge */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #contract-doc, #contract-doc * { visibility: visible !important; }
          #contract-doc { position: absolute; left: 0; top: 0; width: 100%; margin: 0; box-shadow: none !important; }
          .no-print { display: none !important; }
          @page { margin: 1.5cm; }
        }
      `}</style>

      <div className="max-w-3xl mx-auto">
        <PrintButton />

        <div id="contract-doc" className="bg-white shadow rounded-lg p-6 sm:p-10 text-black print:shadow-none">
          {/* Başlık / Ajans */}
          <div className="flex items-start justify-between border-b-2 border-gray-800 pb-4 mb-6">
            <div>
              <h1 className="text-lg font-bold">{agency?.name ?? "EstatePro"}</h1>
              {agency?.address && <p className="text-xs">{agency.address}{agency.city ? `, ${agency.city}` : ""}</p>}
              {agency?.phone && <p className="text-xs">Tel: {agency.phone}</p>}
              {agency?.taxNumber && <p className="text-xs">Vergi No: {agency.taxNumber}</p>}
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-600">Sözleşme No</p>
              <p className="font-bold">{c.contractNo}</p>
            </div>
          </div>

          <h2 className="text-center text-xl font-extrabold tracking-wide mb-6">
            {typeLabel[c.contractType] ?? "SÖZLEŞME"}
          </h2>

          {/* Taraflar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="border border-gray-300 rounded p-3">
              <p className="text-xs font-semibold text-gray-600 mb-1">DANIŞMAN (Aracı)</p>
              <p className="font-semibold">{c.agent ? `${c.agent.firstName} ${c.agent.lastName}` : c.agentName ?? "—"}</p>
              {c.agent?.phone && <p className="text-xs">Tel: {c.agent.phone}</p>}
              {c.agent?.email && <p className="text-xs">{c.agent.email}</p>}
            </div>
            <div className="border border-gray-300 rounded p-3">
              <p className="text-xs font-semibold text-gray-600 mb-1">MÜŞTERİ</p>
              <p className="font-semibold">{c.client ? `${c.client.firstName} ${c.client.lastName}` : c.clientName ?? "—"}</p>
              {c.client?.phone && <p className="text-xs">Tel: {c.client.phone}</p>}
              {c.client?.email && <p className="text-xs">{c.client.email}</p>}
            </div>
          </div>

          {/* Mülk */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-600 mb-1">SÖZLEŞMEYE KONU MÜLK</p>
            <div className="border border-gray-300 rounded p-3 text-sm">
              <p className="font-semibold">{c.property?.title ?? "—"}</p>
              <p className="text-xs">{[c.property?.district, c.property?.city].filter(Boolean).join(", ")}</p>
              {c.listing?.listingNo && <p className="text-xs">İlan No: {c.listing.listingNo}</p>}
            </div>
          </div>

          {/* Mali Şartlar */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-600 mb-1">MALİ ŞARTLAR</p>
            <table className="w-full text-sm border border-gray-300">
              <tbody>
                {amount !== null && (
                  <tr className="border-b border-gray-200">
                    <td className="px-3 py-2 bg-gray-50 font-medium w-1/2">{c.contractType === "RENTAL" ? "Aylık Kira Bedeli" : "Satış Bedeli"}</td>
                    <td className="px-3 py-2 font-semibold">{money(amount, cur)}</td>
                  </tr>
                )}
                {c.deposit != null && (
                  <tr className="border-b border-gray-200"><td className="px-3 py-2 bg-gray-50 font-medium">Depozito / Kapora</td><td className="px-3 py-2">{money(c.deposit, cur)}</td></tr>
                )}
                {c.commission != null && (
                  <tr className="border-b border-gray-200"><td className="px-3 py-2 bg-gray-50 font-medium">Komisyon</td><td className="px-3 py-2">{money(c.commission, cur)}</td></tr>
                )}
                <tr className="border-b border-gray-200"><td className="px-3 py-2 bg-gray-50 font-medium">Başlangıç Tarihi</td><td className="px-3 py-2">{fmtDate(c.startDate)}</td></tr>
                {c.endDate && <tr className="border-b border-gray-200"><td className="px-3 py-2 bg-gray-50 font-medium">Bitiş Tarihi</td><td className="px-3 py-2">{fmtDate(c.endDate)}</td></tr>}
                {c.contractType === "RENTAL" && c.rentIncreaseRate != null && (
                  <tr><td className="px-3 py-2 bg-gray-50 font-medium">Yıllık Kira Artış Oranı</td><td className="px-3 py-2">%{c.rentIncreaseRate}</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Ödeme Planı */}
          {c.payments?.length > 0 && (
            <div className="mb-6">
              <p className="text-xs font-semibold text-gray-600 mb-1">ÖDEME PLANI</p>
              <table className="w-full text-xs border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-2 py-1.5 text-left border-b border-gray-300">Açıklama</th>
                    <th className="px-2 py-1.5 text-left border-b border-gray-300">Vade</th>
                    <th className="px-2 py-1.5 text-right border-b border-gray-300">Tutar</th>
                    <th className="px-2 py-1.5 text-left border-b border-gray-300">Durum</th>
                  </tr>
                </thead>
                <tbody>
                  {c.payments.map((p: any) => (
                    <tr key={p.id} className="border-b border-gray-200">
                      <td className="px-2 py-1.5">{p.title}</td>
                      <td className="px-2 py-1.5">{fmtDate(p.dueDate)}</td>
                      <td className="px-2 py-1.5 text-right">{money(p.amount, cur)}</td>
                      <td className="px-2 py-1.5">{payStatusLabel[p.status] ?? p.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Notlar */}
          {c.notes && (
            <div className="mb-6">
              <p className="text-xs font-semibold text-gray-600 mb-1">NOTLAR / EK ŞARTLAR</p>
              <p className="text-sm border border-gray-300 rounded p-3 whitespace-pre-wrap">{c.notes}</p>
            </div>
          )}

          {/* İmza alanları */}
          <div className="grid grid-cols-2 gap-8 mt-12">
            <div className="text-center">
              <div className="border-t border-gray-800 pt-2 text-sm font-medium">Danışman İmza</div>
            </div>
            <div className="text-center">
              <div className="border-t border-gray-800 pt-2 text-sm font-medium">Müşteri İmza</div>
            </div>
          </div>

          <p className="text-[10px] text-gray-400 text-center mt-8">
            Bu belge {agency?.name ?? "EstatePro"} sistemi üzerinden {fmtDate(new Date())} tarihinde oluşturulmuştur.
          </p>
        </div>
      </div>
    </div>
  );
}
