import type { Metadata } from "next";
import Shell from "./components/Shell";
import { getMarketUser } from "./lib/auth";

export const metadata: Metadata = {
  title: "sahibinden — Emlak İlanları",
  description: "Satılık ve kiralık emlak ilanları. Türkiye'nin en gelişmiş emlak pazar yeri.",
};

export default async function SahibindenLayout({ children }: { children: React.ReactNode }) {
  const user = await getMarketUser();
  return <Shell user={user}>{children}</Shell>;
}
