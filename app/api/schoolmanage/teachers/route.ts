import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db";
import { TeacherCreateProps } from '../types/types';


import { convertDateToIso } from '../exams/convertDateToIso';
import { UserRoleSchool } from '@prisma/client';

import { hash } from "@node-rs/argon2";



// ==================== YARDIMCI FONKSİYONLAR ====================
async function createUserService(data: {
  email: string;
  password: string;
  role: UserRoleSchool;
  name: string;
  phone?: string;
  image?: string;
  schoolId: string;
  schoolName: string;
}) {
  // Check if user already exists
  const existingUser = await db.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error('Email already exists');
  }

  // Hash password
  const hashedPassword = await hash(data.password);

  const userData = {
    ...data,
    password: hashedPassword,
  };

  const newUser = await db.user.create({
    data: userData,
  });

  console.log(`User created successfully: ${newUser.name} (${newUser.id})`);
  return newUser;
}

// ==================== GET İŞLEMLERİ ====================
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const teacherId = searchParams.get('id');
    const userId = searchParams.get('userId');
    const departmentId = searchParams.get('departmentId');
    const type = searchParams.get('type'); // 'brief', 'detail', 'by-department', 'by-user'

    // Teacher by user ID
    if (userId && type === 'by-user') {
      const teacher = await db.teacher.findUnique({
        where: { userId },
        include: {
          user: {
            select: {
              email: true,
              image: true,
            },
          },
          department: true,
          assignedClass: true,
          subjects: true,
        },
      });

      if (!teacher) {
        return NextResponse.json(
          { error: 'Teacher not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        data: teacher,
        error: null,
      });
    }

    // Teachers by department
    if (departmentId && type === 'by-department') {
      const teachers = await db.teacher.findMany({
        where: { departmentId },
        orderBy: { firstName: 'asc' },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          designation: true,
          isClassTeacher: true,
        },
      });

      return NextResponse.json({
        data: teachers,
        error: null,
      });
    }

    // Single teacher detail
    if (teacherId && type === 'detail') {
      const teacher = await db.teacher.findUnique({
        where: { id: teacherId },
        include: {
          user: {
            select: {
              email: true,
              image: true,
              createdAt: true,
            },
          },
          department: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          assignedClass: {
            select: {
              id: true,
              title: true,
              slug: true,
            },
          },
          subjects: {
            select: {
              id: true,
              name: true,
              code: true,
              category: true,
            },
          },
          documents: true,
          attendance: {
            orderBy: { date: 'desc' },
            take: 30,
          },
          leaves: {
            where: { status: 'PENDING' },
            orderBy: { startDate: 'desc' },
          },
          _count: {
            select: {
              subjects: true,
              documents: true,
              attendance: true,
              leaves: true,
            },
          },
        },
      });

      if (!teacher) {
        return NextResponse.json(
          { error: 'Teacher not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        data: teacher,
        error: null,
      });
    }

    // Brief teachers list
    if (type === 'brief' && schoolId) {
      const teachers = await db.teacher.findMany({
        orderBy: { createdAt: "desc" },
        where: { schoolId },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          isClassTeacher: true,
          designation: true,
        },
      });

      return NextResponse.json({
        data: teachers,
        error: null,
      });
    }

    // Teachers by school ID
    if (schoolId) {
      const teachers = await db.teacher.findMany({
        orderBy: { createdAt: "desc" },
        where: { schoolId },
        include: {
          user: {
            select: {
              email: true,
              image: true,
            },
          },
          department: {
            select: {
              id: true,
              name: true,
            },
          },
          assignedClass: {
            select: {
              id: true,
              title: true,
            },
          },
          subjects: {
            select: {
              id: true,
              name: true,
              code: true,
            },
          },
          _count: {
            select: {
              subjects: true,
              attendance: true,
            },
          },
        },
      });

      return NextResponse.json({
        data: teachers,
        error: null,
      });
    }

    // All teachers
    const teachers = await db.teacher.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            email: true,
            image: true,
          },
        },
        department: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json({
      data: teachers,
      error: null,
    });
  } catch (error) {
    console.error('GET teachers error:', error);
    return NextResponse.json(
      {
        data: null,
        error: 'Failed to fetch teachers',
      },
      { status: 500 }
    );
  }
}

// ==================== POST İŞLEMLERİ (Yeni Teacher Oluştur) ====================


// app/api/teachers/route.ts

export async function POST(request: NextRequest) {
  try {
    const data = await request.json() as TeacherCreateProps;

    // Format dates
    if (data.dateOfBirth) {
      data.dateOfBirth = convertDateToIso(data.dateOfBirth);
    }
    if (data.dateOfJoining) {
      data.dateOfJoining = convertDateToIso(data.dateOfJoining);
    }

    // Gerekli alanları kontrol et
    if (!data.email || !data.password || !data.NIN || !data.phone || !data.schoolId) {
      return NextResponse.json(
        {
          data: null,
          error: 'Missing required fields: email, password, NIN, phone, schoolId',
        },
        { status: 400 }
      );
    }

    // Benzersiz alanları kontrol et
    const [existingEmail, existingNIN, existingPhone] = await Promise.all([
      db.teacher.findUnique({ where: { email: data.email } }),
      db.teacher.findUnique({ where: { NIN: data.NIN } }),
      db.teacher.findUnique({ where: { phone: data.phone } }),
    ]);

    if (existingNIN) {
      console.log("NIN Already exists");
      return NextResponse.json(
        {
          data: null,
          error: "Teacher with this NIN already exists",
        },
        { status: 409 }
      );
    }

    if (existingEmail) {
      console.log("Email Already exists");
      return NextResponse.json(
        {
          data: null,
          error: "Teacher with this email already exists",
        },
        { status: 409 }
      );
    }

    if (existingPhone) {
      console.log("Phone Number already exists");
      return NextResponse.json(
        {
          data: null,
          error: "Teacher with this Phone already exists",
        },
        { status: 409 }
      );
    }

    // Employee ID kontrolü
    if (data.employeeId) {
      const existingEmployeeId = await db.teacher.findUnique({
        where: { employeeId: data.employeeId },
      });

      if (existingEmployeeId) {
        return NextResponse.json(
          {
            data: null,
            error: "Teacher with this Employee ID already exists",
          },
          { status: 409 }
        );
      }
    }

    // User oluştur - roleschool kullan
    const userData = {
      email: data.email,
      password: data.password,
      roleschool: "TEACHER" as UserRoleSchool,
      name: `${data.firstName} ${data.lastName}`,
      phone: data.phone,
      image: data.imageUrl,
      schoolId: data.schoolId,
      schoolName: data.schoolName,
    };

    const user = await createUserService(userData);
    data.userId = user.id;

    // Gender'ı enum'a çevir - BURASI ÖNEMLİ
    let genderValue = undefined;
    if (data.gender) {
      // String'i enum'a çevir
      if (data.gender === "MALE") genderValue = "MALE";
      else if (data.gender === "FEMALE") genderValue = "FEMALE";
      else if (data.gender === "OTHER") genderValue = "OTHER";
      // Eğer model GenderSchool kullanıyorsa:
      // genderValue = data.gender as GenderSchool;
    }

    // Teacher oluştur - gender'ı enum olarak gönder
    const teacherData = {
      ...data,
      gender: genderValue, // Enum olarak gönder
    };

    const newTeacher = await db.teacher.create({
      data: teacherData,
      include: {
        user: {
          select: {
            email: true,
            image: true,
          },
        },
        department: {
          select: {
            id: true,
            name: true,
          },
        },
        assignedClasses: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    console.log(
      `Teacher created successfully: ${newTeacher.firstName} ${newTeacher.lastName} (${newTeacher.id})`
    );

    return NextResponse.json(
      {
        data: newTeacher,
        error: null,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST teacher error:', error);
    return NextResponse.json(
      {
        data: null,
        error: error instanceof Error ? error.message : 'Something went wrong',
      },
      { status: 500 }
    );
  }
}

// ==================== PUT İŞLEMLERİ (Tam Güncelleme) ====================
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const teacherId = searchParams.get('id');

    if (!teacherId) {
      return NextResponse.json(
        { error: 'Teacher ID is required' },
        { status: 400 }
      );
    }

    const data = await request.json() as TeacherCreateProps;

    // Format dates if provided
    if (data.dateOfBirth) {
      data.dateOfBirth = convertDateToIso(data.dateOfBirth);
    }
    if (data.dateOfJoining) {
      data.dateOfJoining = convertDateToIso(data.dateOfJoining);
    }

    const updatedTeacher = await db.teacher.update({
      where: { id: teacherId },
      data,
      include: {
        user: {
          select: {
            email: true,
            image: true,
          },
        },
        department: true,
        assignedClass: true,
      },
    });

    // Update user info if needed
    if (data.firstName || data.lastName || data.phone || data.imageUrl) {
      await db.user.update({
        where: { id: updatedTeacher.userId },
        data: {
          name: `${data.firstName || updatedTeacher.firstName} ${data.lastName || updatedTeacher.lastName}`,
          phone: data.phone || updatedTeacher.phone,
          image: data.imageUrl || updatedTeacher.imageUrl,
        },
      });
    }

    return NextResponse.json({
      data: updatedTeacher,
      error: null,
    });
  } catch (error) {
    console.error('PUT teacher error:', error);
    return NextResponse.json(
      {
        data: null,
        error: 'Failed to update teacher',
      },
      { status: 500 }
    );
  }
}

// ==================== PATCH İŞLEMLERİ (Kısmi Güncelleme) ====================
export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const teacherId = searchParams.get('id');

    if (!teacherId) {
      return NextResponse.json(
        { error: 'Teacher ID is required' },
        { status: 400 }
      );
    }

    const data = await request.json();

    // Format dates if provided
    if (data.dateOfBirth) {
      data.dateOfBirth = convertDateToIso(data.dateOfBirth);
    }
    if (data.dateOfJoining) {
      data.dateOfJoining = convertDateToIso(data.dateOfJoining);
    }

    const updatedTeacher = await db.teacher.update({
      where: { id: teacherId },
      data,
      include: {
        user: {
          select: {
            email: true,
            image: true,
          },
        },
      },
    });

    // Update user info if needed
    if (data.firstName || data.lastName || data.phone || data.imageUrl) {
      await db.user.update({
        where: { id: updatedTeacher.userId },
        data: {
          name: data.firstName || data.lastName 
            ? `${data.firstName || updatedTeacher.firstName} ${data.lastName || updatedTeacher.lastName}`
            : undefined,
          phone: data.phone,
          image: data.imageUrl,
        },
      });
    }

    return NextResponse.json({
      data: updatedTeacher,
      error: null,
    });
  } catch (error) {
    console.error('PATCH teacher error:', error);
    return NextResponse.json(
      {
        data: null,
        error: 'Failed to update teacher',
      },
      { status: 500 }
    );
  }
}

// ==================== DELETE İŞLEMLERİ ====================
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const teacherId = searchParams.get('id');

    if (!teacherId) {
      return NextResponse.json(
        { error: 'Teacher ID is required' },
        { status: 400 }
      );
    }

    // Get teacher to find userId and check relationships
    const teacher = await db.teacher.findUnique({
      where: { id: teacherId },
      include: {
        _count: {
          select: {
            subjects: true,
            documents: true,
            attendance: true,
            leaves: true,
          },
        },
      },
    });

    if (!teacher) {
      return NextResponse.json(
        { error: 'Teacher not found' },
        { status: 404 }
      );
    }

    // If teacher is a class teacher, remove class teacher reference
    if (teacher.isClassTeacher) {
      await db.class.updateMany({
        where: { classTeacherId: teacherId },
        data: { classTeacherId: null, classTeacherName: null },
      });
    }

    // Remove teacher from subjects
    await db.subject.updateMany({
      where: { teacherId },
      data: { teacherId: null, teacherName: null },
    });

    // Delete teacher and related records in transaction
    await db.$transaction([
      db.teacherDocument.deleteMany({ where: { teacherId } }),
      db.teacherAttendance.deleteMany({ where: { teacherId } }),
      db.teacherLeave.deleteMany({ where: { teacherId } }),
      db.teacher.delete({ where: { id: teacherId } }),
      db.user.delete({ where: { id: teacher.userId } }),
    ]);

    console.log(`Teacher deleted successfully: ${teacher.firstName} ${teacher.lastName}`);

    return NextResponse.json(
      {
        data: { 
          message: 'Teacher deleted successfully',
          name: `${teacher.firstName} ${teacher.lastName}`,
        },
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE teacher error:', error);
    return NextResponse.json(
      {
        data: null,
        error: 'Failed to delete teacher',
      },
      { status: 500 }
    );
  }
}