"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Check, Search, UserCheck, ChevronRight, SaveAll, ArrowLeft } from "lucide-react";
import Image from "next/image";

import { Input } from "../../../ui/input";
import { Badge } from "../../../ui/badge";
import { Checkbox } from "../../../ui/checkbox";
import { ScrollArea } from "../../../ui/scroll-area";
import { Button } from "../../../ui/button";
import { Separator } from "../../../ui/separator";
import SubmitButton from "../../../FormInputs/SubmitButton";
import TextInput from "../../../FormInputs/TextInput";
import TextArea from "../../../FormInputs/TextAreaInput";
import FormSelectInput from "../../../FormInputs/FormSelectInput";
import ImageInput from "../../../FormInputs/ImageInput";

import {
  AssignClientProps,
  assignUserAsClient,
} from "../../../../actions/clients";

/* ── Sabit seçenekler ──────────────────────────────────────────────────── */
const titleOptions = [
  { label: "Bay",   value: "Bay"   },
  { label: "Bayan", value: "Bayan" },
];
const genderOptions = [
  { label: "Erkek", value: "MALE"   },
  { label: "Kadın", value: "FEMALE" },
  { label: "Diğer", value: "OTHER"  },
];
const contactOptions = [
  { label: "Telefon",  value: "phone"    },
  { label: "E-posta",  value: "email"    },
  { label: "WhatsApp", value: "whatsapp" },
];
const currencyOptions = [
  { label: "TRY ₺", value: "TRY" },
  { label: "USD $", value: "USD" },
  { label: "EUR €", value: "EUR" },
];
const propertyTypeOptions = [
  { label: "Daire",  value: "APARTMENT" },
  { label: "Ev",     value: "HOUSE"     },
  { label: "Villa",  value: "VILLA"     },
  { label: "Ofis",   value: "OFFICE"    },
  { label: "Dükkan", value: "SHOP"      },
  { label: "Arsa",   value: "LAND"      },
  { label: "Depo",   value: "WAREHOUSE" },
  { label: "Bina",   value: "BUILDING"  },
];

/* ── Tipler ─────────────────────────────────────────────────────────────── */
export type AvailableUser = {
  id:         string;
  name:       string | null;
  email:      string | null;
  phone:      string | null;
  image:      string | null;
  firstName:  string | null;
  lastName:   string | null;
  agencyId:   string | null;
  agencyName: string | null;
};

type Props = {
  users:      AvailableUser[];
  agencyId:   string;
  agencyName: string;
};

function displayName(u: AvailableUser) {
  const full = `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim();
  return u.name || full || "—";
}

/* ── Bileşen ────────────────────────────────────────────────────────────── */
export default function AssignClientForm({ users, agencyId, agencyName }: Props) {
  const router = useRouter();

  const [step,         setStep]         = useState<1 | 2>(1);
  const [query,        setQuery]        = useState("");
  const [selectedUser, setSelectedUser] = useState<AvailableUser | null>(null);
  const [loading,      setLoading]      = useState(false);

  const [imageUrl,    setImageUrl]    = useState<string>("/management/images/realestate-logo.svg");
  const [selTitle,    setSelTitle]    = useState<any>(titleOptions[0]);
  const [selGender,   setSelGender]   = useState<any>(genderOptions[0]);
  const [selContact,  setSelContact]  = useState<any>(contactOptions[0]);
  const [selCurrency, setSelCurrency] = useState<any>(currencyOptions[0]);
  const [selTypes,    setSelTypes]    = useState<string[]>([]);
  const [isBuyer,    setIsBuyer]    = useState(true);
  const [isSeller,   setIsSeller]   = useState(false);
  const [isTenant,   setIsTenant]   = useState(false);
  const [isLandlord, setIsLandlord] = useState(false);

  const { register, handleSubmit, formState: { errors } } =
    useForm<AssignClientProps>({
      defaultValues: { agencyId, agencyName, currency: "TRY" },
    });

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.phone?.includes(q)
    );
  }, [query, users]);

  function toggleType(val: string) {
    setSelTypes((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  }

  function goToStep2() {
    if (!selectedUser) {
      toast.error("Lütfen bir kullanıcı seçin.");
      return;
    }
    setImageUrl(selectedUser.image || "/management/images/realestate-logo.svg");
    setStep(2);
  }

  async function onSubmit(data: AssignClientProps) {
    if (!selectedUser) return;
    data.userId                 = selectedUser.id;
    data.agencyId               = agencyId;
    data.agencyName             = agencyName;
    data.title                  = selTitle.value;
    data.gender                 = selGender.value;
    data.contactMethod          = selContact.value;
    data.currency               = selCurrency.value;
    data.preferredPropertyTypes = selTypes;
    data.isBuyer                = isBuyer;
    data.isSeller               = isSeller;
    data.isTenant               = isTenant;
    data.isLandlord             = isLandlord;
    data.imageUrl               = imageUrl;
    data.minBudget              = data.minBudget ? parseFloat(String(data.minBudget)) : undefined;
    data.maxBudget              = data.maxBudget ? parseFloat(String(data.maxBudget)) : undefined;
    data.preferredCities        = typeof data.preferredCities === "string"
      ? (data.preferredCities as string).split(",").map((c) => c.trim()).filter(Boolean)
      : data.preferredCities;

    try {
      setLoading(true);
      await assignUserAsClient(data);
      toast.success("Kullanıcıya müşteri rolü atandı!");
      router.push("/estate/dashboard/users/clients");
    } catch (err: any) {
      toast.error(err?.message ?? "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  /* ────────────────────────────────────────────────────────────────────────
     ADIM 1 — Kullanıcı Seç
  ──────────────────────────────────────────────────────────────────────── */
  if (step === 1) {
    return (
      <div className="flex flex-col gap-4 sm:gap-5">

        {/* Başlık */}
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-black">
            Müşteri Ata
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-black">
            Listeden bir kullanıcı seçin ve müşteri rolü atayın.
          </p>
        </div>

        {/* Arama */}
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black pointer-events-none" />
          <Input
            className="pl-9 w-full text-black placeholder:text-black"
            placeholder="Ad, e-posta veya telefon..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Kullanıcı listesi */}
        <ScrollArea className="h-[340px] sm:h-[420px] w-full rounded-xl border border-gray-200 bg-white">
          {filtered.length === 0 ? (
            <p className="py-10 text-center text-sm text-black">
              Kullanıcı bulunamadı.
            </p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {filtered.map((u) => {
                const isSelected = selectedUser?.id === u.id;
                const name = displayName(u);
                return (
                  <li
                    key={u.id}
                    onClick={() => setSelectedUser(u)}
                    className={`flex items-center gap-3 px-3 sm:px-4 py-3 cursor-pointer transition-colors border-l-4
                      ${isSelected
                        ? "bg-blue-50 border-blue-500"
                        : "hover:bg-gray-50 border-transparent"
                      }`}
                  >
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <Image
                        src={u.image || "/management/images/realestate-logo.svg"}
                        alt={name}
                        width={40} height={40}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover"
                      />
                      {isSelected && (
                        <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600">
                          <Check className="h-2.5 w-2.5 text-white" />
                        </span>
                      )}
                    </div>

                    {/* Bilgiler */}
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-sm text-black truncate">{name}</p>
                      <p className="text-xs text-black truncate">{u.email ?? "—"}</p>
                      {u.phone && (
                        <p className="text-xs text-black">{u.phone}</p>
                      )}
                    </div>

                    {/* Ofis badge — sadece sm+ */}
                    {u.agencyName && (
                      <Badge
                        variant="outline"
                        className="hidden sm:inline-flex text-xs text-black shrink-0"
                      >
                        {u.agencyName}
                      </Badge>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </ScrollArea>

        {/* Seçili kullanıcı özeti + Devam butonu */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
          {selectedUser ? (
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <UserCheck className="h-4 w-4 text-blue-600 shrink-0" />
              <p className="text-sm font-medium text-black truncate">
                {displayName(selectedUser)}
              </p>
              <Badge variant="secondary" className="text-xs text-black shrink-0">
                seçildi
              </Badge>
            </div>
          ) : (
            <p className="text-sm text-black flex-1">Henüz kullanıcı seçilmedi.</p>
          )}
          <Button
            onClick={goToStep2}
            disabled={!selectedUser}
            className="w-full sm:w-auto shrink-0"
          >
            Devam Et
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────────────
     ADIM 2 — Ek Bilgileri Doldur
  ──────────────────────────────────────────────────────────────────────── */
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 sm:gap-6">

      {/* Başlık + seçili kullanıcı özeti */}
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-black">
          Müşteri Bilgilerini Tamamla
        </h2>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-black">
          <UserCheck className="h-4 w-4 text-blue-600 shrink-0" />
          <span className="font-semibold truncate max-w-[200px] sm:max-w-none">
            {displayName(selectedUser!)}
          </span>
          <span className="text-black hidden sm:inline">·</span>
          <span className="text-black truncate max-w-[180px] sm:max-w-none">
            {selectedUser?.email}
          </span>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="text-xs text-blue-500 hover:underline shrink-0"
          >
            Değiştir
          </button>
        </div>
      </div>

      <Separator />

      {/* ── Kişisel Bilgiler ── */}
      <fieldset className="border rounded-lg p-3 sm:p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Kişisel Bilgiler</legend>

        {/* Ünvan / Cinsiyet / Doğum */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <FormSelectInput
            label="Ünvan"
            options={titleOptions}
            option={selTitle}
            setOption={setSelTitle}
          />
          <FormSelectInput
            label="Cinsiyet"
            options={genderOptions}
            option={selGender}
            setOption={setSelGender}
          />
          <TextInput
            register={register} errors={errors}
            label="Doğum Tarihi"
            name="dob"
            type="date"
            placeholder="1985-06-15"
          />
        </div>

        {/* Uyruk / TC */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <TextInput
            register={register} errors={errors}
            label="Uyruk"
            name="nationality"
            placeholder="Türk"
          />
          <TextInput
            register={register} errors={errors}
            label="TC Kimlik No"
            name="NIN"
            placeholder="12345678901"
          />
        </div>
      </fieldset>

      {/* ── İletişim & Adres ── */}
      <fieldset className="border rounded-lg p-3 sm:p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">İletişim & Adres</legend>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <TextInput
            register={register} errors={errors}
            label="WhatsApp"
            name="whatsappNo"
            placeholder="+90 555 000 00 00"
          />
          <FormSelectInput
            label="Tercih Edilen İletişim"
            options={contactOptions}
            option={selContact}
            setOption={setSelContact}
          />
        </div>

        <TextInput
          register={register} errors={errors}
          label="Adres"
          name="address"
          placeholder="Mahalle, Cadde, Şehir"
        />
        <TextInput
          register={register} errors={errors}
          label="Meslek"
          name="occupation"
          placeholder="Ör. Mühendis"
        />
      </fieldset>

      {/* ── Müşteri Tipi ── */}
      <fieldset className="border rounded-lg p-3 sm:p-4 space-y-3">
        <legend className="text-sm font-semibold px-1 text-black">Müşteri Tipi</legend>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Alıcı",        checked: isBuyer,    set: setIsBuyer    },
            { label: "Satıcı",       checked: isSeller,   set: setIsSeller   },
            { label: "Kiracı",       checked: isTenant,   set: setIsTenant   },
            { label: "Kiraya Veren", checked: isLandlord, set: setIsLandlord },
          ].map(({ label, checked, set }) => (
            <label
              key={label}
              className="flex items-center gap-2 cursor-pointer select-none rounded-lg border border-gray-200 px-3 py-2.5 hover:bg-gray-50 transition-colors"
            >
              <Checkbox checked={checked} onCheckedChange={(v) => set(!!v)} />
              <span className="text-sm text-black">{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* ── Bütçe & Tercihler ── */}
      <fieldset className="border rounded-lg p-3 sm:p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Bütçe & Tercihler</legend>

        {/* Bütçe */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <TextInput
            register={register} errors={errors}
            label="Min. Bütçe"
            name="minBudget"
            type="number"
            placeholder="500000"
          />
          <TextInput
            register={register} errors={errors}
            label="Max. Bütçe"
            name="maxBudget"
            type="number"
            placeholder="2000000"
          />
          <FormSelectInput
            label="Para Birimi"
            options={currencyOptions}
            option={selCurrency}
            setOption={setSelCurrency}
          />
        </div>

        {/* Mülk tipleri */}
        <div>
          <p className="text-sm font-medium text-black mb-2">
            Tercih Edilen Mülk Tipleri
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {propertyTypeOptions.map(({ label, value }) => (
              <label
                key={value}
                className="flex items-center gap-2 cursor-pointer select-none rounded-lg border border-gray-200 px-3 py-2 hover:bg-gray-50 transition-colors"
              >
                <Checkbox
                  checked={selTypes.includes(value)}
                  onCheckedChange={() => toggleType(value)}
                />
                <span className="text-sm text-black">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Şehirler */}
        <TextInput
          register={register} errors={errors}
          label="Tercih Edilen Şehirler (virgülle ayırın)"
          name="preferredCities"
          placeholder="İstanbul, Ankara, İzmir"
        />
      </fieldset>

      {/* ── Profil Fotoğrafı ── */}
      <fieldset className="border rounded-lg p-3 sm:p-4 space-y-3">
        <legend className="text-sm font-semibold px-1 text-black">Profil Fotoğrafı</legend>
        <ImageInput
          title="Profil Fotoğrafı"
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          className="object-cover rounded-full aspect-square w-24 h-24 mx-auto"
          size="sm"
        />
      </fieldset>

      {/* ── Notlar ── */}
      <fieldset className="border rounded-lg p-3 sm:p-4">
        <legend className="text-sm font-semibold px-1 text-black">Notlar</legend>
        <TextArea
          register={register} errors={errors}
          label="Ek Notlar"
          name="notes"
          helperText="Özel istekler, tercihler veya hatırlatıcı notlar."
        />
      </fieldset>

      {/* ── Butonlar ── */}
      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => setStep(1)}
          className="w-full sm:w-auto"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Geri
        </Button>
        <SubmitButton
          buttonIcon={SaveAll}
          title="Rolü Ata & Kaydet"
          loading={loading}
          loadingTitle="Atanıyor..."
          className="w-full sm:w-auto"
        />
      </div>
    </form>
  );
}
