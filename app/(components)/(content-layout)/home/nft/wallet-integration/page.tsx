"use client"

import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

const WalletIntegration = () => {
    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Wallet Integration" />
            <Pageheader Heading="Wallet Integration" breadcrumbs={['Apps', 'NFT']} currentpage="Wallet Integration" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-6">
                <div className="xl:col-span-3 col-span-12">
                    <div className="box custom-box overflow-hidden">
                        <div className="box-header">
                            <div className="box-title">
                                Choose Network
                            </div>
                        </div>
                        <div className="box-body !p-0">
                            <ul className="ti-list-group !border-0">
                                <li className="ti-list-group-item hover:bg-light">
                                    <div className="flex items-center gap-2">
                                        <div>
                                            <span className="avatar avatar-rounded avatar-sm bg-light p-1">
                                                <Image fill src="../../../assets/images/nft-images/34.png" alt="" />
                                            </span>
                                        </div>
                                        <div className="text-[.875rem] font-medium my-auto">Etherium</div>
                                    </div>
                                </li>
                                <li className="ti-list-group-item hover:bg-light">
                                    <div className="flex items-center gap-2">
                                        <div>
                                            <span className="avatar avatar-rounded avatar-sm bg-light p-1">
                                                <Image fill src="../../../assets/images/nft-images/33.png" alt="" />
                                            </span>
                                        </div>
                                        <div className="text-[.875rem] font-medium my-auto">Binance</div>
                                    </div>
                                </li>
                                <li className="ti-list-group-item hover:bg-light">
                                    <div className="flex items-center gap-2">
                                        <div>
                                            <span className="avatar avatar-rounded avatar-sm bg-light p-1">
                                                <Image fill src="../../../assets/images/nft-images/32.png" alt="" />
                                            </span>
                                        </div>
                                        <div className="text-[.875rem] font-medium my-auto">Solana</div>
                                    </div>
                                </li>
                                <li className="ti-list-group-item hover:bg-light">
                                    <div className="flex items-center gap-2">
                                        <div>
                                            <span className="avatar avatar-rounded avatar-sm bg-light p-1">
                                                <Image fill src="../../../assets/images/nft-images/31.png" alt="" />
                                            </span>
                                        </div>
                                        <div className="text-[.875rem] font-medium my-auto">Tezos</div>
                                    </div>
                                </li>
                                <li className="ti-list-group-item hover:bg-light">
                                    <div className="flex items-center gap-2">
                                        <div>
                                            <span className="avatar avatar-rounded avatar-sm bg-light p-1">
                                                <Image fill src="../../../assets/images/nft-images/30.png" alt="" />
                                            </span>
                                        </div>
                                        <div className="text-[.875rem] font-medium my-auto">Avalanche</div>
                                    </div>
                                </li>
                                <li className="ti-list-group-item hover:bg-light">
                                    <div className="flex items-center gap-2">
                                        <div>
                                            <span className="avatar avatar-rounded avatar-sm bg-light p-1">
                                                <Image fill src="../../../assets/images/nft-images/29.png" alt="" />
                                            </span>
                                        </div>
                                        <div className="text-[.875rem] font-medium my-auto">boxano</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-9 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header justify-between">
                            <div className="box-title">
                                Choose Wallet
                            </div>
                            <div>
                                <button type="button" className="ti-btn  btn-wave ti-btn-secondary btn-wave !m-0">Add New Wallet</button>
                            </div>
                        </div>
                        <div className="box-body !p-6">
                            <div className="grid grid-cols-12 !mx-auto sm:gap-6 gap-2">
                                <div className="xxl:col-span-3 xl:col-span-4 md:col-span-6 col-span-12">
                                    <div className="p-4 nft-wallet active">
                                        <Link scroll={false} aria-label="anchor" href="#!" className="stretched-link"></Link>
                                        <div className="flex items-center justify-center gap-4">
                                            <div className="leadining-none">
                                                <span className="avatar avatar-rounded p-2 bg-light">
                                                    <Image fill src="../../../assets/images/nft-images/32.png" alt="" />
                                                </span>
                                            </div>
                                            <div>
                                                <h6 className="font-semibold mb-0">MetaMask</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="xxl:col-span-3 xl:col-span-4 md:col-span-6 col-span-12">
                                    <div className="p-4 text-center hover:bg-light border dark:border-defaultborder/10 rounded-md relative">
                                        <Link scroll={false} aria-label="anchor" href="#!" className="stretched-link"></Link>
                                        <div className="flex items-center justify-center gap-4">
                                            <div className="lh-1">
                                                <span className="avatar avatar-rounded p-2 bg-light">
                                                    <Image fill src="../../../assets/images/nft-images/23.png" alt="" />
                                                </span>
                                            </div>
                                            <div>
                                                <h6 className="font-semibold mb-0">Enjin Wallet</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="xxl:col-span-3 xl:col-span-4 md:col-span-6 col-span-12">
                                    <div className="p-4 text-center hover:bg-light border dark:border-defaultborder/10 rounded-md relative">
                                        <Link scroll={false} aria-label="anchor" href="#!" className="stretched-link"></Link>
                                        <div className="flex items-center justify-center gap-4">
                                            <div className="lh-1">
                                                <span className="avatar avatar-rounded bg-light">
                                                    <Image fill src="../../../assets/images/nft-images/20.png" alt="" />
                                                </span>
                                            </div>
                                            <div>
                                                <h6 className="font-semibold mb-0">Trust Wallet</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="xxl:col-span-3 xl:col-span-4 md:col-span-6 col-span-12">
                                    <div className="p-3 !text-center hover:bg-light border dark:border-defaultborder/10 rounded-md relative">
                                        <Link scroll={false} aria-label="anchor" href="#!" className="stretched-link"></Link>
                                        <div className="flex items-center justify-center gap-4">
                                            <div className="lh-1">
                                                <span className="avatar avatar-rounded bg-light p-2">
                                                    <Image fill src="../../../assets/images/nft-images/24.png" alt="" />
                                                </span>
                                            </div>
                                            <div>
                                                <h6 className="font-semibold mb-0">Coinbase Wallet</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="xxl:col-span-3 xl:col-span-2 md:col-span-12 col-span-12"></div>
                                <div className="xxl:col-span-3 xl:col-span-4 md:col-span-6 col-span-12">
                                    <div className="p-4 !text-center hover:bg-light border dark:border-defaultborder/10 rounded-md relative">
                                        <Link scroll={false} aria-label="anchor" href="#!" className="stretched-link"></Link>
                                        <div className="flex items-center justify-center gap-4">
                                            <div className="lh-1">
                                                <span className="avatar avatar-rounded bg-light p-2">
                                                    <Image fill src="../../../assets/images/nft-images/19.png" alt="" />
                                                </span>
                                            </div>
                                            <div>
                                                <h6 className="font-semibold mb-0">Lido</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="xxl:col-span-3 xl:col-span-4 md:col-span-6 col-span-12">
                                    <div className="p-4 text-center hover:bg-light border dark:border-defaultborder/10 rounded-md relative">
                                        <Link scroll={false} aria-label="anchor" href="#!" className="stretched-link"></Link>
                                        <div className="flex items-center justify-center gap-4">
                                            <div className="lh-1">
                                                <span className="avatar avatar-rounded bg-light">
                                                    <Image fill src="../../../assets/images/nft-images/27.png" alt="" />
                                                </span>
                                            </div>
                                            <div>
                                                <h6 className="font-semibold mb-0">Huobi Wallet</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="xxl:col-span-3 xl:col-span-2 md:col-span-12 col-span-12"></div>
                            </div>
                        </div>
                        <div className="box-footer">
                            <div>
                                <button type="button" className="ti-btn !m-0 btn-wave ti-btn-success ltr:float-right rtl:float-left btn-wave">Connect</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}
        </Fragment>
    );
};

export default WalletIntegration;