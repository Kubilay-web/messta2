"use server";

import { revalidatePath } from "next/cache";
import {
  Department,
  DepartmentBrief,
  DepartmentCreateProps,
} from "../types/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// -------------------- CREATE --------------------
export async function createDepartment(data: DepartmentCreateProps) {
  try {
    const res = await fetch(`${BASE_URL}/api/schoolmanage/departments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to create Department");
    }

    const responseData = await res.json();
    revalidatePath("/dashboard/departments");

    return responseData.data as Department;
  } catch (error) {
    console.error("createDepartment error:", error);
    throw error;
  }
}

// -------------------- DELETE --------------------
export async function deleteDepartment(id: string) {
  try {
    const res = await fetch(`${BASE_URL}/api/schoolmanage/departments`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to delete Department");
    }

    const responseData = await res.json();
    revalidatePath("/dashboard/departments");

    return responseData.data as Department;
  } catch (error) {
    console.error("deleteDepartment error:", error);
    throw error;
  }
}

// -------------------- GET ALL --------------------
export async function getAllDepartments(schoolId: string) {
  try {
    const res = await fetch(`${BASE_URL}/api/schoolmanage/departments`);
    if (!res.ok) return [];

    const data = await res.json().catch(() => []);
    return Array.isArray(data) ? (data as Department[]) : [];
  } catch (error) {
    console.error("getAllDepartments error:", error);
    return [];
  }
}

// -------------------- GET BRIEF --------------------
export async function getBriefDepartments(schoolId: string) {
  try {
    const res = await fetch(`${BASE_URL}/api/schoolmanage/departments`);
    if (!res.ok) return [];

    const data = await res.json().catch(() => []);
    return Array.isArray(data) ? (data as DepartmentBrief[]) : [];
  } catch (error) {
    console.error("getBriefDepartments error:", error);
    return [];
  }
}