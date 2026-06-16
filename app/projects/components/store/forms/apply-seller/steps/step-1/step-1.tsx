"use client";

import { useEffect, useState } from "react";
import AnimatedContainer from "../../animated-container";
import { UserInfo } from "@/app/queries/user";
import DefaultUserImg from "@/public/assets/images/default-user.jpg";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/projects/components/store/ui/button";
import UserDetails from "./user-details";

export default function Step1({ step, setStep }) {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await UserInfo();
      setUser(userData);
    };

    fetchUser();
  }, []);

  if (!user) return null;

  return (
    <div className="w-full">
      <AnimatedContainer>
        {user ? (
          <UserDetails />
        ) : (
          <div className="h-full">
            <div className="flex h-full flex-col justify-center space-y-4">
              <div className="w-full rounded-lg border border-blue-200 bg-blue-100 text-sm text-blue-800">
                <div className="flex p-4">
                  Please sign in (Or sign up if you are new) to start
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src={DefaultUserImg}
                  alt=""
                  width={200}
                  height={200}
                  className="h-40 w-40 rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-y-3">
                <Link href="/sign-in">
                  <Button>Sign in</Button>
                </Link>
                <Link href="/sign-in">
                  <Button variant="pink">Sign up</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </AnimatedContainer>
      {user ? (
        <div className="flex h-[100px] justify-between px-2 pt-4">
          <button
            type="button"
            onClick={() => step > 1 && setStep((prev) => prev - 1)}
            className="h-10 rounded-lg border bg-white px-4 py-2 font-medium text-gray-600 shadow-sm hover:bg-gray-100"
          >
            Previous
          </button>
          <button
            type="submit"
            onClick={() => step < 4 && setStep((prev) => prev + 1)}
            className="h-10 rounded-lg bg-blue-500 px-4 py-2 font-medium text-white shadow-sm hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      ) : (
        <div>No user found.</div>
      )}
    </div>
  );
}
