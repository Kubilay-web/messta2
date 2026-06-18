import SearchResults from "../components/search-results";

export const dynamic = "force-dynamic";

export default async function AraPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  return <SearchResults searchParams={sp} />;
}
