import { validateRequest } from "@/app/auth";
import BulkUpload from "../../components/bulk-upload";

export const dynamic = "force-dynamic";

export default async function TopluYuklePage() {
  const { user } = await validateRequest();
  if (!user) return null;
  return <BulkUpload />;
}
