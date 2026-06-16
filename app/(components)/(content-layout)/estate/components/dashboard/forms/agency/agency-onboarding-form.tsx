"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SaveAll } from "lucide-react";
import toast from "react-hot-toast";

import TextInput from "../../../FormInputs/TextInput";
import ImageInput from "../../../FormInputs/ImageInput";
import SubmitButton from "../../../FormInputs/SubmitButton";
import { AgencyProps, createAgency } from "../../../../actions/agencies";

export default function AgencyOnboardingForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AgencyProps>({
    defaultValues: {
      name: "",
      primaryEmail: "",
      phone: "",
      address: "",
      city: "",
      taxNumber: "",
      licenseNo: "",
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("/management/images/realestate-logo.svg");

  async function onSubmit(data: AgencyProps) {
    try {
      setLoading(true);
      data.logo = imageUrl;
      const agency = await createAgency(data);
      toast.success("Ofis başarıyla oluşturuldu!");
      reset();
      router.push(
        `/estate/agency-admin/${agency.id}?name=${agency.name}`
      );
    } catch (error: any) {
      toast.error(error?.message ?? "Ofis oluşturulamadı. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white rounded-lg shadow-md"
    >
      {/* Başlık */}
      <div className="text-center md:text-left mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          EstatePro'ya Hoş Geldiniz
        </h2>
        <p className="mt-2 text-gray-600">
          Emlak ofisinizin profilini tamamlayarak sistemi kullanmaya başlayın.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Ofis Adı */}
        <TextInput
          register={register}
          errors={errors}
          label="Ofis / Firma Adı"
          name="name"
          placeholder="Örn. Yıldız Gayrimenkul"
        />

        {/* E-posta & Telefon */}
        <div className="grid sm:grid-cols-2 gap-4">
          <TextInput
            register={register}
            errors={errors}
            label="Birincil E-posta"
            name="primaryEmail"
            type="email"
            placeholder="info@emlakofisi.com"
          />
          <TextInput
            register={register}
            errors={errors}
            label="Telefon"
            name="phone"
            placeholder="+90 212 000 00 00"
          />
        </div>

        {/* Şehir & Adres */}
        <div className="grid sm:grid-cols-2 gap-4">
          <TextInput
            register={register}
            errors={errors}
            label="Şehir"
            name="city"
            placeholder="İstanbul"
          />
          <TextInput
            register={register}
            errors={errors}
            label="Ofis Adresi"
            name="address"
            placeholder="Levent Mah. Büyükdere Cad. No:1"
          />
        </div>

        {/* Vergi No & Ruhsat No */}
        <div className="grid sm:grid-cols-2 gap-4">
          <TextInput
            register={register}
            errors={errors}
            label="Vergi Numarası"
            name="taxNumber"
            placeholder="1234567890"
          />
          <TextInput
            register={register}
            errors={errors}
            label="Ticaret / Ruhsat Numarası"
            name="licenseNo"
            placeholder="Örn. TR-0001-2024"
          />
        </div>

        {/* Logo */}
        <ImageInput
          title="Ofis Logosu (500 x 150 px önerilir)"
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          className="object-contain"
          size="sm"
        />
      </div>

      {/* Gönder */}
      <div className="mt-8 flex justify-center md:justify-start">
        <SubmitButton
          buttonIcon={SaveAll}
          title="Ofisi Kaydet"
          loading={loading}
          loadingTitle="Kaydediliyor..."
          className="w-full md:w-auto"
        />
      </div>
    </form>
  );
}
