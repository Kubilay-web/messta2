"use client"
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { Fragment } from "react";
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import dynamic from 'next/dynamic';
const SpkSelect = dynamic(() =>import('@/shared/@spk-reusable-components/spk-packages/spk-reactselect'),{ ssr: false });
import SpkNftcards from "@/shared/@spk-reusable-components/apps/spk-nftcards";
import Link from "next/link";
import { Data1 } from "@/shared/data/apps/nft/nft-details-data";

registerPlugin(FilePondPluginImagePreview, FilePondPluginImageExifOrientation);

const CreateNft = () => {
    

    return (
        <Fragment>

            {/* <!-- Page Header --> */}
            <Seo title="Create NFT" />
            <Pageheader Heading="Create NFT" breadcrumbs={['Apps','NFT']} currentpage="Create NFT" />
            {/* <!-- Page Header Close --> */}

            {/* <!-- Start::row-1 --> */}
            <div className="grid grid-cols-12 gap-6">
                <div className="xxl:col-span-9 xl:col-span-8 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">Create NFT</div>
                        </div>
                        <div className="box-body">
                            <div className="grid grid-cols-12 sm:gap-x-4 gap-y-4 justify-between">
                                <div className="xxl:col-span-4 xl:col-span-12 col-span-12">
                                    <div className="create-nft-item">
                                        <label className="ti-form-label">Upload NFT</label>
                                        <FilePond className="filepond single-fileupload " labelIdle='Drag & Drop your files or <span className="filepond--label-action">Browse</span>'
                                            stylePanelLayout='compact circle' styleLoadIndicatorPosition='center bottom'
                                            styleButtonRemoveItemPosition='center bottom' />
                                    </div>
                                </div>
                                <div className="xxl:col-span-1 xl:col-span-12 col-span-12"></div>
                                <div className="xxl:col-span-7 xl:col-span-12 col-span-12">
                                    <div className="grid grid-cols-12 sm:gap-x-6 gap-y-6">
                                        <div className="xl:col-span-12 col-span-12">
                                            <label htmlFor="input-placeholder" className="ti-form-label">NFT Title</label>
                                            <input type="text" className="form-control" id="input-placeholder" placeholder="eg:Neo-Nebulae" />
                                        </div>
                                        <div className="xl:col-span-12 col-span-12">
                                            <label htmlFor="nft-description" className="ti-form-label">NFT Description</label>
                                            <textarea className="form-control" id="nft-description" rows={3} placeholder="Enter Description"></textarea>
                                        </div>
                                        <div className="xl:col-span-12 col-span-12">
                                            <label htmlFor="nft-link" className="ti-form-label">External Link</label>
                                            <input type="text" className="form-control" id="nft-link" placeholder="External Link Here" />
                                        </div>
                                    </div>
                                </div>
                                <div className="xl:col-span-12 col-span-12">
                                    <div className="grid grid-cols-12  sm:gap-x-4 gap-y-4">
                                        <div className="xl:col-span-6 col-span-12">
                                            <label htmlFor="nft-creator-name" className="ti-form-label">Creator Name</label>
                                            <input type="text" className="form-control" id="nft-creator-name" placeholder="Enter Name" />
                                        </div>
                                        <div className="xl:col-span-6 col-span-12">
                                            <label htmlFor="nft-price" className="ti-form-label">NFT Price</label>
                                            <input type="text" className="form-control" id="nft-price" placeholder="Enter Price" />
                                        </div>
                                        <div className="xl:col-span-4 col-span-12">
                                            <label htmlFor="nft-size" className="ti-form-label">NFT Size</label>
                                            <input type="text" className="form-control" id="nft-size" placeholder="Enter Size" />
                                        </div>
                                        <div className="xl:col-span-4 col-span-12">
                                            <label htmlFor="nft-royality" className="ti-form-label">Royality</label>
                                            <SpkSelect option={Data1} classNameprefix='Select2' menuplacement='auto' mainClass="multi-select"placeholder="Choose Royalities" />
                                        </div>
                                        <div className="xl:col-span-4 col-span-12">
                                            <label htmlFor="nft-property" className="ti-form-label">Property</label>
                                            <input type="text" className="form-control" id="nft-property" placeholder="Enter Property" />
                                        </div>
                                        <div className="xl:col-span-12 col-span-12">
                                            <label className="ti-form-label block">Method</label>
                                            <div className="btn-group inline-flex" role="group" aria-label="Basic radio toggle button group">
                                                <input type="radio" className="btn-check opacity-0 absolute" name="strap-material" id="strap1" defaultChecked />
                                                <label className="!mb-0 ti-btn  btn-wave !m-0 !block sm:!inline-flex !py-1 !px-2 ti-btn-primary !bg-primary !text-white z-0 !rounded-e-none !border-e-0 sm:text-[0.813rem] text-[0.75rem]" htmlFor="strap1"><i className="ti ti-tag me-1 align-middle text-[0.9375rem] inline-block"></i>Fixed Price</label>
                                                <input type="radio" className="btn-check  opacity-0 absolute" name="strap-material" id="strap2" />
                                                <label className="!mb-0 ti-btn  btn-wave !m-0 !block sm:!inline-flex !py-1 !px-2 ti-btn-outline-primary text-default !rounded-none !border-e-0 z-0  sm:text-[0.813rem] text-[0.75rem]" htmlFor="strap2"><i className="ti ti-users text-[0.9375rem] me-1 align-middle inline-block"></i>Open For Bids</label>
                                                <input type="radio" className="btn-check  opacity-0 absolute" name="strap-material" id="strap3" />
                                                <label className="!mb-0 ti-btn  btn-wave !m-0 !block sm:!inline-flex !py-1 !px-2 ti-btn-outline-primary !rounded-s-none text-default z-0  sm:text-[0.813rem] text-[0.75rem]" htmlFor="strap3"><i className="ti ti-hourglass-low text-[0.9375rem] me-1 align-middle inline-block"></i>Timed Auction</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box-footer text-end">
                        <Link scroll={false} href="#!" className="ti-btn  btn-wave ti-btn-primary !m-0 btn-wave">Create NFT</Link>
                        </div>
                    </div>
                </div>
                <div className="xxl:col-span-3 xl:col-span-4 col-span-12">
                    <div className="box custom-box">
                        <div className="box-header">
                            <div className="box-title">
                                NFT Preview Here
                            </div>
                        </div>
                        <SpkNftcards title="CryptoCanvas" ethlogo="../../../assets/images/crypto-currencies/crypto-icons/ethereum-eth-logo.svg" imgSrc="../../../assets/images/nft-images/2.jpg" time="04hrs : 24m : 38s" count="2.78" clientName="PixelCraftPro" />
                    </div>
                </div>
            </div>
            {/* <!--End::row-1 --> */}
        </Fragment>
    );
};

export default CreateNft;