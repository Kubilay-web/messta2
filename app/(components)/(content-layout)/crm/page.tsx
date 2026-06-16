import Link from "next/link";
import { redirect } from "next/navigation";
import { Building2, ArrowRight } from "lucide-react";
import db from "@/app/lib/db";
import { Card, CardContent, Button } from "./components/ui";
import { requireCrmUser, isSuperAdmin } from "./lib/auth";

export const dynamic = "force-dynamic";

export default async function CrmHomePage() {
  const user = await requireCrmUser();

  // Süper admin değilse doğrudan kendi ofisine yönlendir
  if (!isSuperAdmin(user.role)) {
    if (user.agencyId) redirect(`/crm/agency/${user.agencyId}`);
    return (
      <div className="p-10 max-w-xl mx-auto text-center text-muted-foreground">
        <Building2 className="size-10 mx-auto mb-3 opacity-40" />
        <p>Hesabınıza atanmış bir emlak ofisi bulunamadı. Lütfen yöneticinizle iletişime geçin.</p>
      </div>
    );
  }

  const agencies = await db.agency.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    select: { id: true, name: true, city: true, logo: true },
  });

  return (
    <div className="p-6 sm:p-10 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Gayrimenkul CRM</h1>
        <p className="text-muted-foreground mt-2">
          Bir emlak ofisi seçerek satış hattınızı, fırsatlarınızı ve ekip performansınızı yönetin.
        </p>
      </div>

      {agencies.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center text-muted-foreground">
            Henüz emlak ofisi yok. Önce ERP üzerinden bir ofis oluşturun.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {agencies.map((a) => (
            <Card key={a.id} className="hover:border-primary/40 transition-colors">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="size-11 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden shrink-0">
                  {a.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={a.logo} alt={a.name} className="size-11 object-cover" />
                  ) : (
                    <Building2 className="size-5 text-primary" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold truncate">{a.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{a.city ?? "—"}</p>
                </div>
                <Button asChild size="sm" variant="ghost">
                  <Link href={`/crm/agency/${a.id}`}>
                    Aç <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
