import Link from "next/link";
import { validateRequest } from "@/app/auth";
import { getNotifications } from "../../data";
import { markNotificationsRead } from "../../actions";
import { timeAgo } from "../../lib/format";

export const dynamic = "force-dynamic";

const ICON: Record<string, string> = {
  NEW_MESSAGE: "✉️",
  LISTING_APPROVED: "✅",
  LISTING_REJECTED: "⛔",
  PRICE_DROP: "📉",
  FAVORITE_SOLD: "⭐",
  SAVED_SEARCH_MATCH: "🔍",
  DOPING_EXPIRING: "🚀",
};

export default async function BildirimlerPage() {
  const { user } = await validateRequest();
  if (!user) return null;
  const notifications = await getNotifications(user.id);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Bildirimler</h1>
        {notifications.some((n) => !n.isRead) && (
          <form action={markNotificationsRead}>
            <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">
              Tümünü okundu işaretle
            </button>
          </form>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center text-gray-500">
          Henüz bildiriminiz yok.
        </div>
      ) : (
        <ul className="space-y-2">
          {notifications.map((n) => {
            const inner = (
              <div
                className={`flex items-start gap-3 rounded-xl border p-3 ${
                  n.isRead ? "border-gray-200 bg-white" : "border-yellow-300 bg-yellow-50"
                }`}
              >
                <span className="text-xl">{ICON[n.type] ?? "🔔"}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-800">{n.title}</p>
                  {n.body && <p className="truncate text-sm text-gray-500">{n.body}</p>}
                  <p className="text-xs text-gray-600">{timeAgo(n.createdAt)}</p>
                </div>
                {!n.isRead && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-500" />}
              </div>
            );
            return (
              <li key={n.id}>
                {n.link ? <Link href={n.link}>{inner}</Link> : inner}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
