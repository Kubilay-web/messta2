"use client"
import SpkNftcards from "@/shared/@spk-reusable-components/apps/spk-nftcards";
import SpkButton from "@/shared/@spk-reusable-components/uielements/spk-button";
import SpkDropdown from "@/shared/@spk-reusable-components/uielements/spk-dropdown";
import { Artdata, Gamingdata, Marketplacedata } from "@/shared/data/apps/nft/marketplacedata";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Link from "next/link";
import React, { Fragment } from "react";

const MarketPlace = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Market Place" />
            <Pageheader Heading="Market Place" breadcrumbs={['Apps', 'NFT']} currentpage="Market Place" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="box custom-box">
                        <div className="box-body">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                                <nav className="" aria-label="Tabs" role="tablist">
                                    <Link scroll={false} className="hs-tab-active:bg-primary/10 hs-tab-active:text-primary  py-[0.4rem] px-2 me-2 text-sm font-medium text-center rounded-sm hover:text-primary active" id="nft-all-item" data-hs-tab="#nft-all" href="#!" >
                                        All
                                    </Link>
                                    <Link scroll={false} className="hs-tab-active:bg-primary/10 inline-flex hs-tab-active:text-primary  me-2 py-[0.4rem] px-2 text-sm font-medium text-center  rounded-sm hover:text-primary " id="nft-art-item" data-hs-tab="#nft-art" href="#!" >
                                        Art
                                    </Link>
                                    <Link scroll={false} className="hs-tab-active:bg-primary/10 inline-flex hs-tab-active:text-primary me-2  py-[0.4rem] px-2 text-sm font-medium text-center  rounded-sm hover:text-primary " id="nft-gaming-item" data-hs-tab="#nft-gaming" href="#!" >
                                        Gaming
                                    </Link>
                                    <Link scroll={false} className="hs-tab-active:bg-primary/10 inline-flex hs-tab-active:text-primary me-2  py-[0.4rem] px-2 text-sm font-medium text-center  rounded-sm hover:text-primary " id="nft-domain-item" data-hs-tab="#nft-domain" href="#!" >
                                        Domain
                                    </Link>
                                    <Link scroll={false} className="hs-tab-active:bg-primary/10  inline-flex hs-tab-active:text-primary me-2  py-[0.4rem] px-2 text-sm font-medium text-center  rounded-sm hover:text-primary " id="nft-music-item" data-hs-tab="#nft-music" href="#!" >
                                        Music
                                    </Link>
                                    <Link scroll={false} className="hs-tab-active:bg-primary/10 inline-flex hs-tab-active:text-primary me-2  py-[0.4rem] px-2 text-sm font-medium text-center  rounded-sm hover:text-primary " id="nft-reaestate-item" data-hs-tab="#nft-realestate" href="#!" >
                                        Real Estate
                                    </Link>
                                    <Link scroll={false} className="hs-tab-active:bg-primary/10 inline-flex hs-tab-active:text-primary me-2  py-[0.4rem] px-2 text-sm font-medium text-center  rounded-sm hover:text-primary " id="nft-sports-item" data-hs-tab="#nft-sports" href="#!" >
                                        Sports
                                    </Link>
                                    <Link scroll={false} className="hs-tab-active:bg-primary/10 inline-flex hs-tab-active:text-primary  me-2  py-[0.4rem] px-2 text-sm font-medium text-center  rounded-sm hover:text-primary " id="nft-fashion-item" data-hs-tab="#nft-fashion" href="#!" >
                                        Fashion
                                    </Link>
                                    <Link scroll={false} className="hs-tab-active:bg-primary/10 inline-flex hs-tab-active:text-primary  me-2 py-[0.4rem] px-2 text-sm font-medium text-center  rounded-sm hover:text-primary " id="nft-avatars-item" data-hs-tab="#nft-avatars" href="#!" >
                                        Avatars
                                    </Link>
                                    <Link scroll={false} className="hs-tab-active:bg-primary/10 inline-flex hs-tab-active:text-primary  me-2 py-[0.4rem] px-2 text-sm font-medium text-center  rounded-sm hover:text-primary " id="nft-memes-item" data-hs-tab="#nft-memes" href="#!">
                                        Memes
                                    </Link>
                                </nav>
                                <div className="btn-list">
                                    <SpkButton buttontype="button" Size="sm" customClass="ti-btn bg-secondary text-white btn-wave">Filters</SpkButton>
                                    <SpkDropdown Linktag={true} Linkclass="ti-btn  btn-wave !py-1 !px-2 !text-[0.75rem] ti-btn-primary !m-0" Toggletext="Sort By" Arrowicon={true} >
                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">New Collection</Link></li>
                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">High - Low</Link></li>
                                        <li><Link scroll={false} className="ti-dropdown-item" href="#!">Low - High</Link></li>
                                    </SpkDropdown>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}

            {/* <!-- Start:: row-2 --> */}
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-12 col-span-12">
                    <div className="tab-content">
                        <div className="tab-pane show active !p-0   !border-0" id="nft-all" aria-controls="nft-all-item" role="tabpanel">
                            <div className="grid grid-cols-12 gap-x-6">
                                {Marketplacedata.map((idx,index) => (
                                    <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12" key={index}>
                                        <div className="box">
                                            <SpkNftcards ethlogo="../../../assets/images/crypto-currencies/crypto-icons/ethereum-eth-logo.svg" imgSrc={idx.image} time={idx.auctionTime} title={idx.title} clientName={idx.name} count={idx.currentBid} />
                                        </div>
                                    </div>
                                ))}
                            </div>
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
                        <div className="tab-pane !p-0 hidden !border-0" id="nft-art" aria-controls="nft-all-item" role="tabpanel">
                            <div className="grid grid-cols-12 gap-6">
                                {Artdata.map((idx,index) => (
                                    <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12" key={index}>
                                        <div className="box">
                                            <SpkNftcards ethlogo="../../../assets/images/crypto-currencies/crypto-icons/ethereum-eth-logo.svg" imgSrc={idx.image} time={idx.auctionTime} title={idx.title} clientName={idx.name} count={idx.currentBid} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="tab-pane !p-0 hidden !border-0" id="nft-gaming" aria-controls="nft-gaming-item" role="tabpanel">
                            <div className="grid grid-cols-12 gap-6">
                                {Gamingdata.map((idx,index) => (
                                    <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12" key={index}>
                                        <div className="box">
                                            <SpkNftcards ethlogo="../../../assets/images/crypto-currencies/crypto-icons/ethereum-eth-logo.svg" imgSrc={idx.image} time={idx.auctionTime} title={idx.title} clientName={idx.name} count={idx.currentBid} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="tab-pane !p-0 hidden !border-0" id="nft-domain" aria-controls="nft-domain-item" role="tabpanel">
                            <div className="grid grid-cols-12 gap-6">
                                <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                                    <div className="box">
                                        <SpkNftcards ethlogo="../../../assets/images/crypto-currencies/crypto-icons/ethereum-eth-logo.svg" title="VirtualVortex" imgSrc="../../../assets/images/nft-images/15.jpg" time="07hrs : 06m : 15s" count="1.42" clientName="EnigmaArtistry" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane !p-0 hidden !border-0" id="nft-music" aria-controls="nft-music-item" role="tabpanel">
                            <div className="grid grid-cols-12 gap-6">
                                <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                                    <div className="box">
                                        <SpkNftcards ethlogo="../../../assets/images/crypto-currencies/crypto-icons/ethereum-eth-logo.svg" title="VirtualVortex" imgSrc="../../../assets/images/nft-images/16.jpg" time="07hrs : 06m : 15s" count="1.42" clientName="EnigmaArtistry" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane !p-0 hidden !border-0" id="nft-realestate" aria-controls="nft-realestate-item" role="tabpanel">
                            <div className="grid grid-cols-12 gap-6">
                                <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                                    <div className="box">
                                        <SpkNftcards ethlogo="../../../assets/images/crypto-currencies/crypto-icons/ethereum-eth-logo.svg" title="VirtualVortex" imgSrc="../../../assets/images/nft-images/17.jpg" time="07hrs : 06m : 15s" count="1.42" clientName="EnigmaArtistry" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane !p-0 hidden !border-0" id="nft-sports" aria-controls="nft-sports-item" role="tabpanel">
                            <div className="grid grid-cols-12 gap-6">
                                <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                                    <div className="box">
                                        <SpkNftcards ethlogo="../../../assets/images/crypto-currencies/crypto-icons/ethereum-eth-logo.svg" title="VirtualVortex" imgSrc="../../../assets/images/nft-images/18.jpg" time="07hrs : 06m : 15s" count="1.42" clientName="EnigmaArtistry" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane !p-0 hidden !border-0" id="nft-fashion" aria-controls="nft-fashion-item" role="tabpanel">

                            <div className="grid grid-cols-12 gap-6">
                                <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                                    <div className="box">
                                        <SpkNftcards ethlogo="../../../assets/images/crypto-currencies/crypto-icons/ethereum-eth-logo.svg" title="VirtualVortex" imgSrc="../../../assets/images/nft-images/5.jpg" time="07hrs : 06m : 15s" count="1.42" clientName="EnigmaArtistry" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane !p-0 hidden !border-0" id="nft-avatars" aria-controls="nft-avatars-item" role="tabpanel">
                            <div className="grid grid-cols-12 gap-6">
                                <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                                    <div className="box">
                                        <SpkNftcards ethlogo="../../../assets/images/crypto-currencies/crypto-icons/ethereum-eth-logo.svg" title="VirtualVortex" imgSrc="../../../assets/images/nft-images/7.jpg" time="07hrs : 06m : 15s" count="1.42" clientName="EnigmaArtistry" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane !p-0 hidden !border-0" id="nft-memes" aria-controls="nft-memes-item" role="tabpanel">
                            <div className="grid grid-cols-12 gap-6">
                                <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                                    <div className="box">
                                        <SpkNftcards ethlogo="../../../assets/images/crypto-currencies/crypto-icons/ethereum-eth-logo.svg" title="VirtualVortex" imgSrc="../../../assets/images/nft-images/11.jpg" time="07hrs : 06m : 15s" count="1.42" clientName="EnigmaArtistry" />
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

export default MarketPlace;