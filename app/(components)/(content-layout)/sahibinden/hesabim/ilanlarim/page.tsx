import Link from "next/link";
import { validateRequest } from "@/app/auth";
import { getUserListings, getDopingPackages, getListingSubscriptionPlans } from "../../data";
import MyListingRow from "../../components/my-listing-row";
import type { ListingPlanVM } from "../../components/listing-subscribe-dialog";
import { walletBalance } from "../../wallet";
import { paypalEnabled } from "../../lib/paypal";
import type { BillingInterval } from "../../lib/billing";

export const dynamic = "force-dynamic";

export default async function IlanlarimPage() {
  const { user } = await validateRequest();
  if (!user) return null;
  const [listings, dopingPackages, subPlans, balance] = await Promise.all([
    getUserListings(user.id),
    getDopingPackages(),
    getListingSubscriptionPlans(),
    walletBalance(user.id),
  ]);

  const subscriptionPlans: ListingPlanVM[] = subPlans.map((p) => ({
    id: p.id,
    name: p.name,
    kind: p.kind as "DOPING_AUTO" | "LISTING_HOSTING",
    interval: p.interval as BillingInterval,
    intervalCount: p.intervalCount,
    price: p.price,
    currency: p.currency,
    trialDays: p.trialDays,
    features: p.features,
    badge: p.badge,
    dopingType: p.dopingType,
  }));

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">İlanlarım ({listings.length})</h1>
        <Link
          href="/sahibinden/ilan-ver"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          + Yeni İlan
        </Link>
      </div>

      {listings.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center text-gray-500">
          Henüz ilanınız yok.
        </div>
      ) : (
        <div className="space-y-3">
          {listings.map((l) => (
            <MyListingRow
              key={l.id}
              listing={l}
              dopingPackages={dopingPackages}
              subscriptionPlans={subscriptionPlans}
              walletBalance={balance}
              paypalEnabled={paypalEnabled}
            />
          ))}
        </div>
      )}
    </div>
  );
}
