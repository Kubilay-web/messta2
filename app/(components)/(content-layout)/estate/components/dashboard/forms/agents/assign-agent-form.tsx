"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Check, Search, UserCheck, ChevronRight, SaveAll, ArrowLeft } from "lucide-react";
import Image from "next/image";

import { Input }       from "../../../ui/input";
import { Badge }       from "../../../ui/badge";
import { Checkbox }    from "../../../ui/checkbox";
import { ScrollArea }  from "../../../ui/scroll-area";
import { Button }      from "../../../ui/button";
import { Separator }   from "../../../ui/separator";
import SubmitButton    from "../../../FormInputs/SubmitButton";
import TextInput       from "../../../FormInputs/TextInput";
import TextArea        from "../../../FormInputs/TextAreaInput";
import FormSelectInput from "../../../FormInputs/FormSelectInput";
import ImageInput      from "../../../FormInputs/ImageInput";

import { AssignAgentProps, assignUserAsAgent } from "../../../../actions/agents";

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
  users:       AvailableUser[];
  agencyId:    string;
  agencyName:  string;
  departments: { id: string; name: string }[];
};

function dName(u: AvailableUser) {
  const full = `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim();
  return u.name || full || "—";
}

/* ── Bileşen ────────────────────────────────────────────────────────────── */
export default function AssignAgentForm({ users, agencyId, agencyName, departments }: Props) {
  const router = useRouter();

  const [step,         setStep]         = useState<1 | 2>(1);
  const [query,        setQuery]        = useState("");
  const [selectedUser, setSelectedUser] = useState<AvailableUser | null>(null);
  const [loading,      setLoading]      = useState(false);
  const [imageUrl,     setImageUrl]     = useState("/management/images/realestate-logo.svg");

  const deptOptions = departments.map((d) => ({ label: d.name, value: d.id }));

  const [selTitle,   setSelTitle]   = useState<any>(titleOptions[0]);
  const [selGender,  setSelGender]  = useState<any>(genderOptions[0]);
  const [selContact, setSelContact] = useState<any>(contactOptions[0]);
  const [selDept,    setSelDept]    = useState<any>(deptOptions[0] ?? { label: "", value: "" });
  const [selTypes,   setSelTypes]   = useState<string[]>([]);

  const { register, handleSubmit, formState: { errors } } =
    useForm<AssignAgentProps>({
      defaultValues: { agencyId, agencyName, commissionRate: 2.5 },
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
    if (!selectedUser) { toast.error("Lütfen bir kullanıcı seçin."); return; }
    setImageUrl(selectedUser.image || "/management/images/realestate-logo.svg");
    setStep(2);
  }

  async function onSubmit(data: AssignAgentProps) {
    if (!selectedUser) return;
    data.userId               = selectedUser.id;
    data.agencyId             = agencyId;
    data.agencyName           = agencyName;
    data.imageUrl             = imageUrl;
    data.title                = selTitle.value;
    data.gender               = selGender.value;
    data.contactMethod        = selContact.value;
    data.departmentId         = selDept.value;
    data.departmentName       = selDept.label;
    data.specializationTypes  = selTypes;
    data.experience           = data.experience   ? Number(data.experience)             : undefined;
    data.commissionRate       = data.commissionRate ? parseFloat(String(data.commissionRate)) : undefined;
    data.specializationCities = typeof data.specializationCities === "string"
      ? (data.specializationCities as any).split(",").map((c: string) => c.trim()).filter(Boolean)
      : data.specializationCities;

    try {
      setLoading(true);
      await assignUserAsAgent(data);
      toast.success("Kullanıcıya danışman rolü atandı!");
      router.push("/estate/dashboard/agents");
    } catch (err: any) {
      toast.error(err?.message ?? "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  /* ── ADIM 1: Kullanıcı Seç ─────────────────────────────────────────── */
  if (step === 1) {
    return (
      <div className="flex flex-col gap-4 sm:gap-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-black">
            Danışman Ata
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-black">
            Listeden bir kullanıcı seçin ve danışman rolü atayın.
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

        {/* Liste */}
        <ScrollArea className="h-[340px] sm:h-[420px] w-full rounded-xl border border-gray-200 bg-white">
          {filtered.length === 0 ? (
            <p className="py-10 text-center text-sm text-black">Kullanıcı bulunamadı.</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {filtered.map((u) => {
                const isSelected = selectedUser?.id === u.id;
                const name = dName(u);
                return (
                  <li
                    key={u.id}
                    onClick={() => setSelectedUser(u)}
                    className={`flex items-center gap-3 px-3 sm:px-4 py-3 cursor-pointer transition-colors border-l-4
                      ${isSelected ? "bg-blue-50 border-blue-500" : "hover:bg-gray-50 border-transparent"}`}
                  >
                    <div className="relative shrink-0">
                      <Image
                        src={u.image || "/management/images/realestate-logo.svg"}
                        alt={name} width={40} height={40}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover"
                      />
                      {isSelected && (
                        <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600">
                          <Check className="h-2.5 w-2.5 text-white" />
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-sm text-black truncate">{name}</p>
                      <p className="text-xs text-black truncate">{u.email ?? "—"}</p>
                      {u.phone && <p className="text-xs text-black">{u.phone}</p>}
                    </div>
                    {u.agencyName && (
                      <Badge variant="outline" className="hidden sm:inline-flex text-xs text-black shrink-0">
                        {u.agencyName}
                      </Badge>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </ScrollArea>

        {/* Alt bar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
          {selectedUser ? (
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <UserCheck className="h-4 w-4 text-blue-600 shrink-0" />
              <p className="text-sm font-medium text-black truncate">{dName(selectedUser)}</p>
              <Badge variant="secondary" className="text-xs text-black shrink-0">seçildi</Badge>
            </div>
          ) : (
            <p className="text-sm text-black flex-1">Henüz kullanıcı seçilmedi.</p>
          )}
          <Button onClick={goToStep2} disabled={!selectedUser} className="w-full sm:w-auto shrink-0">
            Devam Et <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  /* ── ADIM 2: Ek Bilgileri Doldur ────────────────────────────────────── */
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 sm:gap-6">
      {/* Başlık */}
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-black">
          Danışman Bilgilerini Tamamla
        </h2>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-black">
          <UserCheck className="h-4 w-4 text-blue-600 shrink-0" />
          <span className="font-semibold truncate max-w-[200px] sm:max-w-none">{dName(selectedUser!)}</span>
          <span className="hidden sm:inline">·</span>
          <span className="truncate max-w-[180px] sm:max-w-none">{selectedUser?.email}</span>
          <button type="button" onClick={() => setStep(1)} className="text-xs text-blue-500 hover:underline shrink-0">
            Değiştir
          </button>
        </div>
      </div>

      <Separator />

      {/* Kişisel */}
      <fieldset className="border rounded-lg p-3 sm:p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Kişisel Bilgiler</legend>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <FormSelectInput label="Ünvan"    options={titleOptions}  option={selTitle}  setOption={setSelTitle} />
          <FormSelectInput label="Cinsiyet" options={genderOptions} option={selGender} setOption={setSelGender} />
          <TextInput register={register} errors={errors} label="Doğum Tarihi" name="dateOfBirth" type="date" placeholder="1990-01-15" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <TextInput register={register} errors={errors} label="TC Kimlik No"       name="NIN"           placeholder="12345678901" />
          <TextInput register={register} errors={errors} label="Eğitim / Nitelik"   name="qualification" placeholder="Lisans, Emlak Danışmanlığı" />
        </div>
      </fieldset>

      {/* İletişim */}
      <fieldset className="border rounded-lg p-3 sm:p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">İletişim</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <TextInput register={register} errors={errors} label="WhatsApp" name="whatsappNo" placeholder="+90 555 000 00 00" />
          <FormSelectInput label="Tercih Edilen İletişim" options={contactOptions} option={selContact} setOption={setSelContact} />
        </div>
      </fieldset>

      {/* Mesleki */}
      <fieldset className="border rounded-lg p-3 sm:p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Mesleki Bilgiler</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <TextInput register={register} errors={errors} label="Çalışan No"         name="employeeId"    placeholder="EMP-001" />
          <TextInput register={register} errors={errors} label="İşe Başlama Tarihi" name="dateOfJoining" type="date" placeholder="2024-01-01" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <TextInput register={register} errors={errors} label="Unvan / Pozisyon" name="designation" placeholder="Kıdemli Danışman" />
          <FormSelectInput label="Departman" options={deptOptions} option={selDept} setOption={setSelDept} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <TextInput register={register} errors={errors} label="Lisans / Ruhsat No"   name="licenseNo"     placeholder="TR-2024-001" />
          <TextInput register={register} errors={errors} label="Deneyim (yıl)"        name="experience"    type="number" placeholder="5" />
          <TextInput register={register} errors={errors} label="Komisyon Oranı (%)"   name="commissionRate" type="number" placeholder="2.5" />
        </div>
      </fieldset>

      {/* Uzmanlık */}
      <fieldset className="border rounded-lg p-3 sm:p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Uzmanlık Alanları</legend>
        <div>
          <p className="text-sm font-medium text-black mb-2">Mülk Tipleri</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {propertyTypeOptions.map(({ label, value }) => (
              <label key={value} className="flex items-center gap-2 cursor-pointer select-none rounded-lg border border-gray-200 px-3 py-2 hover:bg-gray-50">
                <Checkbox checked={selTypes.includes(value)} onCheckedChange={() => toggleType(value)} />
                <span className="text-sm text-black">{label}</span>
              </label>
            ))}
          </div>
        </div>
        <TextInput register={register} errors={errors}
          label="Uzman Olduğu Şehirler (virgülle ayırın)"
          name="specializationCities" placeholder="İstanbul, Ankara, İzmir"
        />
      </fieldset>

      {/* Hakkında & Fotoğraf */}
      <fieldset className="border rounded-lg p-3 sm:p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Hakkında & Fotoğraf</legend>
        <TextInput register={register} errors={errors} label="Beceriler (virgülle)" name="skills" placeholder="Satış, Müzakere, CRM" />
        <TextArea  register={register} errors={errors} label="Biyografi" name="bio" helperText="Danışmanın kısa tanıtımı." />
        <div className="space-y-1">
          <ImageInput title="Profil Fotoğrafı" imageUrl={imageUrl} setImageUrl={setImageUrl} className="object-cover" size="sm" />
        </div>
      </fieldset>

      {/* Butonlar */}
      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
        <Button type="button" variant="outline" onClick={() => setStep(1)} className="w-full sm:w-auto">
          <ArrowLeft className="mr-1 h-4 w-4" /> Geri
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
