"use client"

import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import React, { FC, Fragment, useRef, useState } from "react";
type OTPFields = {
    one: string;
    two: string;
    three: string;
    four: string;
};
interface CoverProps { }

const Cover: FC<CoverProps> = () => {
    const [inputValues, setInputValues] = useState<OTPFields>({
        one: '',
        two: '',
        three: '',
        four: '',
    });

    const [error, setError] = useState<string>('');

    const inputsRef = {
        one: useRef<HTMLInputElement>(null),
        two: useRef<HTMLInputElement>(null),
        three: useRef<HTMLInputElement>(null),
        four: useRef<HTMLInputElement>(null),
    };

    const handleChange = (
        current: keyof OTPFields,
        next: keyof OTPFields | null,
        value: string
    ): void => {
        if (!/^\d?$/.test(value)) return; // Only allow one digit

        const updatedValues = { ...inputValues, [current]: value };
        setInputValues(updatedValues);

        if (value && next && inputsRef[next].current) {
            inputsRef[next].current?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
        const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);

        if (paste.length === 4) {
            setInputValues({
                one: paste[0],
                two: paste[1],
                three: paste[2],
                four: paste[3],
            });

            inputsRef.four.current?.focus();
        }

        e.preventDefault();
    };
  const router = useRouter();
    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();

        const { one, two, three, four } = inputValues;

        if (!one || !two || !three || !four) {
            setError('All fields are required.');
            return;
        }

        const fullOTP = `${one}${two}${three}${four}`;
        router.push('/estate');
                toast.success('Verify Your Account successful', {
                    position: 'top-right',
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
        console.log('Submitted OTP:', fullOTP);

        setError('');

        // TODO: Call your backend API with OTP
    };

    return (
        <Fragment>
            <Seo title={"Twostep-Cover"} />
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
                                    <p className="h4 font-semibold !mb-1">Verify Your Account</p>
                                    <p className="mb-4 text-textmuted dark:text-textmuted/50 font-normal">Enter the 4 digit code sent to the registered email Id.</p>
                                    <form onSubmit={handleSubmit} >
                                    <div className="grid grid-cols-12 sm:gap-x-6 gap-y-4">
                                        <div className="xl:col-span-12 col-span-12 mb-2">
                                            <div className="grid grid-cols-12 sm:gap-x-6 gap-x-3 gap-y-3">
                                            <div className="col-span-3">
                                                <input
                                                    ref={inputsRef.one}
                                                    type="text"
                                                    maxLength={1}
                                                    value={inputValues.one}
                                                    onChange={(e) => handleChange('one', 'two', e.target.value)}
                                                    onPaste={handlePaste}
                                                    className="form-control text-center form-control-lg "
                                                />
                                            </div>
                                            <div className="col-span-3">
                                                <input
                                                    ref={inputsRef.two}
                                                    type="text"
                                                    maxLength={1}
                                                    value={inputValues.two}
                                                    onChange={(e) => handleChange('two', 'three', e.target.value)}
                                                    className="form-control text-center form-control-lg "
                                                />
                                            </div>
                                            <div className="col-span-3">
                                                <input
                                                    ref={inputsRef.three}
                                                    type="text"
                                                    maxLength={1}
                                                    value={inputValues.three}
                                                    onChange={(e) => handleChange('three', 'four', e.target.value)}
                                                    className="form-control text-center form-control-lg "
                                                />
                                            </div>
                                            <div className="col-span-3">
                                                <input
                                                    ref={inputsRef.four}
                                                    type="text"
                                                    maxLength={1}
                                                    value={inputValues.four}
                                                    onChange={(e) => handleChange('four', null, e.target.value)}
                                                    className="form-control text-center form-control-lg "
                                                />
                                            </div>
                                            </div>
                                            <div className="form-check mt-2">
                                                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                <label className="form-check-label text-textmuted dark:text-textmuted/50 font-normal text-[0.75rem]" htmlFor="defaultCheck1">
                                                    Did not recieve a code ?<Link href="/pages/email/mail-app" className="text-primary ms-2 inline-block font-medium">Resend</Link>

                                                </label>
                                            </div>
                                        </div>
                                        <div className="xl:col-span-12 col-span-12 grid mt-2">
                                        {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
                                        <button type="submit" className="ti-btn ti-btn-primary">Verify</button>
                                        </div>
                                    </div>
                                    </form>
                                    <div className="text-center">
                                        <p className="text-[0.75rem] text-danger mt-4 mb-0"><sup><i className="ri-asterisk"></i></sup>Don't share the verification code with anyone !</p>
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