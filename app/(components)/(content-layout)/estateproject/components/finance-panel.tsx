"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Trash2, Wallet, Phone, Mail, Pencil } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Label,
  Badge,
  Progress,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui";
import {
  expenseCategoryLabel,
  expenseStatusLabel,
  formatCurrency,
  formatCompact,
  formatDate,
} from "../lib/labels";
import { createExpense, updateExpense, deleteExpense, createContractor, updateContractor, deleteContractor } from "../actions/finance";

const CAT_COLORS: Record<string, string> = {
  LAND: "#6366f1", CONSTRUCTION: "#f59e0b", LABOR: "#10b981", MATERIAL: "#0ea5e9",
  PERMIT: "#a855f7", MARKETING: "#ec4899", LEGAL: "#14b8a6", FINANCE: "#f97316", OTHER: "#94a3b8",
};

export function FinancePanel({
  agencyId,
  projectId,
  budget,
  currency,
  summary,
  expenses,
  contractors,
  canManage,
}: {
  agencyId: string;
  projectId: string;
  budget: number | null;
  currency: string;
  summary: any;
  expenses: any[];
  contractors: any[];
  canManage: boolean;
}) {
  const router = useRouter();
  const [expenseOpen, setExpenseOpen] = useState(false);
  const [contractorOpen, setContractorOpen] = useState(false);
  const [editingContractor, setEditingContractor] = useState<any | null>(null);

  const spent = summary.paid;
  const budgetPct = budget && budget > 0 ? Math.min(100, Math.round((spent / budget) * 100)) : 0;
  const remaining = (budget ?? 0) - summary.total;
  const maxCat = Math.max(1, ...summary.byCategory.map((c: any) => c.amount));

  const setStatus = async (id: string, status: string) => {
    try { await updateExpense(id, { status: status as any }); router.refresh(); } catch (e: any) { toast.error(e?.message ?? "Hata"); }
  };

  return (
    <div className="space-y-4">
      {/* Bütçe özeti */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Bütçe" value={formatCompact(budget, currency)} />
        <Stat label="Toplam Harcama" value={formatCompact(summary.total, currency)} tone="amber" />
        <Stat label="Ödenen" value={formatCompact(summary.paid, currency)} tone="red" />
        <Stat label="Kalan Bütçe" value={formatCompact(remaining, currency)} tone={remaining < 0 ? "red" : "emerald"} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Bütçe kullanımı + kategori */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Kategori Dağılımı</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {budget ? (
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Bütçe kullanımı (ödenen)</span>
                  <span className="font-medium">%{budgetPct}</span>
                </div>
                <Progress value={budgetPct} className="h-2" />
              </div>
            ) : null}
            {summary.byCategory.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6 text-center">Harcama yok.</p>
            ) : (
              <div className="space-y-2 pt-1">
                {summary.byCategory.map((c: any) => (
                  <div key={c.category}>
                    <div className="flex justify-between text-xs mb-1">
                      <span>{expenseCategoryLabel[c.category]}</span>
                      <span className="font-medium">{formatCurrency(c.amount, currency)}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${(c.amount / maxCat) * 100}%`, background: CAT_COLORS[c.category] ?? "#94a3b8" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Müteahhitler */}
        <Card>
          <CardHeader className="pb-2 flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Müteahhitler</CardTitle>
            {canManage && (
              <Button size="sm" variant="ghost" onClick={() => { setEditingContractor(null); setContractorOpen(true); }}><Plus className="size-4" /></Button>
            )}
          </CardHeader>
          <CardContent className="space-y-2">
            {contractors.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6 text-center">Müteahhit yok.</p>
            ) : (
              contractors.map((c) => (
                <div key={c.id} className="rounded-lg border p-3 group">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{c.name}</p>
                    {canManage && (
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => { setEditingContractor(c); setContractorOpen(true); }} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground"><Pencil className="size-3.5" /></button>
                        <button onClick={() => deleteContractor(c.id, agencyId).then(() => router.refresh())} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-500"><Trash2 className="size-3.5" /></button>
                      </div>
                    )}
                  </div>
                  {c.specialty && <p className="text-xs text-muted-foreground">{c.specialty}</p>}
                  <div className="flex flex-wrap gap-2 mt-1 text-xs text-muted-foreground">
                    {c.phone && <span className="flex items-center gap-1"><Phone className="size-3" />{c.phone}</span>}
                    {c.email && <span className="flex items-center gap-1"><Mail className="size-3" />{c.email}</span>}
                  </div>
                  {c.contractAmount != null && (
                    <p className="text-xs font-medium mt-1">Sözleşme: {formatCurrency(c.contractAmount, currency)}</p>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Harcama listesi */}
      <Card>
        <CardHeader className="pb-2 flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Harcamalar</CardTitle>
          {canManage && (
            <Button size="sm" variant="outline" onClick={() => setExpenseOpen(true)}><Plus className="size-4" /> Harcama</Button>
          )}
        </CardHeader>
        <CardContent className="p-0">
          {expenses.length === 0 ? (
            <p className="py-10 text-center text-muted-foreground text-sm">Harcama kaydı yok.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-xs text-muted-foreground">
                    <th className="px-4 py-2.5 font-medium">Kalem</th>
                    <th className="px-4 py-2.5 font-medium">Kategori</th>
                    <th className="px-4 py-2.5 font-medium">Tedarikçi</th>
                    <th className="px-4 py-2.5 font-medium text-right">Tutar</th>
                    <th className="px-4 py-2.5 font-medium">Durum</th>
                    <th className="px-4 py-2.5 font-medium">Tarih</th>
                    {canManage && <th className="px-2 py-2.5"></th>}
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((e) => (
                    <tr key={e.id} className="border-b last:border-0 hover:bg-muted/40 group">
                      <td className="px-4 py-2.5 font-medium">{e.title}</td>
                      <td className="px-4 py-2.5">
                        <span className="inline-flex items-center gap-1.5">
                          <span className="size-2 rounded-full" style={{ background: CAT_COLORS[e.category] }} />
                          {expenseCategoryLabel[e.category]}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">{e.vendor ?? "—"}</td>
                      <td className="px-4 py-2.5 text-right font-semibold">{formatCurrency(e.amount, e.currency)}</td>
                      <td className="px-4 py-2.5">
                        {canManage ? (
                          <Select value={e.status} onValueChange={(v) => setStatus(e.id, v)}>
                            <SelectTrigger className="h-7 w-28 text-xs"><SelectValue /></SelectTrigger>
                            <SelectContent>{Object.entries(expenseStatusLabel).map(([v, l]) => (<SelectItem key={v} value={v}>{l}</SelectItem>))}</SelectContent>
                          </Select>
                        ) : (
                          <Badge variant="secondary">{expenseStatusLabel[e.status]}</Badge>
                        )}
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground text-xs">{formatDate(e.date)}</td>
                      {canManage && (
                        <td className="px-2 py-2.5">
                          <button onClick={() => deleteExpense(e.id).then(() => router.refresh())} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-500"><Trash2 className="size-4" /></button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {canManage && (
        <>
          <AddExpenseDialog open={expenseOpen} onOpenChange={setExpenseOpen} agencyId={agencyId} projectId={projectId} currency={currency} />
          <AddContractorDialog open={contractorOpen} onOpenChange={setContractorOpen} agencyId={agencyId} projectId={projectId} contractor={editingContractor} />
        </>
      )}
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: React.ReactNode; tone?: string }) {
  const tones: Record<string, string> = { emerald: "text-emerald-600", amber: "text-amber-600", red: "text-red-600" };
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 text-muted-foreground text-xs"><Wallet className="size-3.5" />{label}</div>
        <p className={`text-xl font-bold mt-1 ${tone ? tones[tone] : ""}`}>{value}</p>
      </CardContent>
    </Card>
  );
}

function Fld({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-1.5"><Label className="text-xs">{label}</Label>{children}</div>;
}

function AddExpenseDialog({ open, onOpenChange, agencyId, projectId, currency }: any) {
  const router = useRouter();
  const [f, setF] = useState({ title: "", category: "CONSTRUCTION", status: "PLANNED", amount: "", vendor: "", date: "", notes: "" });
  const [saving, setSaving] = useState(false);
  const submit = async () => {
    if (!f.title.trim()) return toast.error("Kalem adı zorunludur.");
    if (!f.amount || Number(f.amount) <= 0) return toast.error("Tutar giriniz.");
    setSaving(true);
    try {
      await createExpense({ agencyId, projectId, title: f.title.trim(), category: f.category as any, status: f.status as any, amount: Number(f.amount), currency, vendor: f.vendor || undefined, date: f.date || null, notes: f.notes || undefined });
      toast.success("Harcama eklendi."); setF({ title: "", category: "CONSTRUCTION", status: "PLANNED", amount: "", vendor: "", date: "", notes: "" }); onOpenChange(false); router.refresh();
    } catch (e: any) { toast.error(e?.message ?? "Hata"); } finally { setSaving(false); }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle>Yeni Harcama</DialogTitle></DialogHeader>
        <div className="grid gap-3 py-2">
          <Fld label="Kalem *"><Input value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} /></Fld>
          <div className="grid grid-cols-2 gap-3">
            <Fld label="Kategori">
              <Select value={f.category} onValueChange={(v) => setF({ ...f, category: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{Object.entries(expenseCategoryLabel).map(([v, l]) => (<SelectItem key={v} value={v}>{l}</SelectItem>))}</SelectContent>
              </Select>
            </Fld>
            <Fld label="Durum">
              <Select value={f.status} onValueChange={(v) => setF({ ...f, status: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{Object.entries(expenseStatusLabel).map(([v, l]) => (<SelectItem key={v} value={v}>{l}</SelectItem>))}</SelectContent>
              </Select>
            </Fld>
            <Fld label="Tutar *"><Input type="number" value={f.amount} onChange={(e) => setF({ ...f, amount: e.target.value })} /></Fld>
            <Fld label="Tarih"><Input type="date" value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} /></Fld>
          </div>
          <Fld label="Tedarikçi"><Input value={f.vendor} onChange={(e) => setF({ ...f, vendor: e.target.value })} /></Fld>
          <Fld label="Notlar"><Textarea rows={2} value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })} /></Fld>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>İptal</Button>
          <Button onClick={submit} disabled={saving}>Ekle</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AddContractorDialog({ open, onOpenChange, agencyId, projectId, contractor }: any) {
  const router = useRouter();
  const isEdit = !!contractor;
  const [f, setF] = useState({ name: "", specialty: "", contactName: "", phone: "", email: "", contractAmount: "", taxNumber: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (contractor) {
      setF({
        name: contractor.name ?? "",
        specialty: contractor.specialty ?? "",
        contactName: contractor.contactName ?? "",
        phone: contractor.phone ?? "",
        email: contractor.email ?? "",
        contractAmount: contractor.contractAmount != null ? String(contractor.contractAmount) : "",
        taxNumber: contractor.taxNumber ?? "",
      });
    } else {
      setF({ name: "", specialty: "", contactName: "", phone: "", email: "", contractAmount: "", taxNumber: "" });
    }
  }, [open, contractor]);

  const submit = async () => {
    if (!f.name.trim()) return toast.error("Firma adı zorunludur.");
    setSaving(true);
    try {
      const payload = { name: f.name.trim(), specialty: f.specialty || undefined, contactName: f.contactName || undefined, phone: f.phone || undefined, email: f.email || undefined, taxNumber: f.taxNumber || undefined, contractAmount: f.contractAmount ? Number(f.contractAmount) : null };
      if (isEdit) {
        await updateContractor(contractor.id, agencyId, payload);
        toast.success("Müteahhit güncellendi.");
      } else {
        await createContractor({ agencyId, projectId, ...payload });
        toast.success("Müteahhit eklendi.");
      }
      onOpenChange(false); router.refresh();
    } catch (e: any) { toast.error(e?.message ?? "Hata"); } finally { setSaving(false); }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle>{isEdit ? "Müteahhit Düzenle" : "Yeni Müteahhit"}</DialogTitle></DialogHeader>
        <div className="grid gap-3 py-2">
          <div className="grid grid-cols-2 gap-3">
            <Fld label="Firma Adı *"><Input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></Fld>
            <Fld label="Uzmanlık"><Input value={f.specialty} onChange={(e) => setF({ ...f, specialty: e.target.value })} placeholder="Elektrik" /></Fld>
            <Fld label="Yetkili"><Input value={f.contactName} onChange={(e) => setF({ ...f, contactName: e.target.value })} /></Fld>
            <Fld label="Telefon"><Input value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} /></Fld>
            <Fld label="E-posta"><Input value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></Fld>
            <Fld label="Sözleşme Tutarı"><Input type="number" value={f.contractAmount} onChange={(e) => setF({ ...f, contractAmount: e.target.value })} /></Fld>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>İptal</Button>
          <Button onClick={submit} disabled={saving}>{isEdit ? "Güncelle" : "Ekle"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
