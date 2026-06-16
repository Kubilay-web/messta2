// app/api/admin/contacts/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Check if contact exists
    const existingContact = await db.contact.findUnique({
      where: { id },
    });

    if (!existingContact) {
      return NextResponse.json(
        { error: "Contact not found" },
        { status: 404 }
      );
    }

    await db.contact.delete({
      where: { id },
    });

    console.log(`Contact deleted successfully: ${id}`);

    return NextResponse.json(
      { ok: true, message: "Contact deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting contact:", error);
    return NextResponse.json(
      { error: "Failed to delete contact" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const contact = await db.contact.findUnique({
      where: { id },
    });

    if (!contact) {
      return NextResponse.json(
        { error: "Contact not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(contact);
  } catch (error) {
    console.error("Error fetching contact:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await request.json();

    // Check if contact exists
    const existingContact = await db.contact.findUnique({
      where: { id },
    });

    if (!existingContact) {
      return NextResponse.json(
        { error: "Contact not found" },
        { status: 404 }
      );
    }

    // If email is being updated, check if it's unique
    if (data.email && data.email !== existingContact.email) {
      const emailExists = await db.contact.findUnique({
        where: { email: data.email },
      });

      if (emailExists) {
        return NextResponse.json(
          { error: "Email already exists" },
          { status: 409 }
        );
      }
    }

    // If school is being updated, check if it's unique
    if (data.school && data.school !== existingContact.school) {
      const schoolExists = await db.contact.findUnique({
        where: { school: data.school },
      });

      if (schoolExists) {
        return NextResponse.json(
          { error: "School already exists" },
          { status: 409 }
        );
      }
    }

    const updatedContact = await db.contact.update({
      where: { id },
      data,
    });

    return NextResponse.json(
      { data: updatedContact, error: null },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating contact:", error);
    return NextResponse.json(
      { error: "Failed to update contact" },
      { status: 500 }
    );
  }
}