"use server";

import {
  MultipleMailPayload,
  SingleMailPayload,
} from "../components/emails/SendMailForm";

export async function sendMultipleEmails(data: MultipleMailPayload) {
  console.log(data);
  try {
    return {
      success: true,
      message: "Message Sent Successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
export async function sendSingleEmail(data: SingleMailPayload) {
  try {
    return {
      success: true,
      message: "Message Sent Successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
