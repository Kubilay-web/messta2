import Link from "next/link";
import { validateRequest } from "@/app/auth";
import { getUserFavorites } from "../../data";
import ListingCard from "../../components/listing-card";

export const dynamic = "force-dynamic";

export default async function FavorilerimPage() {
  const { user } = await validateRequest();
  if (!user) return null;
  const favorites = await getUserFavorites(user.id);

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold text-gray-800">Favorilerim ({favorites.length})</h1>
      {favorites.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center text-gray-500">
          <p>Henüz favori ilanınız yok.</p>
          <Link href="/sahibinden/ara" className="mt-3 inline-block font-semibold text-yellow-600 hover:underline">
            İlanlara göz at →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {favorites.map((l: any) => (
            <ListingCard key={l.id} listing={l} favorited />
          ))}
        </div>
      )}
    </div>
  );
}
