"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

import TextInput from "../../../components/FormInputs/TextInput";
import SubmitButton from "../../../components/FormInputs/SubmitButton";
import CustomCarousel from "../custom-carousel";
import Logo from "../../../components/logo";
import PasswordInput from "../../../components/FormInputs/PasswordInput";
import { Lock, LogIn, Mail } from "lucide-react";
import { loginUser } from "../../../actions/auth";
import { useUserSession } from "../../../store/auth";
import { School, User } from "../../../types/types";
import { getSchoolById } from "../../../actions/schools";
import useSchoolStore from "../../../store/school";
import { useDeviceInfo } from "../../../hooks/useDeviceInfo";
import { getCurrentTime } from "../../../lib/timeUtils";
import { createUserLog } from "../../../actions/user-logs";
import toast from "react-hot-toast";

export type LoginInputProps = {
  email: string;
  password: string;
};
export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { getDeviceInfo } = useDeviceInfo();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginInputProps>();
  const { setUser } = useUserSession();
  const { setSchool } = useSchoolStore();
  const { time } = getCurrentTime();
  const router = useRouter();
  async function onSubmit(data: LoginInputProps) {
    try {
      setIsLoading(true);
      const sessionData = await loginUser(data);
      const role = sessionData?.user.role;
      const school = await getSchoolById(sessionData?.user.schoolId);
      // console.log("school=>", school, sessionData?.user.schoolId, sessionData);
      setSchool(school as School);
      // Save the Data in Zustand
      setUser(sessionData?.user as User);
      // Route the User according to the role

      // Create User Log
      const name = sessionData?.user.name ?? "";
      const deviceInfo = await getDeviceInfo();
      const activity = `User (${name}) Logged In Successfully`;
      const schoolId = school?.id ?? "";
      const log = {
        name,
        activity,
        time: time,
        ipAddress: deviceInfo.ipAddress,
        device: deviceInfo.device,
        schoolId,
      };
      await createUserLog(log);
      setIsLoading(false);
      if (role === "SUPER_ADMIN") {
        toast.success("Logged In Successfully");
        router.push("/school-onboarding");
      } else if (role === "ADMIN") {
        toast.success("Logged In Successfully");
        router.push("/dashboard");
      } else {
        toast.success("Logged In Successfully");
        router.push("/portal");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Something Went wrong, Try again");
      console.log(error);
    }
  }
  return (
    <div className="w-full lg:grid h-screen lg:min-h-[600px] lg:grid-cols-2 relative ">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6 mt-10 md:mt-0">
          <div className="absolute left-1/3 top-14 md:top-5 md:left-5">
            <Logo />
          </div>
          <div className="grid gap-2 text-center mt-10 md:mt-0">
            <h1 className="text-3xl font-bold">Login to your Account</h1>
          </div>
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              label="Email Address"
              register={register}
              name="email"
              type="email"
              errors={errors}
              placeholder="Eg. johndoe../../..gmail.com"
              icon={Mail}
            />
            {/* <TextInput
              label="Password"
              register={register}
              name="password"
              type="password"
              errors={errors}
              placeholder="************"
              icon={Lock}
            /> */}

            <PasswordInput
              icon={Lock}
              label="Password"
              register={register}
              name="password"
              type="password"
              errors={errors}
              placeholder="******"
              forgotPasswordLink="/forgot-password"
            />

            <SubmitButton
              buttonIcon={LogIn}
              title="Signin"
              loading={isLoading}
              loadingTitle="Signing in please wait..."
            />
          </form>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        <CustomCarousel />
      </div>
    </div>
  );
}
