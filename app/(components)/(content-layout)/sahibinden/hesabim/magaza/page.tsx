import Link from "next/link";
import { validateRequest } from "@/app/auth";
import { getUserStore } from "../../data";
import StoreForm from "../../components/store-form";

export const dynamic = "force-dynamic";

export default async function MagazamPage() {
  const { user } = await validateRequest();
  if (!user) return null;
  const store = await getUserStore(user.id);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">{store ? "Mağazam" : "Mağaza Oluştur"}</h1>
        {store && (
          <Link
            href={`/sahibinden/magaza/${store.slug}`}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Vitrini Görüntüle
          </Link>
        )}
      </div>
      <StoreForm initial={store ?? undefined} />
    </div>
  );
}
