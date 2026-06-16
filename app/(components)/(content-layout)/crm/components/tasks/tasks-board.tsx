"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Check, Trash2, ArrowRight, Clock } from "lucide-react";
import { Card, CardContent, Badge } from "../../components/ui";
import {
  formatDate,
  taskPriorityColor,
  taskPriorityLabel,
  taskStatusLabel,
} from "../../lib/labels";
import { updateTaskStatus, deleteTask } from "../../actions/tasks";

type Task = {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  dueDate: string | null;
  agentName: string | null;
  leadId: string | null;
  lead: { id: string; title: string; contactName: string } | null;
};

const COLUMNS = [
  { key: "TODO", label: "Yapılacak", accent: "border-t-slate-400" },
  { key: "IN_PROGRESS", label: "Devam Ediyor", accent: "border-t-sky-500" },
  { key: "DONE", label: "Tamamlandı", accent: "border-t-emerald-500" },
];

export function TasksBoard({ agencyId, tasks }: { agencyId: string; tasks: Task[] }) {
  const router = useRouter();

  const move = async (task: Task, status: string) => {
    try {
      await updateTaskStatus(task.id, status as any);
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Hata");
    }
  };

  const remove = async (id: string) => {
    try {
      await deleteTask(id);
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Hata");
    }
  };

  const grouped = (status: string) => tasks.filter((t) => t.status === status);

  const nextStatus: Record<string, string> = {
    TODO: "IN_PROGRESS",
    IN_PROGRESS: "DONE",
  };

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {COLUMNS.map((col) => {
        const items = grouped(col.key);
        return (
          <div key={col.key} className={`rounded-xl border border-t-4 bg-card ${col.accent}`}>
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <span className="font-semibold text-sm">{col.label}</span>
              <Badge variant="secondary">{items.length}</Badge>
            </div>
            <div className="p-3 space-y-2 min-h-[120px]">
              {items.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-6">Görev yok.</p>
              ) : (
                items.map((t) => {
                  const overdue =
                    t.dueDate && t.status !== "DONE" && new Date(t.dueDate) < new Date();
                  return (
                    <Card key={t.id} className="group">
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between gap-2">
                          <p
                            className={`text-sm font-medium ${
                              t.status === "DONE" ? "line-through text-muted-foreground" : ""
                            }`}
                          >
                            {t.title}
                          </p>
                          <button
                            onClick={() => remove(t.id)}
                            className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-500 transition-opacity shrink-0"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>

                        {t.lead && (
                          <Link
                            href={`/crm/agency/${agencyId}/leads/${t.lead.id}`}
                            className="text-xs text-primary hover:underline mt-1 inline-block"
                          >
                            {t.lead.title}
                          </Link>
                        )}

                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded ${taskPriorityColor[t.priority]}`}
                          >
                            {taskPriorityLabel[t.priority]}
                          </span>
                          {t.dueDate && (
                            <span
                              className={`text-xs flex items-center gap-1 ${
                                overdue ? "text-red-500 font-medium" : "text-muted-foreground"
                              }`}
                            >
                              <Clock className="size-3" />
                              {formatDate(t.dueDate)}
                            </span>
                          )}
                          {t.agentName && (
                            <span className="text-xs text-muted-foreground">{t.agentName}</span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 mt-2.5 pt-2 border-t">
                          {col.key !== "DONE" ? (
                            <button
                              onClick={() => move(t, nextStatus[col.key])}
                              className="text-xs text-primary hover:underline flex items-center gap-1"
                            >
                              {taskStatusLabel[nextStatus[col.key]]}
                              <ArrowRight className="size-3" />
                            </button>
                          ) : (
                            <button
                              onClick={() => move(t, "TODO")}
                              className="text-xs text-muted-foreground hover:underline"
                            >
                              Yeniden aç
                            </button>
                          )}
                          {col.key !== "DONE" && (
                            <button
                              onClick={() => move(t, "DONE")}
                              className="text-xs text-emerald-600 hover:underline flex items-center gap-1 ml-auto"
                            >
                              <Check className="size-3" /> Bitir
                            </button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
