import SearchResults from "../../components/search-results";

export const dynamic = "force-dynamic";

export default async function KategoriPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);
  return <SearchResults searchParams={sp} categorySlug={slug} />;
}
