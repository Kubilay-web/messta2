import Image from "next/image";

const banners = [
    {
        id: 1,
        title: "Fresh Vegetables",
        subtitle: "Big Discount",
        description: "Get 50% Discount On First Order",
        imageSrc: "../../../assets/images/ecommerce/banner/1.png",
        buttonText: "Subscribe",
        badgeText: "50% Off",

    },
    {
        id: 2,
        title: "Face Products Kit",
        subtitle: "Big Discount",
        description: "Get 50% Discount On First Order",
        imageSrc: "../../../assets/images/ecommerce/banner/8.png",
        buttonText: "Shop Now",
        badgeText: "50% Off",
    },
    {
        id: 3,
        title: "Gifts for Occasions",
        subtitle: "Big Discount",
        description: "Get 50% Discount On First Order",
        imageSrc: "../../../assets/images/ecommerce/banner/2.png",
        buttonText: "Shop Now",
        badgeText: "50% Off",
    },
];

export const bannersData = banners.map((idx) => (
    <div className="banner banner-1 !rounded-md" key={idx.id}>
        <div className="grid grid-cols-12 gap-x-6">
            <div className="md:col-span-7 col-span-12">
                <div className="banner-content text-start text-default">
                    <p className="mb-4">Exclusive Offers<span
                        className="badge bg-secondary ms-2 blink-text text-white">{idx.badgeText}</span></p>
                    <h2 className="font-medium mb-4 ecommerce-landing-title">{idx.title}<br />{idx.subtitle}</h2>
                    <p className="text-textmuted dark:text-textmuted/50 text-[1.125rem] mb-[1.2rem]">{idx.description}</p>
                    <div className="custom-form-group">
                        <input type="text"
                            className="form-control form-control-lg !py-3 !rounded-full shadow-sm"
                            placeholder="Search Product Here.."
                            aria-label="Recipient's username" />
                        <button className="ti-btn ti-btn-primary !bg-primary !border-0 !my-2 custom-form-btn !rounded-full" type="button">{idx.buttonText}</button>
                    </div>
                </div>
            </div>
            <div className="md:col-span-5 col-span-12">
                <div className="banner-1-img relative">
                    <Image fill src={idx.imageSrc} alt="img" className="scaleX--1 img-fluid" />
                </div>
            </div>
        </div>
    </div>
))

export const TopCategories = [
    { id: 1, title: "Egg, Fish & Meat", icon: "eggs", colorClass: "primary", },
    { id: 2, title: "Vegetables", icon: "carrot", colorClass: "secondary", },
    { id: 3, title: "Beverages", icon: "bottle", colorClass: "success", },
    { id: 4, title: "Household", icon: "home-bolt", colorClass: "orange", },
    { id: 5, title: "Baby Care", icon: "baby-carriage", colorClass: "info", },
    { id: 6, title: "Snacks", icon: "cookie", colorClass: "warning", }
];

export const LandingPageProducts = [
    {
        id: 1,
        image: '../../../assets/images/ecommerce/png/30.png',
        title: 'Sound Headphones',
        brand: 'Top Brand',
        price: '$120',
        oldPrice: '$399',
        active: "active",
        badge: "20% Off",
        badgeColor: "pinkmain",
        dealsBrand: "Accusam",
        Deals: "Deals",
        sold: "73/350",
        progressWidth: "35%",
        Specialproducts: "Special",
    },
    {
        id: 2,
        image: '../../../assets/images/ecommerce/png/29.png',
        title: 'CapturePro Camera',
        brand: 'Adibas',
        price: '$29',
        oldPrice: '$99',
        rightBadgeColor: "danger",
        text: "Hot",
        badgeIcon: "flame",
        sold: "353/500",
        progressWidth: "75%",
        Specialproducts: "Special",
    },
    {
        id: 3,
        title: 'RiseTime Alarm',
        brand: 'Vellintn',
        image: '../../../assets/images/ecommerce/png/32.png',
        oldPrice: '$199',
        price: '$39',
        badge: "60% Off",
        badgeColor: "secondary",
        rightBadgeColor: "success",
        text: "Trending",
        badgeIcon: "bolt",
        dealsBrand: "Erat",
        Deals: "Deals"
    },
    {
        id: 4,
        title: 'ChicCarry Handbag',
        brand: 'Lenscart',
        image: '../../../assets/images/ecommerce/png/31.png',
        oldPrice: '$399',
        price: '$120',
        active: "active",
        badge: "60% Off",
        badgeColor: "info",
        sold: "140/360",
        progressWidth: "55%",
        Specialproducts: "Special",
    },
    {
        id: 5,
        image: '../../../assets/images/ecommerce/png/33.png',
        title: 'StrideStep Shoes',
        brand: 'Vellintn',
        price: '$47',
        oldPrice: '$125',
        badge: "60% Off",
        badgeColor: "secondary",
        rightBadgeColor: "success",
        text: "Trending",
        badgeIcon: "bolt",
        dealsBrand: "Dolore",
        Deals: "Deals",
        sold: "850/1000",
        progressWidth: "70%",
        Specialproducts: "Special",
    },
    {
        id: 6,
        image: '../../../assets/images/ecommerce/png/6.png',
        title: 'ComfortCozy Sofa',
        brand: 'Lenscart',
        price: '$120',
        oldPrice: '$399',
        active: "active",
        badge: "60% Off",
        badgeColor: "info"
    },
    {
        id: 7,
        brand: "Adibas",
        title: "FlexFit Sneakers",
        price: "$120",
        oldPrice: "$399",
        image: "../../../assets/images/ecommerce/png/20.png",
        rightBadgeColor: "orangemain",
        text: "Trending",
        badgeIcon: "bolt"
    },
    {
        id: 8,
        brand: "Top Brand",
        title: "ClassicTick Watch",
        price: "$120",
        oldPrice: "$399",
        image: "../../../assets/images/ecommerce/png/13.png",
        rating: " 3.5",
        active: "active",
        badge: "25% Off",
        badgeColor: "pinkmain"
    },
    {
        id: 9,
        image: '../../../assets/images/ecommerce/png/30.png',
        title: 'SoundSync Headphones',
        brand: 'Top Brand',
        price: '$120',
        oldPrice: '$399',
        active: "active",
        badge: "20% Off",
        badgeColor: "pinkmain",
        dealsBrand: "Accusam",
    },
];

export const TopSellingTabData = [
    {
        id: 1,
        name: "Flower Pot",
        brand: "Adibas",
        image: "../../../assets/images/ecommerce/jpg/1.jpg",
        rightBadgeColor: "danger",
        text: "Hot",
        badgeIcon: "flame",
    },
    {
        id: 2,
        name: "SoundSync Headphones",
        brand: "Vellintn",
        image: "../../../assets/images/ecommerce/jpg/2.jpg",
        badge: "60% off",
        badgeColor: "secondary",
        rightBadgeColor: "success",
        text: "Trending",
        badgeIcon: "bolt"
    },
    {
        id: 3,
        name: "CapturePro Camera",
        brand: "Top Brand",
        image: "../../../assets/images/ecommerce/jpg/3.jpg",
        badge: "25% off",
        badgeColor: "pinkmain",
        active: "active",
    },
    {
        id: 4,
        name: "Kivi Fruit",
        brand: "Lenscart",
        image: "../../../assets/images/ecommerce/jpg/4.jpg",
        badge: "60% off",
        badgeColor: "info",
        active: "active",
    },
    {
        id: 5,
        name: 'Donut',
        brand: 'Adibas',
        image: '../../../assets/images/ecommerce/jpg/5.jpg',
        rightBadgeColor: "orange",
        text: "Trending",
        badgeIcon: "bolt"
    },
    {
        id: 6,
        name: 'Decorative Pot',
        brand: 'Lenscart',
        image: '../../../assets/images/ecommerce/jpg/6.jpg',
        badge: "60% off",
        badgeColor: "info",
        active: "active",
    },
    {
        id: 7,
        brand: "Vellintn",
        name: "SoundSync Headphones",
        image: "../../../assets/images/ecommerce/jpg/2.jpg",
        badge: "60% off",
        badgeColor: "secondary",
        rightBadgeColor: "success",
        text: "Trending",
        badgeIcon: "bolt"
    },
    {
        id: 8,
        brand: "Top Brand",
        name: "Donut",
        image: "../../../assets/images/ecommerce/jpg/5.jpg",
        badge: "25% off",
        badgeColor: "pinkmain",
        active: "active",
    },
];

export const RecentlyAddedTabData = [
    {
        id: 1,
        title: "Black Men's Shirt",
        brand: 'Adibas',
        image: '../../../assets/images/ecommerce/png/11.png',
        rightBadgeColor: "danger",
        text: "Hot",
        badgeIcon: "flame",
    },
    {
        id: 2,
        title: 'Capture Pro Camera',
        brand: 'Top Brand',
        image: '../../../assets/images/ecommerce/png/14.png',
        badge: "25% off",
        badgeColor: "pinkmain",
    },
    {
        id: 3,
        brand: "Top Brand",
        title: "ClassicTick Watch",
        image: "../../../assets/images/ecommerce/png/13.png",
        active: "active",
        badge: "60% Off",
        badgeColor: "info",
    },
    {
        id: 4,
        title: 'Western Ladies Sweater',
        brand: 'Vellintn',
        image: '../../../assets/images/ecommerce/png/12.png',
        active: "active",
        rightBadgeColor: "success",
        text: "Trending",
        badgeIcon: "bolt",
        badge: "60% off",
        badgeColor: "secondary",
    },
    {
        id: 5,
        image: '../../../assets/images/ecommerce/png/30.png',
        title: 'SoundSync Headphones',
        brand: 'Top Brand',
        active: "active",
        badge: "20% Off",
        badgeColor: "info",
    },
    {
        id: 6,
        image: '../../../assets/images/ecommerce/png/33.png',
        title: 'StrideStep Shoes',
        brand: 'Vellintn',
        price: '$47',
        oldPrice: '$125',
    },
    {
        id: 7,
        title: 'ChicCarry Handbag',
        brand: 'Lenscart',
        image: '../../../assets/images/ecommerce/png/31.png',
        oldPrice: '$399',
        price: '$120',
        active: "active",
        badge: "60% Off",
        badgeColor: "secondary",
        sold: "140/360",
        progressWidth: "55%",
        Specialproducts: "Special",
    },
    {
        id: 8,
        title: 'Red Ladies Watch',
        brand: 'Top Brand',
        image: '../../../assets/images/ecommerce/png/16.png',
        active: "active",
        rightBadgeColor: "success",
        text: "Trending",
        badgeIcon: "bolt",
        badge: "60% off",
        badgeColor: "pinkmain",
    },
]





