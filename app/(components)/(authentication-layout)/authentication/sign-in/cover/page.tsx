

"use client";

import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import { loginSchema, LoginValues } from "@/app/lib/validation";
import { login } from "../actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Cover = () => {
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const [passwordshow1, setPasswordShow1] = useState(false);
  const [currentHostname, setCurrentHostname] = useState<string>("");
  const router = useRouter();

  // Hostname'e göre içerik belirleme
  const getContentByHostname = (hostname: string) => {
    if (hostname === "www.cleververwaltet.de") {
      return {
        title: "Willkommen bei cleververwaltet",
        subtitle: "Ihre zuverlässige Immobilienverwaltung in Deutschland",
        buttonText: "Anmelden",
        placeholderUsername: "Benutzername",
        placeholderPassword: "Passwort",
        rememberText: "Passwort merken",
        forgotText: "Passwort vergessen?",
        orText: "Oder anmelden mit",
        noAccountText: "Sie haben noch kein Konto?",
        signUpText: "Registrieren",
        welcomeBack: "Willkommen zurück!",
        coverQuote: "Ihre Immobilien, unsere Leidenschaft - clever verwaltet in Deutschland"
      };
    } else if (hostname === "www.cleververwaltet.at") {
      return {
        title: "Willkommen bei cleververwaltet",
        subtitle: "Ihre zuverlässige Immobilienverwaltung in Österreich",
        buttonText: "Anmelden",
        placeholderUsername: "Benutzername",
        placeholderPassword: "Passwort",
        rememberText: "Passwort merken",
        forgotText: "Passwort vergessen?",
        orText: "Oder anmelden mit",
        noAccountText: "Sie haben noch kein Konto?",
        signUpText: "Registrieren",
        welcomeBack: "Willkommen zurück!",
        coverQuote: "Ihre Immobilien, unsere Leidenschaft - clever verwaltet in Österreich"
      };
    } else {
      return {
        title: "Sign In",
        subtitle: "Your reliable property management solution",
        buttonText: "Sign In",
        placeholderUsername: "Username",
        placeholderPassword: "Password",
        rememberText: "Remember password",
        forgotText: "Forgot password?",
        orText: "Or Sign In With",
        noAccountText: "Don't have an account?",
        signUpText: "Sign Up",
        welcomeBack: "Welcome back!",
        coverQuote: "Keys to the kingdom, once a time - This succinct quote playfully emphasizes the significance of each login, framing it as a step toward accessing a digital kingdom of possibilities"
      };
    }
  };

  const [content, setContent] = useState(getContentByHostname(""));

  useEffect(() => {
    // Client-side'da hostname'i al
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      setCurrentHostname(hostname);
      setContent(getContentByHostname(hostname));
      console.log("Current hostname:", hostname);
    }
  }, []);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginValues) => {
    setError(undefined);
    startTransition(async () => {
      try {
        const { error } = await login(values);
        if (error) {
          setError(error);
          toast.error(error);
        } else {
          toast.success('Login successful!');
          router.push("/home/onesocial/feed/home");
        }
      } catch (err) {
        setError("An unexpected error occurred");
        toast.error("An unexpected error occurred");
      }
    });
  };

  return (
    <Fragment>
      <Seo title={currentHostname.includes("cleververwaltet") ? "Login - cleververwaltet" : "Signin-Cover"} />
      <div className="grid grid-cols-12 gap-x-6 authentication authentication-cover-main mx-0">
        {/* Left Side - Cover Image */}
        <div className="xxl:col-span-5 xl:col-span-5 lg:col-span-12 xl:block hidden px-0">
          <div className="authentication-cover overflow-hidden">
            <div className="authentication-cover-logo">
              <Link className="relative" href="/dashboards/sales">
                <Image 
                  fill 
                  src="../../../assets/images/brand-logos/desktop-dark.png" 
                  alt="Logo" 
                  className="authentication-brand !block !h-[1.75rem] !leading-[1.75rem]" 
                />
              </Link>
            </div>
            <div className="aunthentication-cover-content !w-[70%] !h-[20rem] flex items-center justify-center">
              <div>
                <h2 className="text-[2.5rem] text-white leading-[1.5] font-medium">
                  {currentHostname.includes("cleververwaltet") ? content.title : "Keys to the kingdom, once a time"}
                </h2>
                <p className="mb-0 text-[1.125rem] leading-[1.5] text-white opacity-80">
                  {content.coverQuote}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="xxl:col-span-7 xl:col-span-7 col-span-12">
          <div className="grid grid-cols-12 gap-x-6 justify-center items-center h-full">
            <div className="xxl:col-span-3 xl:col-span-2 lg:col-span-3 md:col-span-3 sm:col-span-2 col-span-12"></div>
            <div className="xxl:col-span-6 xl:col-span-10 lg:col-span-6 md:col-span-6 sm:col-span-8 col-span-12">
              <div className="box !shadow-none my-auto !border-0">
                <div className="box-body !p-[3rem]">
                  <p className="h4 font-semibold !mb-1">{content.title}</p>
                  <p className="mb-4 text-textmuted dark:text-textmuted/50 font-normal">{content.welcomeBack}</p>
                  
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
                        <label htmlFor="username" className="ti-form-label text-default">{content.placeholderUsername}</label>
                        <input
                          id="username"
                          type="text"
                          className="form-control"
                          placeholder={content.placeholderUsername}
                          {...form.register("username")}
                        />
                        {form.formState.errors.username && (
                          <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.username.message}
                          </p>
                        )}
                      </div>

                      <div className="xl:col-span-12 col-span-12">
                        <label htmlFor="password" className="ti-form-label text-default block">
                          {content.placeholderPassword}
                          <Link href="/authentication/reset-password/basic/" className="float-end text-danger opacity-50 font-medium text-[0.75rem]">
                            {content.forgotText}
                          </Link>
                        </label>
                        <div className="relative">
                          <input
                            id="password"
                            type={passwordshow1 ? 'text' : 'password'}
                            className="form-control form-control-lg !rounded-s-md"
                            placeholder={content.placeholderPassword}
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
                          <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.password.message}
                          </p>
                        )}

                        <div className="mt-2">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="rememberMe"
                            />
                            <label className="form-check-label text-textmuted dark:text-textmuted/50 font-normal text-[0.75rem]" htmlFor="rememberMe">
                              {content.rememberText}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center my-4 authentication-barrier">
                      <span className="opacity-40 text-[0.6875rem]">{content.orText}</span>
                    </div>

                    <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                      <button type="button" className="ti-btn ti-btn-lg ti-btn-light ti-btn-w-lg !border !border-defaultborder dark:!border-defaultborder/10 flex items-center justify-center flex-grow">
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
                        className="ti-btn ti-btn-primary"
                        disabled={isPending}
                      >
                        {isPending ? (currentHostname.includes("cleververwaltet") ? "Wird angemeldet..." : "Signing In...") : content.buttonText}
                      </button>
                    </div>

                    <div className="text-center">
                      <p className="text-textmuted dark:text-textmuted/50 mt-4 mb-0">
                        {content.noAccountText}{' '}
                        <Link href="/authentication/sign-up/cover/" className="text-primary">
                          {content.signUpText}
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