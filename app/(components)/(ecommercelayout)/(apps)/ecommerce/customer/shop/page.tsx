"use client"
import Link from "next/link";
import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import React, { Fragment, useState } from "react";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { connect, useDispatch, useSelector } from "react-redux";
import { addToCart, addToWishlist, setSelectedItem } from "@/shared/redux/action";
import SpkProducts from "@/shared/@spk-reusable-components/apps/spk-products";
import Image from "next/image";

const Shop = () => {

    const AirbnbSlider = styled(Slider)(({ theme }) => ({
        color: '#546dfe',
        height: 3,
        padding: '13px 0',
        '& .MuiSlider-thumb': {
            height: 27,
            width: 27,
            backgroundColor: '#fff',
            border: '1px solid currentColor',
            '&:hover': {
                boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
            },
            '& .airbnb-bar': {
                height: 9,
                width: 1,
                backgroundColor: 'currentColor',
                marginLeft: 1,
                marginRight: 1,
            },
        },
        '& .MuiSlider-track': {
            height: 3,
        },
        '& .MuiSlider-rail': {
            color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
            opacity: theme.palette.mode === 'dark' ? undefined : 1,
            height: 3,
        },
    }));

    function AirbnbThumbComponent(props: any) {
        const { children, ...other } = props;
        return (
            <SliderThumb {...other}>
                {children}
                <span className="airbnb-bar" />
                <span className="airbnb-bar" />
                <span className="airbnb-bar" />
            </SliderThumb>
        );
    }

    //
    const dispatch = useDispatch();
    const cart = useSelector((state: any) => state.reducer.cart);
    const products = useSelector((state: any) => state.reducer.products);




    const allIds = [...cart.map((item: { id: any; }) => item.id), ...products.map((item: { id: any; }) => item.id)];
    const nextId = allIds.length ? Math.max(...allIds) + 1 : 1;

    const handleAddToCart = (item: any) => {
        dispatch(addToCart({ ...item, id: nextId }));
    };
    const handleItemClick = (item: any) => {
        dispatch(setSelectedItem(item));
    };

    const handleAddToWishlist = (item: any) => {
        dispatch(addToWishlist(item));
    };
    const [allData, _setallData] = useState(products);

    return (
        <Fragment>

            {/* Start:: Breadcrumb*/}
            <div className="border-b border-defaultborder dark:border-defaultborder/10 py-4 page-breadcrumb">
                <div className="container">
                    {/* Page Header */}
                    <Seo title={"Products"} />
                    <Pageheader Updated={true} breadcrumbs={['Apps', 'Ecommerce', 'Customer']} currentpage="Products" />
                    {/* Page Header Close */}
                </div>
            </div>
            {/* End:: Breadcrumb*/}

            {/* <!-- Start:: Section-1 --> */}
            <section className="section !py-4">
                <div className="container">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xl:col-span-12 col-span-12">
                            <div className="box">
                                <div className="box-body !p-4">
                                    <div className="grid grid-cols-12 items-center gap-y-2">
                                        <div className="sm:col-span-8 col-span-12">
                                            <div className="flex">
                                                <h5 className="font-semibold mb-0"><span className="font-normal">Showing </span>
                                                    3456  Items</h5>
                                            </div>
                                        </div>
                                        <div className="sm:col-span-4 col-span-12 sm:text-end text-start">
                                            <div className="btn-group ti-dropdown hs-dropdown">
                                                <button
                                                    className="ti-btn ti-btn-outline-light !text-dark border dropdown-toggle !m-0"
                                                    type="button" data-bs-toggle="dropdown" aria-expanded="false"> <i
                                                        className="ti ti-sort-descending-2 me-0"></i> Sort By <i
                                                            className="ri-arrow-down-s-line align-middle ms-0 inline-block"></i>
                                                </button>
                                                <ul className="ti-dropdown-menu hs-dropdown-menu hidden">
                                                    <li><Link scroll={false} className="ti-dropdown-item" href="#!">Date
                                                        Published</Link></li>
                                                    <li><Link scroll={false} className="ti-dropdown-item" href="#!">Most
                                                        Relevant</Link></li>
                                                    <li><Link scroll={false} className="ti-dropdown-item" href="#!">Price Low
                                                        to
                                                        High</Link></li>
                                                    <li><Link scroll={false} className="ti-dropdown-item" href="#!">Price High
                                                        to
                                                        Low</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="lg:col-span-4 col-span-12">
                            <div className="box products-navigation-card">
                                <div className="box-body !p-0">
                                    <div className="p-4 border-b  dark:border-defaultborder/10">
                                        <h6 className="font-semibold mb-0">Categories</h6>
                                        <div className="px-2 py-3 pb-0">
                                            <div className="form-check !mb-3 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="c-1"
                                                    defaultChecked />
                                                <label className="form-check-label" htmlFor="c-1">
                                                    Egg, Fish & Meat
                                                </label>
                                                <span
                                                    className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">2,712</span>
                                            </div>
                                            <div className="form-check !mb-3 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="c-2" />
                                                <label className="form-check-label" htmlFor="c-2">
                                                    Vegetables & Fruits
                                                </label>
                                                <span
                                                    className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">536</span>
                                            </div>
                                            <div className="form-check !mb-3 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="c-3"
                                                    defaultChecked />
                                                <label className="form-check-label" htmlFor="c-3">
                                                    Fashion & Lifestyle
                                                </label>
                                                <span
                                                    className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">18,289</span>
                                            </div>
                                            <div className="form-check !mb-3 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="c-4"
                                                    defaultChecked />
                                                <label className="form-check-label" htmlFor="c-4">
                                                    Electronics
                                                </label>
                                                <span
                                                    className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">3,453</span>
                                            </div>
                                            <div className="form-check !mb-3 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="c-5" />
                                                <label className="form-check-label" htmlFor="c-5">
                                                    Household
                                                </label>
                                                <span
                                                    className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">7,165</span>
                                            </div>
                                            <div className="hs-collapse w-full overflow-hidden transition-[height] duration-300 hidden"
                                                id="hs-show-hide-categories-heading"
                                                aria-labelledby="hs-show-hide-categories">
                                                <div className="form-check !mb-3 !flex items-center">
                                                    <input className="form-check-input me-2" type="checkbox" id="c-6" />
                                                    <label className="form-check-label" htmlFor="c-6" >
                                                        Mobiles
                                                    </label>
                                                    <span
                                                        className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">5,964</span>
                                                </div>
                                                <div className="form-check !mb-3 !flex items-center">
                                                    <input className="form-check-input me-2" type="checkbox" id="c-7" />
                                                    <label className="form-check-label" htmlFor="c-7">
                                                        Home Appliances
                                                    </label>
                                                    <span
                                                        className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">2,123</span>
                                                </div>
                                            </div>
                                            <Link scroll={false} className="ecommerce-more-link hs-collapse-toggle"
                                                id="hs-show-hide-categories"
                                                data-hs-collapse="#hs-show-hide-categories-heading"
                                                href="#category-more" role="button">MORE</Link>
                                        </div>
                                    </div>
                                    <div className="p-4 border-b  dark:border-defaultborder/10">
                                        <h6 className="font-semibold mb-0">Brand</h6>
                                        <div className="px-2 py-3 pb-0">
                                            <div className="form-check !mb-3 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="j-1"
                                                    defaultChecked />
                                                <label className="form-check-label" htmlFor="j-1">
                                                    Ruby
                                                </label>
                                                <span
                                                    className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">512</span>
                                            </div>
                                            <div className="form-check !mb-3 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="j-2"
                                                    defaultChecked />
                                                <label className="form-check-label" htmlFor="j-2">
                                                    Hadlirams
                                                </label>
                                                <span
                                                    className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">2,186</span>
                                            </div>
                                            <div className="form-check !mb-3 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="j-3"
                                                    defaultChecked />
                                                <label className="form-check-label" htmlFor="j-3">
                                                    Xioami
                                                </label>
                                                <span
                                                    className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">734</span>
                                            </div>
                                            <div className="form-check !mb-3 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="j-4" />
                                                <label className="form-check-label" htmlFor="j-4">
                                                    Samsnug
                                                </label>
                                                <span
                                                    className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">16</span>
                                            </div>
                                            <div className="form-check !mb-3 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="j-5" />
                                                <label className="form-check-label" htmlFor="j-5">
                                                    Tommy & Hilfigure
                                                </label>
                                                <span
                                                    className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">1,432</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 border-b  dark:border-defaultborder/10">
                                        <h6 className="font-semibold mb-0">Price Range</h6>
                                        <div className="px-2 py-3 pb-0">
                                            <div id="nonlinear">
                                                <AirbnbSlider
                                                    slots={{ thumb: AirbnbThumbComponent }}
                                                    getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
                                                    defaultValue={[10, 90]}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 border-b  dark:border-defaultborder/10">
                                        <h6 className="font-semibold mb-0">Discount</h6>
                                        <div className="px-2 py-3 pb-0">
                                            <div className="form-check !mb-3 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="q-1" />
                                                <label className="form-check-label" htmlFor="q-1">
                                                    0% - 20%
                                                </label>
                                                <span
                                                    className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">16,563</span>
                                            </div>
                                            <div className="form-check !mb-3 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="q-2"
                                                    defaultChecked />
                                                <label className="form-check-label" htmlFor="q-2">
                                                    20% - 40%
                                                </label>
                                                <span
                                                    className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">15,234</span>
                                            </div>
                                            <div className="form-check !mb-3 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="q-3" />
                                                <label className="form-check-label" htmlFor="q-3">
                                                    40% - 60%
                                                </label>
                                                <span
                                                    className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">6,278</span>
                                            </div>
                                            <div className="form-check !mb-3 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="q-4"
                                                    defaultChecked />
                                                <label className="form-check-label" htmlFor="q-4">
                                                    60% - 80%
                                                </label>
                                                <span
                                                    className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">4,531</span>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="q-5" />
                                                <label className="form-check-label" htmlFor="q-5">
                                                    80% - 90%
                                                </label>
                                                <span
                                                    className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">2,405</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h6 className="font-semibold mb-0">Sizes</h6>
                                        <div className="px-2 py-3 pb-0">
                                            <div className="form-check !mb-3 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="e-1"
                                                    defaultChecked />
                                                <label className="form-check-label" htmlFor="e-1">
                                                    Extra Small (XS)
                                                </label>
                                                <span
                                                    className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">23,156</span>
                                            </div>
                                            <div className="form-check !mb-3 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="e-2" />
                                                <label className="form-check-label" htmlFor="e-2">
                                                    Small (SM)
                                                </label>
                                                <span
                                                    className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">15,632</span>
                                            </div>
                                            <div className="form-check !mb-3 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="e-3"
                                                    defaultChecked />
                                                <label className="form-check-label" htmlFor="e-3">
                                                    Medium (MD)
                                                </label>
                                                <span
                                                    className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">15,032</span>
                                            </div>
                                            <div className="form-check !mb-3 !flex items-center">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="e-4"
                                                    defaultChecked />
                                                <label className="form-check-label" htmlFor="e-4">
                                                    Large (L)
                                                </label>
                                                <span
                                                    className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">7,154</span>
                                            </div>
                                            <div className="hs-collapse w-full overflow-hidden transition-[height] duration-300 hidden"
                                                id="hs-show-hide-location-heading"
                                                aria-labelledby="hs-show-hide-location">
                                                <div className="form-check !mb-3 !flex items-center">
                                                    <input className="form-check-input me-2" type="checkbox" value=""
                                                        id="s-5" />
                                                    <label className="form-check-label" htmlFor="s-5">
                                                        Extra Large (XL)
                                                    </label>
                                                    <span
                                                        className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">5,946</span>
                                                </div>
                                                <div className="form-check !mb-3 !flex items-center">
                                                    <input className="form-check-input me-2" type="checkbox" value=""
                                                        id="s-6" />
                                                    <label className="form-check-label" htmlFor="s-6">
                                                        XXL
                                                    </label>
                                                    <span
                                                        className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">3,267</span>
                                                </div>
                                                <div className="form-check !mb-3 !flex items-center">
                                                    <input className="form-check-input me-2" type="checkbox" value=""
                                                        id="s-7" />
                                                    <label className="form-check-label" htmlFor="s-7">
                                                        XXXL
                                                    </label>
                                                    <span
                                                        className="badge bg-light border border-defaultborder dark:border-defaultborder/10 text-default font-medium float-end ms-auto">578</span>
                                                </div>
                                            </div>
                                            <Link scroll={false} className="ecommerce-more-link hs-collapse-toggle" id="hs-show-hide-location"
                                                data-hs-collapse="#hs-show-hide-location-heading" href="#sizes-more"
                                                role="button">MORE</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-8 col-span-12">
                            <div className="grid grid-cols-12 gap-x-6">
                                {allData.map((idx: any) => (
                                    <div className="xl:col-span-4 md:col-span-6 sm:col-span-6 col-span-12" key={idx.id}>
                                        <SpkProducts idx={`/apps/ecommerce/product-details?id=${idx.id}`} onclick={() => handleAddToWishlist(idx)} cartClick={() => handleAddToCart(idx)} detailsClick={() => handleItemClick(idx)} card={idx} />
                                    </div>
                                ))}
                                <div className="md:col-span-12 col-span-12">
                                    {/* <!-- Start::pagination --> */}
                                    <nav aria-label="..." className="">
                                        <ul className="ti-pagination justify-end mb-0">
                                            <li className="page-item">
                                                <Link href="#!" scroll={false} className=" bg-white dark:bg-bodybg page-link disabled">Previous</Link>
                                            </li>
                                            <li className="page-item"><Link scroll={false} className="page-link bg-white dark:bg-bodybg" href="#!">1</Link>
                                            </li>
                                            <li className="page-item" aria-current="page">
                                                <Link scroll={false} className="page-link bg-white dark:bg-bodybg active" href="#!">2</Link>
                                            </li>
                                            <li className="page-item"><Link scroll={false} className="page-link bg-white dark:bg-bodybg" href="#!">3</Link>
                                            </li>
                                            <li className="page-item">
                                                <Link scroll={false} className="page-link bg-white dark:bg-bodybg" href="#!">Next</Link>
                                            </li>
                                        </ul>
                                    </nav>
                                    {/* <!-- End::pagination --> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- End:: Section-1 --> */}

            {/* <!-- Start:: Section-4 --> */}
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
                                <Image fill src="../../../assets/assets/images/media/apps/play-store.png" alt="" />
                                Google Play
                            </Link>
                            <Link scroll={false} href="#!" className="ti-btn  bg-black app-store relative">
                                <Image fill src="../../../assets/assets/images/media/apps/apple-store.png" alt="" className="invert-1" />
                                App Store
                            </Link>
                        </div>
                    </div>
                    <div className="lg:col-span-3 col-span-1 text-center"></div>
                </div>
            </section>
            {/* <!-- End:: Section-4 --> */}
        </Fragment>
    );
};

const mapStateToProps = (state: any) => ({
    local_varaiable: state.reducer
});
export default connect(mapStateToProps,)(Shop);