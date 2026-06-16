"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";

const PATH = "/estate/dashboard/contracts";

export type ContractDocumentProps = {
  contractId: string;
  type:       string;
  title:      string;
  url:        string;
  size?:      number;
};

// ==================== ADD ====================
export async function addContractDocument(data: ContractDocumentProps) {
  const doc = await db.contractDocument.create({
    data: {
      contractId: data.contractId,
      type:       data.type as any,
      title:      data.title,
      url:        data.url,
      size:       data.size ?? null,
    },
  });

  revalidatePath(`${PATH}/view/${data.contractId}`);
  revalidatePath(`${PATH}/edit/${data.contractId}`);
  return doc;
}

// ==================== DELETE ====================
export async function deleteContractDocument(docId: string, contractId: string) {
  await db.contractDocument.delete({ where: { id: docId } });
  revalidatePath(`${PATH}/view/${contractId}`);
  revalidatePath(`${PATH}/edit/${contractId}`);
  return { ok: true };
}

// ==================== GET ====================
export async function getContractDocuments(contractId: string) {
  return db.contractDocument.findMany({
    where:   { contractId },
    orderBy: { uploadedAt: "desc" },
  });
}
