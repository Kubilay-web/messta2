import { Building2 } from "lucide-react";
import { getProjects } from "../../../actions/projects";
import { requireAgencyAccess } from "../../../lib/auth";
import { ProjectCard } from "../../../components/project-card";
import { NewProjectButton } from "../../../components/new-project-button";
import { Card, CardContent } from "../../../components/ui";

export const dynamic = "force-dynamic";

export default async function ProjectsListPage({
  params,
}: {
  params: Promise<{ agencyId: string }>;
}) {
  const { agencyId } = await params;
  await requireAgencyAccess(agencyId);
  const projects = await getProjects(agencyId);

  return (
    <div className="p-4 sm:p-6 space-y-4 max-w-[1600px] mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projeler</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{projects.length} proje</p>
        </div>
        <NewProjectButton agencyId={agencyId} />
      </div>

      {projects.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center text-muted-foreground">
            <Building2 className="size-10 mx-auto mb-3 opacity-40" />
            <p>Henüz proje yok.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((p) => (
            <ProjectCard key={p.id} agencyId={agencyId} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}
