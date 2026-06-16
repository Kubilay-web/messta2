"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { SaveAll, ArrowLeft } from "lucide-react";

import TextInput      from "../../../FormInputs/TextInput";
import TextArea       from "../../../FormInputs/TextAreaInput";
import SubmitButton   from "../../../FormInputs/SubmitButton";
import { Button }     from "../../../ui/button";
import FormSelectInput from "../../../FormInputs/FormSelectInput";

import { CommissionProps, createCommission, updateCommission } from "../../../../actions/commission-records";

const sideOptions = [
  { label: "Alıcı Tarafı",        value: "BUYER" },
  { label: "Satıcı Tarafı",       value: "SELLER" },
  { label: "Kiracı Tarafı",       value: "TENANT" },
  { label: "Mülk Sahibi Tarafı",  value: "LANDLORD" },
];
const statusOptions = [
  { label: "Beklemede",   value: "PENDING" },
  { label: "Faturalandı", value: "INVOICED" },
  { label: "Ödendi",      value: "PAID" },
  { label: "Kısmi",       value: "PARTIAL" },
  { label: "İptal",       value: "CANCELLED" },
];

type Contract = { id: string; contractNo: string };
type Agent    = { id: string; firstName: string; lastName: string };

type Props = {
  contracts: Contract[]; agents: Agent[];
  agencyId: string; editingId?: string; initialData?: any;
};

export default function CommissionForm({ contracts, agents, agencyId, editingId, initialData }: Props) {
  const router = useRouter();
  const isEditing = !!editingId;
  const [loading, setLoading] = useState(false);

  const [selSide,   setSelSide]   = useState<any>(sideOptions.find((o) => o.value === initialData?.side) ?? sideOptions[0]);
  const [selStatus, setSelStatus] = useState<any>(statusOptions.find((o) => o.value === initialData?.status) ?? statusOptions[0]);
  const [selContractId, setSelContractId] = useState(initialData?.contractId ?? contracts[0]?.id ?? "");
  const [selAgentId,    setSelAgentId]    = useState(initialData?.agentId    ?? agents[0]?.id ?? "");

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<any>({
    defaultValues: {
      baseAmount: initialData?.baseAmount ?? "",
      percentage: initialData?.percentage ?? "",
      amount:     initialData?.amount     ?? "",
      currency:   initialData?.currency   ?? "TRY",
      notes:      initialData?.notes      ?? "",
    },
  });

  // Oran + baz tutar girilince komisyon tutarını otomatik öner
  const baseAmount = watch("baseAmount");
  const percentage = watch("percentage");
  useEffect(() => {
    if (baseAmount && percentage) {
      const calc = (Number(baseAmount) * Number(percentage)) / 100;
      if (!isNaN(calc)) setValue("amount", Math.round(calc * 100) / 100);
    }
  }, [baseAmount, percentage, setValue]);

  async function onSubmit(data: any) {
    if (!selContractId) { toast.error("Lütfen bir sözleşme seçin."); return; }
    if (!selAgentId)    { toast.error("Lütfen bir danışman seçin."); return; }

    const payload: CommissionProps = {
      contractId: selContractId,
      agentId:    selAgentId,
      side:       selSide.value,
      baseAmount: Number(data.baseAmount || 0),
      percentage: data.percentage ? Number(data.percentage) : undefined,
      amount:     Number(data.amount || 0),
      currency:   data.currency || "TRY",
      status:     selStatus.value,
      notes:      data.notes || undefined,
      agencyId,
    };

    try {
      setLoading(true);
      if (isEditing) { await updateCommission(editingId!, payload); toast.success("Komisyon güncellendi!"); }
      else { await createCommission(payload); toast.success("Komisyon kaydedildi!"); }
      router.push("/estate/dashboard/finance/commission-records");
    } catch (err: any) {
      toast.error(err?.message ?? "Bir hata oluştu.");
    } finally { setLoading(false); }
  }

  const selectCls   = "w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none";
  const selectLabel = "block text-sm font-medium text-gray-900 mb-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-black">
        {isEditing ? "Komisyonu Düzenle" : "Yeni Komisyon Kaydı"}
      </h2>

      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Sözleşme & Danışman</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={selectLabel}>Sözleşme <span className="text-red-500">*</span></label>
            <select value={selContractId} onChange={(e) => setSelContractId(e.target.value)} className={selectCls}>
              <option value="">— Sözleşme seçin —</option>
              {contracts.map((c) => (<option key={c.id} value={c.id}>{c.contractNo}</option>))}
            </select>
          </div>
          <div>
            <label className={selectLabel}>Danışman <span className="text-red-500">*</span></label>
            <select value={selAgentId} onChange={(e) => setSelAgentId(e.target.value)} className={selectCls}>
              <option value="">— Danışman seçin —</option>
              {agents.map((a) => (<option key={a.id} value={a.id}>{a.firstName} {a.lastName}</option>))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormSelectInput label="Taraf" options={sideOptions} option={selSide} setOption={setSelSide} />
          <FormSelectInput label="Durum" options={statusOptions} option={selStatus} setOption={setSelStatus} />
        </div>
      </fieldset>

      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Tutarlar</legend>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <TextInput register={register} errors={errors} label="Baz Tutar (satış/kira)" name="baseAmount" type="number" />
          <TextInput register={register} errors={errors} label="Oran (%)" name="percentage" type="number" />
          <TextInput register={register} errors={errors} label="Komisyon Tutarı" name="amount" type="number" />
        </div>
        <TextInput register={register} errors={errors} label="Para Birimi" name="currency" />
        <TextArea register={register} errors={errors} label="Notlar" name="notes" helperText="Komisyon ile ilgili notlar." />
      </fieldset>

      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()} className="w-full sm:w-auto">
          <ArrowLeft className="mr-1 h-4 w-4" /> Geri
        </Button>
        <SubmitButton buttonIcon={SaveAll} title={isEditing ? "Güncelle" : "Komisyonu Kaydet"} loading={loading} loadingTitle="Kaydediliyor..." className="w-full sm:w-auto" />
      </div>
    </form>
  );
}
