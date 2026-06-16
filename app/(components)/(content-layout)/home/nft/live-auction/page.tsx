"use client"
import SpkNftcards from "@/shared/@spk-reusable-components/apps/spk-nftcards";
import SpkDropdown from "@/shared/@spk-reusable-components/uielements/spk-dropdown";
import { Marketplacedata,nftUsers } from "@/shared/data/apps/nft/marketplacedata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

const LiveAuction = () => {

    const Liveacuation = Marketplacedata.slice(0, 6);

    
    return (
        <Fragment>
            {/* <!-- Page Header --> */}
            <Seo title="Live Auction" />
            <Pageheader Heading="Live Auction" breadcrumbs={['Apps', 'NFT']} currentpage="Live Auction" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:col-span-8 xl:col-span-8 lg:col-span-12 col-span-12">
                    <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                        <div className="nft-tag nft-tag-primary active">
                            <Link scroll={false} href="#!" className="stretched-link"></Link>
                            <span className="nft-tag-icon"><i className="ti ti-world text-[1.25rem]"></i></span>
                            <span className="nft-tag-text">All</span>
                        </div>
                        <div className="nft-tag nft-tag-secondary">
                            <Link scroll={false} href="#!" className="stretched-link"></Link>
                            <span className="nft-tag-icon"><i className="ti ti-flame text-[1.25rem]"></i></span>
                            <span className="nft-tag-text">New Trends</span>
                        </div>
                        <div className="nft-tag nft-tag-info">
                            <Link scroll={false} href="#!" className="stretched-link"></Link>
                            <span className="nft-tag-icon"><i className="ti ti-palette text-[1.25rem]"></i></span>
                            <span className="nft-tag-text">Art Work</span>
                        </div>
                        <div className="nft-tag nft-tag-success">
                            <Link scroll={false} href="#!" className="stretched-link"></Link>
                            <span className="nft-tag-icon"><i className="ti ti-device-gamepad-2 text-[1.25rem]"></i></span>
                            <span className="nft-tag-text">Games</span>
                        </div>
                        <div className="nft-tag nft-tag-danger">
                            <Link scroll={false} href="#!" className="stretched-link"></Link>
                            <span className="nft-tag-icon"><i className="ti ti-tie text-[1.25rem]"></i></span>
                            <span className="nft-tag-text">Fashion</span>
                        </div>
                        <div className="nft-tag nft-tag-warning">
                            <Link scroll={false} href="#!" className="stretched-link"></Link>
                            <span className="nft-tag-icon"><i className="ti ti-music text-[1.25rem]"></i></span>
                            <span className="nft-tag-text">Music</span>
                        </div>
                        <div className="nft-tag nft-tag-dark">
                            <Link scroll={false} href="#!" className="stretched-link"></Link>
                            <span className="nft-tag-icon"><i className="ti ti-gift text-[1.25rem]"></i></span>
                            <span className="nft-tag-text">Others</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xl:col-span-12 col-span-12">
                            <h6 className="font-medium mb-3">Live Auction:</h6>
                        </div>
                        {Liveacuation.map((idx) => (
                            <div className="xxl:col-span-4 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12" key={idx.id}>
                                <div className="box">
                                    <SpkNftcards ethlogo="../../../assets/images/crypto-currencies/crypto-icons/ethereum-eth-logo.svg" imgSrc={idx.image} time={idx.auctionTime} title={idx.title} clientName={idx.name} count={idx.currentBid} />
                                </div>
                            </div>
                        ))}
                        <div className="xl:col-span-12 col-span-12">
                            <nav className="overflow-auto mb-4 float-end !bg-white dark:!bg-bodybg !rounded-md">
                                <ul className="ti-pagination">
                                    <li><Link scroll={false} className="page-link" href="#!"> Previous </Link></li>
                                    <li><Link scroll={false} className="page-link" href="#!" aria-current="page">1</Link></li>
                                    <li><Link scroll={false} className="page-link" href="#!">2</Link></li>
                                    <li><Link scroll={false} className="page-link" href="#!">3</Link></li>
                                    <li><Link scroll={false} className="page-link" href="#!"> Next </Link></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-12 col-span-12">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xl:col-span-12 col-span-12">
                            <div className="box overflow-hidden">
                                <div className="box-header justify-between">
                                    <div className="box-title">
                                        Featured Creators
                                    </div>
                                    <div>
                                        <button className="btn btn-primary-light btn-sm btn-wave">View All</button>
                                    </div>
                                </div>
                                <div className="box-body !p-0">
                                    <ul className="ti-list-group ti-list-group-flush">
                                        {nftUsers.map((user) => (
                                            <li key={user.id} className="ti-list-group-item">
                                                <div className="flex items-center justify-between flex-wrap gap-2">
                                                    <div className="flex items-center">
                                                        <div className="leading-none">
                                                            <span className="avatar custom-img avatar-md avatar-rounded me-2">
                                                                <Image fill priority src={user.imageUrl} alt={user.name} />
                                                            </span>
                                                        </div>
                                                        <div className="items-center">
                                                            <p className="mb-0 font-medium">{user.name}<i className="bi bi-patch-check-fill text-success ms-2"></i></p>
                                                            <span className="text-[0.75rem] text-textmuted dark:text-textmuted/50">{user.username}</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-end">
                                                        <span className="block font-medium text-success">{user.eth}</span>
                                                        <span className="block text-textmuted dark:text-textmuted/50 fs-11">{user.nfts}</span>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-12 col-span-12">
                            <div className="box overflow-hidden">
                                <div className="box-header justify-between">
                                    <div className="box-title">
                                        Recent Activity
                                    </div>
                                    <SpkDropdown Linktag={true} Linkclass="text-xs text-textmuted dark:text-textmuted/50" Toggletext="Today" Arrowicon={true}>
                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Today</Link></li>
                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">This Week</Link></li>
                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Last Week</Link></li>
                                    </SpkDropdown>
                                </div>
                                <div className="box-body !p-0">
                                    <ul className="ti-list-group ti-list-group-flush">
                                        <li className="ti-list-group-item">
                                            <div className="flex gap-3 items-center flex-wrap">
                                                <div className="leading-none">
                                                    <span className="avatar avatar-lg">
                                                        <Image fill src="../../../assets/images/nft-images/31.png" alt="" />
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="mb-1"><Link scroll={false} href="#!" className="font-medium">DreamSpace</Link><span className="text-[0.75rem] text-textmuted dark:text-textmuted/50 ms-2 inline-block">24 mins ago</span></div>
                                                    <div className="text-[0.8125rem]">Purchsed from you by <Link scroll={false} className="underline" href="#!">Mitchell</Link> for <span className="text-success font-medium text-[0.75rem]">0.57ETH</span>.</div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="ti-list-group-item">
                                            <div className="flex gap-3 items-center flex-wrap">
                                                <div className="leading-none">
                                                    <span className="avatar avatar-lg">
                                                        <Image fill src="../../../assets/images/nft-images/25.png" alt="" />
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="mb-1">
                                                        <span className="font-medium">DreamSpace</span>
                                                        <span className="text-[0.75rem] text-textmuted dark:text-textmuted/50 ms-2 inline-block">16 mins ago</span>
                                                    </div>
                                                    <div className="text-[0.8125rem]">You started following mark zensberg.</div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="ti-list-group-item">
                                            <div className="flex gap-3 items-center flex-wrap">
                                                <div className="leading-none">
                                                    <span className="avatar avatar-lg">
                                                        <Image fill src="../../../assets/images/nft-images/21.png" alt="" />
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="mb-1">
                                                        <span className="font-medium">Neo Nebulae</span>
                                                        <span className="text-[0.75rem] text-textmuted dark:text-textmuted/50 ms-2 inline-block">5 mins ago</span>
                                                    </div>
                                                    <div className="text-[0.8125rem]">Showed interest in purchasing <Link scroll={false} href="#!" className="text-[0.75rem] text-warning font-medium">NeoNebulae</Link>.</div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="ti-list-group-item">
                                            <div className="flex gap-3 items-center flex-wrap">
                                                <div className="leading-none">
                                                    <span className="avatar avatar-lg">
                                                        <Image fill src="../../../assets/images/nft-images/26.png" alt="" />
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="mb-1">
                                                        <span className="font-medium">Neo Nebulae</span>
                                                        <span className="text-[0.75rem] text-textmuted dark:text-textmuted/50 ms-2 inline-block">16 mins ago</span>
                                                    </div>
                                                    <div className="text-[0.8125rem]">Purchased from <Link scroll={false} href="#!" className="underline">CyberCanvas</Link> for
                                                        <span className="font-medium text-[0.75rem] text-pink"> 1.345ETH</span>.
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}
        </Fragment>
    );
};

export default LiveAuction;