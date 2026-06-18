// Sahibinden kategori ağacı (seed verisi) + kategoriye özel özellik alanları.
// Bu dosya hem DB seed'i (ensureCategories) hem de UI navigasyonu için kullanılır.

import { ALL_PROVINCE_NAMES } from "./tr-locations";

export interface SeedCategory {
  name: string;
  slug: string;
  icon?: string;
  featured?: boolean;
  children?: SeedCategory[];
}

export const CATEGORY_TREE: SeedCategory[] = [
  {
    name: "Emlak",
    slug: "emlak",
    icon: "🏠",
    featured: true,
    children: [
      {
        name: "Konut",
        slug: "emlak-konut",
        children: [
          { name: "Satılık Daire", slug: "satilik-daire" },
          { name: "Kiralık Daire", slug: "kiralik-daire" },
          { name: "Satılık Residence", slug: "satilik-residence" },
          { name: "Günlük Kiralık", slug: "gunluk-kiralik-konut" },
        ],
      },
      {
        name: "İş Yeri",
        slug: "emlak-isyeri",
        children: [
          { name: "Satılık Dükkan & Mağaza", slug: "satilik-dukkan" },
          { name: "Kiralık Ofis", slug: "kiralik-ofis" },
        ],
      },
      {
        name: "Arsa",
        slug: "emlak-arsa",
        children: [
          { name: "Satılık Arsa", slug: "satilik-arsa" },
          { name: "Satılık Tarla", slug: "satilik-tarla" },
        ],
      },
    ],
  },
  {
    name: "Vasıta",
    slug: "vasita",
    icon: "🚗",
    featured: true,
    children: [
      {
        name: "Otomobil",
        slug: "vasita-otomobil",
        children: [
          { name: "Sahibinden Otomobil", slug: "satilik-otomobil" },
          { name: "Galeriden Otomobil", slug: "galeri-otomobil" },
        ],
      },
      {
        name: "Arazi, SUV & Pickup",
        slug: "vasita-suv",
        children: [{ name: "Satılık SUV", slug: "satilik-suv" }],
      },
      {
        name: "Motosiklet",
        slug: "vasita-motosiklet",
        children: [{ name: "Satılık Motosiklet", slug: "satilik-motosiklet" }],
      },
      {
        name: "Ticari Araçlar",
        slug: "vasita-ticari",
        children: [{ name: "Minivan & Panelvan", slug: "satilik-panelvan" }],
      },
    ],
  },
  {
    name: "İkinci El ve Sıfır Alışveriş",
    slug: "alisveris",
    icon: "🛒",
    featured: true,
    children: [
      {
        name: "Bilgisayar",
        slug: "alisveris-bilgisayar",
        children: [
          { name: "Dizüstü / Laptop", slug: "laptop" },
          { name: "Masaüstü Bilgisayar", slug: "masaustu-bilgisayar" },
        ],
      },
      {
        name: "Cep Telefonu",
        slug: "alisveris-telefon",
        children: [
          { name: "Cep Telefonu", slug: "cep-telefonu" },
          { name: "Aksesuarlar", slug: "telefon-aksesuar" },
        ],
      },
      {
        name: "Ev & Bahçe",
        slug: "alisveris-ev",
        children: [
          { name: "Beyaz Eşya", slug: "beyaz-esya" },
          { name: "Mobilya", slug: "mobilya" },
        ],
      },
      {
        name: "Giyim & Aksesuar",
        slug: "alisveris-giyim",
        children: [{ name: "Giyim", slug: "giyim" }],
      },
    ],
  },
  {
    name: "İş Makineleri & Sanayi",
    slug: "is-makineleri",
    icon: "🚜",
    children: [
      {
        name: "İş Makineleri",
        slug: "is-makineleri-genel",
        children: [{ name: "İş Makinesi", slug: "is-makinesi" }],
      },
    ],
  },
  {
    name: "Hayvanlar Alemi",
    slug: "hayvanlar",
    icon: "🐾",
    children: [
      {
        name: "Evcil Hayvanlar",
        slug: "hayvanlar-evcil",
        children: [
          { name: "Köpek", slug: "kopek" },
          { name: "Kedi", slug: "kedi" },
        ],
      },
    ],
  },
  {
    name: "İş İlanları",
    slug: "is-ilanlari",
    icon: "💼",
    children: [
      {
        name: "İş İlanları",
        slug: "is-ilanlari-genel",
        children: [{ name: "Tüm İş İlanları", slug: "tum-is-ilanlari" }],
      },
    ],
  },
];

// Kategoriye özel form/filtre alanları (top-level slug -> alanlar)
export type AttrFieldType = "text" | "number" | "select" | "boolean";

export interface AttrField {
  key: string;
  label: string;
  type: AttrFieldType;
  options?: string[];
  unit?: string;
  filterable?: boolean;
}

export const CATEGORY_ATTRIBUTES: Record<string, AttrField[]> = {
  emlak: [
    { key: "grossArea", label: "m² (Brüt)", type: "number", unit: "m²", filterable: true },
    { key: "netArea", label: "m² (Net)", type: "number", unit: "m²" },
    {
      key: "rooms",
      label: "Oda Sayısı",
      type: "select",
      options: ["1+0", "1+1", "2+1", "3+1", "4+1", "5+1", "6+ ve üzeri"],
      filterable: true,
    },
    { key: "buildingAge", label: "Bina Yaşı", type: "number", filterable: true },
    { key: "floor", label: "Bulunduğu Kat", type: "text" },
    { key: "totalFloors", label: "Kat Sayısı", type: "number" },
    {
      key: "heating",
      label: "Isıtma",
      type: "select",
      options: ["Doğalgaz", "Kombi", "Merkezi", "Yerden Isıtma", "Klima", "Soba", "Yok"],
      filterable: true,
    },
    { key: "bathrooms", label: "Banyo Sayısı", type: "number" },
    { key: "balcony", label: "Balkon", type: "boolean" },
    { key: "furnished", label: "Eşyalı", type: "boolean", filterable: true },
    { key: "inComplex", label: "Site İçerisinde", type: "boolean", filterable: true },
    // Gelişmiş emlak alanları
    { key: "elevator", label: "Asansör", type: "boolean" },
    {
      key: "parking",
      label: "Otopark",
      type: "select",
      options: ["Açık Otopark", "Kapalı Otopark", "Açık & Kapalı", "Yok"],
    },
    {
      key: "facade",
      label: "Cephe",
      type: "select",
      options: ["Kuzey", "Güney", "Doğu", "Batı", "Kuzeydoğu", "Kuzeybatı", "Güneydoğu", "Güneybatı"],
    },
    {
      key: "usageStatus",
      label: "Kullanım Durumu",
      type: "select",
      options: ["Boş", "Kiracılı", "Mülk Sahibi Oturuyor"],
      filterable: true,
    },
    {
      key: "deedStatus",
      label: "Tapu Durumu",
      type: "select",
      options: ["Kat Mülkiyetli", "Kat İrtifaklı", "Hisseli Tapu", "Müstakil Tapulu", "Arsa Tapulu"],
    },
    {
      key: "buildingStatus",
      label: "Yapı Durumu",
      type: "select",
      options: ["Sıfır", "İkinci El", "Yapım Aşamasında"],
      filterable: true,
    },
    { key: "creditEligible", label: "Krediye Uygun", type: "boolean", filterable: true },
    { key: "dues", label: "Aidat", type: "number", unit: "₺" },
    { key: "deposit", label: "Depozito", type: "number", unit: "₺" },
    {
      key: "fromWho",
      label: "Kimden",
      type: "select",
      options: ["Sahibinden", "Emlak Ofisinden", "İnşaat Firmasından", "Bankadan"],
      filterable: true,
    },
  ],
  vasita: [
    { key: "brand", label: "Marka", type: "text", filterable: true },
    { key: "model", label: "Model", type: "text", filterable: true },
    { key: "year", label: "Yıl", type: "number", filterable: true },
    { key: "km", label: "KM", type: "number", unit: "km", filterable: true },
    {
      key: "fuel",
      label: "Yakıt",
      type: "select",
      options: ["Benzin", "Dizel", "LPG & Benzin", "Hibrit", "Elektrik"],
      filterable: true,
    },
    {
      key: "gear",
      label: "Vites",
      type: "select",
      options: ["Manuel", "Otomatik", "Yarı Otomatik"],
      filterable: true,
    },
    { key: "enginePower", label: "Motor Gücü", type: "text", unit: "hp" },
    { key: "engineCapacity", label: "Motor Hacmi", type: "text", unit: "cc" },
    {
      key: "color",
      label: "Renk",
      type: "select",
      options: ["Beyaz", "Siyah", "Gri", "Kırmızı", "Mavi", "Gümüş", "Diğer"],
      filterable: true,
    },
    {
      key: "bodyType",
      label: "Kasa Tipi",
      type: "select",
      options: ["Sedan", "Hatchback", "Station Wagon", "SUV", "Coupe"],
    },
    { key: "fromOwner", label: "Sahibinden", type: "boolean", filterable: true },
  ],
  alisveris: [
    { key: "condition", label: "Durumu", type: "select", options: ["Sıfır", "İkinci El"], filterable: true },
    { key: "brand", label: "Marka", type: "text", filterable: true },
    { key: "warranty", label: "Garantili", type: "boolean", filterable: true },
  ],
  "is-makineleri": [
    { key: "brand", label: "Marka", type: "text", filterable: true },
    { key: "year", label: "Yıl", type: "number", filterable: true },
    { key: "hours", label: "Çalışma Saati", type: "number" },
  ],
  hayvanlar: [
    { key: "breed", label: "Cins", type: "text", filterable: true },
    { key: "age", label: "Yaş", type: "text" },
    { key: "vaccinated", label: "Aşılı", type: "boolean" },
  ],
  "is-ilanlari": [
    { key: "position", label: "Pozisyon", type: "text", filterable: true },
    {
      key: "workType",
      label: "Çalışma Şekli",
      type: "select",
      options: ["Tam Zamanlı", "Yarı Zamanlı", "Dönemsel", "Stajyer"],
      filterable: true,
    },
  ],
};

// İl listesi — 81 il (tr-locations.ts'ten)
export const TR_CITIES = ALL_PROVINCE_NAMES;

export const LISTING_TYPE_LABELS: Record<string, string> = {
  SALE: "Satılık",
  RENT: "Kiralık",
  DAILY_RENT: "Günlük Kiralık",
  EXCHANGE: "Takas",
  WANTED: "Aranıyor",
};

export const STATUS_LABELS: Record<string, string> = {
  DRAFT: "Taslak",
  PENDING: "Onay Bekliyor",
  ACTIVE: "Yayında",
  PASSIVE: "Pasif",
  SOLD: "Satıldı",
  REJECTED: "Reddedildi",
  EXPIRED: "Süresi Doldu",
};
