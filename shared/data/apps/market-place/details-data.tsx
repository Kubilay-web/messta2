import SpkMarketplaceProduct from "@/shared/@spk-reusable-components/apps/reusable-marketplace/spk-marketplace-product";

// Product Information
export const ProductInformation = [
    { id:1, lable1: "Last Updated", lable2: "25 Dec 2022" },
    { id:2, lable1: "Created Date", lable2: "13 Jan 2022" },
    { id:3, lable1: "Category", lable2: "HTML Template" },
    { id:4, lable1: "Files Included", lable2: "HTML, CSS, Javascript, Images" },
    { id:5, lable1: "Browsers", lable2: "Chrome, Firefox, Safari, IE, Opera, OperaMini" },
]

// Related Products
export const RelatedProducts = [
    {
        id: 1,
        src: '../../assets/images/marketplace/templates/1.png',
        title: 'PHP Script Template',
        author: 'By Obligation Pvt.Ltd',
        ratings: "142",
        sales: "150",
        originalPrice: "399",
        discountedPrice: "120",
    },
    {
        id: 2,
        src: '../../assets/images/marketplace/templates/2.png',
        title: 'HTML Template',
        author: 'By Obligation Pvt.Ltd',
        ratings: "132",
        sales: "120",
        originalPrice: "379",
        discountedPrice: "170",
        badge: '20% Off',
    },
    {
        id: 3,
        src: '../../assets/images/marketplace/templates/3.png',
        title: 'React Template ',
        author: 'By Obligation Pvt.Ltd',
        ratings: "232",
        sales: "240",
        originalPrice: "499",
        discountedPrice: "240",
        rightBadge: true,
    },
    {
        id: 4,
        src: '../../assets/images/marketplace/templates/4.png',
        title: 'Wordpress Template',
        author: 'By Obligation Pvt.Ltd',
        ratings: "152",
        sales: "310",
        originalPrice: "439",
        discountedPrice: "320",
        badge: '40% Off',
    },
    {
        id: 5,
        src: '../../assets/images/marketplace/templates/5.png',
        title: 'Laravel Template',
        author: 'By Obligation Pvt.Ltd',
        ratings: "142",
        sales: "120",
        originalPrice: "399",
        discountedPrice: "120",
        badge: '20% Off',
        rightBadge: true
    },
    {
        id: 6,
        src: '../../assets/images/marketplace/templates/6.png',
        title: 'Django Template',
        author: 'By Obligation Pvt.Ltd',
        ratings: "242",
        sales: "220",
        originalPrice: "499",
        discountedPrice: "220",
    },
    {
        id: 7,
        src: "../../assets/images/marketplace/templates/7.png",
        title: "Vuejs Template",
        author: "By Obligation Pvt.Ltd",
        ratings: "342",
        sales: "320",
        originalPrice: "499",
        discountedPrice: "220",
        badge: "20% Off",
    },
    {
        id: 8,
        src: "../../assets/images/marketplace/templates/8.png",
        title: "Codeigniter Template",
        author: "By Obligation Pvt.Ltd",
        ratings: "142",
        sales: "120",
        originalPrice: "399",
        discountedPrice: "120",
    },
    {
        id: 9,
        src: '../../assets/images/marketplace/templates/1.png',
        title: 'HTML Template',
        author: 'By Obligation Pvt.Ltd',
        ratings: "142",
        sales: "150",
        originalPrice: "399",
        discountedPrice: "120",
    },
];



export const RelatedProductsdata = RelatedProducts.map((candidate, index) => (

    <SpkMarketplaceProduct key={index} card={candidate} />
))
