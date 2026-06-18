// Sahibinden ortak tipleri

export interface ListingFilters {
  q?: string;
  categorySlug?: string;
  type?: string;
  city?: string;
  district?: string;
  minPrice?: number;
  maxPrice?: number;
  currency?: string;
  sort?: "newest" | "oldest" | "price_asc" | "price_desc";
  page?: number;
  perPage?: number;
  attrs?: Record<string, string>;
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
}

export interface ActionResult<T = unknown> {
  ok: boolean;
  error?: string;
  data?: T;
}
