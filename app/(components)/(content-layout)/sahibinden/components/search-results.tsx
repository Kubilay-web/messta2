import Link from "next/link";
import { validateRequest } from "@/app/auth";
import { getCategoryTree, getListings, getUserFavoriteIds, type CategoryNode } from "../data";
import { parseFilters } from "../lib/parse-filters";
import ListingCard from "./listing-card";
import Filters from "./filters";
import MobileFilters from "./mobile-filters";
import ResultsToolbar from "./results-toolbar";
import ResultsMap from "./results-map";
import SaveSearchButton from "./save-search-button";
import { formatPrice } from "../lib/format";

type SP = Record<string, string | string[] | undefined>;

function findContext(tree: CategoryNode[], slug?: string) {
  if (!slug) return { node: null, topSlug: undefined, subCategories: [] as CategoryNode[] };
  for (const top of tree) {
    if (top.slug === slug) return { node: top, topSlug: top.slug, subCategories: top.children };
    for (const sub of top.children) {
      if (sub.slug === slug) return { node: sub, topSlug: top.slug, subCategories: sub.children };
      for (const leaf of sub.children) {
        if (leaf.slug === slug) return { node: leaf, topSlug: top.slug, subCategories: sub.children };
      }
    }
  }
  return { node: null, topSlug: undefined, subCategories: [] as CategoryNode[] };
}

export default async function SearchResults({
  searchParams,
  categorySlug,
  heading,
}: {
  searchParams: SP;
  categorySlug?: string;
  heading?: string;
}) {
  const tree = await getCategoryTree();
  const { node, topSlug, subCategories } = findContext(tree, categorySlug);
  const filters = parseFilters(searchParams, categorySlug, topSlug);

  const { user } = await validateRequest();
  const [{ items, total, page, pages }, favIds] = await Promise.all([
    getListings(filters),
    user ? getUserFavoriteIds(user.id) : Promise.resolve(new Set<string>()),
  ]);

  const view = (Array.isArray(searchParams.view) ? searchParams.view[0] : searchParams.view) ?? "grid";
  const title = heading ?? node?.name ?? (filters.q ? `"${filters.q}" için sonuçlar` : "Tüm İlanlar");

  return (
    <div>
      {/* breadcrumb */}
      <nav className="mb-3 flex flex-wrap items-center gap-1 text-xs text-gray-500">
        <Link href="/sahibinden" className="hover:text-yellow-600">Anasayfa</Link>
        <span>/</span>
        <span className="font-medium text-gray-700">{title}</span>
      </nav>

      <div className="mb-3 flex items-center justify-between gap-2">
        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
        <SaveSearchButton isLoggedIn={!!user} />
      </div>

      <div className="mb-3 lg:hidden">
        <MobileFilters topSlug={topSlug} subCategories={subCategories.map((c) => ({ name: c.name, slug: c.slug }))} />
      </div>

      <div className="flex gap-5">
        <div className="hidden w-64 shrink-0 lg:block">
          <Filters topSlug={topSlug} subCategories={subCategories.map((c) => ({ name: c.name, slug: c.slug }))} />
        </div>

        <div className="min-w-0 flex-1">
          <ResultsToolbar total={total} />

          <ResultsMap
            markers={items
              .filter((l) => typeof l.latitude === "number" && typeof l.longitude === "number")
              .map((l) => ({
                id: l.id,
                lat: l.latitude as number,
                lng: l.longitude as number,
                title: l.title,
                price: formatPrice(l.price, l.currency),
                href: `/sahibinden/ilan/${l.id}`,
              }))}
          />

          {items.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center text-gray-500">
              Aradığınız kriterlere uygun ilan bulunamadı.
            </div>
          ) : view === "list" ? (
            <div className="space-y-3">
              {items.map((l) => (
                <ListingCard key={l.id} listing={l} favorited={favIds.has(l.id)} view="list" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
              {items.map((l) => (
                <ListingCard key={l.id} listing={l} favorited={favIds.has(l.id)} />
              ))}
            </div>
          )}

          {pages > 1 && <Pagination page={page} pages={pages} searchParams={searchParams} />}
        </div>
      </div>
    </div>
  );
}

function Pagination({ page, pages, searchParams }: { page: number; pages: number; searchParams: SP }) {
  function href(p: number) {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([k, v]) => {
      if (typeof v === "string") params.set(k, v);
      else if (Array.isArray(v) && v[0]) params.set(k, v[0]);
    });
    params.set("page", String(p));
    return `?${params.toString()}`;
  }

  const nums: number[] = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(pages, start + 4);
  for (let i = start; i <= end; i++) nums.push(i);

  return (
    <div className="mt-6 flex items-center justify-center gap-1">
      {page > 1 && (
        <Link href={href(page - 1)} className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm hover:bg-gray-50">
          ‹
        </Link>
      )}
      {nums.map((n) => (
        <Link
          key={n}
          href={href(n)}
          className={`rounded-lg border px-3.5 py-2 text-sm ${
            n === page
              ? "border-yellow-400 bg-yellow-400 font-bold text-gray-900"
              : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          {n}
        </Link>
      ))}
      {page < pages && (
        <Link href={href(page + 1)} className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm hover:bg-gray-50">
          ›
        </Link>
      )}
    </div>
  );
}
