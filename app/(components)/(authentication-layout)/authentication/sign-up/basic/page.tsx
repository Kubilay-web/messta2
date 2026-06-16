"use client"

import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { FC, Fragment, useState } from "react";
import { auth } from "@/shared/firebase/firebaseapi";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
interface BasicProps { }

const Basic: FC<BasicProps> = () => {
    const [passwordshow1, setpasswordshow1] = useState(false);
    const [err, setError] = useState("");
    const [data, setData] = useState({
        "email": "adminnextjs@gmail.com",
        "password": "1234567890",
    });
    const { email, password } = data;
    const changeHandler = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setError("");
    };
    const Login = (e: React.FormEvent) => {
               e.preventDefault();
             
               auth.signInWithEmailAndPassword(email, password)
                 .then(user => {
                   console.log(user);
             
                   // Show success message
                   toast.success('Created successful', {
                       position: 'top-right',
                       autoClose: 1500,
                       hideProgressBar: false,
                       closeOnClick: true,
                       pauseOnHover: true,
                       draggable: true,
                     });
                     setTimeout(() => {
                       RouteChange();
                     }, 1200);
                 })
                 .catch(err => {
                   setError(err.message);
             
                   // Show error message
                   toast.error('Invalid details', {
                       position: 'top-right',
                       autoClose: 1500,
                       hideProgressBar: false,
                       closeOnClick: true,
                       pauseOnHover: true,
                       draggable: true,
                     });
                 });
             };

    const router = useRouter();
    const RouteChange = () => {
        let path = "/";
        router.push(path);
    }
    return (
        <Fragment>
            <Seo title={"Signup-Basic"} />
            <div className="authentication-background">
                <div className="container">
                    <div className="grid grid-cols-12 authentication authentication-basic items-center h-full">
                        <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-3 md:col-span-3 sm:col-span-2 col-span-12"></div>
                        <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-8 col-span-12 px-[0.5rem]">
                            <div className="my-[3rem] flex justify-center">
                                <Link className="relative" href="/dashboards/sales">
                                    <Image fill src="../../../assets/images/brand-logos/desktop-dark.png" alt="logo" className="h-[1.75rem] leading-[1.75rem]" />
                                </Link>
                            </div>
                            <div className="box my-6">
                                <div className="box-body !p-[3rem]">
                                    <p className="h4 font-semibold !mb-1">Sign Up</p>
                                    <p className="mb-4 text-textmuted dark:text-textmuted/50 font-normal">Join us by creating a free account !</p>
                                    {err && <div className="alert-danger px-4 py-3 shadow-md mb-2" role="alert">
                                        <div className="flex">
                                            <div className="py-1">
                                            </div>
                                            <div>{err}</div>
                                        </div>
                                    </div>}
                                    <div className="grid grid-cols-12 gap-y-4">
                                        <div className="xl:col-span-12 col-span-12">
                                            <label htmlFor="signup-firstname" className="ti-form-label text-default">Email Address</label>
                                            <input type="email" name="email" className="form-control" placeholder="user name" value={email} onChange={changeHandler} />
                                        </div>
                                        <div className="xl:col-span-12 col-span-12">
                                            <label htmlFor="create-confirmpassword" className="ti-form-label text-default">Password</label>
                                            <div className="relative">
                                                <input type={(passwordshow1) ? 'text' : "password"} className="form-control form-control-lg !rounded-s-md"
                                                    name="password"
                                                    placeholder="password" value={password}
                                                    onChange={changeHandler} />
                                                <Link href="#!" onClick={() => setpasswordshow1(!passwordshow1)} className="show-password-button text-textmuted dark:text-textmuted/50" id="button-addon2">
                                                    <i className={`${passwordshow1 ? 'ri-eye-line' : 'ri-eye-off-line'} align-middle`}></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center my-4 authentication-barrier">
                                        <span className="opacity-40 text-[0.6875rem]">OR SignUp With</span>
                                    </div>
                                    <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                                        <button className="ti-btn ti-btn-light ti-btn-w-lg !border !border-defaultborder dark:!border-defaultborder/10 flex items-center justify-center flex-grow">
                                            <span className="avatar avatar-xs">
                                                <Image fill src="../../../assets/images/media/apps/google.png" alt="" />
                                            </span>
                                            <span className="leading-none ms-2 text-[0.8125rem] text-default font-medium">Google</span>
                                        </button>
                                        <button className="ti-btn ti-btn-light ti-btn-w-lg !border  !border-defaultborder dark:!border-defaultborder/10 flex items-center justify-center flex-grow">
                                            <span className="avatar avatar-xs">
                                                <Image fill src="../../../assets/images/media/apps/facebook.png" alt="" />
                                            </span>
                                            <span className="leading-none ms-2 text-[0.8125rem] text-default font-medium">Facebook</span>
                                        </button>
                                    </div>
                                    <div className="grid mt-4">
                                        <Link href="#!" className="ti-btn ti-btn-primary" onClick={Login}>Create Account</Link>
                                        <ToastContainer />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-textmuted dark:text-textmuted/50 mt-4 mb-0">Already have an account?
                                            <Link href="/" className="text-primary"> Sign In</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-3 md:col-span-3 sm:col-span-2 col-span-12"></div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Basic;