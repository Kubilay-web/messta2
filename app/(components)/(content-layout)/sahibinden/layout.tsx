import type { Metadata } from "next";
import { validateRequest } from "@/app/auth";
import Header, { type HeaderUser } from "./components/header";
import Footer from "./components/footer";
import IncomingCallListener from "./components/incoming-call";
import { getCategoryTree, getUnreadMessageCount, getUnreadNotificationCount } from "./data";

export const metadata: Metadata = {
  title: "sahibinden.com — Alışverişin Adresi",
  description: "İkinci el ve sıfır; emlak, vasıta, alışveriş ilanları.",
};

export default async function SahibindenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [{ user }, categories] = await Promise.all([
    validateRequest(),
    getCategoryTree(),
  ]);

  const headerUser: HeaderUser | null = user
    ? {
        id: user.id,
        name: user.displayName || user.username || "Hesabım",
        avatarUrl: user.avatarUrl ?? null,
        isAdmin: (user as any).role === "ADMIN",
      }
    : null;

  const [unread, notifUnread] = user
    ? await Promise.all([getUnreadMessageCount(user.id), getUnreadNotificationCount(user.id)])
    : [0, 0];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900" style={{ colorScheme: "light" }}>
      <Header user={headerUser} categories={categories} unread={unread} notifUnread={notifUnread} />
      <main className="mx-auto w-full max-w-7xl px-3 py-4 sm:px-4 sm:py-6">{children}</main>
      <Footer />
      <IncomingCallListener enabled={!!user} />
    </div>
  );
}
