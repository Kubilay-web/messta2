import Link from "next/link";
import CloseButton from "../../../components/FormInputs/CloseButton";
import SubmitButton from "../../../components/FormInputs/SubmitButton";
import React from "react";

export default function FormFooter({
  href,
  editingId,
  loading,
  title,
  parent,
}: {
  href: string;
  editingId: string | undefined;
  loading: boolean;
  title: string;
  parent?: string;
}) {
  return (
    <div className="flex items-center  gap-2 py-4 justify-between ">
      {/* <CloseButton href={href} parent={parent} /> */}

          <Link className="text-black text-sm mr-4" href="/management/dashboard/users">Close</Link>
      <SubmitButton
        title={editingId ? `Update ${title}` : `Save ${title}`}
        loading={loading}
        className="w-auto"
      />
    </div>
  );
}
