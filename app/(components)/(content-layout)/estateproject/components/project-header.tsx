"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, MapPin, Pencil, Trash2 } from "lucide-react";
import { Button } from "../components/ui";
import { projectTypeLabel, projectStatusLabel, projectStatusColor } from "../lib/labels";
import { deleteProject } from "../actions/projects";
import { ProjectDialog } from "./project-dialog";

export function ProjectHeader({
  agencyId,
  project,
  canManage,
}: {
  agencyId: string;
  project: any;
  canManage: boolean;
}) {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);

  const remove = async () => {
    if (!window.confirm(`"${project.name}" projesi ve tüm verileri silinsin mi? Bu işlem geri alınamaz.`)) return;
    try {
      await deleteProject(project.id);
      toast.success("Proje silindi.");
      router.push(`/estateproject/agency/${agencyId}/projects`);
    } catch (e: any) {
      toast.error(e?.message ?? "Hata");
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <Button asChild variant="ghost" size="icon">
          <Link href={`/estateproject/agency/${agencyId}/projects`}>
            <ArrowLeft className="size-5" />
          </Link>
        </Button>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl font-bold truncate">{project.name}</h1>
            <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${projectStatusColor[project.status]}`}>
              {projectStatusLabel[project.status]}
            </span>
          </div>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <MapPin className="size-3" />
            {[project.district, project.city].filter(Boolean).join(", ")} · {projectTypeLabel[project.type]}
            {project.code ? ` · ${project.code}` : ""}
          </p>
        </div>
      </div>
      {canManage && (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setEditOpen(true)}>
            <Pencil className="size-4" /> Düzenle
          </Button>
          <Button variant="outline" size="sm" onClick={remove}>
            <Trash2 className="size-4 text-red-500" /> Sil
          </Button>
        </div>
      )}

      <ProjectDialog open={editOpen} onOpenChange={setEditOpen} agencyId={agencyId} project={project} />
    </div>
  );
}
