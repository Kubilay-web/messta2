"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Trash2, Check, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
  Label,
  Badge,
} from "../components/ui";
import { paymentStatusLabel, formatCurrency, formatDate } from "../lib/labels";
import { getPayments, addPayment, generateInstallments, setPaymentStatus, deletePayment } from "../actions/payments";

export function SalePaymentsDialog({
  open,
  onOpenChange,
  sale,
  canManage,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  sale: any | null;
  canManage: boolean;
}) {
  const router = useRouter();
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [gen, setGen] = useState({ installments: "12", firstDueDate: "", intervalMonths: "1", downPayment: "" });
  const [single, setSingle] = useState({ title: "", amount: "", dueDate: "" });
  const [busy, setBusy] = useState(false);

  const load = async () => {
    if (!sale) return;
    setLoading(true);
    try {
      const p = await getPayments(sale.id);
      setPayments(p);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && sale) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, sale?.id]);

  if (!sale) return null;

  const paid = payments.filter((p) => p.status === "PAID").reduce((a, p) => a + p.amount, 0);
  const total = payments.reduce((a, p) => a + p.amount, 0);

  const doGenerate = async () => {
    if (!gen.firstDueDate) return toast.error("İlk vade tarihi giriniz.");
    setBusy(true);
    try {
      await generateInstallments({
        saleId: sale.id,
        installments: Number(gen.installments),
        firstDueDate: gen.firstDueDate,
        intervalMonths: Number(gen.intervalMonths) || 1,
        downPayment: gen.downPayment ? Number(gen.downPayment) : null,
      });
      toast.success("Ödeme planı oluşturuldu.");
      await load();
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Hata");
    } finally {
      setBusy(false);
    }
  };

  const doAdd = async () => {
    if (!single.title.trim() || !single.amount || !single.dueDate) return toast.error("Tüm alanları doldurun.");
    setBusy(true);
    try {
      await addPayment({ saleId: sale.id, title: single.title.trim(), amount: Number(single.amount), dueDate: single.dueDate });
      setSingle({ title: "", amount: "", dueDate: "" });
      await load();
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Hata");
    } finally {
      setBusy(false);
    }
  };

  const toggle = async (p: any) => {
    try {
      await setPaymentStatus(p.id, p.status === "PAID" ? "PENDING" : "PAID");
      await load();
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Hata");
    }
  };

  const remove = async (id: string) => {
    try {
      await deletePayment(id);
      await load();
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Hata");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ödeme Planı — {sale.unit?.unitNo}</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm rounded-lg bg-muted p-3">
            <span>
              Satış: <span className="font-semibold">{formatCurrency(sale.salePrice, sale.currency)}</span>
            </span>
            <span>
              Tahsilat: <span className="font-semibold text-emerald-600">{formatCurrency(paid, sale.currency)}</span> / {formatCurrency(total, sale.currency)}
            </span>
          </div>

          {loading ? (
            <div className="py-8 flex justify-center"><Loader2 className="size-5 animate-spin text-muted-foreground" /></div>
          ) : payments.length === 0 ? (
            canManage ? (
              <div className="rounded-lg border p-3 space-y-3">
                <p className="text-sm font-medium">Otomatik Taksit Planı Oluştur</p>
                <div className="grid grid-cols-2 gap-2">
                  <Fld label="Taksit Sayısı"><Input type="number" value={gen.installments} onChange={(e) => setGen({ ...gen, installments: e.target.value })} /></Fld>
                  <Fld label="Aralık (ay)"><Input type="number" value={gen.intervalMonths} onChange={(e) => setGen({ ...gen, intervalMonths: e.target.value })} /></Fld>
                  <Fld label="İlk Vade *"><Input type="date" value={gen.firstDueDate} onChange={(e) => setGen({ ...gen, firstDueDate: e.target.value })} /></Fld>
                  <Fld label="Peşinat"><Input type="number" value={gen.downPayment} onChange={(e) => setGen({ ...gen, downPayment: e.target.value })} /></Fld>
                </div>
                <Button className="w-full" size="sm" onClick={doGenerate} disabled={busy}>Plan Oluştur</Button>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-6">Ödeme planı yok.</p>
            )
          ) : (
            <div className="space-y-1.5">
              {payments.map((p) => {
                const overdue = p.status !== "PAID" && p.dueDate && new Date(p.dueDate) < new Date();
                return (
                  <div key={p.id} className="flex items-center gap-2.5 p-2.5 rounded-lg border group">
                    {canManage && (
                      <button onClick={() => toggle(p)} className={`size-5 rounded border-2 flex items-center justify-center shrink-0 ${p.status === "PAID" ? "bg-emerald-500 border-emerald-500 text-white" : "border-muted-foreground/40"}`}>
                        {p.status === "PAID" && <Check className="size-3" />}
                      </button>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm font-medium ${p.status === "PAID" ? "text-muted-foreground" : ""}`}>{p.title}</p>
                      <p className={`text-xs ${overdue ? "text-red-500 font-medium" : "text-muted-foreground"}`}>
                        {formatDate(p.dueDate)}{overdue ? " · gecikti" : ""}
                      </p>
                    </div>
                    <span className="text-sm font-semibold">{formatCurrency(p.amount, sale.currency)}</span>
                    <Badge variant={p.status === "PAID" ? "default" : "secondary"} className="text-[10px]">{paymentStatusLabel[p.status]}</Badge>
                    {canManage && (
                      <button onClick={() => remove(p.id)} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-500"><Trash2 className="size-3.5" /></button>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {canManage && payments.length > 0 && (
            <div className="flex items-end gap-2 pt-1">
              <Fld label="Ödeme"><Input value={single.title} onChange={(e) => setSingle({ ...single, title: e.target.value })} placeholder="Ek ödeme" className="h-8" /></Fld>
              <Fld label="Tutar"><Input type="number" value={single.amount} onChange={(e) => setSingle({ ...single, amount: e.target.value })} className="h-8 w-24" /></Fld>
              <Fld label="Vade"><Input type="date" value={single.dueDate} onChange={(e) => setSingle({ ...single, dueDate: e.target.value })} className="h-8" /></Fld>
              <Button size="icon" className="h-8 w-8 shrink-0" onClick={doAdd} disabled={busy}><Plus className="size-4" /></Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Fld({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-1 flex-1"><Label className="text-[11px]">{label}</Label>{children}</div>;
}
