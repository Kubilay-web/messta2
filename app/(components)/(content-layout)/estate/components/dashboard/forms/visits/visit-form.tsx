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

import { VisitProps, createVisit, updateVisit } from "../../../../actions/visits";

const statusOptions = [
  { label: "Planlandı",   value: "SCHEDULED"  },
  { label: "Tamamlandı",  value: "COMPLETED"  },
  { label: "İptal",       value: "CANCELLED"  },
  { label: "Gelmedi",     value: "NO_SHOW"    },
];
const ratingOptions = [
  { label: "— Puan yok —", value: "" },
  { label: "★ 1 / 5",      value: "1" },
  { label: "★★ 2 / 5",    value: "2" },
  { label: "★★★ 3 / 5",  value: "3" },
  { label: "★★★★ 4 / 5", value: "4" },
  { label: "★★★★★ 5 / 5",value: "5" },
];

type Property = { id: string; title: string; city: string };
type Listing  = { id: string; title: string; listingNo: string };
type Agent    = { id: string; firstName: string; lastName: string };
type Client   = { id: string; firstName: string; lastName: string };

type Props = {
  properties: Property[];
  listings:   Listing[];
  agents:     Agent[];
  clients:    Client[];
  editingId?: string;
  initialData?: Partial<VisitProps & { id: string }>;
};

function fmt(d: any) {
  if (!d) return "";
  const dt = new Date(d);
  const local = new Date(dt.getTime() - dt.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
}

export default function VisitForm({
  properties, listings, agents, clients, editingId, initialData,
}: Props) {
  const router    = useRouter();
  const isEditing = !!editingId;
  const [loading, setLoading] = useState(false);

  const [selStatus, setSelStatus] = useState<any>(
    statusOptions.find((o) => o.value === initialData?.status) ?? statusOptions[0]
  );
  const [selRating, setSelRating] = useState<any>(
    ratingOptions.find((o) => o.value === String(initialData?.rating ?? "")) ?? ratingOptions[0]
  );

  const [selPropertyId, setSelPropertyId] = useState(initialData?.propertyId ?? properties[0]?.id ?? "");
  const [selListingId,  setSelListingId]  = useState(initialData?.listingId  ?? "");
  const [selAgentId,    setSelAgentId]    = useState(initialData?.agentId    ?? agents[0]?.id    ?? "");
  const [selClientId,   setSelClientId]   = useState(initialData?.clientId   ?? clients[0]?.id   ?? "");

  const { register, handleSubmit, reset, formState: { errors } } =
    useForm<VisitProps>({
      defaultValues: {
        scheduledAt: fmt(initialData?.scheduledAt) || fmt(new Date()),
        completedAt: fmt(initialData?.completedAt),
        notes:       initialData?.notes    ?? "",
        feedback:    initialData?.feedback ?? "",
      } as any,
    });

  async function onSubmit(data: VisitProps) {
    if (!selPropertyId) { toast.error("Lütfen bir mülk seçin."); return; }
    if (!selAgentId)    { toast.error("Lütfen bir danışman seçin."); return; }
    if (!selClientId)   { toast.error("Lütfen bir müşteri seçin."); return; }

    const payload: VisitProps = {
      ...data,
      status:     selStatus.value,
      rating:     selRating.value ? parseInt(selRating.value, 10) : undefined,
      propertyId: selPropertyId,
      listingId:  selListingId || undefined,
      agentId:    selAgentId,
      clientId:   selClientId,
      completedAt: (data.completedAt as any) || undefined,
    };

    try {
      setLoading(true);
      if (isEditing) {
        await updateVisit(editingId!, payload);
        toast.success("Gezi güncellendi!");
      } else {
        await createVisit(payload);
        toast.success("Gezi oluşturuldu!");
        reset();
      }
      router.push("/estate/dashboard/visits");
    } catch (err: any) {
      toast.error(err?.message ?? "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  const selectCls   = "w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none";
  const selectLabel = "block text-sm font-medium text-gray-900 mb-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-black">
        {isEditing ? "Geziyi Düzenle" : "Yeni Mülk Gezisi Oluştur"}
      </h2>

      {/* Tarih & Durum */}
      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Gezi Bilgileri</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput register={register} errors={errors} label="Planlanan Tarih / Saat" name="scheduledAt" type="datetime-local" />
          <TextInput register={register} errors={errors} label="Tamamlanma Tarihi"       name="completedAt" type="datetime-local" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormSelectInput label="Durum" options={statusOptions} option={selStatus} setOption={setSelStatus} />
          <FormSelectInput label="Müşteri Puanı" options={ratingOptions} option={selRating} setOption={setSelRating} />
        </div>
      </fieldset>

      {/* Mülk & İlan */}
      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Mülk & İlan</legend>
        <div>
          <label className={selectLabel}>Mülk <span className="text-red-500">*</span></label>
          <select value={selPropertyId} onChange={(e) => setSelPropertyId(e.target.value)} className={selectCls}>
            <option value="">— Mülk seçin —</option>
            {properties.map((p) => (
              <option key={p.id} value={p.id}>{p.title} — {p.city}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={selectLabel}>İlan (İsteğe Bağlı)</label>
          <select value={selListingId} onChange={(e) => setSelListingId(e.target.value)} className={selectCls}>
            <option value="">— İlan seçin —</option>
            {listings.map((l) => (
              <option key={l.id} value={l.id}>{l.listingNo} — {l.title}</option>
            ))}
          </select>
        </div>
      </fieldset>

      {/* Danışman & Müşteri */}
      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Danışman & Müşteri</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={selectLabel}>Sorumlu Danışman <span className="text-red-500">*</span></label>
            <select value={selAgentId} onChange={(e) => setSelAgentId(e.target.value)} className={selectCls}>
              <option value="">— Danışman seçin —</option>
              {agents.map((a) => (
                <option key={a.id} value={a.id}>{a.firstName} {a.lastName}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={selectLabel}>Müşteri <span className="text-red-500">*</span></label>
            <select value={selClientId} onChange={(e) => setSelClientId(e.target.value)} className={selectCls}>
              <option value="">— Müşteri seçin —</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      {/* Notlar & Geri Bildirim */}
      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Notlar & Geri Bildirim</legend>
        <TextArea register={register} errors={errors} label="Notlar"          name="notes"    helperText="Gezi ile ilgili dahili notlar." />
        <TextArea register={register} errors={errors} label="Müşteri Görüşü" name="feedback" helperText="Müşteriden alınan geri bildirim." />
      </fieldset>

      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()} className="w-full sm:w-auto">
          <ArrowLeft className="mr-1 h-4 w-4" /> Geri
        </Button>
        <SubmitButton
          buttonIcon={SaveAll}
          title={isEditing ? "Güncelle" : "Geziyi Kaydet"}
          loading={loading}
          loadingTitle="Kaydediliyor..."
          className="w-full sm:w-auto"
        />
      </div>
    </form>
  );
}
