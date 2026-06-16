import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import db from "@/app/lib/db";
import { sendReminderTemplate } from '../email-templates/reminder';
import { sendMessageTemplate } from '../email-templates/messageTemplate';
import { 
  SingleEmailReminderProps, 
  SinglePhoneReminderProps, 
  BatchEmailReminderProps,
  GroupMessagePayload,
} from '../types/types';

import { Key } from "@prisma/client";

const resend = new Resend(process.env.RESEND_API_KEY);
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;

// Twilio client'ı dinamik import et
const twilio = accountSid && authToken ? require('twilio')(accountSid, authToken) : null;

// ==================== GET İŞLEMLERİ ====================
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const key = searchParams.get('key') as Key || 'All';
    const type = searchParams.get('type'); // 'groups' veya 'reminders'

    if (!schoolId) {
      return NextResponse.json(
        { error: 'School ID is required' },
        { status: 400 }
      );
    }

    // Grup istatistiklerini getir
    if (type === 'groups') {
      const students = await db.student.count({
        where: { schoolId },
      });
      const parents = await db.parent.count({
        where: { schoolId },
      });
      const teachers = await db.teacher.count({
        where: { schoolId },
      });

      const result = {
        students,
        parents,
        teachers,
      };
      
      console.log(result);
      return NextResponse.json(result);
    }

    // Reminder'ları getir (key'e göre filtreli)
    const reminders = await db.reminder.findMany({
      where: {
        schoolId,
        recipient: key,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(reminders);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}

// ==================== POST İŞLEMLERİ ====================
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { action } = data; // 'single-email', 'single-phone', 'batch-email', 'group-message'

    // TEK EMAIL GÖNDER
    if (action === 'single-email') {
      return await sendSingleEmail(data as SingleEmailReminderProps);
    }

    // TEK SMS GÖNDER
    if (action === 'single-phone') {
      return await sendSinglePhone(data as SinglePhoneReminderProps);
    }

    // TOPLU EMAIL GÖNDER
    if (action === 'batch-email') {
      return await sendBatchEmail(data as BatchEmailReminderProps);
    }

    // GRUP MESAJI GÖNDER
    if (action === 'group-message') {
      return await sendGroupMessage(data as GroupMessagePayload);
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

// ==================== YARDIMCI FONKSİYONLAR ====================

// Tek email gönderme
async function sendSingleEmail(data: SingleEmailReminderProps) {
  try {
    const { parentName: name, email, message: body, subject } = data;

    const { data: emailData, error } = await resend.emails.send({
      from: "Desishub <info@desishub.com>",
      to: email,
      subject: subject,
      html: sendReminderTemplate(body, subject, name),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    console.log(emailData);
    return NextResponse.json({ data: emailData }, { status: 200 });
  } catch (error) {
    console.error("Error sending the reminder:", error);
    return NextResponse.json(
      { error: "Failed to send the reminder" },
      { status: 500 }
    );
  }
}

// Tek SMS gönderme
async function sendSinglePhone(data: SinglePhoneReminderProps) {
  try {
    if (!twilio || !fromNumber) {
      return NextResponse.json(
        { error: "Twilio is not configured" },
        { status: 500 }
      );
    }

    const { parentName, phone, message } = data;

    // Create the message with parent name if available
    const messageBody = parentName ? `${parentName}: ${message}` : message;

    const twilioResponse = await twilio.messages.create({
      body: messageBody,
      to: phone,
      from: fromNumber,
    });

    console.log(twilioResponse);
    return NextResponse.json({
      success: true,
      messageId: twilioResponse.sid,
      status: twilioResponse.status,
    });
  } catch (error) {
    console.error("Error sending the reminder:", error);
    return NextResponse.json(
      { error: "Failed to send the reminder" },
      { status: 500 }
    );
  }
}

// Toplu email gönderme
async function sendBatchEmail(data: BatchEmailReminderProps) {
  try {
    const { subject, message: body, parents } = data;

    const { data: emailData, error } = await resend.batch.send(
      parents.map((parent) => {
        const name = parent.name;
        return {
          from: "Desishub <info@desishub.com>",
          to: parent.email,
          subject: subject,
          html: sendReminderTemplate(body, subject, name),
        };
      })
    );

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    console.log(emailData);
    return NextResponse.json({ data: emailData }, { status: 200 });
  } catch (error) {
    console.error("Error sending the reminder:", error);
    return NextResponse.json(
      { error: "Failed to send the reminder" },
      { status: 500 }
    );
  }
}

// Grup mesajı gönderme
async function sendGroupMessage(data: GroupMessagePayload) {
  try {
    const { key, message, schoolId, subject } = data;
    
    // Okul bilgilerini getir
    const school = await db.school.findFirst({
      where: { id: schoolId },
    });

    if (!school) {
      return NextResponse.json(
        { error: "School not found" },
        { status: 404 }
      );
    }

    // Öğrencileri getir
    const students = await db.student.findMany({
      where: { schoolId },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    // Velileri getir
    const parentsData = await db.parent.findMany({
      where: { schoolId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    // Öğretmenleri getir
    const teachersData = await db.teacher.findMany({
      where: { schoolId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    // Formatla
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

    // Alıcı listesini belirle
    let emails: { id: string; name: string; email: string }[] = [];
    let salutation = `Dear ${key},`;

    if (key === "All") {
      emails = all;
      salutation = "Dear Parents, Teachers and Students";
    } else if (key === "Parents") {
      emails = parents;
    } else if (key === "Students") {
      emails = students;
    } else if (key === "Teachers") {
      emails = teachers;
    }

    // Email gönderme seçenekleri
    const options = {
      headmasterName: "Dr. James Okello",
      schoolName: school?.name ?? "",
      salutation: salutation,
    };

    // Email'leri gönder
    const emailPromises = emails.map(async (mail) => {
      if (!mail.email) return null; // Email adresi yoksa atla
      
      try {
        const { data, error } = await resend.emails.send({
          from: `${school?.name} <info@desishub.com>`,
          to: mail.email,
          subject: subject,
          html: sendMessageTemplate(message, subject, options),
        });
        
        if (error) {
          console.error(`Failed to send to ${mail.email}:`, error);
        }
        return data;
      } catch (err) {
        console.error(`Error sending to ${mail.email}:`, err);
        return null;
      }
    });

    await Promise.all(emailPromises);

    // Reminder'ı kaydet
    const reminder = await db.reminder.create({
      data: {
        message: message,
        recipient: key as Key,
        schoolId: schoolId,
        subject: subject,
        name: `${key} Group Message`,
        email: "group@message.com",
      },
    });

    console.log("Reminder saved:", reminder);

    return NextResponse.json({
      success: true,
      message: "Messages sent successfully",
      data: reminder,
    });
  } catch (error) {
    console.error("Group message error:", error);
    return NextResponse.json(
      { error: "Failed to send group messages" },
      { status: 500 }
    );
  }
}

// ==================== DELETE İŞLEMLERİ ====================
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Reminder ID is required' },
        { status: 400 }
      );
    }

    await db.reminder.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Reminder deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Failed to delete reminder' },
      { status: 500 }
    );
  }
}