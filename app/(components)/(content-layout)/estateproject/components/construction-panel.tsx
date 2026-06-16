"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Trash2, Flag, CheckCircle2, Circle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Label,
  Badge,
  Progress,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui";
import {
  phaseStatusLabel,
  taskStatusLabel,
  taskPriorityLabel,
  taskPriorityColor,
  milestoneStatusLabel,
  formatCurrency,
  formatDate,
} from "../lib/labels";
import {
  createPhase,
  updatePhase,
  deletePhase,
  createMilestone,
  updateMilestoneStatus,
  deleteMilestone,
  createProjectTask,
  updateProjectTask,
  deleteProjectTask,
} from "../actions/construction";

export function ConstructionPanel({
  agencyId,
  projectId,
  phases,
  tasks,
  milestones,
  canManage,
}: {
  agencyId: string;
  projectId: string;
  phases: any[];
  tasks: any[];
  milestones: any[];
  canManage: boolean;
}) {
  const router = useRouter();
  const [phaseOpen, setPhaseOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(false);
  const [msOpen, setMsOpen] = useState(false);
  const refresh = () => router.refresh();

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {/* Fazlar */}
      <div className="lg:col-span-2 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">İnşaat Fazları</h3>
          {canManage && (
            <Button size="sm" variant="outline" onClick={() => setPhaseOpen(true)}>
              <Plus className="size-4" /> Faz
            </Button>
          )}
        </div>

        {phases.length === 0 ? (
          <Card><CardContent className="py-10 text-center text-muted-foreground text-sm">Faz yok.</CardContent></Card>
        ) : (
          phases.map((ph) => (
            <PhaseCard key={ph.id} agencyId={agencyId} phase={ph} canManage={canManage} onChange={refresh} />
          ))
        )}

        {/* Görevler */}
        <div className="flex items-center justify-between pt-2">
          <h3 className="font-semibold">Görevler</h3>
          {canManage && (
            <Button size="sm" variant="outline" onClick={() => setTaskOpen(true)}>
              <Plus className="size-4" /> Görev
            </Button>
          )}
        </div>
        <Card>
          <CardContent className="p-3 space-y-1.5">
            {tasks.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">Görev yok.</p>
            ) : (
              tasks.map((t) => (
                <TaskRow key={t.id} task={t} canManage={canManage} onChange={refresh} />
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Kilometre taşları */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Kilometre Taşları</h3>
          {canManage && (
            <Button size="sm" variant="outline" onClick={() => setMsOpen(true)}>
              <Plus className="size-4" /> Ekle
            </Button>
          )}
        </div>
        <Card>
          <CardContent className="p-3">
            {milestones.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">Kilometre taşı yok.</p>
            ) : (
              <div className="space-y-1">
                {milestones.map((m, i) => (
                  <div key={m.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span
                        className={`size-7 rounded-full flex items-center justify-center shrink-0 ${
                          m.status === "REACHED"
                            ? "bg-emerald-500 text-white"
                            : m.status === "MISSED"
                            ? "bg-red-500 text-white"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Flag className="size-3.5" />
                      </span>
                      {i < milestones.length - 1 && <div className="w-px flex-1 bg-border my-1" />}
                    </div>
                    <div className="pb-3 flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium">{m.title}</p>
                        {canManage && (
                          <button onClick={() => deleteMilestone(m.id, agencyId).then(refresh)} className="text-muted-foreground hover:text-red-500">
                            <Trash2 className="size-3.5" />
                          </button>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{formatDate(m.dueDate)}</p>
                      {canManage && m.status === "PENDING" && (
                        <div className="flex gap-1.5 mt-1.5">
                          <button onClick={() => updateMilestoneStatus(m.id, agencyId, "REACHED").then(refresh)} className="text-[11px] text-emerald-600 hover:underline">Ulaşıldı</button>
                          <button onClick={() => updateMilestoneStatus(m.id, agencyId, "MISSED").then(refresh)} className="text-[11px] text-red-500 hover:underline">Kaçırıldı</button>
                        </div>
                      )}
                      {m.status !== "PENDING" && (
                        <Badge variant="secondary" className="mt-1 text-[10px]">{milestoneStatusLabel[m.status]}</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {canManage && (
        <>
          <AddPhaseDialog open={phaseOpen} onOpenChange={setPhaseOpen} agencyId={agencyId} projectId={projectId} />
          <AddTaskDialog open={taskOpen} onOpenChange={setTaskOpen} agencyId={agencyId} projectId={projectId} phases={phases} />
          <AddMilestoneDialog open={msOpen} onOpenChange={setMsOpen} agencyId={agencyId} projectId={projectId} />
        </>
      )}
    </div>
  );
}

function PhaseCard({ agencyId, phase, canManage, onChange }: { agencyId: string; phase: any; canManage: boolean; onChange: () => void }) {
  const [progress, setProgress] = useState(String(phase.progress));
  const saveProgress = async () => {
    const v = Math.max(0, Math.min(100, Number(progress) || 0));
    try { await updatePhase(phase.id, agencyId, { progress: v }); onChange(); } catch (e: any) { toast.error(e?.message ?? "Hata"); }
  };
  const setStatus = async (status: string) => {
    try { await updatePhase(phase.id, agencyId, { status: status as any }); onChange(); } catch (e: any) { toast.error(e?.message ?? "Hata"); }
  };
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-medium">{phase.name}</p>
            <p className="text-xs text-muted-foreground">
              {formatDate(phase.startDate)} – {formatDate(phase.endDate)}
              {phase.plannedBudget ? ` · Bütçe ${formatCurrency(phase.plannedBudget)}` : ""}
              {phase._count?.tasks ? ` · ${phase._count.tasks} görev` : ""}
            </p>
          </div>
          {canManage ? (
            <div className="flex items-center gap-1.5 shrink-0">
              <Select value={phase.status} onValueChange={setStatus}>
                <SelectTrigger className="h-8 w-36 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(phaseStatusLabel).map(([v, l]) => (<SelectItem key={v} value={v}>{l}</SelectItem>))}
                </SelectContent>
              </Select>
              <button onClick={() => deletePhase(phase.id, agencyId).then(onChange)} className="text-muted-foreground hover:text-red-500"><Trash2 className="size-4" /></button>
            </div>
          ) : (
            <Badge variant="secondary">{phaseStatusLabel[phase.status]}</Badge>
          )}
        </div>
        <div className="mt-3 flex items-center gap-3">
          <Progress value={phase.progress} className="h-2 flex-1" />
          {canManage ? (
            <div className="flex items-center gap-1">
              <Input value={progress} onChange={(e) => setProgress(e.target.value)} onBlur={saveProgress} type="number" className="h-7 w-16 text-xs" />
              <span className="text-xs text-muted-foreground">%</span>
            </div>
          ) : (
            <span className="text-xs font-medium">%{phase.progress}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function TaskRow({ task, canManage, onChange }: { task: any; canManage: boolean; onChange: () => void }) {
  const cycle: Record<string, string> = { TODO: "IN_PROGRESS", IN_PROGRESS: "DONE", DONE: "TODO", BLOCKED: "TODO" };
  const toggle = async () => {
    try { await updateProjectTask(task.id, { status: cycle[task.status] as any }); onChange(); } catch (e: any) { toast.error(e?.message ?? "Hata"); }
  };
  return (
    <div className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-muted/50 group">
      <button onClick={toggle} className="shrink-0" disabled={!canManage}>
        {task.status === "DONE" ? <CheckCircle2 className="size-5 text-emerald-500" /> : <Circle className="size-5 text-muted-foreground/40" />}
      </button>
      <div className="min-w-0 flex-1">
        <p className={`text-sm ${task.status === "DONE" ? "line-through text-muted-foreground" : ""}`}>{task.title}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className={`text-[10px] px-1.5 py-0.5 rounded ${taskPriorityColor[task.priority]}`}>{taskPriorityLabel[task.priority]}</span>
          <span className="text-xs text-muted-foreground">{taskStatusLabel[task.status]}</span>
          {task.assigneeName && <span className="text-xs text-muted-foreground">· {task.assigneeName}</span>}
          {task.dueDate && <span className="text-xs text-muted-foreground">· {formatDate(task.dueDate)}</span>}
        </div>
      </div>
      {canManage && (
        <button onClick={() => deleteProjectTask(task.id).then(onChange)} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-500"><Trash2 className="size-4" /></button>
      )}
    </div>
  );
}

/* ----- Dialoglar ----- */

function Fld({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-1.5"><Label className="text-xs">{label}</Label>{children}</div>;
}

function AddPhaseDialog({ open, onOpenChange, agencyId, projectId }: any) {
  const router = useRouter();
  const [f, setF] = useState({ name: "", startDate: "", endDate: "", plannedBudget: "" });
  const [saving, setSaving] = useState(false);
  const submit = async () => {
    if (!f.name.trim()) return toast.error("Faz adı zorunludur.");
    setSaving(true);
    try {
      await createPhase({ agencyId, projectId, name: f.name.trim(), startDate: f.startDate || null, endDate: f.endDate || null, plannedBudget: f.plannedBudget ? Number(f.plannedBudget) : null });
      toast.success("Faz eklendi."); setF({ name: "", startDate: "", endDate: "", plannedBudget: "" }); onOpenChange(false); router.refresh();
    } catch (e: any) { toast.error(e?.message ?? "Hata"); } finally { setSaving(false); }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle>Yeni Faz</DialogTitle></DialogHeader>
        <div className="grid gap-3 py-2">
          <Fld label="Faz Adı *"><Input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Kaba İnşaat" /></Fld>
          <div className="grid grid-cols-2 gap-3">
            <Fld label="Başlangıç"><Input type="date" value={f.startDate} onChange={(e) => setF({ ...f, startDate: e.target.value })} /></Fld>
            <Fld label="Bitiş"><Input type="date" value={f.endDate} onChange={(e) => setF({ ...f, endDate: e.target.value })} /></Fld>
          </div>
          <Fld label="Planlanan Bütçe"><Input type="number" value={f.plannedBudget} onChange={(e) => setF({ ...f, plannedBudget: e.target.value })} /></Fld>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>İptal</Button>
          <Button onClick={submit} disabled={saving}>Ekle</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AddTaskDialog({ open, onOpenChange, agencyId, projectId, phases }: any) {
  const router = useRouter();
  const NONE = "__none__";
  const [f, setF] = useState({ title: "", priority: "MEDIUM", dueDate: "", assigneeName: "", phaseId: "" });
  const [saving, setSaving] = useState(false);
  const submit = async () => {
    if (!f.title.trim()) return toast.error("Görev başlığı zorunludur.");
    setSaving(true);
    try {
      await createProjectTask({ agencyId, projectId, title: f.title.trim(), priority: f.priority as any, dueDate: f.dueDate || null, assigneeName: f.assigneeName || undefined, phaseId: f.phaseId || null });
      toast.success("Görev eklendi."); setF({ title: "", priority: "MEDIUM", dueDate: "", assigneeName: "", phaseId: "" }); onOpenChange(false); router.refresh();
    } catch (e: any) { toast.error(e?.message ?? "Hata"); } finally { setSaving(false); }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle>Yeni Görev</DialogTitle></DialogHeader>
        <div className="grid gap-3 py-2">
          <Fld label="Başlık *"><Input value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} /></Fld>
          <div className="grid grid-cols-2 gap-3">
            <Fld label="Öncelik">
              <Select value={f.priority} onValueChange={(v) => setF({ ...f, priority: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{Object.entries(taskPriorityLabel).map(([v, l]) => (<SelectItem key={v} value={v}>{l}</SelectItem>))}</SelectContent>
              </Select>
            </Fld>
            <Fld label="Bitiş"><Input type="date" value={f.dueDate} onChange={(e) => setF({ ...f, dueDate: e.target.value })} /></Fld>
          </div>
          <Fld label="Faz">
            <Select value={f.phaseId || NONE} onValueChange={(v) => setF({ ...f, phaseId: v === NONE ? "" : v })}>
              <SelectTrigger><SelectValue placeholder="Fazsız" /></SelectTrigger>
              <SelectContent>
                <SelectItem value={NONE}>Fazsız</SelectItem>
                {phases.map((p: any) => (<SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>))}
              </SelectContent>
            </Select>
          </Fld>
          <Fld label="Sorumlu"><Input value={f.assigneeName} onChange={(e) => setF({ ...f, assigneeName: e.target.value })} /></Fld>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>İptal</Button>
          <Button onClick={submit} disabled={saving}>Ekle</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AddMilestoneDialog({ open, onOpenChange, agencyId, projectId }: any) {
  const router = useRouter();
  const [f, setF] = useState({ title: "", dueDate: "" });
  const [saving, setSaving] = useState(false);
  const submit = async () => {
    if (!f.title.trim()) return toast.error("Başlık zorunludur.");
    setSaving(true);
    try {
      await createMilestone({ agencyId, projectId, title: f.title.trim(), dueDate: f.dueDate || null });
      toast.success("Kilometre taşı eklendi."); setF({ title: "", dueDate: "" }); onOpenChange(false); router.refresh();
    } catch (e: any) { toast.error(e?.message ?? "Hata"); } finally { setSaving(false); }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader><DialogTitle>Yeni Kilometre Taşı</DialogTitle></DialogHeader>
        <div className="grid gap-3 py-2">
          <Fld label="Başlık *"><Input value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} placeholder="Temel atma" /></Fld>
          <Fld label="Hedef Tarih"><Input type="date" value={f.dueDate} onChange={(e) => setF({ ...f, dueDate: e.target.value })} /></Fld>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>İptal</Button>
          <Button onClick={submit} disabled={saving}>Ekle</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
