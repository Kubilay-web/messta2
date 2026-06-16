"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";

const PATH = "/estate/dashboard/agents";

export type AgentDocumentProps = {
  agentId: string;
  type:    string;
  title:   string;
  url:     string;
};

// ==================== ADD ====================
export async function addAgentDocument(data: AgentDocumentProps) {
  const doc = await db.agentDocument.create({
    data: {
      agentId: data.agentId,
      type:    data.type as any,
      title:   data.title,
      url:     data.url,
    },
  });

  revalidatePath(`${PATH}/view/${data.agentId}`);
  revalidatePath(`${PATH}/edit/${data.agentId}`);
  return doc;
}

// ==================== DELETE ====================
export async function deleteAgentDocument(docId: string, agentId: string) {
  await db.agentDocument.delete({ where: { id: docId } });
  revalidatePath(`${PATH}/view/${agentId}`);
  revalidatePath(`${PATH}/edit/${agentId}`);
  return { ok: true };
}

// ==================== GET ====================
export async function getAgentDocuments(agentId: string) {
  return db.agentDocument.findMany({
    where:   { agentId },
    orderBy: { uploadedAt: "desc" },
  });
}
