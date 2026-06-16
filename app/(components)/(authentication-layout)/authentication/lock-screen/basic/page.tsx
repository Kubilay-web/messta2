"use client"

import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FC, FormEvent, Fragment, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

interface BasicProps { }
interface FormData {
    password: string;
}

interface FormErrors {
    password?: string;
}

interface PasswordVisibility {
    password: boolean;
    passwords: boolean;
}

const Basic: FC<BasicProps> = () => {

    const [formData, setFormData] = useState<FormData>({
        password: ''
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
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const router = useRouter()
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
            <Seo title={"Lock-Basic"} />
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
                                <p className="h4 font-semibold !mb-1">Lock Screen</p>
                                <p className="mb-4 text-textmuted dark:text-textmuted/50 font-normal">Hello Jack !</p>
                                <div className="flex gap-2 items-center mb-4">
                                    <div className="leading-none">
                                        <span className="avatar avatar-sm avatar-rounded">
                                            <Image fill src="../../../assets/images/faces/15.jpg" alt="" />
                                        </span>
                                    </div>
                                    <div>
                                        <p className="mb-0 text-dark font-medium">millerjack@gmail.com</p>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-12 gap-y-4">
                                    <div className="xl:col-span-12 col-span-12">
                                        <label htmlFor="create-confirmpassword" className="ti-form-label text-default">Password</label>
                                        
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
                                       
                                        <div className="mt-2">
                                            <div className="form-check mb-0">
                                                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                <label className="form-check-label text-textmuted dark:text-textmuted/50 font-normal text-[0.75rem]" htmlFor="defaultCheck1">
                                                    Remember password ?
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Submit Button */}
                                <div className="grid mt-4">
                                    <button type="submit" className="ti-btn ti-btn-primary">Unlock</button>
                                </div>
                                </form>
                                <div className="text-center">
                                    <p className="text-[0.75rem] text-textmuted dark:text-textmuted/50 mt-4 mb-0">Try unlock with <Link scroll={false} className="text-success" href="#!"><u>Finger print</u></Link> / <Link scroll={false} className="text-success" href="#!"><u>Face Id</u></Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-3 md:col-span-3 sm:col-span-2 col-span-12"></div>
                    <ToastContainer />
                </div>
            </div>
        </Fragment>
    );
};

export default Basic;