"use client"
import PrelineScript from "@/app/PrelineScript";
import Spkbgcards from "@/shared/@spk-reusable-components/uielements/cards/spkbgcards";
import SpkClosebuttoncard from "@/shared/@spk-reusable-components/uielements/cards/spkclosebuttoncard";
import SpkCollapsecard from "@/shared/@spk-reusable-components/uielements/cards/spkcollapsecard";
import Spkimageoverlaycard from "@/shared/@spk-reusable-components/uielements/cards/spkimageoverlaycard";
import SpkQuotecards from "@/shared/@spk-reusable-components/uielements/cards/spkquotecards";
import Spktitlecards from "@/shared/@spk-reusable-components/uielements/cards/spktitlecards";

import Image from "next/image";
import React, { Fragment, useEffect, useRef, useState } from "react";
import Dragula from "react-dragula";

const Draggabledata = () => {

    const leftContainerRef = useRef<HTMLDivElement | null>(null);
    const rightContainerRef = useRef<HTMLDivElement | null>(null);
    const windowElement: any = typeof window !== "undefined" ? window : null;

    useEffect(() => {
        if (leftContainerRef.current && rightContainerRef.current && windowElement) {
            Dragula([leftContainerRef.current, rightContainerRef.current]);
        }
    }, []);


    //fullscreen
    const [isFullscreen, setIsFullscreen] = useState(false);


    const handleFullscreenClick = (e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        setIsFullscreen(!isFullscreen);
    };

    return (
        <Fragment>
            <PrelineScript />
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-6 col-span-12" id="draggable-left" ref={leftContainerRef}>
                    <SpkQuotecards Navigate="#!" Title="-Helen Keller" Text="The best and most beautiful things in the world cannot be seen or even touched — they must be felt with the heart.."
                        Footertext="Someone famous as" Customclass="box-bg-primary" CustomBodyclass="" Headingclass="text-white" Footerclass="text-[14px] !ps-0 !text-white opacity-70" />

                    <Spktitlecards AnchortagNavigate="#!" Navigate="#!" ButtonTag={true} Cardfooter={true} Cardheader={true} Title="box With Fullscreen Button" Customclass={`${isFullscreen ? 'box-fullscreen' : ''}`}
                        Icontag={true} Linktag={true} Icon="ri-fullscreen-line" LinkClass="terms-fullscreen"
                        CustomHeaderclass="justify-content-between" OnclickFunc={handleFullscreenClick}>
                        <h6 className="card-text font-semibold">FullScreen Card</h6>
                        <p className="card-text mb-0">There are many variations of passages of Lorem Ipsum
                            available, but the majority have suffered alteration in some form, by injected
                            humour, or randomised words</p>
                    </Spktitlecards>
                    <SpkCollapsecard footertext='Read More' Timeout="100" Title='Card With Collapse Button' Custombodyclass="deals-content">
                        <h6 className="card-text font-semibold">Collapsible box</h6>
                        <p className="card-text mb-0">There are many variations of passages of Lorem Ipsum
                            available, but the majority have suffered alteration in some form, by injected
                            humour, or randomised words</p>
                    </SpkCollapsecard>


                    <SpkClosebuttoncard Footertext="Read More" Title="Card With Close Button">
                        <h6 className="card-text font-semibold">Closed Card</h6>
                        <p className="card-text mb-0">There are many variations of passages of Lorem Ipsum
                            available, but the majority have suffered alteration in some form, by injected
                            humour, or randomised words</p>
                    </SpkClosebuttoncard>

                    <Spktitlecards AnchortagNavigate="#!" Navigate="#!" Customclass=" custom-box border !border-info" Anchortagbefore={true}  >
                        <div className="flex items-center">
                            <div className="me-3">
                                <span className="avatar avatar-xl">
                                    <Image fill src="../../assets/images/faces/8.jpg" alt="img" />
                                </span>
                            </div>
                            <div>
                                <p className="card-text text-info mb-1 text-[14px] font-medium">Jessica Sams.</p>
                                <div className="box-title !text-[0.75rem] mb-1 !font-normal">Department Of Computers</div>
                                <div className="box-title !text-[#8c9097] dark:text-white/50 !text-[.6875rem] !font-normal mb-0">23 Years, Female</div>
                            </div>
                        </div>
                    </Spktitlecards>

                    <Spktitlecards AnchortagNavigate="#!" Navigate="#!" Customclass="custom-box" Anchortagbefore={true} CustomBodyclass='deals-content'  >
                        <div className="flex items-center">
                            <div className="me-3">
                                <span className="avatar avatar-md">
                                    <Image fill src="../../assets/images/faces/15.jpg" alt="img" />
                                </span>
                            </div>
                            <div>
                                <p className="box-text mb-0 text-[.875rem] font-medium">Atharva Simon.</p>
                                <div className="box-title !text-[#8c9097] dark:text-white/50 !text-[0.75rem] !font-normal mb-0">Correspondent Professor</div>
                            </div>
                        </div>
                    </Spktitlecards>

                </div>
                <div className="xl:col-span-6 col-span-12" id="draggable-right" ref={rightContainerRef}>
                    <Spkimageoverlaycard CustomClass="" CardHeader={false} Imgsrc="../../assets/images/media/media-36.jpg" Overlayclass="over-content-bottom top-0"
                        CardFooter={true} Footertext="Last updated 3 mins ago" Customimgclass="card-img" Custombodyclass="deals-content text-white" Customfooterclass="!text-white" >
                        <div className="box-text !text-white">
                            Image Overlays Are Awesome!
                        </div>
                        <div className="box-text mb-2 !text-white">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which {`don't`} look even.</div>
                    </Spkimageoverlaycard>

                    <Spkbgcards Navigate="#!" color="" Imgsrc="../../assets/images/faces/5.jpg" Title="Sonia Agarwal" Imgclass="!rounded-full" Value="In leave for 1 month" Textclass="white"
                        Class="white" Customclass='custom-box !bg-success cursor-pointer' />

                    <Spkimageoverlaycard CustomClass="text-white" Title="Image Overlays Are Awesome!" Imgsrc="../../assets/images/media/media-35.jpg" CardHeader={true} Overlayclass='top-auto'
                        CardFooter={false} Customimgclass="box-img" Custombodyclass=" overflow-auto !text-white" CustomTitleclass="!text-white">
                        <div className="box-text mb-2 !text-white">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which {`don't`} look even.</div>
                        <div className="box-text ">Last updated 3 mins ago</div>
                    </Spkimageoverlaycard>

                </div>
            </div>
            {/* <!--End::row-1 --> */}

        </Fragment>
    )
};

export default Draggabledata;