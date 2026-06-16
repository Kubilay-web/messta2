// "use server";

// import { revalidatePath } from "next/cache";
// import { CreateDoc } from "../components/dashboard/StudentDocumentFileUploadForm";
// import { StudentDocument } from "../components/StudentDocuments";

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// // --- ortak fetch helper ---
// async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
//   const res = await fetch(url, {
//     ...options,
//     headers: {
//       "Content-Type": "application/json",
//       ...(options?.headers || {}),
//     },
//   });

//   if (!res.ok) {
//     let message = `Request failed: ${res.status}`;
//     try {
//       const err = await res.json();
//       message = err?.message || message;
//     } catch {}
//     throw new Error(message);
//   }

//   return res.json();
// }

// // --- Create Student Docs ---
// export async function createStudentDocs(data: CreateDoc[]) {
//   try {
//     const result = await fetcher(`${BASE_URL}/api/schoolmanage/studentdocs`, {
//       method: "POST",
//       body: JSON.stringify(data),
//     });

//     revalidatePath("/dashboard/students/view");
//     return result;
//   } catch (error: any) {
//     throw new Error(error.message || "Failed to create student docs");
//   }
// }

// // --- Get Student Docs ---
// export async function getStudentDocs(studentId: string) {
//   try {
//     const result = await fetcher<{ data: StudentDocument[] }>(
//       `${BASE_URL}/api/schoolmanage/studentdocs`
//     );
//     return result.data;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// }

// // --- Delete Student Doc ---
// export async function deleteDocument(id: string) {
//   try {
//     const result = await fetcher<{ data: StudentDocument[] }>(
//       `${BASE_URL}/api/schoolmanage/studentdocs`,
//       { method: "DELETE" }
//     );
//     return result.data;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// }












"use server";

import { revalidatePath } from "next/cache";
import { CreateDoc } from "../components/dashboard/StudentDocumentFileUploadForm";
import { StudentDocument } from "../components/StudentDocuments";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// --- ortak fetch helper ---
async function fetcher<T>(
  url: string, 
  options?: RequestInit
): Promise<{ data: T; error: null } | { data: null; error: string }> {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      console.error("API Error Response:", { status: res.status, result });
      return { 
        data: null, 
        error: result?.error || result?.message || `Request failed with status ${res.status}` 
      };
    }

    return result;
  } catch (error) {
    console.error("Fetch error:", error);
    return { data: null, error: "Network error" };
  }
}

// --- Create Student Docs ---
export async function createStudentDocs(data: CreateDoc[]) {
  try {
    // Dizi kontrolü
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Documents array is required and cannot be empty");
    }

    // Her bir doküman için gerekli alanları kontrol et
    for (const doc of data) {
      if (!doc.name || !doc.type || !doc.url || !doc.studentId) {
        throw new Error("Each document must have name, type, url, and studentId");
      }
    }

    console.log("Creating student docs:", data);

    const result = await fetcher<StudentDocument[]>(
      `${BASE_URL}/api/schoolmanage/studentdocs`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    if (result.error) {
      throw new Error(result.error);
    }

    revalidatePath("/dashboard/students/view");
    return result.data;
  } catch (error: any) {
    console.error("Create student docs error:", error);
    throw new Error(error.message || "Failed to create student docs");
  }
}

// --- Get Student Docs by Student ID ---
export async function getStudentDocs(studentId: string) {
  try {
    if (!studentId) {
      console.error("Student ID is required");
      return [];
    }

    console.log("Fetching docs for student:", studentId);

    const result = await fetcher<StudentDocument[]>(
      `${BASE_URL}/api/schoolmanage/studentdocs?studentId=${studentId}`
    );

    if (result.error) {
      console.error("Get student docs error:", result.error);
      return [];
    }

    return result.data || [];
  } catch (error) {
    console.error("Get student docs error:", error);
    return [];
  }
}

// --- Get Single Document by ID ---
export async function getDocumentById(documentId: string) {
  try {
    if (!documentId) {
      console.error("Document ID is required");
      return null;
    }

    const result = await fetcher<StudentDocument>(
      `${BASE_URL}/api/schoolmanage/studentdocs?id=${documentId}`
    );

    if (result.error) {
      console.error("Get document by id error:", result.error);
      return null;
    }

    return result.data || null;
  } catch (error) {
    console.error("Get document by id error:", error);
    return null;
  }
}

// --- Get Recent Documents ---
export async function getRecentDocuments(limit: number = 10) {
  try {
    const result = await fetcher<StudentDocument[]>(
      `${BASE_URL}/api/schoolmanage/studentdocs?type=recent&limit=${limit}`
    );

    if (result.error) {
      console.error("Get recent documents error:", result.error);
      return [];
    }

    return result.data || [];
  } catch (error) {
    console.error("Get recent documents error:", error);
    return [];
  }
}

// --- Get All Documents ---
export async function getAllDocuments() {
  try {
    const result = await fetcher<StudentDocument[]>(
      `${BASE_URL}/api/schoolmanage/studentdocs`
    );

    if (result.error) {
      console.error("Get all documents error:", result.error);
      return [];
    }

    return result.data || [];
  } catch (error) {
    console.error("Get all documents error:", error);
    return [];
  }
}

// --- Update Document ---
export async function updateDocument(
  id: string, 
  data: Partial<CreateDoc>
) {
  try {
    if (!id) {
      throw new Error("Document ID is required");
    }

    const result = await fetcher<StudentDocument>(
      `${BASE_URL}/api/schoolmanage/studentdocs?id=${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      }
    );

    if (result.error) {
      throw new Error(result.error);
    }

    revalidatePath("/dashboard/students/view");
    return result.data;
  } catch (error: any) {
    console.error("Update document error:", error);
    throw new Error(error.message || "Failed to update document");
  }
}

// --- Delete Student Doc ---
export async function deleteDocument(id: string) {
  try {
    if (!id) {
      throw new Error("Document ID is required");
    }

    console.log("Deleting document:", id);

    const result = await fetcher<StudentDocument>(
      `${BASE_URL}/api/schoolmanage/studentdocs?id=${id}`,
      { 
        method: "DELETE" 
      }
    );

    if (result.error) {
      throw new Error(result.error);
    }

    revalidatePath("/dashboard/students/view");
    return result.data;
  } catch (error: any) {
    console.error("Delete document error:", error);
    throw new Error(error.message || "Failed to delete document");
  }
}