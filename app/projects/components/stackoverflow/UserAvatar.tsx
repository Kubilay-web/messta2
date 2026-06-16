import ROUTES from "@/app/constants/routes";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Image from "next/image";
import { cn } from "@/app/lib/utils";

interface Props {
  id: string;
  username: string;
  avatarUrl?: string | null;
  className?: string;
  fallbackClassName?: string;
}

const UserAvatar = ({
  id,
  username,
  avatarUrl,
  className = "h-9 w-9",
  fallbackClassName,
}: Props) => {
  // Eğer username boşsa, fallback olarak boş string verilmiş olur
  const initials = username
    ? username
        .split(" ")
        .map((word: string) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : ""; // Eğer username yoksa, boş string döndürülür

  return (
    <Link href={ROUTES.PROFILE(id)}>
      <Avatar className={cn("relative", className)}>
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={username || "User Avatar"} // Eğer username yoksa alternatif bir açıklama ekledik
            className="object-cover"
            fill
            quality={100}
          />
        ) : (
          <AvatarFallback
            className={cn(
              "primary-gradient font-space-grotesk font-bold tracking-wider text-white",
              fallbackClassName,
            )}
          >
            {initials}
          </AvatarFallback>
        )}
      </Avatar>
    </Link>
  );
};

export default UserAvatar;
