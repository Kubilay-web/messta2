import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { sendReminderTemplate } from "../../reminder";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const receivedData = await request.json();
    const { parentName: name, email, message: body, subject } = receivedData;

    const { data, error } = await resend.emails.send({
      from: "Desishub <info@desishub.com>",
      to: email,
      subject: subject,
      html: sendReminderTemplate(body, subject, name),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    console.log(data);
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Error sending the reminder:", error);
    return NextResponse.json(
      { error: "Failed to send the reminder" },
      { status: 500 }
    );
  }
}