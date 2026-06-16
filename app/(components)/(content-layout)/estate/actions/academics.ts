"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";

// Class Actions
export async function updateClass(classId: string, data: { title: string }) {
  try {
    const updatedClass = await db.class.update({
      where: { id: classId },
      data: {
        title: data.title,
        slug: data.title.toLowerCase().replace(/\s+/g, "-"),
      },
    });
    
    revalidatePath("/dashboard/academics");
    return { success: true, data: updatedClass };
  } catch (error) {
    console.error("Error updating class:", error);
    return { success: false, error: "Failed to update class" };
  }
}

export async function deleteClass(classId: string) {
  try {
    // Önce class'a bağlı stream'leri kontrol et
    const streams = await db.stream.findMany({
      where: { classId },
      include: {
        students: true,
        attendanceLogs: true,
      },
    });

    if (streams.length > 0) {
      return { 
        success: false, 
        error: "Cannot delete class with existing streams. Delete streams first." 
      };
    }

    await db.class.delete({
      where: { id: classId },
    });
    
    revalidatePath("/dashboard/academics");
    return { success: true };
  } catch (error) {
    console.error("Error deleting class:", error);
    return { success: false, error: "Failed to delete class" };
  }
}

// Stream Actions
export async function updateStream(streamId: string, data: { title: string }) {
  try {
    const updatedStream = await db.stream.update({
      where: { id: streamId },
      data: {
        title: data.title,
        slug: data.title.toLowerCase().replace(/\s+/g, "-"),
      },
    });
    
    revalidatePath("/dashboard/academics");
    return { success: true, data: updatedStream };
  } catch (error) {
    console.error("Error updating stream:", error);
    return { success: false, error: "Failed to update stream" };
  }
}

export async function deleteStream(streamId: string) {
  try {
    // Önce stream'e bağlı öğrencileri kontrol et
    const students = await db.student.findMany({
      where: { streamId },
    });

    if (students.length > 0) {
      return { 
        success: false, 
        error: "Cannot delete stream with existing students. Move or delete students first." 
      };
    }

    await db.stream.delete({
      where: { id: streamId },
    });
    
    revalidatePath("/dashboard/academics");
    return { success: true };
  } catch (error) {
    console.error("Error deleting stream:", error);
    return { success: false, error: "Failed to delete stream" };
  }
}