import { validateRequest } from "@/app/auth";
import { getContractById } from "../../../../../actions/contracts";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Badge } from "../../../../../components/ui/badge";
import { Button } from "../../../../../components/ui/button";
import {
  Card, CardContent, CardHeader, CardTitle,
} from "../../../../../components/ui/card";
import {
  ArrowLeft, FileText, User, Users, MapPin,
  CalendarDays, DollarSign, FileSignature, ClipboardList,
} from "lucide-react";
import { Metadata } from "next";
import ContractDocsManager from "../../../../../components/dashboard/ContractDocsManager";

export const metadata: Metadata = { title: "Sözleşme Detayı - EstatePro" };

const typeLabel: Record<string, string> = {
  SALE:     "Satış Sözleşmesi",
  RENTAL:   "Kiralama Sözleşmesi",
  PRE_SALE: "Ön Satış / Satış Vaadi",
};
const statusLabel: Record<string, string> = {
  DRAFT:     "Taslak",
  ACTIVE:    "Aktif",
  COMPLETED: "Tamamlandı",
  CANCELLED: "İptal",
  EXPIRED:   "Süresi Doldu",
};
const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  DRAFT:     "outline",
  ACTIVE:    "default",
  COMPLETED: "secondary",
  CANCELLED: "destructive",
  EXPIRED:   "destructive",
};
const paymentStatusLabel: Record<string, string> = {
  PENDING: "Bekliyor", PAID: "Ödendi", PARTIAL: "Kısmi",
  FAILED: "Başarısız", REFUNDED: "İade",
};

function fmtDate(d: any) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("tr-TR");
}
function fmtMoney(v: number | null | undefined, cur: string) {
  if (!v) return "—";
  return `${v.toLocaleString("tr-TR")} ${cur}`;
}

export default async function ContractViewPage({ params }: { params: { id: string } }) {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const contract = await getContractById(params.id);
  if (!contract) notFound();

  const property = (contract as any).property;
  const listing  = (contract as any).listing;
  const agent    = (contract as any).agent;
  const client   = (contract as any).client;
  const payments = (contract as any).payments ?? [];
  const documents = (contract as any).documents ?? [];
  const count    = (contract as any)._count ?? {};

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 space-y-6">

      {/* Üst Bar */}
      <div className="flex items-center justify-between gap-3">
        <Button asChild variant="outline" size="sm">
          <Link href="/estate/dashboard/contracts">
            <ArrowLeft className="mr-1 h-4 w-4" /> Geri
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/estate/dashboard/contracts/print/${contract.id}`}>
              <FileText className="mr-1 h-4 w-4" /> Sözleşme PDF
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link href={`/estate/dashboard/contracts/edit/${contract.id}`}>
              Düzenle
            </Link>
          </Button>
        </div>
      </div>

      {/* Başlık Kartı */}
      <Card className="border-t-4 border-blue-600">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-black">{contract.contractNo}</h1>
              <p className="text-black mt-1">{typeLabel[contract.contractType] ?? contract.contractType}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant={statusVariant[contract.status] ?? "secondary"}>
                  {statusLabel[contract.status] ?? contract.status}
                </Badge>
              </div>
            </div>
            <div className="text-right space-y-1">
              {contract.salePrice && (
                <p className="text-2xl font-extrabold text-blue-600">
                  {fmtMoney(contract.salePrice, contract.currency)}
                </p>
              )}
              {contract.rentalPrice && (
                <p className="text-xl font-bold text-blue-600">
                  {fmtMoney(contract.rentalPrice, contract.currency)}<span className="text-sm font-normal">/ay</span>
                </p>
              )}
              {contract.deposit && (
                <p className="text-sm text-black">Depozito: {fmtMoney(contract.deposit, contract.currency)}</p>
              )}
              {contract.commission && (
                <p className="text-sm text-black">Komisyon: {fmtMoney(contract.commission, contract.currency)}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bilgi Kartları */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {[
          { icon: MapPin,         label: "Mülk",           value: property?.title ?? "—" },
          { icon: MapPin,         label: "Şehir",           value: property?.city  ?? "—" },
          { icon: FileText,       label: "İlan No",         value: listing?.listingNo ?? "—" },
          { icon: User,           label: "Danışman",         value: contract.agentName },
          { icon: Users,          label: "Müşteri",          value: contract.clientName },
          { icon: CalendarDays,   label: "Başlangıç",        value: fmtDate(contract.startDate) },
          { icon: CalendarDays,   label: "Bitiş",            value: fmtDate(contract.endDate) },
          { icon: FileSignature,  label: "İmza Tarihi",      value: fmtDate(contract.signedDate) },
        ].map(({ icon: Icon, label, value }) => (
          <Card key={label} className="border border-gray-200">
            <CardContent className="p-3 flex flex-col items-center text-center">
              <Icon className="w-5 h-5 mb-1.5 text-blue-600" />
              <p className="text-[10px] font-semibold text-black uppercase tracking-wide mb-1">{label}</p>
              <p className="text-xs text-black break-words w-full">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Danışman & Müşteri Detay */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-sm text-black flex items-center gap-2"><User className="w-4 h-4" /> Danışman</CardTitle></CardHeader>
          <CardContent className="space-y-1 text-sm text-black">
            <p className="font-semibold">{agent?.firstName} {agent?.lastName}</p>
            {agent?.phone && <p>{agent.phone}</p>}
            {agent?.email && <p>{agent.email}</p>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm text-black flex items-center gap-2"><Users className="w-4 h-4" /> Müşteri</CardTitle></CardHeader>
          <CardContent className="space-y-1 text-sm text-black">
            <p className="font-semibold">{client?.firstName} {client?.lastName}</p>
            {client?.phone && <p>{client.phone}</p>}
            {client?.email && <p>{client.email}</p>}
          </CardContent>
        </Card>
      </div>

      {/* Ödemeler */}
      {payments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-black flex items-center gap-2">
              <DollarSign className="w-4 h-4" /> Ödemeler ({payments.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  {["Başlık", "Tutar", "Ödeme Yöntemi", "Makbuz No", "Vade", "Ödeme Tarihi", "Durum", "Not"].map((h) => (
                    <th key={h} className="px-3 py-2 text-left text-xs font-semibold text-black uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {payments.map((p: any) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2 text-black">{p.title}</td>
                    <td className="px-3 py-2 font-semibold text-black">
                      {p.amount.toLocaleString("tr-TR")} {contract.currency}
                    </td>
                    <td className="px-3 py-2 text-black">{p.paymentMethod ?? "—"}</td>
                    <td className="px-3 py-2 text-black">{p.receiptNo ?? "—"}</td>
                    <td className="px-3 py-2 text-black">{fmtDate(p.dueDate)}</td>
                    <td className="px-3 py-2 text-black">{fmtDate(p.paidDate)}</td>
                    <td className="px-3 py-2">
                      <Badge
                        variant={p.status === "PAID" ? "default" : p.status === "FAILED" ? "destructive" : "outline"}
                        className="text-xs"
                      >
                        {paymentStatusLabel[p.status] ?? p.status}
                      </Badge>
                    </td>
                    <td className="px-3 py-2 text-xs text-black max-w-[120px] truncate">{p.notes ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Belgeler */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-black flex items-center gap-2">
            <ClipboardList className="w-4 h-4" /> Belgeler ({documents.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ContractDocsManager contractId={contract.id} initialDocs={documents} />
        </CardContent>
      </Card>

      {/* Notlar */}
      {contract.notes && (
        <Card>
          <CardHeader><CardTitle className="text-sm text-black">Notlar</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-black whitespace-pre-wrap">{contract.notes}</p>
          </CardContent>
        </Card>
      )}

      {/* İstatistikler */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Ödeme Sayısı",  value: count.payments  ?? 0, icon: DollarSign },
          { label: "Belge Sayısı",  value: count.documents ?? 0, icon: ClipboardList },
        ].map(({ label, value, icon: Icon }) => (
          <Card key={label} className="text-center">
            <CardContent className="p-4">
              <Icon className="w-6 h-6 text-blue-600 mx-auto mb-1" />
              <p className="text-2xl font-extrabold text-black">{value}</p>
              <p className="text-xs text-black mt-1">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
