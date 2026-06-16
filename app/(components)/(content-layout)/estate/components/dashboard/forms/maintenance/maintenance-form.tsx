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

import { MaintenanceProps, createMaintenance, updateMaintenance } from "../../../../actions/maintenance";

const priorityOptions = [
  { label: "Düşük",  value: "LOW" },
  { label: "Orta",   value: "MEDIUM" },
  { label: "Yüksek", value: "HIGH" },
  { label: "Acil",   value: "URGENT" },
];
const statusOptions = [
  { label: "Açık",     value: "OPEN" },
  { label: "İşlemde",  value: "IN_PROGRESS" },
  { label: "Çözüldü",  value: "RESOLVED" },
  { label: "İptal",    value: "CANCELLED" },
];

type Property = { id: string; title: string; city: string };
type Agent    = { id: string; firstName: string; lastName: string };
type Client   = { id: string; firstName: string; lastName: string };

type Props = {
  properties: Property[]; agents: Agent[]; clients: Client[];
  agencyId: string; editingId?: string; initialData?: any;
};

function fmt(d: any) {
  if (!d) return "";
  const dt = new Date(d);
  const local = new Date(dt.getTime() - dt.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
}

export default function MaintenanceForm({ properties, agents, clients, agencyId, editingId, initialData }: Props) {
  const router = useRouter();
  const isEditing = !!editingId;
  const [loading, setLoading] = useState(false);

  const [selPriority, setSelPriority] = useState<any>(priorityOptions.find((o) => o.value === initialData?.priority) ?? priorityOptions[1]);
  const [selStatus,   setSelStatus]   = useState<any>(statusOptions.find((o) => o.value === initialData?.status) ?? statusOptions[0]);
  const [selPropertyId, setSelPropertyId] = useState(initialData?.propertyId ?? properties[0]?.id ?? "");
  const [selAgentId,    setSelAgentId]    = useState(initialData?.agentId   ?? "");
  const [selClientId,   setSelClientId]   = useState(initialData?.clientId  ?? "");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<any>({
    defaultValues: {
      title:       initialData?.title       ?? "",
      description: initialData?.description ?? "",
      cost:        initialData?.cost        ?? "",
      currency:    initialData?.currency    ?? "TRY",
      vendor:      initialData?.vendor      ?? "",
      scheduledAt: fmt(initialData?.scheduledAt),
      resolution:  initialData?.resolution ?? "",
    },
  });

  async function onSubmit(data: any) {
    if (!data.title?.trim()) { toast.error("Talep başlığı gerekli."); return; }
    if (!selPropertyId) { toast.error("Lütfen bir mülk seçin."); return; }

    const payload: MaintenanceProps = {
      title:       data.title,
      description: data.description || undefined,
      priority:    selPriority.value,
      status:      selStatus.value,
      cost:        data.cost ? Number(data.cost) : undefined,
      currency:    data.currency || "TRY",
      vendor:      data.vendor || undefined,
      scheduledAt: data.scheduledAt || undefined,
      resolution:  data.resolution || undefined,
      propertyId:  selPropertyId,
      agentId:     selAgentId || undefined,
      clientId:    selClientId || undefined,
      agencyId,
    };

    try {
      setLoading(true);
      if (isEditing) { await updateMaintenance(editingId!, payload); toast.success("Talep güncellendi!"); }
      else { await createMaintenance(payload); toast.success("Talep oluşturuldu!"); reset(); }
      router.push("/estate/dashboard/maintenance");
    } catch (err: any) {
      toast.error(err?.message ?? "Bir hata oluştu.");
    } finally { setLoading(false); }
  }

  const selectCls   = "w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none";
  const selectLabel = "block text-sm font-medium text-gray-900 mb-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-black">
        {isEditing ? "Talebi Düzenle" : "Yeni Bakım / Arıza Talebi"}
      </h2>

      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Talep Bilgileri</legend>
        <TextInput register={register} errors={errors} label="Başlık *" name="title" />
        <TextArea register={register} errors={errors} label="Açıklama" name="description" helperText="Sorunun detayı." />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormSelectInput label="Öncelik" options={priorityOptions} option={selPriority} setOption={setSelPriority} />
          <FormSelectInput label="Durum" options={statusOptions} option={selStatus} setOption={setSelStatus} />
        </div>
      </fieldset>

      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Mülk & İlgililer</legend>
        <div>
          <label className={selectLabel}>Mülk <span className="text-red-500">*</span></label>
          <select value={selPropertyId} onChange={(e) => setSelPropertyId(e.target.value)} className={selectCls}>
            <option value="">— Mülk seçin —</option>
            {properties.map((p) => (<option key={p.id} value={p.id}>{p.title} — {p.city}</option>))}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={selectLabel}>Sorumlu Danışman</label>
            <select value={selAgentId} onChange={(e) => setSelAgentId(e.target.value)} className={selectCls}>
              <option value="">— Danışman seçin —</option>
              {agents.map((a) => (<option key={a.id} value={a.id}>{a.firstName} {a.lastName}</option>))}
            </select>
          </div>
          <div>
            <label className={selectLabel}>Talep Eden Müşteri</label>
            <select value={selClientId} onChange={(e) => setSelClientId(e.target.value)} className={selectCls}>
              <option value="">— Müşteri seçin —</option>
              {clients.map((c) => (<option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>))}
            </select>
          </div>
        </div>
      </fieldset>

      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">İş & Maliyet</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput register={register} errors={errors} label="Usta / Tedarikçi" name="vendor" />
          <TextInput register={register} errors={errors} label="Planlanan Tarih" name="scheduledAt" type="datetime-local" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput register={register} errors={errors} label="Maliyet" name="cost" type="number" />
          <TextInput register={register} errors={errors} label="Para Birimi" name="currency" />
        </div>
        <TextArea register={register} errors={errors} label="Çözüm Notu" name="resolution" helperText="Yapılan işlem." />
      </fieldset>

      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()} className="w-full sm:w-auto">
          <ArrowLeft className="mr-1 h-4 w-4" /> Geri
        </Button>
        <SubmitButton buttonIcon={SaveAll} title={isEditing ? "Güncelle" : "Talebi Kaydet"} loading={loading} loadingTitle="Kaydediliyor..." className="w-full sm:w-auto" />
      </div>
    </form>
  );
}
