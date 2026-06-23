import { validateRequest } from "@/app/auth";
import { getBlockedUsers } from "../../data";
import BlockButton from "../../components/block-button";

export const dynamic = "force-dynamic";

export default async function EngellenenlerPage() {
  const { user } = await validateRequest();
  if (!user) return null;
  const blocked = await getBlockedUsers(user.id);

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold text-gray-800">Engellenen Kullanıcılar ({blocked.length})</h1>
      {blocked.length === 0 ? (
        <p className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-600">
          Engellediğiniz kullanıcı yok.
        </p>
      ) : (
        <div className="space-y-2">
          {blocked.map((b: any) => (
            <div key={b.blockId} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-bold text-gray-700">
                {(b.displayName || b.username || "U")[0]?.toUpperCase()}
              </div>
              <span className="flex-1 text-sm font-medium text-gray-800">{b.displayName || b.username || "Üye"}</span>
              <div className="w-40">
                <BlockButton targetUserId={b.id} initialBlocked isLoggedIn />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
