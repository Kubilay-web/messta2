import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db";

// Ana handler fonksiyonu - tüm HTTP metodlarını tek bir yerde yönetir
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Tek bir contact getir (id varsa)
    if (id) {
      const contact = await db.contact.findUnique({
        where: { id },
      });

      if (!contact) {
        return NextResponse.json(
          { error: 'Contact not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(contact, { status: 200 });
    }

    // Tüm contact'ları getir (id yoksa)
    const contacts = await db.contact.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(contacts, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { email, school } = data;

    // Check if contact already exists
    const existingEmail = await db.contact.findUnique({
      where: { email },
    });

    const existingSchool = await db.contact.findUnique({
      where: { school },
    });

    if (existingSchool || existingEmail) {
      return NextResponse.json(
        {
          error: 'We have already received a request for this school or email',
          data: null,
        },
        { status: 409 }
      );
    }

    const newContact = await db.contact.create({
      data,
    });

    console.log(
      `Contact created successfully: ${newContact.school} (${newContact.id})`
    );

    return NextResponse.json(
      {
        data: newContact,
        error: null,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      {
        data: null,
        error: 'Something went wrong',
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    const data = await request.json();

    const contact = await db.contact.update({
      where: { id },
      data,
    });

    return NextResponse.json(contact, { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Failed to update contact' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    await db.contact.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Contact deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Failed to delete contact' },
      { status: 500 }
    );
  }
}

// PATCH (kısmi güncelleme) için de ekleyebilirsiniz
export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    const data = await request.json();

    const contact = await db.contact.update({
      where: { id },
      data,
    });

    return NextResponse.json(contact, { status: 200 });
  } catch (error) {
    console.error('PATCH error:', error);
    return NextResponse.json(
      { error: 'Failed to update contact' },
      { status: 500 }
    );
  }
}