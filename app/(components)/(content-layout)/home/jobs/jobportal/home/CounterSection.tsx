// CounterSection.tsx
"use client";

import { useEffect, useState } from "react";

export default function CounterSection() {
  const [happyClients, setHappyClients] = useState(100);
  const [totalCases, setTotalCases] = useState(500);
  const [ourOffice, setOurOffice] = useState(1);
  const [skilledPeople, setSkilledPeople] = useState(50);

  // Animasyonlu sayı artışı
  useEffect(() => {
    const duration = 2000; // 2 saniye
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);

    const animateValue = (end: number, setter: any) => {
      let frame = 0;
      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        setter(Math.floor(end * progress));
        if (frame === totalFrames) clearInterval(counter);
      }, frameDuration);
    };

    animateValue(100, setHappyClients);
    animateValue(500, setTotalCases);
    animateValue(1, setOurOffice);
    animateValue(50, setSkilledPeople);
  }, []);

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
        {/* Happy Clients */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
          <h2 className="text-3xl font-bold text-blue-600">{happyClients}+</h2>
          <p className="mt-2 text-gray-600 font-medium">Happy Clients</p>
        </div>

        {/* Total Cases */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
          <h2 className="text-3xl font-bold text-blue-600">{totalCases}+</h2>
          <p className="mt-2 text-gray-600 font-medium">Total Cases</p>
        </div>

        {/* Our Office */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
          <h2 className="text-3xl font-bold text-blue-600">{ourOffice}</h2>
          <p className="mt-2 text-gray-600 font-medium">Our Office</p>
        </div>

        {/* Skilled People */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
          <h2 className="text-3xl font-bold text-blue-600">{skilledPeople}+</h2>
          <p className="mt-2 text-gray-600 font-medium">Skilled People</p>
        </div>
      </div>
    </section>
  );
}
