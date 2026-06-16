"use client"
import dynamic from 'next/dynamic';
const SpkSelect = dynamic(() =>import('@/shared/@spk-reusable-components/spk-packages/spk-reactselect'),{ ssr: false });
import { days, payment, quantity, simpleItems, simpleItems1, simpleItems2, taxes } from "@/shared/data/apps/ecommers/admin/addproduct";

import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";
import CreatableSelect from 'react-select/creatable';

const AddProduct = () => {
    //create
    const components = {
        DropdownIndicator: null,
    };

    const createOption = (label: string) => ({
        label,
        value: label,
    });

    const [inputValue, setInputValue] = React.useState('');
    const [value, setValue] = React.useState<any>([]);

    const handleKeyDown = (event: any) => {
        if (!inputValue) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                setValue((prev: any) => [...prev, createOption(inputValue)]);
                setInputValue('');
                event.preventDefault();
        }
    };

    return (
        <Fragment>
            {/* <!-- Start::app-content --> */}
            <div className="main-content landing-main ecommerce-main">

                {/* Start:: Breadcrumb*/}
                <div className="border-b border-defaultborder dark:border-defaultborder/10 py-4 page-breadcrumb">
                    <div className="container">
                        {/* Page Header */}
                        <Seo title={"Add Product"} />
                        <Pageheader Updated={true} breadcrumbs={['Apps', 'Ecommerce', 'Vendor']} currentpage="Add Product" />
                        {/* Page Header Close */}
                    </div>
                </div>
                {/* End:: Breadcrumb*/}

                {/* <!-- Start:: Section-1 --> */}
                <section className="section !py-3">
                    <div className="container">
                        <div className="grid grid-cols-12 gap-x-6">
                            <div className="xl:col-span-12 col-span-12">
                                <div className="grid grid-cols-12 gap-x-6">
                                    <div className="lg:col-span-12 col-span-12">
                                        <div className="box">
                                            <div className="box-header">
                                                <div className="box-title flex-grow-1">
                                                    Add Product
                                                </div>
                                                <Link href="/ecommerce/vendor/vendor/"
                                                    className="ti-btn ti-btn-outline-light btn-wave waves-effect waves-light !text-dark !m-0">
                                                    <i className="bi bi-arrow-right  rtl:rotate-180 inline-flex  me-1"></i> Go Back
                                                </Link>
                                            </div>
                                            <div className="box-body">
                                                <div className="grid grid-cols-12 gap-6">
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label htmlFor="Product-name" className="ti-form-label">Product Name</label>
                                                        <input type="text" className="form-control" id="Product-name"
                                                            placeholder="Product Name" defaultValue="SoundSync Headphones" />
                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label className="ti-form-label">Product Category</label>
                                                        <SpkSelect option={simpleItems} mainClass="basic-multi-select" name="Category-select"
                                                            menuplacement='auto' classNameprefix="Select2" defaultvalue={[simpleItems[0]]} />

                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label className="ti-form-label">Brand</label>
                                                        <SpkSelect option={simpleItems1} mainClass="basic-multi-select" name="Category-select"
                                                            menuplacement='auto' classNameprefix="Select2" defaultvalue={[simpleItems1[0]]} />

                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label className="ti-form-label">Property Address</label>
                                                        <SpkSelect option={simpleItems2} mainClass="basic-multi-select" name="address"
                                                            menuplacement='auto' classNameprefix="Select2" defaultvalue={[simpleItems2[0]]} />
                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label className="ti-form-label">Stock QTY</label>
                                                        <SpkSelect option={quantity} mainClass="basic-multi-select" name="stockqty"
                                                            menuplacement='auto' classNameprefix="Select2" defaultvalue={[quantity[0]]} />

                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label className="ti-form-label">Taxes</label>
                                                        <SpkSelect option={taxes} mainClass="basic-multi-select" name="Taxes"
                                                            menuplacement='auto' classNameprefix="Select2" defaultvalue={[taxes[0]]} />
                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label className="ti-form-label">Shipping Days</label>
                                                        <SpkSelect option={days} mainClass="basic-multi-select" name="Bathrooms"
                                                            menuplacement='auto' classNameprefix="Select2" defaultvalue={[days[0]]} />

                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label htmlFor="discount" className="ti-form-label">Discount (%)</label>
                                                        <input type="text" className="form-control" id="discount"
                                                            placeholder="Discount" />
                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label htmlFor="SKU" className="ti-form-label">SKU</label>
                                                        <input type="text" className="form-control" id="SKU" placeholder="SKU" defaultValue="#SPK147" />
                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label htmlFor="tags-name" className="ti-form-label">Tags</label>
                                                        <CreatableSelect classNamePrefix="Select2"
                                                            //classNamePrefix='react-select'
                                                            components={components}
                                                            inputValue={inputValue}
                                                            isClearable
                                                            isMulti
                                                            menuIsOpen={false}
                                                            onChange={(newValue) => setValue(newValue)}
                                                            onInputChange={(newValue) => setInputValue(newValue)}
                                                            onKeyDown={handleKeyDown}
                                                            placeholder="Type something and press enter..."
                                                            value={value}
                                                        />
                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label className="ti-form-label">Payment Options</label>
                                                        <SpkSelect multi option={payment} mainClass="basic-multi-select" name="Payment" id="payment"
                                                            menuplacement='auto' classNameprefix="Select2" defaultvalue={[payment[0]]} />

                                                    </div>
                                                    <div className="xl:col-span-6 col-span-12">
                                                        <label htmlFor="Price" className="ti-form-label">Price</label>
                                                        <input type="text" className="form-control" id="Price"
                                                            placeholder="Price" defaultValue="$3654" />
                                                    </div>
                                                    <div className="xl:col-span-12 col-span-12">
                                                        <label className="ti-form-label">Product Description :</label>
                                                        <textarea className="form-control" id="Ad-description"
                                                            rows={7} defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. At sit impedit, officiis non minima saepe voluptates a magnam enim sequi porro veniam ea suscipit dolorum vel mollitia voluptate iste nemo!"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-12 col-span-12">
                                        <div className="box">
                                            <div className="box-header">
                                                <div className="box-title">Vendor Profile</div>
                                            </div>
                                            <div className="box-body">
                                                <div className="xl:col-span-12 col-span-12">
                                                    <div className="mb-3">
                                                        <span className="avatar avatar-lg avatar-rounded">
                                                            <Image fill src="../../../assets/images/faces/9.jpg" alt=""
                                                                className="w-100 h-100" />
                                                            <Link scroll={false} href="#!"
                                                                className="badge rounded-pill bg-danger avatar-badge text-white"><i
                                                                    className="fe fe-x text-[0.75rem]"></i></Link>
                                                        </span>
                                                    </div>
                                                    <div className="btn-list">
                                                        <div> <label htmlFor="small-file-input2" className="sr-only">Choose file</label> <input type="file" name="small-file-input1" id="small-file-input2" className="block w-full border border-defaultborder focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-defaultborder dark:focus:border-white/10 dark:border-white/10 dark:text-white/50
                                                        file:border-0
                                                       file:bg-light file:me-4
                                                       file:py-2 file:px-4
                                                       dark:file:bg-black/20 dark:file:text-white/50" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="box">
                                            <div className="box-header">
                                                <div className="box-title">Product Images </div>
                                            </div>
                                            <div className="box-body">
                                                <div className="grid grid-cols-12 gap-x-6 gap-y-4">
                                                    <div className="xl:col-span-12 col-span-12">
                                                        <div className="mb-3">
                                                            <span className="avatar avatar-xl bg-gray-300 dark:bg-light me-2 avatar-square">
                                                                <Image fill src="../../../assets/images/ecommerce/png/13.png" alt=""
                                                                    className="w-100 h-100" />
                                                                <Link scroll={false} href="#!"
                                                                    className="badge rounded-pill bg-danger avatar-badge text-white"><i
                                                                        className="fe fe-x text-[0.75rem]"></i></Link>
                                                            </span>
                                                            <span className="avatar avatar-xl bg-gray-300 dark:bg-light me-2 avatar-square">
                                                                <Image fill src="../../../assets/images/ecommerce/png/14.png" alt=""
                                                                    className="w-100 h-100" />
                                                                <Link scroll={false} href="#!"
                                                                    className="badge rounded-pill bg-danger avatar-badge text-white"><i
                                                                        className="fe fe-x text-[0.75rem]"></i></Link>
                                                            </span>
                                                            <span className="avatar avatar-xl bg-gray-300 dark:bg-light me-2 avatar-square">
                                                                <Image fill src="../../../assets/images/ecommerce/png/15.png" alt=""
                                                                    className="w-100 h-100" />
                                                                <Link scroll={false} href="#!"
                                                                    className="badge rounded-pill bg-danger avatar-badge text-white"><i
                                                                        className="fe fe-x text-[0.75rem]"></i></Link>
                                                            </span>
                                                            <span className="avatar avatar-xl bg-gray-300 dark:bg-light me-2 avatar-square">
                                                                <Image fill src="../../../assets/images/ecommerce/png/16.png" alt=""
                                                                    className="w-100 h-100" />
                                                                <Link scroll={false} href="#!"
                                                                    className="badge rounded-pill bg-danger avatar-badge text-white"><i
                                                                        className="fe fe-x text-[0.75rem]"></i></Link>
                                                            </span>
                                                        </div>
                                                        <label className="ti-form-label">Upload Image</label>
                                                        <div> <label htmlFor="small-file-input" className="sr-only">Choose file</label> <input type="file" name="small-file-input" id="small-file-input" className="block w-full border border-defaultborder focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-defaultborder dark:focus:border-white/10 dark:border-white/10 dark:text-white/50
                                                        file:border-0
                                                       file:bg-light file:me-4
                                                       file:py-2 file:px-4
                                                       dark:file:bg-black/20 dark:file:text-white/50" />
                                                        </div>
                                                        <p className="mb-0 mt-2 text-[0.75rem] text-textmuted dark:text-textmuted/50">Minimum 0f 6 images are need to be
                                                            uploaded,make sure the image size match the proper background
                                                            size and all images should be uniformly maintained with width
                                                            and height.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-12 col-span-12 text-end">
                                        <button className="ti-btn ti-btn-lg ti-btn-primary">
                                            Add Product
                                        </button>
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
                                    <Image fill src="../../../assets/images/media/apps/play-store.png" alt="" />
                                    Google Play
                                </Link>
                                <Link scroll={false} href="#!" className="ti-btn  bg-black app-store relative">
                                    <Image fill src="../../../assets/images/media/apps/apple-store.png" alt="" className="invert-1" />
                                    App Store
                                </Link>
                            </div>
                        </div>
                        <div className="lg:col-span-3 col-span-1 text-center"></div>
                    </div>
                </section>
                {/* <!-- End:: Section-2 --> */}

            </div>
            {/* <!-- End::app-content --> */}

        </Fragment>
    );
};

export default AddProduct;