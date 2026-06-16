"use server";

import db from "@/app/lib/db";
import { isAdmin } from "../../../../lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { validateRequest } from "@/app/auth";
import { Prisma } from "@prisma/client";

type FormState = { error?: string } | undefined;

export async function approveSubmission(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    // MongoDB cuid -> String
    const jobId = formData.get("jobId") as string;
    if (!jobId) {
      throw new Error("Geçersiz iş ilanı kimliği");
    }

    const { user } = await validateRequest();
    if (!user || !isAdmin(user)) {
      throw new Error("Not authorized");
    }

    await db.jobs.update({
      where: { id: jobId },
      data: { status: Prisma.JobStatus.status },
    });

    revalidatePath("/");
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
}

export async function deleteJob(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    // MongoDB cuid -> String
    const jobId = formData.get("jobId") as string;
    if (!jobId) {
      throw new Error("Geçersiz iş ilanı kimliği");
    }

    const { user } = await validateRequest();
    if (!user || !isAdmin(user)) {
      throw new Error("Not authorized");
    }



    await db.jobs.delete({
      where: { id: jobId },
    });

    revalidatePath("/apps/jobportal");
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }

  redirect("/apps/jobportal/job/admin");
}
