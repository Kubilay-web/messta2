"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { Send, Mail, Phone, Calendar } from "lucide-react";
import TextArea from "../FormInputs/TextAreaInput";
import PhoneInput from "../FormInputs/PhoneInput";
import FormSelectInput from "../FormInputs/FormSelectInput";
import { countries } from "../../countries";
import toast from "react-hot-toast";
import {
  AgencyContactProps,
  createAgencyContact,
} from "../../actions/contact";

const removeLeadingZero = (phoneNumber: string) => {
  const str = phoneNumber.toString();
  return str.startsWith("0") ? str.substring(1) : str;
};

const roles = [
  { label: "Ofis Sahibi / Genel Müdür", value: "owner" },
  { label: "Yönetici / Direktör", value: "manager" },
  { label: "Emlak Danışmanı / Broker", value: "agent" },
  { label: "BT / Yazılım Sorumlusu", value: "it" },
  { label: "Danışman / İş Ortağı", value: "consultant" },
  { label: "Diğer", value: "other" },
];

const mediaSources = [
  { label: "Google Arama", value: "google" },
  { label: "Sosyal Medya", value: "social_media" },
  { label: "Referans / Arkadaş", value: "referral" },
  { label: "Blog / Haber", value: "blog" },
  { label: "Fuar / Etkinlik", value: "event" },
  { label: "Diğer", value: "other" },
];

const ContactUs: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [phoneCode, setPhoneCode] = useState("");
  const initialCountry = countries.find((c) => c.countryCode === "TR");
  const [selectedCountry, setSelectedCountry] = useState<any>(initialCountry);
  const [selectedRole, setSelectedRole] = useState<any>(roles[0]);
  const [selectedMedia, setSelectedMedia] = useState<any>(mediaSources[0]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AgencyContactProps>();

  async function onSubmit(data: AgencyContactProps) {
    data.phone = `${phoneCode}${removeLeadingZero(data.phone)}`;
    data.city = selectedCountry?.label ?? data.city;
    data.role = selectedRole.value;
    data.media = selectedMedia.value;
    data.agentCount = Number(data.agentCount);

    try {
      setLoading(true);
      await createAgencyContact(data);
      toast.success("Talebiniz başarıyla iletildi! En kısa sürede size ulaşacağız.");
      reset();
    } catch (error: any) {
      toast.error(error?.message ?? "Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Form */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow">
            <h3 className="text-2xl text-center font-semibold mb-2">
              Emlak ofisinizi bize tanıtın
            </h3>
            <p className="text-muted-foreground text-sm text-center px-4 py-2 mb-6 max-w-xl mx-auto">
              Formu doldurun, 24 saat içinde sizi arayarak ihtiyaçlarınıza özel
              bir demo planlayalım.
            </p>

            <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
              {/* Ad Soyad */}
              <TextInput
                label="Ad Soyad"
                register={register}
                name="fullName"
                errors={errors}
                placeholder="Örn. Ahmet Yılmaz"
              />

              {/* E-posta & Telefon */}
              <div className="grid md:grid-cols-2 gap-4">
                <TextInput
                  label="E-posta Adresi"
                  register={register}
                  name="email"
                  type="email"
                  errors={errors}
                  placeholder="ahmet@emlakofisi.com"
                />
                <PhoneInput
                  register={register}
                  errors={errors}
                  label="Telefon Numarası"
                  name="phone"
                  toolTipText="Ülke kodunu seçip numaranızı girin"
                  placeholder="5XX XXX XX XX"
                  setPhoneCode={setPhoneCode}
                />
              </div>

              {/* Ofis Adı & Şehir */}
              <div className="grid md:grid-cols-2 gap-4">
                <TextInput
                  label="Ofis / Firma Adı"
                  register={register}
                  name="agencyName"
                  errors={errors}
                  placeholder="Örn. Yıldız Gayrimenkul"
                />
                <FormSelectInput
                  label="Şehir / Ülke"
                  options={countries}
                  option={selectedCountry}
                  setOption={setSelectedCountry}
                />
              </div>

              {/* Web Sitesi & Danışman Sayısı */}
              <div className="grid md:grid-cols-2 gap-4">
                <TextInput
                  label="Ofis Web Sitesi / Sosyal Medya"
                  register={register}
                  name="agencyWebsite"
                  errors={errors}
                  placeholder="https://yildizgayrimenkul.com"
                />
                <TextInput
                  label="Danışman Sayısı"
                  register={register}
                  name="agentCount"
                  type="number"
                  errors={errors}
                  placeholder="Örn. 15"
                />
              </div>

              {/* Rol & Nereden Duydunuz */}
              <div className="grid md:grid-cols-2 gap-4">
                <FormSelectInput
                  label="Unvanınız / Rolünüz"
                  options={roles}
                  option={selectedRole}
                  setOption={setSelectedRole}
                />
                <FormSelectInput
                  label="EstatePro'yu nereden duydunuz?"
                  options={mediaSources}
                  option={selectedMedia}
                  setOption={setSelectedMedia}
                />
              </div>

              {/* Mesaj */}
              <TextArea
                label="Çözmek istediğiniz temel sorunlar neler?"
                register={register}
                name="message"
                errors={errors}
                helperText="İlan yönetimi, sözleşme takibi, danışman koordinasyonu gibi konuları belirtebilirsiniz."
              />

              <SubmitButton
                buttonIcon={Send}
                title="Talebi Gönder"
                loading={loading}
                loadingTitle="Gönderiliyor..."
              />
            </form>
          </div>
        </div>

        {/* Alt İletişim Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-700 text-white p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Phone className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg">Satış Ekibimizi Arayın</h3>
            </div>
            <p className="text-sm text-blue-100 mb-5">
              Sorularınızı anında yanıtlayabilmek için satış uzmanlarımız
              hafta içi 09:00 – 18:00 arası hizmetinizde.
            </p>
            <a
              href="tel:+902120000000"
              className="inline-block bg-white text-blue-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-50 transition duration-300"
            >
              Hemen Ara
            </a>
          </div>

          <div className="bg-emerald-600 text-white p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg">E-posta Gönderin</h3>
            </div>
            <p className="text-sm text-emerald-100 mb-5">
              Detaylı sorularınızı e-posta ile iletebilirsiniz. En geç 4 saat
              içinde geri dönüş sağlıyoruz.
            </p>
            <a
              href="mailto:satis@estatepro.com"
              className="inline-block bg-white text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-emerald-50 transition duration-300"
            >
              E-posta Gönder
            </a>
          </div>

          <div className="bg-amber-500 text-white p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Calendar className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg">Demo Randevusu Alın</h3>
            </div>
            <p className="text-sm text-amber-100 mb-5">
              Takvimimizden uygun bir zaman seçerek canlı demo seansı
              planlayabilirsiniz.
            </p>
            <button className="bg-white text-amber-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-amber-50 transition duration-300">
              Randevu Al
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
