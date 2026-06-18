// Emlak ilanları için detaylı özellik etiket matrisi (sahibinden tarzı).
// attributes.features = { internal: string[], external: string[], ... } olarak saklanır.

export interface FeatureGroup {
  id: string;
  label: string;
  icon: string;
  options: string[];
}

export const EMLAK_FEATURE_GROUPS: FeatureGroup[] = [
  {
    id: "internal",
    label: "İç Özellikler",
    icon: "🏠",
    options: [
      "ADSL", "Ankastre Fırın", "Balkon", "Barbekü", "Beyaz Eşya", "Boyalı", "Çelik Kapı",
      "Duşakabin", "Ebeveyn Banyosu", "Fransız Balkon", "Giyinme Odası", "Gömme Dolap",
      "Görüntülü Diafon", "Hilton Banyo", "Isıcam", "Jakuzi", "Kartonpiyer", "Kiler", "Klima",
      "Laminat", "Marley", "Mobilya", "Mutfak (Ankastre)", "Panjur / Jaluzi", "Parke",
      "Seramik Zemin", "Spot Aydınlatma", "Şofben", "Teras", "Vestiyer", "Wc",
    ],
  },
  {
    id: "external",
    label: "Dış Özellikler",
    icon: "🏢",
    options: [
      "Asansör", "Buhar Odası", "Çocuk Oyun Parkı", "Güvenlik", "Hidrofor", "Isı Yalıtımı",
      "Jeneratör", "Kablo TV", "Kameralı Güvenlik", "Kapıcı", "Kreş", "Müstakil Havuz",
      "Otopark (Açık)", "Otopark (Kapalı)", "Sauna", "Site İçerisinde", "Spor Salonu",
      "Su Deposu", "Tenis Kortu", "Yangın Merdiveni", "Yüzme Havuzu (Açık)", "Yüzme Havuzu (Kapalı)",
    ],
  },
  {
    id: "neighborhood",
    label: "Muhit",
    icon: "📍",
    options: [
      "Alışveriş Merkezi", "Belediye", "Cami", "Denize Sıfır", "Eczane", "Eğlence Merkezi",
      "Fuar", "Hastane", "İlkokul - Ortaokul", "İş Merkezi", "Lise", "Market", "Park",
      "Sağlık Ocağı", "Semt Pazarı", "Spor Salonu", "Şehir Merkezi", "Üniversite",
    ],
  },
  {
    id: "transport",
    label: "Ulaşım",
    icon: "🚌",
    options: [
      "Anayol", "Avrasya Tüneli", "Boğaz Köprüleri", "Cadde", "Deniz Otobüsü", "Dolmuş",
      "E-5", "Havaalanı", "İskele", "Metro", "Metrobüs", "Minibüs", "Otobüs Durağı",
      "Sahil", "TEM", "Teleferik", "Tramvay", "Tren İstasyonu",
    ],
  },
  {
    id: "view",
    label: "Manzara",
    icon: "🌅",
    options: ["Boğaz", "Deniz", "Doğa", "Göl", "Havuz", "Park & Yeşil Alan", "Şehir"],
  },
  {
    id: "accessibility",
    label: "Engelliye Uygun",
    icon: "♿",
    options: [
      "Banyo", "Mutfak", "Tutamak / Korkuluk", "Asansör", "Giriş / Rampa", "Merdiven",
      "Park", "Tuvalet", "Yatak Odası",
    ],
  },
];

export type EmlakFeatures = Record<string, string[]>;

export function emlakFeatureCount(features?: EmlakFeatures | null): number {
  if (!features) return 0;
  return Object.values(features).reduce((sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0), 0);
}
