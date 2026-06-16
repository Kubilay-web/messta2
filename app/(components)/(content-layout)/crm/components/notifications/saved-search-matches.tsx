"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Check, Sparkles, ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  Button,
  Badge,
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui";
import {
  formatCurrency,
  listingTypeLabel,
  propertyTypeLabel,
  formatCompact,
  timeAgo,
  initials,
} from "../../lib/labels";
import { markSavedSearchSeen } from "../../actions/notifications";

export function SavedSearchMatches({
  agencyId,
  matches,
}: {
  agencyId: string;
  matches: any[];
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  const markSeen = async (searchId: string) => {
    setBusy(searchId);
    try {
      await markSavedSearchSeen(searchId);
      toast.success("Görüldü olarak işaretlendi.");
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Hata");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="space-y-4">
      {matches.map((m) => {
        const client = m.client;
        const name = `${client.firstName} ${client.lastName}`;
        const crit = [
          m.criteria.listingType ? listingTypeLabel[m.criteria.listingType] : null,
          m.criteria.propertyType ? propertyTypeLabel[m.criteria.propertyType] : null,
          m.criteria.city,
          m.criteria.minPrice || m.criteria.maxPrice
            ? `${formatCompact(m.criteria.minPrice)} – ${formatCompact(m.criteria.maxPrice)}`
            : null,
          m.criteria.q,
        ].filter(Boolean);

        return (
          <Card key={m.searchId} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar className="size-10">
                    {client.imageUrl && <AvatarImage src={client.imageUrl} alt={name} />}
                    <AvatarFallback>{initials(name)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/crm/agency/${agencyId}/clients/${client.id}`}
                        className="font-semibold hover:text-primary truncate"
                      >
                        {name}
                      </Link>
                      <Badge className="gap-1 bg-amber-500 hover:bg-amber-500">
                        <Sparkles className="size-3" /> {m.count} yeni
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      &quot;{m.name}&quot; · {crit.join(" · ")}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => markSeen(m.searchId)}
                  disabled={busy === m.searchId}
                >
                  <Check className="size-4" /> Görüldü
                </Button>
              </div>

              <div className="grid gap-2 mt-3 sm:grid-cols-2">
                {m.newListings.map((l: any) => (
                  <Link
                    key={l.id}
                    href={`/estate/agency/${agencyId}/ilanlar/${l.id}`}
                    target="_blank"
                    className="flex items-center justify-between gap-2 rounded-lg border p-2.5 hover:border-primary/40 transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{l.title}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {[
                          listingTypeLabel[l.listingType] ?? l.listingType,
                          l.propertyType ? propertyTypeLabel[l.propertyType] : null,
                          l.roomCount,
                          [l.district, l.city].filter(Boolean).join(", "),
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                      <p className="text-[11px] text-muted-foreground/70">{timeAgo(l.createdAt)}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold">
                        {formatCurrency(l.askingPrice, l.currency)}
                      </p>
                      <ExternalLink className="size-3.5 text-muted-foreground inline" />
                    </div>
                  </Link>
                ))}
              </div>
              {m.count > m.newListings.length && (
                <p className="text-xs text-muted-foreground mt-2">
                  +{m.count - m.newListings.length} ilan daha eşleşiyor
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
