// app/api/appointments/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db";
import { validateRequest } from '@/app/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const {user} = await validateRequest();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const appointment = await db.appointment.findUnique({
      where: { id: params.id },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }

    // Ödeme tutarını dolar cinsinden formatla
    const formattedAppointment = {
      ...appointment,
      charge: appointment.charge / 100,
      paymentAmount: appointment.paymentAmount ? appointment.paymentAmount / 100 : null,
    };

    return NextResponse.json(formattedAppointment);
  } catch (error) {
    console.error('Appointment fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
  const {user} = await validateRequest();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { status, paymentStatus, meetingLink, appointmentTime, ...updateData } = body;

    const appointment = await db.appointment.update({
      where: { id: params.id },
      data: {
        ...updateData,
        status: status || undefined,
        paymentStatus: paymentStatus || undefined,
        meetingLink: meetingLink || undefined,
        appointmentTime: appointmentTime || undefined,
      },
    });

    return NextResponse.json(appointment);
  } catch (error) {
    console.error('Appointment update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
 const {user} = await validateRequest();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await db.appointment.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: 'Appointment deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Appointment delete error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}