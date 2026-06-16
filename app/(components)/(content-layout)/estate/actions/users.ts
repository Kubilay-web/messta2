// // app/(components)/(content-layout)/management/actions/users.ts

// "use server";

// import { Staff, UserCreateProps, UserRole } from "../types/types";

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

// // CREATE USER - Detaylı hata loglama ile
// export async function createUser(data: UserCreateProps) {
//   try {
//     console.log("createUser - Request Data:", JSON.stringify(data, null, 2));
    
//     const url = `${BASE_URL}/api/schoolmanage/users`;
//     console.log("createUser - Fetching URL:", url);
    
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//       cache: "no-store",
//     });

//     console.log("createUser - Response Status:", response.status);
//     console.log("createUser - Response Headers:", Object.fromEntries(response.headers.entries()));

//     // Response body'yi oku
//     const responseText = await response.text();
//     console.log("createUser - Response Text:", responseText);

//     let result;
//     try {
//       result = JSON.parse(responseText);
//     } catch (e) {
//       console.error("createUser - Failed to parse JSON response:", responseText);
//       throw new Error(`Invalid JSON response: ${responseText.substring(0, 100)}`);
//     }

//     if (!response.ok) {
//       console.error("createUser - Error Response:", result);
//       throw new Error(result?.message || result?.error || `HTTP error ${response.status}`);
//     }

//     console.log("createUser - Success Result:", result);
//     return result;
//   } catch (error) {
//     console.error("createUser - Caught Error:", error);
//     throw error;
//   }
// }

// // GET PROFILE ID
// export async function getProfileId(userId: string, role: UserRole) {
//   try {
//     console.log("getProfileId - userId:", userId, "role:", role);
    
//     const url = `${BASE_URL}/api/schoolmanage/users`;
//     console.log("getProfileId - Fetching URL:", url);
    
//     const response = await fetch(url, {
//       method: "GET",
//       cache: "no-store",
//     });

//     console.log("getProfileId - Response Status:", response.status);

//     const result = await response.json();
//     console.log("getProfileId - Response Data:", result);

//     if (!response.ok) {
//       throw new Error(result?.message || "Failed to fetch profile");
//     }

//     const profileData = result.data || result;
//     console.log("getProfileId - Profile Data:", profileData);

//     const user = profileData.find(
//       (u: any) => u.userId === userId && u.role === role
//     );

//     console.log("getProfileId - Found User:", user);

//     return user?.id as string;
//   } catch (error) {
//     console.error("getProfileId - Error:", error);
//     throw error;
//   }
// }

// // GET STAFF MEMBERS
// export async function getStaffMembers(schoolId: string) {
//   try {
//     console.log("getStaffMembers - schoolId:", schoolId);
    
//     // URL'deki fazla } işaretini düzeltiyorum
//     const url = `${BASE_URL}/api/schoolmanage/users`;
//     console.log("getStaffMembers - Fetching URL:", url);
    
//     const response = await fetch(url, {
//       method: "GET",
//       cache: "no-store",
//     });

//     console.log("getStaffMembers - Response Status:", response.status);

//     const result = await response.json();
//     console.log("getStaffMembers - Response Data:", result);

//     if (!response.ok) {
//       throw new Error(result?.message || "Failed to fetch staff members");
//     }

//     const users = result.data || result;
//     console.log("getStaffMembers - Users:", users);

//     return users as Staff[];
//   } catch (error) {
//     console.error("getStaffMembers - Error:", error);
//     throw error;
//   }
// }





"use server";

import { Staff, UserCreateProps, UserRole } from "../types/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

// CREATE USER
export async function createUser(data: UserCreateProps) {
  try {
    console.log("createUser - Request Data:", JSON.stringify(data, null, 2));
    
    const url = `${BASE_URL}/api/schoolmanage/users`;
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("createUser - Error Response:", result);
      throw new Error(result?.error || result?.message || `HTTP error ${response.status}`);
    }

    return result.data || result;
  } catch (error) {
    console.error("createUser - Error:", error);
    throw error;
  }
}

// GET PROFILE ID
export async function getProfileId(userId: string, role: UserRole) {
  try {
    const url = `${BASE_URL}/api/schoolmanage/users?type=profile&userId=${userId}&role=${role}`;
    
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result?.error || "Failed to fetch profile");
    }

    return result.id;
  } catch (error) {
    console.error("getProfileId - Error:", error);
    return null;
  }
}

// GET STAFF MEMBERS (SECRETARY, LIBRARIAN)
export async function getStaffMembers(schoolId: string) {
  try {
    if (!schoolId) {
      console.error("getStaffMembers - School ID is required");
      return [];
    }

    console.log("getStaffMembers - Fetching for school:", schoolId);
    
    // schoolId parametresini ekle ve type=staff ile filtrele
    const url = `${BASE_URL}/api/schoolmanage/users?schoolId=${schoolId}&type=staff`;
    console.log("getStaffMembers - URL:", url);
    
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });

    const result = await response.json();
    console.log("getStaffMembers - Response:", result);

    if (!response.ok) {
      console.error("getStaffMembers - Error:", result);
      return [];
    }

    // API direkt array dönüyor olabilir veya { data: [] } formatında
    const staff = Array.isArray(result) ? result : result.data || [];
    
    console.log("getStaffMembers - Found staff:", staff.length);
    return staff as Staff[];
  } catch (error) {
    console.error("getStaffMembers - Error:", error);
    return [];
  }
}

// GET ALL USERS
export async function getAllUsers(schoolId?: string, role?: UserRole) {
  try {
    let url = `${BASE_URL}/api/schoolmanage/users`;
    const params = new URLSearchParams();
    
    if (schoolId) params.append('schoolId', schoolId);
    if (role) params.append('role', role);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result?.error || "Failed to fetch users");
    }

    return Array.isArray(result) ? result : result.data || [];
  } catch (error) {
    console.error("Get all users error:", error);
    return [];
  }
}

// UPDATE USER
export async function updateUser(id: string, data: Partial<UserCreateProps>) {
  try {
    const response = await fetch(`${BASE_URL}/api/schoolmanage/users?id=${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result?.error || "Failed to update user");
    }

    return result.data || result;
  } catch (error) {
    console.error("Update user error:", error);
    throw error;
  }
}

// DELETE USER
export async function deleteUser(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/api/schoolmanage/users?id=${id}`, {
      method: "DELETE",
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result?.error || "Failed to delete user");
    }

    return result.data || result;
  } catch (error) {
    console.error("Delete user error:", error);
    throw error;
  }
}