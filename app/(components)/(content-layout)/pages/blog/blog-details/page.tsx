"use client"
import { ExploreTopics, PopulatTags, RecentPosts, comments } from "@/shared/data/pages/blog/blog-details-data";
import { BlogGallerylist } from "@/shared/data/pages/blog/blog-details-gallerydata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";
import SimpleBar from "simplebar-react";

const BlogDetails = () => {


    return (
        <Fragment>
            <div className="container-fluid">
                {/* <!-- Page Header --> */}
                <Seo title="Blog Details" />
                <Pageheader Heading="Blog Details" breadcrumbs={['Pages', ' Blog']} currentpage="Blog Details" />
                {/* <!-- Page Header Close --> */}

                {/* <!-- Start::row-1 --> */}
                <div className="grid grid-cols-12 gap-x-6">
                    <div className="xl:col-span-8 col-span-12">
                        <div className="grid grid-cols-12 gap-x-6">
                            <div className="xl:col-span-12 col-span-12">
                                <div className="box">
                                    <div className="box-body">
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="h5 font-semibold !mb-0">Exploring the Dimensionality of Creativity with 3D Images</p>
                                            <span className="badge bg-secondary text-white">3D Images</span>
                                        </div>
                                        <div className="sm:flex items-cneter">
                                            <div className="flex items-center flex-grow">
                                                <span className="avatar avatar-sm avatar-rounded me-3">
                                                    <Image  fill src="../../../assets/images/faces/12.jpg" alt="" />
                                                </span>
                                                <div>
                                                    <p className="mb-0 font-medium">Christopher - <span className="text-[0.75rem] text-textmuted dark:text-textmuted/50 font-normal">Tue,25 Dec 2024 - 11:45</span></p>
                                                    <p className="mb-0 text-textmuted dark:text-textmuted/50"></p>
                                                </div>
                                            </div>
                                            <div className="btn-list mt-sm-0 mt-0">
                                                <div
                                                    className="hs-tooltip ti-main-tooltip">
                                                    <Link scroll={false} href="#!" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-soft-primary btn-wave hs-tooltip-toggle">
                                                        <i className="ri-thumb-up-line"></i>
                                                        <span
                                                            className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !font-medium !text-white shadow-sm !rounded-sm"
                                                            role="tooltip">
                                                            Like
                                                        </span>
                                                    </Link>
                                                </div>
                                                <div
                                                    className="hs-tooltip ti-main-tooltip">
                                                    <Link scroll={false} href="#!" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-soft-secondary btn-wave hs-tooltip-toggle">
                                                        <i className="ri-share-line"></i>
                                                        <span className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !font-medium !text-white shadow-sm !rounded-sm" role="tooltip">
                                                            Share
                                                        </span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Link className="relative" scroll={false} href="#!">
                                        <Image fill priority src="../../../assets/images/media/blog/19.jpg" className="card-img rounded-none blog-details-img" alt="..." />
                                    </Link>
                                    <div className="box-body !p-6">
                                        <h6 className="font-semibold">
                                            Unveiling Depth and Realism
                                        </h6>
                                        <p className="mb-4">
                                            Unlike traditional 2D images, 3D images add an extra dimension to the viewing experience, providing depth and realism that make objects seemingly tangible. This immersive quality allows audiences to engage with content on a whole new level, creating a sense of presence and connection.
                                        </p>
                                        <p className="mb-4">
                                            <span className="h6 font-medium">Versatility in Expression -</span> From architectural renderings to artistic creations, 3D images offer unparalleled versatility in visual expression. Designers, artists, and creators can breathe life into their ideas, showcasing intricate details and subtle nuances that may have been lost in the flat confines of traditional imagery
                                        </p>
                                        <p className="mb-2">
                                            <span className="h6 font-medium">The Future Unveiled -</span> As technology continues to evolve, the possibilities for 3D images are boundless. Augmented and virtual reality are pushing the boundaries even further, promising a future where immersive 3D experiences become an integral part of our daily lives.
                                        </p>
                                        <p className="mb-4">Join us on a journey through the fascinating world of 3D images, where creativity knows no bounds, and the visual landscape is redefined with each pixel. Explore, interact, and be inspired as we delve into the limitless dimensions of this transformative visual medium.</p>
                                        <blockquote className="blockquote relative custom-blockquote success mb-4 text-center bg-success/10 border-s-[2px] border-t-[2px] rounded-[0.3rem] p-4 border-success before:absolute before:content-[\f6b0] before:font-bootstrap before:-top-[1.5rem] before:-start-[0.25rem] before:text-[4rem]">
                                            <h6 className="leading-[1.5]">Unlocking a world beyond dimensions, where pixels dance into reality and imagination takes shape in the ethereal realm of 3D enchantment..</h6>
                                            <footer className="blockquote-footer mt-4 text-[0.875rem] text-textmuted dark:text-textmuted/50 mb-0">Someone famous as <cite title="Source Title">- Maxwell Quasar</cite></footer>
                                            <span className="quote-icon w-[2.5rem] h-[2.5rem] flex items-center justify-center rounded-[3.125rem] absolute -top-4 -end-4 bg-white dark:bg-bodybg"><i className="ri-information-line text-success text-[1.75rem] font-medium"></i></span>
                                        </blockquote>
                                        <p className="mb-0">
                                            From enchanting nature's beauty quotes that evoke visions of lush meadows full of brilliantly-colored flowers or dense forests with sky-high trees to famous quotes about nature's ever-present—and absolutely fundamental—role in our lives, these 101 quotes about nature will have you itching to get off your couch and get outside. For famous <b>quotes about nature</b>, we have them here!
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="xl:col-span-12 col-span-12">
                                <div className="box overflow-hidden">
                                    <div className="box-header">
                                        <div className="box-title">
                                            COMMENTS
                                        </div>
                                    </div>
                                    <div className="box-body !p-0">
                                        <SimpleBar id="blog-details-comment-list">
                                        <ul className="ti-list-group ti-list-group-flush !border-0" >
                                            {comments.map((comment, index) => (
                                                <li key={index} className="ti-list-group-item border-0 border-b text-[0.8125rem]">
                                                    <div className="flex items-start gap-4 flex-wrap">
                                                        <div>
                                                            <span className="avatar avatar-lg avatar-rounded">
                                                                <Image fill src={comment.avatar} alt={comment.username} />
                                                            </span>
                                                        </div>
                                                        <div className="flex-grow w-[50%]">
                                                            <span className="font-medium block mb-1">{comment.username}</span>
                                                            <span className="block mb-3">{comment.comment}</span>
                                                            <div className="btn-list">
                                                                <button className="ti-btn ti-btn-sm ti-btn-soft-primary btn-wave">
                                                                    Reply<i className="ri-reply-line ms-1"></i>
                                                                </button>
                                                                <button className="ti-btn ti-btn-sm ti-btn-soft-secondary btn-wave">
                                                                    Report<i className="ri-error-warning-line ms-1"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="btn-list">
                                                            <button className="ti-btn ti-btn-sm ti-btn-soft-success btn-wave">
                                                                <i className="ri-thumb-up-line"></i>
                                                            </button>
                                                            <button className="ti-btn ti-btn-sm ti-btn-soft-danger btn-wave">
                                                                <i className="ri-thumb-down-line"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                            </SimpleBar>
                                       
                                    </div>
                                </div>
                            </div>
                            <div className="xl:col-span-12 col-span-12">
                                <div className="box">
                                    <div className="box-header">
                                        <div className="box-title">
                                            LEAVE A COMMENT
                                        </div>
                                    </div>
                                    <div className="box-body">
                                        <div className="grid grid-cols-12 sm:gap-x-6 gap-y-4">
                                            <div className="xl:col-span-6 col-span-12">
                                                <label htmlFor="blog-first-name" className="ti-form-label">First Name</label>
                                                <input type="text" className="form-control" id="blog-first-name" placeholder="Enter Name" />
                                            </div>
                                            <div className="xl:col-span-6 col-span-12">
                                                <label htmlFor="blog-last-name" className="ti-form-label">Last Name</label>
                                                <input type="text" className="form-control" id="blog-last-name" placeholder="Enter Name" />
                                            </div>
                                            <div className="xl:col-span-12 col-span-12">
                                                <label htmlFor="blog-email" className="ti-form-label">Email ID</label>
                                                <input type="text" className="form-control" id="blog-email" placeholder="Enter Email" />
                                            </div>
                                            <div className="xl:col-span-12 col-span-12">
                                                <label htmlFor="blog-comment" className="ti-form-label">Write Comment</label>
                                                <textarea className="form-control" id="blog-comment" rows={5}></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-footer">
                                        <div className="text-end">
                                            <button className="ti-btn ti-btn-soft-primary">Post Comment</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="xl:col-span-4 col-span-12">
                        <div className="grid grid-cols-12 gap-x-6">
                            <div className="xl:col-span-12 col-span-12">
                                <div className="box overflow-hidden">
                                    <div className="box-header justify-between">
                                        <div className="box-title">
                                            RECENT POSTS
                                        </div>
                                        <Link scroll={false} href="#!" className="text-[0.75rem] text-textmuted dark:text-textmuted/50"> View All<i className="ti ti-arrow-narrow-right ms-1"></i> </Link>
                                    </div>
                                    <div className="box-body !p-0">
                                        <ul className="ti-list-group ti-list-group-flush">
                                            {RecentPosts.map((idx) => (
                                                <li key={idx.id} className="ti-list-group-item">
                                                    <div className="flex gap-4 flex-wrap items-center">
                                                        <span className="avatar avatar-xl">
                                                            <Image fill src={idx.avatar} className="img-fluid" alt={idx.category} />
                                                        </span>
                                                        <div className="flex-grow">
                                                            <Link scroll={false} href="#!" className={`text-[0.875rem] mb-0 ${idx.categoryClass}`}>
                                                                {idx.category}
                                                            </Link>
                                                            <p className="mb-1 popular-blog-content text-truncate font-medium">
                                                                {idx.content}
                                                            </p>
                                                            <span className="text-textmuted dark:text-textmuted/50 text-[0.75rem]">
                                                                {idx.date}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <button className="ti-btn ti-btn-icon ti-btn-light ti-btn-sm rtl:!rotate-180 inline-flex">
                                                                <i className="ri-arrow-right-s-line"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="xl:col-span-12 col-span-12">
                                <div className="box !bg-primary/[0.15] border-0 shadow-none">
                                    <div className="box-body !p-6">
                                        <div className="text-center">
                                            <div className="input-group mb-3">
                                                <input type="text" className="form-control border-0 shadow-none" placeholder="Email Here" aria-label="blog-email" aria-describedby="blog-subscribe" />
                                                <button className="ti-btn ti-btn-primary !m-0 btn-wave" type="button" id="blog-subscribe">Subscribe</button>
                                            </div>
                                            <label className="form-check-label">
                                                Subscribe to get updates about latest News & Posts
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="xl:col-span-12 col-span-12">
                                <div className="box">
                                    <div className="box-header">
                                        <div className="box-title">
                                            EXPLORE TOPICS
                                        </div>
                                    </div>
                                    <div className="box-body">
                                        <ul className="ti-list-group">
                                            {ExploreTopics.map((idx) => (
                                                <li key={idx.id} className="ti-list-group-item">
                                                    <Link scroll={false} href="#!">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center">
                                                                <div>
                                                                    <span className="avatar avatar-xs bg-light text-default border dark:border-defaultborder/10 avatar-rounded">
                                                                        {idx.id}
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <span className="font-medium ms-2">{idx.name}</span>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <span className={`badge bg-${idx.badgeColor} !rounded-full text-white`}>
                                                                    {idx.badgeCount}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="xl:col-span-12 col-span-12">
                                <div className="box">
                                    <div className="box-header">
                                        <div className="box-title">
                                            POPULAR TAGS
                                        </div>
                                    </div>
                                    <div className="box-body">
                                        <div className="blog-popular-tags">
                                            {PopulatTags.map((idx, index) => (
                                                <Link scroll={false} href="#!" key={index}>
                                                    <span className="badge bg-light text-textmuted dark:text-textmuted/50 me-1">{idx}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="xl:col-span-12 col-span-12">
                                <div className="box">
                                    <div className="box-header">
                                        <div className="box-title">
                                            GALLERY
                                        </div>
                                    </div>
                                    <div className="box-body">
                                        <BlogGallerylist />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!--End::row-1 --> */}
            </div>
        </Fragment>
    );
};

export default BlogDetails;