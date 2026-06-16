"use client";
import ProductCard from "@/app/projects/components/store/cards/product/product-card";
import { getHomeDataDynamic } from "@/app/queries/home";
import { getProducts } from "@/app/queries/product";
import SpkSwiperJs from "@/shared/@spk-reusable-components/spk-packages/spk-swiperjs";
import {
  bannersData,
  LandingPageProducts,
  RecentlyAddedTabData,
  TopCategories,
  TopSellingTabData,
} from "@/shared/data/apps/ecommers/customer/landing-page-data";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [homeData, setHomeData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching products data
        const productsData = await getProducts({}, "", 1, 100);
        setProducts(productsData.products);

        // Fetching home data dynamically
        const { products_sdfsdfsdf, products_user_card, products_featured } =
          await getHomeDataDynamic([
            { property: "offer", value: "sdfsdfsdf", type: "full" },
          ]);

        // Set the home data
        setHomeData({
          products_sdfsdfsdf,
          products_user_card,
          products_featured,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once on mount

  // This useEffect will run whenever `products` is updated
  useEffect(() => {
    if (products.length > 0) {
      console.log("Updated products", products);
    }
  }, [products]); // Watch for changes in the `products` state

  return (
    <Fragment>
      {/* <!-- Start::app-content --> */}
      <div className="main-content landing-main ecommerce-main">
        {/* <!-- Start:: Section-1 --> */}
        <section className="section-sm relative">
          <div className="container main-banner-container">
            <div className="grid grid-cols-12 gap-x-6">
              <div className="xl:col-span-8 col-span-12">
                <div className="box hero-banner !border-0">
                  <div className="box-body ecommerce-swiper !p-0">
                    <SpkSwiperJs
                      slides={bannersData}
                      spaceBetween={30}
                      navigation={true}
                      autoplay={true}
                      className="mySwiper swiper-navigation"
                    />
                  </div>
                </div>
              </div>
              <div className="xl:col-span-4 col-span-12">
                <div className="grid grid-cols-12 gap-x-6">
                  <div className="xl:col-span-12 lg:col-span-6 col-span-12">
                    <div className="box banner banner-2 custom-box border-0 shadow-none">
                      <div className="box-body !p-6">
                        <Link
                          scroll={false}
                          href="/ecommerce/customer/product-details"
                          className="stretched-link"
                        ></Link>
                        <div className="grid grid-cols-12 gap-x-6 items-center">
                          <div className="md:col-span-8 col-span-12">
                            <h5 className="mb-3 font-medium">
                              Wellingtn Pouch
                            </h5>
                            <p className="mb-2 text-[0.8125rem] text-secondary font-medium">
                              30% Discount
                            </p>
                            <div className="flex items-baseline ">
                              <h4 className="font-medium mb-0">$120</h4>
                              <span className="text-[0.8125rem] ms-2 line-through">
                                $399
                              </span>
                            </div>
                          </div>
                          <div className="md:col-span-4 col-span-12 relative">
                            <Image
                              fill
                              src="../../../assets/images/ecommerce/png/31.png"
                              alt="img"
                              className="img-fluid"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="xl:col-span-12 lg:col-span-6 col-span-12">
                    <div className="box banner banner-3 custom-box border-0 shadow-none">
                      <div className="box-body !p-6">
                        <Link
                          scroll={false}
                          href="/ecommerce/customer/product-details"
                          className="stretched-link"
                        ></Link>
                        <div className="grid grid-cols-12 gap-x-6 items-center">
                          <div className="md:col-span-8 col-span-12">
                            <h5 className="mb-3 font-medium">
                              CapturePro Camera
                            </h5>
                            <p className="mb-2 text-[0.8125rem] text-success font-medium">
                              45% Discount
                            </p>
                            <div className="flex items-baseline ">
                              <h4 className="font-medium mb-0">$350</h4>
                              <span className="text-[0.8125rem] ms-2 line-through">
                                $599
                              </span>
                            </div>
                          </div>
                          <div className="md:col-span-4 col-span-12 relative">
                            <Image
                              fill
                              src="../../../assets/images/ecommerce/png/29.png"
                              alt="img"
                              className="img-fluid"
                            />
                          </div>
                        </div>
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
        <section className="section-sm">
          <div className="container">
            <div className="grid grid-cols-12 gap-x-6">
              <div className="xl:col-span-12 col-span-12">
                <div className="flex justify-between items-baseline flex-wrap gap-2 mb-4">
                  <div className="heading-section !text-start">
                    <div className="heading-title">Top Categories</div>
                    <div className="heading-description">
                      Browse Through The Top Categories
                    </div>
                  </div>
                  <div className="min-w-fit">
                    <Link
                      scroll={false}
                      href="/ecommerce/customer/shop"
                      className="ti-btn btn-wave ti-btn-primary"
                    >
                      View All Categories{" "}
                      <i className="bi bi-arrow-right  rtl:rotate-180  inline-flex items-center"></i>
                    </Link>
                  </div>
                </div>
              </div>
              {TopCategories.map((idx) => (
                <div
                  className="lg:col-span-3 xxl:col-span-2 col-span-12"
                  key={idx.id}
                >
                  <div
                    className={`link-tag link-tag-${idx.colorClass} !rounded-full`}
                  >
                    <Link
                      scroll={false}
                      href="/ecommerce/customer/shop"
                      className="stretched-link"
                    ></Link>
                    <div className="flex items-center gap-2">
                      <div className="min-w-fit">
                        <span className="avatar avatar-rounded link-tag-icon">
                          <i className={`ti ti-${idx.icon} text-[1.25rem]`}></i>
                        </span>
                      </div>
                      <div className="flex-grow link-tag-body">
                        <p className="mb-0 text-truncate">{idx.title}</p>
                        <span className="text-[0.6875rem] font-normal">
                          93 items
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* <!-- End:: Section-2 --> */}

        {/* <!-- Start:: Section-3 --> */}
        <section className="section bg-white dark:bg-bodybg">
          <div className="container">
            <div className="grid grid-cols-12 sm:gap-x-6">
              <div className="xl:col-span-12 col-span-12">
                <div className="flex justify-between items-baseline flex-wrap gap-2 mb-4">
                  <div className="heading-section text-start">
                    <div className="heading-title">Today Deals</div>
                    <div className="heading-description">
                      Grab the today offers
                    </div>
                  </div>
                  <div className="min-w-fit">
                    <Link
                      scroll={false}
                      href="/ecommerce/customer/shop"
                      className="text-primary font-semibold"
                    >
                      <u>More Deals</u>
                      <i className="fe fe-arrow-right ms-1"></i>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="md:col-span-12 lg:col-span-4 col-span-12">
                <div className="box card-style-4 card-style-4-primary">
                  <div className="box-body">
                    <div className="flex items-start mb-4">
                      <div className="flex-grow">
                        <h4 className="text-[1.25rem] mb-2">Save</h4>
                        <h4 className="font-semibold text-primary">$100</h4>
                        <p className="mb-0 text-textmuted dark:text-textmuted/50">
                          Eplore now and get 30% discount on Household
                          appliances
                        </p>
                      </div>
                      <div className="min-w-fit">
                        <Link
                          scroll={false}
                          href="/ecommerce/customer/shop"
                          className="ti-btn ti-btn-sm ti-btn-primary"
                        >
                          Explore <i className="ti ti-arrow-right ms-1"></i>
                        </Link>
                      </div>
                    </div>
                    <div className="overflow-hidden rounded-1">
                      <Link
                        className="relative"
                        scroll={false}
                        href="/ecommerce/customer/shop"
                      >
                        <Image
                          fill
                          src="../../../assets/images/ecommerce/banner/3.png"
                          alt="img"
                          className="w-full card-style-4-img"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-12 lg:col-span-4 col-span-12">
                <div className="box card-style-4 card-style-4-secondary">
                  <div className="box-body">
                    <div className="flex items-start mb-4">
                      <div className="flex-grow">
                        <h4 className="text-[1.25rem] mb-2">Save</h4>
                        <h4 className="font-semibold text-secondary">$220</h4>
                        <p className="mb-0 text-textmuted dark:text-textmuted/50">
                          Explore now and get 45% discount Vegetable products
                        </p>
                      </div>
                      <div className="min-w-fit">
                        <Link
                          scroll={false}
                          href="/ecommerce/customer/shop"
                          className="ti-btn ti-btn-sm ti-btn-secondary"
                        >
                          Explore <i className="ti ti-arrow-right ms-1"></i>
                        </Link>
                      </div>
                    </div>
                    <div className="overflow-hidden rounded-1">
                      <Link
                        className="relative"
                        scroll={false}
                        href="/ecommerce/customer/shop"
                      >
                        <Image
                          fill
                          src="../../../assets/images/ecommerce/banner/6.png"
                          alt="img"
                          className="w-full card-style-4-img"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-12 lg:col-span-4 col-span-12">
                <div className="box card-style-4 card-style-4-success">
                  <div className="box-body">
                    <div className="flex items-start mb-4">
                      <div className="flex-grow">
                        <h4 className="text-[1.25rem] mb-2">Save</h4>
                        <h4 className="font-semibold text-success">$150</h4>
                        <p className="mb-0 text-textmuted dark:text-textmuted/50">
                          Explore now and get 30% discount on Electrical
                          appliances
                        </p>
                      </div>
                      <div className="min-w-fit">
                        <Link
                          scroll={false}
                          href="/ecommerce/customer/shop"
                          className="ti-btn ti-btn-sm ti-btn-success"
                        >
                          Explore <i className="ti ti-arrow-right ms-1"></i>
                        </Link>
                      </div>
                    </div>
                    <div className="overflow-hidden rounded-1">
                      <Link
                        className="relative"
                        scroll={false}
                        href="/ecommerce/customer/shop"
                      >
                        <Image
                          fill
                          src="../../../assets/images/ecommerce/banner/7.png"
                          alt="img"
                          className="w-full card-style-4-img"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- End:: Section-3 --> */}

        {/* <!-- Start:: Section-4 --> */}
        <section className="section">
          <div className="container">
            <div className="grid grid-cols-12 gap-x-6">
              <div className="xl:col-span-12 col-span-12">
                <div className="flex justify-between items-baseline flex-wrap gap-2 mb-4">
                  <div className="heading-section !text-start">
                    <div className="heading-title">Popular Products</div>
                    <div className="heading-description">
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua
                    </div>
                  </div>
                  <div className="min-w-fit">
                    <Link
                      scroll={false}
                      href="/ecommerce/customer/product-details"
                      className="text-primary font-semibold text-[0.875rem]"
                    >
                      <u>More Deals</u>
                      <i className="fe fe-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
              {LandingPageProducts.slice(0, 8).map((idx) => (
                <div
                  className="lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12"
                  key={idx.id}
                >
                  <div className="box card-style-2">
                    <div className="box-body !p-0">
                      <span
                        className={`badge bg-${idx.badgeColor}/[0.15] text-${idx.badgeColor} text-pink top-left-badge`}
                      >
                        {idx.badge}
                      </span>
                      <div
                        className={`badge top-right-badge bg-${idx.rightBadgeColor} !text-white`}
                      >
                        <div className="badge-icon">
                          <i
                            className={`ti ti-${idx.badgeIcon} text-[0.875rem]`}
                          ></i>
                        </div>
                        <div className="badge-text">{idx.text}</div>
                      </div>
                      <div className="card-img-top border-b border-dashed border-defaultborder dark:border-defaultborder/10 ">
                        <Link
                          scroll={false}
                          href="/ecommerce/customer/product-details"
                          className="stretched-link"
                        ></Link>
                        <div className="btns-container-1 items-center gap-1">
                          <Link
                            scroll={false}
                            href="/ecommerce/customer/product-details"
                            className="ti-btn ti-btn-icon ti-btn-primary !rounded-full"
                          >
                            <i className="ti ti-eye text-[0.875rem]"></i>
                          </Link>
                          <div className="hs-tooltip ti-main-tooltip">
                            <Link
                              scroll={false}
                              href="/ecommerce/customer/compare-products"
                              className="hs-tooltip-toggle ti-btn ti-btn-icon ti-btn-primary !rounded-full"
                            >
                              <i className="ti ti-circle-half-2 text-[0.875rem]"></i>
                              <span
                                className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !rounded-sm !font-medium !text-white shadow-sm"
                                role="tooltip"
                              >
                                Compare
                              </span>
                            </Link>
                          </div>
                          <div className="hs-tooltip ti-main-tooltip">
                            <Link
                              scroll={false}
                              href="/ecommerce/customer/cart"
                              className="hs-tooltip-toggle ti-btn ti-btn-icon ti-btn-primary !rounded-full"
                            >
                              <i className="ti ti-shopping-cart-plus text-[0.875rem]"></i>
                              <span
                                className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !rounded-sm !font-medium !text-white shadow-sm"
                                role="tooltip"
                              >
                                Add to cart
                              </span>
                            </Link>
                          </div>
                        </div>
                        <div className="img-box-2 p-2 relative">
                          <Image
                            fill
                            src={idx.image}
                            alt="img"
                            className="scale-img img-fluid w-full bg-light rounded"
                          />
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-grow">
                            <Link
                              scroll={false}
                              href="#!"
                              className="mb-2 inline-block text-primary text-[0.8125rem] font-semibold"
                            >
                              {idx.brand}
                            </Link>
                            <h6 className="mb-1 font-semibold text-[1rem]">
                              <Link href="/ecommerce/customer/product-details">
                                {idx.title}
                              </Link>
                            </h6>
                            <div className="flex items-baseline text-[0.6875rem]">
                              <div className="min-w-fit">
                                <span className="text-warning me-1">
                                  <i className="bi bi-star-fill"></i>
                                </span>
                                <span className="text-warning me-1">
                                  <i className="bi bi-star-fill"></i>
                                </span>
                                <span className="text-warning me-1">
                                  <i className="bi bi-star-fill"></i>
                                </span>
                                <span className="text-warning me-1">
                                  <i className="bi bi-star-half"></i>
                                </span>
                              </div>
                              <p className="mb-0 ms-1 min-w-fit text-textmuted dark:text-textmuted/50">
                                <span>(142)</span>
                                <span className="ms-1">Ratings</span>
                              </p>
                            </div>
                          </div>
                          <div className="min-w-fit">
                            <div className="hs-tooltip ti-main-tooltip">
                              <Link
                                scroll={false}
                                href="/ecommerce/customer/wishlist"
                                className={`hs-tooltip-toggle btn btn-wishlist btn-icon rounded-circle ${idx.active}`}
                              >
                                <i className="bi bi-heart outline1"></i>
                                <i className="bi bi-heart-fill filled"></i>
                                <span
                                  className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !rounded-sm !font-medium !text-white shadow-sm"
                                  role="tooltip"
                                >
                                  Wishlist
                                </span>
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-baseline mt-4">
                          <h5 className="font-semibold text-primary mb-0">
                            {idx.price}
                          </h5>
                          <span className="text-[0.8125rem] ms-2 text-textmuted dark:text-textmuted/50 line-through">
                            {idx.oldPrice}
                          </span>
                        </div>
                      </div>
                      <Link
                        scroll={false}
                        href="/ecommerce/customer/cart"
                        className="ti-btn ti-btn-soft-primary ti-btn-lg !border-0 btn-style-1 !m-0 !rounded-tl-md  rtl:!rounded-tr-md rtl:!rounded-tl-none"
                      >
                        <i className="ti ti-shopping-cart-plus me-1"></i>Add
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              <div className="xl:col-span-12 col-span-12">
                <div className="text-end">
                  <Link
                    scroll={false}
                    href="#!"
                    className="ti-btn ti-btn-primary ti-btn-icon ti-btn-lg !rounded-full"
                    data-bs-toggle="tooltip"
                    title="View All"
                  >
                    <i className="ti ti-arrow-right text-[1.25rem]"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- End:: Section-4 --> */}

        {/* <!-- Start:: Section-5 --> */}
        <section className="section bg-banner-2 !text-white">
          <div className="container">
            <div className="grid grid-cols-12 gap-x-6 justify-center">
              <div className="lg:col-span-1 col-span-12 text-center"></div>
              <div className="lg:col-span-10 col-span-12 text-center">
                <div className="mb-4">
                  <h2 className="font-medium mb-2 !text-white">
                    &#128073; Get 20% Off Discount Coupon
                  </h2>
                  <h6 className="!text-white">By Subscribe our Newsletter</h6>
                </div>
              </div>
              <div className="lg:col-span-1 col-span-12 text-center"></div>
              <div className="lg:col-span-4 col-span-12 text-center"></div>
              <div className="lg:col-span-4 col-span-12 !text-center">
                <div className="custom-form-group">
                  <input
                    type="text"
                    className="form-control !rounded-full shadow-sm !py-3 mb-5"
                    placeholder="Enter Your Email.."
                    aria-label="Recipient's username"
                  />
                  <button
                    className="ti-btn ti-btn-danger !bg-danger !border-0 custom-form-btn !rounded-full"
                    type="button"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
              <div className="lg:col-span-4 col-span-12 text-center"></div>
            </div>
          </div>
        </section>
        {/* <!-- End:: Section-5 --> */}

        {/* <!-- Start:: Section-6 --> */}
        <section className="section">
          <div className="container">
            <div className="grid grid-cols-12 gap-x-6">
              <div className="xl:col-span-12 col-span-12">
                <div className="flex justify-between items-baseline flex-wrap gap-2 mb-4">
                  <div className="heading-section !text-start">
                    <div className="heading-title">Limited Time Deals</div>
                    <div className="heading-description">
                      View the popular products
                    </div>
                  </div>
                  <div className="min-w-fit">
                    <Link
                      scroll={false}
                      href="#!"
                      className="text-primary font-semibold text-[0.875rem]"
                    >
                      <u>More Deals</u>
                      <i className="fe fe-arrow-right ms-1"></i>
                    </Link>
                  </div>
                </div>
              </div>
              {LandingPageProducts.filter((item) => item.Deals === "Deals").map(
                (idx) => (
                  <div
                    className="xl:col-span-4 lg:col-span-6 md:col-span-12 col-span-12"
                    key={idx.id}
                  >
                    <div className="box card-style-1 custom-card">
                      <div className="box-body !p-4">
                        <div className="card-content">
                          <div className="grid grid-cols-12 sm:gap-x-6">
                            <div className="md:col-span-4 col-span-12">
                              <div className="img-box-1 bg-light rounded">
                                <Link
                                  scroll={false}
                                  href="/ecommerce/customer/product-details"
                                >
                                  <Image
                                    fill
                                    src={idx.image}
                                    alt="img"
                                    className="scale-img img-fluid w-full"
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="md:col-span-8 col-span-12">
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex-grow">
                                  <Link
                                    scroll={false}
                                    href="#!"
                                    className="mb-2 inline-block text-primary text-[0.8125rem] font-semibold"
                                  >
                                    {idx.dealsBrand}
                                  </Link>
                                  <h6 className="mb-1 font-semibold">
                                    <Link href="/ecommerce/customer/product-details">
                                      {idx.title}
                                    </Link>
                                  </h6>
                                  <div className="flex items-baseline text-[0.6875rem]">
                                    <div className="min-w-fit">
                                      <span className="text-warning me-1">
                                        <i className="bi bi-star-fill"></i>
                                      </span>
                                      <span className="text-warning me-1">
                                        <i className="bi bi-star-fill"></i>
                                      </span>
                                      <span className="text-warning me-1">
                                        <i className="bi bi-star-fill"></i>
                                      </span>
                                      <span className="text-warning me-1">
                                        <i className="bi bi-star-half"></i>
                                      </span>
                                    </div>
                                    <p className="mb-0 ms-1 min-w-fit text-textmuted dark:text-textmuted/50">
                                      <span> (45)</span>
                                      <span> Ratings</span>
                                    </p>
                                  </div>
                                </div>
                                <div className="min-w-fit">
                                  <div className="hs-tooltip ti-main-tooltip">
                                    <Link
                                      scroll={false}
                                      href="/ecommerce/customer/wishlist"
                                      className={`hs-tooltip-toggle btn btn-wishlist btn-icon rounded-circle ${idx.active}`}
                                    >
                                      <i className="bi bi-heart outline1"></i>
                                      <i className="bi bi-heart-fill filled"></i>
                                      <span
                                        className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !rounded-sm !font-medium !text-white shadow-sm"
                                        role="tooltip"
                                      >
                                        Wishlist
                                      </span>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex-grow flex items-baseline">
                                  <h5 className="font-semibold text-primary mb-0">
                                    {idx.price}
                                  </h5>
                                  <span className="text-[0.8125rem] ms-2 text-textmuted dark:text-textmuted/50 line-through">
                                    {idx.oldPrice}
                                  </span>
                                </div>
                                <div className="min-w-fit">
                                  <Link
                                    scroll={false}
                                    href="/ecommerce/customer/cart"
                                    className="ti-btn ti-btn-primary !border-0"
                                  >
                                    <i className="ti ti-shopping-cart-plus me-1"></i>
                                    Add
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card-custom-bottom p-4">
                          <div className="flex items-center gap-2 text-center flex-wrap">
                            <div className="counter-box">
                              <p className="mb-0 text-[0.9375rem] text-primary">
                                01
                              </p>
                              <span className="text-textmuted dark:text-textmuted/50 text-[0.8125rem]">
                                Days
                              </span>
                            </div>
                            <div className="counter-box">
                              <p className="mb-0 text-[0.9375rem] text-primary">
                                18
                              </p>
                              <span className="text-textmuted dark:text-textmuted/50 text-[0.8125rem]">
                                Hours
                              </span>
                            </div>
                            <div className="counter-box">
                              <p className="mb-0 text-[0.9375rem] text-primary">
                                45
                              </p>
                              <span className="text-textmuted dark:text-textmuted/50 text-[0.8125rem]">
                                Min
                              </span>
                            </div>
                            <div className="counter-box">
                              <p className="mb-0 text-[0.9375rem] text-primary">
                                16
                              </p>
                              <span className="text-textmuted dark:text-textmuted/50 text-[0.8125rem]">
                                Sec
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
        {/* <!-- End:: Section-6 --> */}

        {/* <!-- Start:: Section-7 --> */}
        <section className="section bg-white dark:bg-bodybg">
          <div className="container">
            <div className="grid grid-cols-12 sm:gap-x-6">
              <div className="xl:col-span-12 col-span-12">
                <div className="flex justify-between items-baseline flex-wrap gap-2 mb-4">
                  <div className="heading-section !text-start">
                    <div className="heading-title">Special Products</div>
                    <div className="heading-description">
                      View the Special products
                    </div>
                  </div>
                  <div className="min-w-fit">
                    <Link
                      scroll={false}
                      href="#!"
                      className="text-primary font-semibold text-[0.875rem]"
                    >
                      <u>View All</u>
                      <i className="fe fe-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
              {LandingPageProducts.filter(
                (item) => item.Specialproducts === "Special"
              ).map((idx) => (
                <div
                  className="xxl:col-span-3 xl:col-span-3 lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12"
                  key={idx.id}
                >
                  <div className="box card-style-2">
                    <div className="box-body !p-0">
                      <span
                        className={`badge bg-${idx.badgeColor}/[0.15] text-${idx.badgeColor} text-pink top-left-badge`}
                      >
                        {idx.badge}
                      </span>
                      <div
                        className={`badge top-right-badge bg-${idx.rightBadgeColor} !text-white`}
                      >
                        <div className="badge-icon">
                          <i
                            className={`ti ti-${idx.badgeIcon} text-[0.875rem]`}
                          ></i>
                        </div>
                        <div className="badge-text">{idx.text}</div>
                      </div>
                      <div className="card-img-top border-b border-dashed border-defaultborder dark:border-defaultborder/10 ">
                        <Link
                          scroll={false}
                          href="/ecommerce/customer/product-details"
                          className="stretched-link"
                        ></Link>
                        <div className="btns-container-1 items-center gap-1">
                          <Link
                            scroll={false}
                            href="/ecommerce/customer/product-details"
                            className="ti-btn ti-btn-icon ti-btn-primary !rounded-full"
                          >
                            <i className="ti ti-eye text-[0.875rem]"></i>
                          </Link>
                          <div className="hs-tooltip ti-main-tooltip">
                            <Link
                              scroll={false}
                              href="/ecommerce/customer/compare-products"
                              className="hs-tooltip-toggle ti-btn ti-btn-icon ti-btn-primary !rounded-full"
                            >
                              <i className="ti ti-circle-half-2 text-[0.875rem]"></i>
                              <span
                                className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !rounded-sm !font-medium !text-white shadow-sm"
                                role="tooltip"
                              >
                                Compare
                              </span>
                            </Link>
                          </div>
                          <div className="hs-tooltip ti-main-tooltip">
                            <Link
                              scroll={false}
                              href="/ecommerce/customer/cart"
                              className="hs-tooltip-toggle ti-btn ti-btn-icon ti-btn-primary !rounded-full"
                            >
                              <i className="ti ti-shopping-cart-plus text-[0.875rem]"></i>
                              <span
                                className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !rounded-sm !font-medium !text-white shadow-sm"
                                role="tooltip"
                              >
                                Add to cart
                              </span>
                            </Link>
                          </div>
                        </div>
                        <div className="img-box-2 p-2">
                          <Image
                            fill
                            src={idx.image}
                            alt="img"
                            className="scale-img img-fluid w-full bg-light rounded"
                          />
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-grow">
                            <Link
                              scroll={false}
                              href="#!"
                              className="mb-2 inline-block text-primary text-[0.8125rem] font-semibold"
                            >
                              {idx.brand}
                            </Link>
                            <h6 className="mb-1 font-semibold text-[1rem]">
                              <Link href="/ecommerce/customer/product-details">
                                {idx.title}
                              </Link>
                            </h6>
                            <div className="flex items-baseline text-[0.6875rem]">
                              <div className="min-w-fit">
                                <span className="text-warning me-1">
                                  <i className="bi bi-star-fill"></i>
                                </span>
                                <span className="text-warning me-1">
                                  <i className="bi bi-star-fill"></i>
                                </span>
                                <span className="text-warning me-1">
                                  <i className="bi bi-star-fill"></i>
                                </span>
                                <span className="text-warning me-1">
                                  <i className="bi bi-star-half"></i>
                                </span>
                              </div>
                              <p className="mb-0 ms-1 min-w-fit text-textmuted dark:text-textmuted/50">
                                <span>(142)</span>
                                <span>Ratings</span>
                              </p>
                            </div>
                          </div>
                          <div className="min-w-fit">
                            <div className="hs-tooltip ti-main-tooltip">
                              <Link
                                scroll={false}
                                href="/ecommerce/customer/wishlist"
                                className={`hs-tooltip-toggle btn btn-wishlist btn-icon rounded-circle ${idx.active}`}
                              >
                                <i className="bi bi-heart outline1"></i>
                                <i className="bi bi-heart-fill filled"></i>
                                <span
                                  className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !rounded-sm !font-medium !text-white shadow-sm"
                                  role="tooltip"
                                >
                                  Wishlist
                                </span>
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="mb-1">
                            <span className="text-[0.8125rem]">{idx.sold}</span>
                            <span className="text-textmuted dark:text-textmuted/50 fs-12">
                              Items Sold
                            </span>
                          </p>
                          <div
                            className="progress custom-progress-1"
                            style={{ height: "3px" }}
                          >
                            <div
                              className="progress-bar"
                              style={{ width: `${idx.progressWidth}` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex items-baseline mt-4">
                          <h5 className="font-semibold text-primary mb-0">
                            {idx.price}
                          </h5>
                          <span className="text-[0.8125rem] ms-2 text-textmuted dark:text-textmuted/50 line-through">
                            {idx.oldPrice}
                          </span>
                        </div>
                      </div>
                      <Link
                        scroll={false}
                        href="/ecommerce/customer/cart"
                        className="ti-btn ti-btn-soft-primary ti-btn-lg !border-0 btn-style-1 !m-0 !rounded-tl-md  rtl:!rounded-tr-md rtl:!rounded-tl-none"
                      >
                        <i className="ti ti-shopping-cart-plus me-1"></i>Add
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* <!-- End:: Section-7 --> */}

        {/* <!-- Start:: Section-8 --> */}
        <section className="bg-banner-2 text-white">
          <div className="container">
            <div className="grid grid-cols-12 gap-x-6 items-center">
              <div className="xl:col-span-4 md:col-span-4 col-span-12 text-center mt-6 md:block hidden">
                <Image
                  fill
                  src="../../../assets/images/ecommerce/png/17.png"
                  alt=""
                  className="img-fluid"
                />
              </div>
              <div className="xl:col-span-8 md:col-span-8 col-span-12">
                <div className="my-6">
                  <h2 className="font-semibold mb-4 text-white">
                    Start Your Online Business Here{" "}
                    <Link
                      href="/authentication/sign-up/basic"
                      className="text-white text-decoration-line"
                    >
                      {" "}
                      <u>Signup</u>
                    </Link>
                  </h2>
                  <p className="mb-4 text-white">
                    Est amet sit vero sanctus labore no sed nonumy. Sit ipsum
                    sanctus ea magna est. Aliquyam sed amet. Kasd diam rebum sit
                    ipsum ipsum.Est amet sit vero sanctus labore no sed ipsum
                    ipsum nonumy vero sanctus labore..{" "}
                  </p>
                  <Link
                    scroll={false}
                    href="/authentication/sign-up/basic"
                    className="ti-btn ti-btn-light ti-btn-lg"
                  >
                    Signup Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- End:: Section-8 --> */}

        {/* <!-- Start:: Section-9 --> */}
        <section className="section">
          <div className="container">
            <div className="grid grid-cols-12 gap-x-6">
              <div className="xl:col-span-12 col-span-12">
                <div className="flex justify-between items-baseline flex-wrap gap-2 mb-4">
                  <div className="heading-section text-start">
                    <div className="heading-title">Newest Arrivals</div>
                    <div className="heading-description">
                      View the Newest products
                    </div>
                  </div>
                  <div className="min-w-fit">
                    <Link
                      scroll={false}
                      href="#!"
                      className="text-primary font-semibold text-[0.875rem]"
                    >
                      <u>View All</u>
                      <i className="fe fe-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
              {LandingPageProducts.slice(0, 6).map((idx) => (
                <div className="xl:col-span-4 col-span-12" key={idx.id}>
                  <div className="box card-style-1">
                    <div className="box-body p-4">
                      <div className="grid grid-cols-12 sm:gap-x-6">
                        <div className="md:col-span-4 col-span-12">
                          <div className="img-box-1 bg-light rounded">
                            <Link scroll={false} href="#!">
                              <Image
                                fill
                                src={idx.image}
                                alt="img"
                                className="scale-img img-fluid w-full"
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="md:col-span-8 col-span-12">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex-grow">
                              <Link
                                scroll={false}
                                href="#!"
                                className="mb-2 inline-block text-primary text-[0.8125rem] font-semibold"
                              >
                                {idx.brand}
                              </Link>
                              <h6 className="font-semibold mb-1">
                                <Link scroll={false} href="#!">
                                  {idx.title}
                                </Link>
                              </h6>
                              <div className="flex items-baseline text-[0.6875rem]">
                                <div className="min-w-fit">
                                  <span className="text-warning me-1">
                                    <i className="bi bi-star-fill"></i>
                                  </span>
                                  <span className="text-warning me-1">
                                    <i className="bi bi-star-fill"></i>
                                  </span>
                                  <span className="text-warning me-1">
                                    <i className="bi bi-star-fill"></i>
                                  </span>
                                  <span className="text-warning me-1">
                                    <i className="bi bi-star-half"></i>
                                  </span>
                                </div>
                                <p className="mb-0 ms-1 min-w-fit text-textmuted dark:text-textmuted/50">
                                  <span>(4)</span>
                                  <span>Ratings</span>
                                </p>
                              </div>
                            </div>
                            <div className="min-w-fit">
                              <div className="hs-tooltip ti-main-tooltip">
                                <Link
                                  scroll={false}
                                  href="/ecommerce/customer/wishlist"
                                  className={`hs-tooltip-toggle btn btn-wishlist btn-icon rounded-circle ${idx.active}`}
                                >
                                  <i className="bi bi-heart outline1"></i>
                                  <i className="bi bi-heart-fill filled"></i>
                                  <span
                                    className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !rounded-sm !font-medium !text-white shadow-sm"
                                    role="tooltip"
                                  >
                                    Wishlist
                                  </span>
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <h5 className="font-semibold text-primary mb-0">
                              {idx.price}
                            </h5>
                            <div className="min-w-fit">
                              <Link
                                scroll={false}
                                href="/ecommerce/customer/cart"
                                className="ti-btn ti-btn-primary !border-0"
                              >
                                <i className="ti ti-shopping-cart-plus me-1"></i>
                                Add
                              </Link>
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
        </section>
        {/* <!-- End:: Section-9 --> */}

        {/* <!-- Start:: Section-10 --> */}
        <section className="py-[3rem] bg-banner">
          <div className="container">
            <div className="grid grid-cols-12 gap-x-6 justify-center">
              <div className="lg:col-span-1 col-span-12"></div>
              <div className="xl:col-span-10 col-span-12">
                <div className="grid grid-cols-12 gap-x-6 text-center gap-y-4">
                  <div className="md:col-span-3 col-span-12">
                    <div>
                      <h3 className="mb-1 font-semibold text-white">45K+</h3>
                      <h6 className="mb-0 font-medium text-white">Customers</h6>
                    </div>
                  </div>
                  <div className="md:col-span-3 col-span-12">
                    <div>
                      <h3 className="mb-1 font-semibold text-white">175K+</h3>
                      <h6 className="mb-0 font-medium text-white">Suppliers</h6>
                    </div>
                  </div>
                  <div className="md:col-span-3 col-span-12">
                    <div>
                      <h3 className="mb-1 font-semibold text-white">300K+</h3>
                      <h6 className="mb-0 font-medium text-white">
                        Categories
                      </h6>
                    </div>
                  </div>
                  <div className="md:col-span-3 col-span-12">
                    <div>
                      <h3 className="mb-1 font-semibold text-white">450M+</h3>
                      <h6 className="mb-0 font-medium text-white">
                        Delivery Locations
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1 col-span-12"></div>
            </div>
          </div>
        </section>
        {/* <!-- End:: Section-10 --> */}

        {/* <!-- Start:: Section-11 --> */}
        <section className="section">
          <div className="container">
            <div className="grid grid-cols-12 gap-x-6">
              <div className="xl:col-span-12 col-span-12">
                <div className="flex justify-between items-baseline flex-wrap gap-2 mb-4">
                  <div className="heading-section !text-start">
                    <div className="heading-title">All Products</div>
                    <div className="heading-description">
                      View the Newest products
                    </div>
                  </div>
                  <div className="min-w-fit">
                    {/* <!-- Nav tabs --> */}
                    <nav
                      className="-mb-0.5 flex space-x-6 rtl:space-x-reverse flex-wrap"
                      role="tablist"
                    >
                      <Link
                        scroll={false}
                        className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-2 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  hover:text-primary active"
                        href="#!"
                        id="tab1"
                        data-hs-tab="#tab-1"
                        aria-controls="tab-1"
                      >
                        {" "}
                        All
                      </Link>
                      <Link
                        scroll={false}
                        className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-2 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  hover:text-primary"
                        href="#!"
                        id="tab2"
                        data-hs-tab="#tab-2"
                        aria-controls="tab-2"
                      >
                        {" "}
                        Top Selling
                      </Link>
                      <Link
                        scroll={false}
                        className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-2 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  hover:text-primary"
                        href="#!"
                        id="tab3"
                        data-hs-tab="#tab-3"
                        aria-controls="tab-3"
                      >
                        {" "}
                        Trending
                      </Link>
                      <Link
                        scroll={false}
                        className="hs-tab-active:font-semibold hs-tab-active:border-primary hs-tab-active:text-primary !p-2 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-defaulttextcolor  hover:text-primary"
                        href="#!"
                        id="tab4"
                        data-hs-tab="#tab-4"
                        aria-controls="tab-4"
                      >
                        {" "}
                        Recently Added
                      </Link>
                    </nav>
                  </div>
                </div>
              </div>
              <div className="xl:col-span-12 col-span-12">
                {/* <!-- Tab panes --> */}
                <div className="tab-content all-products">
                  <div
                    className="tab-pane active !border-0 !p-0"
                    id="tab-1"
                    role="tabpanel"
                    aria-labelledby="tab1"
                  >
                    <div className="grid grid-cols-12 gap-x-6">
                      {LandingPageProducts.slice(0, 8).map((idx) => (
                        <div
                          className="lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12"
                          key={idx.id}
                        >
                          <div className="box card-style-2">
                            <div className="box-body !p-0">
                              <span
                                className={`badge bg-${idx.badgeColor}/[0.15] text-${idx.badgeColor} text-pink top-left-badge`}
                              >
                                {idx.badge}
                              </span>
                              <div
                                className={`badge top-right-badge bg-${idx.rightBadgeColor} !text-white`}
                              >
                                <div className="badge-icon">
                                  <i
                                    className={`ti ti-${idx.badgeIcon} text-[0.875rem]`}
                                  ></i>
                                </div>
                                <div className="badge-text">{idx.text}</div>
                              </div>
                              <div className="card-img-top border-b border-dashed border-defaultborder dark:border-defaultborder/10 ">
                                <Link
                                  scroll={false}
                                  href="/ecommerce/customer/product-details"
                                  className="stretched-link"
                                ></Link>
                                <div className="btns-container-1 items-center gap-1">
                                  <Link
                                    scroll={false}
                                    href="/ecommerce/customer/product-details"
                                    className="ti-btn ti-btn-icon ti-btn-primary !rounded-full"
                                  >
                                    <i className="ti ti-eye text-[0.875rem]"></i>
                                  </Link>
                                  <div className="hs-tooltip ti-main-tooltip">
                                    <Link
                                      scroll={false}
                                      href="/ecommerce/customer/compare-products"
                                      className="hs-tooltip-toggle ti-btn ti-btn-icon ti-btn-primary !rounded-full"
                                    >
                                      <i className="ti ti-circle-half-2 text-[0.875rem]"></i>
                                      <span
                                        className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !rounded-sm !font-medium !text-white shadow-sm"
                                        role="tooltip"
                                      >
                                        Compare
                                      </span>
                                    </Link>
                                  </div>
                                  <div className="hs-tooltip ti-main-tooltip">
                                    <Link
                                      scroll={false}
                                      href="/ecommerce/customer/cart"
                                      className="hs-tooltip-toggle ti-btn ti-btn-icon ti-btn-primary !rounded-full"
                                    >
                                      <i className="ti ti-shopping-cart-plus text-[0.875rem]"></i>
                                      <span
                                        className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !rounded-sm !font-medium !text-white shadow-sm"
                                        role="tooltip"
                                      >
                                        Add to cart
                                      </span>
                                    </Link>
                                  </div>
                                </div>
                                <div className="img-box-2 p-2">
                                  <Image
                                    fill
                                    src={idx.image}
                                    alt="img"
                                    className="scale-img img-fluid w-full bg-light rounded"
                                  />
                                </div>
                              </div>
                              <div className="p-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex-grow">
                                    <Link
                                      scroll={false}
                                      href="#!"
                                      className="mb-2 inline-block text-primary text-[0.8125rem] font-semibold"
                                    >
                                      {idx.brand}
                                    </Link>
                                    <h6 className="mb-1 font-semibold text-[1rem]">
                                      <Link href="/ecommerce/customer/product-details">
                                        {idx.title}
                                      </Link>
                                    </h6>
                                    <div className="flex items-baseline text-[0.6875rem]">
                                      <div className="min-w-fit">
                                        <span className="text-warning  me-1">
                                          <i className="bi bi-star-fill"></i>
                                        </span>
                                        <span className="text-warning me-1">
                                          <i className="bi bi-star-fill"></i>
                                        </span>
                                        <span className="text-warning me-1">
                                          <i className="bi bi-star-fill"></i>
                                        </span>
                                        <span className="text-warning me-1">
                                          <i className="bi bi-star-half"></i>
                                        </span>
                                      </div>
                                      <p className="mb-0 ms-1 min-w-fit text-textmuted dark:text-textmuted/50">
                                        <span> (142)</span>
                                        <span> Ratings</span>
                                      </p>
                                    </div>
                                  </div>
                                  <div className="min-w-fit">
                                    <div className="hs-tooltip ti-main-tooltip">
                                      <Link
                                        scroll={false}
                                        href="/ecommerce/customer/wishlist"
                                        className={`hs-tooltip-toggle btn btn-wishlist btn-icon rounded-circle ${idx.active}`}
                                      >
                                        <i className="bi bi-heart outline1"></i>
                                        <i className="bi bi-heart-fill filled"></i>
                                        <span
                                          className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !rounded-sm !font-medium !text-white shadow-sm"
                                          role="tooltip"
                                        >
                                          Wishlist
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-baseline mt-4">
                                  <h5 className="font-semibold text-primary mb-0">
                                    {idx.price}
                                  </h5>
                                  <span className="text-[0.8125rem] ms-2 text-textmuted dark:text-textmuted/50 line-through">
                                    {idx.oldPrice}
                                  </span>
                                </div>
                              </div>
                              <Link
                                scroll={false}
                                href="/ecommerce/customer/cart"
                                className="ti-btn ti-btn-soft-primary ti-btn-lg !border-0 btn-style-1 !m-0 !rounded-tl-md  rtl:!rounded-tr-md rtl:!rounded-tl-none"
                              >
                                <i className="ti ti-shopping-cart-plus me-1"></i>
                                Add
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="md:col-span-12 col-span-12">
                        <div className="text-end">
                          <div className="hs-tooltip inline-block">
                            <Link
                              scroll={false}
                              href="#!"
                              className="ti-btn ti-btn-md ti-btn-primary hs-tooltip-toggle"
                            >
                              <i className="ti ti-arrow-right text-[1.25rem]"></i>
                            </Link>
                            <span
                              className="hs-tooltip-content ti-main-tooltip-content !py-1 !px-2 !bg-black text-xs font-medium !text-white shadow-sm dark:!bg-black"
                              role="tooltip"
                            >
                              View All
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane !border-0 !p-0 hidden"
                    id="tab-2"
                    role="tabpanel"
                    aria-labelledby="tab2"
                  >
                    <div className="grid grid-cols-12 gap-x-6">
                      {TopSellingTabData.map((idx) => (
                        <div
                          className="lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12"
                          key={idx.id}
                        >
                          <div className="box card-style-2">
                            <div className="box-body !p-0">
                              <span
                                className={`badge bg-${idx.badgeColor}/[0.15] text-${idx.badgeColor} top-left-badge`}
                              >
                                {idx.badge}
                              </span>
                              <div
                                className={`badge top-right-badge bg-${idx.rightBadgeColor} !text-white`}
                              >
                                <div className="badge-icon">
                                  <i
                                    className={`ti ti-${idx.badgeIcon} text-[0.875rem]`}
                                  ></i>
                                </div>
                                <div className="badge-text">{idx.text}</div>
                              </div>
                              <div className="card-img-top border-b border-dashed border-defaultborder dark:border-defaultborder/10 ">
                                <Link
                                  scroll={false}
                                  href="/ecommerce/customer/product-details"
                                  className="stretched-link"
                                ></Link>
                                <div className="btns-container-1 align-items-center gap-1">
                                  <Link
                                    scroll={false}
                                    href="/ecommerce/customer/product-details"
                                    className="ti-btn ti-btn-icon ti-btn-primary !rounded-full"
                                  >
                                    <i className="ti ti-eye text-[0.875rem]"></i>
                                  </Link>
                                  <div className="hs-tooltip ti-main-tooltip">
                                    <Link
                                      scroll={false}
                                      href="/ecommerce/customer/compare-products"
                                      className="hs-tooltip-toggle ti-btn ti-btn-icon ti-btn-primary !rounded-full"
                                    >
                                      <i className="ti ti-circle-half-2 text-[0.875rem]"></i>
                                      <span
                                        className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !rounded-sm !font-medium !text-white shadow-sm"
                                        role="tooltip"
                                      >
                                        Compare
                                      </span>
                                    </Link>
                                  </div>
                                  <div className="hs-tooltip ti-main-tooltip">
                                    <Link
                                      scroll={false}
                                      href="/ecommerce/customer/cart"
                                      className="hs-tooltip-toggle ti-btn ti-btn-icon ti-btn-primary !rounded-full"
                                    >
                                      <i className="ti ti-shopping-cart-plus text-[0.875rem]"></i>
                                      <span
                                        className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !rounded-sm !font-medium !text-white shadow-sm"
                                        role="tooltip"
                                      >
                                        Add to cart
                                      </span>
                                    </Link>
                                  </div>
                                </div>
                                <div className="img-box-2 p-2">
                                  <Image
                                    fill
                                    src={idx.image}
                                    alt="img"
                                    className="scale-img img-fluid w-full bg-light rounded"
                                  />
                                </div>
                              </div>
                              <div className="p-3">
                                <div className="flex items-start justify-between">
                                  <div className="flex-grow">
                                    <Link
                                      scroll={false}
                                      href="#!"
                                      className="mb-2 inline-block text-primary text-[0.8125rem] font-semibold"
                                    >
                                      {idx.brand}
                                    </Link>
                                    <h6 className="mb-1 font-semibold">
                                      <Link href="/ecommerce/customer/product-details">
                                        {idx.name}
                                      </Link>
                                    </h6>
                                    <div className="flex items-baseline text-[0.6875rem]">
                                      <div className="min-w-fit">
                                        <span className="text-warning me-1">
                                          <i className="bi bi-star-fill"></i>
                                        </span>
                                        <span className="text-warning me-1">
                                          <i className="bi bi-star-fill"></i>
                                        </span>
                                        <span className="text-warning me-1">
                                          <i className="bi bi-star-fill"></i>
                                        </span>
                                        <span className="text-warning me-1">
                                          <i className="bi bi-star-half"></i>
                                        </span>
                                      </div>
                                      <p className="mb-0 ms-1 min-w-fit text-textmuted dark:text-textmuted/50">
                                        <span>(142)</span>
                                        <span>Ratings</span>
                                      </p>
                                    </div>
                                  </div>
                                  <div className="min-w-fit">
                                    <div className="hs-tooltip ti-main-tooltip">
                                      <Link
                                        scroll={false}
                                        href="/ecommerce/customer/wishlist"
                                        className={`hs-tooltip-toggle btn btn-wishlist btn-icon rounded-circle ${idx.active}`}
                                      >
                                        <i className="bi bi-heart outline1"></i>
                                        <i className="bi bi-heart-fill filled"></i>
                                        <span
                                          className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !rounded-sm !font-medium !text-white shadow-sm"
                                          role="tooltip"
                                        >
                                          Wishlist
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-baseline mt-4">
                                  <h5 className="font-semibold text-primary mb-0">
                                    $120
                                  </h5>
                                  <span className="text-[0.8125rem] ms-2 text-textmuted dark:text-textmuted/50 text-decoration-line-through">
                                    $399
                                  </span>
                                </div>
                              </div>
                              <Link
                                scroll={false}
                                href="#!"
                                className="ti-btn ti-btn-lg ti-btn-soft-primary !border-0 !m-0 !rounded-tl-md btn-style-1 rtl:!rounded-tr-md rtl:!rounded-tl-none"
                              >
                                <i className="ti ti-shopping-cart-plus me-1"></i>
                                Add
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="md:col-span-12 col-span-12">
                        <div className="text-end">
                          <Link
                            scroll={false}
                            href="#!"
                            className="ti-btn ti-btn-md ti-btn-primary"
                            data-bs-toggle="tooltip"
                            title="View All"
                          >
                            <i className="ti ti-arrow-right text-[1.25rem]"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane !border-0 !p-0 hidden"
                    id="tab-3"
                    role="tabpanel"
                    aria-labelledby="tab3"
                  >
                    <div className="grid grid-cols-12 gap-x-6">
                      {LandingPageProducts.slice(0, 8).map((idx) => (
                        <div
                          className="lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12"
                          key={idx.id}
                        >
                          <div className="box card-style-2">
                            <div className="box-body !p-0">
                              <span
                                className={`badge bg-${idx.badgeColor}/[0.15] text-${idx.badgeColor} text-pink top-left-badge`}
                              >
                                {idx.badge}
                              </span>
                              <div
                                className={`badge top-right-badge bg-${idx.rightBadgeColor} !text-white`}
                              >
                                <div className="badge-icon">
                                  <i
                                    className={`ti ti-${idx.badgeIcon} text-[0.875rem]`}
                                  ></i>
                                </div>
                                <div className="badge-text">{idx.text}</div>
                              </div>
                              <div className="card-img-top border-b border-dashed border-defaultborder dark:border-defaultborder/10 ">
                                <Link
                                  scroll={false}
                                  href="/ecommerce/customer/product-details"
                                  className="stretched-link"
                                ></Link>
                                <div className="btns-container-1 items-center gap-1">
                                  <Link
                                    scroll={false}
                                    href="/ecommerce/customer/product-details"
                                    className="ti-btn ti-btn-icon ti-btn-primary !rounded-full"
                                  >
                                    <i className="ti ti-eye text-[0.875rem]"></i>
                                  </Link>
                                  <div className="hs-tooltip ti-main-tooltip">
                                    <Link
                                      scroll={false}
                                      href="/ecommerce/customer/compare-products"
                                      className="hs-tooltip-toggle ti-btn ti-btn-icon ti-btn-primary !rounded-full"
                                    >
                                      <i className="ti ti-circle-half-2 text-[0.875rem]"></i>
                                      <span
                                        className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !rounded-sm !font-medium !text-white shadow-sm"
                                        role="tooltip"
                                      >
                                        Compare
                                      </span>
                                    </Link>
                                  </div>
                                  <div className="hs-tooltip ti-main-tooltip">
                                    <Link
                                      scroll={false}
                                      href="/ecommerce/customer/cart"
                                      className="hs-tooltip-toggle ti-btn ti-btn-icon ti-btn-primary !rounded-full"
                                    >
                                      <i className="ti ti-shopping-cart-plus text-[0.875rem]"></i>
                                      <span
                                        className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !rounded-sm !font-medium !text-white shadow-sm"
                                        role="tooltip"
                                      >
                                        Add to cart
                                      </span>
                                    </Link>
                                  </div>
                                </div>
                                <div className="img-box-2 p-2">
                                  <Image
                                    fill
                                    src={idx.image}
                                    alt="img"
                                    className="scale-img img-fluid w-full bg-light rounded"
                                  />
                                </div>
                              </div>
                              <div className="p-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex-grow">
                                    <Link
                                      scroll={false}
                                      href="#!"
                                      className="mb-2 inline-block text-primary text-[0.8125rem] font-semibold"
                                    >
                                      {idx.brand}
                                    </Link>
                                    <h6 className="mb-1 font-semibold text-[1rem]">
                                      <Link href="/ecommerce/customer/product-details">
                                        {idx.title}
                                      </Link>
                                    </h6>
                                    <div className="flex items-baseline text-[0.6875rem]">
                                      <div className="min-w-fit">
                                        <span className="text-warning me-1">
                                          <i className="bi bi-star-fill"></i>
                                        </span>
                                        <span className="text-warning me-1">
                                          <i className="bi bi-star-fill"></i>
                                        </span>
                                        <span className="text-warning me-1">
                                          <i className="bi bi-star-fill"></i>
                                        </span>
                                        <span className="text-warning me-1">
                                          <i className="bi bi-star-half"></i>
                                        </span>
                                      </div>
                                      <p className="mb-0 ms-1 min-w-fit text-textmuted dark:text-textmuted/50">
                                        <span>(142)</span>
                                        <span>Ratings</span>
                                      </p>
                                    </div>
                                  </div>
                                  <div className="min-w-fit">
                                    <div className="hs-tooltip ti-main-tooltip">
                                      <Link
                                        scroll={false}
                                        href="/ecommerce/customer/wishlist"
                                        className={`hs-tooltip-toggle btn btn-wishlist btn-icon rounded-circle ${idx.active}`}
                                      >
                                        <i className="bi bi-heart outline1"></i>
                                        <i className="bi bi-heart-fill filled"></i>
                                        <span
                                          className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !rounded-sm !font-medium !text-white shadow-sm"
                                          role="tooltip"
                                        >
                                          Wishlist
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-baseline mt-4">
                                  <h5 className="font-semibold text-primary mb-0">
                                    {idx.price}
                                  </h5>
                                  <span className="text-[0.8125rem] ms-2 text-textmuted dark:text-textmuted/50 line-through">
                                    {idx.oldPrice}
                                  </span>
                                </div>
                              </div>
                              <Link
                                scroll={false}
                                href="/ecommerce/customer/cart"
                                className="ti-btn ti-btn-soft-primary ti-btn-lg !border-0 btn-style-1 !m-0 !rounded-tl-md  rtl:!rounded-tr-md rtl:!rounded-tl-none"
                              >
                                <i className="ti ti-shopping-cart-plus me-1"></i>
                                Add
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="md:col-span-12 col-span-12">
                        <div className="text-end">
                          <Link
                            scroll={false}
                            href="#!"
                            className="ti-btn ti-btn-md ti-btn-primary"
                            data-bs-toggle="tooltip"
                            title="View All"
                          >
                            <i className="ti ti-arrow-right text-[1.25rem]"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane !border-0 !p-0 hidden"
                    id="tab-4"
                    role="tabpanel"
                    aria-labelledby="tab4"
                  >
                    <div className="grid grid-cols-12 gap-x-6">
                      {RecentlyAddedTabData.map((idx) => (
                        <div
                          className="lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12"
                          key={idx.id}
                        >
                          <div className="box card-style-2">
                            <div className="box-body !p-0">
                              <span
                                className={`badge bg-${idx.badgeColor}/[0.15] text-${idx.badgeColor} top-left-badge`}
                              >
                                {idx.badge}
                              </span>
                              <div
                                className={`badge top-right-badge bg-${idx.rightBadgeColor} !text-white`}
                              >
                                <div className="badge-icon">
                                  <i
                                    className={`ti ti-${idx.badgeIcon} text-[0.875rem]`}
                                  ></i>
                                </div>
                                <div className="badge-text">{idx.text}</div>
                              </div>
                              <div className="card-img-top border-b border-dashed border-defaultborder dark:border-defaultborder/10 ">
                                <Link
                                  scroll={false}
                                  href="/ecommerce/customer/product-details"
                                  className="stretched-link"
                                ></Link>
                                <div className="btns-container-1 align-items-center gap-1">
                                  <Link
                                    scroll={false}
                                    href="/ecommerce/customer/product-details"
                                    className="ti-btn ti-btn-icon ti-btn-primary !rounded-full"
                                  >
                                    <i className="ti ti-eye text-[0.875rem]"></i>
                                  </Link>
                                  <div className="hs-tooltip ti-main-tooltip">
                                    <Link
                                      scroll={false}
                                      href="/ecommerce/customer/compare-products"
                                      className="hs-tooltip-toggle ti-btn ti-btn-icon ti-btn-primary !rounded-full"
                                    >
                                      <i className="ti ti-circle-half-2 text-[0.875rem]"></i>
                                      <span
                                        className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !rounded-sm !font-medium !text-white shadow-sm"
                                        role="tooltip"
                                      >
                                        Compare
                                      </span>
                                    </Link>
                                  </div>
                                  <div className="hs-tooltip ti-main-tooltip">
                                    <Link
                                      scroll={false}
                                      href="/ecommerce/customer/cart"
                                      className="hs-tooltip-toggle ti-btn ti-btn-icon ti-btn-primary !rounded-full"
                                    >
                                      <i className="ti ti-shopping-cart-plus text-[0.875rem]"></i>
                                      <span
                                        className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !rounded-sm !font-medium !text-white shadow-sm"
                                        role="tooltip"
                                      >
                                        Add to cart
                                      </span>
                                    </Link>
                                  </div>
                                </div>
                                <div className="img-box-2 p-2 relative">
                                  <Image
                                    fill
                                    src={idx.image}
                                    alt="img"
                                    className="scale-img img-fluid w-full bg-light rounded"
                                  />
                                </div>
                              </div>
                              <div className="p-3">
                                <div className="flex items-start justify-between">
                                  <div className="flex-grow">
                                    <Link
                                      scroll={false}
                                      href="#!"
                                      className="mb-2 inline-block text-primary text-[0.8125rem] font-semibold"
                                    >
                                      {idx.brand}
                                    </Link>
                                    <h6 className="mb-1 font-semibold">
                                      <Link href="/ecommerce/customer/product-details">
                                        {idx.title}
                                      </Link>
                                    </h6>
                                    <div className="flex items-baseline text-[0.6875rem]">
                                      <div className="min-w-fit">
                                        <span className="text-warning me-1">
                                          <i className="bi bi-star-fill"></i>
                                        </span>
                                        <span className="text-warning me-1">
                                          <i className="bi bi-star-fill"></i>
                                        </span>
                                        <span className="text-warning me-1">
                                          <i className="bi bi-star-fill"></i>
                                        </span>
                                        <span className="text-warning me-1">
                                          <i className="bi bi-star-half"></i>
                                        </span>
                                      </div>
                                      <p className="mb-0 ms-1 min-w-fit text-textmuted dark:text-textmuted/50">
                                        <span>(142)</span>
                                        <span>Ratings</span>
                                      </p>
                                    </div>
                                  </div>
                                  <div className="min-w-fit">
                                    <div className="hs-tooltip ti-main-tooltip">
                                      <Link
                                        scroll={false}
                                        href="/ecommerce/customer/wishlist"
                                        className={`hs-tooltip-toggle btn btn-wishlist btn-icon rounded-circle ${idx.active}`}
                                      >
                                        <i className="bi bi-heart outline1"></i>
                                        <i className="bi bi-heart-fill filled"></i>
                                        <span
                                          className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !rounded-sm !font-medium !text-white shadow-sm"
                                          role="tooltip"
                                        >
                                          Wishlist
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-baseline mt-4">
                                  <h5 className="font-semibold text-primary mb-0">
                                    $120
                                  </h5>
                                  <span className="text-[0.8125rem] ms-2 text-textmuted dark:text-textmuted/50 text-decoration-line-through">
                                    $399
                                  </span>
                                </div>
                              </div>
                              <Link
                                scroll={false}
                                href="#!"
                                className="ti-btn ti-btn-lg ti-btn-soft-primary !border-0 !m-0 !rounded-tl-md btn-style-1 rtl:!rounded-tr-md rtl:!rounded-tl-none"
                              >
                                <i className="ti ti-shopping-cart-plus me-1"></i>
                                Add
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="md:col-span-12 col-span-12">
                        <div className="text-end">
                          <Link
                            scroll={false}
                            href="#!"
                            className="ti-btn ti-btn-md ti-btn-primary"
                            data-bs-toggle="tooltip"
                            title="View All"
                          >
                            <i className="ti ti-arrow-right text-[1.25rem]"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- End:: Section-11 --> */}

        {/* <!-- Start:: Section-12 --> */}
        <section className="section-sm">
          <div className="container">
            <div className="grid grid-cols-12 gap-x-6">
              <div className="xl:col-span-4 col-span-12">
                <div className="box card-style-3 custom-card">
                  <div className="box-body">
                    <div className="flex items-start gap-4">
                      <div className="min-w-fit">
                        <span className="avatar bg-info text-white">
                          <i className="ti ti-truck-delivery text-[1.25rem]"></i>
                        </span>
                      </div>
                      <div className="flex-grow">
                        <p className="mb-0 font-semibold text-[1rem] text-info">
                          Free Delivery
                        </p>
                        <p className="mb-0 text-[0.8125rem] text-textmuted dark:text-textmuted/50">
                          Consetetur eirmod dolor stet justo gubergren ea et
                          lorem sadipscing.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="xl:col-span-4 col-span-12">
                <div className="box card-style-3 custom-card">
                  <div className="box-body">
                    <div className="flex items-start gap-4">
                      <div className="min-w-fit">
                        <span className="avatar bg-warning text-white">
                          <i className="ti ti-tags text-[1.25rem]"></i>
                        </span>
                      </div>
                      <div className="flex-grow">
                        <p className="mb-0 font-semibold text-[1rem] text-warning me-1">
                          Great Deals & Offers
                        </p>
                        <p className="mb-0 text-[0.8125rem] text-textmuted dark:text-textmuted/50">
                          Consetetur eirmod dolor stet justo gubergren ea et
                          lorem sadipscing.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="xl:col-span-4 col-span-12">
                <div className="box card-style-3 custom-card ">
                  <div className="box-body">
                    <div className="flex items-start gap-4">
                      <div className="min-w-fit">
                        <span className="avatar bg-danger text-white">
                          <i className="ti ti-arrow-back-up text-[1.25rem]"></i>
                        </span>
                      </div>
                      <div className="flex-grow">
                        <p className="mb-0 font-semibold text-[1rem] text-danger">
                          Easy Returns
                        </p>
                        <p className="mb-0 text-[0.8125rem] text-textmuted dark:text-textmuted/50">
                          Consetetur eirmod dolor stet justo gubergren ea et
                          lorem sadipscing.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- End:: Section-12 --> */}

        {/* <!-- Start:: Section-13 --> */}
        <section className="section bg-banner lg:px-0 px-4 !py-[4.375rem]">
          <div className="grid grid-cols-12 gap-x-6">
            <div className="lg:col-span-3 col-span-1 text-center"></div>
            <div className="lg:col-span-6 col-span-10 text-center">
              <div className="mb-4">
                <h3 className="font-semibold mb-2 text-white">
                  &#128073; Download our free mobile apps today
                </h3>
              </div>
              <h6 className="mb-4 opacity-90 text-white">
                Labore no sed ipsum ipsum nonumy. Sit ipsum sanctus ea magna
                est. Kasd diam rebum sit ipsum ipsum erat et kasd.Est amet sit
                vero sanctus labore no sed ipsum ipsum nonumy vero sanctus
                labore..
              </h6>
              <div className="btn-list">
                <Link
                  scroll={false}
                  href="#!"
                  className="ti-btn  bg-black app-store relative"
                >
                  <Image
                    fill
                    src="../../../assets/images/media/apps/play-store.png"
                    alt=""
                  />
                  Google Play
                </Link>
                <Link
                  scroll={false}
                  href="#!"
                  className="ti-btn  bg-black app-store relative"
                >
                  <Image
                    fill
                    src="../../../assets/images/media/apps/apple-store.png"
                    alt=""
                    className="invert-1"
                  />
                  App Store
                </Link>
              </div>
            </div>
            <div className="lg:col-span-3 col-span-1 text-center"></div>
          </div>
        </section>
        {/* <!-- End:: Section-12 --> */}
      </div>
      {/* <!-- End::app-content --> */}
    </Fragment>
  );
};

export default LandingPage;
