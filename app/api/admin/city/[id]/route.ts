import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, name, selectedCountryId, selectedStateId } = body;

    // Kaydın var olup olmadığını kontrol et
    const existingCity = await db.city.findUnique({
      where: { id }, // id'ye göre şehir kaydını buluyoruz
    });

    if (!existingCity) {
      return NextResponse.json({ err: "Şehir bulunamadı" }, { status: 404 });
    }

    // Mevcut şehir kaydını güncelle
    const updatedCity = await db.city.update({
      where: { id }, // Güncelleme işlemi id'ye göre yapılıyor
      data: {
        name,
        countryId: selectedCountryId,
        stateId: selectedStateId,
      },
    });

    return NextResponse.json(updatedCity);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    // Kaydın var olup olmadığını kontrol et
    const existingCity = await db.city.findUnique({
      where: { id },
    });

    if (!existingCity) {
      return NextResponse.json({ err: "City not found." }, { status: 404 });
    }

    // Şehri sil
    await db.city.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Şehir başarıyla silindi" });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
