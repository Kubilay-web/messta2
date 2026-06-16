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

import { OfferProps, createOffer, updateOffer } from "../../../../actions/offers";

const typeOptions = [
  { label: "Satılık",            value: "SALE" },
  { label: "Kiralık",            value: "RENT" },
  { label: "Kısa Dönem Kiralık", value: "SHORT_RENT" },
];
const statusOptions = [
  { label: "Beklemede",         value: "PENDING" },
  { label: "Karşı Teklif",      value: "COUNTERED" },
  { label: "Kabul Edildi",      value: "ACCEPTED" },
  { label: "Reddedildi",        value: "REJECTED" },
  { label: "Geri Çekildi",      value: "WITHDRAWN" },
  { label: "Süresi Doldu",      value: "EXPIRED" },
];

type Listing = { id: string; title: string; listingNo: string };
type Agent   = { id: string; firstName: string; lastName: string };
type Client  = { id: string; firstName: string; lastName: string };

type Props = {
  listings:  Listing[];
  agents:    Agent[];
  clients:   Client[];
  agencyId:  string;
  editingId?: string;
  initialData?: any;
};

function fmt(d: any) {
  if (!d) return "";
  const dt = new Date(d);
  const local = new Date(dt.getTime() - dt.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
}

export default function OfferForm({ listings, agents, clients, agencyId, editingId, initialData }: Props) {
  const router = useRouter();
  const isEditing = !!editingId;
  const [loading, setLoading] = useState(false);

  const [selType,   setSelType]   = useState<any>(typeOptions.find((o) => o.value === initialData?.offerType) ?? typeOptions[0]);
  const [selStatus, setSelStatus] = useState<any>(statusOptions.find((o) => o.value === initialData?.status) ?? statusOptions[0]);
  const [selListingId, setSelListingId] = useState(initialData?.listingId ?? listings[0]?.id ?? "");
  const [selAgentId,   setSelAgentId]   = useState(initialData?.agentId   ?? "");
  const [selClientId,  setSelClientId]  = useState(initialData?.clientId  ?? clients[0]?.id ?? "");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<any>({
    defaultValues: {
      amount:        initialData?.amount        ?? "",
      counterAmount: initialData?.counterAmount ?? "",
      depositOffer:  initialData?.depositOffer  ?? "",
      currency:      initialData?.currency      ?? "TRY",
      validUntil:    fmt(initialData?.validUntil),
      message:       initialData?.message       ?? "",
      rejectReason:  initialData?.rejectReason  ?? "",
    },
  });

  async function onSubmit(data: any) {
    if (!selListingId) { toast.error("Lütfen bir ilan seçin."); return; }
    if (!selClientId)  { toast.error("Lütfen bir müşteri seçin."); return; }

    const payload: OfferProps = {
      offerType:     selType.value,
      status:        selStatus.value,
      amount:        Number(data.amount),
      currency:      data.currency || "TRY",
      counterAmount: data.counterAmount ? Number(data.counterAmount) : undefined,
      depositOffer:  data.depositOffer  ? Number(data.depositOffer)  : undefined,
      message:       data.message || undefined,
      validUntil:    data.validUntil || undefined,
      rejectReason:  data.rejectReason || undefined,
      listingId:     selListingId,
      clientId:      selClientId,
      agentId:       selAgentId || undefined,
      agencyId,
    };

    try {
      setLoading(true);
      if (isEditing) { await updateOffer(editingId!, payload); toast.success("Teklif güncellendi!"); }
      else { await createOffer(payload); toast.success("Teklif oluşturuldu!"); reset(); }
      router.push("/estate/dashboard/offers");
    } catch (err: any) {
      toast.error(err?.message ?? "Bir hata oluştu.");
    } finally { setLoading(false); }
  }

  const selectCls   = "w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none";
  const selectLabel = "block text-sm font-medium text-gray-900 mb-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-black">
        {isEditing ? "Teklifi Düzenle" : "Yeni Teklif Oluştur"}
      </h2>

      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">İlan & Müşteri</legend>
        <div>
          <label className={selectLabel}>İlan <span className="text-red-500">*</span></label>
          <select value={selListingId} onChange={(e) => setSelListingId(e.target.value)} className={selectCls}>
            <option value="">— İlan seçin —</option>
            {listings.map((l) => (<option key={l.id} value={l.id}>{l.listingNo} — {l.title}</option>))}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={selectLabel}>Müşteri <span className="text-red-500">*</span></label>
            <select value={selClientId} onChange={(e) => setSelClientId(e.target.value)} className={selectCls}>
              <option value="">— Müşteri seçin —</option>
              {clients.map((c) => (<option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>))}
            </select>
          </div>
          <div>
            <label className={selectLabel}>Sorumlu Danışman</label>
            <select value={selAgentId} onChange={(e) => setSelAgentId(e.target.value)} className={selectCls}>
              <option value="">— Danışman seçin —</option>
              {agents.map((a) => (<option key={a.id} value={a.id}>{a.firstName} {a.lastName}</option>))}
            </select>
          </div>
        </div>
      </fieldset>

      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Teklif Detayı</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormSelectInput label="Teklif Türü" options={typeOptions} option={selType} setOption={setSelType} />
          <FormSelectInput label="Durum" options={statusOptions} option={selStatus} setOption={setSelStatus} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput register={register} errors={errors} label="Teklif Tutarı" name="amount" type="number" />
          <TextInput register={register} errors={errors} label="Para Birimi" name="currency" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput register={register} errors={errors} label="Karşı Teklif (ops.)" name="counterAmount" type="number" />
          <TextInput register={register} errors={errors} label="Önerilen Kapora (ops.)" name="depositOffer" type="number" />
        </div>
        <TextInput register={register} errors={errors} label="Geçerlilik Tarihi" name="validUntil" type="datetime-local" />
      </fieldset>

      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Notlar</legend>
        <TextArea register={register} errors={errors} label="Teklif Notu" name="message" helperText="Teklifle ilgili açıklama." />
        <TextArea register={register} errors={errors} label="Ret Sebebi" name="rejectReason" helperText="Reddedilen teklifler için." />
      </fieldset>

      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()} className="w-full sm:w-auto">
          <ArrowLeft className="mr-1 h-4 w-4" /> Geri
        </Button>
        <SubmitButton buttonIcon={SaveAll} title={isEditing ? "Güncelle" : "Teklifi Kaydet"} loading={loading} loadingTitle="Kaydediliyor..." className="w-full sm:w-auto" />
      </div>
    </form>
  );
}
