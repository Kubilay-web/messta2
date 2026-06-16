import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";
import { Resend } from "resend";
import { sendMessageTemplate } from "../messageTemplate";
import { Key } from "@prisma/client";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { key, message, schoolId, subject } = data;

    const school = await db.school.findFirst({
      where: {
        id: schoolId,
      },
    });

    const students = await db.student.findMany({
      where: {
        schoolId,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    const parentsData = await db.parent.findMany({
      where: {
        schoolId,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    const teachersData = await db.teacher.findMany({
      where: {
        schoolId,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    const teachers = teachersData.map((t) => ({
      id: t.id,
      name: `${t.firstName} ${t.lastName}`,
      email: t.email,
    }));

    const parents = parentsData.map((p) => ({
      id: p.id,
      name: `${p.firstName} ${p.lastName}`,
      email: p.email,
    }));

    const all = [...students, ...parents, ...teachers];

    let emails: { id: string; name: string; email: string }[] = [];
    let salutation = `Dear ${key},`;

    if (key === "All") {
      emails = all;
      salutation = "Dear Parents, Teachers and Students";
    } else if (key === "Parents") {
      emails = parents;
    } else if (key === "Students") {
      emails = students;
    } else {
      emails = teachers;
    }

    // Send the emails
    for (const mail of emails) {
      const body = message;

      const options = {
        headmasterName: "Dr. James Okello",
        schoolName: school?.name ?? "",
        salutation: salutation,
      };

      const { data, error } = await resend.emails.send({
        from: `${school?.name} <info@desishub.com>`,
        to: mail.email,
        subject: subject,
        html: sendMessageTemplate(body, subject, options),
      });

      console.log(data);
      if (error) {
        console.log(error);
      }
    }

    // Save the reminder
    const reminder = await db.reminder.create({
      data: {
        message: message,
        recipient: key as Key,
        schoolId: schoolId,
        subject: subject,
      },
    });

    console.log(reminder);

    return NextResponse.json(
      {
        success: true,
        message: "Messages sent successfully",
        data: reminder,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send messages",
      },
      { status: 500 }
    );
  }
}