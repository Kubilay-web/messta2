import { validateRequest } from "@/app/auth";
import { redirect } from "next/navigation";
import SessionProvider from "@/app/SessionProvider";
import AdminNavbar from "./AdminNavbar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Session'ı al
  const session = await validateRequest();

  // 2. Role kontrolü
  const role = session.user?.role?.toUpperCase();
  // if (role !== "ADMIN") {
  //   console.log("Unauthorized user, redirecting:", role);
  //   redirect("/apps/jobportal/job");
  // }

  // 3. Layout render
  return (
    <SessionProvider value={session}>
      <AdminNavbar />
      {children}
    </SessionProvider>
  );
}
