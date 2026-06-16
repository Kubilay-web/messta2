"use client"
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, Fragment, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

interface FormData {
    password: string;
    confirmPassword: string;
}

interface FormErrors {
    password?: string;
    confirmPassword?: string;
}

interface PasswordVisibility {
    password: boolean;
    passwords: boolean;
}

const Cover = () => {

    const [formData, setFormData] = useState<FormData>({
        password: '',
        confirmPassword: '',
    });

    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [passwordVisibility, setPasswordVisibility] = useState<PasswordVisibility>({
        password: false,
        passwords: false,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        setFormErrors((prev) => ({ ...prev, [id]: '' }));
    };

    const togglePasswordVisibility = (field: keyof PasswordVisibility) => {
        setPasswordVisibility((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const validate = (): boolean => {
        const errors: FormErrors = {};

        if (!formData.password || formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        if (formData.confirmPassword !== formData.password) {
            errors.confirmPassword = 'Passwords do not match';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const router = useRouter();
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            router.push('/estate');

            toast.success('Save Password successful', {
                position: 'top-right',
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    return (
        <Fragment>

            <Seo title={"Create-Cover"} />

            <div className="grid grid-cols-12 gap-x-6 authentication authentication-cover-main mx-0">
                <div className="xxl:col-span-5 xl:col-span-5 lg:col-span-12 xl:block hidden px-0">
                    <div className="authentication-cover overflow-hidden">
                        <div className="authentication-cover-logo">
                            <Link className="relative" href="/dashboards/sales">
                                <Image fill src="../../../assets/images/brand-logos/desktop-dark.png" alt="" className="authentication-brand !block !h-[1.75rem] !leading-[1.75rem]" />
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
                                    <p className="h4 font-semibold !mb-1">Create Password</p>
                                    <p className="mb-4 text-textmuted dark:text-textmuted/50 font-normal">Hello Jack !</p>
                                    <form onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-12 sm:gap-x-6 gap-y-4">
                                            {/* Password Field */}
                                            <div className="xl:col-span-12 col-span-12">
                                                <label htmlFor="password" className="ti-form-label text-default">
                                                    Password
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type={passwordVisibility.password ? 'text' : 'password'}
                                                        className="form-control custom-form-input"
                                                        id="password"
                                                        placeholder="password"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                    />
                                                    <Link
                                                        scroll={false}
                                                        href="#!"
                                                        onClick={() => togglePasswordVisibility('password')}
                                                        className="show-password-button text-textmuted dark:text-textmuted/50"
                                                    >
                                                        <i className={`align-middle ${passwordVisibility.password ? 'ri-eye-line' : 'ri-eye-off-line'}`}></i>
                                                    </Link>
                                                </div>
                                                {formErrors.password && (
                                                    <p className="text-danger text-xs mt-1">{formErrors.password}</p>
                                                )}
                                            </div>
                                            {/* Confirm Password Field */}
                                            <div className="xl:col-span-12 col-span-12">
                                                <label htmlFor="confirmPassword" className="ti-form-label text-default">
                                                    Confirm Password
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type={passwordVisibility.passwords ? 'text' : 'password'}
                                                        className="form-control custom-form-input"
                                                        id="confirmPassword"
                                                        placeholder="confirm password"
                                                        value={formData.confirmPassword}
                                                        onChange={handleChange}
                                                    />
                                                    <Link
                                                        scroll={false}
                                                        href="#!"
                                                        onClick={() => togglePasswordVisibility('passwords')}
                                                        className="show-password-button text-textmuted dark:text-textmuted/50"
                                                    >
                                                        <i className={`align-middle ${passwordVisibility.passwords ? 'ri-eye-line' : 'ri-eye-off-line'}`}></i>
                                                    </Link>
                                                </div>
                                                {formErrors.confirmPassword && (
                                                    <p className="text-danger text-xs mt-1">{formErrors.confirmPassword}</p>
                                                )}

                                                <div className="mt-2">
                                                    <div className="form-check !flex items-center mb-0">
                                                        <input className="form-check-input" type="checkbox" id="defaultCheck1" />
                                                        <label
                                                            className="form-check-label text-textmuted dark:text-textmuted/50 font-normal text-[0.75rem]"
                                                            htmlFor="defaultCheck1"
                                                        >
                                                            Remember password?
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center my-4 authentication-barrier">
                                            <span className="opacity-40 text-[0.6875rem]">Or SignIn With</span>
                                        </div>
                                        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                                            <button className="ti-btn ti-btn-light ti-btn-lg ti-btn-w-lg !border !border-defaultborder dark:!border-defaultborder/10 flex items-center justify-center flex-grow">
                                                <span className="avatar avatar-xs">
                                                    <Image fill src="../../../assets/images/media/apps/google.png" alt="" />
                                                </span>
                                                <span className="leading-none ms-2 text-[0.8125rem] text-default font-medium">Google</span>
                                            </button>
                                            <button className="ti-btn ti-btn-light ti-btn-lg ti-btn-w-lg !border  !border-defaultborder dark:!border-defaultborder/10 flex items-center justify-center flex-grow">
                                                <span className="avatar avatar-xs">
                                                    <Image fill src="../../../assets/images/media/apps/facebook.png" alt="" />
                                                </span>
                                                <span className="leading-none ms-2 text-[0.8125rem] text-default font-medium">Facebook</span>
                                            </button>
                                        </div>
                                        {/* Submit Button */}
                                        <div className="grid mt-4">
                                            <button type="submit" className="ti-btn ti-btn-primary">Save Password</button>
                                        </div>
                                    </form>
                                    <div className="text-center">
                                        <p className="text-textmuted dark:text-textmuted/50 mt-4 mb-0">Back to home ? <Link href="/dashboards/sales" className="text-primary">Click Here</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xxl:col-span-3 xl:col-span-2 lg:col-span-3 md:col-span-3 sm:col-span-2 col-span-12"></div>
                        <ToastContainer />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Cover;