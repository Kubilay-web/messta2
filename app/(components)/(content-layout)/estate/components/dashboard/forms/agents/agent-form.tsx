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

import { AgentProps, createAgent, updateAgent } from "../../../../actions/agents";
import { Agent } from "../../../../types/types";

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

type Props = {
  agencyId:   string;
  agencyName: string;
  departments: { id: string; name: string }[];
  editingId?: string;
  initialData?: Partial<Agent>;
};

export default function AgentForm({
  agencyId,
  agencyName,
  departments,
  editingId,
  initialData,
}: Props) {
  const router    = useRouter();
  const isEditing = !!editingId;

  const deptOptions = departments.map((d) => ({ label: d.name, value: d.id }));
  const initDept    = deptOptions.find((o) => o.value === initialData?.departmentId)
    ?? deptOptions[0]
    ?? { label: "", value: "" };

  const [loading,     setLoading]     = useState(false);
  const [imageUrl,    setImageUrl]    = useState(initialData?.imageUrl ?? "/management/images/realestate-logo.svg");
  const initLinks = (initialData?.socialLinks as any) ?? {};
  const [socialLinks, setSocialLinks] = useState({
    linkedin:  initLinks.linkedin  ?? "",
    twitter:   initLinks.twitter   ?? "",
    instagram: initLinks.instagram ?? "",
    facebook:  initLinks.facebook  ?? "",
    website:   initLinks.website   ?? "",
  });
  const [selTitle,    setSelTitle]    = useState<any>(titleOptions.find((o) => o.value === initialData?.title) ?? titleOptions[0]);
  const [selGender,   setSelGender]   = useState<any>(genderOptions.find((o) => o.value === initialData?.gender) ?? genderOptions[0]);
  const [selContact,  setSelContact]  = useState<any>(contactOptions.find((o) => o.value === initialData?.contactMethod) ?? contactOptions[0]);
  const [selDept,     setSelDept]     = useState<any>(initDept);
  const [selTypes,    setSelTypes]    = useState<string[]>(initialData?.specializationTypes ?? []);

  const { register, handleSubmit, reset, formState: { errors } } =
    useForm<AgentProps>({
      defaultValues: {
        agencyId,
        agencyName,
        commissionRate: initialData?.commissionRate ?? 2.5,
        ...initialData,
        dateOfBirth:  initialData?.dateOfBirth  ? new Date(initialData.dateOfBirth).toISOString().split("T")[0]  : "",
        dateOfJoining: initialData?.dateOfJoining ? new Date(initialData.dateOfJoining).toISOString().split("T")[0] : "",
        specializationCities: Array.isArray(initialData?.specializationCities)
          ? initialData.specializationCities.join(", ")
          : (initialData?.specializationCities ?? ""),
      },
    });

  function toggleType(val: string) {
    setSelTypes((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  }

  async function onSubmit(data: AgentProps) {
    data.imageUrl            = imageUrl;
    data.title               = selTitle.value;
    data.gender              = selGender.value;
    data.contactMethod       = selContact.value;
    data.departmentId        = selDept.value;
    data.departmentName      = selDept.label;
    data.specializationTypes = selTypes;
    data.experience          = data.experience ? Number(data.experience) : undefined;
    data.commissionRate      = data.commissionRate ? parseFloat(String(data.commissionRate)) : undefined;
    data.specializationCities = typeof data.specializationCities === "string"
      ? (data.specializationCities as any).split(",").map((c: string) => c.trim()).filter(Boolean)
      : data.specializationCities;
    data.socialLinks = Object.fromEntries(
      Object.entries(socialLinks).filter(([, v]) => v.trim())
    ) as any;

    try {
      setLoading(true);
      if (isEditing) {
        await updateAgent(editingId!, data);
        toast.success("Danışman güncellendi!");
      } else {
        await createAgent(data);
        toast.success("Danışman oluşturuldu!");
        reset();
      }
      router.push("/estate/dashboard/agents");
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
          {isEditing ? "Danışmanı Düzenle" : "Yeni Danışman Ekle"}
        </h2>
      </div>

      {/* Kişisel Bilgiler */}
      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Kişisel Bilgiler</legend>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormSelectInput label="Ünvan"    options={titleOptions}  option={selTitle}  setOption={setSelTitle} />
          <TextInput register={register} errors={errors} label="Ad"    name="firstName" placeholder="Ahmet" />
          <TextInput register={register} errors={errors} label="Soyad" name="lastName"  placeholder="Yılmaz" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormSelectInput label="Cinsiyet" options={genderOptions} option={selGender} setOption={setSelGender} />
          <TextInput register={register} errors={errors} label="Doğum Tarihi" name="dateOfBirth" type="date" placeholder="1990-01-15" />
          <TextInput register={register} errors={errors} label="TC Kimlik No" name="NIN" placeholder="12345678901" />
        </div>
        <TextInput register={register} errors={errors} label="Uyruk / Milliyet" name="qualification" placeholder="Ör. Türk · Lisans" />
      </fieldset>

      {/* İletişim */}
      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">İletişim</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput register={register} errors={errors} label="E-posta" name="email" type="email" placeholder="ahmet@emlak.com" />
          <TextInput register={register} errors={errors} label="Telefon" name="phone" placeholder="+90 555 000 00 00" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput register={register} errors={errors} label="WhatsApp" name="whatsappNo" placeholder="+90 555 000 00 00" />
          <FormSelectInput label="Tercih Edilen İletişim" options={contactOptions} option={selContact} setOption={setSelContact} />
        </div>
      </fieldset>

      {/* Mesleki Bilgiler */}
      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Mesleki Bilgiler</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput register={register} errors={errors} label="Çalışan No" name="employeeId" placeholder="EMP-001" />
          <TextInput register={register} errors={errors} label="İşe Başlama Tarihi" name="dateOfJoining" type="date" placeholder="2024-01-01" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput register={register} errors={errors} label="Unvan / Pozisyon" name="designation" placeholder="Kıdemli Danışman" />
          <FormSelectInput label="Departman" options={deptOptions} option={selDept} setOption={setSelDept} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <TextInput register={register} errors={errors} label="Lisans / Ruhsat No" name="licenseNo" placeholder="TR-2024-001" />
          <TextInput register={register} errors={errors} label="Deneyim (yıl)" name="experience" type="number" placeholder="5" />
          <TextInput register={register} errors={errors} label="Komisyon Oranı (%)" name="commissionRate" type="number" placeholder="2.5" />
        </div>
      </fieldset>

      {/* Uzmanlık */}
      <fieldset className="border rounded-lg p-4 space-y-4">
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
        <TextInput
          register={register} errors={errors}
          label="Uzman Olduğu Şehirler (virgülle ayırın)"
          name="specializationCities"
          placeholder="İstanbul, Ankara, İzmir"
        />
      </fieldset>

      {/* Bio & Beceriler */}
      <fieldset className="border rounded-lg p-4 space-y-4">
        <legend className="text-sm font-semibold px-1 text-black">Hakkında</legend>
        <TextInput register={register} errors={errors} label="Beceriler (virgülle)" name="skills" placeholder="Satış, Müzakere, CRM" />
        <TextArea register={register} errors={errors} label="Biyografi" name="bio" helperText="Danışmanın kısa tanıtımı." />
      </fieldset>

      {/* Sosyal Medya */}
      <fieldset className="border rounded-lg p-4 space-y-3">
        <legend className="text-sm font-semibold px-1 text-black">Sosyal Medya & Web</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(["linkedin","twitter","instagram","facebook","website"] as const).map((key) => (
            <div key={key} className="space-y-1">
              <label className="block text-sm font-medium text-gray-900 capitalize">{key === "website" ? "Web Sitesi" : key.charAt(0).toUpperCase() + key.slice(1)}</label>
              <input
                type="url"
                value={socialLinks[key]}
                onChange={(e) => setSocialLinks((p) => ({ ...p, [key]: e.target.value }))}
                placeholder={key === "website" ? "https://..." : `https://${key}.com/kullanici`}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          ))}
        </div>
      </fieldset>

      {/* Fotoğraf */}
      <fieldset className="border rounded-lg p-4">
        <legend className="text-sm font-semibold px-1 text-black">Profil Fotoğrafı</legend>
        <ImageInput title="Profil Fotoğrafı" imageUrl={imageUrl} setImageUrl={setImageUrl} className="object-cover" size="sm" />
      </fieldset>

      {/* Şifre (sadece oluşturma) */}
      {!isEditing && (
        <fieldset className="border rounded-lg p-4">
          <legend className="text-sm font-semibold px-1 text-black">Giriş Bilgileri</legend>
          <TextInput register={register} errors={errors} label="Şifre" name="password" type="password" placeholder="••••••••" />
        </fieldset>
      )}

      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()} className="w-full sm:w-auto">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Geri
        </Button>
        <SubmitButton
          buttonIcon={SaveAll}
          title={isEditing ? "Güncelle" : "Danışman Kaydet"}
          loading={loading}
          loadingTitle="Kaydediliyor..."
          className="w-full sm:w-auto"
        />
      </div>
    </form>
  );
}
