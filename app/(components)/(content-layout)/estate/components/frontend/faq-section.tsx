"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight, HelpCircle, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { Geist } from "next/font/google";
import { cn } from "../../lib/utils";
import FaqBadge from "../ui/faq-badge";

const space = Geist({
  subsets: ["latin"],
  variable: "--font-carlito",
  weight: "400",
});

const faqs = [
  {
    question: "EstatePro ile ofisimi ne kadar sürede aktif edebilirim?",
    answer:
      "Ofis kaydını tamamladıktan sonra 24-48 saat içinde sisteminiz kuruluma hazır olur. Mülk, danışman ve müşteri verilerinizi Excel ile aktarabilir, destek ekibimiz ilk kurulumda size eşlik eder. Çoğu ofis ilk hafta sonunda tam kapasiteyle çalışmaya başlar.",
  },
  {
    question: "Verilerim güvende mi? KVKK uyumlu mu?",
    answer:
      "Kesinlikle. Tüm veriler 256-bit SSL şifrelemesiyle iletilir ve günlük otomatik yedekleme yapılır. Platformumuz KVKK gereklilikleriyle tam uyumludur. Rol tabanlı erişim kontrolü sayesinde her kullanıcı yalnızca yetkili olduğu verilere ulaşabilir.",
  },
  {
    question: "Birden fazla şube veya ofis yönetebilir miyim?",
    answer:
      "Evet. EstatePro çoklu ajans desteği sunar. Her şubeye ayrı danışman ve mülk havuzu tanımlayabilir; merkezi raporlama ile tüm şubelerinizi tek panelden izleyebilirsiniz.",
  },
  {
    question: "Mülk gezisi randevularını nasıl takip edebilirim?",
    answer:
      "Herhangi bir mülk sayfasından 'Gezi Planla' ile randevu oluşturabilirsiniz. Danışman ve müşteri atandıktan sonra sistem otomatik hatırlatıcı gönderir. Gezi tamamlandığında müşteri geri bildirimi ve memnuniyet puanı sisteme kaydedilir.",
  },
  {
    question: "Sözleşme ve ödeme süreçleri nasıl işliyor?",
    answer:
      "Satış veya kira sözleşmesini sistem üzerinden oluşturun, tarafları atayın ve ödeme planı (peşinat, taksitler) kurun. Her vade tarihi için otomatik hatırlatıcı alırsınız. Gerçekleşen ödemeler makbuz numarası ve yöntemiyle birlikte kaydedilir.",
  },
  {
    question: "Danışman performansını nasıl takip edebilirim?",
    answer:
      "Her danışmanın kapattığı işlem sayısı, ürettiği komisyon geliri, ilan görüntüleme ve gezi istatistikleri anlık raporlanır. Devamsızlık ve izin kayıtları da aynı panelde görüntülenir.",
  },
  {
    question: "Mevcut ofis verilerimi sisteme aktarabilir miyim?",
    answer:
      "Evet. Mülk, danışman ve müşteri listelerinizi Excel (.xlsx) formatında toplu içe aktarabilirsiniz. Veri taşıma sürecinde destek ekibimiz adım adım yardımcı olur.",
  },
  {
    question: "Mobil cihazlardan erişilebiliyor mu?",
    answer:
      "EstatePro tamamen duyarlı (responsive) bir yapıya sahiptir; masaüstü, tablet ve akıllı telefon üzerinden tarayıcıdan erişebilirsiniz. Danışmanlar saha ziyaretleri sırasında mülk bilgilerini ve randevularını mobil üzerinden anlık güncelleyebilir.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="relative overflow-hidden py-10 px-4 sm:py-14 sm:px-6 md:py-22 text-foreground">
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.1 }}
      >
        <FaqBadge />
      </motion.div>

      <div className="absolute -top-10 left-1/2 h-full w-3/4 -translate-x-1/2 select-none rounded-3xl bg-primary/10 opacity-40 blur-3xl pointer-events-none" />
      <div className="absolute left-1/2 top-0 h-px w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/50 to-transparent transition-all ease-in-out" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: 0 }}
        className="container mt-5 mx-auto flex flex-col items-center gap-6 sm:gap-12"
      >
        <motion.h1
          className={cn(
            "font-bold tracking-tighter text-black sm:text-5xl md:text-6xl lg:text-7xl max-w-5xl mx-auto text-center text-4xl xl:text-6xl/none",
            space.className,
          )}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2 }}
        >
          Sıkça Sorulan Sorular
        </motion.h1>

        <motion.p
          className="mx-auto max-w-3xl text-center text-base sm:text-xl text-muted-foreground -mt-5"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.3 }}
        >
          EstatePro hakkında en çok merak edilenlere yanıt verdik. Aradığınızı
          bulamazsanız destek ekibimiz her zaman hazır!
        </motion.p>

        <div className="space-y-4 mx-auto max-w-4xl w-full">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <button
                className="w-full text-left p-4 focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  )}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-4 pt-0 text-gray-600 border-t border-gray-100">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <motion.div
          className="mt-8 p-6 rounded-xl border-2 border-secondary/40 shadow-xl bg-card text-card-foreground max-w-4xl w-full"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <HelpCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
              <span className="text-foreground font-medium">
                EstatePro hakkında başka sorunuz mu var?
              </span>
            </div>
            <Link
              href="/estate/contact-us"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300 flex items-center whitespace-nowrap font-medium shadow-lg hover:shadow-xl group"
            >
              Ekibimizle İletişime Geçin
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
