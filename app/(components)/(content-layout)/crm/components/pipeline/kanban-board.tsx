"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDroppable } from "@dnd-kit/core";
import { Plus } from "lucide-react";
import { formatCompact } from "../../lib/labels";
import { LeadCard } from "./lead-card";
import { moveLead } from "../../actions/leads";
import type { KanbanLead, KanbanStage } from "./types";

type Columns = Record<string, KanbanLead[]>;

function SortableLeadCard({
  lead,
  onClick,
}: {
  lead: KanbanLead;
  onClick: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: lead.id,
    data: { type: "lead", stageId: lead.stageId },
  });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform), transition }}
      className={isDragging ? "opacity-40" : ""}
    >
      <LeadCard lead={lead} onClick={onClick} dragHandleProps={{ ...attributes, ...listeners }} />
    </div>
  );
}

function Column({
  stage,
  leads,
  onAdd,
  onCardClick,
}: {
  stage: KanbanStage;
  leads: KanbanLead[];
  onAdd: (stageId: string) => void;
  onCardClick: (lead: KanbanLead) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: stage.id, data: { type: "column" } });
  const total = leads.reduce((acc, l) => acc + (l.value ?? 0), 0);

  return (
    <div className="flex flex-col w-[300px] shrink-0">
      <div className="flex items-center justify-between px-1 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="size-2.5 rounded-full shrink-0" style={{ background: stage.color }} />
          <span className="font-semibold text-sm truncate">{stage.name}</span>
          <span className="text-xs text-muted-foreground bg-muted rounded-full px-1.5 py-0.5">
            {leads.length}
          </span>
        </div>
        <button
          onClick={() => onAdd(stage.id)}
          className="text-muted-foreground hover:text-foreground p-1 rounded hover:bg-muted"
          aria-label="Fırsat ekle"
        >
          <Plus className="size-4" />
        </button>
      </div>

      <div className="px-1 mb-2 text-xs text-muted-foreground flex items-center justify-between">
        <span>{formatCompact(total)}</span>
        <span>%{stage.probability}</span>
      </div>

      <div
        ref={setNodeRef}
        className={`flex-1 rounded-xl p-2 space-y-2 min-h-[120px] transition-colors bg-muted/40 ${
          isOver ? "bg-primary/10 ring-2 ring-primary/30" : ""
        } ${stage.isWon ? "bg-emerald-500/5" : ""} ${stage.isLost ? "bg-red-500/5" : ""}`}
      >
        <SortableContext items={leads.map((l) => l.id)} strategy={verticalListSortingStrategy}>
          {leads.map((lead) => (
            <SortableLeadCard key={lead.id} lead={lead} onClick={() => onCardClick(lead)} />
          ))}
        </SortableContext>

        {leads.length === 0 && (
          <button
            onClick={() => onAdd(stage.id)}
            className="w-full text-xs text-muted-foreground/70 border border-dashed rounded-lg py-6 hover:border-primary/40 hover:text-muted-foreground transition-colors"
          >
            + Fırsat ekle
          </button>
        )}
      </div>
    </div>
  );
}

export function KanbanBoard({
  agencyId,
  stages,
  initialLeads,
  onAddLead,
  onCardClick,
}: {
  agencyId: string;
  stages: KanbanStage[];
  initialLeads: KanbanLead[];
  onAddLead: (stageId: string) => void;
  onCardClick: (lead: KanbanLead) => void;
}) {
  const router = useRouter();

  const buildColumns = (leads: KanbanLead[]): Columns => {
    const cols: Columns = {};
    for (const s of stages) cols[s.id] = [];
    for (const l of leads) {
      (cols[l.stageId] ??= []).push(l);
    }
    for (const id of Object.keys(cols)) {
      cols[id].sort((a, b) => a.position - b.position);
    }
    return cols;
  };

  const [columns, setColumns] = useState<Columns>(() => buildColumns(initialLeads));
  const [activeLead, setActiveLead] = useState<KanbanLead | null>(null);

  // initialLeads değişirse (server revalidate) state'i tazele
  useEffect(() => {
    setColumns(buildColumns(initialLeads));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLeads]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } })
  );

  const findColumn = (cols: Columns, id: string): string | undefined => {
    if (cols[id]) return id; // bir kolon id'si
    return Object.keys(cols).find((colId) => cols[colId].some((l) => l.id === id));
  };

  const handleDragStart = (e: DragStartEvent) => {
    const id = e.active.id as string;
    const colId = findColumn(columns, id);
    const lead = colId ? columns[colId].find((l) => l.id === id) : null;
    setActiveLead(lead ?? null);
  };

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;
    if (!over) return;
    const activeId = active.id as string;
    const overId = over.id as string;

    const activeCol = findColumn(columns, activeId);
    const overCol = findColumn(columns, overId) ?? (columns[overId] ? overId : undefined);
    if (!activeCol || !overCol || activeCol === overCol) return;

    setColumns((prev) => {
      const activeItems = [...prev[activeCol]];
      const overItems = [...prev[overCol]];
      const activeIndex = activeItems.findIndex((l) => l.id === activeId);
      if (activeIndex === -1) return prev;
      const [moved] = activeItems.splice(activeIndex, 1);

      const overIndex = overItems.findIndex((l) => l.id === overId);
      const insertAt = overIndex >= 0 ? overIndex : overItems.length;
      overItems.splice(insertAt, 0, { ...moved, stageId: overCol });

      return { ...prev, [activeCol]: activeItems, [overCol]: overItems };
    });
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    setActiveLead(null);
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;
    const activeCol = findColumn(columns, activeId);
    const overCol = findColumn(columns, overId) ?? (columns[overId] ? overId : undefined);
    if (!activeCol || !overCol) return;

    let nextColumns = columns;
    if (activeCol === overCol) {
      const items = columns[activeCol];
      const oldIndex = items.findIndex((l) => l.id === activeId);
      const newIndex = items.findIndex((l) => l.id === overId);
      if (oldIndex !== newIndex && newIndex !== -1) {
        nextColumns = { ...columns, [activeCol]: arrayMove(items, oldIndex, newIndex) };
        setColumns(nextColumns);
      }
    }

    const targetCol = overCol;
    const orderedLeadIds = nextColumns[targetCol].map((l) => l.id);

    // Sunucuya kalıcı yaz
    moveLead({ leadId: activeId, toStageId: targetCol, orderedLeadIds })
      .then(() => {
        const stage = stages.find((s) => s.id === targetCol);
        if (stage?.isWon) toast.success("Fırsat kazanıldı! 🎉");
        else if (stage?.isLost) toast("Fırsat kaybedildi olarak işaretlendi.");
        router.refresh();
      })
      .catch((err) => {
        toast.error(err?.message ?? "Taşıma başarısız oldu.");
        router.refresh();
      });
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4 px-1 min-h-[calc(100vh-13rem)]">
        {stages.map((stage) => (
          <Column
            key={stage.id}
            stage={stage}
            leads={columns[stage.id] ?? []}
            onAdd={onAddLead}
            onCardClick={onCardClick}
          />
        ))}
      </div>

      <DragOverlay>
        {activeLead ? (
          <div className="w-[290px]">
            <LeadCard lead={activeLead} isOverlay />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
