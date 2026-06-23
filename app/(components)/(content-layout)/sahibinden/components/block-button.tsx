"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { blockUser, unblockUser } from "../actions";

export default function BlockButton({
  targetUserId,
  initialBlocked = false,
  isLoggedIn,
}: {
  targetUserId: string;
  initialBlocked?: boolean;
  isLoggedIn: boolean;
}) {
  const [blocked, setBlocked] = useState(initialBlocked);
  const [pending, start] = useTransition();
  const router = useRouter();

  function toggle() {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    start(async () => {
      const res = blocked ? await unblockUser(targetUserId) : await blockUser(targetUserId);
      if (res.ok) setBlocked(!blocked);
    });
  }

  return (
    <button
      onClick={toggle}
      disabled={pending}
      className={`w-full text-center text-xs ${blocked ? "text-gray-600 hover:text-gray-800" : "text-gray-600 hover:text-red-500"}`}
    >
      {blocked ? "✓ Engellendi — kaldır" : "🚫 Kullanıcıyı engelle"}
    </button>
  );
}
