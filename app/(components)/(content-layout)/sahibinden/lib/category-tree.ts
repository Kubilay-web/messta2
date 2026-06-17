// Sahibinden tarzı kategori ağacı. Üst grup → emlak tipleri.
// Her düğüm ilanlar sayfasına ?ptype= / ?type= ile bağlanır.

export type CatNode = {
  key: string; // benzersiz
  label: string;
  propertyTypes: string[]; // bu düğümün kapsadığı PropertyType değerleri
};

export type CatGroup = {
  label: string;
  icon: string; // lucide ikon adı
  nodes: CatNode[];
};

export const CATEGORY_TREE: CatGroup[] = [
  {
    label: "Konut",
    icon: "Home",
    nodes: [
      { key: "apartment", label: "Daire", propertyTypes: ["APARTMENT"] },
      { key: "house", label: "Müstakil Ev", propertyTypes: ["HOUSE"] },
      { key: "villa", label: "Villa", propertyTypes: ["VILLA"] },
    ],
  },
  {
    label: "İş Yeri",
    icon: "Briefcase",
    nodes: [
      { key: "office", label: "Ofis", propertyTypes: ["OFFICE"] },
      { key: "shop", label: "Dükkan / Mağaza", propertyTypes: ["SHOP"] },
      { key: "warehouse", label: "Depo / Antrepo", propertyTypes: ["WAREHOUSE"] },
    ],
  },
  {
    label: "Arsa & Bina",
    icon: "Trees",
    nodes: [
      { key: "land", label: "Arsa", propertyTypes: ["LAND"] },
      { key: "building", label: "Komple Bina", propertyTypes: ["BUILDING"] },
    ],
  },
];

export const LISTING_TYPE_NODES = [
  { key: "SALE", label: "Satılık" },
  { key: "RENT", label: "Kiralık" },
  { key: "SHORT_RENT", label: "Günlük" },
];

// Tüm property type'ların düz listesi
export const ALL_PROPERTY_TYPES = CATEGORY_TREE.flatMap((g) => g.nodes.flatMap((n) => n.propertyTypes));
