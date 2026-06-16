"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { SaveAll, ArrowLeft, Plus, Trash2 } from "lucide-react";

import TextInput      from "../../../FormInputs/TextInput";
import TextArea       from "../../../FormInputs/TextAreaInput";
import SubmitButton   from "../../../FormInputs/SubmitButton";
import { Button }     from "../../../ui/button";
import FormSelectInput from "../../../FormInputs/FormSelectInput";

import { AgencyInvoiceProps, createAgencyInvoice, updateAgencyInvoice } from "../../../../actions/invoices2";

const typeOptions = [
  { label: "Komisyon", value: "COMMISSION" },
  { label: "Kira",     value: "RENT" },
  { label: "Hizmet",   value: "SERVICE" },
  { label: "Diğer",    value: "OTHER" },
];
const statusOptions = [
  { label: "Taslak",    value: "DRAFT" },
  { label: "Gönderildi", value: "SENT" },
  { label: "Ödendi",    value: "PAID" },
  { label: "Kısmi",     value: "PARTIAL" },
  { label: "Gecikmiş",  value: "OVERDUE" },
  { label: "İptal",     value: "CANCELLED" },
];

type Client   = { id: string; firstName: string; lastName: string };
type Contract = { id: string; contractNo: string };
type Item = { description: string; quantity: number; unitPrice: number };

type Props = {
  clients: Client[]; contracts: Contract[];
  agencyId: string; editingId?: string; initialData?: any;
};

function fmtDate(d: any) { return d ? new Date(d).toISOString().slice(0, 10) : ""; }
function money(v: number, c = "TRY") {
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: c, maximumFractionDigits: 2 }).format(v || 0);
}

export default function Invoice2Form({ clients, contracts, agencyId, editingId, initialData }: Props) {
  const router = useRouter();
  const isEditing = !!editingId;
  const [loading, setLoading] = useState(false);

  const [selType,   setSelType]   = useState<any>(typeOptions.find((o) => o.value === initialData?.type) ?? typeOptions[0]);
  const [selStatus, setSelStatus] = useState<any>(statusOptions.find((o) => o.value === initialData?.status) ?? statusOptions[0]);
  const [selClientId,   setSelClientId]   = useState(initialData?.clientId   ?? "");
  const [selContractId, setSelContractId] = useState(initialData?.contractId ?? "");

  const [items, setItems] = useState<Item[]>(
    initialData?.items?.length
      ? initialData.items.map((i: any) => ({ description: i.description, quantity: i.quantity, unitPrice: i.unitPrice }))
      : [{ description: "", quantity: 1, unitPrice: 0 }]
  );

  const { register, handleSubmit, watch, formState: { errors } } = useForm<any>({
    defaultValues: {
      billToName:    initialData?.billToName    ?? "",
      billToTaxNo:   initialData?.billToTaxNo   ?? "",
      billToAddress: initialData?.billToAddress ?? "",
      billToEmail:   initialData?.billToEmail   ?? "",
      taxRate:       initialData?.taxRate ?? 20,
      currency:      initialData?.currency ?? "TRY",
      issueDate:     fmtDate(initialData?.issueDate) || fmtDate(new Date()),
      dueDate:       fmtDate(initialData?.dueDate),
      paidDate:      fmtDate(initialData?.paidDate),
      notes:         initialData?.notes ?? "",
    },
  });

  const taxRate  = Number(watch("taxRate") ?? 20);
  const currency = watch("currency") || "TRY";

  const totals = useMemo(() => {
    const subtotal  = items.reduce((s, it) => s + Number(it.quantity || 0) * Number(it.unitPrice || 0), 0);
    const taxAmount = (subtotal * (isNaN(taxRate) ? 0 : taxRate)) / 100;
    return { subtotal, taxAmount, total: subtotal + taxAmount };
  }, [items, taxRate]);

  function updateItem(idx: number, patch: Partial<Item>) {
    setItems((prev) => prev.map((it, i) => (i === idx ? { ...it, ...patch } : it)));
  }
  function addItem() { setItems((prev) => [...prev, { description: "", quantity: 1, unitPrice: 0 }]); }
  function removeItem(idx: number) { setItems((prev) => prev.filter((_, i) => i !== idx)); }

  async function onSubmit(data: any) {
    const cleanItems = items.filter((i) => i.description?.trim());
    if (!data.billToName?.trim()) { toast.error("Fatura edilen taraf adı gerekli."); return; }
    if (!cleanItems.length) { toast.error("En az bir fatura kalemi ekleyin."); return; }

    const payload: AgencyInvoiceProps = {
      type:          selType.value,
      status:        selStatus.value,
      issueDate:     data.issueDate || undefined,
      dueDate:       data.dueDate || undefined,
      paidDate:      data.paidDate || undefined,
      billToName:    data.billToName,
      billToTaxNo:   data.billToTaxNo || undefined,
      billToAddress: data.billToAddress || undefined,
      billToEmail:   data.billToEmail || undefined,
      taxRate:       Number(data.taxRate ?? 20),
      currency:      data.currency || "TRY",
      notes:         data.notes || undefined,
      contractId:    selContractId || undefined,
      clientId:      selClientId || undefined,
      agencyId,
      items: cleanItems.map((i) => ({ description: i.description, quantity: Number(i.quantity || 1), unitPrice: Number(i.unitPrice || 0) })),
    };

    try {
      setLoading(true);
      if (isEditing) { await updateAgencyInvoice(editingId!, payload); toast.success("Fatura güncellendi!"); }
      else { await createAgencyInvoice(payload); toast.success("Fatura oluşturuldu!"); }
      router.push("/estate/dashboard/finance/invoices");
    } catch (err: any) {
      toast.error(err?.message ?? "Bir hata oluştu.");
    } finally { setLoading(false); }
  }

  const selectCls   = "w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none";
  const selectLabel = "block text-sm font-medium text-gray-900 mb-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-black">
        {isEditing ? "Faturayı Düzenle" : "Yeni Fatura"}
      </h2>

      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Fatura Bilgileri</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormSelectInput label="Tür" options={typeOptions} option={selType} setOption={setSelType} />
          <FormSelectInput label="Durum" options={statusOptions} option={selStatus} setOption={setSelStatus} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <TextInput register={register} errors={errors} label="Düzenleme Tarihi" name="issueDate" type="date" />
          <TextInput register={register} errors={errors} label="Vade Tarihi" name="dueDate" type="date" />
          <TextInput register={register} errors={errors} label="Ödeme Tarihi" name="paidDate" type="date" />
        </div>
      </fieldset>

      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Fatura Edilen Taraf</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput register={register} errors={errors} label="Ad / Unvan *" name="billToName" />
          <TextInput register={register} errors={errors} label="Vergi No" name="billToTaxNo" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput register={register} errors={errors} label="E-posta" name="billToEmail" type="email" />
          <TextInput register={register} errors={errors} label="Adres" name="billToAddress" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={selectLabel}>İlgili Müşteri (ops.)</label>
            <select value={selClientId} onChange={(e) => setSelClientId(e.target.value)} className={selectCls}>
              <option value="">— Müşteri seçin —</option>
              {clients.map((c) => (<option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>))}
            </select>
          </div>
          <div>
            <label className={selectLabel}>İlgili Sözleşme (ops.)</label>
            <select value={selContractId} onChange={(e) => setSelContractId(e.target.value)} className={selectCls}>
              <option value="">— Sözleşme seçin —</option>
              {contracts.map((c) => (<option key={c.id} value={c.id}>{c.contractNo}</option>))}
            </select>
          </div>
        </div>
      </fieldset>

      <fieldset className="border rounded-lg p-4 space-y-3">
        <legend className="text-sm font-semibold px-1 text-black">Kalemler</legend>
        {/* Desktop header */}
        <div className="hidden sm:grid grid-cols-12 gap-2 text-xs font-semibold text-black px-1">
          <span className="col-span-6">Açıklama</span>
          <span className="col-span-2">Adet</span>
          <span className="col-span-2">Birim Fiyat</span>
          <span className="col-span-2 text-right">Tutar</span>
        </div>
        {items.map((it, idx) => (
          <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center border-b border-gray-100 pb-2 sm:border-0 sm:pb-0">
            <input className={`${selectCls} sm:col-span-6`} placeholder="Açıklama" value={it.description} onChange={(e) => updateItem(idx, { description: e.target.value })} />
            <input className={`${selectCls} sm:col-span-2`} type="number" placeholder="Adet" value={it.quantity} onChange={(e) => updateItem(idx, { quantity: Number(e.target.value) })} />
            <input className={`${selectCls} sm:col-span-2`} type="number" placeholder="Birim Fiyat" value={it.unitPrice} onChange={(e) => updateItem(idx, { unitPrice: Number(e.target.value) })} />
            <div className="sm:col-span-2 flex items-center justify-between sm:justify-end gap-2">
              <span className="text-sm font-medium text-black">{money(Number(it.quantity || 0) * Number(it.unitPrice || 0), currency)}</span>
              <button type="button" onClick={() => removeItem(idx)} className="text-red-600 hover:text-red-800"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={addItem}><Plus className="w-4 h-4 mr-1" /> Kalem Ekle</Button>
      </fieldset>

      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Tutarlar</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput register={register} errors={errors} label="KDV Oranı (%)" name="taxRate" type="number" />
          <TextInput register={register} errors={errors} label="Para Birimi" name="currency" />
        </div>
        <div className="rounded-lg bg-gray-50 p-4 space-y-1 text-sm">
          <div className="flex justify-between text-black"><span>Ara Toplam</span><span>{money(totals.subtotal, currency)}</span></div>
          <div className="flex justify-between text-black"><span>KDV ({taxRate || 0}%)</span><span>{money(totals.taxAmount, currency)}</span></div>
          <div className="flex justify-between font-bold text-black text-base border-t border-gray-200 pt-1 mt-1"><span>Genel Toplam</span><span>{money(totals.total, currency)}</span></div>
        </div>
        <TextArea register={register} errors={errors} label="Notlar" name="notes" helperText="Fatura ile ilgili notlar." />
      </fieldset>

      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()} className="w-full sm:w-auto">
          <ArrowLeft className="mr-1 h-4 w-4" /> Geri
        </Button>
        <SubmitButton buttonIcon={SaveAll} title={isEditing ? "Güncelle" : "Faturayı Kaydet"} loading={loading} loadingTitle="Kaydediliyor..." className="w-full sm:w-auto" />
      </div>
    </form>
  );
}
