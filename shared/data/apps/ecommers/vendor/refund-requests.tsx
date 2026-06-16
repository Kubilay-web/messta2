// REFUND REQUESTS
export const RefundRequestsdata = [
    {
        id:1,
        orderId: "#19878",
        product: "Digital Clock",
        customer: "Mirinda Hers",
        date: "23 Mar 2022",
        cost: "$54.00",
        status: "Accepted",
        avatar: "../../../assets/images/faces/8.jpg",
        productImage: "../../../assets/images/ecommerce/png/32.png"
    },
    {
        id:2,
        orderId: "#19879",
        product: "Men's Shoes",
        customer: "Simon Cowel",
        date: "17 Aug 2022",
        cost: "$87.00",
        status: "Rejected",
        avatar: "../../../assets/images/faces/11.jpg",
        productImage: "../../../assets/images/ecommerce/png/33.png"
    },
    {
        id:3,
        orderId: "#19876",
        product: "SQL Headphones",
        customer: "Mayor Kelly",
        date: "09 Jan 2022",
        cost: "$76.00",
        status: "Accepted",
        avatar: "../../../assets/images/faces/4.jpg",
        productImage: "../../../assets/images/ecommerce/png/30.png"
    },
    {
        id:4,
        orderId: "#19376",
        product: "Western Bag",
        customer: "Andrew",
        date: "12 Feb 2022",
        cost: "$13.00",
        status: "Pending",
        avatar: "../../../assets/images/faces/15.jpg",
        productImage: "../../../assets/images/ecommerce/png/31.png"
    },
    {
        id:5,
        orderId: "#19880",
        product: "Smart Watch",
        customer: "Jack Miller",
        date: "21 Oct 2022",
        cost: "$78.00",
        status: "Accepted",
        avatar: "../../../assets/images/faces/1.jpg",
        productImage: "../../../assets/images/ecommerce/png/16.png"
    }
];
const Bagicon = <svg xmlns="http://www.w3.org/2000/svg"
className="!text-white !fill-white" viewBox="0 0 256 256">
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
const WishlistIcon =  <svg xmlns="http://www.w3.org/2000/svg"
className="!text-white !fill-white" viewBox="0 0 256 256">
<rect width="256" height="256" fill="none"></rect>
<path
    d="M54.46,201.54c-9.2-9.2-3.1-28.53-7.78-39.85C41.82,150,24,140.5,24,128s17.82-22,22.68-33.69C51.36,83,45.26,63.66,54.46,54.46S83,51.36,94.31,46.68C106.05,41.82,115.5,24,128,24S150,41.82,161.69,46.68c11.32,4.68,30.65-1.42,39.85,7.78s3.1,28.53,7.78,39.85C214.18,106.05,232,115.5,232,128S214.18,150,209.32,161.69c-4.68,11.32,1.42,30.65-7.78,39.85s-28.53,3.1-39.85,7.78C150,214.18,140.5,232,128,232s-22-17.82-33.69-22.68C83,204.64,63.66,210.74,54.46,201.54Z"
    opacity="0.2"></path>
<path
    d="M54.46,201.54c-9.2-9.2-3.1-28.53-7.78-39.85C41.82,150,24,140.5,24,128s17.82-22,22.68-33.69C51.36,83,45.26,63.66,54.46,54.46S83,51.36,94.31,46.68C106.05,41.82,115.5,24,128,24S150,41.82,161.69,46.68c11.32,4.68,30.65-1.42,39.85,7.78s3.1,28.53,7.78,39.85C214.18,106.05,232,115.5,232,128S214.18,150,209.32,161.69c-4.68,11.32,1.42,30.65-7.78,39.85s-28.53,3.1-39.85,7.78C150,214.18,140.5,232,128,232s-22-17.82-33.69-22.68C83,204.64,63.66,210.74,54.46,201.54Z"
    fill="none" stroke="currentColor"
    strokeLinecap="round" strokeLinejoin="round"
    strokeWidth="16"></path>
<polyline points="88 136 112 160 168 104" fill="none"
    stroke="currentColor" strokeLinecap="round"
    strokeLinejoin="round" strokeWidth="16">
</polyline>
</svg>
const CardIcon =  <svg xmlns="http://www.w3.org/2000/svg"
className="!text-white !fill-white" viewBox="0 0 256 256">
<rect width="256" height="256" fill="none"></rect>
<path
    d="M32,208V56a8,8,0,0,1,8-8H216a8,8,0,0,1,8,8V208l-32-16-32,16-32-16L96,208,64,192Z"
    opacity="0.2"></path>
<path
    d="M32,208V56a8,8,0,0,1,8-8H216a8,8,0,0,1,8,8V208l-32-16-32,16-32-16L96,208,64,192Z"
    fill="none" stroke="currentColor"
    strokeLinecap="round" strokeLinejoin="round"
    strokeWidth="16"></path>
<line x1="152" y1="96" x2="104" y2="144" fill="none"
    stroke="currentColor" strokeLinecap="round"
    strokeLinejoin="round" strokeWidth="16"></line>
<line x1="104" y1="96" x2="152" y2="144" fill="none"
    stroke="currentColor" strokeLinecap="round"
    strokeLinejoin="round" strokeWidth="16"></line>
</svg>

export const customerdata = [
    { id:1, icon: Bagicon, boxclass: "earning-card", iconBg: "primary", bgColor1: "white", bgColor: "primary", name: "Refund Requests", count: "14,732" },
    { id:2, icon: WishlistIcon, iconBg: "secondary", bgColor1: "secondary", bgColor: "secondary", name: "Accepted", count: "17,290" },
    { id:3, icon: CardIcon, iconBg: "success", bgColor1: "success", bgColor: "success", name: "Rejected", count: "12,345" },
]