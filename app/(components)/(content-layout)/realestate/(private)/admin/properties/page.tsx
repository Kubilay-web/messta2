import Filters from "../../../components/filters";
import PageTitle from "../../../components/page-title";
import React, { Suspense } from "react";
import PropertiesTable from "../../user/properties/_components/properties-table";
import Loader from "../../../components/loader";
import { requireRealestateAdmin } from "../../../lib/auth";

async function AdminPropertiesPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireRealestateAdmin();

  // ✅ searchParams promise'ını çöz
  const resolvedSearchParams = await searchParams;
  
  // Düz objeye çevir
  const params: Record<string, string> = {};
  
  Object.entries(resolvedSearchParams).forEach(([key, value]) => {
    if (typeof value === 'string' && value.trim() !== '') {
      params[key] = value;
    } else if (Array.isArray(value) && value.length > 0) {
      // İlk değeri al
      params[key] = value[0];
    }
  });

  // Debug için
  console.log("AdminPropertiesPage - searchParams:", params);

  const key = JSON.stringify(params);

  return (
    <div>
      <PageTitle title="Admin / Properties" />
      <Filters searchParams={params} />
      <Suspense fallback={<Loader />} key={key}>
        <PropertiesTable searchParams={params} fromAdmin={true} />
      </Suspense>
    </div>
  );
}

export default AdminPropertiesPage;