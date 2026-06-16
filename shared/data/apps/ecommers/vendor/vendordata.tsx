// All Products List
export const AllProductsList = [
    {
        id: 1,
        checked: true,
        name: "SoundSync Headphones",
        brand: "Accusam Brand",
        status: "Published",
        stockQty: "60",
        totalSales: "10",
        price: "$15,000",
        image: "../../../assets/images/ecommerce/png/30.png",
    },
    {
        id: 2,
        checked: false,
        name: "Western Ladies Bag",
        brand: "Vellintn Brand",
        status: "Unpublished",
        stockQty: "120",
        totalSales: "20",
        price: "$25,000",
        image: "../../../assets/images/ecommerce/png/31.png",
    },
    {
        id: 3,
        checked: false,
        name: "Digital Alarm Clock",
        brand: "Top Brand",
        status: "Published",
        stockQty: "279",
        totalSales: "27",
        price: "$43,000",
        image: "../../../assets/images/ecommerce/png/32.png",
    },
    {
        id: 4,
        checked: true,
        name: "Men's Running Shoes",
        brand: "Erat Brand",
        status: "Unpublished",
        stockQty: "270",
        totalSales: "34",
        price: "$10,000",
        image: "../../../assets/images/ecommerce/png/33.png",
    },
    {
        id: 5,
        checked: true,
        name: "Men's Hoodie",
        brand: "Top Brand",
        status: "Published",
        stockQty: "279",
        totalSales: "27",
        price: "$43,000",
        image: "../../../assets/images/ecommerce/png/11.png",
    },
    {
        id: 6,
        checked: false,
        name: "Men's Sweater",
        brand: "Erat Brand",
        status: "Unpublished",
        stockQty: "270",
        totalSales: "34",
        price: "$10,000",
        image: "../../../assets/images/ecommerce/png/12.png",
    },
];

const Bagicon = <svg xmlns="http://www.w3.org/2000/svg"
    className="!text-white !fill-white" viewBox="0 0 256 256">
    <rect width="256" height="256" fill="none"></rect>
    <path
        d="M128,129.09,32.7,76.93a8,8,0,0,0-.7,3.25v95.64a8,8,0,0,0,4.16,7l88,48.18a8,8,0,0,0,3.84,1Z"
        opacity="0.2"></path>
    <polyline points="32.7 76.92 128 129.08 223.3 76.92"
        fill="none" stroke="currentColor"
        strokeLinecap="round" strokeLinejoin="round"
        strokeWidth="16"></polyline>
    <line x1="128" y1="129.09" x2="128" y2="231.97"
        fill="none" stroke="currentColor"
        strokeLinecap="round" strokeLinejoin="round"
        strokeWidth="16"></line>
    <path
        d="M219.84,182.84l-88,48.18a8,8,0,0,1-7.68,0l-88-48.18a8,8,0,0,1-4.16-7V80.18a8,8,0,0,1,4.16-7l88-48.18a8,8,0,0,1,7.68,0l88,48.18a8,8,0,0,1,4.16,7v95.64A8,8,0,0,1,219.84,182.84Z"
        fill="none" stroke="currentColor"
        strokeLinecap="round" strokeLinejoin="round"
        strokeWidth="16"></path>
    <polyline points="81.56 48.31 176 100 176 152"
        fill="none" stroke="currentColor"
        strokeLinecap="round" strokeLinejoin="round"
        strokeWidth="16"></polyline>
</svg>
const WishlistIcon = <svg xmlns="http://www.w3.org/2000/svg"
    className="!text-white !fill-white" viewBox="0 0 256 256">
    <rect width="256" height="256" fill="none"></rect>
    <rect x="32" y="48" width="192" height="160" rx="8"
        opacity="0.2"></rect>
    <rect x="32" y="48" width="192" height="160" rx="8"
        fill="none" stroke="currentColor"
        strokeLinecap="round" strokeLinejoin="round"
        strokeWidth="16"></rect>
    <path d="M168,88a40,40,0,0,1-80,0" fill="none"
        stroke="currentColor" strokeLinecap="round"
        strokeLinejoin="round" strokeWidth="16"></path>
</svg>
const CardIcon = <svg xmlns="http://www.w3.org/2000/svg" className="!text-white !fill-white"
    viewBox="0 0 256 256">
    <rect width="256" height="256" fill="none"></rect>
    <polygon points="80 120 32 168 80 216 80 120"
        opacity="0.2"></polygon>
    <polygon points="80 120 32 168 80 216 80 120"
        fill="none" stroke="currentColor"
        strokeLinecap="round" strokeLinejoin="round"
        strokeWidth="16"></polygon>
    <path
        d="M80,56h88a56,56,0,0,1,56,56h0a56,56,0,0,1-56,56H80"
        fill="none" stroke="currentColor"
        strokeLinecap="round" strokeLinejoin="round"
        strokeWidth="16"></path>
</svg>

export const customerdata = [
    { id:1, icon: Bagicon, boxclass: "earning-card", iconBg: "primary", bgColor1: "white", bgColor: "primary", name: "Total Products", count: "14,732" },
    { id:2, icon: WishlistIcon, iconBg: "secondary", bgColor1: "secondary", bgColor: "secondary", name: "Total Orders", count: "17,290" },
    { id:3, icon: CardIcon, iconBg: "success", bgColor1: "success", bgColor: "success", name: "Refund Requests", count: "12,345" },
]