// "use server";

// import {
//   DepartmentBrief,
//   EventData,
//   GalleryCategory,
//   GalleryImageDTO,
//   News,
//   RecentActivity,
//   Section,
// } from "../types/types";


// import { GalleryCategoryCreateDTO } from "@/app/api/schoolmanage/types/types";
// import { revalidatePath } from "next/cache";
// import { NewsItem } from "../components/school/section-forms/news-section-form";
// import { Event } from "../components/school/section-forms/events-section-form";
// import { ContactData } from "../components/school/SchoolContactForm";
// import { SchoolContactMessage } from "../(back)/dashboard/communication/website-messages/messages-table";

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// export interface Activity {
//   activity: string;
//   description: string;
//   time: string;
//   schoolId: string;
// }

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

// // --- site / sections ---
// export async function createSchoolWebsite(schoolId: string, siteEnabled: boolean) {
//   const sections = [/* ... tüm sections dizisi ... */];
//   const data = { schoolId, siteEnabled, sections };

//   try {
//     const result = await fetcher(`${BASE_URL}/api/schoolmanage/site`, {
//       method: "POST",
//       body: JSON.stringify(data),
//     });

//     revalidatePath(`/sch/${schoolId}`);
//     return result;
//   } catch (error: any) {
//     throw new Error(error.message || "Failed to create school website");
//   }
// }

// export async function createActivity(data: Activity) {
//   try {
//     const result = await fetcher(`${BASE_URL}/api/schoolmanage/site`, {
//       method: "POST",
//       body: JSON.stringify(data),
//     });
//     revalidatePath(`/sch/${data.schoolId}`);
//     return result;
//   } catch (error: any) {
//     throw new Error(error.message || "Failed to create activity");
//   }
// }

// export async function createGalleryCategory(data: GalleryCategoryCreateDTO) {
//   try {
//     const result = await fetcher(`${BASE_URL}/api/schoolmanage/site`, {
//       method: "POST",
//       body: JSON.stringify(data),
//     });
//     revalidatePath(`/sch/${data.schoolId}`);
//     return result;
//   } catch (error: any) {
//     throw new Error(error.message || "Failed to create gallery category");
//   }
// }

// export async function addNewsItem(data: NewsItem) {
//   try {
//     const result = await fetcher(`${BASE_URL}/api/schoolmanage/site`, {
//       method: "POST",
//       body: JSON.stringify(data),
//     });
//     revalidatePath(`/sch/${data.schoolId}`);
//     return result;
//   } catch (error: any) {
//     throw new Error(error.message || "Failed to add news item");
//   }
// }

// export async function addEventItem(data: Event) {
//   try {
//     const result = await fetcher(`${BASE_URL}/api/schoolmanage/site`, {
//       method: "POST",
//       body: JSON.stringify(data),
//     });
//     revalidatePath(`/sch/${data.schoolId}`);
//     return result;
//   } catch (error: any) {
//     throw new Error(error.message || "Failed to add event item");
//   }
// }

// export async function updateSection(id: string, data: any, schoolId?: string) {
//   try {
//     const result = await fetcher(`${BASE_URL}/api/schoolmanage/site`, {
//       method: "PATCH",
//       body: JSON.stringify(data),
//     });
//     return result.data as Section;
//   } catch (error) {
//     console.log(error);
//   }
// }

// // --- GET işlemleri ---
// export async function getSiteRecentActivities(schoolId: string) {
//   try {
//     const result = await fetcher<{ data: RecentActivity[] }>(`${BASE_URL}/api/schoolmanage/site`);
//     return result.data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function getSiteGalleryCategories(schoolId: string) {
//   try {
//     const result = await fetcher<{ data: GalleryCategory[] }>(`${BASE_URL}/api/schoolmanage/site`);
//     return result.data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function getSiteRecentNews(schoolId: string) {
//   try {
//     const result = await fetcher<{ data: News[] }>(`${BASE_URL}/api/schoolmanage/site`);
//     return result.data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function getSiteRecentEvents(schoolId: string) {
//   try {
//     const result = await fetcher<{ data: EventData[] }>(`${BASE_URL}/api/schoolmanage/site`);
//     return result.data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function getSectionByType(schoolId: string | null | undefined, type: string) {
//   if (!schoolId) return null;
//   try {
//     const result = await fetcher<{ data: Section }>(`${BASE_URL}/api/schoolmanage/site`);
//     return result.data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function getAllSchoolSections(schoolId: string) {
//   try {
//     const result = await fetcher<{ data: Section[] }>(`${BASE_URL}/api/schoolmanage/site`);
//     return result.data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// // --- Gallery Images ---
// export async function createGalleryImage(data: GalleryImageCreateDTO) {
//   try {
//     const result = await fetcher<{ data: GalleryImageDTO }>(`${BASE_URL}/api/schoolmanage/site`, {
//       method: "POST",
//       body: JSON.stringify(data),
//     });
//     revalidatePath(`/sch/${data.schoolId}`);
//     return result.data;
//   } catch (error: any) {
//     throw new Error(error.message || "Failed to create gallery image");
//   }
// }

// export async function getSiteGalleryImages(schoolId: string) {
//   try {
//     const result = await fetcher<{ data: GalleryImageDTO[] }>(`${BASE_URL}/api/schoolmanage/site`);
//     return result.data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function deleteSiteGalleryImage(id: string) {
//   try {
//     const result = await fetcher<{ data: GalleryImageDTO }>(`${BASE_URL}/api/schoolmanage/site`, {
//       method: "DELETE",
//     });
//     return result.data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function deleteSiteGalleryCategory(id: string) {
//   try {
//     const result = await fetcher<{ data: GalleryCategory }>(`${BASE_URL}/api/schoolmanage/site`, {
//       method: "DELETE",
//     });
//     return result.data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// // --- Contact / Inquiry ---
// export async function createSchoolInquiry(data: ContactData) {
//   try {
//     const result = await fetcher<{ data: any }>(`${BASE_URL}/api/schoolmanage/site`, {
//       method: "POST",
//       body: JSON.stringify(data),
//     });
//     return result.data;
//   } catch (error: any) {
//     throw new Error(error.message || "Failed to create school inquiry");
//   }
// }

// export async function getSchoolNotifications(schoolId: string) {
//   try {
//     const result = await fetcher<{ data: RecentActivity[] }>(`${BASE_URL}/api/schoolmanage/site`);
//     return result.data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function getSchoolWebsiteMessages(schoolId: string) {
//   try {
//     const result = await fetcher<{ data: SchoolContactMessage[] }>(`${BASE_URL}/api/schoolmanage/site`);
//     return result.data;
//   } catch (error) {
//     console.log(error);
//   }
// }











"use server";

import { revalidatePath } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;



// ================= FETCH HELPER =================
async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  if (!res.ok) {
    let message = `Request failed: ${res.status}`;
    try {
      const err = await res.json();
      message = err?.error || err?.message || message;
    } catch {}
    throw new Error(message);
  }

  return res.json();
}

// ================= CREATE =================

// CREATE SITE
export async function createSchoolWebsite(
  schoolId: string,
  siteEnabled: boolean
) {


  const sections = [
  {
    type: "LOGO_NAVIGATION",
    title: "Navigation",
    order: 1,
    settings: {},
  },
  {
    type: "HERO",
    title: "Hero Section",
    order: 2,
    settings: {},
  },
  {
    type: "ABOUT",
    title: "About Us",
    order: 3,
    settings: {},
  },
  {
    type: "HEADMASTER_QUOTE",
    title: "Headmaster Message",
    order: 4,
    settings: {},
  },
  {
    type: "ADMISSION",
    title: "Admissions",
    order: 5,
    settings: {},
  },
  {
    type: "NEWS",
    title: "Latest News",
    order: 6,
    settings: {},
  },
  {
    type: "EVENTS",
    title: "Events",
    order: 7,
    settings: {},
  },
  {
    type: "GALLERY",
    title: "Gallery",
    order: 8,
    settings: {},
  },
  {
    type: "CONTACT",
    title: "Contact",
    order: 9,
    settings: {},
  },
  {
    type: "FOOTER",
    title: "Footer",
    order: 10,
    settings: {},
  },
];
 

  const result = await fetcher(
    `${BASE_URL}/api/schoolmanage/site?action=create-site`,
    {
      method: "POST",
      body: JSON.stringify({ schoolId, siteEnabled, sections }),
    }
  );

  return result;
}

// CREATE ACTIVITY
export async function createActivity(data: any) {
  const result = await fetcher(
    `${BASE_URL}/api/schoolmanage/site?action=create-activity`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );

  revalidatePath(`/sch/${data.schoolId}`);
  return result;
}

// CREATE NEWS
export async function addNewsItem(data: any) {
  const result = await fetcher(
    `${BASE_URL}/api/schoolmanage/site?action=create-news`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );

  revalidatePath(`/sch/${data.schoolId}`);
  return result;
}

// CREATE EVENT
export async function addEventItem(data: any) {
  const result = await fetcher(
    `${BASE_URL}/api/schoolmanage/site?action=create-event`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );

  revalidatePath(`/sch/${data.schoolId}`);
  return result;
}

// CREATE GALLERY CATEGORY
export async function createGalleryCategory(data: any) {
  const result = await fetcher(
    `${BASE_URL}/api/schoolmanage/site?action=create-gallery-category`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );

  revalidatePath(`/sch/${data.schoolId}`);
  return result;
}

// CREATE GALLERY IMAGE
export async function createGalleryImage(data: any) {
  const result = await fetcher(
    `${BASE_URL}/api/schoolmanage/site?action=create-gallery-image`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );

  revalidatePath(`/sch/${data.schoolId}`);
  return result.data;
}

// CREATE CONTACT MESSAGE
export async function createSchoolInquiry(data: any) {
  const result = await fetcher(
    `${BASE_URL}/api/schoolmanage/site?action=create-contact-message`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );

  return result.data;
}

// ================= GET =================

// SECTIONS
export async function getAllSchoolSections(schoolId: string) {
  const result = await fetcher(
    `${BASE_URL}/api/schoolmanage/site?schoolId=${schoolId}&type=sections`
  );
  return result.data;
}

// SINGLE SECTION
export async function getSectionByType(
  schoolId: string,
  sectionType: string
) {
  const result = await fetcher(
    `${BASE_URL}/api/schoolmanage/site?schoolId=${schoolId}&sectionType=${sectionType}`
  );
  return result.data;
}

// ACTIVITIES
export async function getSiteRecentActivities(schoolId: string) {
  const result = await fetcher(
    `${BASE_URL}/api/schoolmanage/site?schoolId=${schoolId}&type=activities`
  );
  return result.data;
}

// NEWS
export async function getSiteRecentNews(schoolId: string) {
  const result = await fetcher(
    `${BASE_URL}/api/schoolmanage/site?schoolId=${schoolId}&type=news`
  );
  return result.data;
}

// EVENTS
export async function getSiteRecentEvents(schoolId: string) {
  const result = await fetcher(
    `${BASE_URL}/api/schoolmanage/site?schoolId=${schoolId}&type=events`
  );
  return result.data;
}

// GALLERY CATEGORIES
export async function getSiteGalleryCategories(schoolId: string) {
  const result = await fetcher(
    `${BASE_URL}/api/schoolmanage/site?schoolId=${schoolId}&type=gallery-categories`
  );
  return result.data;
}

// GALLERY IMAGES
export async function getSiteGalleryImages(schoolId: string) {
  const result = await fetcher(
    `${BASE_URL}/api/schoolmanage/site?schoolId=${schoolId}&type=gallery-images`
  );
  return result.data;
}

// CONTACT MESSAGES
export async function getSchoolWebsiteMessages(schoolId: string) {
  const result = await fetcher(
    `${BASE_URL}/api/schoolmanage/site?schoolId=${schoolId}&type=messages`
  );
  return result.data;
}

// NOTIFICATIONS
export async function getSchoolNotifications(schoolId: string) {
  const result = await fetcher(
    `${BASE_URL}/api/schoolmanage/site?schoolId=${schoolId}&type=notifications`
  );
  return result.data;
}

// ================= UPDATE =================

export async function updateSection(
  sectionId: string,
  data: any,
  schoolId?: string
) {
  const result = await fetcher(
    `${BASE_URL}/api/schoolmanage/site?sectionId=${sectionId}${
      schoolId ? `&schoolId=${schoolId}` : ""
    }`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    }
  );

  return result.data;
}

// ================= DELETE =================

// DELETE IMAGE
export async function deleteSiteGalleryImage(imageId: string) {
  const result = await fetcher(
    `${BASE_URL}/api/schoolmanage/site?action=delete-image&imageId=${imageId}`,
    {
      method: "DELETE",
    }
  );

  return result.data;
}

// DELETE CATEGORY
export async function deleteSiteGalleryCategory(categoryId: string) {
  const result = await fetcher(
    `${BASE_URL}/api/schoolmanage/site?action=delete-category&categoryId=${categoryId}`,
    {
      method: "DELETE",
    }
  );

  return result.data;
}