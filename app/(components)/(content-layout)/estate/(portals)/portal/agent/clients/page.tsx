import { validateRequest } from "@/app/auth";
import { getAgentFromUserId, getAgentClients } from "../../../../actions/agent-portal";
import { redirect } from "next/navigation";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";
import { Users, Phone, Mail, Heart, Calendar, FileText } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Müşterilerim - Danışman Portalı" };

export default async function AgentClientsPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agent   = await getAgentFromUserId(user.id);
  const role    = (user as any).roleGayrimenkul as string;
  const isAdmin = role === "ADMIN" || role === "SUPER_ADMIN";
  if (!agent && !isAdmin) redirect("/login");

  const clients = agent ? await getAgentClients(agent.id) : [];

  const fmtDate = (d: Date | string | null) =>
    d ? new Date(d).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" }) : "—";

  const roleBadges = (c: any) => {
    const out: string[] = [];
    if (c.isBuyer) out.push("Alıcı");
    if (c.isSeller) out.push("Satıcı");
    if (c.isTenant) out.push("Kiracı");
    if (c.isLandlord) out.push("Mülk Sahibi");
    return out;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Users className="w-5 h-5 text-blue-600" />
        <h1 className="text-xl sm:text-2xl font-extrabold text-black">Müşterilerim</h1>
        <Badge variant="secondary" className="text-xs text-black">{clients.length}</Badge>
      </div>

      {clients.length === 0 ? (
        <Card>
          <CardContent className="p-10 text-center">
            <Users className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-black">Henüz müşteriniz yok.</p>
            <p className="text-xs text-gray-400 mt-1">
              Ziyaret veya sözleşme oluşturdukça müşterileriniz burada listelenir.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {clients.map((c: any) => (
            <Card key={c.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-blue-100 grid place-items-center text-blue-600 font-bold shrink-0">
                    {c.firstName?.[0]}{c.lastName?.[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-black truncate">{c.firstName} {c.lastName}</p>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {roleBadges(c).map((r) => (
                        <Badge key={r} variant="outline" className="text-[10px] text-black">{r}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1 text-sm">
                  {c.phone && <a href={`tel:${c.phone}`} className="flex items-center gap-2 text-blue-600 hover:underline"><Phone className="w-3.5 h-3.5" /> {c.phone}</a>}
                  {c.email && <a href={`mailto:${c.email}`} className="flex items-center gap-2 text-blue-600 hover:underline truncate"><Mail className="w-3.5 h-3.5 shrink-0" /> {c.email}</a>}
                </div>

                {(c.minBudget || c.maxBudget) && (
                  <p className="text-xs text-muted-foreground">
                    Bütçe: {c.minBudget ? c.minBudget.toLocaleString("tr-TR") : "0"}
                    {" – "}
                    {c.maxBudget ? c.maxBudget.toLocaleString("tr-TR") : "∞"} {c.currency}
                  </p>
                )}
                {c.preferredCities?.length > 0 && (
                  <p className="text-xs text-muted-foreground">Tercih: {c.preferredCities.join(", ")}</p>
                )}

                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground border-t pt-2">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-blue-600" /> {c.visits} ziyaret</span>
                  <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5 text-blue-600" /> {c.contracts} sözleşme</span>
                  <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-blue-600" /> {c._count?.interests ?? 0} favori</span>
                </div>
                <p className="text-[11px] text-gray-400">Son temas: {fmtDate(c.last)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
