"use client"
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { FC, Fragment, useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
interface BasicProps { }
type FormData = {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
};
const Basic: FC<BasicProps> = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>();

    const [passwordVisibility, setPasswordVisibility] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
        setPasswordVisibility((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };
    const router = useRouter();
    const onSubmit = (data: any) => {
        router.push('/estate');
        toast.success('Created Password successful', {
            position: 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const newPassword = watch('newPassword');
    return (
        <Fragment>

            <Seo title={"Reset-Basic"} />
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
                                    <p className="h4 font-semibold !mb-1">Reset Password</p>
                                    <p className="mb-4 text-textmuted dark:text-textmuted/50 font-normal">Hello Jack !</p>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="grid grid-cols-12 gap-y-4">
                                            {/* Current Password */}
                                            <div className="xl:col-span-12 col-span-12">
                                                <label htmlFor="currentPassword" className="ti-form-label text-default">
                                                    Current Password
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type={passwordVisibility.current ? 'text' : 'password'}
                                                        id="currentPassword"
                                                        placeholder="Current password"
                                                        className="form-control custom-form-input"
                                                        {...register('currentPassword', { required: 'Current password is required' })}
                                                    />
                                                    <Link href="#!" scroll={false} onClick={() => togglePasswordVisibility('current')} className="show-password-button text-textmuted dark:text-textmuted/50">
                                                        <i className={`${passwordVisibility.current ? 'ri-eye-line' : 'ri-eye-off-line'} align-middle`} />
                                                    </Link>
                                                </div>
                                                {errors.currentPassword && <p className="text-red-500 text-sm">{errors.currentPassword.message}</p>}
                                            </div>
                                            {/* New Password */}
                                            <div className="xl:col-span-12 col-span-12">
                                                <label htmlFor="newPassword" className="ti-form-label text-default">
                                                    New Password
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type={passwordVisibility.new ? 'text' : 'password'}
                                                        id="newPassword"
                                                        placeholder="New password"
                                                        className="form-control custom-form-input"
                                                        {...register('newPassword', {
                                                            required: 'New password is required',
                                                            minLength: {
                                                                value: 6,
                                                                message: 'Password must be at least 6 characters',
                                                            },
                                                        })}
                                                    />
                                                    <Link href="#!" scroll={false} onClick={() => togglePasswordVisibility('new')} className="show-password-button text-textmuted dark:text-textmuted/50">
                                                        <i className={`${passwordVisibility.new ? 'ri-eye-line' : 'ri-eye-off-line'} align-middle`} />
                                                    </Link>
                                                </div>
                                                {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
                                            </div>

                                            {/* Confirm Password */}
                                            <div className="xl:col-span-12 col-span-12">
                                                <label htmlFor="confirmPassword" className="ti-form-label text-default">
                                                    Confirm Password
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type={passwordVisibility.confirm ? 'text' : 'password'}
                                                        id="confirmPassword"
                                                        placeholder="Confirm password"
                                                        className="form-control custom-form-input"
                                                        {...register('confirmPassword', {
                                                            required: 'Please confirm your password',
                                                            validate: (value: any) =>
                                                                value === newPassword || 'Passwords do not match',
                                                        })}
                                                    />
                                                    <Link href="#!" scroll={false} onClick={() => togglePasswordVisibility('confirm')} className="show-password-button text-textmuted dark:text-textmuted/50">
                                                        <i className={`${passwordVisibility.confirm ? 'ri-eye-line' : 'ri-eye-off-line'} align-middle`} />
                                                    </Link>
                                                </div>
                                                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                                            </div>

                                            {/* Remember Password Checkbox */}
                                            <div className="xl:col-span-12 col-span-12 mt-2">
                                                <div className="form-check mb-0">
                                                    <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                    <label className="form-check-label text-textmuted dark:text-textmuted/50 font-normal text-[0.75rem]" htmlFor="defaultCheck1">
                                                        Remember password?
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center my-4 authentication-barrier">
                                            <span className="opacity-40 text-[0.6875rem]">Or SignIn With</span>
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
                                        {/* Submit Button */}
                                        <div className="grid mt-4">
                                            <button type="submit" className="ti-btn ti-btn-primary">Create</button>
                                        </div>
                                    </form>
                                    <div className="text-center">
                                        <p className="text-textmuted dark:text-textmuted/50 mt-4 mb-0">Already have an account? <Link href="/authentication/sign-in/basic/" className="text-primary">Sign In</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-3 md:col-span-3 sm:col-span-2 col-span-12"></div>
                        <ToastContainer />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Basic;