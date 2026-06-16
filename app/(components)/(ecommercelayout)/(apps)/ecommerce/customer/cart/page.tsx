"use client"
import Spktables from "@/shared/@spk-reusable-components/tables/spk-tables";
import { Ecommerceproducts } from "@/shared/data/apps/ecommers/customer/reduxdata";

import Pageheader from "@/shared/layouts-components/page-header/pageheader";
import Seo from "@/shared/layouts-components/seo/seo";
import { addToWishlist, removeFromCart } from "@/shared/redux/action";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';

const Cart = () => {

    const dispatch = useDispatch();
    const reduxCart = useSelector((state: any) => state.reducer.cart);
    const [localCart, setLocalCart] = useState(Ecommerceproducts);
    const card = [...localCart, ...reduxCart];

    useEffect(() => {
        setLocalCart(localCart.filter((item: any) => !reduxCart.some((reduxItem: { id: number; }) => reduxItem.id === item.id)));
    }, [reduxCart]);

    const handleClick = (id: number) => {
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
            }
            else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'Your file is safe :)', 'error');
            }
        });
    };

    const handleDelete = (id: number) => {
        setLocalCart(localCart.filter((item: any) => item.id !== id));
        dispatch(removeFromCart(id));
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
    };

    const handleAddToWishlist = (item: any) => {
        dispatch(addToWishlist(item));
    };


    function dec(el: any) {
        let unit = el.currentTarget.parentElement.querySelector("input").value;

        if (Number(unit) === 0) {
            return false;
        } else {
            el.currentTarget.parentElement.querySelector("input").value--;
        }
    }
    function inc(el: any) {
        el.currentTarget.parentElement.querySelector("input").value++;
    }

    const isEmpty = card.length === 0;


    return (
        <Fragment>

            {/* Start:: Breadcrumb*/}
            <div className="border-b border-defaultborder dark:border-defaultborder/10 py-4 page-breadcrumb">
                <div className="container">
                    {/* Page Header */}
                    <Seo title={"Cart"} />
                    <Pageheader Updated={true} breadcrumbs={['Apps', 'Ecommerce', 'Customer']} currentpage="Cart" />
                    {/* Page Header Close */}
                </div>
            </div>
            {/* End:: Breadcrumb*/}

            {/* <!-- Start:: Section-1 --> */}
            <section className="section !py-4">
                <div className="container">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xl:col-span-9 col-span-12">
                            {isEmpty ? (
                                <div className="box" id="cart-empty-cart">
                                    <div className="box-header">
                                        <div className="box-title">
                                            Empty Cart
                                        </div>
                                    </div>
                                    <div className="box-body">
                                        <div className="cart-empty !text-center">
                                            <span className="svg-muted">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="inline-flex" width="24" height="24" viewBox="0 0 24 24"><path d="M18.6 16.5H8.9c-.9 0-1.6-.6-1.9-1.4L4.8 6.7c0-.1 0-.3.1-.4.1-.1.2-.1.4-.1h17.1c.1 0 .3.1.4.2.1.1.1.3.1.4L20.5 15c-.2.8-1 1.5-1.9 1.5zM5.9 7.1 8 14.8c.1.4.5.8 1 .8h9.7c.5 0 .9-.3 1-.8l2.1-7.7H5.9z" /><path d="M6 10.9 3.7 2.5H1.3v-.9H4c.2 0 .4.1.4.3l2.4 8.7-.8.3zM8.1 18.8 6 11l.9-.3L9 18.5z" /><path d="M20.8 20.4h-.9V20c0-.7-.6-1.3-1.3-1.3H8.9c-.7 0-1.3.6-1.3 1.3v.5h-.9V20c0-1.2 1-2.2 2.2-2.2h9.7c1.2 0 2.2 1 2.2 2.2v.4z" /><path d="M8.9 22.2c-1.2 0-2.2-1-2.2-2.2s1-2.2 2.2-2.2c1.2 0 2.2 1 2.2 2.2s-1 2.2-2.2 2.2zm0-3.5c-.7 0-1.3.6-1.3 1.3 0 .7.6 1.3 1.3 1.3.8 0 1.3-.6 1.3-1.3 0-.7-.5-1.3-1.3-1.3zM18.6 22.2c-1.2 0-2.2-1-2.2-2.2s1-2.2 2.2-2.2c1.2 0 2.2 1 2.2 2.2s-.9 2.2-2.2 2.2zm0-3.5c-.8 0-1.3.6-1.3 1.3 0 .7.6 1.3 1.3 1.3.7 0 1.3-.6 1.3-1.3 0-.7-.5-1.3-1.3-1.3z" /></svg>
                                            </span>
                                            <h3 className="font-bold mb-1">Your Cart is Empty</h3>
                                            <h5 className="mb-4">Add some items to make me happy :)</h5>
                                            <Link scroll={false} href={"/ecommerce/customer/shop/"} className="ti-btn ti-btn-primary btn-wave m-3" data-abc="true">continue shopping <i className="bi bi-arrow-right  rtl:rotate-180 inline-flex  ms-1"></i></Link>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="box overflow-hidden" id="cart-container-delete">
                                    <div className="box-header">
                                        <div className="box-title">
                                            Cart Items
                                        </div>
                                    </div>
                                    <div className="box-body !p-0">
                                        <div className="table-responsive">
                                            <Spktables tableClass="ti-custom-table ti-custom-table-head w-full" header={[{ title: 'Product Name' }, { title: 'Price', }, { title: 'Quantity', }, { title: 'Total' }, { title: 'Action' }]}>
                                                {card.map((idx: any) => (

                                                    <tr key={idx.id}>
                                                        <td>
                                                            <div className="flex items-center">
                                                                <div className="me-3">
                                                                    <span className="avatar avatar-xxl bg-light">
                                                                        <Image fill src={idx.preview} alt="" />
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <div className="mb-1 text-[0.875rem] font-semibold">
                                                                        <Link scroll={false} href="#!">{idx.title}</Link>
                                                                    </div>
                                                                    <div className="mb-1">
                                                                        <span className="me-1">Size:</span><span className="font-semibold text-textmuted dark:text-textmuted/50">{idx.Size}</span>
                                                                    </div>
                                                                    <div className="mb-1">
                                                                        <span className="me-1">Color:</span><span className="font-semibold text-textmuted dark:text-textmuted/50">{idx.color}
                                                                            {idx.color === "Blue" ? (
                                                                                <span className="badge bg-secondary text-white ms-3">25% discount</span>
                                                                            ) : (
                                                                                <span className="badge bg-success/[0.15] text-success ms-3">In Offer</span>
                                                                            )}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="font-semibold text-[0.875rem]">{idx.newpr} </div>
                                                        </td>
                                                        <td className="product-quantity-container">
                                                            <div className="input-group border !rounded-[0.3125rem] rounded !flex-nowrap dark:border-defaultborder/10"  >
                                                                <button onClick={dec} className="ti-btn ti-btn-icon !w-[1.5rem] ti-btn-light !m-0 input-group-text flex-grow !border-0 product-quantity-minus" ><i className="ri-subtract-line"></i></button>
                                                                <input defaultValue={idx.quantity} type="text" className="form-control form-control-sm border-0 text-center !w-full" aria-label="quantity" id="product-quantity" />
                                                                <button onClick={inc} className="ti-btn ti-btn-icon !w-[1.5rem] ti-btn-light !m-0 input-group-text flex-grow !border-0 product-quantity-plus" ><i className="ri-add-line"></i></button>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="text-[0.875rem] font-semibold">{idx.newpr} </div>
                                                        </td>
                                                        <td>
                                                            <div className="hs-tooltip ti-main-tooltip">
                                                                <Link scroll={false} href="/ecommerce/customer/wishlist"
                                                                    className="hs-tooltip-toggle ti-btn ti-btn-icon ti-btn-success me-2">
                                                                    <i className="ri-heart-line"></i>
                                                                    <span
                                                                        className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !rounded-sm !font-medium !text-white shadow-sm"
                                                                        role="tooltip">
                                                                        Add To Wishlist
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="hs-tooltip ti-main-tooltip">
                                                                <Link onClick={() => handleClick(idx.id)} scroll={false} href="#!"
                                                                    className="hs-tooltip-toggle ti-btn ti-btn-icon ti-btn-danger btn-delete">
                                                                    <i className="ri-delete-bin-line"></i>
                                                                    <span
                                                                        className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !rounded-sm !font-medium !text-white shadow-sm"
                                                                        role="tooltip">
                                                                        Remove From cart
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </Spktables>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="xl:col-span-3 col-span-12">
                            <div className="box">
                                <div className="p-4 border-b dark:border-defaultborder/10 block">
                                    <div className="alert alert-primary text-center" role="alert">
                                        <span className="text-default">Sale Ends in</span> <span className="font-semibold text-[0.875rem] text-primary ms-1">18 Hours : 32 Minutes</span>
                                    </div>
                                </div>
                                <div className="box-body !p-0">
                                    <div className="p-4 border-b border-dashed border-defaultborder dark:border-defaultborder/10">
                                        <p className="mb-2 font-semibold">Delivery:</p>
                                        <div className="btn-group inline-flex gap-0" role="group" aria-label="Basic radio toggle button group">
                                            <input type="radio" className="btn-check absolute opacity-0" name="btnradio" id="btnradio1" />
                                            <label className="ti-btn ti-btn-outline-light !text-dark !m-0 !rounded-e-none border-e-0" htmlFor="btnradio1">Free Delivery</label>
                                            <input type="radio" className="btn-check absolute opacity-0" name="btnradio" id="btnradio2" defaultChecked />
                                            <label className="ti-btn ti-btn-outline-light bg-light !text-dark !m-0 !rounded-s-none !border-s-0" htmlFor="btnradio2">Express Delivery</label>
                                        </div>
                                        <p className="mb-0 mt-2 text-[0.75rem] text-textmuted dark:text-textmuted/50">Delivered by 24,Nov 2022</p>
                                    </div>
                                    <div className="p-4 border-b border-dashed border-defaultborder dark:border-defaultborder/10">
                                        <div className="input-group">
                                            <input type="text" className="form-control form-control-sm !border-s" placeholder="Coupon Code" aria-label="coupon-code" aria-describedby="coupons" />
                                            <button className="ti-btn ti-btn-primary !bg-primary border !border-primary !text-white !m-0 input-group-text" id="coupons">Apply</button>
                                        </div>
                                        <Link scroll={false} href="#!" className="text-[0.75rem] text-success">10% off on first purchase</Link>
                                    </div>
                                    <div className="p-4 border-b border-dashed border-defaultborder dark:border-defaultborder/10">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="text-textmuted dark:text-textmuted/50 opacity-70">Sub Total</div>
                                            <div className="font-semibold text-[0.875rem]">$1,299</div>
                                        </div>
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="text-textmuted dark:text-textmuted/50 opacity-70">Discount</div>
                                            <div className="font-semibold text-[0.875rem] text-success">10% - $129</div>
                                        </div>
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="text-textmuted dark:text-textmuted/50 opacity-70">Delivery Charges</div>
                                            <div className="font-semibold text-[0.875rem] text-danger">- $49</div>
                                        </div>
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="text-textmuted dark:text-textmuted/50 opacity-70">Service Tax (18%)</div>
                                            <div className="font-semibold text-[0.875rem]">- $169</div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="text-textmuted dark:text-textmuted/50 opacity-70">Total :</div>
                                            <div className="font-semibold text-[0.875rem] text-primary"> $1,387</div>
                                        </div>
                                    </div>
                                    <div className="p-4 grid">
                                        <Link scroll={false} href={"/ecommerce/customer/checkout"} className="ti-btn ti-btn-primary btn-wave mb-2">Proceed To Checkout</Link>
                                        <Link scroll={false} href={"/ecommerce/customer/shop"} className="ti-btn ti-btn-light btn-wave">Continue Shopping</Link>
                                    </div>
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
            {/* <!-- End:: Section-4 --> */}
        </Fragment>
    );
};


const mapStateToProps = (state: any) => ({
    local_varaiable: state.reducer
});
export default connect(mapStateToProps,)(Cart);