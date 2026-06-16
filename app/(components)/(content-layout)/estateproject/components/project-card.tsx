import Link from "next/link";
import { MapPin, Building2, Layers3 } from "lucide-react";
import { Card, CardContent, Progress } from "../components/ui";
import {
  projectTypeLabel,
  projectStatusLabel,
  projectStatusColor,
  formatCompact,
} from "../lib/labels";

export function ProjectCard({ agencyId, project }: { agencyId: string; project: any }) {
  const s = project.stats;
  const soldPct = s.total ? Math.round((s.sold / s.total) * 100) : 0;

  return (
    <Link href={`/estateproject/agency/${agencyId}/projects/${project.id}`}>
      <Card className="overflow-hidden hover:border-amber-500/40 transition-colors h-full">
        <div className="h-32 bg-gradient-to-br from-amber-500/15 to-amber-500/5 relative flex items-center justify-center">
          {project.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.coverImage} alt={project.name} className="w-full h-full object-cover" />
          ) : (
            <Building2 className="size-10 text-amber-500/40" />
          )}
          <span
            className={`absolute top-2 right-2 text-[10px] font-medium px-2 py-0.5 rounded-full ${projectStatusColor[project.status]}`}
          >
            {projectStatusLabel[project.status]}
          </span>
        </div>

        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="font-semibold truncate">{project.name}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <MapPin className="size-3" />
                {[project.district, project.city].filter(Boolean).join(", ")}
              </p>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground shrink-0">
              {projectTypeLabel[project.type]}
            </span>
          </div>

          <div className="mt-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-muted-foreground">İnşaat ilerlemesi</span>
              <span className="font-medium">%{project.progress}</span>
            </div>
            <Progress value={project.progress} className="h-1.5" />
          </div>

          <div className="grid grid-cols-3 gap-1.5 mt-3 text-center">
            <div className="rounded-lg bg-emerald-50 dark:bg-emerald-500/10 py-1.5">
              <p className="text-sm font-bold text-emerald-600">{s.available}</p>
              <p className="text-[10px] text-muted-foreground">Müsait</p>
            </div>
            <div className="rounded-lg bg-amber-50 dark:bg-amber-500/10 py-1.5">
              <p className="text-sm font-bold text-amber-600">{s.reserved}</p>
              <p className="text-[10px] text-muted-foreground">Rezerve</p>
            </div>
            <div className="rounded-lg bg-red-50 dark:bg-red-500/10 py-1.5">
              <p className="text-sm font-bold text-red-600">{s.sold}</p>
              <p className="text-[10px] text-muted-foreground">Satıldı</p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t text-xs">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Layers3 className="size-3.5" /> {s.total} daire
            </span>
            <span className="font-semibold">{formatCompact(s.soldValue, project.currency)} satış</span>
          </div>
          {s.total > 0 && (
            <div className="mt-1 text-[10px] text-muted-foreground text-right">%{soldPct} satıldı</div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
