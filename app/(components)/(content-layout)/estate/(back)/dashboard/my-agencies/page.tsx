import { Building2 } from "lucide-react";
import { getMyAgencies } from "../../../actions/agencies";
import MyAgenciesGrid from "./_components/MyAgenciesGrid";

export const dynamic = "force-dynamic";

export default async function MyAgenciesPage() {
  const { agencies, activeId } = await getMyAgencies();

  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 py-5">
      <div className="mx-auto max-w-5xl">
        <div className="mb-5 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/20">
            <Building2 className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-2xl font-black tracking-tight">Ofislerim</h1>
            <p className="text-sm text-slate-500">
              {agencies.length} ofis · aralarında geçiş yapabilirsiniz
            </p>
          </div>
        </div>

        <MyAgenciesGrid agencies={agencies as any[]} activeId={activeId} />
      </div>
    </div>
  );
}
