"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
    >
      🖨️ İlanı Yazdır / PDF
    </button>
  );
}
