import { FiltersQueryType } from "@/app/lib/types";
import { getAllCategories } from "@/app/queries/category";
import { getAllOfferTags } from "@/app/queries/offer-tag";
import CategoryFilter from "./filters/category/category-filter";
import OfferFilter from "./filters/offer/offer-filter";
import SizeFilter from "./filters/size/size-filter";
import FiltersHeader from "./filters/header";
import PriceFilter from "./filters/price/price";
import { getFilteredColors } from "@/app/queries/color";
import ColorFilter from "./filters/color/color-filter";

export default async function ProductFilters({
  queries,
  storeUrl,
}: {
  queries: FiltersQueryType;
  storeUrl?: string;
}) {
  const categories = await getAllCategories(storeUrl);
  const offers = await getAllOfferTags(storeUrl);

  return (
    <div className="scrollbar h-full w-48 flex-none basis-[196px] overflow-auto overflow-x-hidden pb-2.5 pr-6 transition-transform">
      <FiltersHeader queries={queries} />
      {/* Filters */}
      <div className="w-40 border-t md:w-44">
        <PriceFilter />
        <CategoryFilter categories={categories} />
        <ColorFilter queries={queries} storeUrl={storeUrl} />
        <OfferFilter offers={offers} />
        <SizeFilter queries={queries} storeUrl={storeUrl} />
      </div>
    </div>
  );
}
