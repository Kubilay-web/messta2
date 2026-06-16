import { validateRequest } from "@/app/auth";
import { redirect } from "next/navigation";
import SessionProvider from "@/app/SessionProvider";
import Header from "@/app/projects/components/newsportal/Header";
import Footer from "@/app/projects/components/newsportal/Footer";



export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();

  // if (!session.user) redirect("/login");

  return (
    <SessionProvider value={session}>
      <div>
        <Header />
        {children}
        <Footer />
      </div>
    </SessionProvider>
  );
}
