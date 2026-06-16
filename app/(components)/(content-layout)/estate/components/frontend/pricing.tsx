"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Geist } from "next/font/google";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Check, Star, Zap } from "lucide-react";
import Link from "next/link";
import PricingBadge from "../ui/pricing-badge";

const space = Geist({
  subsets: ["latin"],
  variable: "--font-carlito",
  weight: "400",
});

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const monthlyPrice = 299;
  const annualPrice = 2990;

  const features = [
    "Sınırsız Mülk & İlan Yönetimi",
    "Satış ve Kira Sözleşme Modülü",
    "Danışman & Devamsızlık Takibi",
    "Müşteri İlişkileri Yönetimi (CRM)",
    "Taksit & Ödeme Planı Takibi",
    "Mülk Gezisi & Randevu Sistemi",
    "Analitik Raporlar & Dashboard",
    "7/24 Teknik Destek",
  ];

  const pricingHighlights = [
    {
      icon: Star,
      title: "Tüm Özellikler Dahil",
      description: "Gizli ücret veya premium katman yok",
    },
    {
      icon: Zap,
      title: "Hızlı Kurulum",
      description: "Dakikalar içinde sisteminiz hazır",
    },
    {
      icon: Check,
      title: "Çok Şubeli Destek",
      description: "Birden fazla ofisinizi tek hesaptan yönetin",
    },
  ];

  return (
    <section
      id="pricing"
      className="relative overflow-hidden py-10 px-4 sm:py-14 sm:px-6 md:py-22 text-foreground"
    >
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.1 }}
      >
        <PricingBadge />
      </motion.div>

      <div className="absolute -top-10 left-1/2 h-16 w-44 -translate-x-1/2 select-none rounded-full bg-primary opacity-40 blur-3xl" />
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
            "font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl max-w-5xl mx-auto text-center text-4xl xl:text-6xl/none text-black",
            space.className,
          )}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2 }}
        >
          Fiyatlandırma
        </motion.h1>

        <motion.p
          className="mx-auto max-w-3xl text-center text-base sm:text-xl text-muted-foreground -mt-5"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.3 }}
        >
          Tüm özellikler tek pakette. Ofis büyüklüğünden bağımsız, sabit aylık
          ücret. Gizli maliyet yok.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-2 p-1 bg-secondary/20 rounded-xl border border-secondary/40"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            variant={isAnnual ? "outline" : "default"}
            onClick={() => setIsAnnual(false)}
            className="transition-all duration-300"
          >
            Aylık
          </Button>
          <Button
            variant={isAnnual ? "default" : "outline"}
            onClick={() => setIsAnnual(true)}
            className="transition-all duration-300"
          >
            Yıllık (%17 İndirim)
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl w-full">
          {pricingHighlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <motion.div
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl bg-secondary/10 border border-secondary/30"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{highlight.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {highlight.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="w-full max-w-5xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="border-2 border-secondary/40 shadow-2xl overflow-hidden">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-8 sm:p-10 lg:p-12 bg-background">
                  <motion.h3
                    className="text-2xl font-bold tracking-tight mb-6"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    {isAnnual ? "Yıllık" : "Aylık"} Emlak Ofisi Lisansı
                  </motion.h3>

                  <motion.p
                    className="text-base leading-7 text-muted-foreground mb-8"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    Sınırsız kullanıcı, sınırsız mülk. Her büyüklükteki emlak
                    ofisine uygun sabit fiyat.
                  </motion.p>

                  <motion.div
                    className="flex items-center gap-x-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    <h4 className="flex-none text-lg font-semibold leading-6 text-primary">
                      Dahil olan tüm özellikler
                    </h4>
                    <div className="h-px flex-auto bg-secondary/50" />
                  </motion.div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
                      >
                        <div className="flex-none w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="bg-secondary/5 p-8 sm:p-10 lg:p-12 flex flex-col justify-center border-l border-secondary/20">
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                  >
                    <div className="mb-6">
                      <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                        {isAnnual
                          ? "💎 Yıllık ödeme, %17 tasarruf"
                          : "🚀 Ofis başına sabit fiyat"}
                      </span>
                    </div>

                    <div className="flex items-baseline justify-center gap-x-2 mb-8">
                      <span className="text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                        ₺{isAnnual ? annualPrice.toLocaleString() : monthlyPrice.toLocaleString()}
                      </span>
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                          TRY
                        </span>
                        <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                          {isAnnual ? "/yıl" : "/ay"}
                        </span>
                      </div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="lg"
                        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        asChild
                      >
                        <Link href="/estate/agency-onboarding">
                          14 Gün Ücretsiz Dene
                        </Link>
                      </Button>
                    </motion.div>

                    <p className="mt-6 text-xs leading-5 text-muted-foreground">
                      ⚡ 14 gün ücretsiz · 💳 Kredi kartı gerekmez · 🎊 Toplu
                      ofis indirimleri mevcut
                    </p>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}
