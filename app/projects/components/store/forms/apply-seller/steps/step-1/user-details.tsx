import { validateRequest } from "@/app/auth";
import Input from "@/app/projects/components/store/ui/input";
import UserButton from "@/app/projects/components/UserButton";
import { UserInfo } from "@/app/queries/user";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function UserDetails() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await UserInfo();
      setUser(userData);
    };

    fetchUser();
  }, []);

  const btnConatinerRef = useRef<HTMLDivElement | null>(null);

  const handleImageClick = () => {
    const userButton = btnConatinerRef.current?.querySelector("button");
    if (userButton) {
      userButton.click();
    }
  };
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <div className="relative">
        {/* User Image */}
        <Image
          src={user?.avatarUrl!}
          alt="User avatar"
          width={200}
          height={200}
          className="cursor-pointer rounded-full"
          onClick={handleImageClick}
        />
        {/* Hidden UserButton */}
        <div
          ref={btnConatinerRef}
          className="pointer-events-none absolute inset-0 z-0 opacity-0"
        >
          <UserButton />
        </div>
      </div>
      {/* First Name Input */}
      <Input
        name="firstName"
        value={user?.username || ""}
        onChange={() => {}}
        type="text"
        readonly
      />
      {/* Last Name Input */}
      <Input
        name="lastName"
        value={user?.displayName || ""}
        onChange={() => {}}
        type="text"
        readonly
      />
    </div>
  );
}
