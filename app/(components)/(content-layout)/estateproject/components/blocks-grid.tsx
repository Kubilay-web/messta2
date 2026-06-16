"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Building2 } from "lucide-react";
import { Card, CardContent, Button, Badge, Progress } from "../components/ui";
import { BlockDialog } from "./block-dialog";
import { deleteBlock } from "../actions/blocks";

export function BlocksGrid({
  agencyId,
  projectId,
  blocks,
  canManage,
}: {
  agencyId: string;
  projectId: string;
  blocks: any[];
  canManage: boolean;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);

  const remove = async (b: any) => {
    if (!window.confirm(`${b.name} silinsin mi?`)) return;
    try {
      await deleteBlock(b.id, agencyId);
      toast.success("Blok silindi.");
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Hata");
    }
  };

  return (
    <div className="space-y-3">
      {canManage && (
        <div className="flex justify-end">
          <Button size="sm" onClick={() => { setEditing(null); setOpen(true); }}>
            <Plus className="size-4" /> Blok Ekle
          </Button>
        </div>
      )}
      {blocks.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            <Building2 className="size-9 mx-auto mb-2 opacity-40" /> Blok yok.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {blocks.map((b) => (
            <Card key={b.id} className="group">
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold truncate">{b.name}</p>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Badge variant="secondary">{b._count?.units ?? 0} daire</Badge>
                    {canManage && (
                      <>
                        <button onClick={() => { setEditing(b); setOpen(true); }} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition-opacity" aria-label="Düzenle">
                          <Pencil className="size-3.5" />
                        </button>
                        <button onClick={() => remove(b)} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-500 transition-opacity" aria-label="Sil">
                          <Trash2 className="size-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {b.floors ? `${b.floors} kat` : ""}
                  {b.unitsPerFloor ? ` · kat başına ${b.unitsPerFloor}` : ""}
                </p>
                <div className="mt-3">
                  <Progress value={b.progress} className="h-1.5" />
                  <p className="text-[11px] text-muted-foreground mt-1">%{b.progress} ilerleme</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <BlockDialog open={open} onOpenChange={setOpen} agencyId={agencyId} projectId={projectId} block={editing} />
    </div>
  );
}
