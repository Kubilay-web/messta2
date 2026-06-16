"use client"
import { Ecommerceproducts } from "@/shared/data/apps/ecommers/customer/reduxdata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import { addToCart, removeFromWishlist } from "@/shared/redux/action";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const Wishlist = () => {
    const reduxWishlist = useSelector((state: any) => state.reducer.wishlist);
    const [localWishlist, setLocalWishlist] = useState(Ecommerceproducts);
    const Wishlistdata = [...localWishlist, ...reduxWishlist];

    const cart = useSelector((state: any) => state.reducer.cart);
    const products = useSelector((state: any) => state.reducer.products);


    const dispatch = useDispatch();

    const handleClick = (id: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(id);
                console.log("delete")
            }
            else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'Your file is safe :)', 'error');
            }
        });
    };


    const handleDelete = (id: string) => {
        setLocalWishlist(localWishlist.filter((item: { id: any; }) => item.id !== id));
        dispatch(removeFromWishlist(id));
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
    };



    const allIds = [...cart.map((item: { id: any; }) => item.id), ...products.map((item: { id: any; }) => item.id)];
    const nextId = allIds.length ? Math.max(...allIds) + 1 : 1;

    const handleAddToCart = (item: any) => {
        dispatch(addToCart({ ...item, id: nextId }));
    };

    return (
        <Fragment>

            {/* Start:: Breadcrumb*/}
            <div className="border-b border-defaultborder dark:border-defaultborder/10 py-4 page-breadcrumb">
                <div className="container">
                    {/* Page Header */}
                    <Seo title={"Wishlist"} />
                    <Pageheader Updated={true} breadcrumbs={['Apps', 'Ecommerce', 'Customer']} currentpage="Wishlist" />
                    {/* Page Header Close */}
                </div>
            </div>
            {/* End:: Breadcrumb*/}

            {/* <!-- Start:: Section-1 --> */}
            <section className="section !py-4">
                <div className="container">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xl:col-span-3 col-span-12">
                            <div className="box">
                                <div className="sm:flex items-start p-4">
                                    <div>
                                        <span className="avatar avatar-lg avatar-rounded online me-3">
                                            <Image fill src="../../../assets/images/faces/9.jpg" alt="" />
                                        </span>
                                    </div>
                                    <div className="main-profile-info flex-fill">
                                        <div className="font-semibold mb-1 h6">Jack Miller <div className="hs-tooltip ti-main-tooltip">
                                            <Link href="#!" className="p-1 hs-tooltip-toggle">
                                                <i className="bi bi-check-circle-fill text-success text-[0.875rem]"></i>
                                                <span
                                                    className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !font-medium !text-white shadow-sm !rounded-sm"
                                                    role="tooltip">
                                                    Verified User
                                                </span>
                                            </Link>
                                        </div></div>
                                        <p className="mb-0">Member Since 2005</p>
                                    </div>
                                </div>
                            </div>
                            <div className="box overflow-hidden">
                                <div className="box-body !p-0">
                                    <nav className="nav nav-tabs flex !flex-col candidateprofile-nav">
                                        <Link scroll={false} className="nav-link" href="/ecommerce/customer/customer">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                                                <rect width="256" height="256" fill="none" />
                                                <rect x="32" y="72" width="192" height="136" rx="8" opacity="0.2" />
                                                <rect x="32" y="72" width="192" height="136" rx="8" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16" />
                                                <path d="M88,96V64a40,40,0,0,1,80,0V96" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16" />
                                            </svg>My Orders</Link>
                                        <Link scroll={false} className="nav-link active" href="/ecommerce/customer/wishlist">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                                                <rect width="256" height="256" fill="none" />
                                                <path
                                                    d="M128,224S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32a54,54,0,0,1,54,54C232,168,128,224,128,224Z"
                                                    opacity="0.2" />
                                                <path
                                                    d="M128,224S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32a54,54,0,0,1,54,54C232,168,128,224,128,224Z"
                                                    fill="none" stroke="currentColor" strokeLinecap="round"
                                                    strokeLinejoin="round" strokeWidth="16" />
                                            </svg>My Wishlist</Link>
                                        <Link scroll={false} className="nav-link" href="/ecommerce/customer/order-tracking">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                                                <rect width="256" height="256" fill="none" />
                                                <circle cx="200" cy="200" r="24" opacity="0.2" />
                                                <circle cx="200" cy="200" r="24" fill="none" stroke="currentColor"
                                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                                                <path d="M72,56h96a32,32,0,0,1,0,64H72a40,40,0,0,0,0,80H176" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16" />
                                            </svg>Order Tracking</Link>
                                        <Link scroll={false} className="nav-link" href="/ecommerce/customer/refunds">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                                                <rect width="256" height="256" fill="none" />
                                                <path d="M128,128h24a40,40,0,0,1,0,80H128Z" opacity="0.2" />
                                                <path d="M128,48H112a40,40,0,0,0,0,80h16Z" opacity="0.2" />
                                                <line x1="128" y1="24" x2="128" y2="48" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16" />
                                                <line x1="128" y1="208" x2="128" y2="232" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16" />
                                                <path
                                                    d="M184,88a40,40,0,0,0-40-40H112a40,40,0,0,0,0,80h40a40,40,0,0,1,0,80H104a40,40,0,0,1-40-40"
                                                    fill="none" stroke="currentColor" strokeLinecap="round"
                                                    strokeLinejoin="round" strokeWidth="16" />
                                            </svg>Refunds</Link>
                                        <Link scroll={false} className="nav-link" href="/ecommerce/customer/address">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                                                <rect width="256" height="256" fill="none" />
                                                <path
                                                    d="M208,32H64a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V40A8,8,0,0,0,208,32ZM136,144a32,32,0,1,1,32-32A32,32,0,0,1,136,144Z"
                                                    opacity="0.2" />
                                                <circle cx="136" cy="112" r="32" fill="none" stroke="currentColor"
                                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                                                <line x1="32" y1="72" x2="56" y2="72" fill="none" stroke="currentColor"
                                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                                                <line x1="32" y1="128" x2="56" y2="128" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16" />
                                                <line x1="32" y1="184" x2="56" y2="184" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16" />
                                                <path d="M88,168a60,60,0,0,1,96,0" fill="none" stroke="currentColor"
                                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                                                <rect x="40" y="48" width="192" height="160" rx="8"
                                                    transform="translate(264 -8) rotate(90)" fill="none"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="16" />
                                            </svg>Address Book</Link>
                                        <Link scroll={false} className="nav-link" href="/ecommerce/customer/settings/">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                                                <rect width="256" height="256" fill="none" />
                                                <path
                                                    d="M230.1,108.76,198.25,90.62c-.64-1.16-1.31-2.29-2-3.41l-.12-36A104.61,104.61,0,0,0,162,32L130,49.89c-1.34,0-2.69,0-4,0L94,32A104.58,104.58,0,0,0,59.89,51.25l-.16,36c-.7,1.12-1.37,2.26-2,3.41l-31.84,18.1a99.15,99.15,0,0,0,0,38.46l31.85,18.14c.64,1.16,1.31,2.29,2,3.41l.12,36A104.61,104.61,0,0,0,94,224l32-17.87c1.34,0,2.69,0,4,0L162,224a104.58,104.58,0,0,0,34.08-19.25l.16-36c.7-1.12,1.37-2.26,2-3.41l31.84-18.1A99.15,99.15,0,0,0,230.1,108.76ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z"
                                                    opacity="0.2" />
                                                <circle cx="128" cy="128" r="40" fill="none" stroke="currentColor"
                                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                                                <path
                                                    d="M130.05,206.11c-1.34,0-2.69,0-4,0L94,224a104.61,104.61,0,0,1-34.11-19.2l-.12-36c-.71-1.12-1.38-2.25-2-3.41L25.9,147.24a99.15,99.15,0,0,1,0-38.46l31.84-18.1c.65-1.15,1.32-2.29,2-3.41l.16-36A104.58,104.58,0,0,1,94,32l32,17.89c1.34,0,2.69,0,4,0L162,32a104.61,104.61,0,0,1,34.11,19.2l.12,36c.71,1.12,1.38,2.25,2,3.41l31.85,18.14a99.15,99.15,0,0,1,0,38.46l-31.84,18.1c-.65,1.15-1.32,2.29-2,3.41l-.16,36A104.58,104.58,0,0,1,162,224Z"
                                                    fill="none" stroke="currentColor" strokeLinecap="round"
                                                    strokeLinejoin="round" strokeWidth="16" />
                                            </svg>Settings</Link>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-9 col-span-12">
                            <div className="box">
                                <div className="box-header justify-between">
                                    <div className="box-title">
                                        My Wishlists
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <div>
                                            <input className="form-control form-control-sm" type="text" placeholder="Search Here" aria-label=".form-control-sm example" />
                                        </div>
                                        <div className="ti-dropdown hs-dropdown">
                                            <Link scroll={false} href="#!" className="ti-btn ti-btn-primary ti-btn-sm btn-wave !m-0" data-bs-toggle="dropdown" aria-expanded="false">
                                                Sort By<i className="ri-arrow-down-s-line align-middle ms-2"></i>
                                            </Link>
                                            <ul className="ti-dropdown-menu hs-dropdown-menu hidden" role="menu">
                                                <li><Link scroll={false} className="ti-dropdown-item" href="#!">New</Link></li>
                                                <li><Link scroll={false} className="ti-dropdown-item" href="#!">This Week</Link></li>
                                                <li><Link scroll={false} className="ti-dropdown-item" href="#!">This Month</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="grid grid-cols-12 sm:gap-x-6">
                                        <div className="xl:col-span-12 col-span-12">
                                            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                                                <p className="mb-0 fs-15"><span className="text-danger">5 items </span> in your wishlist</p>
                                                <Link href="/ecommerce/customer/checkout" className="ti-btn ti-btn-outline-light !text-dark">Checkout All <i className="ti ti-arrow-right ms-1"></i></Link>
                                            </div>
                                        </div>
                                        {Wishlistdata.slice(0, 6).map((idx: any) => (
                                            <div className="lg:col-span-6 col-span-12" key={idx.id}>
                                                <div className={`box card-style-3 ${idx.bw === 'filter' ? 'filter-bw' : ''}`} >
                                                    <div className="box-body !p-4">
                                                        <div className="grid grid-cols-12 sm:gap-x-6">
                                                            <div className="md:col-span-4 col-span-12">
                                                                <div className="bg-gray-300 dark:bg-light rounded-md">
                                                                    <Link href="#!" className="relative">
                                                                        <Image fill src={idx.preview} alt="img" className="img-fluid w-full" />
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                            <div className="md:col-span-8 col-span-12">
                                                                <div className="flex items-start justify-between mb-3">
                                                                    <div className="flex-grow">
                                                                        <Link href="#!" className="mb-1 inline-block text-primary text-[0.75rem] font-medium">{idx.brand}</Link>
                                                                        <h6 className="text-[1rem] mb-1 font-semibold"><Link href="/ecommerce/customer/shop">{idx.title}</Link></h6>
                                                                        <div className="flex items-baseline text-[0.6875rem]">
                                                                            <div className="flex items-baseline text-[0.6875rem]">
                                                                                <div className="min-w-fit">
                                                                                    <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
                                                                                    <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
                                                                                    <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
                                                                                    <span className="text-warning"><i className="bi bi-star"></i></span>
                                                                                </div>
                                                                                <p className="mb-0 ms-1 min-w-fit text-textmuted dark:text-textmuted/50">
                                                                                    <span> ({idx.ratings})</span>
                                                                                    <span> Ratings</span>
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <span className={`min-w-fit text-[0.8125rem] ${idx.stockStusclr} `}>{idx.stockStatus}</span>
                                                                </div>
                                                                <div className="flex items-center justify-between">
                                                                    <div className="flex items-baseline">
                                                                        <h6 className="text-[1.25rem] font-medium text-primary mb-0">${idx.price}</h6>
                                                                        <span className="text-[0.8125rem] ms-2 text-textmuted dark:text-textmuted/50 line-through">{idx.oldPrice}</span>
                                                                    </div>
                                                                    {idx.discount && (

                                                                        <span className="badge bg-info/[0.15] text-info">{idx.discount}</span>
                                                                    )}

                                                                </div>
                                                                <div className="flex items-center gap-2 mt-4 flex-wrap">
                                                                    <div className="flex-grow">
                                                                        <div className="grid">
                                                                            <Link scroll={false} href="#!" onClick={() => handleClick(idx.id)} className="ti-btn ti-btn-outline-light !text-dark"><i className="ti ti-trash me-1"></i> Remove</Link>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex-grow">
                                                                        <div className="grid">
                                                                            <Link scroll={false} onClick={() => handleAddToCart(idx)} href={idx.cartlink} className="ti-btn ti-btn-primary"><i className="ti ti-shopping-cart-plus me-1"></i> Add Cart</Link>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="box-footer">
                                    <div className="flex items-center flex-wrap overflow-auto">
                                        <div className="mb-2 mb-sm-0">
                                            Showing <b>1</b> to <b>10</b> of <b>10</b> entries <i className="bi bi-arrow-right  rtl:rotate-180 inline-flex  ms-2 font-semibold"></i>
                                        </div>
                                        <div className="ms-auto">
                                            <nav aria-label="Page navigation" className="pagination-style-4 float-end">
                                                <ul className="ti-pagination mb-0">
                                                    <li className="page-item">
                                                        <Link scroll={false} className="page-link disabled" href="#!">
                                                            Prev
                                                        </Link>
                                                    </li>
                                                    <li className="page-item"><Link scroll={false} className="page-link active"
                                                        href="#!">1</Link></li>
                                                    <li className="page-item"><Link scroll={false} className="page-link" href="#!">2</Link>
                                                    </li>
                                                    <li className="page-item"><Link scroll={false} className="page-link" href="#!">17</Link>
                                                    </li>
                                                    <li className="page-item">
                                                        <Link scroll={false} className="page-link text-primary" href="#!">
                                                            next
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- End:: Section-1 --> */}

            {/* <!-- Start:: Section-2 --> */}
            <section className="section bg-banner lg:px-0 px-4 !py-[4.375rem]">
                <div className="grid grid-cols-12 gap-x-6 justify-center">
                    <div className="lg:col-span-3 col-span-1 text-center"></div>
                    <div className="lg:col-span-6 col-span-10 text-center">
                        <div className="mb-4">
                            <h3 className="font-semibold mb-2 text-white">&#128073; Download our free mobile apps today
                            </h3>
                        </div>
                        <h6 className="mb-4 opacity-90 text-white">Labore no sed ipsum ipsum nonumy. Sit ipsum sanctus ea
                            magna est. Kasd diam rebum sit ipsum ipsum erat et kasd.Est amet sit vero sanctus labore no
                            sed ipsum ipsum nonumy vero sanctus labore..</h6>
                        <div className="btn-list">
                            <Link href="#!" className="ti-btn  bg-black app-store relative">
                                <Image fill src="../../../assets/images/media/apps/play-store.png" alt="" />
                                Google Play
                            </Link>
                            <Link href="#!" className="ti-btn  bg-black app-store relative">
                                <Image fill src="../../../assets/images/media/apps/apple-store.png" alt="" className="invert-1" />
                                App Store
                            </Link>
                        </div>
                    </div>
                    <div className="lg:col-span-3 col-span-1 text-center"></div>
                </div>
            </section>
            {/* <!-- End:: Section-2 --> */}
        </Fragment>
    );
};

export default Wishlist;