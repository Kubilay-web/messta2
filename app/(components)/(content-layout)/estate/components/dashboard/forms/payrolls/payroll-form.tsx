"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { SaveAll, ArrowLeft } from "lucide-react";

import TextInput      from "../../../FormInputs/TextInput";
import TextArea       from "../../../FormInputs/TextAreaInput";
import SubmitButton   from "../../../FormInputs/SubmitButton";
import { Button }     from "../../../ui/button";
import FormSelectInput from "../../../FormInputs/FormSelectInput";

import { PayrollProps, createPayroll, updatePayroll } from "../../../../actions/payrolls";

const statusOptions = [
  { label: "Beklemede", value: "PENDING" },
  { label: "Ödendi",    value: "PAID" },
  { label: "İptal",     value: "CANCELLED" },
];
const monthOptions = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
].map((m, i) => ({ label: m, value: String(i + 1) }));

type Agent = { id: string; firstName: string; lastName: string };
type Props = { agents: Agent[]; agencyId: string; editingId?: string; initialData?: any };

export default function PayrollForm({ agents, agencyId, editingId, initialData }: Props) {
  const router = useRouter();
  const isEditing = !!editingId;
  const [loading, setLoading] = useState(false);
  const now = new Date();

  const [selStatus, setSelStatus] = useState<any>(statusOptions.find((o) => o.value === initialData?.status) ?? statusOptions[0]);
  const [selMonth,  setSelMonth]  = useState<any>(monthOptions.find((o) => o.value === String(initialData?.periodMonth)) ?? monthOptions[now.getMonth()]);
  const [selAgentId, setSelAgentId] = useState(initialData?.agentId ?? agents[0]?.id ?? "");

  const { register, handleSubmit, watch, formState: { errors } } = useForm<any>({
    defaultValues: {
      periodYear: initialData?.periodYear ?? now.getFullYear(),
      baseSalary: initialData?.baseSalary ?? 0,
      commission: initialData?.commission ?? 0,
      bonus:      initialData?.bonus      ?? 0,
      deductions: initialData?.deductions ?? 0,
      currency:   initialData?.currency   ?? "TRY",
      notes:      initialData?.notes      ?? "",
    },
  });

  const w = watch();
  const netPay = useMemo(
    () => Number(w.baseSalary || 0) + Number(w.commission || 0) + Number(w.bonus || 0) - Number(w.deductions || 0),
    [w.baseSalary, w.commission, w.bonus, w.deductions]
  );
  const money = (v: number) => new Intl.NumberFormat("tr-TR", { style: "currency", currency: w.currency || "TRY", maximumFractionDigits: 0 }).format(v || 0);

  async function onSubmit(data: any) {
    if (!selAgentId) { toast.error("Lütfen bir danışman seçin."); return; }

    const payload: PayrollProps = {
      agentId:     selAgentId,
      periodMonth: Number(selMonth.value),
      periodYear:  Number(data.periodYear),
      baseSalary:  Number(data.baseSalary || 0),
      commission:  Number(data.commission || 0),
      bonus:       Number(data.bonus || 0),
      deductions:  Number(data.deductions || 0),
      currency:    data.currency || "TRY",
      status:      selStatus.value,
      notes:       data.notes || undefined,
      agencyId,
    };

    try {
      setLoading(true);
      if (isEditing) { await updatePayroll(editingId!, payload); toast.success("Bordro güncellendi!"); }
      else { await createPayroll(payload); toast.success("Bordro oluşturuldu!"); }
      router.push("/estate/dashboard/finance/payroll");
    } catch (err: any) {
      toast.error(err?.message?.includes("Unique") ? "Bu danışman için bu döneme ait bordro zaten var." : (err?.message ?? "Bir hata oluştu."));
    } finally { setLoading(false); }
  }

  const selectCls   = "w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none";
  const selectLabel = "block text-sm font-medium text-gray-900 mb-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-black">
        {isEditing ? "Bordroyu Düzenle" : "Yeni Bordro"}
      </h2>

      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Danışman & Dönem</legend>
        <div>
          <label className={selectLabel}>Danışman <span className="text-red-500">*</span></label>
          <select value={selAgentId} onChange={(e) => setSelAgentId(e.target.value)} className={selectCls}>
            <option value="">— Danışman seçin —</option>
            {agents.map((a) => (<option key={a.id} value={a.id}>{a.firstName} {a.lastName}</option>))}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormSelectInput label="Ay" options={monthOptions} option={selMonth} setOption={setSelMonth} />
          <TextInput register={register} errors={errors} label="Yıl" name="periodYear" type="number" />
        </div>
      </fieldset>

      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Tutarlar</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput register={register} errors={errors} label="Baz Maaş" name="baseSalary" type="number" />
          <TextInput register={register} errors={errors} label="Komisyon" name="commission" type="number" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <TextInput register={register} errors={errors} label="Prim" name="bonus" type="number" />
          <TextInput register={register} errors={errors} label="Kesinti" name="deductions" type="number" />
          <TextInput register={register} errors={errors} label="Para Birimi" name="currency" />
        </div>
        <div className="rounded-lg bg-gray-50 p-4 flex justify-between font-bold text-black text-base">
          <span>Net Ödeme</span><span>{money(netPay)}</span>
        </div>
        <FormSelectInput label="Durum" options={statusOptions} option={selStatus} setOption={setSelStatus} />
        <TextArea register={register} errors={errors} label="Notlar" name="notes" helperText="Bordro açıklaması." />
      </fieldset>

      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()} className="w-full sm:w-auto">
          <ArrowLeft className="mr-1 h-4 w-4" /> Geri
        </Button>
        <SubmitButton buttonIcon={SaveAll} title={isEditing ? "Güncelle" : "Bordroyu Kaydet"} loading={loading} loadingTitle="Kaydediliyor..." className="w-full sm:w-auto" />
      </div>
    </form>
  );
}
