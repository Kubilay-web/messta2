import Link from "next/link";
import { validateRequest } from "@/app/auth";
import { getUserStoreAgents } from "../../data";
import AgentManager from "../../components/agent-manager";

export const dynamic = "force-dynamic";

export default async function DanismanlarPage() {
  const { user } = await validateRequest();
  if (!user) return null;
  const { store, agents } = await getUserStoreAgents(user.id);

  if (!store) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center text-gray-600">
        <p>Danışman eklemek için önce mağaza/ofis oluşturmalısınız.</p>
        <Link href="/sahibinden/hesabim/magaza" className="mt-3 inline-block font-semibold text-yellow-600 hover:underline">
          Mağaza Oluştur →
        </Link>
      </div>
    );
  }

  return <AgentManager agents={agents} />;
}
