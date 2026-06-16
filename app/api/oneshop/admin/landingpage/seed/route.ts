import { NextRequest, NextResponse } from "next/server";
import seedLandingPageData from "@/app/lib/seed";

export async function POST(request: NextRequest) {
  try {
    console.log("Starting landing page seeding...");
    
    const result = await seedLandingPageData();
    
    return NextResponse.json({
      success: true,
      message: "Landing page data seeded successfully",
      data: result
    });
  } catch (error: any) {
    console.error("Error seeding data:", error);
    
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to seed data",
        details: error.message 
      },
      { status: 500 }
    );
  }
}