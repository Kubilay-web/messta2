"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "../../components/ui";

const ROLES = [
  { value: "", label: "Tümü" },
  { value: "buyer", label: "Alıcı" },
  { value: "seller", label: "Satıcı" },
  { value: "tenant", label: "Kiracı" },
  { value: "landlord", label: "Mülk Sahibi" },
];

export function ClientsFilter({
  agencyId,
  role,
  q,
}: {
  agencyId: string;
  role?: string;
  q?: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(q ?? "");

  const navigate = (next: { role?: string; q?: string }) => {
    const params = new URLSearchParams();
    const r = next.role ?? role ?? "";
    const search = next.q ?? query;
    if (r) params.set("role", r);
    if (search) params.set("q", search);
    router.push(`/crm/agency/${agencyId}/clients?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1 bg-muted rounded-lg p-1 overflow-x-auto">
        {ROLES.map((r) => (
          <button
            key={r.value}
            onClick={() => navigate({ role: r.value })}
            className={`px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
              (role ?? "") === r.value
                ? "bg-background shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {r.label}
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
          placeholder="İsim, telefon, e-posta ara..."
          className="pl-8"
        />
      </form>
    </div>
  );
}
