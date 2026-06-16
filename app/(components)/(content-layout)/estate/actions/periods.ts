"use server";

import {
  DepartmentBrief,
  GroupedPeriods,
  Period,
  PeriodCreateProps,
} from "../types/types";
import { revalidatePath } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// ortak fetch helper
async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  if (!res.ok) {
    let message = "Request failed";
    try {
      const err = await res.json();
      message = err?.error || err?.message || message;
    } catch {}
    throw new Error(message);
  }

  return res.json();
}

export async function createPeriod(data: PeriodCreateProps) {
  try {
    // School ID kontrolü
    if (!data.schoolId) {
      throw new Error("School ID is required");
    }

    const result = await fetcher<{ data: Period; error: null }>(
      `${BASE_URL}/api/schoolmanage/periods`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    revalidatePath("/dashboard/academics/terms");

    return result.data; // Sadece data'yı döndür
  } catch (error: any) {
    console.error("Create period error:", error);
    throw new Error(error.message || "Failed to create Period");
  }
}




export async function updatePeriodById(
  id: string,
  data: Partial<PeriodCreateProps>
) {
  try {
    const { schoolId, ...safeData } = data; // ✅ schoolId çıkarıldı

    const result = await fetcher<{ data: Period; error: null }>(
      `${BASE_URL}/api/schoolmanage/periods?id=${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(safeData),
      }
    );

    revalidatePath("/dashboard/academics/terms");

    return result.data;
  } catch (error: any) {
    console.error("Update period error:", error);
    throw new Error(error.message || "Failed to update Period");
  }
}



export async function getAllGroupedPeriods(schoolId: string) {
  try {
    const result = await fetcher<{ data: GroupedPeriods; error: null }>(
      `${BASE_URL}/api/schoolmanage/periods?schoolId=${schoolId}&type=grouped`
    );

    return result.data; // GroupedPeriods döner
  } catch (error) {
    console.error("Get grouped periods error:", error);
    return {};
  }
}

export async function getAllPeriods(schoolId: string) {
  try {
    const result = await fetcher<{ data: Period[]; error: null }>(
      `${BASE_URL}/api/schoolmanage/periods?schoolId=${schoolId}`
    );

    return result.data; // Period[] döner
  } catch (error) {
    console.error("Get all periods error:", error);
    return []; // Hata durumunda boş array
  }
}

export async function getBriefDepartments(schoolId: string) {
  try {
    const result = await fetcher<{ data: DepartmentBrief[]; error: null }>(
      `${BASE_URL}/api/schoolmanage/departments?schoolId=${schoolId}&brief=true`
    );

    return result.data; // DepartmentBrief[] döner
  } catch (error) {
    console.error("Get brief departments error:", error);
    return [];
  }
}