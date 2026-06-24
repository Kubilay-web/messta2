// Sahibinden ortak tipleri

export interface ListingFilters {
  q?: string;
  categorySlug?: string;
  type?: string;
  city?: string;
  district?: string;
  neighborhood?: string;
  minPrice?: number;
  maxPrice?: number;
  currency?: string;
  sort?: "newest" | "oldest" | "price_asc" | "price_desc" | "area_asc" | "area_desc";
  page?: number;
  perPage?: number;
  /** Tam eşleşen attribute filtreleri (select / boolean / text). */
  attrs?: Record<string, string>;
  /** Çoklu-seçim attribute filtreleri (örn. rooms: ["2+1","3+1"]) → $in. */
  attrIn?: Record<string, string[]>;
  /** Sayısal attribute aralık filtreleri (örn. grossArea, buildingAge, km). */
  attrRanges?: Record<string, { min?: number; max?: number }>;
  /** Harita alanı (bounding box) filtresi. */
  bbox?: { south: number; west: number; north: number; east: number };
  userId?: string;
  onlyActive?: boolean;
}

export interface ListingFormInput {
  id?: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  type: string;
  categoryId: string;
  storeId?: string | null;
  agentId?: string | null;
  city?: string;
  district?: string;
  neighborhood?: string;
  address?: string;
  latitude?: number | null;
  longitude?: number | null;
  images: string[];
  floorPlans?: string[];
  videoUrl?: string | null;
  tourImageUrl?: string | null;
  attributes?: Record<string, unknown>;
  contactName?: string;
  contactPhone?: string;
  showPhone?: boolean;
  isUrgent?: boolean;
  isNegotiable?: boolean;
  acceptsSwap?: boolean;
  securePayment?: boolean;
  // Kısa dönem kiralama (günlük/haftalık rezervasyon)
  rentable?: boolean;
  dailyPrice?: number | null;
  weeklyPrice?: number | null;
  monthlyPrice?: number | null;
  cleaningFee?: number | null;
  rentDeposit?: number | null;
  minNights?: number | null;
  maxNights?: number | null;
  maxGuests?: number | null;
  instantBook?: boolean;
  cancellationPolicy?: string; // FLEXIBLE | MODERATE | STRICT
  houseRules?: string | null;
  checkInInstructions?: string | null;
}

export interface ActionResult<T = unknown> {
  ok: boolean;
  error?: string;
  data?: T;
}
