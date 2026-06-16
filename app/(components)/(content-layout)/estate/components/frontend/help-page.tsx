"use client";
import * as React from "react";
import { Search, Mail, Phone, MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import Link from "next/link";

const articles = [
  {
    id: 1,
    title: "Başlangıç Rehberi",
    excerpt: "Ofis kaydı, kullanıcı rolleri ve ilk kurulum adımları",
    category: "Temel",
  },
  {
    id: 2,
    title: "Mülk & İlan Yönetimi",
    excerpt: "Mülk ekleme, ilan oluşturma ve fiyat güncelleme",
    category: "İlanlar",
  },
  {
    id: 3,
    title: "Danışman & Müşteri Yönetimi",
    excerpt: "Danışman kaydı, müşteri profili ve atama işlemleri",
    category: "Ekip",
  },
  {
    id: 4,
    title: "Sözleşme & Ödeme Takibi",
    excerpt: "Satış/kira sözleşmesi hazırlama ve taksit planı kurma",
    category: "Sözleşmeler",
  },
  {
    id: 5,
    title: "Mülk Gezileri & Randevular",
    excerpt: "Gezi planlaması, randevu hatırlatıcı ve geri bildirim kaydı",
    category: "Randevular",
  },
  {
    id: 6,
    title: "Raporlar & Analitik",
    excerpt: "Satış performansı, komisyon ve ilan istatistikleri",
    category: "Raporlar",
  },
];

const faqs = [
  {
    question: "EstatePro nedir?",
    answer:
      "EstatePro, emlak ofisleri için geliştirilmiş kapsamlı bir ERP platformudur. Mülk yönetiminden ilan takibine, danışman koordinasyonundan müşteri ilişkilerine, sözleşme süreçlerinden ödeme planlarına kadar tüm ofis operasyonlarınızı tek çatı altında yönetmenizi sağlar.",
  },
  {
    question: "Ofisimizin özel ihtiyaçlarına göre uyarlanabilir mi?",
    answer:
      "Evet. EstatePro esnek bir yapıya sahiptir. Mülk tiplerini, komisyon oranlarını, belge şablonlarını, departman yapısını ve bildirim kurallarını kendi ofisinize göre özelleştirebilirsiniz. Ücretsiz deneme sürecinizde tüm ayarları birlikte yapılandırabiliriz.",
  },
  {
    question: "Yeni bir mülk nasıl sisteme eklenir?",
    answer:
      "Dashboard üzerinden 'Mülkler > Yeni Mülk' menüsüne girin. Mülk tipini (daire, villa, ofis vb.), konumunu, alanını, oda sayısını ve diğer özelliklerini doldurun. Fotoğraf, tapu ve ekspertiz raporu gibi belgeleri de aynı ekrandan yükleyebilirsiniz. Mülk kaydedildikten sonra ilan oluşturma adımına otomatik olarak yönlendirilirsiniz.",
  },
  {
    question: "Satılık ve kiralık ilanları nasıl yönetirim?",
    answer:
      "Her mülk için bağımsız ilanlar oluşturabilirsiniz. İlan türünü (Satılık / Kiralık / Kısa Dönem Kiralık), fiyatı, depozito ve müzakere durumunu belirleyin. İlanı yayınlama tarihini ve son geçerlilik tarihini ayarlayın. İlan görüntülenme sayısı ve müşteri ilgi verileri otomatik olarak raporlanır.",
  },
  {
    question: "Sözleşme süreci nasıl işliyor?",
    answer:
      "Bir ilan için anlaşma sağlandığında 'Sözleşme Oluştur' adımına geçin. Sözleşme tipini (Satış / Kira / Ön Satış) seçin, tarafları (danışman ve müşteri) atayın, tutarları ve ödeme planını girin. Oluşturulan sözleşmeye PDF belgeler ekleyebilir, imza tarihini ve durumunu takip edebilirsiniz.",
  },
  {
    question: "Taksit ve ödeme planlarını nasıl takip ederim?",
    answer:
      "Her sözleşmeye bağlı ödeme planı oluşturabilirsiniz. 'Peşinat', '1. Taksit', 'Kira – Ocak 2025' gibi kalemleri tanımlayın, vade tarihlerini ve tutarları girin. Ödeme gerçekleştiğinde makbuz numarası ve ödeme yöntemiyle birlikte kaydedilir. Vadesi yaklaşan ödemeler için otomatik hatırlatıcı bildirim alırsınız.",
  },
  {
    question: "Danışman devamsızlık ve izin takibi yapılabiliyor mu?",
    answer:
      "Evet. Her danışman için günlük devamsızlık kaydı (Mevcut, Yok, Geç, İzinli, Uzaktan) tutulabilir. İzin talepleri sistem üzerinden oluşturulur, yönetici onayına sunulur ve onaylanan izinler devamsızlık takvimine otomatik yansır.",
  },
  {
    question: "Mülk gezisi randevusu nasıl oluşturulur?",
    answer:
      "Bir mülk sayfasından 'Gezi Planla' butonuna tıklayın. Danışmanı, müşteriyi ve gezi tarihini seçin. Planlanan geziler takvimde görünür; gezi tamamlandığında danışman müşteri geri bildirimini ve 1-5 memnuniyet puanını sisteme girer.",
  },
  {
    question: "Sistem gereksinimleri nelerdir?",
    answer:
      "EstatePro bulut tabanlı bir platformdur. HTML5 destekli modern bir tarayıcı (Chrome, Firefox, Edge veya Safari) ve internet bağlantısı yeterlidir. Ek yazılım kurulumu gerekmez; masaüstü, tablet ve mobil cihazlardan erişebilirsiniz.",
  },
  {
    question: "Verilerim güvende mi?",
    answer:
      "Tüm veriler SSL şifrelemesiyle iletilir ve günlük otomatik yedekleme yapılır. KVKK gereklilikleriyle tam uyumlu altyapımız, rol tabanlı erişim kontrolüyle yalnızca yetkili kullanıcıların ilgili verilere ulaşmasını garanti eder.",
  },
  {
    question: "Mevcut ofis verilerimi sisteme aktarabilir miyim?",
    answer:
      "Evet. Excel (.xlsx) formatında hazırlayacağınız mülk, müşteri ve danışman listelerini toplu olarak içe aktarabilirsiniz. Veri taşıma sürecinde destek ekibimiz size adım adım yardımcı olur.",
  },
  {
    question: "Fiyatlandırma nasıl işliyor?",
    answer:
      "Ofis büyüklüğüne ve kullanıcı sayısına göre aylık abonelik planları sunuyoruz. Uzun vadeli sözleşme zorunluluğu yoktur; tek aylık bildirimle aboneliğinizi sonlandırabilirsiniz. Fiyat teklifiniz için satış ekibimizle iletişime geçin.",
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Articles Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Yardım Makaleleri</h2>
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            className="pl-10"
            placeholder="Makale ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <Link href="#" key={article.id}>
              <Card className="hover:bg-muted/50 transition-colors">
                <CardHeader>
                  <p className="text-xs font-medium text-blue-500 mb-1">
                    {article.category}
                  </p>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {article.excerpt}
                  </p>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-16 bg-blue-50 p-8 rounded-lg">
        <div className="text-center mb-8">
          <h3 className="text-blue-500 font-medium mb-2 uppercase tracking-wide text-sm">
            Sıkça Sorulan Sorular
          </h3>
          <h2 className="text-3xl font-bold">
            Siz sorun, biz <span className="italic">cevaplayalım</span>
          </h2>
        </div>
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-3xl mx-auto"
        >
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="flex items-center justify-center gap-2 mt-8 text-muted-foreground">
          <span>Daha fazla yardıma mı ihtiyacınız var?</span>
          <Button variant="link" className="text-green-500 font-medium" asChild>
            <Link href="/estate/contact-us">Bize Ulaşın</Link>
          </Button>
        </div>
      </section>

      {/* Contact Cards */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Destek Kanalları</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-100">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <CardTitle className="text-lg">E-posta Desteği</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                destek@estatepro.com adresine yazın, en geç 4 saat içinde
                yanıt alın.
              </p>
              <Button className="w-full" variant="outline" asChild>
                <Link href="mailto:destek@estatepro.com">E-posta Gönder</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-purple-100">
                  <MessageCircle className="h-5 w-5 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Canlı Destek</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Hafta içi 09:00 – 18:00 saatleri arasında canlı destek
                hattımıza bağlanın.
              </p>
              <Button className="w-full" variant="outline">
                Sohbet Başlat
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-green-100">
                  <Phone className="h-5 w-5 text-green-600" />
                </div>
                <CardTitle className="text-lg">Telefon Desteği</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                +90 212 000 00 00 numaralı hattımızdan anında destek alın.
              </p>
              <Button className="w-full" variant="outline" asChild>
                <Link href="tel:+902120000000">Hemen Ara</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
