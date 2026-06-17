// Üyelik planları (bireysel & kurumsal). Aylık; kontör + ilan kotası içerir.

export type MembershipPlan = {
  id: string; // FREE | BIREYSEL_PLUS | PRO | KURUMSAL
  name: string;
  price: number; // USD / ay (PayPal)
  credits: number; // her dönem yüklenen kontör
  listingQuota: number; // aktif ilan kotası (0 = sınırsız)
  accent: string;
  badge?: string;
  features: string[];
};

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: "BIREYSEL_PLUS",
    name: "Bireysel Plus",
    price: 6.99,
    credits: 100,
    listingQuota: 10,
    accent: "from-sky-500 to-blue-600",
    features: ["10 aktif ilan hakkı", "100 doping kontörü / ay", "Öne çıkan profil"],
  },
  {
    id: "PRO",
    name: "Pro",
    price: 19.99,
    credits: 350,
    listingQuota: 50,
    accent: "from-amber-500 to-orange-600",
    badge: "Popüler",
    features: ["50 aktif ilan hakkı", "350 doping kontörü / ay", "Öncelikli destek", "Mağaza vitrini"],
  },
  {
    id: "KURUMSAL",
    name: "Kurumsal",
    price: 49.99,
    credits: 1000,
    listingQuota: 0,
    accent: "from-violet-600 to-fuchsia-600",
    badge: "Ofisler için",
    features: ["Sınırsız aktif ilan", "1000 doping kontörü / ay", "Kurumsal mağaza sayfası", "Toplu ilan & öncelik"],
  },
];

export function getMembershipPlan(id: string): MembershipPlan | undefined {
  return MEMBERSHIP_PLANS.find((p) => p.id === id);
}

export const PLAN_LABEL: Record<string, string> = {
  FREE: "Ücretsiz",
  BIREYSEL_PLUS: "Bireysel Plus",
  PRO: "Pro",
  KURUMSAL: "Kurumsal",
};
