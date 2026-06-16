import { getTasks } from "../../../actions/tasks";
import { requireAgencyAccess } from "../../../lib/auth";
import { TasksBoard } from "../../../components/tasks/tasks-board";
import { NewTaskButton } from "../../../components/tasks/new-task-button";

export const dynamic = "force-dynamic";

export default async function TasksPage({
  params,
}: {
  params: Promise<{ agencyId: string }>;
}) {
  const { agencyId } = await params;
  await requireAgencyAccess(agencyId);
  const raw = await getTasks(agencyId);

  const tasks = raw.map((t) => ({
    id: t.id,
    title: t.title,
    description: t.description,
    status: t.status,
    priority: t.priority,
    dueDate: t.dueDate ? t.dueDate.toISOString() : null,
    agentName: t.agentName,
    leadId: t.leadId,
    lead: t.lead,
  }));

  const open = tasks.filter((t) => t.status !== "DONE").length;

  return (
    <div className="p-4 sm:p-6 space-y-4 max-w-[1500px] mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Görevler</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{open} açık görev</p>
        </div>
        <NewTaskButton agencyId={agencyId} />
      </div>
      <TasksBoard agencyId={agencyId} tasks={tasks} />
    </div>
  );
}
