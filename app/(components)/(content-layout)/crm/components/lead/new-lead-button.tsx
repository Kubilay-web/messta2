"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "../ui";
import { LeadDialog } from "../pipeline/lead-dialog";
import type { FormOptions } from "../pipeline/types";

export function NewLeadButton({
  agencyId,
  pipelineId,
  options,
}: {
  agencyId: string;
  pipelineId: string;
  options: FormOptions;
}) {
  const [open, setOpen] = useState(false);
  if (!pipelineId) return null;
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="size-4" /> Yeni Fırsat
      </Button>
      <LeadDialog
        open={open}
        onOpenChange={setOpen}
        agencyId={agencyId}
        pipelineId={pipelineId}
        options={options}
      />
    </>
  );
}
