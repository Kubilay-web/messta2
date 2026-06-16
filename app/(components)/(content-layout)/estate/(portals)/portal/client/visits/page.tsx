import { validateRequest } from "@/app/auth";
import { getClientFromUserId, getClientVisits } from "../../../../actions/client-portal";
import { redirect } from "next/navigation";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";
import { Calendar, MapPin, User, Star } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Ziyaretlerim - Müşteri Portalı" };

const visitStatusLabel: Record<string, string> = {
  SCHEDULED: "Planlandı",
  COMPLETED: "Tamamlandı",
  CANCELLED: "İptal Edildi",
  NO_SHOW:   "Gelmedi",
};

const visitStatusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  SCHEDULED: "default",
  COMPLETED: "secondary",
  CANCELLED: "destructive",
  NO_SHOW:   "outline",
};

export default async function ClientVisitsPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const client  = await getClientFromUserId(user.id);
  const role    = (user as any).roleGayrimenkul as string;
  const isAdmin = role === "ADMIN" || role === "SUPER_ADMIN";
  if (!client && !isAdmin) redirect("/login");

  const visits = client ? await getClientVisits(client.id) : [];

  const fmtDate = (d: Date | string) =>
    new Date(d).toLocaleDateString("tr-TR", {
      day: "numeric", month: "long", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Mülk Ziyaretlerim</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Planlanmış ve tamamlanmış tüm mülk gezileriniz.
        </p>
      </div>

      {visits.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-10 text-center text-sm text-muted-foreground">
          Henüz mülk ziyareti bulunmuyor.
        </div>
      ) : (
        <div className="space-y-3">
          {visits.map((v) => (
            <Card key={v.id} className="overflow-hidden">
              <CardContent className="p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Badge variant={visitStatusVariant[v.status] ?? "outline"} className="text-xs">
                    {visitStatusLabel[v.status] ?? v.status}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    {fmtDate(v.scheduledAt)}
                  </span>
                </div>

                {v.property && (
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">{v.property.title}</p>
                      <p className="text-xs text-muted-foreground">{v.property.city}</p>
                    </div>
                  </div>
                )}

                {v.agent && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="w-3.5 h-3.5" />
                    <span>
                      {v.agent.firstName} {v.agent.lastName}
                      {v.agent.phone && ` · ${v.agent.phone}`}
                    </span>
                  </div>
                )}

                {v.status === "COMPLETED" && (
                  <div className="border-t pt-3 space-y-1">
                    {v.rating && (
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${i < v.rating! ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">{v.rating}/5</span>
                      </div>
                    )}
                    {v.feedback && (
                      <p className="text-xs text-muted-foreground italic">"{v.feedback}"</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground text-right">{visits.length} ziyaret</p>
    </div>
  );
}
