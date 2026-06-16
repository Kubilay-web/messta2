"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Trash2, GripVertical, Star, Pencil } from "lucide-react";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Badge,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Label,
} from "../../components/ui";
import {
  createPipeline,
  createStage,
  deleteStage,
  deletePipeline,
  reorderStages,
  updatePipeline,
  updateStage,
} from "../../actions/pipelines";

type Stage = {
  id: string;
  name: string;
  color: string;
  probability: number;
  isWon: boolean;
  isLost: boolean;
};
type Pipeline = {
  id: string;
  name: string;
  description: string | null;
  color: string;
  isDefault: boolean;
  stages: Stage[];
  _count: { leads: number };
};

export function PipelinesManager({
  agencyId,
  pipelines,
}: {
  agencyId: string;
  pipelines: Pipeline[];
}) {
  const router = useRouter();
  const [newPipelineOpen, setNewPipelineOpen] = useState(false);
  const [pipelineName, setPipelineName] = useState("");
  const [busy, setBusy] = useState(false);
  const [editPipeline, setEditPipeline] = useState<Pipeline | null>(null);
  const [editStage, setEditStage] = useState<Stage | null>(null);

  const addPipeline = async () => {
    if (!pipelineName.trim()) return toast.error("Hat adı giriniz.");
    setBusy(true);
    try {
      await createPipeline({ agencyId, name: pipelineName.trim() });
      toast.success("Hat oluşturuldu.");
      setPipelineName("");
      setNewPipelineOpen(false);
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Hata");
    } finally {
      setBusy(false);
    }
  };

  const addStage = async (pipelineId: string, name: string) => {
    if (!name.trim()) return;
    try {
      await createStage({ pipelineId, name: name.trim() });
      toast.success("Aşama eklendi.");
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Hata");
    }
  };

  const removeStage = async (id: string) => {
    try {
      await deleteStage(id);
      toast.success("Aşama silindi.");
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Hata");
    }
  };

  const removePipeline = async (id: string) => {
    if (!window.confirm("Bu hat silinsin mi?")) return;
    try {
      await deletePipeline(id);
      toast.success("Hat silindi.");
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Hata");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Hat Ayarları</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Satış hatlarını ve aşamalarını yönetin
          </p>
        </div>
        <Button onClick={() => setNewPipelineOpen(true)}>
          <Plus className="size-4" /> Yeni Hat
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {pipelines.map((p) => (
          <Card key={p.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <span className="size-3 rounded-full" style={{ background: p.color }} />
                  {p.name}
                  {p.isDefault && (
                    <Badge variant="secondary" className="gap-1">
                      <Star className="size-3" /> Varsayılan
                    </Badge>
                  )}
                </CardTitle>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setEditPipeline(p)}
                    className="text-muted-foreground hover:text-foreground"
                    aria-label="Hattı düzenle"
                  >
                    <Pencil className="size-4" />
                  </button>
                  {!p.isDefault && (
                    <button
                      onClick={() => removePipeline(p.id)}
                      className="text-muted-foreground hover:text-red-500"
                      aria-label="Hattı sil"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  )}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {p._count.leads} fırsat · {p.stages.length} aşama
              </p>
            </CardHeader>
            <CardContent className="space-y-1.5">
              <StageList pipelineId={p.id} stages={p.stages} onRemove={removeStage} onEdit={setEditStage} />
              <AddStageInline onAdd={(name) => addStage(p.id, name)} />
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={newPipelineOpen} onOpenChange={setNewPipelineOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yeni Satış Hattı</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 py-2">
            <Label>Hat Adı</Label>
            <Input
              value={pipelineName}
              onChange={(e) => setPipelineName(e.target.value)}
              placeholder="Örn. Ticari Gayrimenkul"
              onKeyDown={(e) => e.key === "Enter" && addPipeline()}
            />
            <p className="text-xs text-muted-foreground">
              Varsayılan aşamalar (Yeni, Kazanıldı, Kaybedildi) otomatik oluşturulur.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewPipelineOpen(false)}>
              İptal
            </Button>
            <Button onClick={addPipeline} disabled={busy}>
              Oluştur
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <EditPipelineDialog pipeline={editPipeline} onClose={() => setEditPipeline(null)} />
      <EditStageDialog stage={editStage} onClose={() => setEditStage(null)} />
    </div>
  );
}

function StageList({
  pipelineId,
  stages,
  onRemove,
  onEdit,
}: {
  pipelineId: string;
  stages: Stage[];
  onRemove: (id: string) => void;
  onEdit: (s: Stage) => void;
}) {
  const router = useRouter();
  // Terminal aşamalar (Kazanıldı/Kaybedildi) en sonda sabit kalır
  const terminal = stages.filter((s) => s.isWon || s.isLost);
  const sortableInitial = stages.filter((s) => !s.isWon && !s.isLost);
  const [items, setItems] = useState<Stage[]>(sortableInitial);

  useEffect(() => {
    setItems(stages.filter((s) => !s.isWon && !s.isLost));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stages]);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((s) => s.id === active.id);
    const newIndex = items.findIndex((s) => s.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    const next = arrayMove(items, oldIndex, newIndex);
    setItems(next);
    const orderedIds = [...next.map((s) => s.id), ...terminal.map((s) => s.id)];
    reorderStages(pipelineId, orderedIds)
      .then(() => router.refresh())
      .catch((err) => {
        toast.error(err?.message ?? "Sıralama kaydedilemedi.");
        router.refresh();
      });
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={items.map((s) => s.id)} strategy={verticalListSortingStrategy}>
        {items.map((s) => (
          <SortableStageRow key={s.id} stage={s} onRemove={onRemove} onEdit={onEdit} />
        ))}
      </SortableContext>
      {terminal.map((s) => (
        <div key={s.id} className="flex items-center gap-2 px-2 py-1.5 rounded-md opacity-90 group">
          <span className="size-3.5" />
          <span className="size-2.5 rounded-full" style={{ background: s.color }} />
          <span className="text-sm flex-1">{s.name}</span>
          {s.isWon && <Badge variant="default" className="text-[10px]">Kazanç</Badge>}
          {s.isLost && <Badge variant="destructive" className="text-[10px]">Kayıp</Badge>}
          <span className="text-xs text-muted-foreground">%{s.probability}</span>
          <button
            onClick={() => onEdit(s)}
            className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition-opacity"
            aria-label="Aşamayı düzenle"
          >
            <Pencil className="size-3.5" />
          </button>
        </div>
      ))}
    </DndContext>
  );
}

function SortableStageRow({
  stage,
  onRemove,
  onEdit,
}: {
  stage: Stage;
  onRemove: (id: string) => void;
  onEdit: (s: Stage) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: stage.id,
  });
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform), transition }}
      className={`flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted/50 group bg-card ${
        isDragging ? "shadow-lg ring-1 ring-primary/30 z-10 relative" : ""
      }`}
    >
      <button
        {...attributes}
        {...listeners}
        className="text-muted-foreground/40 hover:text-muted-foreground cursor-grab active:cursor-grabbing touch-none"
        aria-label="Sürükle"
      >
        <GripVertical className="size-3.5" />
      </button>
      <span className="size-2.5 rounded-full" style={{ background: stage.color }} />
      <span className="text-sm flex-1">{stage.name}</span>
      <span className="text-xs text-muted-foreground">%{stage.probability}</span>
      <button
        onClick={() => onEdit(stage)}
        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition-opacity"
        aria-label="Aşamayı düzenle"
      >
        <Pencil className="size-3.5" />
      </button>
      <button
        onClick={() => onRemove(stage.id)}
        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-500 transition-opacity"
        aria-label="Aşamayı sil"
      >
        <Trash2 className="size-3.5" />
      </button>
    </div>
  );
}

/* ---- Düzenleme diyalogları (PUT) ---- */

function EditPipelineDialog({
  pipeline,
  onClose,
}: {
  pipeline: Pipeline | null;
  onClose: () => void;
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#6366f1");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (pipeline) {
      setName(pipeline.name);
      setDescription(pipeline.description ?? "");
      setColor(pipeline.color);
    }
  }, [pipeline]);

  if (!pipeline) return null;

  const save = async () => {
    if (!name.trim()) return toast.error("Hat adı giriniz.");
    setSaving(true);
    try {
      await updatePipeline(pipeline.id, { name: name.trim(), description, color });
      toast.success("Hat güncellendi.");
      onClose();
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Hata");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={!!pipeline} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Hattı Düzenle</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-2">
          <div className="space-y-1.5">
            <Label className="text-xs">Hat Adı</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Açıklama</Label>
            <Input value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Renk</Label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-10 w-16 rounded border border-slate-200 dark:border-slate-700 bg-transparent"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={saving}>İptal</Button>
          <Button onClick={save} disabled={saving}>Kaydet</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function EditStageDialog({
  stage,
  onClose,
}: {
  stage: Stage | null;
  onClose: () => void;
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [probability, setProbability] = useState("0");
  const [color, setColor] = useState("#94a3b8");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (stage) {
      setName(stage.name);
      setProbability(String(stage.probability));
      setColor(stage.color);
    }
  }, [stage]);

  if (!stage) return null;

  const save = async () => {
    if (!name.trim()) return toast.error("Aşama adı giriniz.");
    setSaving(true);
    try {
      await updateStage(stage.id, {
        name: name.trim(),
        probability: Math.max(0, Math.min(100, Number(probability) || 0)),
        color,
      });
      toast.success("Aşama güncellendi.");
      onClose();
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Hata");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={!!stage} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Aşamayı Düzenle</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-2">
          <div className="space-y-1.5">
            <Label className="text-xs">Aşama Adı</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Kazanma Olasılığı (%)</Label>
              <Input type="number" min={0} max={100} value={probability} onChange={(e) => setProbability(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Renk</Label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-10 w-16 rounded border border-slate-200 dark:border-slate-700 bg-transparent"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={saving}>İptal</Button>
          <Button onClick={save} disabled={saving}>Kaydet</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AddStageInline({ onAdd }: { onAdd: (name: string) => void }) {
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");

  if (!adding)
    return (
      <button
        onClick={() => setAdding(true)}
        className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 px-2 py-1.5"
      >
        <Plus className="size-3.5" /> Aşama ekle
      </button>
    );

  return (
    <div className="flex items-center gap-2 px-2 py-1">
      <Input
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Aşama adı"
        className="h-8 text-sm"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onAdd(name);
            setName("");
            setAdding(false);
          }
          if (e.key === "Escape") setAdding(false);
        }}
      />
      <Button
        size="sm"
        className="h-8"
        onClick={() => {
          onAdd(name);
          setName("");
          setAdding(false);
        }}
      >
        Ekle
      </Button>
    </div>
  );
}
