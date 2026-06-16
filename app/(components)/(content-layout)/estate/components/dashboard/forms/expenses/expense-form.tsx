"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { SaveAll, ArrowLeft } from "lucide-react";

import TextInput      from "../../../FormInputs/TextInput";
import TextArea       from "../../../FormInputs/TextAreaInput";
import SubmitButton   from "../../../FormInputs/SubmitButton";
import { Button }     from "../../../ui/button";
import FormSelectInput from "../../../FormInputs/FormSelectInput";

import { ExpenseProps, createExpense, updateExpense } from "../../../../actions/expenses";

const categoryOptions = [
  { label: "Ofis Kirası",   value: "RENT" },
  { label: "Maaş",          value: "SALARY" },
  { label: "Pazarlama",     value: "MARKETING" },
  { label: "Faturalar",     value: "UTILITIES" },
  { label: "Komisyon",      value: "COMMISSION" },
  { label: "Bakım/Onarım",  value: "MAINTENANCE" },
  { label: "Vergi",         value: "TAX" },
  { label: "Diğer",         value: "OTHER" },
];

type Agent = { id: string; firstName: string; lastName: string };
type Props = { agents: Agent[]; agencyId: string; editingId?: string; initialData?: any };

function fmtDate(d: any) { return d ? new Date(d).toISOString().slice(0, 10) : ""; }

export default function ExpenseForm({ agents, agencyId, editingId, initialData }: Props) {
  const router = useRouter();
  const isEditing = !!editingId;
  const [loading, setLoading] = useState(false);

  const [selCategory, setSelCategory] = useState<any>(categoryOptions.find((o) => o.value === initialData?.category) ?? categoryOptions[0]);
  const [selAgentId,  setSelAgentId]  = useState(initialData?.agentId ?? "");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<any>({
    defaultValues: {
      title:         initialData?.title         ?? "",
      amount:        initialData?.amount         ?? "",
      currency:      initialData?.currency       ?? "TRY",
      date:          fmtDate(initialData?.date) || fmtDate(new Date()),
      paymentMethod: initialData?.paymentMethod ?? "",
      vendor:        initialData?.vendor        ?? "",
      receiptUrl:    initialData?.receiptUrl    ?? "",
      notes:         initialData?.notes         ?? "",
    },
  });

  async function onSubmit(data: any) {
    if (!data.title?.trim()) { toast.error("Gider başlığı gerekli."); return; }

    const payload: ExpenseProps = {
      category:      selCategory.value,
      title:         data.title,
      amount:        Number(data.amount),
      currency:      data.currency || "TRY",
      date:          data.date || undefined,
      paymentMethod: data.paymentMethod || undefined,
      vendor:        data.vendor || undefined,
      receiptUrl:    data.receiptUrl || undefined,
      notes:         data.notes || undefined,
      agentId:       selAgentId || undefined,
      agencyId,
    };

    try {
      setLoading(true);
      if (isEditing) { await updateExpense(editingId!, payload); toast.success("Gider güncellendi!"); }
      else { await createExpense(payload); toast.success("Gider kaydedildi!"); reset(); }
      router.push("/estate/dashboard/finance/expenses");
    } catch (err: any) {
      toast.error(err?.message ?? "Bir hata oluştu.");
    } finally { setLoading(false); }
  }

  const selectCls   = "w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none";
  const selectLabel = "block text-sm font-medium text-gray-900 mb-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-black">
        {isEditing ? "Gideri Düzenle" : "Yeni Gider"}
      </h2>

      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Gider Bilgileri</legend>
        <TextInput register={register} errors={errors} label="Başlık *" name="title" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormSelectInput label="Kategori" options={categoryOptions} option={selCategory} setOption={setSelCategory} />
          <TextInput register={register} errors={errors} label="Tarih" name="date" type="date" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <TextInput register={register} errors={errors} label="Tutar" name="amount" type="number" />
          <TextInput register={register} errors={errors} label="Para Birimi" name="currency" />
          <TextInput register={register} errors={errors} label="Ödeme Yöntemi" name="paymentMethod" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput register={register} errors={errors} label="Tedarikçi / Ödenen" name="vendor" />
          <div>
            <label className={selectLabel}>İlgili Danışman (ops.)</label>
            <select value={selAgentId} onChange={(e) => setSelAgentId(e.target.value)} className={selectCls}>
              <option value="">— Danışman seçin —</option>
              {agents.map((a) => (<option key={a.id} value={a.id}>{a.firstName} {a.lastName}</option>))}
            </select>
          </div>
        </div>
        <TextInput register={register} errors={errors} label="Makbuz / Belge URL" name="receiptUrl" />
        <TextArea register={register} errors={errors} label="Notlar" name="notes" helperText="Gider açıklaması." />
      </fieldset>

      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()} className="w-full sm:w-auto">
          <ArrowLeft className="mr-1 h-4 w-4" /> Geri
        </Button>
        <SubmitButton buttonIcon={SaveAll} title={isEditing ? "Güncelle" : "Gideri Kaydet"} loading={loading} loadingTitle="Kaydediliyor..." className="w-full sm:w-auto" />
      </div>
    </form>
  );
}
