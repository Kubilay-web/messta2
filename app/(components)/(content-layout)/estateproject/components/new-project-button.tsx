"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "../components/ui";
import { ProjectDialog } from "./project-dialog";

export function NewProjectButton({ agencyId }: { agencyId: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="size-4" /> Yeni Proje
      </Button>
      <ProjectDialog open={open} onOpenChange={setOpen} agencyId={agencyId} />
    </>
  );
}
