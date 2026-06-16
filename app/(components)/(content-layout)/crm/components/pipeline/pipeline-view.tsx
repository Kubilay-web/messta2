"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search } from "lucide-react";
import { Button, Input } from "../../components/ui";
import { formatCompact } from "../../lib/labels";
import { KanbanBoard } from "./kanban-board";
import { LeadDialog } from "./lead-dialog";
import type { FormOptions, KanbanLead, KanbanStage } from "./types";

export type PipelineSummary = { id: string; name: string; color: string; leadCount: number };

export function PipelineView({
  agencyId,
  pipelines,
  activePipelineId,
  stages,
  leads,
  options,
}: {
  agencyId: string;
  pipelines: PipelineSummary[];
  activePipelineId: string;
  stages: KanbanStage[];
  leads: KanbanLead[];
  options: FormOptions;
}) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editLead, setEditLead] = useState<KanbanLead | null>(null);
  const [defaultStageId, setDefaultStageId] = useState<string | undefined>(undefined);
  const [query, setQuery] = useState("");

  const openCreate = (stageId?: string) => {
    setEditLead(null);
    setDefaultStageId(stageId);
    setDialogOpen(true);
  };

  const openCard = (lead: KanbanLead) => {
    router.push(`/crm/agency/${agencyId}/leads/${lead.id}`);
  };

  const filtered = query.trim()
    ? leads.filter((l) => {
        const q = query.toLowerCase();
        return (
          l.title.toLowerCase().includes(q) ||
          l.contactName.toLowerCase().includes(q) ||
          (l.contactPhone ?? "").includes(q) ||
          (l.city ?? "").toLowerCase().includes(q)
        );
      })
    : leads;

  const totalOpenValue = leads
    .filter((l) => l.status === "OPEN")
    .reduce((acc, l) => acc + (l.value ?? 0), 0);

  const switchPipeline = (id: string) => {
    router.push(`/crm/agency/${agencyId}/pipeline?pipeline=${id}`);
  };

  return (
    <div className="p-4 sm:p-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Satış Hattı</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {leads.length} fırsat · Açık hat değeri {formatCompact(totalOpenValue)}
          </p>
        </div>
        <Button onClick={() => openCreate(undefined)}>
          <Plus className="size-4" /> Yeni Fırsat
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Hat seçici */}
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1 overflow-x-auto">
          {pipelines.map((p) => (
            <button
              key={p.id}
              onClick={() => switchPipeline(p.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                p.id === activePipelineId
                  ? "bg-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="size-2 rounded-full" style={{ background: p.color }} />
              {p.name}
              <span className="text-xs text-muted-foreground">{p.leadCount}</span>
            </button>
          ))}
        </div>

        <div className="relative ml-auto w-full sm:w-64">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Fırsat ara..."
            className="pl-8"
          />
        </div>
      </div>

      <KanbanBoard
        agencyId={agencyId}
        stages={stages}
        initialLeads={filtered}
        onAddLead={openCreate}
        onCardClick={openCard}
      />

      <LeadDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        agencyId={agencyId}
        pipelineId={activePipelineId}
        defaultStageId={defaultStageId}
        options={options}
        lead={editLead}
      />
    </div>
  );
}
