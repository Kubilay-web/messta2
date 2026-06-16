"use client";

import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { signUpSchema, SignUpValues } from "@/app/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "../actions";

const Cover = () => {
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const [passwordshow1, setPasswordShow1] = useState(false);
  const router = useRouter();

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

const onSubmit = async (values: SignUpValues) => {
  setError(undefined);
  startTransition(async () => {
    try {
      const { error } = await signUp(values);
      if (error) {
        setError(error);
        toast.error(error);
      } else {
        toast.success('Account created successfully!');
        setTimeout(() => {
          router.push("/estate");
        }, 3000); // 3 saniye sonra yönlendirme
      }
    } catch (err) {
      setError("An unexpected error occurred");
      toast.error("An unexpected error occurred");
    }
  });
};

  return (
   <Fragment>
      <Seo title={"Signup-Cover"} />
      <div className="grid grid-cols-12 gap-x-6 authentication authentication-cover-main mx-0">
        <div className="xxl:col-span-5 xl:col-span-5 lg:col-span-12 xl:block hidden px-0">
          <div className="authentication-cover overflow-hidden">
            <div className="authentication-cover-logo">
              <Link className="relative" href="/dashboards/sales">
                <Image 
                  fill 
                  src="../../../assets/images/brand-logos/desktop-dark.png" 
                  alt="" 
                  className="authentication-brand !block !h-[1.75rem] !leading-[1.75rem]" 
                />
              </Link>
            </div>
            <div className="aunthentication-cover-content !w-[70%] !h-[20rem] flex items-center justify-center">
              <div>
                <h2 className="text-[2.5rem] text-white leading-[1.5] font-medium">Keys to the kingdom, once a time</h2>
                <p className="mb-0 text-[1.125rem] leading-[1.5] text-white opacity-80">This succinct quote playfully emphasizes the significance of each login, framing it as a step toward accessing a digital kingdom of possibilities</p>
              </div>
            </div>
          </div>
        </div>
        <div className="xxl:col-span-7 xl:col-span-7 col-span-12">
          <div className="grid grid-cols-12 gap-x-6 justify-center items-center h-full">
            <div className="xxl:col-span-3 xl:col-span-2 lg:col-span-3 md:col-span-3 sm:col-span-2 col-span-12"></div>
            <div className="xxl:col-span-6 xl:col-span-10 lg:col-span-6 md:col-span-6 sm:col-span-8 col-span-12">
              <div className="box !shadow-none my-auto !border-0">
                <div className="box-body !p-[3rem]">
                  <p className="h4 font-semibold !mb-1">Sign Up</p>
                  <p className="mb-4 text-textmuted dark:text-textmuted/50 font-normal">Join us by creating a free account !</p>
                  
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    {error && (
                      <div className="alert-danger px-4 py-3 shadow-md mb-2" role="alert">
                        <div className="flex">
                          <div className="py-1"></div>
                          <div>{error}</div>
                        </div>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-12 sm:gap-x-6 gap-y-4">
                      <div className="xl:col-span-12 col-span-12">
                        <label htmlFor="email" className="ti-form-label text-default">Email Address</label>
                        <input
                          id="email"
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          {...form.register("email")}
                        />
                        {form.formState.errors.email && (
                          <span className="text-red-500 text-sm">
                            {form.formState.errors.email.message}
                          </span>
                        )}
                      </div>
                      
                      <div className="xl:col-span-12 col-span-12">
                        <label htmlFor="username" className="ti-form-label text-default">Username</label>
                        <input
                          id="username"
                          type="text"
                          className="form-control"
                          placeholder="Username"
                          {...form.register("username")}
                        />
                        {form.formState.errors.username && (
                          <span className="text-red-500 text-sm">
                            {form.formState.errors.username.message}
                          </span>
                        )}
                      </div>
                      
                      <div className="xl:col-span-12 col-span-12">
                        <label htmlFor="password" className="ti-form-label text-default">Password</label>
                        <div className="relative">
                          <input
                            id="password"
                            type={passwordshow1 ? 'text' : 'password'}
                            className="form-control form-control-lg !rounded-s-md"
                            placeholder="Password"
                            {...form.register("password")}
                          />
                          <button
                            type="button"
                            onClick={() => setPasswordShow1(!passwordshow1)}
                            className="show-password-button text-textmuted dark:text-textmuted/50 absolute right-3 top-1/2 transform -translate-y-1/2"
                          >
                            <i className={`${passwordshow1 ? 'ri-eye-line' : 'ri-eye-off-line'} align-middle`}></i>
                          </button>
                        </div>
                        {form.formState.errors.password && (
                          <span className="text-red-500 text-sm">
                            {form.formState.errors.password.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-center my-4 authentication-barrier">
                      <span className="opacity-40 text-[0.6875rem]">OR SignUp With</span>
                    </div>
                    
                    <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                      <button type="button" className="ti-btn ti-btn-light ti-btn-lg ti-btn-w-lg !border !border-defaultborder dark:!border-defaultborder/10 flex items-center justify-center flex-grow">
                        <span className="avatar avatar-xs">
                          <Image fill src="../../../assets/images/media/apps/google.png" alt="Google" />
                        </span>
                        <span className="leading-none ms-2 text-[0.8125rem] text-default font-medium">Google</span>
                      </button>
                      <button type="button" className="ti-btn ti-btn-light ti-btn-lg ti-btn-w-lg !border !border-defaultborder dark:!border-defaultborder/10 flex items-center justify-center flex-grow">
                        <span className="avatar avatar-xs">
                          <Image fill src="../../../assets/images/media/apps/facebook.png" alt="Facebook" />
                        </span>
                        <span className="leading-none ms-2 text-[0.8125rem] text-default font-medium">Facebook</span>
                      </button>
                    </div>
                    
                    <div className="grid mt-4">
                      <button 
                        type="submit" 
                        className="ti-btn ti-btn-lg ti-btn-primary"
                        disabled={isPending}
                      >
                        {isPending ? 'Creating Account...' : 'Create Account'}
                      </button>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-textmuted dark:text-textmuted/50 mt-4 mb-0">
                        Already have an account?{' '}
                        <Link href="/login" className="text-primary">
                          Sign In
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="xxl:col-span-3 xl:col-span-2 lg:col-span-3 md:col-span-3 sm:col-span-2 col-span-12"></div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default Cover;