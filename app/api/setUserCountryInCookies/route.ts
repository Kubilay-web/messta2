import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userCountry } = body;

    if (!userCountry) {
      return new NextResponse("User country data not sent.", { status: 400 });
    }

    const cookie = serialize("userCountry", JSON.stringify(userCountry), {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: false,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    const response = new NextResponse("User country data saved");
    response.headers.set("Set-Cookie", cookie);

    return response;
  } catch (error) {
    console.error("Cookie write error:", error);
    return new NextResponse("Couldn't save data", { status: 500 });
  }
}
