// src/app/api/featured-products/route.ts
import { NextResponse } from "next/server";
import { getFeaturedProducts } from "@/app/queries/product";

export async function GET() {
  try {
    const products = await getFeaturedProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error("API Hatası:", error);
    return new NextResponse(JSON.stringify({ message: "Ürünler alınamadı" }), {
      status: 500,
    });
  }
}
