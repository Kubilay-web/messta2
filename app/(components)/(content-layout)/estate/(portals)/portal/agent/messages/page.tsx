import { validateRequest } from "@/app/auth";
import { getAgentFromUserId, getAgentMessages } from "../../../../actions/agent-portal";
import { redirect } from "next/navigation";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Bell } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Mesajlar - Danışman Portalı" };

const fromLabel: Record<string, string> = {
  Management: "Yönetim", Agent: "Danışman", Client: "Müşteri",
};

export default async function AgentMessagesPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agent   = await getAgentFromUserId(user.id);
  const role    = (user as any).roleGayrimenkul as string;
  const isAdmin = role === "ADMIN" || role === "SUPER_ADMIN";
  if (!agent && !isAdmin) redirect("/login");

  const messages = agent ? await getAgentMessages(agent.agencyId) : [];

  const fmtDate = (d: Date | string) =>
    new Date(d).toLocaleDateString("tr-TR", {
      day: "numeric", month: "long", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Mesajlar &amp; Duyurular</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Ofisten gelen tüm hatırlatıcı ve duyurular.
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-10 text-center text-sm text-muted-foreground">
          Henüz mesaj bulunmuyor.
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <Card key={m.id}>
              <CardHeader className="pb-2">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <CardTitle className="text-base font-semibold">{m.subject}</CardTitle>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant="outline" className="text-xs">
                      <Bell className="w-3 h-3 mr-1" />
                      {fromLabel[m.from] ?? m.from}
                    </Badge>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {fmtDate(m.createdAt)}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-line">{m.message}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <p className="text-xs text-muted-foreground text-right">{messages.length} mesaj</p>
    </div>
  );
}
