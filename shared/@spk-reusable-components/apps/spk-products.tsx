import React, { Fragment } from 'react';
import SpkOverlay from '../uielements/spk-overlay';
import Link from 'next/link';

import Image from 'next/image';

interface SpkProductsProps {
    onclick?: () => void;
    cartClick?: () => void;
    detailsClick?: () => void;
    card?: any;
    idx?: any;
}

const SpkProducts: React.FC<SpkProductsProps> = ({ onclick, cartClick, detailsClick, card, idx }) => {
    return (
        <Fragment>
            <div className="box card-style-2">
                <div className="box-body !p-0">
                    <span className={`badge bg-${card.badgeColor}/[0.15] text-${card.badgeColor} top-left-badge`}>{card.badgetxt}</span>
                    <div className={`badge top-right-badge bg-${card.rightbadgecolor} !text-white`}>
                        <div className="badge-icon"><i className={`ti ti-${card.rightbadgeicon} text-[0.875rem]`}></i></div>
                        <div className="badge-text">{card.rightbadgetxt}</div>
                    </div>

                    <div className="card-img-top border-b  dark:border-defaultborder/10 border-block-end-dashed">
                        <Link scroll={false} href="/ecommerce/customer/product-details" className="stretched-link"></Link>
                        <div className="btns-container-1 align-items-center gap-1">
                            <SpkOverlay customClass="[--placement:top]">
                                <Link onClick={detailsClick} scroll={false} href="/ecommerce/customer/product-details" className="ti-btn ti-btn-icon ti-btn-primary !rounded-full">
                                    <i className="ti ti-eye text-[0.875rem]"></i>
                                    <span
                                        className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm dark:bg-slate-700"
                                        role="tooltip">
                                        Quick View
                                    </span>
                                </Link>
                            </SpkOverlay>
                            <SpkOverlay customClass="[--placement:top]">
                                <Link scroll={false} href="/ecommerce/customer/compare-products"
                                    className="hs-tooltip-toggle ti-btn ti-btn-icon ti-btn-primary !rounded-full">
                                    <i className="ti ti-circle-half-2 text-[0.875rem]"></i>
                                    <span className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !rounded-sm !font-medium !text-white shadow-sm"
                                        role="tooltip">
                                        Compare
                                    </span>
                                </Link>
                            </SpkOverlay>
                            <SpkOverlay customClass="[--placement:top]">
                                <Link scroll={false} href="/ecommerce/customer/cart" onClick={cartClick}
                                    className="hs-tooltip-toggle ti-btn ti-btn-icon ti-btn-primary !rounded-full">
                                    <i className="ti ti-shopping-cart-plus text-[0.875rem]"></i>
                                    <span
                                        className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !rounded-sm !font-medium !text-white shadow-sm"
                                        role="tooltip">
                                        Add to cart
                                    </span>
                                </Link>
                            </SpkOverlay>
                        </div>
                        <div className="img-box-2 p-2 relative">
                            <Image fill src={card.preview} alt="img" className="scale-img img-fluid w-100 bg-light rounded" />
                        </div>
                    </div>
                    <div className="p-3">
                        <div className="flex items-start justify-between">
                            <div className="flex-grow">
                                <Link scroll={false} href="#!" className="mb-2 inline-block text-primary text-[0.8125rem] font-semibold">{card.brand}</Link>
                                <h6 className="mb-1 font-semibold text-[1rem]"><Link scroll={false} href={idx}>{card.title}</Link></h6>
                                <div className="flex align-items-baseline text-[0.6875rem]">
                                    <div className="min-w-fit">
                                        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
                                        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
                                        <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
                                        <span className="text-warning"><i className="bi bi-star-half"></i></span>
                                    </div>
                                    <p className="mb-0 ms-1 min-w-fit text-muted">
                                        <span> (142)</span>
                                        <span> Ratings</span>
                                    </p>
                                </div>
                            </div>
                            <div className="min-w-fit">
                                <div className="hs-tooltip ti-main-tooltip">
                                    <Link scroll={false} onClick={onclick} href="/ecommerce/customer/wishlist" className={`hs-tooltip-toggle btn btn-wishlist btn-icon rounded-circle ${card.active}`}>
                                        <i className="bi bi-heart outline1"></i>
                                        <i className="bi bi-heart-fill filled"></i>
                                        <span className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !rounded-sm !font-medium !text-white shadow-sm" role="tooltip">
                                            Wishlist
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="flex align-items-baseline mt-4">
                            <h5 className="font-semibold text-primary mb-0">$120</h5>
                            <span className="text-[0.8125rem] ms-2 text-muted text-decoration-line-through">$399</span>
                        </div>
                    </div>
                    <Link scroll={false} href="#!" className="ti-btn ti-btn-lg ti-btn-soft-primary !border-0 !m-0 !rounded-tl-md btn-style-1 rtl:!rounded-tr-md rtl:!rounded-tl-none">
                        <i className="ti ti-shopping-cart-plus me-1"></i>Add
                    </Link>
                </div>
            </div>

        </Fragment>
    );
};

export default SpkProducts;
