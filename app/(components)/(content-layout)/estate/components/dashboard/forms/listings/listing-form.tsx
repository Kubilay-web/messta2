"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { SaveAll, ArrowLeft } from "lucide-react";

import TextInput    from "../../../FormInputs/TextInput";
import TextArea     from "../../../FormInputs/TextAreaInput";
import SubmitButton from "../../../FormInputs/SubmitButton";
import { Button }   from "../../../ui/button";
import { Checkbox } from "../../../ui/checkbox";
import FormSelectInput from "../../../FormInputs/FormSelectInput";

import {
  ListingProps,
  createListing,
  updateListing,
} from "../../../../actions/listings";
import { Listing } from "../../../../types/types";

/* ── Seçenekler ─────────────────────────────────────────────────────────── */
const typeOptions = [
  { label: "Satılık",              value: "SALE"       },
  { label: "Kiralık",              value: "RENT"       },
  { label: "Kısa Dönem Kiralık",   value: "SHORT_RENT" },
];
const statusOptions = [
  { label: "Aktif",          value: "ACTIVE"     },
  { label: "Beklemede",      value: "PENDING"    },
  { label: "Rezerve",        value: "RESERVED"   },
  { label: "Satıldı",        value: "SOLD"       },
  { label: "Kiralandı",      value: "RENTED"     },
  { label: "Geri Çekildi",   value: "WITHDRAWN"  },
];
const currencyOptions = [
  { label: "TRY ₺", value: "TRY" },
  { label: "USD $", value: "USD" },
  { label: "EUR €", value: "EUR" },
];

/* ── Props ──────────────────────────────────────────────────────────────── */
type Props = {
  agencyId:   string;
  agentName:  string;
  listingNo:  string;
  properties: { id: string; title: string; city: string; propertyType: string }[];
  agents:     { id: string; firstName: string; lastName: string }[];
  editingId?: string;
  initialData?: Partial<Listing>;
};

export default function ListingForm({
  agencyId,
  agentName,
  listingNo,
  properties,
  agents,
  editingId,
  initialData,
}: Props) {
  const router    = useRouter();
  const isEditing = !!editingId;
  const [loading, setLoading] = useState(false);

  const [selType,     setSelType]     = useState<any>(typeOptions.find((o) => o.value === initialData?.listingType)     ?? typeOptions[0]);
  const [selStatus,   setSelStatus]   = useState<any>(statusOptions.find((o) => o.value === initialData?.status)        ?? statusOptions[0]);
  const [selCurrency, setSelCurrency] = useState<any>(currencyOptions.find((o) => o.value === initialData?.currency)    ?? currencyOptions[0]);
  const [isNegotiable, setIsNegotiable] = useState(initialData?.isNegotiable ?? true);
  const [isPublic,     setIsPublic]     = useState(initialData?.isPublic     ?? true);

  const [selPropId,  setSelPropId]  = useState<string>(initialData?.propertyId ?? properties[0]?.id ?? "");
  const [selAgentId, setSelAgentId] = useState<string>(initialData?.agentId   ?? agents[0]?.id     ?? "");

  const { register, handleSubmit, reset, formState: { errors } } =
    useForm<ListingProps>({
      defaultValues: {
        agencyId,
        agentName:   initialData?.agentName  ?? agentName,
        title:       initialData?.title      ?? "",
        listingNo:   initialData?.listingNo  ?? listingNo,
        askingPrice: initialData?.askingPrice ?? 0,
        currency:    initialData?.currency   ?? "TRY",
        monthlyRent: initialData?.monthlyRent ?? undefined,
        deposit:     initialData?.deposit     ?? undefined,
        description: initialData?.description ?? "",
        highlights:  Array.isArray(initialData?.highlights)
          ? initialData.highlights.join(", ")
          : (initialData?.highlights ?? ""),
        publishedAt: initialData?.publishedAt
          ? new Date(initialData.publishedAt).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        expiresAt:   initialData?.expiresAt
          ? new Date(initialData.expiresAt).toISOString().split("T")[0]
          : "",
      } as any,
    });

  async function onSubmit(data: ListingProps) {
    data.listingType  = selType.value;
    data.status       = selStatus.value;
    data.currency     = selCurrency.value;
    data.isNegotiable = isNegotiable;
    data.isPublic     = isPublic;
    data.propertyId   = selPropId;
    data.agentId      = selAgentId || undefined;
    data.agentName    = agents.find((a) => a.id === selAgentId)
      ? `${agents.find((a) => a.id === selAgentId)!.firstName} ${agents.find((a) => a.id === selAgentId)!.lastName}`
      : agentName;
    data.agencyId     = agencyId;
    data.askingPrice  = parseFloat(String(data.askingPrice));
    data.monthlyRent  = data.monthlyRent ? parseFloat(String(data.monthlyRent)) : undefined;
    data.deposit      = data.deposit     ? parseFloat(String(data.deposit))     : undefined;
    data.highlights   = typeof data.highlights === "string"
      ? (data.highlights as any).split(",").map((s: string) => s.trim()).filter(Boolean)
      : data.highlights;

    try {
      setLoading(true);
      if (isEditing) {
        await updateListing(editingId!, data);
        toast.success("İlan güncellendi!");
      } else {
        await createListing(data);
        toast.success("İlan oluşturuldu!");
        reset();
      }
      router.push("/estate/dashboard/listings");
    } catch (err: any) {
      toast.error(err?.message ?? "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-black">
          {isEditing ? "İlanı Düzenle" : "Yeni İlan Oluştur"}
        </h2>
      </div>

      {/* Temel Bilgiler */}
      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">İlan Bilgileri</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput register={register} errors={errors} label="İlan Başlığı" name="title" placeholder="Örn. 3+1 Daire — Levent" />
          <TextInput register={register} errors={errors} label="İlan No" name="listingNo" placeholder="LN-2025-0001" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormSelectInput label="İlan Tipi"  options={typeOptions}   option={selType}   setOption={setSelType}   />
          <FormSelectInput label="Durum"      options={statusOptions} option={selStatus} setOption={setSelStatus} />
          <div className="flex flex-col gap-3 pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <Checkbox checked={isNegotiable} onCheckedChange={(v) => setIsNegotiable(!!v)} />
              <span className="text-sm text-black">Fiyat Pazarlıklı</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <Checkbox checked={isPublic} onCheckedChange={(v) => setIsPublic(!!v)} />
              <span className="text-sm text-black">Herkese Açık</span>
            </label>
          </div>
        </div>
      </fieldset>

      {/* Fiyat */}
      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Fiyat Bilgileri</legend>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <TextInput register={register} errors={errors} label="İstenen Fiyat"  name="askingPrice" type="number" placeholder="5000000" />
          <TextInput register={register} errors={errors} label="Aylık Kira (₺)" name="monthlyRent" type="number" placeholder="15000" />
          <TextInput register={register} errors={errors} label="Depozito (₺)"   name="deposit"     type="number" placeholder="45000" />
        </div>
        <FormSelectInput label="Para Birimi" options={currencyOptions} option={selCurrency} setOption={setSelCurrency} />
      </fieldset>

      {/* Mülk & Danışman */}
      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Mülk & Danışman</legend>

        {/* Mülk Seç — native select (react-tailwindcss-select referans sorunu önlendi) */}
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">
            Mülk Seç
          </label>
          <select
            value={selPropId}
            onChange={(e) => setSelPropId(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">— Mülk seçin —</option>
            {properties.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title} — {p.city} ({p.propertyType})
              </option>
            ))}
          </select>
        </div>

        {/* Danışman Seç */}
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">
            Sorumlu Danışman
          </label>
          <select
            value={selAgentId}
            onChange={(e) => setSelAgentId(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">— Danışman seçin —</option>
            {agents.map((a) => (
              <option key={a.id} value={a.id}>
                {a.firstName} {a.lastName}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      {/* Tarihler */}
      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Yayın Tarihleri</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput register={register} errors={errors} label="Yayın Tarihi"     name="publishedAt" type="date" placeholder="2025-01-01" />
          <TextInput register={register} errors={errors} label="Son Geçerlilik"   name="expiresAt"   type="date" placeholder="2025-12-31" />
        </div>
      </fieldset>

      {/* Açıklama */}
      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Açıklama & Öne Çıkanlar</legend>
        <TextArea register={register} errors={errors} label="İlan Açıklaması" name="description" helperText="Mülk hakkında detaylı bilgi." />
        <TextInput
          register={register} errors={errors}
          label="Öne Çıkan Özellikler (virgülle)"
          name="highlights"
          placeholder="Deniz manzarası, Yeni bina, Metro yakını"
        />
      </fieldset>

      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()} className="w-full sm:w-auto">
          <ArrowLeft className="mr-1 h-4 w-4" /> Geri
        </Button>
        <SubmitButton
          buttonIcon={SaveAll}
          title={isEditing ? "Güncelle" : "İlanı Kaydet"}
          loading={loading}
          loadingTitle="Kaydediliyor..."
          className="w-full sm:w-auto"
        />
      </div>
    </form>
  );
}
