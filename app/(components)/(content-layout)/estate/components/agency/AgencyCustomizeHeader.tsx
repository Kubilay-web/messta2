"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "../../components/ui/button";

type Agency = { id: string; name: string; slug: string };
type User   = { id: string; email?: string | null; displayName?: string | null };

export default function AgencyCustomizeHeader({ user, agency }: { user: User; agency: Agency }) {
  return (
    <header className="flex items-center justify-between border-b bg-white px-4 py-3">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon" className="h-8 w-8">
          <Link href="/estate/dashboard">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <p className="text-sm font-semibold">{agency.name}</p>
          <p className="text-xs text-muted-foreground">Web Sitesi Düzenleyici</p>
        </div>
      </div>
      <Button asChild variant="outline" size="sm">
        <Link href={`/estate/agency/${agency.id}`} target="_blank">
          <ExternalLink className="mr-1.5 w-3.5 h-3.5" /> Önizle
        </Link>
      </Button>
    </header>
  );
}
