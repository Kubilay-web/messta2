"use client"
import { SearchGallerylist } from "@/shared/data/pages/search-gallerydata";
import { BooksTabData, NewsTabdata, VideosTabdata } from "@/shared/data/pages/searchdata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

const Search = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Search" />
            <Pageheader Heading="Search" breadcrumbs={['Pages']} currentpage="Search" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box overflow-hidden">
                        <div className="box-body !p-0">
                            <div className="input-group p-4">
                                <input type="text" className="form-control !border-s form-control-lg"
                                    placeholder="Search Here ..." aria-label="Search Here ..."
                                    aria-describedby="button-addon1" />
                                <button className="ti-btn ti-btn-primary !m-0 btn-wave" type="button" id="button-addon1">Search</button>
                            </div>
                            <div className="flex items-center justify-between gap-4 p-2 !flex-wrap">
                                <nav className="-mb-0.5 flex gap-x-6 !flex-wrap" role="tablist">
                                    <Link scroll={false} className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-2 inline-flex items-center gap-2 border-b-[2px] border-transparent text-sm whitespace-nowrap  text-textmuted dark:text-textmuted/50 hover:text-primary active"
                                        href="#!" id="search-1" data-hs-tab="#search1"
                                        aria-controls="search1"> <i className="ri-search-line me-2 text-primary"></i>
                                        All
                                    </Link>
                                    <Link scroll={false} className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-2 inline-flex items-center gap-2 border-b-[2px] border-transparent text-sm whitespace-nowrap  text-textmuted dark:text-textmuted/50 hover:text-primary"
                                        href="#!" id="search-2" data-hs-tab="#search2"
                                        aria-controls="search2"> <i className="ri-image-line me-2 text-secondary"></i>
                                        Images
                                    </Link>
                                    <Link scroll={false} className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-2 inline-flex items-center gap-2 border-b-[2px] border-transparent text-sm whitespace-nowrap  text-textmuted dark:text-textmuted/50 hover:text-primary"
                                        href="#!" id="search-3" data-hs-tab="#search3"
                                        aria-controls="search3"> <i className="ri-book-line me-2 text-success"></i>
                                        Books
                                    </Link>
                                    <Link scroll={false} className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-2 inline-flex items-center gap-2 border-b-[2px] border-transparent text-sm whitespace-nowrap  text-textmuted dark:text-textmuted/50 hover:text-primary"
                                        href="#!" id="search-4" data-hs-tab="#search4"
                                        aria-controls="search4"> <i
                                            className="ri-newspaper-line me-2 text-orangemain"></i> News
                                    </Link>
                                    <Link scroll={false} className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-2 inline-flex items-center gap-2 border-b-[2px] border-transparent text-sm whitespace-nowrap  text-textmuted dark:text-textmuted/50 hover:text-primary"
                                        href="#!" id="search-5" data-hs-tab="#search5"
                                        aria-controls="search5"> <i className="ri-live-line me-2 text-warning"></i>
                                        Vidoes
                                    </Link>
                                </nav>
                                <div className="text-textmuted dark:text-textmuted/50 me-2 p-2">About 12,546,90000 results (0.56 Seconds)</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}

            {/* <!-- Start:: row-2 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="tab-content">
                        <div className="tab-pane p-0 border-0 show active" id="search1" aria-labelledby="search-1" role="tabpanel">
                            <div className="box overflow-hidden">
                                <div className="box-body !p-0">
                                    <ul className="ti-list-group ti-list-group-flush">
                                        <li className="ti-list-group-item !p-[0.8rem]">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <div className="mb-2">
                                                        <span className="block font-medium"><Link
                                                            href="#!">Best Tech
                                                            Gadgets</Link> </span>
                                                        <Link scroll={false} href="#!" className="text-success">
                                                            http://www.besttechgadgets.com</Link>
                                                    </div>
                                                    <div className="mb-2">
                                                        <h6 className="font-semibold mb-1"><Link scroll={false} href="#!"
                                                            className="searched-item-main-link">Explore the Latest
                                                            and Greatest Tech Gadgets</Link></h6>
                                                        <span
                                                            className="block text-textmuted dark:text-textmuted/50">Discover
                                                            cutting-edge
                                                            technology and must-have gadgets. Stay ahead in the tech
                                                            world with our carefully curated list of innovative
                                                            devices.</span>
                                                    </div>
                                                    <div className="flex items-center gap-4 flex-wrap">
                                                        <Link scroll={false} href="#!" className="text-primary underline-offset-2  underline">Shop  Now</Link>
                                                        <Link scroll={false} href="#!" className="text-primary underline-offset-2   underline">Top 10 Picks</Link>
                                                    </div>
                                                </div>
                                                <div className="ti-dropdown hs-dropdown">
                                                    <Link scroll={false} aria-label="anchor" href="#!" data-bs-toggle="dropdown">
                                                        <i className="ri-more-2-fill text-[1.25rem] text-textmuted dark:text-textmuted/50"></i>
                                                    </Link>
                                                    <ul className="ti-dropdown-menu hs-dropdown-menu hidden" role="menu">
                                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Week</Link></li>
                                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Day</Link></li>
                                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Year</Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="ti-list-group-item !p-[0.8rem]">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <div className="mb-2">
                                                        <span className="block font-medium"><Link scroll={false} href="#!">Healthy Recipes Hub</Link></span>
                                                        <Link scroll={false} href="#!" className="text-success">http://www.healthyrecipeshub.com</Link>
                                                    </div>
                                                    <div className="mb-2">
                                                        <h6 className="font-semibold mb-1">
                                                            <Link scroll={false} href="#!" className="searched-item-main-link">Wholesome and Delicious Recipes for a Healthy Lifestyle</Link>
                                                        </h6>
                                                        <span className="block text-textmuted dark:text-textmuted/50">Find
                                                            a variety of
                                                            nutritious recipes to support your well-being. From
                                                            breakfast to dinner, we have a collection of tasty meals
                                                            that prioritize your health.</span>
                                                    </div>
                                                    <div className="flex items-center gap-4 flex-wrap">
                                                        <Link scroll={false} href="#!" className="text-primary link-offset-2   underline">Browse Recipes</Link>
                                                        <Link scroll={false} href="#!" className="text-primary link-offset-2   underline">Nutrition Tips</Link>
                                                    </div>
                                                </div>
                                                <div className="ti-dropdown hs-dropdown">
                                                    <Link scroll={false} aria-label="anchor" href="#!" data-bs-toggle="dropdown">
                                                        <i className="ri-more-2-fill text-[1.25rem] text-textmuted dark:text-textmuted/50"></i>
                                                    </Link>
                                                    <ul className="ti-dropdown-menu hs-dropdown-menu hidden" role="menu">
                                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Week</Link></li>
                                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Day</Link></li>
                                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Year</Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="ti-list-group-item !p-[0.8rem]">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <div className="mb-2">
                                                        <span className="block font-medium"><Link scroll={false} href="#!">Travel Explorer</Link></span>
                                                        <Link scroll={false} href="#!" className="text-success">http://www.travelexplorer.com</Link>
                                                    </div>
                                                    <div className="mb-2">
                                                        <h6 className="font-semibold mb-1">
                                                            <Link scroll={false} href="#!" className="searched-item-main-link">Embark on Unforgettable Journeys Around the Globe</Link>
                                                        </h6>
                                                        <span className="block text-textmuted dark:text-textmuted/50">Plan
                                                            your next adventure
                                                            with Travel Explorer. Discover hidden gems, travel tips,
                                                            and amazing destinations to create memories that last a
                                                            lifetime.
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-4 flex-wrap">
                                                        <Link scroll={false} href="#!" className="text-primary link-offset-2   underline">Explore Destinations</Link>
                                                        <Link scroll={false} href="#!" className="text-primary link-offset-2   underline">Travel  Guides</Link>
                                                    </div>
                                                </div>
                                                <div className="ti-dropdown hs-dropdown">
                                                    <Link scroll={false} aria-label="anchor" href="#!" data-bs-toggle="dropdown">
                                                        <i className="ri-more-2-fill text-[1.25rem] text-textmuted dark:text-textmuted/50"></i>
                                                    </Link>
                                                    <ul className="ti-dropdown-menu hs-dropdown-menu hidden"
                                                        role="menu">
                                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Week</Link></li>
                                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Day</Link></li>
                                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Year</Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="ti-list-group-item !p-[0.8rem]">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <div className="mb-2">
                                                        <span className="block font-medium"><Link scroll={false} href="#!">Nature Photography Bliss</Link></span>
                                                        <Link scroll={false} href="#!" className="text-success">http://www.natureblissphotos.com</Link>
                                                    </div>
                                                    <div className="mb-2">
                                                        <span className="mb-2 block"><Link scroll={false} href="#!" className="font-medium">Search Related Images :</Link></span>
                                                        <div className="flex items-start gap-4 flex-wrap">
                                                            <div>
                                                                <figure className="figure">
                                                                    <Link scroll={false} className=" custom-img avatar avatar-search" href="#!">
                                                                        <Image fill className="img-fluid rounded card-img" src="../../assets/images/media/media-59.jpg" alt="..." />
                                                                    </Link>
                                                                    <Link scroll={false} href="#!" className="block">
                                                                        Natural Serenity
                                                                    </Link>
                                                                </figure>
                                                            </div>
                                                            <div>
                                                                <figure className="figure">
                                                                    <Link scroll={false} className=" custom-img avatar avatar-search" href="#!">
                                                                        <Image fill className="img-fluid rounded card-img" src="../../assets/images/media/media-60.jpg" alt="..." />
                                                                    </Link>
                                                                    <Link scroll={false} href="#!" className="block">
                                                                        Active Living
                                                                    </Link>
                                                                </figure>
                                                            </div>
                                                            <div>
                                                                <figure className="figure">
                                                                    <Link scroll={false} className=" custom-img avatar avatar-search" href="#!">
                                                                        <Image fill className="img-fluid rounded card-img" src="../../assets/images/media/media-61.jpg" alt="..." />
                                                                    </Link>
                                                                    <Link scroll={false} href="#!" className="block">
                                                                        Creative Elegance
                                                                    </Link>
                                                                </figure>
                                                            </div>
                                                            <div>
                                                                <figure className="figure">
                                                                    <Link scroll={false} href="#!" className="avatar px-[2rem] !rounded-sm avatar-search font-medium !bg-primary/[0.15] text-primary">
                                                                        View All <i className="ti ti-arrow-narrow-right text-primary ms-2"></i>
                                                                    </Link>
                                                                </figure>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="ti-dropdown hs-dropdown">
                                                    <Link scroll={false} aria-label="anchor" href="#!" ata-bs-toggle="dropdown">
                                                        <i className="ri-more-2-fill text-[1.25rem] text-textmuted dark:text-textmuted/50"></i>
                                                    </Link>
                                                    <ul className="ti-dropdown-menu hs-dropdown-menu hidden" role="menu">
                                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Week</Link></li>
                                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Day</Link></li>
                                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Year</Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="ti-list-group-item !p-[0.8rem]">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <div className="mb-2">
                                                        <span className="block font-medium"><Link scroll={false} href="#!">Fashion Finds</Link></span>
                                                        <Link scroll={false} href="#!" className="text-success">http://www.fashionfinds.com</Link>
                                                    </div>
                                                    <div className="mb-2">
                                                        <h6 className="font-semibold mb-1"><Link scroll={false} href="#!" className="searched-item-main-link">Elevate Your Style  with the Latest Fashion Trends</Link></h6>
                                                        <span
                                                            className="block text-textmuted dark:text-textmuted/50">Stay
                                                            in vogue with
                                                            Fashion Finds. Explore a curated selection of clothing,
                                                            accessories, and style tips to express your unique
                                                            fashion sense.</span>
                                                    </div>
                                                    <div className="flex items-center gap-4 flex-wrap">
                                                        <Link scroll={false} href="#!" className="text-primary link-offset-2   underline">Shop Now</Link>
                                                        <Link scroll={false} href="#!" className="text-primary link-offset-2   underline">Trend Alerts</Link>
                                                    </div>
                                                </div>
                                                <div className="ti-dropdown hs-dropdown">
                                                    <Link scroll={false} aria-label="anchor" href="#!" data-bs-toggle="dropdown">
                                                        <i className="ri-more-2-fill text-[1.25rem] text-textmuted dark:text-textmuted/50"></i>
                                                    </Link>
                                                    <ul className="ti-dropdown-menu hs-dropdown-menu hidden" role="menu">
                                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Week</Link></li>
                                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Day</Link></li>
                                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Year</Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="ti-list-group-item !p-[0.8rem]">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <div className="mb-2">
                                                        <span className="block font-medium"><Link scroll={false} href="#!">Science Fiction Book Haven</Link> </span>
                                                        <Link scroll={false} href="#!" className="text-success">http://www.sci-fibooks.com</Link> 
                                                    </div>
                                                    <div className="mb-2">
                                                        <h6 className="font-semibold mb-1"><Link scroll={false} href="#!" className="searched-item-main-link">Journey to Other
                                                            Worlds with the Best Science Fiction Books</Link> </h6>
                                                        <span className="block text-textmuted dark:text-textmuted/50">Dive
                                                            into the realms of
                                                            imagination with our collection of mind-bending science
                                                            fiction novels. Embark on epic adventures beyond the
                                                            stars.
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-4 flex-wrap">
                                                        <Link scroll={false} href="#!" className="text-primary link-offset-2   underline">Explore Books</Link> 
                                                        <Link scroll={false} href="#!" className="text-primary link-offset-2   underline">Author Interviews</Link> 
                                                    </div>
                                                </div>
                                                <div className="ti-dropdown hs-dropdown">
                                                    <Link scroll={false} aria-label="anchor" href="#!" data-bs-toggle="dropdown">
                                                        <i className="ri-more-2-fill text-[1.25rem] text-textmuted dark:text-textmuted/50"></i>
                                                    </Link> 
                                                    <ul className="ti-dropdown-menu hs-dropdown-menu hidden" role="menu">
                                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Week</Link> </li>
                                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Day</Link> </li>
                                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Year</Link> </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <ul className="ti-pagination justify-end mb-4">
                                <li className="page-item disabled"><Link href="#!" scroll={false} className="page-link bg-white dark:bg-bodybg ">Previous</Link> </li>
                                <li className="page-item "><Link scroll={false} className="page-link bg-white dark:bg-bodybg" href="#!">1</Link> </li>
                                <li className="page-item "><Link scroll={false} className="page-link bg-white dark:bg-bodybg" href="#!">2</Link> </li>
                                <li className="page-item "><Link scroll={false} className="page-link bg-white dark:bg-bodybg" href="#!">3</Link> </li>
                                <li className="page-item "><Link scroll={false} className="page-link bg-white dark:bg-bodybg" href="#!">Next</Link> </li>
                            </ul>
                        </div>
                        <div className="tab-pane border-0 p-0 hidden" id="search2" aria-labelledby="search-2" role="tabpanel">
                            <div className="box">
                                <div className="box-body !b-0">
                                    <SearchGallerylist />
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane border-0 p-0 hidden" id="search3" aria-labelledby="search-3"
                            role="tabpanel">
                            <div className="box">
                                <div className="box-body">
                                    <div className="grid grid-cols-12 sm:gap-x-6">
                                        {BooksTabData.map((idx) => (
                                            <div className="xl:col-span-6 col-span-12" key={idx.id}>
                                                <div className="box shadow-none">
                                                    <div className="box-body">
                                                        <div className="flex items-start flex-wrap gap-4 justify-between">
                                                            <div className="flex items-center">
                                                                <div>
                                                                    <span
                                                                        className="avatar avatar-lg avatar-rounded bg-primary/10 border dark:border-defaultborder/10">
                                                                        <Image fill src={idx.src} alt="" />
                                                                    </span>
                                                                </div>
                                                                <div className="ms-2">
                                                                    <h6 className="font-medium mb-0 flex items-center">
                                                                        <Link scroll={false} href="#!">{idx.title}</Link> 
                                                                    </h6>
                                                                    <Link scroll={false} href="#!">{idx.author}</Link> 
                                                                </div>
                                                            </div>
                                                            <div className="btn-list">
                                                                <div className="hs-tooltip ti-main-tooltip me-1">
                                                                    <Link scroll={false} href="#!" className="ti-btn ti-btn-sm ti-btn-icon ti-btn-light hs-tooltip-toggle">
                                                                        <i className="ri-heart-3-fill align-middle text-textmuted dark:text-textmuted/50"></i>
                                                                        <span className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !font-medium !text-white shadow-sm !rounded-sm" role="tooltip">
                                                                            Add to favourite
                                                                        </span>
                                                                    </Link> 
                                                                </div>
                                                                <div className="hs-tooltip ti-main-tooltip">
                                                                    <Link scroll={false} href="#!" className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-warning hs-tooltip-toggle">
                                                                        <i className="ri-star-fill"></i>
                                                                        <span className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !font-medium !text-white shadow-sm !rounded-sm" role="tooltip">
                                                                            Featured Book
                                                                        </span>
                                                                    </Link> 
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="popular-tags my-3">
                                                            {idx.tags.map((badge, index) => (
                                                                <Link scroll={false} href="#!" className="badge rounded-pill bg-light text-default !me-1" key={index} >{badge}</Link> 
                                                            ))}
                                                        </div>
                                                        <div className="flex justify-between flex-wrap gap-2">
                                                            <div>
                                                                <span className="text-textmuted dark:text-textmuted/50">Published On</span> -
                                                                <span className="font-medium mb-0"> {idx.publishDate}</span>
                                                            </div>
                                                            <Link scroll={false} href="#!" className="text-primary font-semibold text-[0.875rem]">
                                                                Preview <i className="fe fe-arrow-right"></i>
                                                            </Link> 
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="xl:col-span-12 col-span-12 mb-6 text-center">
                                            <button type="button" className="ti-btn bg-info/10 text-info ti-btn-loader">
                                                <span className="me-2">Loading</span> <span className="loading"><i
                                                    className="ri-loader-4-line text-[1rem] animate-spin"></i></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane border-0 p-0 hidden" id="search4" aria-labelledby="search-4"
                            role="tabpanel">
                            <div className="box">
                                <div className="box-body !p-0">
                                    <ul className="ti-list-group ti-list-group-flush">
                                        {NewsTabdata.map((idx) => (
                                            <li className="ti-list-group-item !p-[0.8rem]" key={idx.id}>
                                                <Link scroll={false} href="#!" className="stretched-link"></Link> 
                                                <div className="mb-1">
                                                    <span className="h6 font-semibold text-primary">{idx.title}</span>
                                                </div>
                                                <span className="text-textmuted dark:text-textmuted/50">{idx.description} </span>
                                                <span className="block mt-2">{idx.date}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <ul className="ti-pagination justify-end mb-4">
                                <li className="page-item disabled">
                                    <Link href="#!" scroll={false} className="page-link  bg-white dark:bg-bodybg">Previous</Link> 
                                </li>
                                <li className="page-item"><Link scroll={false} className="page-link  bg-white dark:bg-bodybg" href="#!">1</Link> </li>
                                <li className="page-item"><Link scroll={false} className="page-link  bg-white dark:bg-bodybg" href="#!">2</Link> </li>
                                <li className="page-item"><Link scroll={false} className="page-link  bg-white dark:bg-bodybg" href="#!">3</Link> </li>
                                <li className="page-item">
                                    <Link scroll={false} className="page-link  bg-white dark:bg-bodybg" href="#!">Next</Link> 
                                </li>
                            </ul>
                        </div>
                        <div className="tab-pane border-0 p-0 hidden" id="search5" aria-labelledby="search-5" role="tabpanel">
                            <div className="box">
                                <div className="box-body !pb-0">
                                    <div className="grid grid-cols-12 sm:gap-x-6 gap-y-6">
                                        {VideosTabdata.map((idx) => (
                                            <div className="xxl:col-span-3 xl:col-span-4 md:col-span-6 sm:col-span-6 col-span-12" key={idx.id}>
                                                <div className="ratio aspect-video">
                                                    <iframe
                                                        src={idx.videoUrl}
                                                        title="YouTube video player"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                        allowFullScreen>

                                                    </iframe>
                                                </div>
                                                <div className="p-2">
                                                    <div className="flex items-center gap-1">
                                                        <div className="figure-caption text-[0.8125rem] font-medium text-default text-truncate">
                                                            {idx.title}
                                                        </div>
                                                    </div>
                                                    <Link scroll={false} href={idx.demoUrl} target="_blank" className="text-[0.75rem] text-primary underline">{idx.demoUrl}</Link> 
                                                </div>
                                            </div>
                                        ))}
                                        <div className="xl:col-span-12 col-span-12 mb-6 text-center">
                                            <button type="button" className="ti-btn bg-info/10 text-info ti-btn-loader">
                                                <span className="me-2">Loading</span> <span className="loading"><i
                                                    className="ri-loader-4-line text-[1rem] animate-spin"></i></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End:: row-2 --> */}

        </Fragment>
    );
};

export default Search;