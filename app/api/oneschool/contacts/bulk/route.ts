// app/api/admin/contacts/bulk/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function DELETE(request: NextRequest) {
  try {
    const { ids } = await request.json();

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: "Invalid or empty ids array" },
        { status: 400 }
      );
    }

    const deletedContacts = await db.contact.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return NextResponse.json(
      { 
        ok: true, 
        message: `${deletedContacts.count} contacts deleted successfully`,
        count: deletedContacts.count 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error bulk deleting contacts:", error);
    return NextResponse.json(
      { error: "Failed to delete contacts" },
      { status: 500 }
    );
  }
}