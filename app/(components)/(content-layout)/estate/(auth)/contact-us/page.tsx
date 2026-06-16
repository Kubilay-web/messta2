import ContactUs from "../../components/frontend/contact-us";
import SectionHeader from "../../components/frontend/section-header";
import Logo from "../../components/logo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo Talep Et - EstatePro",
  description:
    "Emlak ofisinizi dijital geleceğe taşıyın. Formu doldurun, 24 saat içinde sizi arayarak ihtiyaçlarınıza özel bir demo planlayalım.",
};

export default function page() {
  return (
    <div className="py-12">
      <div className="py-6">
        <div className="flex items-center justify-center pb-8">
          <Logo size="lg" />
        </div>
        <SectionHeader
          title=""
          heading="Emlak Ofisiniz İçin ERP Sistemi Edinin"
          description="İlan yönetiminden sözleşme takibine, danışman koordinasyonundan müşteri ilişkilerine kadar her şeyi tek platformda yönetin. Aşağıdaki formu doldurarak ücretsiz demo talebinde bulunun."
        />
      </div>
      <ContactUs />
    </div>
  );
}
