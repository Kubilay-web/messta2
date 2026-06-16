"use client";

import { Printer, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../../../../../components/ui/button";

export default function PrintButton() {
  const router = useRouter();
  return (
    <div className="no-print flex items-center justify-between gap-2 mb-4">
      <Button variant="outline" size="sm" onClick={() => router.back()}>
        <ArrowLeft className="w-4 h-4 mr-1" /> Geri
      </Button>
      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => window.print()}>
        <Printer className="w-4 h-4 mr-1" /> Yazdır / PDF Kaydet
      </Button>
    </div>
  );
}
