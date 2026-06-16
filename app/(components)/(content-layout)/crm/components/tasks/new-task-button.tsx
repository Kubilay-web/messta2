"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
  Label,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui";
import { taskPriorityLabel } from "../../lib/labels";
import { createTask } from "../../actions/tasks";

export function NewTaskButton({ agencyId }: { agencyId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [f, setF] = useState({ title: "", description: "", priority: "MEDIUM", dueDate: "" });
  const set = (k: keyof typeof f, v: string) => setF((p) => ({ ...p, [k]: v }));

  const submit = async () => {
    if (!f.title.trim()) return toast.error("Görev başlığı zorunludur.");
    setSaving(true);
    try {
      await createTask({
        agencyId,
        title: f.title.trim(),
        description: f.description || undefined,
        priority: f.priority as any,
        dueDate: f.dueDate || null,
      });
      toast.success("Görev oluşturuldu.");
      setF({ title: "", description: "", priority: "MEDIUM", dueDate: "" });
      setOpen(false);
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Hata");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="size-4" /> Yeni Görev
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Yeni Görev</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 py-2">
            <div className="space-y-1.5">
              <Label className="text-xs">Başlık *</Label>
              <Input value={f.title} onChange={(e) => set("title", e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Öncelik</Label>
                <Select value={f.priority} onValueChange={(v) => set("priority", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(taskPriorityLabel).map(([v, l]) => (
                      <SelectItem key={v} value={v}>
                        {l}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Bitiş</Label>
                <Input type="date" value={f.dueDate} onChange={(e) => set("dueDate", e.target.value)} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Açıklama</Label>
              <Textarea rows={3} value={f.description} onChange={(e) => set("description", e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={saving}>
              İptal
            </Button>
            <Button onClick={submit} disabled={saving}>
              {saving ? "Kaydediliyor..." : "Oluştur"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
