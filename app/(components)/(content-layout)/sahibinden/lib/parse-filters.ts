import type { ListingFilters } from "./types";
import { CATEGORY_ATTRIBUTES } from "./categories";

type SP = Record<string, string | string[] | undefined>;

function one(v: string | string[] | undefined): string | undefined {
  if (Array.isArray(v)) return v[0];
  return v;
}

/** searchParams -> ListingFilters. topSlug: filtrelenebilir attribute'ları bilmek için kök kategori slug'ı. */
function parseBbox(v?: string): ListingFilters["bbox"] {
  if (!v) return undefined;
  const parts = v.split(",").map(Number);
  if (parts.length !== 4 || parts.some((n) => Number.isNaN(n))) return undefined;
  const [south, west, north, east] = parts;
  return { south, west, north, east };
}

export function parseFilters(sp: SP, categorySlug?: string, topSlug?: string): ListingFilters {
  const attrs: Record<string, string> = {};
  const attrIn: Record<string, string[]> = {};
  const attrRanges: Record<string, { min?: number; max?: number }> = {};

  if (topSlug && CATEGORY_ATTRIBUTES[topSlug]) {
    for (const f of CATEGORY_ATTRIBUTES[topSlug]) {
      if (!f.filterable) continue;

      if (f.range && f.type === "number") {
        const min = one(sp[`a_${f.key}_min`]);
        const max = one(sp[`a_${f.key}_max`]);
        if (min || max) {
          attrRanges[f.key] = {
            min: min ? Number(min) : undefined,
            max: max ? Number(max) : undefined,
          };
        }
      } else if (f.multi) {
        // virgülle ayrılmış çoklu değer (örn. "2+1,3+1")
        const raw = one(sp[`a_${f.key}`]);
        const values = (raw ? raw.split(",") : []).map((s) => s.trim()).filter(Boolean);
        if (values.length) attrIn[f.key] = values;
      } else {
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
    neighborhood: one(sp.neighborhood),
    currency: one(sp.currency),
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    sort: (one(sp.sort) as ListingFilters["sort"]) || "newest",
    page: page ? Number(page) : 1,
    perPage: 24,
    attrs,
    attrIn,
    attrRanges,
    bbox: parseBbox(one(sp.bbox)),
  };
}
