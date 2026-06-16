import React from "react";

export default function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-2">{title}</h1>
      <p className="text-center text-gray-600 mb-8">{description}</p>
    </div>
  );
}
