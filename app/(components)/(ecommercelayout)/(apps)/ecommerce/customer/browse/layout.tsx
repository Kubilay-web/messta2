import { validateRequest } from "@/app/auth";
import { redirect } from "next/navigation";
import SessionProvider from "@/app/SessionProvider";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();

  if (!session.user) redirect("/");

  return (
    <SessionProvider value={session}>
      <div>
        <div>{children}</div>
      </div>
    </SessionProvider>
  );
}
