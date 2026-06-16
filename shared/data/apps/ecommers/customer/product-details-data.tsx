import Link from "next/link";
import { LandingPageProducts } from "./landing-page-data";

import Image from "next/image";

// Similar Products
export const SimilarProducts = [
    {
        name: "CapturePro Camera",
        image: "../../../assets/images/ecommerce/png/29.png",
        rating: "4.4",
        reviews: "13256",
        price: "1099",
        originalPrice: "1759"
    },
    {
        name: "SoundSync Headphones",
        image: "../../../assets/images/ecommerce/png/30.png",
        rating: "3.8",
        reviews: "5289",
        price: "799",
        originalPrice: "1299"
    },
    {
        name: "Western Ladies Bag",
        image: "../../../assets/images/ecommerce/png/31.png",
        rating: "4.1",
        reviews: "2476",
        price: "1499",
        originalPrice: "2599"
    },
    {
        name: "Elitr Alarm Clock",
        image: "../../../assets/images/ecommerce/png/32.png",
        rating: "3.8",
        reviews: "1893",
        price: "2299",
        originalPrice: "3299"
    },
    {
        name: "Sports Shoes",
        image: "../../../assets/images/ecommerce/png/33.png",
        rating: " 4.5",
        reviews: "12923",
        price: "899",
        originalPrice: "1299"
    },
    {
        name: "Wooden Chair",
        image: "../../../assets/images/ecommerce/png/6.png",
        rating: "4.1",
        reviews: "453",
        price: "1799",
        originalPrice: "2499"
    },
    {
        name: "Adibas Men's Shoes",
        image: "../../../assets/images/ecommerce/png/20.png",
        rating: "4.3",
        reviews: "1874",
        price: "2299",
        originalPrice: "2999"
    }
];

export const productDetailsData = [
    { label: "Brand", value: "VelocityStride" },
    { label: "Model Name", value: "QuantumFlex 5000" },
    { label: "Color", value: "Galactic Blue Nebula" },
    { label: "Style", value: "Running Shoes" },
    { label: "Special Features", value: "GravityGrip, AeroVent Breathability, FlexiFit Customization, LunarLite Sole e.t.c" }
];

export const reviews = [
    {
        id: 1,
        userImage: "../../../assets/images/faces/15.jpg",
        userName: "Alex Carey",
        reviewDate: "24 Nov, 2024",
        reviewTitle: "Absolute Game-Changer! 👍",
        reviewText: "VelocityStride's QuantumFlex 5000 is a revelation! The GravityGrip Technology delivers unmatched stability, and the AeroVent Breathability kept my feet cool even during intense workouts. A must-have for anyone serious about comfort.",
        images: [
            "../../../assets/images/ecommerce/png/2.png",
            "../../../assets/images/ecommerce/png/4.png",
        ],
    },
    {
        id: 2,
        userImage: "../../../assets/images/faces/1.jpg",
        userName: "Jack Miller",
        reviewDate: "31 Nov, 2024",
        reviewTitle: "Out of this World Comfort 👟",
        reviewText: "I've never experienced such cushioning! The ShockShield technology is a game-changer for my daily runs. The FlexiFit Customization is a nice touch, ensuring a snug fit. Plus, the Galactic Blue Nebula color is an attention-grabber.",
        images: [
            "../../../assets/images/ecommerce/png/4.png",
            "../../../assets/images/ecommerce/png/1.png",
        ],
    },
];

export const ProductSwiperComponent = reviews.map((idx) => (
    <div className="box mb-0" key={idx.id}>
        <div className="box-body">
            <div className="sn:flex block items-top mb-3">
                <div className="flex flex-grow">
                    <div className="me-2">
                        <span className="avatar avatar-sm avatar-rounded relative">
                            <Image fill src={idx.userImage} alt="" />
                        </span>
                    </div>
                    <div className="leading-none me-2">
                        <p className="mb-1 font-semibold text-[0.875rem]">{idx.userName}</p>
                        <div className="mb-1">
                            <i className="ri-star-s-fill text-warning align-middle text-[0.75rem]"></i>
                            <i className="ri-star-s-fill text-warning align-middle text-[0.75rem]"></i>
                            <i className="ri-star-s-fill text-warning align-middle text-[0.75rem]"></i>
                            <i className="ri-star-s-fill text-warning align-middle text-[0.75rem]"></i>
                            <i className="ri-star-s-line text-warning align-middle text-[0.75rem]"></i>
                        </div>
                        <div className="text-[0.6875rem] text-textmuted dark:text-textmuted/50">
                            Reviewed on {idx.reviewDate}
                        </div>
                    </div>
                </div>
                <div className="sm:ps-0 sm:mt-0 mt-3 ps-2">
                    <span className="badge bg-success text-white">Verified Purchase</span>
                </div>
            </div>
            <div className="mb-3">
                <p className="font-semibold mb-1 ps-2">{idx.reviewTitle}</p>
                <p className="mb-0 text-[0.75rem] text-textmuted dark:text-textmuted/50 ps-2">{idx.reviewText} </p>
            </div>
            <div className="product-images">
                <div className="grid grid-cols-12 gap-x-6">
                    <div className="xl:col-span-6 col-span-12">
                        <div className="products-review-images flex">
                            {idx.images.map((img, index) => (
                                <Link className="relative" scroll={false} href="#!" key={index}>
                                    <Image fill src={img} alt="" />
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="xl:col-span-6 col-span-12  flex items-end sm:justify-end sm:mt-0 mt-2">
                        <button className="ti-btn ti-btn-sm ti-btn-light me-2">Report  abuse</button>
                        <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-primary me-2">
                            <i className="ri-thumb-up-line"></i>
                        </button>
                        <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-primary">
                            <i className="ri-thumb-down-line"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
))
// export default ProductSwiperComponent;


export const TestimonialsSwiperComponent = LandingPageProducts.map((idx) => (
    <div className="box card-style-2" key={idx.id}>
        <div className="box-body !p-0">
            <span className={`badge bg-${idx.badgeColor}/[0.15] text-${idx.badgeColor} text-pink top-left-badge`}>{idx.badge}</span>
            <div className={`badge top-right-badge bg-${idx.rightBadgeColor} !text-white`}>
                <div className="badge-icon"><i className={`ti ti-${idx.badgeIcon} text-[0.875rem]`}></i></div>
                <div className="badge-text">{idx.text}</div>
            </div>
            <div className="card-img-top border-b border-dashed border-defaultborder dark:border-defaultborder/10 ">
                <Link scroll={false} href="/ecommerce/customer/product-details" className="stretched-link"></Link>
                <div className="btns-container-1 items-center gap-1">
                    <Link scroll={false} href="/ecommerce/customer/product-details" className="ti-btn ti-btn-icon ti-btn-primary !rounded-full">
                        <i className="ti ti-eye text-[0.875rem]"></i>
                    </Link>
                    <div className="hs-tooltip ti-main-tooltip">
                        <Link scroll={false} href="/ecommerce/customer/compare-products" className="hs-tooltip-toggle ti-btn ti-btn-icon ti-btn-primary !rounded-full">
                            <i className="ti ti-circle-half-2 text-[0.875rem]"></i>
                            <span className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !rounded-sm !font-medium !text-white shadow-sm" role="tooltip">
                                Compare
                            </span>
                        </Link>
                    </div>
                    <div className="hs-tooltip ti-main-tooltip">
                        <Link scroll={false} href="/ecommerce/customer/cart" className="hs-tooltip-toggle ti-btn ti-btn-icon ti-btn-primary !rounded-full">
                            <i className="ti ti-shopping-cart-plus text-[0.875rem]"></i>
                            <span className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !rounded-sm !font-medium !text-white shadow-sm"
                                role="tooltip">
                                Add to cart
                            </span>
                        </Link>
                    </div>
                </div>
                <div className="img-box-2 p-2 relative">
                    <Image fill src={idx.image} alt="img" className="scale-img img-fluid w-full bg-light rounded" />
                </div>
            </div>
            <div className="p-4">
                <div className="flex items-start justify-between">
                    <div className="flex-grow">
                        <Link scroll={false} href="#!" className="mb-2 inline-block text-primary text-[0.8125rem] font-semibold">{idx.brand}</Link>
                        <h6 className="mb-1 font-semibold text-[1rem]"><Link
                            href="/ecommerce/customer/product-details">{idx.title}</Link></h6>
                        <div className="flex items-baseline text-[0.6875rem]">
                            <div className="min-w-fit">
                                <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
                                <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
                                <span className="text-warning me-1"><i className="bi bi-star-fill"></i></span>
                                <span className="text-warning"><i className="bi bi-star-half"></i></span>
                            </div>
                            <p className="mb-0 ms-1 min-w-fit text-textmuted dark:text-textmuted/50">
                                <span> (142)</span>
                                <span> Ratings</span>
                            </p>
                        </div>
                    </div>
                    <div className="min-w-fit">
                        <div className="hs-tooltip ti-main-tooltip">
                            <Link scroll={false} href="/ecommerce/customer/wishlist" className={`hs-tooltip-toggle btn btn-wishlist btn-icon rounded-circle ${idx.active}`}>
                                <i className="bi bi-heart outline1"></i>
                                <i className="bi bi-heart-fill filled"></i>
                                <span className="hs-tooltip-content  ti-main-tooltip-content !py-1 !px-2 !bg-black !text-[0.75rem] !rounded-sm !font-medium !text-white shadow-sm"
                                    role="tooltip">
                                    Wishlist
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex items-baseline mt-4">
                    <h5 className="font-semibold text-primary mb-0">{idx.price}</h5>
                    <span
                        className="text-[0.8125rem] ms-2 text-textmuted dark:text-textmuted/50 line-through">{idx.oldPrice}</span>
                </div>
            </div>
            <Link scroll={false} href="/ecommerce/customer/cart" className="ti-btn ti-btn-soft-primary ti-btn-lg !border-0 btn-style-1 !m-0 !rounded-none ltr:!rounded-tl-md rtl:!rounded-tr-md">
                <i className="ti ti-shopping-cart-plus me-1"></i>Add
            </Link>
        </div>
    </div>
))
// export default TestimonialsSwiperComponent;


export const FollowersTabdata = [
    {
        name: 'Simon Cowall',
        email: 'simoncowal111@gmail.com',
        productsCount: "567",
        src: '../../../assets/images/faces/15.jpg',
        followback: true
    },
    {
        name: 'Melissa Jane',
        email: 'melissajane2134@gmail.com',
        productsCount: "347",
        src: '../../../assets/images/faces/1.jpg',
        followback: true
    },
    {
        name: 'Susana Sane',
        email: 'susanasanee2134@gmail.com',
        productsCount: "847",
        src: '../../../assets/images/faces/2.jpg',
        followback: true
    },
    {
        name: 'Shane Watson',
        email: 'shanewatson@gmail.com',
        productsCount: "812",
        src: '../../../assets/images/faces/21.jpg',
        followback: true
    },
    {
        name: 'Devon Convoy',
        email: 'devonconvoy@gmail.com',
        productsCount: "345",
        src: '../../../assets/images/faces/5.jpg',
        followback: true
    },
    {
        name: 'Umag Anige',
        email: 'umaganigel89@gmail.com',
        productsCount: "456",
        src: '../../../assets/images/faces/6.jpg',
        followback: true
    },
    {
        name: 'Simon Cowall',
        email: 'simoncowal111@gmail.com',
        productsCount: "567",
        src: '../../../assets/images/faces/9.jpg',
        followback: true
    },
    {
        name: 'Melissa Jane',
        email: 'melissajane2134@gmail.com',
        productsCount: "347",
        src: '../../../assets/images/faces/10.jpg',
        followback: true
    },
    {
        name: 'Susana Sane',
        email: 'susanasanee2134@gmail.com',
        productsCount: "847",
        src: '../../../assets/images/faces/11.jpg',
        followback: true
    },
];
export const Followingbdata = [
    {
        name: 'Susana Sane',
        email: 'susanasanee2134@gmail.com',
        productsCount: "847",
        src: '../../../assets/images/faces/2.jpg',
    },
    {
        name: 'Shane Watson',
        email: 'shanewatson@gmail.com',
        productsCount: "812",
        src: '../../../assets/images/faces/21.jpg',
    },
    {
        name: 'Simon Cowall',
        email: 'simoncowal111@gmail.com',
        productsCount: "567",
        src: '../../../assets/images/faces/15.jpg',
    },
    {
        name: 'Melissa Jane',
        email: 'melissajane2134@gmail.com',
        productsCount: "347",
        src: '../../../assets/images/faces/1.jpg',
    },
    {
        name: 'Simon Cowall',
        email: 'simoncowal111@gmail.com',
        productsCount: "567",
        src: '../../../assets/images/faces/9.jpg',
    },
    {
        name: 'Melissa Jane',
        email: 'melissajane2134@gmail.com',
        productsCount: "347",
        src: '../../../assets/images/faces/10.jpg',
    },
    {
        name: 'Devon Convoy',
        email: 'devonconvoy@gmail.com',
        productsCount: "345",
        src: '../../../assets/images/faces/5.jpg',
    },
    {
        name: 'Umag Anige',
        email: 'umaganigel89@gmail.com',
        productsCount: "456",
        src: '../../../assets/images/faces/6.jpg',
    },
    {
        name: 'Susana Sane',
        email: 'susanasanee2134@gmail.com',
        productsCount: "847",
        src: '../../../assets/images/faces/11.jpg',
    },

];