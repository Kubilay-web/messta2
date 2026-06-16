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

import { NotificationProps, createNotification } from "../../../../actions/notifications";

const typeOptions = [
  { label: "Bilgi",         value: "INFO" },
  { label: "Uyarı",         value: "WARNING" },
  { label: "Başarı",        value: "SUCCESS" },
  { label: "Hatırlatma",    value: "REMINDER" },
  { label: "Görev",         value: "TASK" },
];

type Agent  = { id: string; firstName: string; lastName: string };
type Client = { id: string; firstName: string; lastName: string };
type Props  = { agents: Agent[]; clients: Client[]; agencyId: string };

export default function NotificationForm({ agents, clients, agencyId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [selType,     setSelType]     = useState<any>(typeOptions[0]);
  const [selAgentId,  setSelAgentId]  = useState("");
  const [selClientId, setSelClientId] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<any>({
    defaultValues: { title: "", message: "", link: "" },
  });

  async function onSubmit(data: any) {
    if (!data.title?.trim() || !data.message?.trim()) { toast.error("Başlık ve mesaj gerekli."); return; }

    const payload: NotificationProps = {
      type:     selType.value,
      title:    data.title,
      message:  data.message,
      link:     data.link || undefined,
      agentId:  selAgentId || undefined,
      clientId: selClientId || undefined,
      agencyId,
    };

    try {
      setLoading(true);
      await createNotification(payload);
      toast.success("Bildirim gönderildi!");
      reset();
      router.push("/estate/dashboard/notifications");
    } catch (err: any) {
      toast.error(err?.message ?? "Bir hata oluştu.");
    } finally { setLoading(false); }
  }

  const selectCls   = "w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none";
  const selectLabel = "block text-sm font-medium text-gray-900 mb-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-black">Yeni Bildirim</h2>

      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Bildirim</legend>
        <FormSelectInput label="Tür" options={typeOptions} option={selType} setOption={setSelType} />
        <TextInput register={register} errors={errors} label="Başlık *" name="title" />
        <TextArea register={register} errors={errors} label="Mesaj *" name="message" helperText="Bildirim metni." />
        <TextInput register={register} errors={errors} label="Bağlantı (ops.)" name="link" />
      </fieldset>

      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Hedef (ops.)</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={selectLabel}>Danışman</label>
            <select value={selAgentId} onChange={(e) => setSelAgentId(e.target.value)} className={selectCls}>
              <option value="">— Danışman seçin —</option>
              {agents.map((a) => (<option key={a.id} value={a.id}>{a.firstName} {a.lastName}</option>))}
            </select>
          </div>
          <div>
            <label className={selectLabel}>Müşteri</label>
            <select value={selClientId} onChange={(e) => setSelClientId(e.target.value)} className={selectCls}>
              <option value="">— Müşteri seçin —</option>
              {clients.map((c) => (<option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>))}
            </select>
          </div>
        </div>
      </fieldset>

      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()} className="w-full sm:w-auto">
          <ArrowLeft className="mr-1 h-4 w-4" /> Geri
        </Button>
        <SubmitButton buttonIcon={SaveAll} title="Bildirim Gönder" loading={loading} loadingTitle="Gönderiliyor..." className="w-full sm:w-auto" />
      </div>
    </form>
  );
}
