"use client"
import SpkBlogcards from "@/shared/@spk-reusable-components/pages/SpkBlogcards";
import SpkSwiperJs from "@/shared/@spk-reusable-components/spk-packages/spk-swiperjs";
import { Basicdata, BlogData, BlogPosts, blogPosts, Categories, RecentPosts, tags } from "@/shared/data/pages/blog/blogdata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

const Blog = () => {

    return (
        <Fragment>
            <div className="container-fluid">
                {/* <!-- Page Header --> */}
                <Seo title="Blog" />
                <Pageheader Heading="Blog" breadcrumbs={['Pages', ' Blog']} currentpage="Blog" />
                {/* <!-- Page Header Close --> */}

                {/* <!-- Start:: row-1 --> */}
                <div className="grid grid-cols-12 gap-x-6">
                    <div className="xl:col-span-5 col-span-12">
                        <div className="box overflow-hidden">
                            <div className="box-body !p-0">
                                <SpkSwiperJs effect={"fade"} slides={Basicdata} spaceBetween={30} autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                }} className="mySwiper mySwiper8" />

                                <div className="p-6">
                                    <h5 className="font-semibold mb-3"><Link href="/pages/blog/blog-details/">The Basics of 3D
                                        Imaging</Link></h5>
                                    <p className="mb-4">To kick things off, let's delve into the basics. Unlike
                                        traditional 2D images, 3D images add an extra dimension – depth. This depth
                                        is achieved by representing objects in three axes: width, height, and depth.
                                        It's this added dimension that tricks our brains into perceiving depth and
                                        realism. <Link scroll={false} href="#!"
                                            className="font-medium text-textmuted dark:text-textmuted/50 ms-2 align-middle text-[0.75rem] text-Augoration-underline">Read
                                            More</Link></p>
                                    <div className="flex flex-wrap items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="avatar avatar-xs avatar-rounded me-2 relative">
                                                <Image fill src="../../../assets/images/faces/11.jpg" alt="" />
                                            </div>
                                            <div>
                                                <p className="mb-0 font-medium">Alister Chuk</p>
                                            </div>
                                        </div>
                                        <p className="text-textmuted dark:text-textmuted/50 text-[0.75rem] mb-0">18,Aug 2024 - 11:25</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="xl:col-span-7 col-span-12">
                        <div className="grid grid-cols-12 gap-x-6">
                            <div className="xl:col-span-8 col-span-12">
                                {blogPosts.map((idx) => (
                                    <div className="box shadow-none" key={idx.id}>
                                        <div className="grid grid-cols-12">
                                            <div className="sm:col-span-9 xl:col-span-8 col-span-12">
                                                <div className="box-body">
                                                    <h6 className="font-semibold mb-2">
                                                        <Link scroll={false} href="#!">{idx.title}</Link>
                                                    </h6>
                                                    <span className="block mb-4">{idx.description} <Link scroll={false} href="#!"
                                                        className="font-medium text-textmuted dark:text-textmuted/50 ms-2 align-middle text-[0.75rem] text-Augoration-underline">
                                                        Read More
                                                    </Link>
                                                    </span>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <div className="avatar  avatar-xs avatar-rounded me-2 shrink-0 relative">
                                                                <Image fill src={idx.avatarSrc} alt="" />
                                                            </div>
                                                            <div>
                                                                <p className="mb-0 font-medium">{idx.author}</p>
                                                            </div>
                                                        </div>
                                                        <div className="text-textmuted dark:text-textmuted/50 text-[0.75rem] mb-0 ms-1">{idx.date}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="sm:col-span-3 xl:col-span-4 col-span-12 custom-img relative">
                                                <Image fill src={idx.imageSrc} className="img-fluid !rounded-tr-md !rounded-br-md h-full w-full" alt="..." />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="xl:col-span-4 col-span-12">
                                <div className="box overflow-hidden">
                                    <div className="box-header">
                                        <div className="box-title">
                                            CATEGORIES
                                        </div>
                                    </div>
                                    <div className="box-body !p-0">
                                        <ul className="ti-list-group ti-list-group-flush list-style">
                                            {Categories.map((idx) => (
                                                <li className="ti-list-group-item" key={idx.count}>
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-medium me-1">{idx.name}</span>
                                                        <span className="badge bg-primary/[0.15] text-primary !rounded-full">{idx.count}</span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="box">
                                    <div className="box-header">
                                        <div className="box-title">
                                            POPULAR TAGS
                                        </div>
                                    </div>
                                    <div className="box-body !py-6">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            {tags.map((idx, index) => (
                                                <span key={index} className="badge bg-light text-default border border-defaultborder dark:border-defaultborder/10" >
                                                    {idx}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {BlogPosts.map((card: any, index: any) => (
                        <div key={index} className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                            <SpkBlogcards card={card} />
                        </div>
                    ))}

                </div>
                {/* <!-- End:: row-1 --> */}

                {/* <!-- Start::row-2 --> */}
                <div className="grid grid-cols-12 gap-x-6">
                    <div className="xl:col-span-12 col-span-12">
                        <div className="grid grid-cols-12 gap-x-6">
                            <div className="xl:col-span-6 xxl:col-span-8 lg:col-span-12 md:col-span-12 col-span-12">
                                <div className="grid grid-cols-12 gap-x-6">
                                    {BlogData.map((card: any, index: any) => (
                                        <div key={index} className="xxl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 col-span-12">
                                            <SpkBlogcards card={card} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="xl:col-span-6 xxl:col-span-4 lg:col-span-12 md:col-span-12 col-span-12">
                                <div className="box overflow-hidden">
                                    <div className="box-header flex items-center justify-between">
                                        <div className="box-title">
                                            FEATURED BLOGS
                                        </div>
                                        <div>
                                            <span className="badge bg-primary/[0.15] text-primary">32 Blogs</span>
                                        </div>
                                    </div>
                                    <div className="box-body !p-0">
                                        <ul className="ti-list-group ti-list-group-flush">
                                            {RecentPosts.map((idx) => (
                                                <li key={idx.id} className={`ti-list-group-item ${idx.id === RecentPosts.length ? 'border-bottom-0' : ''}`}>
                                                    <div className="flex flex-wrap items-center gap-4">
                                                        <span className="avatar avatar-xl">
                                                            <Image fill src={idx.avatar} className="img-fluid" alt={idx.name} />
                                                        </span>
                                                        <div className="flex-grow">
                                                            <Link scroll={false} href="#!" className="text-[0.875rem] font-medium mb-0">{idx.name}</Link>
                                                            <p className="mb-1 popular-blog-content truncate">{idx.content}</p>
                                                            <span className="text-textmuted dark:text-textmuted/50 text-[0.6875rem]">{idx.date}</span>
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
                        </div>
                        <div className="mb-4 text-center">
                            <button className="ti-btn ti-btn-soft-primary" type="button" disabled>
                                Older Blogs <span className="ti-spinner  !w-[0.75rem] !h-[0.75rem] align-middle" role="status" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                </div>
                {/* <!--End::row-2 --> */}
            </div>
        </Fragment>
    );
};

export default Blog;