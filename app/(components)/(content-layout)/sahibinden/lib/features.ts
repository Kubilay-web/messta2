// ============================================================
// Sahibinden tarzı GRUPLU emlak özellikleri (İç / Dış / Muhit / Ulaşım / Manzara).
// `PropertyRealEstate.features` String[] alanında anahtarlar tutulur.
// Detay, form ve filtre bu tek kaynaktan beslenir.
// ============================================================

export type FeatureItem = { key: string; label: string };
export type FeatureGroup = { key: string; label: string; icon: string; items: FeatureItem[] };

export const FEATURE_GROUPS: FeatureGroup[] = [
  {
    key: "interior",
    label: "İç Özellikler",
    icon: "Sofa",
    items: [
      { key: "adsl", label: "ADSL" },
      { key: "alarm", label: "Alarm (Hırsız)" },
      { key: "ankastre", label: "Ankastre Mutfak" },
      { key: "barbeku", label: "Barbekü" },
      { key: "beyaz_esya", label: "Beyaz Eşya" },
      { key: "buzdolabi", label: "Buzdolabı" },
      { key: "bulasik_mak", label: "Bulaşık Makinesi" },
      { key: "camasir_mak", label: "Çamaşır Makinesi" },
      { key: "dusakabin", label: "Duşakabin" },
      { key: "ebeveyn_banyo", label: "Ebeveyn Banyosu" },
      { key: "firin", label: "Fırın" },
      { key: "giyinme_odasi", label: "Giyinme Odası" },
      { key: "gomme_dolap", label: "Gömme Dolap" },
      { key: "jakuzi", label: "Jakuzi" },
      { key: "kartonpiyer", label: "Kartonpiyer" },
      { key: "klima", label: "Klima" },
      { key: "laminat", label: "Laminat Zemin" },
      { key: "marley", label: "Marley" },
      { key: "mutfak_ankastre", label: "Mutfak (Ankastre)" },
      { key: "parke", label: "Parke Zemin" },
      { key: "panjur", label: "Panjur / Jaluzi" },
      { key: "seramik", label: "Seramik Zemin" },
      { key: "set_ustu_ocak", label: "Set Üstü Ocak" },
      { key: "sömine", label: "Şömine" },
      { key: "spot", label: "Spot Aydınlatma" },
      { key: "teras", label: "Teras" },
      { key: "vestiyer", label: "Vestiyer" },
      { key: "wc", label: "Çift WC" },
    ],
  },
  {
    key: "exterior",
    label: "Dış Özellikler",
    icon: "Building2",
    items: [
      { key: "asansor", label: "Asansör" },
      { key: "buhar_odasi", label: "Buhar Odası" },
      { key: "cardak", label: "Çardak" },
      { key: "cocuk_oyun", label: "Çocuk Oyun Parkı" },
      { key: "guvenlik", label: "Güvenlik" },
      { key: "hidrofor", label: "Hidrofor" },
      { key: "isi_yalitim", label: "Isı Yalıtımı" },
      { key: "jenerator", label: "Jeneratör" },
      { key: "kamera", label: "Kamera Sistemi" },
      { key: "kapali_garaj", label: "Kapalı Garaj" },
      { key: "kapici", label: "Kapıcı" },
      { key: "kgs", label: "Kapalı Otopark (KGS)" },
      { key: "musluk", label: "Müstakil Su" },
      { key: "otopark_acik", label: "Açık Otopark" },
      { key: "sauna", label: "Sauna" },
      { key: "ses_yalitim", label: "Ses Yalıtımı" },
      { key: "spor_alani", label: "Spor Alanı" },
      { key: "su_deposu", label: "Su Deposu" },
      { key: "tenis_kortu", label: "Tenis Kortu" },
      { key: "yangin_merdiveni", label: "Yangın Merdiveni" },
      { key: "yuzme_havuzu_acik", label: "Yüzme Havuzu (Açık)" },
      { key: "yuzme_havuzu_kapali", label: "Yüzme Havuzu (Kapalı)" },
    ],
  },
  {
    key: "neighborhood",
    label: "Muhit",
    icon: "Landmark",
    items: [
      { key: "alisveris_merkezi", label: "Alışveriş Merkezi" },
      { key: "belediye", label: "Belediye" },
      { key: "cami", label: "Cami" },
      { key: "carsi_pazar", label: "Çarşı / Pazar" },
      { key: "deniz", label: "Deniz" },
      { key: "eczane", label: "Eczane" },
      { key: "egitim_kurumlari", label: "Eğitim Kurumları" },
      { key: "hastane", label: "Hastane" },
      { key: "ilkokul", label: "İlkokul-Ortaokul" },
      { key: "lise", label: "Lise" },
      { key: "market", label: "Market" },
      { key: "park", label: "Park" },
      { key: "saglik_ocagi", label: "Sağlık Ocağı" },
      { key: "spor_salonu", label: "Spor Salonu" },
      { key: "universite", label: "Üniversite" },
    ],
  },
  {
    key: "transport",
    label: "Ulaşım",
    icon: "TrainFront",
    items: [
      { key: "anayol", label: "Anayol" },
      { key: "avrupa_otoyolu", label: "Otoyol (TEM/E-5)" },
      { key: "cevre_yolu", label: "Çevre Yolu" },
      { key: "deniz_otobusu", label: "Deniz Otobüsü" },
      { key: "dolmus", label: "Dolmuş" },
      { key: "havaalani", label: "Havaalanı" },
      { key: "iskele", label: "İskele" },
      { key: "metro", label: "Metro" },
      { key: "metrobus", label: "Metrobüs" },
      { key: "minibus", label: "Minibüs" },
      { key: "otobus_duragi", label: "Otobüs Durağı" },
      { key: "sahil", label: "Sahil" },
      { key: "tramvay", label: "Tramvay" },
      { key: "tren_istasyonu", label: "Tren İstasyonu" },
    ],
  },
  {
    key: "view",
    label: "Manzara",
    icon: "Mountain",
    items: [
      { key: "manzara_bogaz", label: "Boğaz" },
      { key: "manzara_deniz", label: "Deniz" },
      { key: "manzara_doga", label: "Doğa" },
      { key: "manzara_gol", label: "Göl" },
      { key: "manzara_sehir", label: "Şehir" },
    ],
  },
  {
    key: "accessibility",
    label: "Engelliye Uygun",
    icon: "Accessibility",
    items: [
      { key: "eng_arac_park", label: "Araç Park Yeri" },
      { key: "eng_asansor", label: "Asansör" },
      { key: "eng_banyo", label: "Banyo" },
      { key: "eng_giris", label: "Giriş / Rampa" },
      { key: "eng_merdiven", label: "Merdiven" },
      { key: "eng_mutfak", label: "Mutfak" },
      { key: "eng_tutamak", label: "Tutamak" },
    ],
  },
];

// Hızlı arama: anahtar → etiket
export const FEATURE_LABEL: Record<string, string> = Object.fromEntries(
  FEATURE_GROUPS.flatMap((g) => g.items.map((i) => [i.key, i.label])),
);

export const ALL_FEATURE_KEYS = FEATURE_GROUPS.flatMap((g) => g.items.map((i) => i.key));

/** Bir özellik anahtar listesini gruplara böler (detay sayfası için). */
export function groupFeatures(keys: string[]): { group: FeatureGroup; items: FeatureItem[] }[] {
  const set = new Set(keys);
  return FEATURE_GROUPS.map((group) => ({
    group,
    items: group.items.filter((i) => set.has(i.key)),
  })).filter((g) => g.items.length > 0);
}
