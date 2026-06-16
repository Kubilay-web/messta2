"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "../../components/ui";

const STATUSES = [
  { value: "", label: "Tümü" },
  { value: "OPEN", label: "Açık" },
  { value: "WON", label: "Kazanılan" },
  { value: "LOST", label: "Kayıp" },
];

export function LeadsFilter({
  agencyId,
  status,
  q,
}: {
  agencyId: string;
  status?: string;
  q?: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(q ?? "");

  const navigate = (next: { status?: string; q?: string }) => {
    const params = new URLSearchParams();
    const s = next.status ?? status ?? "";
    const search = next.q ?? query;
    if (s) params.set("status", s);
    if (search) params.set("q", search);
    router.push(`/crm/agency/${agencyId}/leads?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
        {STATUSES.map((s) => (
          <button
            key={s.value}
            onClick={() => navigate({ status: s.value })}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              (status ?? "") === s.value
                ? "bg-background shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      <form
        className="relative ml-auto w-full sm:w-72"
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ q: query });
        }}
      >
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="İsim, telefon, şehir ara..."
          className="pl-8"
        />
      </form>
    </div>
  );
}
