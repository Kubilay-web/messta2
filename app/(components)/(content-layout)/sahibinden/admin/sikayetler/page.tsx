import { getReports } from "../../data";
import AdminReportRow from "../../components/admin-report-row";

export const dynamic = "force-dynamic";

export default async function AdminSikayetler() {
  const reports = await getReports();

  return (
    <div>
      <h1 className="mb-3 text-lg font-bold text-gray-800">Şikayetler ({reports.length})</h1>
      {reports.length === 0 ? (
        <p className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
          Şikayet yok.
        </p>
      ) : (
        <div className="space-y-3">
          {reports.map((r) => (
            <AdminReportRow key={r.id} report={r} />
          ))}
        </div>
      )}
    </div>
  );
}
