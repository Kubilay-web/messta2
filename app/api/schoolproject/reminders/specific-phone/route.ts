import { NextRequest, NextResponse } from "next/server";


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;

// Use dynamic import for twilio
const twilio = require("twilio");

export async function POST(request: NextRequest) {
  try {
    const receivedData = await request.json();
    const { parentName, phone, message } = receivedData;

    // Initialize Twilio client
    const client = twilio(accountSid, authToken);

    // Create the message with parent name if available
    const messageBody = parentName ? `${parentName}: ${message}` : message;

    const twilioResponse = await client.messages.create({
      body: messageBody,
      to: phone,
      from: fromNumber,
    });

    console.log(twilioResponse);
    
    return NextResponse.json(
      {
        success: true,
        messageId: twilioResponse.sid,
        status: twilioResponse.status,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending the reminder:", error);
    return NextResponse.json(
      { error: "Failed to send the reminder" },
      { status: 500 }
    );
  }
}