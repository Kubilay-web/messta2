import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import DatePicker from "react-datepicker";
import SpkSelect from '@/shared/@spk-reusable-components/spk-packages/spk-reactselect';
import SpkButton from '@/shared/@spk-reusable-components/uielements/spk-button';
import Link from 'next/link';
import SpkDatepickr from '@/shared/@spk-reusable-components/spk-packages/datepicker-component';

import Image from 'next/image';

const MyDatePicker = () => {
    const [selectedDate, setSelectedDate] = React.useState(null);

    const handleDateChange = (date: any) => {
        setSelectedDate(date);
    };

    return (
        <>
            <SpkDatepickr className="form-control flatpickr-input" placeholderText='Choose date' selected={selectedDate} onChange={handleDateChange} />
        </>
    );
};

const Countrydata = [
    { value: "India", label: "India" },
    { value: "Brazil", label: "Brazil" },
    { value: "China", label: "China" },
    { value: "India", label: "India" },
    { value: "Russia", label: "Russia" },
    { value: "United States", label: "United States" },
]

const Selectdata = [
    { value: "India", label: "India" },
    { value: "USA", label: "USA" },
    { value: "Australia", label: "Australia" },
]

const Maledata = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
]
const steps = [
    {
        label: 'Personal Information',
        description:
            (
                <div className="wizard-step " data-title="Personal Information"
                    data-id="2e8WqSV3slGIpTbnjcJzmDwBQaHrfh0Z">
                    <div className="grid grid-cols-12 sm:gap-x-6 justify-content-center wizard-content">
                        <div className="xl:col-span-12 col-span-12">
                            <div className="register-page">
                                <h6 className="mb-3 font-medium">Registration :</h6>
                                <div className="grid grid-cols-12 sm:gap-x-6 gap-y-4">
                                    <div className="xl:col-span-6 col-span-12">
                                        <label htmlFor="Customer" className="ti-form-label">First Name</label>
                                        <input type="text" className="form-control " id="Customer"
                                            placeholder="Enter First Name" />
                                    </div>
                                    <div className="xl:col-span-6 col-span-12">
                                        <label htmlFor="last-name" className="ti-form-label">Last Name</label>
                                        <input type="text" className="form-control " id="last-name"
                                            placeholder="Enter Last Name" />
                                    </div>
                                    <div className="xl:col-span-6 col-span-12">
                                        <label htmlFor="Email" className="ti-form-label">Email Address</label>
                                        <input type="email" className="form-control " id="Email"
                                            placeholder="Enter Email Adress" />
                                    </div>
                                    <div className="xl:col-span-6 col-span-12">
                                        <label className="ti-form-label">Phone Number</label>
                                        <div className="input-group">
                                            <span className="input-group-text"
                                                id="inputGroup-sizing-default">+99</span>
                                            <input type="text" className="form-control "
                                                placeholder="Enter Phone Number"
                                                aria-label="Sizing example input"
                                                aria-describedby="inputGroup-sizing-default" />
                                        </div>
                                    </div>
                                    <div className="xl:col-span-6 col-span-12">
                                        <label className="ti-form-label">Date of Birth</label>
                                        <div className="input-group custom-input-pickr">
                                            <div className="input-group-text text-textmuted dark:text-textmuted/50">
                                                <i className="ri-calendar-line"></i>
                                            </div>
                                            <MyDatePicker />
                                        </div>
                                    </div>
                                    <div className="xl:col-span-6 col-span-12">
                                        <label className="ti-form-label">Select Gender
                                            :</label>
                                        <SpkSelect name="colors" option={Maledata} mainClass="basic-multi-select"
                                            menuplacement='auto' classNameprefix="Select2" placeholder="Male"
                                        />
                                    </div>
                                    <div className="xl:col-span-6 col-span-12">
                                        <label className="ti-form-label">Country</label>
                                        <SpkSelect name="colors" option={Countrydata} mainClass="basic-multi-select"
                                            menuplacement='auto' classNameprefix="Select2" defaultvalue={[Countrydata[5]]}
                                        />
                                    </div>
                                    <div className="xl:col-span-6 col-span-12">
                                        <label className="ti-form-label">Select City
                                            :</label>
                                        <SpkSelect name="colors" option={Selectdata} mainClass="basic-multi-select"
                                            menuplacement='auto' classNameprefix="Select2" placeholder="India"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-7 col-span-12">
                            <div className="login-page hidden">
                                <h6 className="mb-3">Sign In :</h6>
                                <div className="grid grid-cols-12 sm:gap-x-6 justify-content-center gy-4">
                                    <div className="xl:col-span-12 col-span-12">
                                        <label htmlFor="email-adress" className="ti-form-label">Email
                                            Address</label>
                                        <input type="text" className="form-control " id="email-adress"
                                            placeholder="Enter Email Adress" />
                                    </div>
                                    <div className="xl:col-span-12 col-span-12">
                                        <label htmlFor="password" className="ti-form-label">Enter
                                            Password</label>
                                        <input type="text" className="form-control " id="password"
                                            placeholder="Enter Password" />
                                    </div>
                                    <div className="xl:col-span-12 col-span-12">
                                        <div className="grid">
                                            <Link scroll={false} href="#!"
                                                className="ti-btn ti-btn-primary px-4">Login</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
    },
    {
        label: 'Select Service',
        description:
            (
                <div className=" wizard-step active" data-title="Select Service"
                    data-id="2e8WqSV3slGIpTbnjcJzmDwBQaHrfh0Z">
                    <div className="grid grid-cols-12 sm:gap-x-6 gap-y-6 wizard-content">
                        <div className="xl:col-span-3 col-span-12">
                            <div className="col">
                                <div className="form-check !flex items-center gap-4 !p-2 border !rounded-full  border-defaultborder dark:border-defaultborder/10">
                                    <div>
                                        <span className="avatar avatar-lg avatar-rounded bg-primary/[0.15] !text-primary">
                                            <i className="bi bi-hospital text-[1.25rem]"></i>
                                        </span>
                                    </div>
                                    <div className="flex-grow">
                                        <label className="form-check-label block font-medium text-[0.9375rem] !ps-0" htmlFor="flexCheckChecked">Cardio Check</label>
                                        <span className="text-[0.75rem] text-textmuted dark:text-textmuted/50">$249</span>
                                    </div>
                                    <div>
                                        <input className="form-check-input form-checked-primary !rounded-full" type="checkbox" id="flexCheckChecked" defaultChecked />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-3 col-span-12">
                            <div className="col">
                                <div className="form-check !flex items-center gap-4 !p-2 border !rounded-full  border-defaultborder dark:border-defaultborder/10">
                                    <div>
                                        <span className="avatar avatar-lg avatar-rounded bg-secondary/[0.15] !text-secondary">
                                            <i className="bi bi-hospital text-[1.25rem]"></i>
                                        </span>
                                    </div>
                                    <div className="flex-grow">
                                        <label className="form-check-label block font-medium text-[0.9375rem] !ps-0" htmlFor="flexCheckChecked1">Ortho Consult</label>
                                        <span className="text-[0.75rem] text-textmuted dark:text-textmuted/50">$120</span>
                                    </div>
                                    <div>
                                        <input className="form-check-input form-checked-secondary !rounded-full" type="checkbox" id="flexCheckChecked1" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-3 col-span-12">
                            <div className="col">
                                <div className="form-check !flex items-center gap-4 !p-2 border !rounded-full  border-defaultborder dark:border-defaultborder/10">
                                    <div>
                                        <span className="avatar avatar-lg avatar-rounded bg-success/[0.15] !text-success">
                                            <i className="bi bi-hospital text-[1.25rem]"></i>
                                        </span>
                                    </div>
                                    <div className="flex-grow">
                                        <label className="form-check-label block font-medium text-[0.9375rem] !ps-0" htmlFor="flexCheckChecked2">Gyn Exam</label>
                                        <span className="text-[0.75rem] text-textmuted dark:text-textmuted/50">$100</span>
                                    </div>
                                    <div>
                                        <input className="form-check-input form-checked-success checked:!bg-success chekched:!border-success !rounded-full" type="checkbox" id="flexCheckChecked2" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-3 col-span-12">
                            <div className="col">
                                <div className="form-check !flex items-center gap-4 !p-2 border !rounded-full  border-defaultborder dark:border-defaultborder/10">
                                    <div>
                                        <span className="avatar avatar-lg avatar-rounded bg-orangemain/[0.15] !text-orangemain">
                                            <i className="bi bi-hospital text-[1.25rem]"></i>
                                        </span>
                                    </div>
                                    <div className="flex-grow">
                                        <label className="form-check-label block font-medium text-[0.9375rem] !ps-0" htmlFor="flexCheckChecked3">Pediatric Vaccines</label>
                                        <span className="text-[0.75rem] text-textmuted dark:text-textmuted/50">$50</span>
                                    </div>
                                    <div>
                                        <input className="form-check-input form-checked-orange checked:!bg-orange chekched:!border-orange !rounded-full" type="checkbox" id="flexCheckChecked3" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-3 col-span-12">
                            <div className="col">
                                <div className="form-check !flex items-center gap-4 !p-2 border !rounded-full  border-defaultborder dark:border-defaultborder/10">
                                    <div>
                                        <span className="avatar avatar-lg avatar-rounded bg-info/[0.15] !text-info">
                                            <i className="bi bi-hospital text-[1.25rem]"></i>
                                        </span>
                                    </div>
                                    <div className="flex-grow">
                                        <label className="form-check-label block font-medium text-[0.9375rem] !ps-0" htmlFor="flexCheckChecked4">Dental Checkup</label>
                                        <span className="text-[0.75rem] text-textmuted dark:text-textmuted/50">$80</span>
                                    </div>
                                    <div>
                                        <input className="form-check-input form-checked-info !rounded-full" type="checkbox" id="flexCheckChecked4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-3 col-span-12">
                            <div className="col">
                                <div className="form-check !flex items-center gap-4 !p-2 border !rounded-full  border-defaultborder dark:border-defaultborder/10">
                                    <div>
                                        <span className="avatar avatar-lg avatar-rounded bg-warning/[0.15] !text-warning">
                                            <i className="bi bi-hospital text-[1.25rem]"></i>
                                        </span>
                                    </div>
                                    <div className="flex-grow">
                                        <label className="form-check-label block font-medium text-[0.9375rem] !ps-0" htmlFor="flexCheckChecked5">X-ray Imaging</label>
                                        <span className="text-[0.75rem] text-textmuted dark:text-textmuted/50">$80</span>
                                    </div>
                                    <div>
                                        <input className="form-check-input form-checked-warning !rounded-full" type="checkbox" id="flexCheckChecked5" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-3 col-span-12">
                            <div className="col">
                                <div className="form-check !flex items-center gap-4 !p-2 border !rounded-full  border-defaultborder dark:border-defaultborder/10">
                                    <div>
                                        <span className="avatar avatar-lg avatar-rounded bg-danger/[0.15] !text-danger">
                                            <i className="bi bi-hospital text-[1.25rem]"></i>
                                        </span>
                                    </div>
                                    <div className="flex-grow">
                                        <label className="form-check-label block font-medium text-[0.9375rem] !ps-0" htmlFor="flexCheckChecked6">Blood Tests</label>
                                        <span className="text-[0.75rem] text-textmuted dark:text-textmuted/50">Varies</span>
                                    </div>
                                    <div>
                                        <input className="form-check-input form-checked-danger !rounded-full" type="checkbox" id="flexCheckChecked6" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-3 col-span-12">
                            <div className="col">
                                <div className="form-check !flex items-center gap-4 !p-2 border !rounded-full  border-defaultborder dark:border-defaultborder/10">
                                    <div>
                                        <span className="avatar avatar-lg avatar-rounded bg-dark/[0.15] !text-dark">
                                            <i className="bi bi-hospital text-[1.25rem]"></i>
                                        </span>
                                    </div>
                                    <div className="flex-grow">
                                        <label className="form-check-label block font-medium text-[0.9375rem] !ps-0" htmlFor="flexCheckChecked7">Eye Exam</label>
                                        <span className="text-[0.75rem] text-textmuted dark:text-textmuted/50">$90</span>
                                    </div>
                                    <div>
                                        <input className="form-check-input form-checked-dark !rounded-full" type="checkbox" id="flexCheckChecked7" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
    },
    {
        label: 'Appointment Details',
        description:
            (
                <div className="wizard-step" data-title="Appointment Details"
                    data-id="H53WJiv9blN17MYTztq4g8U6eSVkaZDx">
                    <div className="summary-view">
                        <div className="md:max-w-[58.33333333%] mx-auto  wizard-content">
                            <div className="border border-defaultborder dark:border-defaultborder/10 rounded-1 mb-3">
                                <div className="box-body !p-0">
                                    <div className="table-responsive">
                                        <table className="ti-custom-table">
                                            <thead className="border-b border-defaultborder dark:border-defaultborder/10">
                                                <tr>
                                                    <th scope="col">Appointment Details</th>
                                                    <th scope="col"></th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="w-25">
                                                        <span
                                                            className="block font-semibold">Category</span>
                                                    </td>
                                                    <td className="w-10">:</td>
                                                    <td className="text-start  text-textmuted dark:text-textmuted/50">
                                                        Neuro Clinic
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="w-25">
                                                        <span
                                                            className="block font-semibold">Service</span>
                                                    </td>
                                                    <td className="w-10">:</td>
                                                    <td className="text-start text-textmuted dark:text-textmuted/50">
                                                        Heart Care
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="w-25">
                                                        <span className="block font-semibold">Service
                                                            providers</span>
                                                    </td>
                                                    <td className="w-10">:</td>
                                                    <td className="text-start text-textmuted dark:text-textmuted/50">
                                                        Jiohn Alzian
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="w-25">
                                                        <span
                                                            className="block font-semibold">Branch</span>
                                                    </td>
                                                    <td className="w-10">:</td>
                                                    <td className="text-start text-textmuted dark:text-textmuted/50">
                                                        India
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="w-25">
                                                        <span
                                                            className="block font-semibold">Appointment
                                                            Date</span>
                                                    </td>
                                                    <td className="w-10">:</td>
                                                    <td className="text-start text-textmuted dark:text-textmuted/50">
                                                        12-Sep-2024
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="w-25">
                                                        <span
                                                            className="block font-semibold">Appointment
                                                            Time</span>
                                                    </td>
                                                    <td className="w-10">:</td>
                                                    <td className="text-start text-textmuted dark:text-textmuted/50">
                                                        10:00 AM
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="border  border-defaultborder dark:border-defaultborder/10 rounded-1 mb-3 ">
                                <div className="box-body !p-0">
                                    <div className="table-responsive">
                                        <table className="ti-custom-table">
                                            <thead className="border-b border-defaultborder dark:border-defaultborder/10">
                                                <tr>
                                                    <th scope="col">Persional Details</th>
                                                    <th scope="col"></th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="w-25">
                                                        <span className="block font-semibold">First
                                                            Name</span>
                                                    </td>
                                                    <td className="w-10">:</td>
                                                    <td className="text-start  text-textmuted dark:text-textmuted/50">
                                                        Jogh barle
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="w-25">
                                                        <span className="block font-semibold">Last Name
                                                        </span>
                                                    </td>
                                                    <td className="w-10">:</td>
                                                    <td className="text-start text-textmuted dark:text-textmuted/50">
                                                        Jogh barle
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="w-25">
                                                        <span className="block font-semibold">Email
                                                            Address</span>
                                                    </td>
                                                    <td className="w-10">:</td>
                                                    <td className="text-start text-textmuted dark:text-textmuted/50">
                                                        Jogh12@gamil.com
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="w-25">
                                                        <span className="block font-semibold">Phone
                                                            Number</span>
                                                    </td>
                                                    <td className="w-10">:</td>
                                                    <td className="text-start text-textmuted dark:text-textmuted/50">
                                                        98765433221
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="w-25">
                                                        <span className="block font-semibold">Country
                                                        </span>
                                                    </td>
                                                    <td className="w-10">:</td>
                                                    <td className="text-start text-textmuted dark:text-textmuted/50">
                                                        India
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="border  border-defaultborder dark:border-defaultborder/10 rounded-1 mb-3 ">
                                <div className="box-body !p-0">
                                    <div className="table-responsive">
                                        <table className="ti-custom-table">
                                            <thead className="border-b border-defaultborder dark:border-defaultborder/10">
                                                <tr>
                                                    <th scope="col">Payment Details</th>
                                                    <th scope="col"></th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="w-25">
                                                        <span className="block font-semibold">Mode of
                                                            Payment</span>
                                                    </td>
                                                    <td className="w-10">:</td>
                                                    <td className="text-start  text-textmuted dark:text-textmuted/50">
                                                        Paypal
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 rounded-2 bg-light">
                                <label className="mb-1 font-semibold">Source Information:</label>
                                <div className="flex items-center flex-wrap gap-2">
                                    <div className="form-check-sm inline-flex items-center gap-2">
                                        <input className="form-check-input !mb-0" type="radio" name="Radio"
                                            id="Radio-sm" />
                                        <label className="form-check-label !text-[0.8rem]" htmlFor="Radio-sm"> Google
                                        </label>
                                    </div>
                                    <div className="form-check-sm inline-flex items-center gap-2">
                                        <input className="form-check-input !mb-0" type="radio" name="Radio"
                                            id="Radio-md" />
                                        <label className="form-check-label !text-[0.8rem] ms-1" htmlFor="Radio-md"> Advertisement </label>
                                    </div>
                                    <div className="form-check-sm inline-flex items-center gap-2">
                                        <input className="form-check-input !mb-0" type="radio" name="Radio"
                                            id="Radio-s" />
                                        <label className="form-check-label !text-[0.8rem]" htmlFor="Radio-s"> Other</label>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )
    },
    {
        label: 'Payment',
        description:
            (
                <div className="wizard-step" data-title="Payment"
                    data-id="dOM0iRAyJXsLTr9b3KZfQ2jNv4pgn6Gu" data-limit="3">
                    <div className="grid grid-cols-12 sm:gap-x-6  wizard-content">
                        <div className="xl:col-span-12 col-span-12">
                            <div>
                                <div className="text-[0.9375rem] font-medium sm:d-flex block items-center justify-between mb-3">
                                    <div>Payment Details :</div>
                                </div>
                                <div className="grid grid-cols-12 sm:gap-x-6">
                                    <div className="xl:col-span-12 col-span-12">
                                        <div className="mb-3">
                                            <label className="ti-form-label">Delivery Address</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control !border-s border-defaultborder dark:border-defaultborder/10" placeholder="Address" aria-label="address" aria-describedby="payment-address" defaultValue="1234 Elm Street,Anytown, USA,12345" />
                                                <SpkButton buttontype="button" customClass="ti-btn !bg-info/[0.15] !text-info !m-0 input-group-text" Id="payment-address">Change</SpkButton>
                                            </div>
                                        </div>
                                        <div className="box border border-defaultborder dark:border-defaultborder/10 shadow-none mb-3">
                                            <div className="box-header">
                                                <div className="box-title">
                                                    Payment Methods
                                                </div>
                                            </div>
                                            <div className="box-body">
                                                <div className="mb-4 sm:flex block " role="group" aria-label="Basic radio toggle button group">
                                                    <input type="radio" className="btn-check opacity-0 absolute" name="btnradio" id="btnradio1" />
                                                    <label className="w-full ti-btn ti-btn-outline-light !text-defaulttextcolor !m-0 sm:!border-e-0 dark:!text-defaulttextcolor/70 dark:!border-defaultborder/10 hover:!bg-light !rounded-e-none" htmlFor="btnradio1">C.O.D(Cash on delivery)</label>
                                                    <input type="radio" className="btn-check  opacity-0 absolute" name="btnradio" id="btnradio2" />
                                                    <label className="w-full ti-btn ti-btn-outline-light !m-0 custom-wizard !text-defaulttextcolor dark:!text-defaulttextcolor/70 sm:!border-e-0 dark:!border-defaultborder/10 hover:!bg-light sm:mt-0 mt-1 !rounded-none" htmlFor="btnradio2">UPI</label>
                                                    <input type="radio" className="btn-check  opacity-0 absolute" name="btnradio" id="btnradio3" defaultChecked />
                                                    <label className="w-full ti-btn ti-btn-light !m-0 !text-defaulttextcolor dark:!text-defaulttextcolor/70 dark:!border-defaultborder/10 hover:!bg-light !rounded-s-none sm:mt-0 mt-1" htmlFor="btnradio3">Credit/Debit Card</label>
                                                </div>
                                                <div className="grid grid-cols-12 sm:gap-x-6 gap-y-4">
                                                    <div className="xl:col-span-12 col-span-12">
                                                        <label htmlFor="payment-card-number" className="ti-form-label">Card Number</label>
                                                        <input type="text" className="form-control" id="payment-card-number" placeholder="Card Number" defaultValue="1245 - 5447 - 8934 - XXXX" />
                                                    </div>
                                                    <div className="xl:col-span-12 col-span-12">
                                                        <label htmlFor="payment-card-name" className="ti-form-label">Name On Card</label>
                                                        <input type="text" className="form-control" id="payment-card-name" placeholder="Name On Card" defaultValue="Jack Miller" />
                                                    </div>
                                                    <div className="xl:col-span-4 col-span-12">
                                                        <label htmlFor="payment-cardexpiry-date" className="ti-form-label">Expiration Date</label>
                                                        <input type="text" className="form-control" id="payment-cardexpiry-date" placeholder="MM/YY" defaultValue="08/2024" />
                                                    </div>
                                                    <div className="xl:col-span-4 col-span-12">
                                                        <label htmlFor="payment-cvv" className="ti-form-label">CVV</label>
                                                        <input type="text" className="form-control" id="payment-cvv" placeholder="XXX" defaultValue="341" />
                                                    </div>
                                                    <div className="xl:col-span-4 col-span-12">
                                                        <label htmlFor="payment-security" className="ti-form-label">O.T.P</label>
                                                        <input type="text" className="form-control" id="payment-security" placeholder="XXXXXX" defaultValue="183467" />
                                                        <label htmlFor="payment-security" className="ti-form-label mt-1 text-success !text-[0.6875rem]"><sup><i className="ri-star-s-fill"></i></sup>Do not share O.T.P with anyone</label>
                                                    </div>
                                                    <div className="xl:col-span-12 col-span-12">
                                                        <div className="form-check">
                                                            <input className="form-check-input form-checked-success checked:!bg-success chekcde:!border-success" type="checkbox" id="payment-card-save" defaultChecked />
                                                            <label className="form-check-label" htmlFor="payment-card-save">
                                                                Save this card
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="box-footer">
                                                <div className="grid grid-cols-12 gap-y-4 sm:gap-x-4">
                                                    <p className="xl:col-span-12 col-span-12 text-[0.9375rem] font-semibold mb-1">
                                                        Saved Cards :</p>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <div className="form-check payment-card-container mb-0 leading-none">
                                                            <div className="form-check-label">
                                                                <div className="sm:flex block items-center justify-between">
                                                                    <div className="me-2 leading-none">
                                                                        <span className="avatar avatar-md">
                                                                            <Image fill src="../../../assets/images/ecommerce/png/26.png" alt="" /> </span>
                                                                    </div>
                                                                    <div className="saved-card-details">
                                                                        <p className="mb-0 font-semibold">
                                                                            XXXX - XXXX - XXXX - 7646
                                                                        </p>
                                                                    </div>
                                                                    <div> <input id="payment-card1" name="payment-cards1" type="radio" className="form-check-input !top-[1.5rem]" defaultChecked /> </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <div className="form-check payment-card-container mb-0 leading-none">
                                                            <div className="form-check-label">
                                                                <div className="sm:flex block items-center justify-between">
                                                                    <div className="me-2 leading-none">
                                                                        <span className="avatar avatar-md">
                                                                            <Image fill src="../../../assets/images/ecommerce/png/27.png" alt="" /> </span>
                                                                    </div>
                                                                    <div className="saved-card-details">
                                                                        <p className="mb-0 font-semibold">
                                                                            XXXX - XXXX - XXXX - 9556
                                                                        </p>
                                                                    </div>
                                                                    <div>
                                                                        <input id="payment-card" name="payment-cards1" type="radio" className="form-check-input !top-[1.5rem]" /> </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
    },
    {
        label: 'Confirmation',
        description:
            (
                <div className="wizard-step" data-title="Confirmation"
                    data-id="dOM0iRAyJXsLTr9b3KZfQ2jNv4pgn6Gu" data-limit="3">
                    <div className="grid grid-cols-12 sm:gap-x-6  wizard-content">
                        <div className="xl:col-span-12 col-span-12">
                            <div className="checkout-payment-success">
                                <div className="mb-4">
                                    <h5 className="text-success font-medium">Appointment Booked...</h5>
                                </div>
                                <div className="mb-4">
                                    <Image fill src="../../../assets/images/ecommerce/png/24.png" alt="" className="img-fluid !inline-flex" />
                                </div>
                                <div className="mb-4">
                                    <p className="mb-1 fs-14">You will get the appointment details with appointment id <b>SPK#1FR</b> to <Link scroll={false} className="!text-success" href="#!"><u>Jogh12@gamil.com</u></Link></p>
                                    <p className="text-textmuted dark:text-textmuted/50">Thank you for booking an appointment .</p>
                                </div>
                                <Link scroll={false} href="#!" className="ti-btn ti-btn-success">Book Another Appointment</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )
    },

];
export default function HorizontalNonLinearStepper() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper nonLinear activeStep={activeStep} className='wizard-nav'>
                {steps.map((step, index) => (
                    <Step key={step.label} completed={completed[index]}>
                        <StepButton color="inherit" onClick={handleStep(index)}>
                            {step.label}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
            <div>
                {allStepsCompleted() ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                            {steps[activeStep].description}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                className='wizard-btn btn prev'
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button className='wizard-btn btn next' disabled={activeStep === 4} onClick={handleNext} sx={{ mr: 1 }}>
                                Next
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </div>
        </Box>
    );
}