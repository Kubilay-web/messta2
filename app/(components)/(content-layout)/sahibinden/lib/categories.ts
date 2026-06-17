// Anasayfa kategori / hızlı erişim tanımları (sahibinden tarzı vitrin)

export type QuickCategory = {
  label: string;
  href: string;
  icon: string; // lucide ikon adı (CategoryGrid içinde eşlenir)
  accent: string; // tailwind renk sınıfı
};

export const QUICK_CATEGORIES: QuickCategory[] = [
  { label: "Satılık Konut", href: "/sahibinden/ilanlar?type=SALE&ptype=APARTMENT", icon: "Home", accent: "from-emerald-500 to-teal-600" },
  { label: "Kiralık Konut", href: "/sahibinden/ilanlar?type=RENT&ptype=APARTMENT", icon: "KeyRound", accent: "from-sky-500 to-blue-600" },
  { label: "Villa", href: "/sahibinden/ilanlar?ptype=VILLA", icon: "Castle", accent: "from-amber-500 to-orange-600" },
  { label: "İş Yeri", href: "/sahibinden/ilanlar?ptype=OFFICE", icon: "Briefcase", accent: "from-indigo-500 to-purple-600" },
  { label: "Dükkan", href: "/sahibinden/ilanlar?ptype=SHOP", icon: "Store", accent: "from-rose-500 to-pink-600" },
  { label: "Arsa", href: "/sahibinden/ilanlar?ptype=LAND", icon: "Trees", accent: "from-lime-500 to-green-600" },
  { label: "Günlük Kiralık", href: "/sahibinden/ilanlar?type=SHORT_RENT", icon: "CalendarDays", accent: "from-violet-500 to-fuchsia-600" },
  { label: "Tüm İlanlar", href: "/sahibinden/ilanlar", icon: "LayoutGrid", accent: "from-slate-600 to-slate-800" },
];

// Türkiye'nin en çok aranan şehirleri (hızlı şehir bağlantıları için yedek liste)
export const POPULAR_CITIES = [
  "İstanbul",
  "Ankara",
  "İzmir",
  "Antalya",
  "Bursa",
  "Adana",
  "Konya",
  "Muğla",
];

export const ROOM_OPTIONS = ["1+0", "1+1", "2+1", "3+1", "3+2", "4+1", "4+2", "5+1", "5+2"];

export const HEATING_OPTIONS = [
  { value: "NATURAL_GAS", label: "Doğalgaz (Kombi)" },
  { value: "CENTRAL", label: "Merkezi" },
  { value: "CENTRAL_SHARE", label: "Merkezi (Pay Ölçer)" },
  { value: "FLOOR_HEATING", label: "Yerden Isıtma" },
  { value: "AC", label: "Klima" },
  { value: "STOVE", label: "Soba" },
  { value: "NONE", label: "Yok" },
];
