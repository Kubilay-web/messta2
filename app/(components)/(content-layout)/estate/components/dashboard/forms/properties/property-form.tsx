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

import { PropertyProps, createProperty, updateProperty } from "../../../../actions/properties";
import { PropertyRealEstate } from "../../../../types/types";

/* ── Seçenekler ─────────────────────────────────────────────────────────── */
const typeOptions = [
  { label: "Daire",     value: "APARTMENT" },
  { label: "Ev",        value: "HOUSE"     },
  { label: "Villa",     value: "VILLA"     },
  { label: "Ofis",      value: "OFFICE"    },
  { label: "Dükkan",    value: "SHOP"      },
  { label: "Arsa",      value: "LAND"      },
  { label: "Depo",      value: "WAREHOUSE" },
  { label: "Bina",      value: "BUILDING"  },
];
const statusOptions = [
  { label: "Müsait",            value: "AVAILABLE"         },
  { label: "Sözleşme Sürecinde",value: "UNDER_CONTRACT"    },
  { label: "Bakımda",           value: "UNDER_MAINTENANCE" },
  { label: "Satıldı",           value: "SOLD"              },
  { label: "Kiralandı",         value: "RENTED"            },
];
const currencyOptions = [
  { label: "TRY ₺", value: "TRY" },
  { label: "USD $", value: "USD" },
  { label: "EUR €", value: "EUR" },
];

const boolFields = [
  { name: "hasElevator", label: "Asansör" },
  { name: "hasParking",  label: "Otopark"  },
  { name: "isFurnished", label: "Eşyalı"   },
  { name: "hasGarden",   label: "Bahçe"    },
  { name: "hasPool",     label: "Yüzme Havuzu" },
  { name: "hasBalcony",  label: "Balkon"   },
  { name: "isFeatured",  label: "Öne Çıkan" },
] as const;

type BoolKey = typeof boolFields[number]["name"];

/* ── Props ──────────────────────────────────────────────────────────────── */
type Props = {
  agencyId:    string;
  agencyName:  string;
  editingId?:  string;
  initialData?: Partial<PropertyRealEstate>;
};

export default function PropertyForm({ agencyId, agencyName, editingId, initialData }: Props) {
  const router    = useRouter();
  const isEditing = !!editingId;
  const [loading, setLoading] = useState(false);

  const [selType,     setSelType]     = useState<any>(typeOptions.find((o) => o.value === initialData?.propertyType)   ?? typeOptions[0]);
  const [selStatus,   setSelStatus]   = useState<any>(statusOptions.find((o) => o.value === initialData?.status)       ?? statusOptions[0]);
  const [selCurrency, setSelCurrency] = useState<any>(currencyOptions.find((o) => o.value === initialData?.currency)   ?? currencyOptions[0]);

  const initBools = Object.fromEntries(
    boolFields.map(({ name }) => [name, initialData?.[name] ?? false])
  ) as Record<BoolKey, boolean>;
  const [bools, setBools] = useState(initBools);

  const { register, handleSubmit, reset, formState: { errors } } =
    useForm<PropertyProps>({
      defaultValues: {
        agencyId,
        agencyName,
        currency: initialData?.currency ?? "TRY",
        ...initialData,
      } as any,
    });

  function toggleBool(key: BoolKey) {
    setBools((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  async function onSubmit(data: PropertyProps) {
    data.agencyId    = agencyId;
    data.agencyName  = agencyName;
    data.propertyType = selType.value;
    data.status      = selStatus.value;
    data.currency    = selCurrency.value;
    Object.assign(data, bools);
    data.grossArea    = data.grossArea    ? parseFloat(String(data.grossArea))    : undefined;
    data.netArea      = data.netArea      ? parseFloat(String(data.netArea))      : undefined;
    data.price        = data.price        ? parseFloat(String(data.price))        : undefined;
    data.bathroomCount = data.bathroomCount ? parseInt(String(data.bathroomCount), 10) : undefined;
    data.floorNo      = data.floorNo      ? parseInt(String(data.floorNo), 10)      : undefined;
    data.totalFloors  = data.totalFloors  ? parseInt(String(data.totalFloors), 10)  : undefined;
    data.buildingAge  = data.buildingAge  ? parseInt(String(data.buildingAge), 10)  : undefined;

    try {
      setLoading(true);
      if (isEditing) {
        await updateProperty(editingId!, data);
        toast.success("Mülk güncellendi!");
      } else {
        await createProperty(data);
        toast.success("Mülk oluşturuldu!");
        reset();
      }
      router.push("/estate/dashboard/properties");
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
          {isEditing ? "Mülkü Düzenle" : "Yeni Mülk Ekle"}
        </h2>
      </div>

      {/* Temel */}
      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Temel Bilgiler</legend>
        <TextInput register={register} errors={errors} label="Mülk Başlığı" name="title" placeholder="Örn. Levent 3+1 Daire" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormSelectInput label="Mülk Tipi" options={typeOptions}   option={selType}   setOption={setSelType}   />
          <FormSelectInput label="Durum"     options={statusOptions} option={selStatus} setOption={setSelStatus} />
          <TextInput register={register} errors={errors} label="Oda Sayısı" name="roomCount" placeholder="3+1" />
        </div>
      </fieldset>

      {/* Konum */}
      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Konum</legend>
        <TextInput register={register} errors={errors} label="Adres" name="address" placeholder="Cadde, Sokak, Bina No" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <TextInput register={register} errors={errors} label="Şehir"   name="city"         placeholder="İstanbul" />
          <TextInput register={register} errors={errors} label="İlçe"    name="district"     placeholder="Beşiktaş" />
          <TextInput register={register} errors={errors} label="Mahalle" name="neighborhood" placeholder="Levent" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <TextInput register={register} errors={errors} label="Posta Kodu" name="zipCode"   placeholder="34330" />
          <TextInput register={register} errors={errors} label="Enlem"      name="latitude"  type="number" placeholder="41.0082" />
          <TextInput register={register} errors={errors} label="Boylam"     name="longitude" type="number" placeholder="28.9784" />
        </div>
      </fieldset>

      {/* Fiziksel Özellikler */}
      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Fiziksel Özellikler</legend>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <TextInput register={register} errors={errors} label="Brüt Alan (m²)" name="grossArea"     type="number" placeholder="120" />
          <TextInput register={register} errors={errors} label="Net Alan (m²)"   name="netArea"       type="number" placeholder="105" />
          <TextInput register={register} errors={errors} label="Banyo Sayısı"    name="bathroomCount" type="number" placeholder="2" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <TextInput register={register} errors={errors} label="Kat No"       name="floorNo"      type="number" placeholder="5" />
          <TextInput register={register} errors={errors} label="Toplam Kat"   name="totalFloors"  type="number" placeholder="12" />
          <TextInput register={register} errors={errors} label="Bina Yaşı"    name="buildingAge"  type="number" placeholder="5" />
          <TextInput register={register} errors={errors} label="Isıtma Tipi"  name="heatingType"  placeholder="Doğalgaz" />
        </div>

        {/* Boolean özellikler */}
        <div>
          <p className="text-sm font-medium text-black mb-2">Özellikler</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {boolFields.map(({ name, label }) => (
              <label key={name} className="flex items-center gap-2 cursor-pointer select-none rounded-lg border border-gray-200 px-3 py-2 hover:bg-gray-50">
                <Checkbox checked={bools[name]} onCheckedChange={() => toggleBool(name)} />
                <span className="text-sm text-black">{label}</span>
              </label>
            ))}
          </div>
        </div>
      </fieldset>

      {/* Fiyat */}
      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Fiyat</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput register={register} errors={errors} label="Fiyat" name="price" type="number" placeholder="5000000" />
          <FormSelectInput label="Para Birimi" options={currencyOptions} option={selCurrency} setOption={setSelCurrency} />
        </div>
      </fieldset>

      {/* Mülk Sahibi */}
      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Mülk Sahibi Bilgileri</legend>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <TextInput register={register} errors={errors} label="Ad Soyad"     name="ownerName"  placeholder="Ahmet Yılmaz" />
          <TextInput register={register} errors={errors} label="Telefon"       name="ownerPhone" placeholder="+90 555 000 00 00" />
          <TextInput register={register} errors={errors} label="TC Kimlik No"  name="ownerNIN"   placeholder="12345678901" />
        </div>
      </fieldset>

      {/* Açıklama */}
      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Notlar</legend>
        <TextArea register={register} errors={errors} label="Mülk Açıklaması" name="description" helperText="Mülk hakkında detaylı bilgi." />
        <TextArea register={register} errors={errors} label="Dahili Notlar"   name="notes"       helperText="Yalnızca ofis için görünür." />
      </fieldset>

      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()} className="w-full sm:w-auto">
          <ArrowLeft className="mr-1 h-4 w-4" /> Geri
        </Button>
        <SubmitButton
          buttonIcon={SaveAll}
          title={isEditing ? "Güncelle" : "Mülkü Kaydet"}
          loading={loading}
          loadingTitle="Kaydediliyor..."
          className="w-full sm:w-auto"
        />
      </div>
    </form>
  );
}
