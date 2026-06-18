import { redirect } from "next/navigation";
import { validateRequest } from "@/app/auth";
import prisma from "@/app/lib/prisma";
import { getCategoryTree, getUserStore } from "../data";
import ListingForm from "../components/listing-form";

export const dynamic = "force-dynamic";

export default async function IlanVerPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login?redirect=/sahibinden/ilan-ver");

  const [categories, dbUser, store] = await Promise.all([
    getCategoryTree(),
    prisma.user.findUnique({ where: { id: user.id }, select: { displayName: true, name: true, phone: true } }),
    getUserStore(user.id),
  ]);

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-1 text-2xl font-bold text-gray-800">Ücretsiz İlan Ver</h1>
      <p className="mb-5 text-sm text-gray-500">Birkaç adımda ilanını yayınla.</p>
      <ListingForm
        categories={categories}
        userStore={store ? { id: store.id, name: store.name } : null}
        defaultContact={{
          name: dbUser?.displayName || dbUser?.name || user.displayName || "",
          phone: dbUser?.phone || "",
        }}
      />
    </div>
  );
}
