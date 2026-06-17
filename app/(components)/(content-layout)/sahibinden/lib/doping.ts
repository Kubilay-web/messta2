// Doping / öne çıkarma paketleri (sahibinden tarzı). Fiyatlar PayPal uyumlu USD.
// "credits" = kontör maliyeti (üyelik kontörüyle ödeme için).

export type DopingEffect = "showcase" | "urgent" | "highlight";

export type DopingPackage = {
  id: string;
  effect: DopingEffect;
  name: string;
  days: number;
  price: number; // USD (PayPal)
  credits: number; // kontör maliyeti
  badge?: string;
  accent: string;
  features: string[];
};

export const DOPING_PACKAGES: DopingPackage[] = [
  // Vitrin (showcase → featuredUntil)
  { id: "showcase-7", effect: "showcase", name: "Vitrin · 7 Gün", days: 7, price: 4.99, credits: 50, badge: "Popüler", accent: "from-amber-500 to-orange-500",
    features: ["Anasayfa vitrininde gösterim", "Arama sonuçlarında üst sıra", "Vitrin rozeti"] },
  { id: "showcase-30", effect: "showcase", name: "Vitrin · 30 Gün", days: 30, price: 14.99, credits: 130, badge: "En İyi Değer", accent: "from-violet-500 to-fuchsia-600",
    features: ["30 gün vitrin & üst sıra", "Vitrin rozeti", "Maksimum görünürlük"] },
  // Acil (urgent → urgentUntil)
  { id: "urgent-7", effect: "urgent", name: "Acil · 7 Gün", days: 7, price: 2.99, credits: 30, accent: "from-rose-500 to-red-600",
    features: ["Kırmızı \"Acil\" rozeti", "Dikkat çeken görünüm", "7 gün boyunca"] },
  { id: "urgent-15", effect: "urgent", name: "Acil · 15 Gün", days: 15, price: 4.99, credits: 50, accent: "from-rose-500 to-red-600",
    features: ["Kırmızı \"Acil\" rozeti", "15 gün boyunca"] },
  // Renkli çerçeve (highlight → highlightUntil)
  { id: "highlight-15", effect: "highlight", name: "Renkli Çerçeve · 15 Gün", days: 15, price: 3.49, credits: 35, accent: "from-sky-500 to-indigo-600",
    features: ["İlan kartında renkli çerçeve", "Listede öne çıkar", "15 gün boyunca"] },
  { id: "highlight-30", effect: "highlight", name: "Renkli Çerçeve · 30 Gün", days: 30, price: 5.99, credits: 60, accent: "from-sky-500 to-indigo-600",
    features: ["İlan kartında renkli çerçeve", "30 gün boyunca"] },
];

export const DOPING_FIELD: Record<DopingEffect, "featuredUntil" | "urgentUntil" | "highlightUntil"> = {
  showcase: "featuredUntil",
  urgent: "urgentUntil",
  highlight: "highlightUntil",
};

export function getDopingPackage(id: string): DopingPackage | undefined {
  return DOPING_PACKAGES.find((p) => p.id === id);
}
