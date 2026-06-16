"use client"
import SpkRatings from "@/shared/@spk-reusable-components/spk-packages/spk-ratings";
import React, { FC, Fragment, useState } from "react";
import StarsIcon from "@mui/icons-material/Stars";
import Box from "@mui/material/Box";
import SpkOverlay from "@/shared/@spk-reusable-components/uielements/spk-overlay";
import SpkButton from "@/shared/@spk-reusable-components/uielements/spk-button";
import Seo from "@/shared/layouts-components/seo/seo";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";

interface RatingsProps { }

const Ratings: FC<RatingsProps> = () => {

    const [ratingValue, setRatingValue] = useState<number | null>(0);
    const handleRatingChange = (_event: React.ChangeEvent<{}>, newValue: number | null) => {
        setRatingValue(newValue); // Update the rating value when the user clicks
    };

    const handleResetRating = () => {
        setRatingValue(0); // Clear the rating when the button is clicked
    };

    const [value, setValue] = useState<number | null>(2);
    const [hover, setHover] = useState<number>(-1);

    const labels: Record<number, string> = {
        0.5: "0.5",
        1: "1",
        1.5: "1.5",
        2: "2",
        2.5: "2.5",
        3: "3",
        3.5: "3.5",
        4: "4",
        4.5: "4.5",
        5: "5",
    };

    function getLabelText(value: number) {
        return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
    }

    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Ratings" />
            <Pageheader Heading="Ratings" breadcrumbs={['Advanced Ui']} currentpage="Ratings" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:col-span-6 xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Basic Rater
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="flex flex-wrap items-center justify-between">
                                <p className="text-[14px] mb-0 font-medium">Show Some <span className="text-danger">&#10084;</span> with rating :</p>
                                <SpkRatings name="half-rating" size="large" defaultValue={0} max={5} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xxl:col-span-6 xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                5 star rater with steps
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="flex flex-wrap items-center justify-between">
                                <p className="text-[14px] mb-0 font-medium">Dont forget to rate the product :</p>
                                <SpkRatings name="half-rating" defaultValue={0} precision={0.5} max={5} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xxl:col-span-6 xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Custom messages
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="flex flex-wrap items-center justify-between">
                                <p className="text-[14px] mb-0 font-medium">Your rating is much appreciated&#128079; :</p>
                                <SpkRatings name="full-rating" defaultValue={4} precision={1} size="large" max={5} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xxl:col-span-6 xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Unlimited number of stars readOnly
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="flex flex-wrap items-center justify-between">
                                <p className="text-[14px] mb-0 font-medium">Thanks for rating :</p>
                                <SpkRatings name="half-rating-read" defaultValue={6} precision={1} max={10} size="large" readOnly />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xxl:col-span-6 xl:col-span-6 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                On hover event
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="flex flex-wrap items-center justify-between">
                                <p className="text-[14px] mb-0 font-medium">Please give your valuable rating :</p>
                                <div className="flex flex-wrap items-center">
                                    <Box sx={{ width: 200, display: "flex", alignItems: "center" }}>
                                        <SpkRatings
                                            name="hover-feedback"
                                            value={value}
                                            precision={0.5} // Enable half-star support
                                            getLabelText={getLabelText}
                                            onChange={(_event, newValue) => setValue(newValue)}
                                            onChangeActive={(_event, newHover) => setHover(newHover)}
                                            Icon={<StarsIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                        />
                                        {value !== null && (
                                            <Box sx={{ ml: 2 }}>
                                                <span className="live-rating badge bg-success/10 text-success ms-4">
                                                    {labels[hover !== -1 ? hover : value]}
                                                </span>
                                            </Box>
                                        )}
                                    </Box>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xxl:col-span-6 xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                Clear/reset rater
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="flex flex-wrap items-center justify-between">
                                <p className="text-[14px] mb-0 font-medium">Thank You so much for your support :</p>
                                <div className="flex flex-wrap items-center">
                                    <SpkRatings name="clickable-rating" value={ratingValue} onChange={handleRatingChange} />
                                    <SpkOverlay>
                                        <SpkButton variant="" Size="sm" customClass=" ti-btn ti-btn-icon ti-btn-sm ti-btn-danger !ms-3" id="rater-reset-button" onclickfunc={handleResetRating}>
                                            <i className="ri-restart-line"></i>
                                            <span
                                                className="hs-tooltip-content  ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm "
                                                role="tooltip">
                                                Reset
                                            </span>
                                        </SpkButton>
                                    </SpkOverlay>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xxl:col-span-12 xl:col-span-12 col-span-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="box-title">
                                5 Star rater with custom isBusyText and simulated backend
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="flex flex-wrap items-center justify-between">
                                <p className="text-[14px] mb-0 font-medium">Thanks for rating :</p>
                                <SpkRatings name="full-rating" defaultValue={0} precision={1} max={5} size="large" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}
        </Fragment>
    );
};

export default Ratings;