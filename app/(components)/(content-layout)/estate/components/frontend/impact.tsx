"use client";

import { Building2, FileText, Users } from "lucide-react";
import { useState, useEffect } from "react";

const TARGET = {
  agencies: 320,
  properties: 14800,
  contracts: 5600,
};

export default function StatisticsSection() {
  const [stats, setStats] = useState({ agencies: 0, properties: 0, contracts: 0 });

  useEffect(() => {
    const duration = 2000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      setStats({
        agencies: Math.floor(TARGET.agencies * progress),
        properties: Math.floor(TARGET.properties * progress),
        contracts: Math.floor(TARGET.contracts * progress),
      });
      if (frame === totalFrames) clearInterval(counter);
    }, frameDuration);
    return () => clearInterval(counter);
  }, []);

  const items = [
    {
      icon: Building2,
      value: stats.agencies,
      label: "Emlak Ofisi",
      sub: "Platformumuza güvenen ofis",
    },
    {
      icon: Users,
      value: stats.properties,
      label: "Aktif Mülk",
      sub: "Sistemde kayıtlı toplam mülk",
    },
    {
      icon: FileText,
      value: stats.contracts,
      label: "Tamamlanan Sözleşme",
      sub: "Başarıyla kapanan işlem",
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 bg-blue-50 relative overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-6 lg:grid-cols-12 gap-4 pointer-events-none">
        {Array(12)
          .fill(0)
          .map((_, i) => (
            <div key={`v-${i}`} className="h-full w-px bg-blue-100" />
          ))}
      </div>

      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-900">
            Rakamlarla EstatePro
          </h2>
          <p className="max-w-[700px] text-blue-700 md:text-xl/relaxed">
            Yüzlerce emlak ofisinin tercih ettiği platform ile işlemlerinizi
            dijitalleştirin
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center space-y-2 rounded-lg border border-blue-200 bg-white p-8 text-center shadow-md transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <item.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-4xl font-bold text-blue-900">
                {item.value.toLocaleString()}+
              </h3>
              <p className="text-xl font-medium text-blue-800">{item.label}</p>
              <p className="text-sm text-blue-600">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
