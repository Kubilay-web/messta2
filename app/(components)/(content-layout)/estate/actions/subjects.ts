// "use server";

// import {
//   Class,
//   ClassCreateProps,
//   Contact,
//   Department,
//   DepartmentBrief,
//   DepartmentCreateProps,
//   Stream,
//   StreamCreateProps,
//   Subject,
//   SubjectBrief,
//   SubjectCreateProps,
// } from "../types/types";
// import { revalidatePath } from "next/cache";

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// export async function createSubject(data: SubjectCreateProps) {
//   try {
//     const response = await fetch(`${BASE_URL}/api/schoolmanage/subjects`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData?.message || "Failed to create Subject");
//     }

//     const result = await response.json();
//     revalidatePath("/dashboard/academics/subjects");
//     return result;
//   } catch (error) {
//     throw error;
//   }
// }

// export async function deleteSubject(id: string) {
//   try {
//     const response = await fetch(`${BASE_URL}/api/schoolmanage/subjects?id=${id}`, {
//       method: "DELETE",
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData?.message || "Failed to delete Subject");
//     }

//     const subject = await response.json();
//     return subject as Subject;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

// export async function getAllSubjects(schoolId: string) {
//   try {
//     const response = await fetch(`${BASE_URL}/api/schoolmanage/subjects?schoolId=${schoolId}`);

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData?.message || "Failed to fetch subjects");
//     }

//     const subjects = await response.json();
//     return subjects as Subject[];
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

// export async function getBriefSubjects(schoolId: string) {
//   try {
//     const response = await fetch(`${BASE_URL}/api/schoolmanage/subjects?schoolId=${schoolId}&brief=true`);

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData?.message || "Failed to fetch brief subjects");
//     }

//     const subjects = await response.json();
//     return subjects as SubjectBrief[];
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }


"use server";

import {
  Class,
  ClassCreateProps,
  Contact,
  Department,
  DepartmentBrief,
  DepartmentCreateProps,
  Stream,
  StreamCreateProps,
  Subject,
  SubjectBrief,
  SubjectCreateProps,
} from "../types/types";
import { revalidatePath } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Helper fetcher fonksiyonu
async function fetcher<T>(
  url: string,
  options?: RequestInit
): Promise<{ data: T; error: null } | { data: null; error: string }> {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  const result = await res.json();

  if (!res.ok) {
    console.error("API Error:", result);
    return { data: null, error: result?.error || result?.message || "Request failed" };
  }

  return result;
}

export async function createSubject(data: SubjectCreateProps) {
  try {
    const result = await fetcher<Subject>(`${BASE_URL}/api/schoolmanage/subjects`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (result.error) {
      throw new Error(result.error);
    }

    revalidatePath("/dashboard/academics/subjects");
    return result.data;
  } catch (error: any) {
    console.error("Create subject error:", error);
    throw new Error(error.message || "Failed to create Subject");
  }
}

export async function deleteSubject(id: string) {
  try {
    const result = await fetcher<Subject>(`${BASE_URL}/api/schoolmanage/subjects?id=${id}`, {
      method: "DELETE",
    });

    if (result.error) {
      throw new Error(result.error);
    }

    revalidatePath("/dashboard/academics/subjects");
    return result.data;
  } catch (error: any) {
    console.error("Delete subject error:", error);
    throw new Error(error.message || "Failed to delete Subject");
  }
}

export async function getAllSubjects(schoolId: string) {
  try {
    const result = await fetcher<Subject[]>(`${BASE_URL}/api/schoolmanage/subjects?schoolId=${schoolId}`);

    if (result.error) {
      console.error("Get all subjects error:", result.error);
      return [];
    }

    return result.data || [];
  } catch (error) {
    console.error("Get all subjects error:", error);
    return [];
  }
}

export async function getBriefSubjects(schoolId: string) {
  try {
    const result = await fetcher<SubjectBrief[]>(
      `${BASE_URL}/api/schoolmanage/subjects?schoolId=${schoolId}&brief=true`
    );

    console.log("getBriefSubjects raw result:", result);

    if (result.error) {
      console.error("Get brief subjects error:", result.error);
      return [];
    }

    // result.data direkt array olarak döner
    return result.data || [];
  } catch (error) {
    console.error("Get brief subjects error:", error);
    return []; // Hata durumunda boş array dön
  }
}

export async function getSubjectById(id: string) {
  try {
    const result = await fetcher<Subject>(`${BASE_URL}/api/schoolmanage/subjects?id=${id}`);

    if (result.error) {
      console.error("Get subject by id error:", result.error);
      return null;
    }

    return result.data || null;
  } catch (error) {
    console.error("Get subject by id error:", error);
    return null;
  }
}

export async function updateSubject(id: string, data: Partial<SubjectCreateProps>) {
  try {
    const result = await fetcher<Subject>(`${BASE_URL}/api/schoolmanage/subjects?id=${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });

    if (result.error) {
      throw new Error(result.error);
    }

    revalidatePath("/dashboard/academics/subjects");
    return result.data;
  } catch (error: any) {
    console.error("Update subject error:", error);
    throw new Error(error.message || "Failed to update Subject");
  }
}