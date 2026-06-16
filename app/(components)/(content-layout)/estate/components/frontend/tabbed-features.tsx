"use client";

import { Building2, FileText, Users, BarChart2 } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Geist } from "next/font/google";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import AdvancedFeaturesBadge from "../ui/advanced-features-badge";
import Image from "next/image";
import Link from "next/link";

const space = Geist({
  subsets: ["latin"],
  variable: "--font-carlito",
  weight: "400",
});

const features = [
  {
    icon: Building2,
    tab: "Mülkler",
    title: "🏠 Mülk & İlan Yönetimi",
    description:
      "Daire, villa, ofis, arsa ve depolar dahil tüm mülk tiplerini kaydedin; satılık ve kiralık ilanları kolayca yönetin.",
    href: "/estate/features/property-management",
    subFeatures: [
      "Mülk tipi, konum ve özellik detayları",
      "Fotoğraf, tapu ve ekspertiz belgesi yükleme",
      "Harita üzerinde konum belirleme",
      "Satılık / Kiralık / Kısa Dönem ilan türleri",
      "İlan görüntülenme ve ilgi istatistikleri",
      "Öne çıkan ilan yönetimi",
      "Toplu mülk içe aktarma (Excel)",
      "Mülk durum takibi (Müsait, Satıldı, Kiralandı)",
    ],
    image:
      "https://img.freepik.com/free-vector/admin-dashboard-panel-template-with-flat-design_23-2147868394.jpg",
  },
  {
    icon: Users,
    tab: "Danışmanlar",
    title: "👥 Danışman & Müşteri Yönetimi",
    description:
      "Danışman profillerini, müşteri bilgilerini ve aralarındaki ilişkileri eksiksiz yönetin.",
    href: "/estate/features/agent-management",
    subFeatures: [
      "Danışman profili ve lisans belgesi kaydı",
      "Komisyon oranı ve uzmanlaşma alanları",
      "Günlük devamsızlık & izin takibi",
      "Müşteri profili (alıcı, satıcı, kiracı)",
      "Müşteri tercih ve bütçe bilgisi",
      "Müşteri-ilan ilgi eşleştirme",
      "Danışman-müşteri atama",
      "Toplu veri içe aktarma",
    ],
    image:
      "https://img.freepik.com/free-vector/online-learning-concept-illustration_114360-4755.jpg",
  },
  {
    icon: FileText,
    tab: "Sözleşmeler",
    title: "📄 Sözleşme & Ödeme Takibi",
    description:
      "Satış ve kira sözleşmelerini dijital ortamda hazırlayın; taksit planları ile vadesi gelen ödemeleri kaçırmayın.",
    href: "/estate/features/contract-management",
    subFeatures: [
      "Satış / Kira / Ön Satış sözleşme tipleri",
      "Taraf ve danışman atama",
      "Sözleşme durumu takibi (Taslak, Aktif, Tamamlandı)",
      "Ödeme planı oluşturma (peşinat, taksitler)",
      "Vadesi yaklaşan ödeme bildirimleri",
      "Makbuz numarası ve ödeme yöntemi kaydı",
      "Sözleşme belgesi yükleme ve arşivleme",
      "Mülk gezisi & randevu yönetimi",
    ],
    image:
      "https://img.freepik.com/free-vector/flat-university-background_23-2148168523.jpg",
  },
  {
    icon: BarChart2,
    tab: "Analitik",
    title: "📊 Analitik & Raporlar",
    description:
      "Satış performansı, komisyon gelirleri ve ilan istatistiklerini görsel raporlarla anlık izleyin.",
    href: "/estate/features/analytics",
    subFeatures: [
      "Danışman bazlı satış & komisyon raporu",
      "İlan görüntülenme ve dönüşüm oranları",
      "Aylık ve yıllık gelir grafikleri",
      "Sözleşme kapanma süreleri analizi",
      "Mülk tipi ve bölge bazlı performans",
      "Müşteri ilgi & gezi istatistikleri",
      "Özelleştirilebilir dashboard",
      "Excel ve PDF dışa aktarma",
    ],
    image:
      "https://img.freepik.com/premium-photo/purple-tablet-with-graph-it-graph-it_1197721-134076.jpg",
  },
];

export default function TabbedFeatures() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="advanced-features"
      className="relative overflow-hidden py-10 px-4 sm:px-6 md:px-10 text-foreground bg-white"
    >
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.1 }}
      >
        <AdvancedFeaturesBadge />
      </motion.div>

      <div className="absolute -top-10 left-1/2 h-20 w-3/4 -translate-x-1/2 select-none rounded-full bg-primary opacity-40 blur-3xl pointer-events-none bg-gradient-to-b from-primary/20 to-transparent" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto flex flex-col items-center gap-6 sm:gap-10"
      >
        <motion.h1
          className={cn(
            "text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black font-bold tracking-tight text-center",
            space.className,
          )}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2 }}
        >
          Gelişmiş Emlak Ofisi Yönetimi
        </motion.h1>

        <motion.p
          className="max-w-2xl text-center text-base sm:text-lg text-muted-foreground"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.3 }}
        >
          Mülk, danışman, sözleşme ve analitiği kapsayan entegre modüllerle
          modern emlak operasyonlarınızı uçtan uca yönetin.
        </motion.p>

        <Tabs defaultValue={features[0].tab} className="w-full">
          <TabsList className="inline-flex w-full overflow-x-auto whitespace-nowrap rounded-none border-b bg-transparent p-2 gap-2 sm:justify-center sm:gap-4 sm:p-0 scrollbar-hide">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.tab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <TabsTrigger
                    value={feature.tab}
                    className="flex items-center gap-2 border-b-2 border-transparent px-4 pb-2 pt-1 text-sm sm:text-base data-[state=active]:border-primary transition-all duration-300 hover:text-primary"
                  >
                    <Icon className="h-5 w-5" />
                    {feature.tab}
                  </TabsTrigger>
                </motion.div>
              );
            })}
          </TabsList>

          {features.map((feature) => (
            <TabsContent
              key={feature.tab}
              value={feature.tab}
              className="space-y-8"
            >
              <motion.div
                className="grid grid-cols-1 gap-10 lg:grid-cols-2 max-w-6xl mx-auto"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="space-y-6">
                  <motion.h2
                    className="text-2xl sm:text-3xl font-bold"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {feature.title}
                  </motion.h2>

                  <motion.p
                    className="text-muted-foreground text-base sm:text-lg"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    {feature.description}
                  </motion.p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {feature.subFeatures.map((subFeature, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-start gap-2 text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 + idx * 0.05 }}
                      >
                        <div className="mt-0.5 h-4 w-4 flex-none rounded-full bg-primary/10 flex items-center justify-center">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        </div>
                        <span className="text-muted-foreground">{subFeature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <Button asChild>
                      <Link href={feature.href}>Daha Fazla Bilgi Al</Link>
                    </Button>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </section>
  );
}
