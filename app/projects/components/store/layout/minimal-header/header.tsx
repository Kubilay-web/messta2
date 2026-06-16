import { ChevronDown, Globe } from "lucide-react";
import Link from "next/link";
import { Button } from "../../ui/button";
import UserButton from "@/app/projects/components/UserButton";
import { validate } from "uuid";
import { validateRequest } from "@/app/auth";

export default async function MinimalHeader() {
  const { user } = await validateRequest();
  return (
    <div className="h-16 w-full border-b bg-transparent">
      <div className="mx-auto px-6">
        <div className="relative flex items-center justify-between py-2">
          <Link href="/">
            <h1 className="font-mono text-2xl font-extrabold">GoShop</h1>
          </Link>
          <div className="flex items-center gap-x-5">
            <div className="flex items-center gap-x-1">
              <Globe className="w-3" />
              <div className="cursor-pointer py-2 text-sm text-main-primary">
                English
              </div>
              <ChevronDown className="w-3" />
            </div>
            {user ? (
              <UserButton />
            ) : (
              <Link href="/">
                <Button variant="outline">Sign in</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
