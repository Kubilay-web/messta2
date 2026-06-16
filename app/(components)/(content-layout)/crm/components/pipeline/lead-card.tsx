"use client";

import { Phone, MapPin, User2, CheckSquare, MessageSquare, GripVertical } from "lucide-react";
import {
  formatCompact,
  temperatureColor,
  temperatureLabel,
  listingTypeLabel,
  propertyTypeLabel,
  initials,
} from "../../lib/labels";
import type { KanbanLead } from "./types";

export function LeadCard({
  lead,
  onClick,
  dragHandleProps,
  isOverlay,
}: {
  lead: KanbanLead;
  onClick?: () => void;
  dragHandleProps?: Record<string, any>;
  isOverlay?: boolean;
}) {
  const meta = [
    lead.listingType ? listingTypeLabel[lead.listingType] : null,
    lead.propertyType ? propertyTypeLabel[lead.propertyType] : null,
    lead.roomCount,
  ].filter(Boolean);

  return (
    <div
      onClick={onClick}
      className={`group rounded-xl border bg-card p-3 shadow-sm cursor-pointer transition-all hover:shadow-md hover:border-primary/40 ${
        isOverlay ? "shadow-xl ring-2 ring-primary/40 rotate-2" : ""
      }`}
    >
      <div className="flex items-start gap-2">
        <button
          {...dragHandleProps}
          onClick={(e) => e.stopPropagation()}
          className="mt-0.5 text-muted-foreground/40 hover:text-muted-foreground cursor-grab active:cursor-grabbing touch-none"
          aria-label="Sürükle"
        >
          <GripVertical className="size-4" />
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="font-medium text-sm leading-snug line-clamp-2">{lead.title}</p>
            <span
              className={`shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${temperatureColor[lead.temperature]}`}
            >
              {temperatureLabel[lead.temperature]}
            </span>
          </div>

          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-muted-foreground">
            <User2 className="size-3" />
            <span className="truncate">{lead.contactName}</span>
          </div>

          {lead.contactPhone && (
            <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
              <Phone className="size-3" />
              <span className="truncate">{lead.contactPhone}</span>
            </div>
          )}

          {(lead.city || meta.length > 0) && (
            <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
              <MapPin className="size-3" />
              <span className="truncate">
                {[lead.city, ...meta].filter(Boolean).join(" · ")}
              </span>
            </div>
          )}

          {lead.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {lead.tags.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mt-2.5 pt-2 border-t">
            <span className="text-sm font-semibold">
              {lead.value ? formatCompact(lead.value, lead.currency) : "—"}
            </span>
            <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
              {lead._count.tasks > 0 && (
                <span className="flex items-center gap-0.5">
                  <CheckSquare className="size-3" />
                  {lead._count.tasks}
                </span>
              )}
              {lead._count.activities > 0 && (
                <span className="flex items-center gap-0.5">
                  <MessageSquare className="size-3" />
                  {lead._count.activities}
                </span>
              )}
              {lead.agentName && (
                <span
                  className="size-6 rounded-full bg-primary/10 text-primary text-[10px] font-medium flex items-center justify-center"
                  title={lead.agentName}
                >
                  {initials(lead.agentName)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
