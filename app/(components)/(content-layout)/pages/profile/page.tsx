"use client"
import SpkprojectTimeline from "@/shared/@spk-reusable-components/apps/spk-projecttimeline";
import { ProfileGallerylist } from "@/shared/data/pages/profile-gallerydata";
import { ContactInfo, FriendTabdata, PersonalInfo, Skills, SocialLinks, timelineData, userData } from "@/shared/data/pages/profiledata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import CreatableSelect from "react-select/creatable";
const Profile = () => {
    const components = {
        DropdownIndicator: null,
    };
    const createOption = (label: string) => ({
        label,
        value: label,
    });

    const [inputValue, setInputValue] = useState<any>("");
    const [value, setValue] = useState([
        createOption("Project Management"),
        createOption("Data Analysis"),
        createOption("Marketing Strategy"),
        createOption("Graphic Design"),
        createOption("Content Creation"),
        createOption("Market Research"),
        createOption("Client Relations"),
        createOption("Event Planning"),
        createOption("Budgeting and Finance"),
        createOption("Negotiation Skills"),
        createOption("Team Collaboration"),
        createOption("Adaptability")
    ]);
    const handleKeyDown = (event: any) => {
        if (!inputValue) return;
        switch (event.key) {
            case "Enter":
            case "Tab":
                setValue((prev) => [...prev, createOption(inputValue)]);
                setInputValue("");
                event.preventDefault();
        }
    };
    const [_isSearchable] = useState(true);
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Profile" />
            <Pageheader Heading="Profile" breadcrumbs={['Pages']} currentpage="Profile" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start:: row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box profile-card">
                        <Image fill src="../../assets/images/media/media-3.jpg" className="card-img-top" alt="..." />
                        <div className="box-body !p-6 !pb-0 relative">
                            <span className="avatar avatar-xxl avatar-rounded bg-info online">
                                <Image fill src="../../assets/images/faces/team/7.png" alt="" />
                            </span>
                            <div className="mt-[2.2rem] mb-4 flex items-center flex-wrap gap-3 justify-between">
                                <div>
                                    <h5 className="font-semibold mb-1">Leo Phillips</h5>
                                    <span className="block font-medium text-textmuted dark:text-textmuted/50 mb-1">Chief Executive Officer
                                        (C.E.O)</span>
                                    <p className="text-[0.75rem] mb-0 font-medium text-textmuted dark:text-textmuted/50"> <span className="me-3"><i
                                        className="ri-building-line me-1 align-middle"></i>Georgia</span>
                                        <span className="inline-flex"><i className="ri-map-pin-line me-1 align-middle"></i>Washington D.C</span>
                                    </p>
                                </div>
                                <div className="flex mb-0 flex-wrap gap-6">
                                    <div className="p-4 bg-light rounded-sm flex items-center border border-defaultborder dark:border-defaultborder/10 gap-3">
                                        <div className="main-card-icon primary">
                                            <div
                                                className="avatar avatar-lg bg-primary/[0.15] border border-primary/10">
                                                <div className="avatar avatar-sm svg-white">
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                        className="!text-white !fill-white" viewBox="0 0 256 256">
                                                        <rect width="256" height="256" fill="none" />
                                                        <path
                                                            d="M128,144a191.14,191.14,0,0,1-96-25.68h0V200a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V118.31A191.08,191.08,0,0,1,128,144Z"
                                                            opacity="0.2" />
                                                        <line x1="112" y1="112" x2="144" y2="112" fill="none"
                                                            stroke="currentColor" strokeLinecap="round"
                                                            strokeLinejoin="round" strokeWidth="16" />
                                                        <rect x="32" y="64" width="192" height="144" rx="8"
                                                            fill="none" stroke="currentColor" strokeLinecap="round"
                                                            strokeLinejoin="round" strokeWidth="16" />
                                                        <path
                                                            d="M168,64V48a16,16,0,0,0-16-16H104A16,16,0,0,0,88,48V64"
                                                            fill="none" stroke="currentColor" strokeLinecap="round"
                                                            strokeLinejoin="round" strokeWidth="16" />
                                                        <path
                                                            d="M224,118.31A191.09,191.09,0,0,1,128,144a191.14,191.14,0,0,1-96-25.68"
                                                            fill="none" stroke="currentColor" strokeLinecap="round"
                                                            strokeLinejoin="round" strokeWidth="16" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-[1.25rem] mb-0">113</p>
                                            <p className="mb-0 text-[0.75rem] text-textmuted dark:text-textmuted/50 font-medium">Projects</p>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-light rounded-sm flex items-center border border-defaultborder dark:border-defaultborder/10 gap-3">
                                        <div className="main-card-icon secondary">
                                            <div
                                                className="avatar avatar-lg bg-secondary/[0.15] border border-secondary/10">
                                                <div className="avatar avatar-sm svg-white">
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                        className="!text-white !fill-white" viewBox="0 0 256 256">
                                                        <rect width="256" height="256" fill="none" />
                                                        <circle cx="84" cy="108" r="52" opacity="0.2" />
                                                        <path d="M10.23,200a88,88,0,0,1,147.54,0" fill="none"
                                                            stroke="currentColor" strokeLinecap="round"
                                                            strokeLinejoin="round" strokeWidth="16" />
                                                        <path d="M172,160a87.93,87.93,0,0,1,73.77,40" fill="none"
                                                            stroke="currentColor" strokeLinecap="round"
                                                            strokeLinejoin="round" strokeWidth="16" />
                                                        <circle cx="84" cy="108" r="52" fill="none"
                                                            stroke="currentColor" strokeLinecap="round"
                                                            strokeLinejoin="round" strokeWidth="16" />
                                                        <path d="M152.69,59.7A52,52,0,1,1,172,160" fill="none"
                                                            stroke="currentColor" strokeLinecap="round"
                                                            strokeLinejoin="round" strokeWidth="16" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-[1.25rem] mb-0">12.2k</p>
                                            <p className="mb-0 text-[0.75rem] text-textmuted dark:text-textmuted/50 font-medium">Followers</p>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-light rounded-sm flex items-center border border-defaultborder dark:border-defaultborder/10 gap-2">
                                        <div className="main-card-icon success">
                                            <div
                                                className="avatar avatar-lg bg-success/[0.15] border border-success/10">
                                                <div className="avatar avatar-sm svg-white">
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                        className="!text-white !fill-white" viewBox="0 0 256 256">
                                                        <rect width="256" height="256" fill="none" />
                                                        <path
                                                            d="M208,40H48a8,8,0,0,0-8,8V208a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V48A8,8,0,0,0,208,40ZM57.78,216A72,72,0,0,1,128,160a40,40,0,1,1,40-40,40,40,0,0,1-40,40,72,72,0,0,1,70.22,56Z"
                                                            opacity="0.2" />
                                                        <circle cx="128" cy="120" r="40" fill="none"
                                                            stroke="currentColor" strokeLinecap="round"
                                                            strokeLinejoin="round" strokeWidth="16" />
                                                        <rect x="40" y="40" width="176" height="176" rx="8"
                                                            fill="none" stroke="currentColor" strokeLinecap="round"
                                                            strokeLinejoin="round" strokeWidth="16" />
                                                        <path d="M57.78,216a72,72,0,0,1,140.44,0" fill="none"
                                                            stroke="currentColor" strokeLinecap="round"
                                                            strokeLinejoin="round" strokeWidth="16" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-[1.25rem] mb-0">128</p>
                                            <p className="mb-0 text-[0.75rem] text-textmuted dark:text-textmuted/50 font-medium">Following</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <nav className="-mb-0.5 flex gap-x-6 flex-wrap" role="tablist">
                                <Link scroll={false} className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-2 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor dark:text-defaulttextcolor/80  hover:text-primary active"
                                    href="#!" id="profile-1" data-hs-tab="#profile1"
                                    aria-controls="profile1"> About
                                </Link>
                                <Link scroll={false} className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-2 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor dark:text-defaulttextcolor/80  hover:text-primary"
                                    href="#!" id="profile-2" data-hs-tab="#profile2"
                                    aria-controls="profile2"> Edit Profile
                                </Link>
                                <Link scroll={false} className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-2 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor dark:text-defaulttextcolor/80  hover:text-primary"
                                    href="#!" id="profile-3" data-hs-tab="#profile3"
                                    aria-controls="profile3"> Timeline
                                </Link>
                                <Link
                                    className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-2 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor dark:text-defaulttextcolor/80  hover:text-primary"
                                    href="#!" id="profile-4" data-hs-tab="#profile4"
                                    aria-controls="profile4"> Gallery
                                </Link>
                                <Link scroll={false} className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-2 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor dark:text-defaulttextcolor/80  hover:text-primary"
                                    href="#!" id="profile-5" data-hs-tab="#profile5"
                                    aria-controls="profile5"> Friends
                                </Link>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-1 --> */}

            {/* <!-- Start:: row-2 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-9 col-span-12">
                    <div className="tab-content" id="profile-tabs">
                        <div className="tab-pane show active p-0 border-0" id="profile1" aria-labelledby="profile-1" role="tabpanel"
                            tabIndex={0}>
                            <div className="box overflow-hidden">
                                <div className="box-body !p-0">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item p-6 border-b border-defaultborder dark:border-defaultborder/10">
                                            <span className="font-medium text-[0.9375rem] block mb-4"><span className="me-1">&#10024;</span>ABOUT ME :</span>
                                            <p className="text-textmuted dark:text-textmuted/50 mb-2">
                                                Hey there! I'm [Your Name], a passionate [Your Profession/Interest]
                                                based in [Your Location]. With a love for [Your Hobbies/Interests],
                                                I find joy in exploring the beauty of [Your Industry/Field]. Whether
                                                it's [Specific Skills or Expertise], I'm always eager to learn and
                                                grow.
                                            </p>
                                            <p className="text-textmuted dark:text-textmuted/50 mb-0">
                                                I specialize in [Your Specialization/Area of Expertise], bringing
                                                creativity and innovation to every project. From [Key Achievements]
                                                to [Notable Experiences], my journey has been a thrilling ride, and
                                                I'm excited to share it with you.
                                            </p>
                                        </li>
                                        <li className="list-group-item p-6 border-b border-defaultborder dark:border-defaultborder/10">
                                            <span className="font-medium text-[0.9375rem] block mb-4">SKILLS :</span>
                                            <div className="w-[75%]">
                                                {Skills.map((idx, index) => (
                                                    <Link scroll={false} href="#!" key={index}>
                                                        <span className="badge bg-light text-textmuted dark:text-textmuted/50 m-1 border  border-defaultborder dark:border-defaultborder/10">
                                                            {idx}
                                                        </span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </li>
                                        <li className="list-group-item p-6 border-b border-defaultborder dark:border-defaultborder/10">
                                            <span className="font-medium text-[0.9375rem] block mb-4">CONTACT INFORMATION :</span>
                                            <div className="text-textmuted dark:text-textmuted/50">
                                                {ContactInfo.map((idx) => (
                                                    <p className="mb-2" key={idx.id}>
                                                        <span className={`avatar avatar-sm avatar-rounded text-${idx.color}`}>
                                                            <i className={`ri-${idx.iconClass} align-middle text-[0.9375rem]`}></i>
                                                        </span>
                                                        <span className="font-medium text-default">{idx.label} : </span>
                                                        {idx.value}
                                                    </p>

                                                ))}
                                            </div>
                                        </li>
                                        <li className="list-group-item p-6 border-b border-defaultborder dark:border-defaultborder/10">
                                            <span className="font-medium text-[0.9375rem] block mb-4">SOCIAL MEDIA :</span>
                                            <div className="flex items-center gap-6 flex-wrap">
                                                {SocialLinks.map((idx) => (
                                                    <div className="flex items-center gap-4" key={idx.id}>
                                                        <div>
                                                            <span className={`avatar avatar-md bg-${idx.bgClass}/[0.15] text-${idx.bgClass}`}>
                                                                <i className={`ri-${idx.iconClass} fs-4`}></i>
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <span className="block font-medium">{idx.label}</span>
                                                            <span className="text-textmuted dark:text-textmuted/50 font-medium">{idx.link}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane p-0 border-0 hidden" id="profile2" aria-labelledby="profile-2" role="tabpanel" tabIndex={0}>
                            <div className="box">
                                <div className="box-body !p-0">
                                    <ul className="list-group list-group-flush">

                                        <li className="list-group-item p-6 border-b border-defaultborder dark:border-defaultborder/10">
                                            <span className="font-medium text-[0.9375rem] block mb-4">PERSONAL INFO :</span>
                                            <div className="grid grid-cols-12 gap-y-6 sm:gap-x-6 items-center">
                                                <div className="xl:col-span-3 col-span-12">
                                                    <div className="leading-none">
                                                        <span className="font-medium">User Name :</span>
                                                    </div>
                                                </div>
                                                <div className="xl:col-span-9 col-span-12">
                                                    <input type="text" className="form-control"
                                                        placeholder="Placeholder" defaultValue="Leo Phillips" />
                                                </div>
                                                <div className="xl:col-span-3 col-span-12">
                                                    <div className="leading-none">
                                                        <span className="font-medium">First Name :</span>
                                                    </div>
                                                </div>
                                                <div className="xl:col-span-9 col-span-12">
                                                    <input type="text" className="form-control"
                                                        placeholder="Placeholder" defaultValue="Leo" />
                                                </div>
                                                <div className="xl:col-span-3 col-span-12">
                                                    <div className="leading-none">
                                                        <span className="font-medium">Last Name :</span>
                                                    </div>
                                                </div>
                                                <div className="xl:col-span-9 col-span-12">
                                                    <input type="text" className="form-control"
                                                        placeholder="Placeholder" defaultValue="Phillips" />
                                                </div>
                                                <div className="xl:col-span-3 col-span-12">
                                                    <div className="leading-none">
                                                        <span className="font-medium">Designation :</span>
                                                    </div>
                                                </div>
                                                <div className="xl:col-span-9 col-span-12">
                                                    <input type="text" className="form-control"
                                                        placeholder="Placeholder"
                                                        defaultValue="Chief Executive Officer (C.E.O)" />
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item p-6 border-b border-defaultborder dark:border-defaultborder/10">
                                            <span className="font-medium text-[0.9375rem] block mb-4">CONTACT INFO :</span>
                                            <div className="grid grid-cols-12 gap-y-6 sm:gap-x-6 items-center">
                                                <div className="xl:col-span-3 col-span-12">
                                                    <div className="leading-none">
                                                        <span className="font-medium">Email :</span>
                                                    </div>
                                                </div>
                                                <div className="xl:col-span-9 col-span-12">
                                                    <input type="email" className="form-control"
                                                        placeholder="Placeholder" defaultValue="your.email@example.com" />
                                                </div>
                                                <div className="xl:col-span-3 col-span-12">
                                                    <div className="leading-none">
                                                        <span className="font-medium">Phone :</span>
                                                    </div>
                                                </div>
                                                <div className="xl:col-span-9 col-span-12">
                                                    <input type="text" className="form-control"
                                                        placeholder="Placeholder" defaultValue="+1 (555) 123-4567" />
                                                </div>
                                                <div className="xl:col-span-3 col-span-12">
                                                    <div className="leading-none">
                                                        <span className="font-medium">Website :</span>
                                                    </div>
                                                </div>
                                                <div className="xl:col-span-9 col-span-12">
                                                    <input type="text" className="form-control"
                                                        placeholder="Placeholder" defaultValue="www.yourwebsite.com" />
                                                </div>
                                                <div className="xl:col-span-3 col-span-12">
                                                    <div className="leading-none">
                                                        <span className="font-medium">Location :</span>
                                                    </div>
                                                </div>
                                                <div className="xl:col-span-9 col-span-12">
                                                    <input type="text" className="form-control"
                                                        placeholder="Placeholder" defaultValue="City, Country" />
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item p-6 border-b border-defaultborder dark:border-defaultborder/10">
                                            <span className="font-medium text-[0.9375rem] block mb-4">SOCIAL INFO :</span>
                                            <div className="grid grid-cols-12 gap-y-6 sm:gap-x-6 items-center">
                                                <div className="xl:col-span-3 col-span-12">
                                                    <div className="leading-none">
                                                        <span className="font-medium">Github :</span>
                                                    </div>
                                                </div>
                                                <div className="xl:col-span-9 col-span-12">
                                                    <input type="text" className="form-control"
                                                        placeholder="Placeholder" defaultValue="github.com/spruko" />
                                                </div>
                                                <div className="xl:col-span-3 col-span-12">
                                                    <div className="leading-none">
                                                        <span className="font-medium">Twitter :</span>
                                                    </div>
                                                </div>
                                                <div className="xl:col-span-9 col-span-12">
                                                    <input type="text" className="form-control"
                                                        placeholder="Placeholder" defaultValue="twitter.com/spruko.me" />
                                                </div>
                                                <div className="xl:col-span-3 col-span-12">
                                                    <div className="leading-none">
                                                        <span className="font-medium">Linkedin :</span>
                                                    </div>
                                                </div>
                                                <div className="xl:col-span-9 col-span-12">
                                                    <input type="text" className="form-control"
                                                        placeholder="Placeholder" defaultValue="linkedin.com/in/spruko" />
                                                </div>
                                                <div className="xl:col-span-3 col-span-12">
                                                    <div className="leading-none">
                                                        <span className="font-medium">Portfolio :</span>
                                                    </div>
                                                </div>
                                                <div className="xl:col-span-9 col-span-12">
                                                    <input type="text" className="form-control"
                                                        placeholder="Placeholder" defaultValue="spruko.com/" />
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item p-6 border-b border-defaultborder dark:border-defaultborder/10">
                                            <span className="font-medium text-[0.9375rem] block mb-4">ABOUT :</span>
                                            <div className="grid grid-cols-12 gap-y-6 sm:gap-x-6 items-center">
                                                <div className="xl:col-span-3 col-span-12">
                                                    <div className="leading-none">
                                                        <span className="font-medium">Biographical Info :</span>
                                                    </div>
                                                </div>
                                                <div className="xl:col-span-9 col-span-12">
                                                    <textarea className="form-control" id="text-area" rows={4} defaultValue="Hey there! I'm [Your Name], a passionate [Your Profession/Interest] based in [Your Location]. With a love for [Your Hobbies/Interests], I find joy in exploring the beauty of [Your Industry/Field]. Whether it's [Specific Skills or Expertise], I'm always eager to learn and grow.

                                                        I specialize in [Your Specialization/Area of Expertise], bringing creativity and innovation to every project. From [Key Achievements] to [Notable Experiences], my journey has been a thrilling ride, and I'm excited to share it with you.">
                                                    </textarea>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item p-6 border-b border-defaultborder dark:border-defaultborder/10">
                                            <span className="font-medium text-[0.9375rem] block mb-4">SKILLS :</span>
                                            <div className="grid grid-cols-12 gap-y-6 sm:gap-x-6 items-center">
                                                <div className="xl:col-span-3 col-span-12">
                                                    <div className="leading-none">
                                                        <span className="font-medium">skills :</span>
                                                    </div>
                                                </div>
                                                <div className="xl:col-span-9 col-span-12">
                                                    {/*<input className="form-control" id="choices-text-preset-values"
                                                        type="text"
                                                        defaultValue="Project Management,Data Analysis,Marketing Strategy,Graphic Design,Content Creation,Market Research,Client Relations,Event Planning,Budgeting and Finance,Negotiation Skills,Team Collaboration,Adaptability"
                                                        placeholder="This is a placeholder" />*/}
                                                    <CreatableSelect
                                                        components={components}
                                                        classNamePrefix='react-select custom-react-select'
                                                        inputValue={inputValue}
                                                        isClearable
                                                        isMulti
                                                        menuIsOpen={false}
                                                        onChange={(newValue: any) => {
                                                            // Ensure newValue is an array (or empty array) of objects
                                                            if (Array.isArray(newValue)) {
                                                                setValue(newValue);
                                                            } else {
                                                                // Handle the case when newValue is not an array
                                                                setValue([]);
                                                            }
                                                        }}
                                                        onInputChange={(newValue: any) => setInputValue(newValue)}
                                                        onKeyDown={handleKeyDown}
                                                        placeholder="Type something and press enter..."
                                                        value={value}
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane p-0 border-0 hidden" id="profile3" aria-labelledby="profile-3" role="tabpanel"
                            tabIndex={0}>
                            <div className="box overflow-hidden">
                                <div className="box-body !p-6">
                                    <ul className="list-unstyled profile-timeline">
                                        {timelineData.map((item, index) => (
                                            <SpkprojectTimeline
                                                key={index}
                                                avatar={item.avatar}
                                                title={item.title}
                                                titleClass={item.titleClass}
                                                desClass={item.desClass}
                                                imgclass={item.imgclass}
                                                description={item.description}
                                                timestamp={item.timestamp}
                                                media={item.media || []}
                                                sharedWith={item.sharedWith || []}
                                                SpanContent={item.data}
                                                color={item.color}
                                            />
                                        ))}

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane p-0 border-0 hidden" id="profile4" aria-labelledby="profile-4" role="tabpanel"
                            tabIndex={0}>
                            <div className="box overflow-hidden">
                                <div className="box-body">
                                    <ProfileGallerylist />
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane p-0 border-0 hidden" id="profile5" aria-labelledby="profile-5" role="tabpanel"
                            tabIndex={0}>
                            <div className="box">
                                <div className="box-body">
                                    <div className="grid grid-cols-12 sm:gap-x-6">
                                        {FriendTabdata.map((idx) => (
                                            <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12" key={idx.id}>
                                                <div className="box shadow-none border">
                                                    <div className="box-body !p-6">
                                                        <div className="text-center">
                                                            <span className="avatar avatar-xl avatar-rounded">
                                                                <Image fill src={idx.src} alt="" />
                                                            </span>
                                                            <div className="mt-2">
                                                                <p className="mb-0 font-semibold">{idx.name}</p>
                                                                <p className="text-[0.75rem] opacity-70 mb-1 text-textmuted dark:text-textmuted/50 break-all">
                                                                    {idx.mail}
                                                                </p>
                                                                <span className={`badge bg-${idx.color}/[0.15] text-${idx.color}`}>{idx.badge}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="box-footer text-center">
                                                        <div className="flex flex-wrap justify-center">
                                                            <div className="btn-list">
                                                                <button className="ti-btn ti-btn-sm ti-btn-light btn-wave">Block</button>
                                                                <button className="ti-btn ti-btn-sm ti-btn-primary btn-wave me-0">Unfollow</button>
                                                            </div>
                                                            <div className="ti-dropdown hs-dropdown">
                                                                <Link scroll={false} aria-label="anchor" className="ti-btn ti-btn-secondary ti-btn-icon ti-btn-sm btn-wave" href="#!" data-bs-toggle="dropdown">
                                                                    <i className="ri-more-2-fill"></i>
                                                                </Link>
                                                                <ul className="ti-dropdown-menu hs-dropdown-menu hidden" role="menu">
                                                                    <li><Link scroll={false} className="ti-dropdown-item" href="#!">Message</Link></li>
                                                                    <li><Link scroll={false} className="ti-dropdown-item" href="#!">Edit</Link></li>
                                                                    <li><Link scroll={false} className="ti-dropdown-item" href="#!">View</Link></li>
                                                                    <li><Link scroll={false} className="ti-dropdown-item" href="#!">Delete</Link></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="xl:col-span-12 col-span-12">
                                            <div className="text-center">
                                                <button className="ti-btn ti-btn-soft-primary btn-wave">Show All</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-3 col-span-12">
                    <div className="box overflow-hidden">
                        <div className="box-header">
                            <div className="box-title">
                                PERSONAL INFO
                            </div>
                        </div>
                        <div className="box-body !p-0">
                            <ul className="ti-list-group ti-list-group-flush">
                                {PersonalInfo.map((idx) => (
                                    <li className="ti-list-group-item" key={idx.id}>
                                        <div>
                                            <span className="font-medium me-2">{idx.label} :</span>
                                            <span className="text-textmuted dark:text-textmuted/50">{idx.value}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="box overflow-hidden">
                        <div className="box-header justify-between">
                            <div className="box-title">
                                FOLLOWERS
                            </div>
                            <Link scroll={false} href="#!" className="text-[0.75rem] text-textmuted dark:text-textmuted/50"> View All<i className="ti ti-arrow-narrow-right ms-1"></i> </Link>
                        </div>
                        <div className="box-body !p-0">
                            <ul className="ti-list-group ti-list-group-flush">
                                {userData.map((idx) => (
                                    <li className="ti-list-group-item" key={idx.id}>
                                        <div className="flex items-center gap-2">
                                            <div className="leading-none">
                                                <span className="avatar avatar-sm avatar-rounded">
                                                    <Image fill src={idx.imgSrc} alt="" />
                                                </span>
                                            </div>
                                            <div className="flex-grow">
                                                <span className="font-medium">{idx.name}</span>
                                            </div>
                                            <div>
                                                <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-primary">
                                                    <i className="ri-add-line leading-none align-middle"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-2 --> */}
        </Fragment>
    );
};

export default Profile;