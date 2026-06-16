"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Wallet,
  Home,
  FileText,
  CalendarCheck,
  Heart,
  Search,
} from "lucide-react";
import {
  Card,
  CardContent,
  Button,
  Badge,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui";
import {
  formatCompact,
  formatDate,
  listingTypeLabel,
  propertyTypeLabel,
  leadStatusLabel,
  initials,
} from "../../lib/labels";
import { ClientActions } from "./client-actions";

const contractStatusLabel: Record<string, string> = {
  DRAFT: "Taslak",
  ACTIVE: "Aktif",
  COMPLETED: "Tamamlandı",
  CANCELLED: "İptal",
  EXPIRED: "Süresi Doldu",
};

const visitStatusLabel: Record<string, string> = {
  SCHEDULED: "Planlandı",
  COMPLETED: "Tamamlandı",
  CANCELLED: "İptal",
  NO_SHOW: "Gelmedi",
};

export function Client360({
  agencyId,
  client,
  canDelete = false,
}: {
  agencyId: string;
  client: any;
  canDelete?: boolean;
}) {
  const name = `${client.firstName} ${client.lastName}`;
  const roles = [
    client.isBuyer && "Alıcı",
    client.isSeller && "Satıcı",
    client.isTenant && "Kiracı",
    client.isLandlord && "Mülk Sahibi",
  ].filter(Boolean) as string[];

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto space-y-4">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon">
          <Link href={`/crm/agency/${agencyId}/clients`}>
            <ArrowLeft className="size-5" />
          </Link>
        </Button>
        <h1 className="text-xl font-bold flex-1">Müşteri Profili</h1>
        <ClientActions agencyId={agencyId} client={client} canDelete={canDelete} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Sol: profil */}
        <Card className="h-fit">
          <CardContent className="p-5">
            <div className="flex flex-col items-center text-center">
              <Avatar className="size-20 mb-3">
                {client.imageUrl && <AvatarImage src={client.imageUrl} alt={name} />}
                <AvatarFallback className="text-xl">{initials(name)}</AvatarFallback>
              </Avatar>
              <h2 className="text-lg font-bold">{name}</h2>
              <div className="flex flex-wrap justify-center gap-1 mt-2">
                {roles.map((r) => (
                  <Badge key={r} variant="secondary">{r}</Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2.5 mt-5 text-sm">
              <Row icon={Phone} value={<a href={`tel:${client.phone}`} className="hover:underline">{client.phone}</a>} />
              <Row icon={Mail} value={<a href={`mailto:${client.email}`} className="hover:underline truncate">{client.email}</a>} />
              {client.occupation && <Row icon={Briefcase} value={client.occupation} />}
              {client.address && <Row icon={MapPin} value={client.address} />}
              {(client.minBudget || client.maxBudget) && (
                <Row
                  icon={Wallet}
                  value={`${formatCompact(client.minBudget, client.currency)} – ${formatCompact(client.maxBudget, client.currency)}`}
                />
              )}
            </div>

            {client.preferredCities?.length > 0 && (
              <div className="mt-4">
                <p className="text-xs text-muted-foreground mb-1.5">Tercih edilen şehirler</p>
                <div className="flex flex-wrap gap-1">
                  {client.preferredCities.map((c: string) => (
                    <Badge key={c} variant="outline">{c}</Badge>
                  ))}
                </div>
              </div>
            )}

            {client.preferredPropertyTypes?.length > 0 && (
              <div className="mt-3">
                <p className="text-xs text-muted-foreground mb-1.5">Tercih edilen mülk türleri</p>
                <div className="flex flex-wrap gap-1">
                  {client.preferredPropertyTypes.map((t: string) => (
                    <Badge key={t} variant="outline">{propertyTypeLabel[t] ?? t}</Badge>
                  ))}
                </div>
              </div>
            )}

            {client.notes && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-xs text-muted-foreground mb-1">Notlar</p>
                <p className="text-sm">{client.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sağ: sekmeler */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="leads">
            <TabsList className="flex-wrap h-auto">
              <TabsTrigger value="leads">Fırsatlar ({client.crmLeads.length})</TabsTrigger>
              <TabsTrigger value="contracts">Sözleşmeler ({client.contracts.length})</TabsTrigger>
              <TabsTrigger value="visits">Geziler ({client.visits.length})</TabsTrigger>
              <TabsTrigger value="interests">İlgilendikleri ({client.interests.length})</TabsTrigger>
              <TabsTrigger value="searches">Aramalar ({client.savedSearches.length})</TabsTrigger>
            </TabsList>

            {/* Fırsatlar */}
            <TabsContent value="leads" className="mt-4 space-y-2">
              {client.crmLeads.length === 0 ? (
                <Empty icon={Home} label="Bu müşteriye bağlı fırsat yok." />
              ) : (
                client.crmLeads.map((l: any) => (
                  <Link key={l.id} href={`/crm/agency/${agencyId}/leads/${l.id}`}>
                    <Card className="hover:border-primary/40 transition-colors">
                      <CardContent className="p-3 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-medium text-sm truncate">{l.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {l.pipeline.name} ·{" "}
                            <span className="inline-flex items-center gap-1">
                              <span className="size-2 rounded-full" style={{ background: l.stage.color }} />
                              {l.stage.name}
                            </span>
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-semibold">{formatCompact(l.value, l.currency)}</p>
                          <Badge
                            variant={l.status === "WON" ? "default" : l.status === "LOST" ? "destructive" : "secondary"}
                            className="text-[10px]"
                          >
                            {leadStatusLabel[l.status]}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              )}
            </TabsContent>

            {/* Sözleşmeler */}
            <TabsContent value="contracts" className="mt-4 space-y-2">
              {client.contracts.length === 0 ? (
                <Empty icon={FileText} label="Sözleşme yok." />
              ) : (
                client.contracts.map((c: any) => (
                  <Card key={c.id}>
                    <CardContent className="p-3 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-medium text-sm">{c.contractNo}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {c.property?.title} · {[c.property?.district, c.property?.city].filter(Boolean).join(", ")}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-semibold">
                          {formatCompact(c.salePrice ?? c.rentalPrice, c.currency)}
                        </p>
                        <Badge variant="outline" className="text-[10px]">
                          {contractStatusLabel[c.status] ?? c.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            {/* Geziler */}
            <TabsContent value="visits" className="mt-4 space-y-2">
              {client.visits.length === 0 ? (
                <Empty icon={CalendarCheck} label="Mülk gezisi yok." />
              ) : (
                client.visits.map((v: any) => (
                  <Card key={v.id}>
                    <CardContent className="p-3 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate">{v.property?.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(v.scheduledAt)}
                          {v.rating ? ` · ${"★".repeat(v.rating)}` : ""}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-[10px] shrink-0">
                        {visitStatusLabel[v.status] ?? v.status}
                      </Badge>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            {/* İlgilendikleri ilanlar */}
            <TabsContent value="interests" className="mt-4 space-y-2">
              {client.interests.length === 0 ? (
                <Empty icon={Heart} label="İlgilenilen ilan yok." />
              ) : (
                client.interests.map((i: any) => (
                  <Card key={i.id}>
                    <CardContent className="p-3 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate">{i.listing?.title}</p>
                        <p className="text-xs text-muted-foreground">İlan No: {i.listing?.listingNo}</p>
                      </div>
                      <p className="text-sm font-semibold shrink-0">
                        {formatCompact(i.listing?.askingPrice, i.listing?.currency)}
                      </p>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            {/* Kayıtlı aramalar */}
            <TabsContent value="searches" className="mt-4 space-y-2">
              {client.savedSearches.length === 0 ? (
                <Empty icon={Search} label="Kayıtlı arama yok." />
              ) : (
                client.savedSearches.map((s: any) => (
                  <Card key={s.id}>
                    <CardContent className="p-3">
                      <p className="font-medium text-sm">{s.name}</p>
                      <div className="flex flex-wrap gap-1.5 mt-1.5 text-xs text-muted-foreground">
                        {s.listingType && <Chip>{listingTypeLabel[s.listingType] ?? s.listingType}</Chip>}
                        {s.propertyType && <Chip>{propertyTypeLabel[s.propertyType] ?? s.propertyType}</Chip>}
                        {s.city && <Chip>{s.city}</Chip>}
                        {(s.minPrice || s.maxPrice) && (
                          <Chip>
                            {formatCompact(s.minPrice)} – {formatCompact(s.maxPrice)}
                          </Chip>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function Row({ icon: Icon, value }: { icon: any; value: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon className="size-4 text-muted-foreground shrink-0" />
      <span className="min-w-0 truncate">{value}</span>
    </div>
  );
}

function Empty({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="text-center text-muted-foreground py-10">
      <Icon className="size-8 mx-auto mb-2 opacity-40" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="px-1.5 py-0.5 rounded bg-muted">{children}</span>;
}
