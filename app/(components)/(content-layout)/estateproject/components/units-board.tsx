"use client";

import { useMemo, useState } from "react";
import { Plus, Building2, HardHat } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Button } from "../components/ui";
import { unitStatusLabel, unitStatusColor, formatCompact } from "../lib/labels";
import { UnitDialog } from "./unit-dialog";
import { BulkUnitDialog } from "./bulk-unit-dialog";
import { BlockDialog } from "./block-dialog";
import { SaleDialog } from "./sale-dialog";
import { UnitManageSheet } from "./unit-manage-sheet";

const UNIT_STATUSES = ["AVAILABLE", "RESERVED", "SOLD", "DELIVERED", "BLOCKED"];

export function UnitsBoard({
  agencyId,
  projectId,
  units,
  blocks,
  saleOptions,
  canManage,
  canSell,
}: {
  agencyId: string;
  projectId: string;
  units: any[];
  blocks: { id: string; name: string }[];
  saleOptions: { clients: any[]; agents: any[] };
  canManage: boolean;
  canSell: boolean;
}) {
  const [statusFilter, setStatusFilter] = useState("");
  const [unitDialog, setUnitDialog] = useState(false);
  const [bulkDialog, setBulkDialog] = useState(false);
  const [blockDialog, setBlockDialog] = useState(false);
  const [saleDialog, setSaleDialog] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeUnit, setActiveUnit] = useState<any | null>(null);
  const [editingUnit, setEditingUnit] = useState<any | null>(null);

  const grouped = useMemo(() => {
    const map = new Map<string, { name: string; units: any[] }>();
    map.set("__none__", { name: "Bloksuz", units: [] });
    for (const b of blocks) map.set(b.id, { name: b.name, units: [] });
    for (const u of units) {
      const key = u.blockId ?? "__none__";
      if (!map.has(key)) map.set(key, { name: u.block?.name ?? "Diğer", units: [] });
      map.get(key)!.units.push(u);
    }
    return [...map.values()].filter((g) => g.units.length > 0);
  }, [units, blocks]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <div className="flex flex-wrap items-center gap-1.5">
          <FilterChip label="Tümü" active={statusFilter === ""} onClick={() => setStatusFilter("")} />
          {UNIT_STATUSES.map((s) => (
            <FilterChip
              key={s}
              label={unitStatusLabel[s]}
              active={statusFilter === s}
              dot={unitStatusColor[s]}
              onClick={() => setStatusFilter(statusFilter === s ? "" : s)}
            />
          ))}
        </div>
        {canManage && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setBlockDialog(true)}>
              <Plus className="size-4" /> Blok
            </Button>
            <Button variant="outline" size="sm" onClick={() => setBulkDialog(true)}>
              <Plus className="size-4" /> Toplu Daire
            </Button>
            <Button size="sm" onClick={() => { setEditingUnit(null); setUnitDialog(true); }}>
              <Plus className="size-4" /> Daire
            </Button>
          </div>
        )}
      </div>

      {units.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center text-muted-foreground">
            <HardHat className="size-10 mx-auto mb-3 opacity-40" />
            <p>Henüz daire eklenmemiş.</p>
            {canManage && <p className="text-xs mt-1">&quot;Toplu Daire&quot; ile hızlıca oluşturabilirsiniz.</p>}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {grouped.map((g) => (
            <Card key={g.name}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Building2 className="size-4 text-muted-foreground" />
                  {g.name}
                  <span className="text-xs font-normal text-muted-foreground">({g.units.length} daire)</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {g.units.map((u) => {
                    const dim = statusFilter && u.status !== statusFilter;
                    return (
                      <button
                        key={u.id}
                        onClick={() => { setActiveUnit(u); setSheetOpen(true); }}
                        title={`${u.unitNo} · ${unitStatusLabel[u.status]}${u.listPrice ? " · " + formatCompact(u.listPrice, u.currency) : ""}`}
                        className={`w-[68px] h-[60px] rounded-lg flex flex-col items-center justify-center text-xs font-medium transition-all ${unitStatusColor[u.status]} ${
                          dim ? "opacity-25" : "hover:scale-105 hover:shadow-md"
                        }`}
                      >
                        <span className="font-bold">{u.unitNo}</span>
                        {u.roomCount && <span className="text-[10px] opacity-90">{u.roomCount}</span>}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <UnitDialog open={unitDialog} onOpenChange={setUnitDialog} agencyId={agencyId} projectId={projectId} blocks={blocks} unit={editingUnit} />
      <BulkUnitDialog open={bulkDialog} onOpenChange={setBulkDialog} agencyId={agencyId} projectId={projectId} blocks={blocks} />
      <BlockDialog open={blockDialog} onOpenChange={setBlockDialog} agencyId={agencyId} projectId={projectId} />
      <SaleDialog open={saleDialog} onOpenChange={setSaleDialog} agencyId={agencyId} projectId={projectId} unit={activeUnit} options={saleOptions} />
      <UnitManageSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        unit={activeUnit}
        canManage={canManage}
        canSell={canSell}
        onEdit={() => { setEditingUnit(activeUnit); setSheetOpen(false); setUnitDialog(true); }}
        onSell={() => { setSheetOpen(false); setSaleDialog(true); }}
      />
    </div>
  );
}

function FilterChip({ label, active, onClick, dot }: { label: string; active: boolean; onClick: () => void; dot?: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors border ${
        active ? "bg-foreground text-background border-foreground" : "bg-background hover:bg-muted text-muted-foreground"
      }`}
    >
      {dot && <span className={`size-2 rounded-full ${dot.split(" ")[0]}`} />}
      {label}
    </button>
  );
}
