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

import { CommLogProps, createCommLog, updateCommLog } from "../../../../actions/communication-logs";

const channelOptions = [
  { label: "Telefon",    value: "CALL" },
  { label: "E-posta",    value: "EMAIL" },
  { label: "SMS",        value: "SMS" },
  { label: "WhatsApp",   value: "WHATSAPP" },
  { label: "Görüşme",    value: "MEETING" },
  { label: "Not",        value: "NOTE" },
];
const directionOptions = [
  { label: "Giden",  value: "OUTBOUND" },
  { label: "Gelen",  value: "INBOUND" },
];

type Agent   = { id: string; firstName: string; lastName: string };
type Client  = { id: string; firstName: string; lastName: string };
type Listing = { id: string; title: string; listingNo: string };

type Props = {
  agents: Agent[]; clients: Client[]; listings: Listing[];
  agencyId: string; editingId?: string; initialData?: any;
};

function fmt(d: any) {
  if (!d) return "";
  const dt = new Date(d);
  const local = new Date(dt.getTime() - dt.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
}

export default function CommLogForm({ agents, clients, listings, agencyId, editingId, initialData }: Props) {
  const router = useRouter();
  const isEditing = !!editingId;
  const [loading, setLoading] = useState(false);

  const [selChannel,   setSelChannel]   = useState<any>(channelOptions.find((o) => o.value === initialData?.channel) ?? channelOptions[0]);
  const [selDirection, setSelDirection] = useState<any>(directionOptions.find((o) => o.value === initialData?.direction) ?? directionOptions[0]);
  const [selClientId,  setSelClientId]  = useState(initialData?.clientId  ?? "");
  const [selAgentId,   setSelAgentId]   = useState(initialData?.agentId   ?? "");
  const [selListingId, setSelListingId] = useState(initialData?.listingId ?? "");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<any>({
    defaultValues: {
      subject:     initialData?.subject     ?? "",
      content:     initialData?.content     ?? "",
      occurredAt:  fmt(initialData?.occurredAt) || fmt(new Date()),
      durationSec: initialData?.durationSec ?? "",
      outcome:     initialData?.outcome     ?? "",
    },
  });

  async function onSubmit(data: any) {
    const payload: CommLogProps = {
      channel:     selChannel.value,
      direction:   selDirection.value,
      subject:     data.subject || undefined,
      content:     data.content || undefined,
      occurredAt:  data.occurredAt || undefined,
      durationSec: data.durationSec ? Number(data.durationSec) : undefined,
      outcome:     data.outcome || undefined,
      clientId:    selClientId || undefined,
      agentId:     selAgentId || undefined,
      listingId:   selListingId || undefined,
      agencyId,
    };

    try {
      setLoading(true);
      if (isEditing) { await updateCommLog(editingId!, payload); toast.success("Kayıt güncellendi!"); }
      else { await createCommLog(payload); toast.success("İletişim kaydı eklendi!"); reset(); }
      router.push("/estate/dashboard/communication/logs");
    } catch (err: any) {
      toast.error(err?.message ?? "Bir hata oluştu.");
    } finally { setLoading(false); }
  }

  const selectCls   = "w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none";
  const selectLabel = "block text-sm font-medium text-gray-900 mb-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-black">
        {isEditing ? "Kaydı Düzenle" : "Yeni İletişim Kaydı"}
      </h2>

      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">İletişim</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormSelectInput label="Kanal" options={channelOptions} option={selChannel} setOption={setSelChannel} />
          <FormSelectInput label="Yön" options={directionOptions} option={selDirection} setOption={setSelDirection} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput register={register} errors={errors} label="Tarih / Saat" name="occurredAt" type="datetime-local" />
          <TextInput register={register} errors={errors} label="Süre (saniye)" name="durationSec" type="number" />
        </div>
        <TextInput register={register} errors={errors} label="Konu" name="subject" />
      </fieldset>

      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">İlgililer</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={selectLabel}>Müşteri</label>
            <select value={selClientId} onChange={(e) => setSelClientId(e.target.value)} className={selectCls}>
              <option value="">— Müşteri seçin —</option>
              {clients.map((c) => (<option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>))}
            </select>
          </div>
          <div>
            <label className={selectLabel}>Danışman</label>
            <select value={selAgentId} onChange={(e) => setSelAgentId(e.target.value)} className={selectCls}>
              <option value="">— Danışman seçin —</option>
              {agents.map((a) => (<option key={a.id} value={a.id}>{a.firstName} {a.lastName}</option>))}
            </select>
          </div>
        </div>
        <div>
          <label className={selectLabel}>İlgili İlan (ops.)</label>
          <select value={selListingId} onChange={(e) => setSelListingId(e.target.value)} className={selectCls}>
            <option value="">— İlan seçin —</option>
            {listings.map((l) => (<option key={l.id} value={l.id}>{l.listingNo} — {l.title}</option>))}
          </select>
        </div>
      </fieldset>

      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">İçerik</legend>
        <TextArea register={register} errors={errors} label="İçerik / Notlar" name="content" helperText="Görüşme içeriği." />
        <TextInput register={register} errors={errors} label="Sonuç" name="outcome" />
      </fieldset>

      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()} className="w-full sm:w-auto">
          <ArrowLeft className="mr-1 h-4 w-4" /> Geri
        </Button>
        <SubmitButton buttonIcon={SaveAll} title={isEditing ? "Güncelle" : "Kaydet"} loading={loading} loadingTitle="Kaydediliyor..." className="w-full sm:w-auto" />
      </div>
    </form>
  );
}
