"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Send } from "lucide-react";
import TextInput from "../../../FormInputs/TextInput";
import PasswordInput from "../../../FormInputs/PasswordInput";
import SubmitButton from "../../../FormInputs/SubmitButton";
import { createAgencyStaff } from "../../../../actions/agency-users";

type FormData = {
  firstName: string;
  lastName:  string;
  email:     string;
  phone:     string;
  password:  string;
};

export default function AgencyAdminForm({
  agencyId,
  agencyName,
}: {
  agencyId:   string;
  agencyName: string;
}) {
  const { register, handleSubmit, reset, formState: { errors } } =
    useForm<FormData>({ defaultValues: { firstName: "", lastName: "", email: "", phone: "", password: "" } });

  const router  = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: FormData) {
    try {
      setLoading(true);
      await createAgencyStaff({
        firstName:  data.firstName,
        lastName:   data.lastName,
        email:      data.email,
        phone:      data.phone || undefined,
        password:   data.password,
        role:       "ADMIN",
        agencyId,
        agencyName,
      });
      toast.success("Ofis yöneticisi başarıyla oluşturuldu!");
      reset();
      router.push("/estate/dashboard");
    } catch (err: any) {
      toast.error(err?.message ?? "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-extrabold tracking-tight">{agencyName}</h2>
        <p className="text-muted-foreground text-sm">Bu emlak ofisi için yönetici hesabı oluşturun.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput register={register} errors={errors} label="Ad"         name="firstName" placeholder="Ahmet"        />
        <TextInput register={register} errors={errors} label="Soyad"      name="lastName"  placeholder="Yılmaz"       />
        <TextInput register={register} errors={errors} label="E-posta"    name="email"     placeholder="admin@ofis.com" />
        <TextInput register={register} errors={errors} label="Telefon"    name="phone"     placeholder="+90 555 000 00 00" />
      </div>

      <PasswordInput register={register} errors={errors} label="Şifre" name="password" />

      <SubmitButton
        buttonIcon={Send}
        title="Yönetici Oluştur"
        loading={loading}
        loadingTitle="Oluşturuluyor…"
        className="w-full"
      />
    </form>
  );
}
