"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { SaveAll, ArrowLeft } from "lucide-react";

import TextInput from "../../../FormInputs/TextInput";
import TextArea from "../../../FormInputs/TextAreaInput";
import SubmitButton from "../../../FormInputs/SubmitButton";
import { Button } from "../../../ui/button";
import FormSelectInput from "../../../FormInputs/FormSelectInput";
import ImageInput from "../../../FormInputs/ImageInput";
import { Checkbox } from "../../../ui/checkbox";
import { Label } from "../../../ui/label";

import {
  ClientProps,
  createPropertyClient,
  updatePropertyClient,
} from "../../../../actions/clients";
import { PropertyClient } from "../../../../types/types";

const titleOptions    = [
  { label: "Bay",   value: "Bay"   },
  { label: "Bayan", value: "Bayan" },
];
const genderOptions   = [
  { label: "Erkek", value: "MALE"   },
  { label: "Kadın", value: "FEMALE" },
  { label: "Diğer", value: "OTHER"  },
];
const contactOptions  = [
  { label: "Telefon",   value: "phone"    },
  { label: "E-posta",   value: "email"    },
  { label: "WhatsApp",  value: "whatsapp" },
];
const currencyOptions = [
  { label: "TRY ₺", value: "TRY" },
  { label: "USD $", value: "USD" },
  { label: "EUR €", value: "EUR" },
];
const propertyTypeOptions = [
  { label: "Daire",     value: "APARTMENT" },
  { label: "Ev",        value: "HOUSE"     },
  { label: "Villa",     value: "VILLA"     },
  { label: "Ofis",      value: "OFFICE"    },
  { label: "Dükkan",    value: "SHOP"      },
  { label: "Arsa",      value: "LAND"      },
  { label: "Depo",      value: "WAREHOUSE" },
  { label: "Bina",      value: "BUILDING"  },
];

type Props = {
  agencyId: string;
  agencyName: string;
  editingId?: string;
  initialData?: Partial<PropertyClient>;
};

export default function ClientForm({
  agencyId,
  agencyName,
  editingId,
  initialData,
}: Props) {
  const router   = useRouter();
  const isEditing = !!editingId;

  const [loading,   setLoading]   = useState(false);
  const [imageUrl,  setImageUrl]  = useState(
    initialData?.imageUrl ?? "/management/images/realestate-logo.svg"
  );
  const [selectedTitle,    setSelectedTitle]    = useState<any>(
    titleOptions.find((o) => o.value === initialData?.title) ?? titleOptions[0]
  );
  const [selectedGender,   setSelectedGender]   = useState<any>(
    genderOptions.find((o) => o.value === initialData?.gender) ?? genderOptions[0]
  );
  const [selectedContact,  setSelectedContact]  = useState<any>(
    contactOptions.find((o) => o.value === initialData?.contactMethod) ?? contactOptions[0]
  );
  const [selectedCurrency, setSelectedCurrency] = useState<any>(
    currencyOptions.find((o) => o.value === initialData?.currency) ?? currencyOptions[0]
  );
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    initialData?.preferredPropertyTypes ?? []
  );

  const [isBuyer,    setIsBuyer]    = useState(initialData?.isBuyer    ?? true);
  const [isSeller,   setIsSeller]   = useState(initialData?.isSeller   ?? false);
  const [isTenant,   setIsTenant]   = useState(initialData?.isTenant   ?? false);
  const [isLandlord, setIsLandlord] = useState(initialData?.isLandlord ?? false);

  const { register, handleSubmit, reset, formState: { errors } } =
    useForm<ClientProps>({
      defaultValues: {
        agencyId,
        agencyName,
        currency: initialData?.currency ?? "TRY",
        ...initialData,
        dob: initialData?.dob
          ? new Date(initialData.dob).toISOString().split("T")[0]
          : "",
        preferredCities: Array.isArray(initialData?.preferredCities)
          ? initialData.preferredCities.join(", ")
          : (initialData?.preferredCities ?? ""),
        minBudget: initialData?.minBudget ?? undefined,
        maxBudget: initialData?.maxBudget ?? undefined,
      },
    });

  function toggleType(val: string) {
    setSelectedTypes((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  }

  async function onSubmit(data: ClientProps) {
    data.imageUrl               = imageUrl;
    data.title                  = selectedTitle.value;
    data.gender                 = selectedGender.value;
    data.contactMethod          = selectedContact.value;
    data.currency               = selectedCurrency.value;
    data.preferredPropertyTypes = selectedTypes;
    data.isBuyer                = isBuyer;
    data.isSeller               = isSeller;
    data.isTenant               = isTenant;
    data.isLandlord             = isLandlord;
    data.minBudget              = data.minBudget ? parseFloat(String(data.minBudget)) : undefined;
    data.maxBudget              = data.maxBudget ? parseFloat(String(data.maxBudget)) : undefined;
    data.preferredCities        = typeof data.preferredCities === "string"
      ? (data.preferredCities as string).split(",").map((c) => c.trim()).filter(Boolean)
      : data.preferredCities;

    try {
      setLoading(true);
      if (isEditing) {
        await updatePropertyClient(editingId!, data);
        toast.success("Müşteri güncellendi!");
        router.push("/estate/dashboard/users/clients");
      } else {
        await createPropertyClient(data);
        toast.success("Müşteri oluşturuldu!");
        reset();
        router.push("/estate/dashboard/users/clients");
      }
    } catch (err: any) {
      toast.error(err?.message ?? "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-extrabold tracking-tight">
          {isEditing ? "Müşteriyi Düzenle" : "Yeni Müşteri Ekle"}
        </h2>
      </div>

      {/* Kişisel Bilgiler */}
      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-gray-600">Kişisel Bilgiler</legend>

        <div className="grid sm:grid-cols-3 gap-4">
          <FormSelectInput label="Ünvan"   options={titleOptions}  option={selectedTitle}  setOption={setSelectedTitle} />
          <TextInput register={register} errors={errors} label="Ad"    name="firstName" placeholder="Ahmet" />
          <TextInput register={register} errors={errors} label="Soyad" name="lastName"  placeholder="Yılmaz" />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <FormSelectInput label="Cinsiyet"        options={genderOptions}  option={selectedGender}  setOption={setSelectedGender} />
          <TextInput register={register} errors={errors} label="Doğum Tarihi" name="dob" type="date" placeholder="1985-06-15" />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <TextInput register={register} errors={errors} label="Uyruk"        name="nationality" placeholder="Türk" />
          <TextInput register={register} errors={errors} label="TC Kimlik No" name="NIN"         placeholder="12345678901" />
        </div>
      </fieldset>

      {/* İletişim */}
      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-gray-600">İletişim</legend>

        <div className="grid sm:grid-cols-2 gap-4">
          <TextInput register={register} errors={errors} label="E-posta" name="email" type="email" placeholder="ahmet@example.com" />
          <TextInput register={register} errors={errors} label="Telefon" name="phone" placeholder="+90 555 000 00 00" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <TextInput register={register} errors={errors} label="WhatsApp"   name="whatsappNo" placeholder="+90 555 000 00 00" />
          <FormSelectInput label="Tercih Edilen İletişim" options={contactOptions} option={selectedContact} setOption={setSelectedContact} />
        </div>
        <TextInput register={register} errors={errors} label="Adres" name="address" placeholder="Mahalle, Cadde, Şehir" />
        <TextInput register={register} errors={errors} label="Meslek" name="occupation" placeholder="Ör. Mühendis" />
      </fieldset>

      {/* Müşteri Tipi */}
      <fieldset className="border rounded-lg p-4 space-y-3">
        <legend className="text-sm font-semibold px-1 text-gray-600">Müşteri Tipi</legend>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Alıcı",         checked: isBuyer,    set: setIsBuyer    },
            { label: "Satıcı",        checked: isSeller,   set: setIsSeller   },
            { label: "Kiracı",        checked: isTenant,   set: setIsTenant   },
            { label: "Kiraya Veren",  checked: isLandlord, set: setIsLandlord },
          ].map(({ label, checked, set }) => (
            <label key={label} className="flex items-center gap-2 cursor-pointer select-none">
              <Checkbox checked={checked} onCheckedChange={(v) => set(!!v)} />
              <span className="text-sm">{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Bütçe & Tercihler */}
      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-gray-600">Bütçe & Tercihler</legend>

        <div className="grid sm:grid-cols-3 gap-4">
          <TextInput register={register} errors={errors} label="Min. Bütçe" name="minBudget" type="number" placeholder="500000" />
          <TextInput register={register} errors={errors} label="Max. Bütçe" name="maxBudget" type="number" placeholder="2000000" />
          <FormSelectInput label="Para Birimi" options={currencyOptions} option={selectedCurrency} setOption={setSelectedCurrency} />
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">Tercih Edilen Mülk Tipleri</Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {propertyTypeOptions.map(({ label, value }) => (
              <label key={value} className="flex items-center gap-2 cursor-pointer select-none">
                <Checkbox
                  checked={selectedTypes.includes(value)}
                  onCheckedChange={() => toggleType(value)}
                />
                <span className="text-sm">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <TextInput
          register={register} errors={errors}
          label="Tercih Edilen Şehirler (virgülle ayırın)"
          name="preferredCities"
          placeholder="İstanbul, Ankara, İzmir"
        />
      </fieldset>

      {/* Notlar & Logo */}
      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-gray-600">Ek Bilgiler</legend>
        <TextArea register={register} errors={errors} label="Notlar" name="notes" helperText="Özel istekler, tercihler veya hatırlatıcı notlar." />
        <ImageInput title="Profil Fotoğrafı" imageUrl={imageUrl} setImageUrl={setImageUrl} className="object-cover" size="sm" />
      </fieldset>

      {/* Şifre */}
      {!isEditing && (
        <fieldset className="border rounded-lg p-4">
          <legend className="text-sm font-semibold px-1 text-gray-600">Giriş Bilgileri</legend>
          <TextInput register={register} errors={errors} label="Şifre" name="password" type="password" placeholder="••••••••" />
        </fieldset>
      )}

      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="w-full sm:w-auto"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Geri
        </Button>
        <SubmitButton
          buttonIcon={SaveAll}
          title={isEditing ? "Güncelle" : "Müşteri Kaydet"}
          loading={loading}
          loadingTitle="Kaydediliyor..."
          className="w-full sm:w-auto"
        />
      </div>
    </form>
  );
}
