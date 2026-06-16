"use client"
import SpkFollowerCard from "@/shared/@spk-reusable-components/apps/reusable-marketplace/spk-follower-card";
import dynamic from 'next/dynamic';
const SpkSelect = dynamic(() =>import('@/shared/@spk-reusable-components/spk-packages/spk-reactselect'),{ ssr: false });
import Spktables from "@/shared/@spk-reusable-components/tables/spk-tables";
import SpkDropdown from "@/shared/@spk-reusable-components/uielements/spk-dropdown";
import { FollowersTabdata, Followingbdata } from "@/shared/data/apps/market-place/userdata";
import { MyWishlistProperties, PropertyData } from "@/shared/data/apps/real-estate/userdata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

const User = () => {
    const Accounttype = [
        { value: 'Private', label: 'Private' },
        { value: 'Business', label: 'Business' },
    ]
    return (
        <Fragment>
            {/* <!-- Start:: Breadcrumb--> */}
            <div className="!border-b border-defaultborder dark:border-defaultborder/10 py-4">
                <div className="container">
                    <Seo title={"User Details"} />
                    <Pageheader breadcrumbs={['Apps', 'Real Estate']} currentpage="User Details" Updated={true} />
                </div>
            </div>
            {/* <!-- End:: Breadcrumb--> */}

            {/* <!-- Start:: Landing Banner --> */}
            <div className="landing-banner !py-0 !z-[0]">
                <section className="!py-[3rem]">
                    <div className="container main-banner-container !p-0">
                        <div className="grid grid-cols-12 gap-x-6 gap-y-2">
                            <div className="md:col-span-8 lg:col-span-9 col-span-12">
                                <div className="flex items-center flex-wrap">
                                    <span className="marketplace-company-icon relative">
                                        <Image fill src="../../assets/images/company-logos/3.png" alt="" />
                                    </span>
                                    <div className="ms-4">
                                        <h4 className="font-semibold mb-0 flex items-center"><Link scroll={false} href="#!">
                                            Robert McLean</Link></h4>
                                        <p className="mb-2">Member Since <span className="font-semibold">2005</span></p>
                                        <div className="flex items-center text-[0.875rem] mb-2">
                                            <p className="fs-15 font-semibold mb-0">Ratings : </p>
                                            <div className="min-w-fit-content ms-3">
                                                <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
                                                <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
                                                <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
                                                <span className="text-warning me-1"><i className="bi bi-star-half"></i></span>
                                                <span className="text-warning"><i className="bi bi-star"></i></span>
                                            </div>
                                            <p className="mb-0 mx-1 min-w-fit-content text-textmuted dark:text-textmuted/50">
                                                <span> (142)</span>
                                                <span> Ratings</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-4 lg:col-span-3 col-span-12 md:my-auto md:text-end">
                                <div className="btn-list mb-2">
                                    <Link href="/pages/profile"
                                        className="ti-btn ti-btn-lg ti-btn-w-lg  ti-btn-primary me-2">View Profile</Link>
                                    <Link href="#!"
                                        className="ti-btn ti-btn-icon ti-btn-lg ti-btn-soft-secondary btn-wave">
                                        <i className="ri-share-line"></i>
                                    </Link>
                                </div>
                                <p className="mb-0"><i className="bi bi-info-circle text-danger me-1" data-bs-toggle="tooltip"
                                    data-bs-placement="top" title="45 days left"></i> <b>Expires on </b> 28 Dec 2022
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            {/* <!-- End:: Landing Banner --> */}

            {/* <!-- Start:: Nav Tabs--> */}
            <div className="border-bottom">
                <div className="container">
                    <nav className="-mb-0.5 flex space-x-6 rtl:space-x-reverse !py-1 flex-wrap" role="tablist">
                        <Link
                            className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-4 !font-medium inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  dark:text-defaulttextcolor/80 hover:text-primary active"
                            href="#!" id="tab-1" data-hs-tab="#tab1"
                            aria-controls="tab1"> My Profile
                        </Link>
                        <Link
                            className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-4 !font-medium inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  dark:text-defaulttextcolor/80 hover:text-primary"
                            href="#!" id="tab-2" data-hs-tab="#tab2"
                            aria-controls="tab2"> My Properties
                        </Link>
                        <Link
                            className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-4 !font-medium inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  dark:text-defaulttextcolor/80 hover:text-primary"
                            href="#!" id="tab-3" data-hs-tab="#tab3"
                            aria-controls="tab3"> Wishlist Properties
                        </Link>
                        <Link
                            className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-4 !font-medium inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  dark:text-defaulttextcolor/80 hover:text-primary"
                            href="#!" id="tab-4" data-hs-tab="#tab4"
                            aria-controls="tab4"> Followers
                        </Link>
                        <Link
                            className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-4 !font-medium inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  dark:text-defaulttextcolor/80 hover:text-primary"
                            href="#!" id="tab-5" data-hs-tab="#tab5"
                            aria-controls="tab5"> Following
                        </Link>
                        <Link
                            className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-4 !font-medium inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  dark:text-defaulttextcolor/80 hover:text-primary"
                            href="#!" id="tab-6" data-hs-tab="#tab6"
                            aria-controls="tab6"> Settings
                        </Link>
                    </nav>
                </div>
            </div>
            {/* <!-- End:: Nav Tabs--> */}

            {/* <!-- Start:: Section-1 --> */}
            <section className="section !py-6 bg-white dark:bg-bodybg">
                <div className="container">
                    <div className="tab-content">
                        <div className="tab-pane border-0 p-0 show active" id="tab1" role="tabpanel" aria-labelledby="tab-1">
                            <div className="box">
                                <div className="box-header">
                                    <div className="box-title flex-grow">
                                        Basic Information
                                    </div>
                                    <div>
                                        <p className="font-semibold mb-2">Profile 60% completed - <Link
                                            href="#!" className="text-primary text-[0.75rem]">Finish now</Link></p>
                                        <div className="progress progress-xs progress-animate">
                                            <div className="progress-bar bg-primary" role="progressbar" aria-valuenow={60}
                                                aria-valuemin={0} aria-valuemax={100} style={{ width: '60%' }}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="grid grid-cols-12 gap-6 mb-4">
                                        <div className="xl:col-span-6 col-span-12">
                                            <label htmlFor="customer-name" className="ti-form-label">Customer Name</label>
                                            <input type="text" className="form-control" id="customer-name"
                                                placeholder="Customer Name" defaultValue="Jack Miller" />
                                        </div>
                                        <div className="xl:col-span-6 col-span-12">
                                            <label htmlFor="customer-username" className="ti-form-label">Customer Username</label>
                                            <input type="text" className="form-control" id="customer-username"
                                                placeholder="Customer username" defaultValue="sprukotechnologies" />
                                        </div>
                                        <div className="xl:col-span-6 col-span-12">
                                            <label htmlFor="email-address" className="ti-form-label">Email Address :</label>
                                            <input type="text" className="form-control" id="email-address"
                                                placeholder="xyz@gmail.com" defaultValue="json@gmail.com" />
                                        </div>
                                        <div className="xl:col-span-6 col-span-12">
                                            <label htmlFor="phone-number" className="ti-form-label">Mobile Number :</label>
                                            <input type="text" className="form-control" id="phone-number"
                                                placeholder="*** *** ****" defaultValue="65432 76765" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-12 gap-6">
                                        <div className="xl:col-span-6 col-span-12">
                                            <label htmlFor="Address" className="ti-form-label">Address :</label>
                                            <input type="text" className="form-control" id="Address" placeholder="Address"
                                                defaultValue="USA" />
                                        </div>
                                        <div className="xl:col-span-6 col-span-12">
                                            <label htmlFor="Zip-Code" className="ti-form-label">Zip Code :</label>
                                            <input type="text" className="form-control" id="Zip-Code" placeholder="Zip Code"
                                                defaultValue="1234" />
                                        </div>
                                        <div className="xl:col-span-6 col-span-12">
                                            <label htmlFor="facebook" className="ti-form-label">Facebook :</label>
                                            <input type="text" className="form-control" id="facebook" placeholder="https://"
                                                defaultValue="https://www.facebook.com" />
                                        </div>
                                        <div className="xl:col-span-6 col-span-12">
                                            <label htmlFor="Twitter" className="ti-form-label">Twitter :</label>
                                            <input type="text" className="form-control" id="Twitter" placeholder="https://"
                                                defaultValue="https://twitter.com" />
                                        </div>
                                        <div className="xl:col-span-6 col-span-12">
                                            <label htmlFor="Pinterest" className="ti-form-label">Pinterest:</label>
                                            <input type="text" className="form-control" id="Pinterest"
                                                placeholder="https://" defaultValue="https://in.pinterest.com" />
                                        </div>
                                        <div className="xl:col-span-6 col-span-12">
                                            <label htmlFor="Linkedin" className="ti-form-label">Linkedin :</label>
                                            <input type="text" className="form-control" id="Linkedin" placeholder="https://"
                                                defaultValue="https://www.linkedin.com" />
                                        </div>
                                        <div className="xl:col-span-12 col-span-12">
                                            <div className="mb-3">
                                                <span className="avatar avatar-lg avatar-rounded">
                                                    <Image fill src="../../assets/images/faces/9.jpg" alt="" className="w-full h-full" />
                                                    <Link scroll={false} href="#!"
                                                        className="badge !rounded-full bg-danger text-white avatar-badge"><i
                                                            className="fe fe-x"></i></Link>
                                                </span>
                                            </div>
                                            <div className="btn-list">
                                                <div> <label htmlFor="small-file-input" className="sr-only">Choose file</label> <input type="file" name="small-file-input" id="small-file-input" className="block w-full border border-defaultborder focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-defaultborder dark:focus:border-white/10 dark:border-white/10 dark:text-white/50
                                                    file:border-0
                                                   file:bg-light file:me-4
                                                   file:py-2 file:px-4
                                                   dark:file:bg-black/20 dark:file:text-white/50" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="xl:col-span-12 col-span-12">
                                            <label htmlFor="bio" className="ti-form-label">Bio :</label>
                                            <textarea className="form-control" id="bio" rows={7} defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. At sit impedit, officiis non minima saepe voluptates a magnam enim sequi porro veniam ea suscipit dolorum vel mollitia voluptate iste nemo!"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="box-footer">
                                    <div className="float-end">
                                        <button className="ti-btn ti-btn-primary">
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane border-0 p-0 hidden" id="tab2" role="tabpanel" aria-labelledby="tab-2">
                            <div className="box">
                                <div className="box-header justify-between">
                                    <div className="box-title">
                                        My Properties
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <div>
                                            <input className="form-control form-control-sm" type="text" placeholder="Search Here" aria-label=".form-control-sm example" />
                                        </div>
                                        <SpkDropdown Linktag={true} Linkclass="ti-btn ti-btn-primary ti-btn-sm !m-0 btn-wave"
                                            Toggletext="Sort By" Arrowicon={true}>
                                            <li><Link scroll={false} className="ti-dropdown-item" href="#!">New</Link></li>
                                            <li><Link scroll={false} className="ti-dropdown-item" href="#!">Popular</Link></li>
                                            <li><Link scroll={false} className="ti-dropdown-item" href="#!">Relevant</Link></li>
                                        </SpkDropdown>
                                    </div>
                                </div>
                                <div className="box-body !p-0">
                                    <div className="table-responsive">
                                        <Spktables tableClass="ti-custom-table ti-custom-table-head w-full" showCheckbox={true} header={[{ title: 'Property Name' }, { title: 'Agent' }, { title: 'Category' }, { title: 'Type' }, { title: 'Purchased Date' }, { title: 'Location' }, { title: 'Price' }, { title: 'Action' }]}>
                                            {PropertyData.map((idx) => (
                                                <tr key={idx.id}>
                                                    <td className="ps-6"><input className="form-check-input" type="checkbox" id="checkboxNoLabelproducts2" aria-label="..." defaultChecked={idx.checked} /></td>
                                                    <td>
                                                        <div className="flex">
                                                            <span className="avatar avatar-md avatar-square"><Image fill src={idx.image} className="h-100 w-100" alt="..." /></span>
                                                            <div className="ms-2">
                                                                <p className="font-semibold mb-0 flex items-center"><Link scroll={false} href="#!">{idx.name}</Link></p>
                                                                <p className="text-[0.75rem] text-textmuted dark:text-textmuted/50 mb-0">{idx.housetype}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="flex items-center font-semibold">
                                                            <span className="avatar avatar-sm me-2 avatar-rounded">
                                                                <Image fill src={idx.agent.avatar} alt="" />
                                                            </span>{idx.agent.name}
                                                        </div>
                                                    </td>
                                                    <td>{idx.category} </td>
                                                    <td><span className="badge !rounded-full badge-sm bg-success/[0.15] text-success">{idx.type}</span></td>
                                                    <td>{idx.date}</td>
                                                    <td>
                                                        <div className="inline-flex items-center">
                                                            <i className="ri-map-pin-fill text-textmuted dark:text-textmuted/50 text-[0.625rem]"></i>
                                                            <span className="ms-1">{idx.location}</span>
                                                        </div>
                                                    </td>
                                                    <td className="font-semibold">{idx.price}</td>
                                                    <td>
                                                        <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-primary btn-wave waves-effect waves-light">
                                                            <i className="ri-eye-line"></i>
                                                        </button>
                                                        <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-danger btn-wave waves-effect waves-light">
                                                            <i className="ri-delete-bin-line"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </Spktables>
                                    </div>
                                </div>
                                <div className="box-footer">
                                    <div className="flex items-center flex-wrap overflow-auto">
                                        <div className="mb-2 mb-sm-0">
                                            Showing <b>1</b> to <b>4</b> of <b>10</b> entries <i className="bi bi-arrow-right  rtl:rotate-180 inline-flex  ms-2 font-semibold"></i>
                                        </div>
                                        <div className="ms-auto">
                                            <ul className="ti-pagination mb-0 overflow-auto">
                                                <li className="page-item">
                                                    <Link href="#!" scroll={false} className="page-link disabled">Previous</Link>
                                                </li>
                                                <li className="page-item" aria-current="page"><Link scroll={false} className="page-link active" href="#!">1</Link></li>
                                                <li className="page-item">
                                                    <Link scroll={false} className="page-link" href="#!">2</Link>
                                                </li>
                                                <li className="page-item"><Link scroll={false} className="page-link" href="#!">3</Link></li>
                                                <li className="page-item"><Link scroll={false} className="page-link" href="#!">4</Link></li>
                                                <li className="page-item"><Link scroll={false} className="page-link" href="#!">5</Link></li>
                                                <li className="page-item">
                                                    <Link scroll={false} className="page-link" href="#!">Next</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane border-0 p-0 hidden" id="tab3" role="tabpanel" aria-labelledby="tab-3">
                            <div className="box">
                                <div className="box-header justify-between">
                                    <div className="box-title">
                                        My Wishlist Properties
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <div>
                                            <input className="form-control form-control-sm" type="text" placeholder="Search Here" aria-label=".form-control-sm example" />
                                        </div>
                                        <SpkDropdown Linktag={true} Linkclass="ti-btn ti-btn-primary ti-btn-sm !m-0 btn-wave"
                                            Toggletext="Sort By" Arrowicon={true}>
                                            <li><Link scroll={false} className="ti-dropdown-item" href="#!">New</Link></li>
                                            <li><Link scroll={false} className="ti-dropdown-item" href="#!">Popular</Link></li>
                                            <li><Link scroll={false} className="ti-dropdown-item" href="#!">Relevant</Link></li>
                                        </SpkDropdown>
                                    </div>
                                </div>
                                <div className="box-body !p-0">
                                    <div className="table-responsive">
                                        <Spktables tableClass="ti-custom-table ti-custom-table-head w-full" showCheckbox={true} header={[{ title: 'Property Name' }, { title: 'Agent' }, { title: 'Category' }, { title: 'Type' }, { title: 'Posted Date' }, { title: 'Location' }, { title: 'Price' }, { title: 'Action' }]}>
                                            {MyWishlistProperties.map((idx) => (
                                                <tr key={idx.id}>
                                                    <td className="ps-6"><input className="form-check-input" type="checkbox" id="checkboxNoLabelproducts7" defaultValue="" aria-label="..." defaultChecked={idx.checked} /></td>
                                                    <td>
                                                        <div className="flex">
                                                            <span className="avatar avatar-md avatar-square"><Image fill src={idx.image} className="h-100 w-100" alt="..." /></span>
                                                            <div className="ms-2">
                                                                <p className="font-semibold mb-0 flex items-center"><Link scroll={false} href="#!">{idx.name}</Link></p>
                                                                <p className="text-[0.75rem] text-textmuted dark:text-textmuted/50 mb-0">5BHK Apartment</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{idx.category} </td>
                                                    <td><span className={`badge !rounded-full badge-sm bg-${idx.statusColor}/[0.15] text-${idx.statusColor}`}>{idx.status}</span></td>
                                                    <td>{idx.type} </td>
                                                    <td>{idx.postedDate}</td>
                                                    <td>
                                                        <div className="inline-flex items-center">
                                                            <i className="ri-map-pin-fill text-textmuted dark:text-textmuted/50 text-[0.625rem]"></i>
                                                            <span className="ms-1">{idx.location}</span>
                                                        </div>
                                                    </td>
                                                    <td className="font-semibold">{idx.price}</td>
                                                    <td>
                                                        <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-primary btn-wave waves-effect waves-light">
                                                            <i className="ri-eye-line"></i>
                                                        </button>
                                                        <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-danger btn-wave waves-effect waves-light">
                                                            <i className="ri-delete-bin-line"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </Spktables>
                                    </div>
                                </div>
                                <div className="box-footer border-top-0">
                                    <div className="flex items-center flex-wrap overflow-auto">
                                        <div className="mb-2 mb-sm-0">
                                            Showing <b>1</b> to <b>4</b> of <b>10</b> entries <i className="bi bi-arrow-right  rtl:rotate-180 inline-flex  ms-2 font-semibold"></i>
                                        </div>
                                        <div className="ms-auto">
                                            <ul className="ti-pagination mb-0 overflow-auto">
                                                <li className="page-item disabled">
                                                    <Link href="#!" scroll={false} className="page-link">Previous</Link>
                                                </li>
                                                <li className="page-item active" aria-current="page"><Link scroll={false} className="page-link" href="#!">1</Link></li>
                                                <li className="page-item">
                                                    <Link scroll={false} className="page-link" href="#!">2</Link>
                                                </li>
                                                <li className="page-item"><Link scroll={false} className="page-link" href="#!">3</Link></li>
                                                <li className="page-item"><Link scroll={false} className="page-link" href="#!">4</Link></li>
                                                <li className="page-item"><Link scroll={false} className="page-link" href="#!">5</Link></li>
                                                <li className="page-item">
                                                    <Link scroll={false} className="page-link" href="#!">Next</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane border-0 p-0 hidden" id="tab4" role="tabpanel" aria-labelledby="tab-4">
                            <div className="grid grid-cols-12 gap-x-6">
                                {FollowersTabdata.map((card: any, index: any) => (
                                    <div key={index} className="lg:col-span-4 col-span-12">
                                        <SpkFollowerCard card={card} />
                                    </div>
                                ))}

                            </div>
                        </div>
                        <div className="tab-pane border-0 p-0 hidden" id="tab5" role="tabpanel" aria-labelledby="tab-5">
                            <div className="grid grid-cols-12 gap-x-6">
                                {Followingbdata.map((card: any, index: any) => (
                                    <div key={index} className="lg:col-span-4 col-span-12">
                                        <SpkFollowerCard card={card} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="tab-pane border-0 p-0 hidden" id="tab6" role="tabpanel" aria-labelledby="tab-6">
                            <div className="box">
                                <div className="box-header">
                                    <div className="box-title">
                                        Account Settings
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="grid grid-cols-12 gap-x-6 gap-y-[3rem]">
                                        <div className="xl:col-span-11 col-span-12">
                                            <h6 className="mb-3 font-semibold text-primary">General Settings :</h6>
                                            <div className="grid grid-cols-12 gap-x-6 mb-6">
                                                <div className="xl:col-span-3 col-span-12">
                                                    <span className="text-[0.875rem] font-semibold mb-0">Account Type :</span>
                                                    <p className="text-[0.75rem] mb-0 text-textmuted dark:text-textmuted/50">Select the account type</p>
                                                </div>
                                                <div className="xl:col-span-9 col-span-12">
                                                    <SpkSelect name="account-type-select" option={Accounttype} mainClass="" id="account-type-select"
                                                        menuplacement='auto' classNameprefix="Select2" defaultvalue={[Accounttype[0]]} />
                                                </div>
                                            </div>
                                            <div className="sm:flex block items-top mb-4 justify-between">
                                                <div>
                                                    <p className="text-[0.875rem] mb-1 font-semibold">Two Step Verification</p>
                                                    <p className="text-[0.75rem] text-textmuted dark:text-textmuted/50 sm:mb-0 mb-2">Two step verificatoin is very
                                                        secured and restricts in happening faulty practices.</p>
                                                </div>
                                                <div className="custom-toggle-switch toggle-sm ms-sm-2 ms-0">
                                                    <input id="two-step" name="toggleswitchsize" type="checkbox"
                                                        defaultChecked />
                                                    <label htmlFor="two-step" className="label-primary mb-1"></label>
                                                </div>
                                            </div>
                                            <div className="sm:flex block items-top mb-4 justify-between">
                                                <div>
                                                    <p className="text-[0.875rem] mb-1 font-semibold">Recovery Mail</p>
                                                    <p className="text-[0.75rem] text-textmuted dark:text-textmuted/50 mb-0">Incase of forgetting password mails
                                                        are sent to heifo@gmail.com</p>
                                                </div>
                                                <div className="custom-toggle-switch toggle-sm ms-sm-2 ms-0">
                                                    <input id="recovery-mail" name="toggleswitchsize" type="checkbox"
                                                        defaultChecked />
                                                    <label htmlFor="recovery-mail" className="label-primary mb-1"></label>
                                                </div>
                                            </div>
                                            <div className="sm:flex block items-top justify-between">
                                                <div>
                                                    <p className="text-[0.875rem] mb-1 font-semibold">SMS Recovery</p>
                                                    <p className="text-[0.75rem] text-textmuted dark:text-textmuted/50 mb-0">SMS are sent to 9102312xx in case
                                                        of recovery</p>
                                                </div>
                                                <div className="custom-toggle-switch toggle-sm ms-sm-2 ms-0">
                                                    <input id="sms-recovery" name="toggleswitchsize" type="checkbox"
                                                        defaultChecked />
                                                    <label htmlFor="sms-recovery" className="label-primary mb-1"></label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="xl:col-span-12 col-span-12">
                                            <h6 className="mb-3 font-semibold text-primary">Email Settings</h6>
                                            <div className="grid grid-cols-12 gap-x-6">
                                                <div className="sm:col-span-6 col-span-12 mb-2">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" defaultValue=""
                                                            id="itemupdate" defaultChecked />
                                                        <label className="form-check-label" htmlFor="itemupdate">
                                                            Item Update Notifications
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-6 col-span-12 mb-2">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" defaultValue=""
                                                            id="itemcomment" />
                                                        <label className="form-check-label" htmlFor="itemcomment">
                                                            Item Comment Notifications
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-6 col-span-12 mb-0">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" defaultValue=""
                                                            id="itemreview" />
                                                        <label className="form-check-label" htmlFor="itemreview">
                                                            Item Review Notifications
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-6 col-span-12 mb-0">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" defaultValue=""
                                                            id="itembuyerreview" defaultChecked />
                                                        <label className="form-check-label" htmlFor="itembuyerreview">
                                                            Buyer Review Notifications
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="xl:col-span-12 col-span-12">
                                            <h6 className="mb-3 font-semibold text-primary">Change Password</h6>
                                            <p className="text-[0.8125rem] mb-4">Password should be min of <b
                                                className="text-success font-semibold">8 digits<sup>*</sup></b>,atleast
                                                <b className="text-success font-semibold">One Capital letter<sup>*</sup></b>
                                                and <b className="text-success font-semibold">One Special
                                                    Character<sup>*</sup></b> included.</p>
                                            <div className="grid grid-cols-12 gap-x-6">
                                                <div className="sm:col-span-4 col-span-12 mb-2">
                                                    <label htmlFor="current-password" className="ti-form-label">Current
                                                        Password</label>
                                                    <input type="text" className="form-control" id="current-password"
                                                        placeholder="Current Password" />
                                                </div>
                                                <div className="sm:col-span-4 col-span-12 mb-2">
                                                    <label htmlFor="new-password" className="ti-form-label">New Password</label>
                                                    <input type="text" className="form-control" id="new-password"
                                                        placeholder="New Password" />
                                                </div>
                                                <div className="sm:col-span-4 col-span-12 mb-0">
                                                    <label htmlFor="confirm-password" className="ti-form-label">Confirm
                                                        Password</label>
                                                    <input type="text" className="form-control" id="confirm-password"
                                                        placeholder="Confirm PAssword" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="box-footer">
                                    <div className="float-end">
                                        <button className="ti-btn ti-btn-light m-1">
                                            Restore Defaults
                                        </button>
                                        <button className="ti-btn ti-btn-primary m-1">
                                            Save Changes
                                        </button>
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
                            <Link scroll={false} href="#!" className="ti-btn  bg-black app-store relative">
                                <Image fill src="../../assets/images/media/apps/play-store.png" alt="" />
                                Google Play
                            </Link>
                            <Link scroll={false} href="#!" className="ti-btn  bg-black app-store relative">
                                <Image fill src="../../assets/images/media/apps/apple-store.png" alt="" className="invert-1" />
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

export default User;