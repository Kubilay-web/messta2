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
interface BasicProps { }

const Basic: FC<BasicProps> = () => {
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
            <Seo title={"Twostep-Basic"} />

            <div className="container">
                <div className="grid grid-cols-12 authentication authentication-basic items-center h-full">
                    <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-3 md:col-span-3 sm:col-span-2 col-span-12"></div>
                    <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-8 col-span-12 px-[0.5rem]">
                        <div className="my-[3rem] flex justify-center">
                            <Link className="relative" href="/dashboards/sales">
                                <Image fill src="../../../assets/images/brand-logos/desktop-dark.png" alt="logo" className="h-[1.75rem] leading-[1.75rem]" />
                            </Link>
                        </div>
                        <div className="box !my-[3rem]">
                            <div className="box-body !p-[3rem]">
                                <p className="h4 mb-2 font-semibold">Verify Your Account</p>
                                <p className="mb-4 text-textmuted dark:text-textmuted/50 font-normal">Enter the 4 digit code sent to the registered email Id.</p>
                                    <form onSubmit={handleSubmit} >
                                <div className="grid grid-cols-12 gap-y-4">
                                    <div className="xl:col-span-12 col-span-12 mb-2">
                                        <div className="grid grid-cols-12 gap-x-2">
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
                                            <label className="form-check-label text-[14px]" htmlFor="defaultCheck1">
                                                Didn't recieve a code ?<Link href={"/pages/email/mail-app"} className="text-primary ms-2 inline-block">Resend</Link>
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
                    <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-3 md:col-span-3 sm:col-span-2 col-span-12"></div>
                    <ToastContainer />
                </div>
            </div>
        </Fragment>
    );
};

export default Basic;