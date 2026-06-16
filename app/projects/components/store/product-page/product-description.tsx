"use client";
import DOMPurify from "dompurify";

export default function ProductDescription({
  text,
}: {
  text: string;
}) {
  const sanitizedHtml = DOMPurify.sanitize(text);

  return (
    <div className="pt-6">
      <div className="h-12">
        <h2 className="text-2xl font-bold text-main-primary">Description</h2>
      </div>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
    </div>
  );
}
