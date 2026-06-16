import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db";
import { DocumentCreateProps } from '../types/types';

// ==================== GET İŞLEMLERİ ====================
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');
    const documentId = searchParams.get('id');
    const type = searchParams.get('type'); // 'all', 'recent'

    // Tek bir döküman getir
    if (documentId) {
      const document = await db.studentDocument.findUnique({
        where: { id: documentId },
        include: {
          student: {
            select: {
              id: true,
              name: true,
              regNo: true,
              class: {
                select: { title: true },
              },
            },
          },
        },
      });

      if (!document) {
        return NextResponse.json(
          { error: 'Document not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        data: document,
        error: null,
      });
    }

    // Öğrenciye göre dökümanları getir
    if (studentId) {
      const docs = await db.studentDocument.findMany({
        where: { studentId },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          name: true,
          type: true,
          url: true,
          size: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return NextResponse.json({
        data: docs,
        error: null,
      });
    }

    // Son eklenen dökümanlar
    if (type === 'recent') {
      const recentDocs = await db.studentDocument.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
        include: {
          student: {
            select: {
              id: true,
              name: true,
              regNo: true,
            },
          },
        },
      });

      return NextResponse.json({
        data: recentDocs,
        error: null,
      });
    }

    // Tüm dökümanlar
    const allDocs = await db.studentDocument.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            regNo: true,
          },
        },
      },
    });

    return NextResponse.json({
      data: allDocs,
      error: null,
    });
  } catch (error) {
    console.error('GET student documents error:', error);
    return NextResponse.json(
      {
        data: null,
        error: 'Something went wrong',
      },
      { status: 500 }
    );
  }
}

// ==================== POST İŞLEMLERİ (Yeni Döküman Oluştur) ====================
export async function POST(request: NextRequest) {
  try {
    const data = await request.json() as DocumentCreateProps[];

    // Gerekli alanları kontrol et
    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json(
        {
          data: null,
          error: 'Documents array is required and cannot be empty',
        },
        { status: 400 }
      );
    }

    // Her bir döküman için gerekli alanları kontrol et
    for (const doc of data) {
      if (!doc.name || !doc.type || !doc.url || !doc.studentId) {
        return NextResponse.json(
          {
            data: null,
            error: 'Each document must have name, type, url, and studentId',
          },
          { status: 400 }
        );
      }
    }

    // Dökümanları oluştur
    const newDocs = await db.studentDocument.createMany({
      data,
    });

    console.log(`${newDocs.length} document(s) created successfully`);

    // Activity log oluştur
    if (newDocs.length > 0) {
      const student = await db.student.findUnique({
        where: { id: newDocs[0].studentId },
        select: { name: true, schoolId: true },
      });

      if (student) {
        await db.recentActivity.create({
          data: {
            activity: "Student Documents Uploaded",
            description: `${newDocs.length} document(s) uploaded for student ${student.name}`,
            time: new Date().toISOString(),
            schoolId: student.schoolId || '',
          },
        });
      }
    }

    return NextResponse.json(
      {
        data: newDocs,
        error: null,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST student documents error:', error);
    return NextResponse.json(
      {
        data: null,
        error: 'Something went wrong',
      },
      { status: 500 }
    );
  }
}

// ==================== PUT İŞLEMLERİ (Döküman Güncelle) ====================
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const documentId = searchParams.get('id');

    if (!documentId) {
      return NextResponse.json(
        { error: 'Document ID is required' },
        { status: 400 }
      );
    }

    const data = await request.json() as Partial<DocumentCreateProps>;

    // Dökümanı güncelle
    const updatedDoc = await db.studentDocument.update({
      where: { id: documentId },
      data: {
        name: data.name,
        type: data.type,
        url: data.url,
        size: data.size,
      },
    });

    return NextResponse.json({
      data: updatedDoc,
      error: null,
    });
  } catch (error) {
    console.error('PUT student document error:', error);
    return NextResponse.json(
      {
        data: null,
        error: 'Something went wrong',
      },
      { status: 500 }
    );
  }
}

// ==================== PATCH İŞLEMLERİ (Kısmi Güncelleme) ====================
export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const documentId = searchParams.get('id');

    if (!documentId) {
      return NextResponse.json(
        { error: 'Document ID is required' },
        { status: 400 }
      );
    }

    const data = await request.json();

    const updatedDoc = await db.studentDocument.update({
      where: { id: documentId },
      data,
    });

    return NextResponse.json({
      data: updatedDoc,
      error: null,
    });
  } catch (error) {
    console.error('PATCH student document error:', error);
    return NextResponse.json(
      {
        data: null,
        error: 'Something went wrong',
      },
      { status: 500 }
    );
  }
}

// ==================== DELETE İŞLEMLERİ ====================
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const documentId = searchParams.get('id');

    if (!documentId) {
      return NextResponse.json(
        { error: 'Document ID is required' },
        { status: 400 }
      );
    }

    // Dökümanı sil (önce bilgilerini al)
    const doc = await db.studentDocument.findUnique({
      where: { id: documentId },
      include: {
        student: {
          select: { name: true, schoolId: true },
        },
      },
    });

    if (!doc) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    // Dökümanı sil
    const deletedDoc = await db.studentDocument.delete({
      where: { id: documentId },
    });

    // Activity log oluştur
    if (doc.student?.schoolId) {
      await db.recentActivity.create({
        data: {
          activity: "Student Document Deleted",
          description: `Document ${doc.name} deleted for student ${doc.student.name}`,
          time: new Date().toISOString(),
          schoolId: doc.student.schoolId,
        },
      });
    }

    console.log(`Document deleted successfully: ${doc.name}`);

    return NextResponse.json(
      {
        data: deletedDoc,
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE student document error:', error);
    return NextResponse.json(
      {
        data: null,
        error: 'Something went wrong',
      },
      { status: 500 }
    );
  }
}