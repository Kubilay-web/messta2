"use client"
import Spkalignmentcards from "@/shared/@spk-reusable-components/uielements/cards/spkalignmentcards";
import Spkbgcards from "@/shared/@spk-reusable-components/uielements/cards/spkbgcards";
import Spkborderedcards from "@/shared/@spk-reusable-components/uielements/cards/spkborderedcards";
import SpkClosebuttoncard from "@/shared/@spk-reusable-components/uielements/cards/spkclosebuttoncard";
import SpkCollapsecard from "@/shared/@spk-reusable-components/uielements/cards/spkcollapsecard";
import SpkCustomcard from "@/shared/@spk-reusable-components/uielements/cards/spkcustomcard";
import SpkCustomfootercard from "@/shared/@spk-reusable-components/uielements/cards/spkcustomfootercard";
import SpkDropdowncard from "@/shared/@spk-reusable-components/uielements/cards/spkdropdowncard";
import Spkgridcards from "@/shared/@spk-reusable-components/uielements/cards/spkgridcards";
import Spkgridmarkupcard from "@/shared/@spk-reusable-components/uielements/cards/spkgridmarkupcard";
import Spkhorizontalcards from "@/shared/@spk-reusable-components/uielements/cards/spkhorizontalcards";
import Spkimagecapcards from "@/shared/@spk-reusable-components/uielements/cards/spkimagecapcards";
import Spkimageoverlaycard from "@/shared/@spk-reusable-components/uielements/cards/spkimageoverlaycard";
import SpkListgroupcards from "@/shared/@spk-reusable-components/uielements/cards/spklistgroupcards";
import Spknavigationcards from "@/shared/@spk-reusable-components/uielements/cards/spknavigationcards";
import SpkProfilecard from "@/shared/@spk-reusable-components/uielements/cards/spkprofilecard";
import SpkQuotecards from "@/shared/@spk-reusable-components/uielements/cards/spkquotecards";
import Spkratingcard from "@/shared/@spk-reusable-components/uielements/cards/spkratingcard";
import SpkSocialiconcard from "@/shared/@spk-reusable-components/uielements/cards/spksocialiconcard";
import Spktitlecards from "@/shared/@spk-reusable-components/uielements/cards/spktitlecards";
import Spkutilitiescards from "@/shared/@spk-reusable-components/uielements/cards/spkutilitiescards";
import { Backgroundcards, Bordercarddata, Cardgroupdata, Gridcards } from "@/shared/data/ui-elements/cardsdata";

import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { FC, Fragment, useState } from "react";

interface CardsProps { }

const Cards: FC<CardsProps> = () => {

    const [isFullscreen, setIsFullscreen] = useState(false);


    const handleFullscreenClick = (e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        setIsFullscreen(!isFullscreen);
    };
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Cards" />
            <Pageheader Heading="Cards" breadcrumbs={['Ui Elements']} currentpage="Cards" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <SpkCustomcard Navigate="#!" Imgsrc="../../assets/images/media/media-24.jpg" Title="Card title" Text="Some quick example text to build on the card title and
                            make up the bulk of the card's content." Linktext1="Card link" Linktext2="Another link" />
                </div>
                <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <Spktitlecards AnchortagNavigate="#!" Navigate="#" Imagetag={true} Cardfooter={true} Imgsrc="../../assets/images/media/media-22.jpg" Footertext="Last updated 3 mins ago"
                        Customclass="">
                        <h6 className="box-title font-medium">Card title</h6>
                        <p className="card-text text-textmuted dark:text-textmuted/50 mb-4">As the wind whistled
                            through the dense foliage, scattering leaves like whispered secrets, a lone sapling
                            stood resilient, its roots anchored deep in the earth.</p>
                        <Link scroll={false} href="#!" className="ti-btn ti-btn-primary">Read More</Link>
                    </Spktitlecards>
                </div>


                <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <Spkgridcards Navigate="#!" Imgsrc="../../assets/images/media/media-23.jpg" Text="Some quick example text to build on the card title and up the bulk of the card's content." />
                    <h6 className="mb-3">Only Card Body:</h6>
                    <div className="box">
                        <div className="box-body">
                            <p className="">It is a long established fact that a reader will be distracted by the
                                readable content.</p>
                            <p className="">It is a long established fact that a reader will be distracted by the
                                readable content.</p>
                            <Link scroll={false} href="#!" className="ti-btn bg-primary text-white">Read More</Link>
                            <Link scroll={false} href="#!" className="ti-btn bg-secondary text-white">Get Details</Link>
                        </div>
                    </div>
                </div>
                <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <Spktitlecards AnchortagNavigate="#!" Navigate="#!" Cardheader={true} Cardfooter={false} Title="Featured" Customclass="custom-card">
                        <h6 className="box-title font-semibold">Special title treatment</h6>
                        <p className="card-text mb-4">Richard McClintock, a Latin professor at Hampden-Sydney
                            College in Virginia, looked up one of the more obscure Latin words, consectetur,
                            from a Lorem Ipsum passage</p>
                        <Link scroll={false} href="#!" className="ti-btn ti-btn-primary">Read More</Link>
                    </Spktitlecards>
                    <SpkCustomfootercard Navigate="#" Title="Card title" Subtitle="Card subtitle" Text="There are many variations of passages of Lorem Ipsum available, but
                            the majority have suffered alteration many variations of passages of Lorem Ipsum
                            available there are so many ways to solve but the majority have suffered."
                        Linktext1="Buy Now" Linktext2="Review" />
                </div>
            </div>
            {/* <!-- End::row-1 --> */}

            {/* <!-- Start::row-2--> */}
            <h6 className="mb-3">Card Header & Footer:</h6>
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:col-span-3  col-span-12">
                    <SpkSocialiconcard Name="Iliana Lilly" Role="Web Developer" Imgsrc="../../assets/images/faces/1.jpg" />
                </div>
                <div className="xxl:col-span-3  col-span-12">
                    <Spktitlecards AnchortagNavigate="#!" Navigate="#!" Cardfooter={true} Cardheader={false} Customclass="border !border-primary"
                        Footertext=" Lorem Ipsum is therefore always free from repetition, injected humour.">
                        <svg className="w-[60px] h-[60px] my-4" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path fill="#C6CDD1"
                                d="M19 21H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2z" />
                            <path fill="#C6CDD1" d="M11 1H3a2 2 0 0 0-2 2v8h10V1z" />
                            <path fill="#A1ABB2" d="M21 11V3a2 2 0 0 0-2-2h-8v10h10z" />
                            <path fill="#878A8F" d="M1 11v8a2 2 0 0 0 2 2h8V11H1z" />
                            <path fill="#797D82" d="M11 11v10h8a2 2 0 0 0 2-2v-8H11z" />
                            <path fill="#FFF" d="M14 6h5v1h-5z" />
                            <path
                                d="M19 20.75H3a2 2 0 0 1-2-2V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-.25a2 2 0 0 1-2 2z"
                                opacity=".1" />
                            <circle cx="16" cy="16" r="7" fill="#136ad0" />
                            <path
                                d="M16 22.75c-3.08 0-5.704-1.97-6.696-4.713C10.18 20.907 12.85 23 16 23s5.82-2.094 6.696-4.963C21.704 20.781 19.08 22.75 16 22.75z"
                                opacity=".1" />
                            <path fill="#FFF"
                                d="M16 9.25c3.08 0 5.704 1.97 6.696 4.713C21.82 11.093 19.15 9 16 9s-5.82 2.094-6.696 4.963C10.296 11.219 12.92 9.25 16 9.25z"
                                opacity=".2" />
                            <path fill="#FFF" d="M4 6h5v1H4z" />
                            <path fill="#FFF"
                                d="M6 4h1v5H6zM13 14h6v1h-6zM13 17h6v1h-6zM4.379 15.086l.707-.707 3.535 3.535-.707.707z" />
                            <path fill="#FFF" d="m4.379 17.914 3.535-3.535.707.707-3.535 3.535z" />
                            <path fill="#FFF"
                                d="M19 1H3a2 2 0 0 0-2 2v.25a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2V3a2 2 0 0 0-2-2z"
                                opacity=".2" />
                            <linearGradient id="a" x1="14.367" x2="19.862" y1="14.367" y2="19.862"
                                gradientUnits="userSpaceOnUse">
                                <stop offset="0" stopColor="#3E2723" stopOpacity=".2" />
                                <stop offset="1" stopColor="#3E2723" stopOpacity=".02" />
                            </linearGradient>
                            <path fill="url(#a)"
                                d="M19 14v1h-6l2 2h4v1h-6l4.766 4.766a7.014 7.014 0 0 0 5-5L19 14z" />
                            <linearGradient id="b" x1="-.448" x2="23.366" y1="5.662" y2="16.766"
                                gradientUnits="userSpaceOnUse">
                                <stop offset="0" stopColor="#FFF" stopOpacity=".2" />
                                <stop offset="1" stopColor="#FFF" stopOpacity="0" />
                            </linearGradient>
                            <path fill="url(#b)"
                                d="M21 11.11V3a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8.11A6.974 6.974 0 0 0 16 23c3.86 0 7-3.14 7-7a6.974 6.974 0 0 0-2-4.89z" />
                        </svg>
                        <p className="mb-0 mt-8 text-[1.25rem] font-semibold leading-none">
                            Calculations
                        </p>
                    </Spktitlecards>
                </div>
                <div className="xxl:col-span-3  col-span-12">
                    <SpkDropdowncard Navigate="#!" Imgsrc="../../assets/images/faces/11.jpg" Title="Gatin Leo" Gender="28 Years, Male" Date="28,Nov 2022" Role="Assistant Professor"
                        Text="If you are going to use, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators." />
                </div>
                <div className="xxl:col-span-3  col-span-12">
                    <Spkratingcard Timevalue="1 year ago" Text="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour"
                        Name="Corey Anderson" Imgsrc="../../assets/images/faces/12.jpg" Title="Very Great!" />
                </div>
                <div className="xl:col-span-4 col-span-12">
                    <SpkCollapsecard footertext='Read More' Timeout="100" Title='Card With Collapse Button'>
                        <h6 className="card-text font-semibold">Collapsible Card</h6>
                        <p className="card-text mb-0">There are many variations of passages of Lorem Ipsum
                            available, but the majority have suffered alteration in some form, by injected
                            humour, or randomised words</p>
                    </SpkCollapsecard>
                </div>
                <div className="xl:col-span-4 col-span-12">
                    <SpkClosebuttoncard Footertext="Read More" Title="Card With Close Button">
                        <h6 className="card-text font-semibold">Closed Card</h6>
                        <p className="card-text mb-0">There are many variations of passages of Lorem Ipsum
                            available, but the majority have suffered alteration in some form, by injected
                            humour, or randomised words</p>
                    </SpkClosebuttoncard>
                </div>
                <div className="xl:col-span-4 col-span-12">
                    <Spktitlecards AnchortagNavigate="#!" Navigate="#!" ButtonTag={true} Cardfooter={true} Cardheader={true} Title="Card With Fullscreen Button" Customclass={`${isFullscreen ? 'box-fullscreen' : ''}`}
                        Icontag={true} Linktag={true} Icon="ri-fullscreen-line" LinkClass="terms-fullscreen"
                        CustomHeaderclass="justify-between" OnclickFunc={handleFullscreenClick}>
                        <h6 className="card-text font-semibold">FullScreen Card</h6>
                        <p className="card-text mb-0">There are many variations of passages of Lorem Ipsum
                            available, but the majority have suffered alteration in some form, by injected
                            humour, or randomised words</p>
                    </Spktitlecards>
                </div>
            </div>
            {/* <!-- End::row-2--> */}

            {/* <!-- Start::row-3 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-2 lg:col-span-4 md:col-span-4 col-span-12">
                    <Spkgridmarkupcard Navigate="#!" Customimgclass="card-img mb-3" Imgsrc="../../assets/images/media/media-4.jpg" Customtitleclass="mb-3" Text="With supporting text below as a natural lead-in."
                        Badge={true} Badgetext="New" Badgeclass=' bg-primary text-white float-end !text-[0.625rem]' Title="Mountains" />
                </div>
                <div className="xl:col-span-2 lg:col-span-4 md:col-span-4 col-span-12">
                    <Spkgridmarkupcard Navigate="#!" Customimgclass="card-img mb-3" Imgsrc="../../assets/images/media/media-9.jpg" Customtitleclass="mb-4" Text="With supporting text below as a natural"
                        Badge={true} Badgetext="Hot" Badgeclass=" bg-secondary text-white float-end !text-[0.625rem]" Title="Hills" />
                </div>
                <div className="xl:col-span-2 lg:col-span-4 md:col-span-4 col-span-12">
                    <Spkgridmarkupcard Navigate="#!" Customimgclass="card-img mb-3" Imgsrc="../../assets/images/media/media-15.jpg" Customtitleclass="mb-4" Text="With supporting text below as a natural"
                        Badge={true} Badgetext="Offer" Badgeclass="bg-light text-dark ltr:float-right rtl:float-left text-[.625rem]" Title="Nature" />
                </div>
                <div className="xl:col-span-3 lg:col-span-6 md:col-span-6 col-span-12">
                    <Spktitlecards AnchortagNavigate="#!" Navigate="#!" Cardfooter={true} Footertext="11.32pm" Cardheader={true} Title="Featured"
                        Customclass="text-center" Customfooterclass="box-footer text-textmuted dark:text-textmuted/50" CustomHeaderclass="!mb-0">
                        <h6 className="box-title font-medium !mb-2">Breaking News !</h6>
                        <p className="card-text mb-4">With supporting text below as a natural lead-in to
                            additional content.</p>
                        <Link scroll={false} href="#!" className="ti-btn ti-btn-primary mt-2 me-2">Read More</Link>
                        <Link scroll={false} href="#!" className="ti-btn ti-btn-outline-secondary mt-2">Close</Link>
                    </Spktitlecards>
                </div>
                <div className="xl:col-span-3 lg:col-span-6 md:col-span-6 col-span-12">
                    <SpkProfilecard Imgsrc="../../assets/images/faces/12.jpg" Posts="25" Followers="1253" Following="367" Name="Angelina Caprio" Role="Angular Developer"
                        Personalinformation="Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions " />
                </div>
                <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-12 col-span-12">
                    <h6 className="mb-3">Using Grid Markups:</h6>
                    <div className="grid grid-cols-12 gap-x-6 ">
                        <div className="xl:col-span-4 md:col-span-4 col-span-12">
                            <Spkgridmarkupcard Navigate="#!" Customimgclass="card-img mb-4 !rounded-md w-full" Imgsrc="../../assets/images/media/media-25.jpg" Text="With supporting text below as a natural
                             lead-in to additional content." Customtextclass="mb-4" Linktag={true} Buttontext="Purchase" Button={true} Color="primary" Title="Product A" />
                        </div>
                        <div className="xl:col-span-4 md:col-span-4 col-span-12">
                            <Spkgridmarkupcard Navigate="#!" Customimgclass="card-img mb-4 !rounded-md w-full" Imgsrc="../../assets/images/media/media-26.jpg" Text="With supporting text below as a natural
                             lead-in to additional content." Customtextclass="mb-4" Linktag={true} Buttontext="Purchase" Button={true} Color="secondary" Title="Product B" />
                        </div>
                        <div className="xl:col-span-4 md:col-span-4 col-span-12">
                            <Spkgridmarkupcard Navigate="#!" Customimgclass="card-img mb-4 !rounded-md w-full" Imgsrc="../../assets/images/media/media-27.jpg" Text="With supporting text below as a natural
                             lead-in to additional content." Customtextclass="mb-4" Linktag={true} Buttontext="Purchase" Button={true} Color="light" Title="Product-C" />
                        </div>
                    </div>
                </div>
                <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-12 col-span-12">
                    <div className="grid grid-cols-12 gap-x-6">
                        <h6 className="mb-3">Quote:</h6>
                        <div className="xl:col-span-12 col-span-12">
                            <SpkQuotecards Navigate="#!" Title="Source Title" Text="Goodness isn't about avoiding falls, but about the courage to rise, stronger and kinder, with every stumble."
                                Footertext="Someone famous in" Customclass="" />
                        </div>
                        <div className="xl:col-span-12 col-span-12">
                            <h6 className="mb-3">List Group:</h6>
                            <div className="grid grid-cols-12 gap-x-6">
                                <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-4 sm:col-span-4 col-span-12">
                                    <SpkListgroupcards>
                                        <li className="ti-list-group-item">An item</li>
                                        <li className="ti-list-group-item">A second item</li>
                                        <li className="ti-list-group-item">A third item</li>
                                        <li className="ti-list-group-item">A fourth item</li>
                                    </SpkListgroupcards>
                                </div>
                                <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-4 sm:col-span-4 col-span-12">
                                    <SpkListgroupcards CardHeader={true} Headertext='Featured'>
                                        <li className="ti-list-group-item ">An item</li>
                                        <li className="ti-list-group-item !border-s-0 !border-e-0">A second item</li>
                                        <li className="ti-list-group-item !border-s-0 !border-e-0 !border-b-0">A third item</li>
                                    </SpkListgroupcards>
                                </div>
                                <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-4 sm:col-span-4 col-span-12">
                                    <SpkListgroupcards Listvariant="flush" CardFooter={true} Headertext="Featured" Footertext="Card footer" Customfooterclass="border-top-0">
                                        <li className="ti-list-group-item ">An item</li>
                                        <li className="ti-list-group-item !border-s-0 !border-e-0">A second item</li>
                                        <li className="ti-list-group-item !border-s-0 !border-e-0 !border-b-0">A third item</li>
                                    </SpkListgroupcards>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {/* <!-- End::row-3 --> */}

            {/* <!-- Start::row-4 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-3 col-span-12">
                    <div className="grid grid-cols-12">
                        <h6 className="mb-3 text-nowrap">Mixins utilities:</h6>
                        <div className="xl:col-span-12 col-span-12">
                            <Spktitlecards AnchortagNavigate="#!" Navigate="#!" Customclass="border border-success mb-3" Customfooterclass="box-footer bg-transparent border-t border-success" Cardfooter={true}
                                Cardheader={true} Title="Header" CustomBodyclass="text-success" CustomHeaderclass="bg-transparent border-b border-success" Footertext="Footer" >
                                <p className="box-title !font-medium !text-success">Looking For Success?</p>
                                <p className="card-text">If you are going to use a passage of Lorem Ipsum, you need
                                    to be sure there isn't anything embarrassing hidden in the middle of text.
                                    All the Lorem Ipsum generators on the Internet tend to repeat predefined
                                    chunks as necessary.</p>
                            </Spktitlecards>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-9 col-span-12">
                    <h6 className="mb-3">Text Alignment:</h6>
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xl:col-span-4 col-span-12">
                            <Spkalignmentcards Navigate="#" Imagesrc="../../assets/images/faces/15.jpg" Customtitleclass="!font-medium" Title="Where it come from" Text="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature."
                                Buttontext="Go somewhere" />
                        </div>
                        <div className="xl:col-span-4 col-span-12">
                            <Spkalignmentcards Navigate="#" Imagesrc="../../assets/images/faces/11.jpg" Customtitleclass="!font-medium" Title="What is special?" Text="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form."
                                Buttontext="Go somewhere" Customclass="text-end " />
                        </div>
                        <div className="xl:col-span-4 col-span-12">
                            <Spkalignmentcards Navigate="#" Imagesrc="../../assets/images/faces/3.jpg" Title="Why do we use it?" Customtitleclass="!font-medium" Text="Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text."
                                Buttontext="Go somewhere" Customclass="text-center" />
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End::row-4 --> */}

            {/* <!-- Start::row-5 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:col-span-6 xl:col-span-12 col-span-12">
                    <h6 className="mb-3">Using Utilities:</h6>
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xl:col-span-6 col-span-12">
                            <Spkutilitiescards Navigate="#!" Customcardclass="!w-[75%]" Text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Id nostrum omnis excepturi consequatur molestiae" Title="Using Width 75%" />
                        </div>
                        <div className="xl:col-span-6 col-span-12">
                            <Spkutilitiescards Navigate="#!" Customcardclass="!w-[50%]" Text="Lorem ipsum dolor sit amet consectetur adipisicing elit." Title="Using Width 50%" />
                        </div>
                    </div>
                </div>
                <div className="xxl:col-span-6 xl:col-span-12 col-span-12">
                    <h6 className="mb-3">Navigation:</h6>
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xl:col-span-6 col-span-12">
                            <Spknavigationcards Navigate="#" Navigationclass="tabs" Customheaderclass=" p-4 pt-3 ps-2" />
                        </div>
                        <div className="xl:col-span-6 col-span-12">
                            <Spknavigationcards Navigate="#" Navigationclass="pills" />
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End::row-5 --> */}

            {/* <!-- Start::row-6 --> */}
            <h6 className="mb-3">Image Caps:</h6>
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-4 col-span-12">
                    <Spkimagecapcards Imgsrc="../../assets/images/media/media-29.jpg" Imgposition="before" Customimgclass="card-img-top">
                        <h6 className="box-title font-medium">Image caps are widely used in Blog's</h6>
                        <p className="card-text mb-3 text-textmuted dark:text-textmuted/50">But I must explain to you how all this mistaken
                            idea of denouncing pleasure and praising pain was born and I will give you a
                            complete account of the system, and expound the actual teachings.</p>
                        <p className="card-text mb-0"><small>Last updated 3 mins
                            ago</small></p>
                    </Spkimagecapcards>
                </div>
                <div className="xl:col-span-4 col-span-12">
                    <Spkimagecapcards Imgsrc="../../assets/images/media/media-28.jpg" Customimgclass="!rounded-b-md" Imgposition="after" >
                        <h6 className="box-title font-medium">Image caps are widely used in Blog's</h6>
                        <p className="card-text mb-3 text-textmuted dark:text-textmuted/50">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound.</p>
                        <p className="card-text mb-0"><small>Last updated 3 mins ago</small></p>
                    </Spkimagecapcards>
                </div>
                <div className="xl:col-span-4 col-span-12">
                    <Spkimagecapcards Imgsrc="../../assets/images/media/media-31.jpg" Imgposition="after" Customimgclass="card-img-top" CardFooter={true} Cardheader={true} Title="Image caps are widely used in Blog's"
                        Footertext="Last updated 3 mins ago">
                        <p className="card-text mb-1 text-[#8c9097] dark:text-white/50">This is a wider card with supporting text below
                            as
                            a natural lead-in to additional content. This content is a
                            little
                            bit longer.</p>
                    </Spkimagecapcards>
                </div>
                <div className="xl:col-span-4 col-span-12">
                    <Spkimagecapcards Imgsrc="../../assets/images/media/media-32.jpg" Imgposition="before" Customimgclass="card-img-top" CardFooter={true} Cardheader={true} Title="Image caps are widely used in Blog's"
                        Footertext="Last updated 3 mins ago" Customfooterclass='card-text mb-0' >
                        <p className="card-text mb-1 text-[#8c9097] dark:text-white/50">This is a wider card with supporting text below
                            as
                            a natural lead-in to additional content. This content is a
                            little
                            bit longer.</p>
                    </Spkimagecapcards>
                </div>
                <div className="xl:col-span-4 col-span-12">
                    <Spkimagecapcards Imgsrc="../../assets/images/media/media-30.jpg" Imgafterfooter={false} Imgposition="after" Customimgclass="card-img rounded-0" CardFooter={true} Cardheader={true} Title="Image caps are widely used in Blog's"
                        Footertext="Last updated 3 mins ago">
                        <h6 className="box-title font-semibold mb-1 !text-[1rem]">Image caps are widely used in
                            Blog's</h6>
                        <p className="card-text mb-1 text-[#8c9097] dark:text-white/50">This is a wider card with supporting text below
                            as
                            a natural lead-in to additional content. This content is a
                            little
                            bit longer.</p>
                    </Spkimagecapcards>
                </div>
                <div className="xl:col-span-4 col-span-12">
                    <Spkimagecapcards Imgsrc="../../assets/images/media/media-33.jpg" Imgafterfooter={true} Customimgclass="card-img-bottom" CardFooter={true} Cardheader={true}
                        Title="Image caps are widely used in Blog's" Footertext="Last updated 3 mins ago" Customfooterclass='card-text mb-0'>
                        <p className="card-text mb-1 text-[#8c9097] dark:text-white/50">This is a wider card with supporting text below
                            as
                            a natural lead-in to additional content. This content is a
                            little
                            bit longer.</p>
                    </Spkimagecapcards>
                </div>
            </div>
            {/* <!-- End::row-6 --> */}

            {/* <!-- Start::row-7 --> */}
            <h6 className="mb-3">Image Overlays:</h6>
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-4 col-span-12">
                    <Spkimageoverlaycard CustomClass="overlay-card" Title="Image Overlays Are Awesome!" Imgsrc="../../assets/images/media/media-35.jpg" CardHeader={true}
                        CardFooter={false} Customimgclass="card-img" Custombodyclass="overflow-y-scroll text-white" CustomTitleclass="!text-white">
                        <div className="card-text mb-2 !text-white">There are many variations of passages of
                            Lorem Ipsum available, but the majority have suffered alteration in some form,
                            by injected humour, or randomised words which don't look even.</div>
                        <div className="card-text !text-white">Last updated 3 mins ago</div>
                    </Spkimageoverlaycard>
                </div>
                <div className="xl:col-span-4 col-span-12">
                    <Spkimageoverlaycard CustomClass="overlay-card" CardHeader={false} Imgsrc="../../assets/images/media/media-36.jpg" Overlayclass="over-content-bottom"
                        CardFooter={true} Footertext="Last updated 3 mins ago" Customimgclass="card-img" Custombodyclass="m:!p-4 !p-2 text-white" Customfooterclass="!text-white !border-t !border-defaultborder/10" >
                        <div className="card-text text-white">
                            Image Overlays Are Awesome!
                        </div>
                        <div className="card-text overflow-y-scroll mb-2 !text-white">There are many variations of passages of
                            Lorem Ipsum available, but the majority have suffered alteration in some form,
                            by injected humour, or randomised words which don't look even.</div>
                        <div className="card-text !text-white">Last updated 3 mins ago</div>
                    </Spkimageoverlaycard>
                </div>
                <div className="xl:col-span-4 col-span-12">
                    <Spkimageoverlaycard CustomClass="overlay-card" Title="Image Overlays Are Awesome!" Imgsrc="../../assets/images/media/media-34.jpg" CardHeader={true} Overlayclass='flex flex-column p-0'
                        CardFooter={true} Footertext="Last updated 3 mins ago" Customimgclass="card-img" Custombodyclass="overflow-y-scroll text-white" CustomTitleclass=" !text-white"
                        Customfooterclass="!text-white !border-t border-defaultborder">
                        <div className="card-text !text-white">There are many variations of passages of Lorem
                            Ipsum available, but the majority have suffered alteration in some form, by
                            injected humour, or randomised words which don't look even.</div>
                    </Spkimageoverlaycard>
                </div>
            </div>
            {/* <!-- End::row-7 --> */}

            {/* <!-- Start::row-8 --> */}
            <h6 className="mb-4 !text-[1rem] !font-medium">Horizontal Cards:</h6>
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-4 col-span-12">
                    <Spkhorizontalcards Navigate="#!" Imgposition="before" CardHeader={true} CardFooter={true} Imagesrc="../../assets/images/media/media-37.jpg" Imgclass="img-fluid rounded-start h-full w-full rtl:rounded-tr-md rtl:rounded-br-md" Footertext="Last updated 3 mins ago" Title="Horizontal Cards" >
                        <h6 className="box-title font-medium">Horizontal cards are awesome!</h6>
                        <p className="card-text">This is a wider card with supporting text below as a natural .</p>
                    </Spkhorizontalcards>
                </div>
                <div className="xl:col-span-4 col-span-12">
                    <Spkhorizontalcards Navigate="#!" Imgposition="after" CardHeader={true} CardFooter={false} Imagesrc="../../assets/images/media/media-38.jpg" Imgclass="img-fluid rounded-end h-full w-full rtl:rounded-tl-md rtl:rounded-bl-md"
                        Title="Horizontal Cards" >
                        <h6 className="box-title font-medium">Horizontal cards are awesome!</h6>
                        <p className="card-text mb-3">This is a wider card with suppo    rting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p className="card-text"><small className="text-textmuted dark:text-textmuted/50">Last updated 3 mins ago</small></p>
                    </Spkhorizontalcards>
                </div>
                <div className="xl:col-span-4 col-span-12">
                    <Spkhorizontalcards Navigate="#!" Imgposition="after" CardHeader={false} CardFooter={true} Imagesrc="../../assets/images/media/media-39.jpg" Imgclass="img-fluid rounded-end h-full w-full rtl:rounded-tl-md rtl:rounded-bl-md"
                        Footertext="Last updated 3 mins ago" >
                        <h6 className="box-title fw-medium mb-2">Horizontal Cards</h6>
                        <div className="mb-4">Horizontal cards are awesome!</div>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </Spkhorizontalcards>
                </div>
            </div>
            {/* <!-- End::row-8 --> */}

            {/* <!-- Start::row-9 --> */}
            <h6 className="mb-3">Background Colored Cards:</h6>
            <div className="grid grid-cols-12 gap-x-6">
                {Backgroundcards.map((idx) => (
                    <div className="xl:col-span-3 col-span-12" key={idx.id}>
                        <Spkbgcards Navigate='#!' Linktag={true} color={idx.color} Textclass={idx.class} Class={idx.class} Imgsrc={idx.src} Value={idx.text2} Title={idx.text1} />
                    </div>
                ))}
            </div>
            {/* <!-- End::row-9 --> */}

            {/* <!-- Start::row-10 --> */}
            <h6 className="mb-3">Colored Border Cards:</h6>
            <div className="grid grid-cols-12 gap-x-6">
                {Bordercarddata.map((idx) => (
                    <div className="xl:col-span-3 col-span-12" key={idx.id}>
                        <Spkborderedcards Navigate="#" Title={idx.title} badges={idx.badges} images={idx.images} Class={idx.Class}
                            Customcardclas={idx.cardclass} />
                    </div>
                ))}
            </div>
            {/* <!-- End::row-10 --> */}

            {/* <!-- Start::row-11 --> */}
            <div className="grid grid-cols-12 gap-x-6 mb-4 gap-y-3">
                <div className="xl:col-span-12 lg:col-span-12 col-span-12">
                    <h6 className="mb-4 !text-[1rem] !font-medium">Card Groups With Footer:</h6>
                    <div className="grid rounded-xl shadow-sm divide-y sm:rtl:divide-x-reverse overflow-hidden sm:flex sm:divide-y-0 sm:divide-x dark:border-white/10 dark:divide-white/10">
                        {Cardgroupdata.map((idx) => (
                            <div className="flex flex-col flex-[1_0_0%] bg-white dark:bg-bodybg" key={idx.id}>
                                <Image fill className={idx.customclass}
                                    src={idx.src} alt="Image Description" />
                                <div className="p-4 flex-1 md:p-5">
                                    <h6 className="font-medium">
                                        {idx.title}
                                    </h6>
                                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                                        {idx.text}
                                    </p>
                                </div>
                                <div className="p-4 border-t sm:px-5 dark:border-white/10">
                                    <p className="text-xs text-gray-500 dark:text-gray-500">
                                        Last updated 5 mins ago
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* <!-- End::row-11 --> */}

            {/* <!-- Start::row-12 --> */}
            <h6 className="mb-3">Grid Cards:</h6>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {Gridcards.map((idx) => (
                    <div className="col" key={idx.id}>
                        <Spkgridcards Navigate="#" Ptag={true} Text="If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text."
                            Imgsrc={idx.src} Title={idx.text1} />
                    </div>
                ))}
            </div>
            {/* <!-- End::row-12 --> */}

            {/* <!-- Start::row-13 --> */}
            <h6 className="mb-3">Cards With Link:</h6>
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:col-span-3 xl:col-span-12 col-span-12">
                    <Spkgridcards Navigate="#!" Imgsrc="../../assets/images/media/media-23.jpg" Customheadingclass="mb-0" Linktag={true} Ptag={false} Title="Forests are Awesome." />
                </div>
                <div className="xxl:col-span-6 xl:col-span-6 col-span-12">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xxl:col-span-12 xl:col-span-12 col-span-12">
                            <SpkQuotecards Navigate="#!" Customclass="box-bg-primary" Text="The best and most beautiful things in the world cannot be seen or even touched — they must be felt with the heart.."
                                Footertext="Someone famous as" Title="-Helen Keller" Footerclass="blockquote-footer mt-3 !text-white !ps-0 text-[14px]  opacity-70" Headingclass="text-white" />
                        </div>
                        <div className="xxl:col-span-5 xl:col-span-12 col-span-12">
                            <Spktitlecards AnchortagNavigate="#!" Navigate="#!" Customclass="" Anchortagbefore={true}  >
                                <div className="flex items-center">
                                    <div className="me-4">
                                        <span className="avatar avatar-md">
                                            <Image fill src="../../assets/images/faces/15.jpg" alt="img" />
                                        </span>
                                    </div>
                                    <div>
                                        <p className="card-text mb-0 text-[14px] font-medium">Atharva Simon.
                                        </p>
                                        <div className="box-title text-textmuted dark:text-textmuted/50 text-xs mb-0">Correspondent
                                            Professor</div>
                                    </div>
                                </div>
                            </Spktitlecards>
                            <Spktitlecards AnchortagNavigate="#!" Navigate="#!" Customclass="border border-info" Anchortagbefore={true}  >
                                <div className="flex items-center">
                                    <div className="me-3">
                                        <span className="avatar avatar-xl">
                                            <Image fill src="../../assets/images/faces/8.jpg" alt="img" />
                                        </span>
                                    </div>
                                    <div>
                                        <p className="card-text text-info mb-1 text-[14px] font-medium">Alicia Keys.
                                        </p>
                                        <div className="box-title text-xs mb-1">Department Of Commerce</div>
                                        <div
                                            className="box-title text-textmuted dark:text-textmuted/50 text-[11px] mb-0">
                                            24 Years, Female</div>
                                    </div>
                                </div>
                            </Spktitlecards>
                        </div>
                        <div className="xxl:col-span-7 xl:col-span-12 col-span-12">
                            <Spkhorizontalcards Navigate="#!" Imgposition="after" Linktag={true} CardHeader={false} CardFooter={true}
                                Imagesrc="../../assets/images/media/media-39.jpg" Imgclass="img-fluid !rounded-e-md h-full"
                                Footertext="Last updated 3 mins ago">
                                <h6 className="box-title mb-2 font-medium">Fox is Beautiful ?</h6>
                                <p className="card-text mb-0">This is a wild animal with supporting tactics
                                    and are very efficient at kill,they are very Dangerous.</p>
                                <p className="mb-0 card-text">
                                    Fox lives mainly in forests and are well known for their hunting
                                    skills.
                                </p>
                            </Spkhorizontalcards>
                        </div>
                    </div>
                </div>
                <div className="xxl:col-span-3 xl:col-span-6 col-span-12">
                    <Spkgridcards Navigate="#" Linktag={true} Imgsrc="../../assets/images/media/media-47.jpg" Title="Most tropical areas are suitable" Text="If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text." />
                </div>
            </div>
            {/* <!-- End::row-13 --> */}
        </Fragment>
    );
};

export default Cards;