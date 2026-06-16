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
import FormSelectInput from "../../../FormInputs/FormSelectInput";

import { ContractProps, createContract, updateContract } from "../../../../actions/contracts";
import { PropertyContract } from "../../../../types/types";

/* ── Seçenekler ─────────────────────────────────────────────────────────── */
const typeOptions = [
  { label: "Satış Sözleşmesi",      value: "SALE"     },
  { label: "Kira Sözleşmesi",       value: "RENTAL"   },
  { label: "Ön Satış (Satış Vaadi)", value: "PRE_SALE" },
];
const statusOptions = [
  { label: "Taslak",      value: "DRAFT"     },
  { label: "Aktif",       value: "ACTIVE"    },
  { label: "Tamamlandı",  value: "COMPLETED" },
  { label: "İptal",       value: "CANCELLED" },
  { label: "Süresi Doldu",value: "EXPIRED"   },
];
const currencyOptions = [
  { label: "TRY ₺", value: "TRY" },
  { label: "USD $", value: "USD" },
  { label: "EUR €", value: "EUR" },
];

/* ── Props ──────────────────────────────────────────────────────────────── */
type Props = {
  agencyId:    string;
  contractNo:  string;
  properties:  { id: string; title: string; city: string }[];
  listings:    { id: string; title: string; listingNo: string }[];
  agents:      { id: string; firstName: string; lastName: string }[];
  clients:     { id: string; firstName: string; lastName: string }[];
  editingId?:  string;
  initialData?: Partial<PropertyContract>;
};

function fmt(d: any) {
  if (!d) return "";
  return new Date(d).toISOString().split("T")[0];
}

export default function ContractForm({
  agencyId, contractNo, properties, listings, agents, clients, editingId, initialData,
}: Props) {
  const router    = useRouter();
  const isEditing = !!editingId;
  const [loading, setLoading] = useState(false);

  const [selType,     setSelType]     = useState<any>(typeOptions.find((o) => o.value === initialData?.contractType) ?? typeOptions[0]);
  const [selStatus,   setSelStatus]   = useState<any>(statusOptions.find((o) => o.value === initialData?.status)     ?? statusOptions[0]);
  const [selCurrency, setSelCurrency] = useState<any>(currencyOptions.find((o) => o.value === initialData?.currency) ?? currencyOptions[0]);

  // native select ID states — FormSelectInput referans sorununu önler
  const [selPropId,    setSelPropId]    = useState(initialData?.propertyId ?? properties[0]?.id  ?? "");
  const [selListingId, setSelListingId] = useState(initialData?.listingId  ?? "");
  const [selAgentId,   setSelAgentId]   = useState(initialData?.agentId    ?? agents[0]?.id      ?? "");
  const [selClientId,  setSelClientId]  = useState(initialData?.clientId   ?? clients[0]?.id     ?? "");

  const { register, handleSubmit, reset, formState: { errors } } =
    useForm<ContractProps>({
      defaultValues: {
        agencyId,
        contractNo:  initialData?.contractNo  ?? contractNo,
        currency:    initialData?.currency    ?? "TRY",
        notes:       initialData?.notes       ?? "",
        salePrice:   initialData?.salePrice   ?? undefined,
        rentalPrice: initialData?.rentalPrice ?? undefined,
        deposit:     initialData?.deposit     ?? undefined,
        commission:  initialData?.commission  ?? undefined,
        startDate:   fmt(initialData?.startDate) || new Date().toISOString().split("T")[0],
        endDate:     fmt(initialData?.endDate),
        signedDate:  fmt(initialData?.signedDate),
        agentName:   initialData?.agentName  ?? "",
        clientName:  initialData?.clientName ?? "",
      } as any,
    });

  async function onSubmit(data: ContractProps) {
    const agent  = agents.find((a) => a.id === selAgentId);
    const client = clients.find((c) => c.id === selClientId);

    data.agencyId    = agencyId;
    data.contractType = selType.value;
    data.status      = selStatus.value;
    data.currency    = selCurrency.value;
    data.propertyId  = selPropId;
    data.listingId   = selListingId || undefined;
    data.agentId     = selAgentId;
    data.agentName   = agent ? `${agent.firstName} ${agent.lastName}` : (data.agentName || "");
    data.clientId    = selClientId;
    data.clientName  = client ? `${client.firstName} ${client.lastName}` : (data.clientName || "");
    data.salePrice   = data.salePrice   ? parseFloat(String(data.salePrice))   : undefined;
    data.rentalPrice = data.rentalPrice ? parseFloat(String(data.rentalPrice)) : undefined;
    data.deposit     = data.deposit     ? parseFloat(String(data.deposit))     : undefined;
    data.commission  = data.commission  ? parseFloat(String(data.commission))  : undefined;

    try {
      setLoading(true);
      if (isEditing) {
        await updateContract(editingId!, data);
        toast.success("Sözleşme güncellendi!");
      } else {
        await createContract(data);
        toast.success("Sözleşme oluşturuldu!");
        reset();
      }
      router.push("/estate/dashboard/contracts");
    } catch (err: any) {
      toast.error(err?.message ?? "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  const selectCls = "w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none";
  const selectLabel = "block text-sm font-medium leading-6 text-gray-900 mb-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-black">
          {isEditing ? "Sözleşmeyi Düzenle" : "Yeni Sözleşme Oluştur"}
        </h2>
      </div>

      {/* Temel */}
      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Sözleşme Bilgileri</legend>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <TextInput register={register} errors={errors} label="Sözleşme No" name="contractNo" placeholder="CNT-2025-0001" />
          <FormSelectInput label="Sözleşme Tipi" options={typeOptions}   option={selType}   setOption={setSelType}   />
          <FormSelectInput label="Durum"         options={statusOptions} option={selStatus} setOption={setSelStatus} />
        </div>
      </fieldset>

      {/* Taraflar */}
      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Taraflar & Mülk</legend>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={selectLabel}>Mülk</label>
            <select value={selPropId} onChange={(e) => setSelPropId(e.target.value)} className={selectCls}>
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={selectLabel}>Sorumlu Danışman</label>
            <select value={selAgentId} onChange={(e) => setSelAgentId(e.target.value)} className={selectCls}>
              <option value="">— Danışman seçin —</option>
              {agents.map((a) => (
                <option key={a.id} value={a.id}>{a.firstName} {a.lastName}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={selectLabel}>Müşteri</label>
            <select value={selClientId} onChange={(e) => setSelClientId(e.target.value)} className={selectCls}>
              <option value="">— Müşteri seçin —</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      {/* Tarihler */}
      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Tarihler</legend>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <TextInput register={register} errors={errors} label="Başlangıç Tarihi"    name="startDate"  type="date" placeholder="2025-01-01" />
          <TextInput register={register} errors={errors} label="Bitiş Tarihi"        name="endDate"    type="date" placeholder="2026-01-01" />
          <TextInput register={register} errors={errors} label="İmzalanma Tarihi"    name="signedDate" type="date" placeholder="2025-01-15" />
        </div>
      </fieldset>

      {/* Finansal */}
      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Finansal Bilgiler</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <TextInput register={register} errors={errors} label="Satış Fiyatı"   name="salePrice"   type="number" placeholder="5000000" />
          <TextInput register={register} errors={errors} label="Kira Bedeli"    name="rentalPrice" type="number" placeholder="15000" />
          <TextInput register={register} errors={errors} label="Depozito"       name="deposit"     type="number" placeholder="45000" />
          <TextInput register={register} errors={errors} label="Komisyon"       name="commission"  type="number" placeholder="100000" />
        </div>
        <FormSelectInput label="Para Birimi" options={currencyOptions} option={selCurrency} setOption={setSelCurrency} />
      </fieldset>

      {/* Notlar */}
      <fieldset className="border rounded-lg p-4">
        <legend className="text-sm font-semibold px-1 text-black">Notlar</legend>
        <TextArea register={register} errors={errors} label="Sözleşme Notları" name="notes" helperText="Özel şartlar, ek bilgiler." />
      </fieldset>

      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()} className="w-full sm:w-auto">
          <ArrowLeft className="mr-1 h-4 w-4" /> Geri
        </Button>
        <SubmitButton
          buttonIcon={SaveAll}
          title={isEditing ? "Güncelle" : "Sözleşme Kaydet"}
          loading={loading}
          loadingTitle="Kaydediliyor..."
          className="w-full sm:w-auto"
        />
      </div>
    </form>
  );
}
