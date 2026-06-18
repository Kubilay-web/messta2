import type { ListingFilters } from "./types";
import { CATEGORY_ATTRIBUTES } from "./categories";

type SP = Record<string, string | string[] | undefined>;

function one(v: string | string[] | undefined): string | undefined {
  if (Array.isArray(v)) return v[0];
  return v;
}

/** searchParams -> ListingFilters. topSlug: filtrelenebilir attribute'ları bilmek için kök kategori slug'ı. */
export function parseFilters(sp: SP, categorySlug?: string, topSlug?: string): ListingFilters {
  const attrs: Record<string, string> = {};
  if (topSlug && CATEGORY_ATTRIBUTES[topSlug]) {
    for (const f of CATEGORY_ATTRIBUTES[topSlug]) {
      if (f.filterable) {
        const val = one(sp[`a_${f.key}`]);
        if (val) attrs[f.key] = val;
      }
    }
  }

  const minPrice = one(sp.minPrice);
  const maxPrice = one(sp.maxPrice);
  const page = one(sp.page);

  return {
    q: one(sp.q),
    categorySlug,
    type: one(sp.type),
    city: one(sp.city),
    district: one(sp.district),
    currency: one(sp.currency),
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    sort: (one(sp.sort) as ListingFilters["sort"]) || "newest",
    page: page ? Number(page) : 1,
    perPage: 24,
    attrs,
  };
}
