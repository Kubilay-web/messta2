const Bagicon = <svg xmlns="http://www.w3.org/2000/svg" className="!text-white !fill-white" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
    <path d="M224,80V200a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V80a8,8,0,0,1,8-8H216A8,8,0,0,1,224,80Z" opacity="0.2"></path>
    <path d="M216,64H176a48,48,0,0,0-96,0H40A16,16,0,0,0,24,80V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V80A16,16,0,0,0,216,64ZM128,32a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm88,168H40V80H80V96a8,8,0,0,0,16,0V80h64V96a8,8,0,0,0,16,0V80h40Z">
    </path>
</svg>
const WishlistIcon = <svg xmlns="http://www.w3.org/2000/svg" className="!text-white !fill-white" viewBox="0 0 256 256">
    <rect width="256" height="256" fill="none"></rect>
    <path d="M128,224S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32a54,54,0,0,1,54,54C232,168,128,224,128,224Z" opacity="0.2"></path>
    <path d="M128,224S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32a54,54,0,0,1,54,54C232,168,128,224,128,224Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
</svg>
const CardIcon = <svg xmlns="http://www.w3.org/2000/svg" className="!text-white !fill-white" viewBox="0 0 256 256">
    <rect width="256" height="256" fill="none"></rect>
    <path d="M70.55,144H196.1a16,16,0,0,0,15.74-13.14L224,64H56Z" opacity="0.2"></path>
    <path d="M188,184H91.17a16,16,0,0,1-15.74-13.14L48.73,24H24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
    <circle cx="92" cy="204" r="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle>
    <circle cx="188" cy="204" r="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle>
    <path d="M70.55,144H196.1a16,16,0,0,0,15.74-13.14L224,64H56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
</svg>
const DollerIcon = <svg xmlns="http://www.w3.org/2000/svg" className="!text-white !fill-white" viewBox="0 0 256 256">
    <rect width="256" height="256" fill="none"></rect>
    <path d="M128,128h24a40,40,0,0,1,0,80H128Z" opacity="0.2"></path>
    <path d="M128,48H112a40,40,0,0,0,0,80h16Z" opacity="0.2"></path>
    <line x1="128" y1="24" x2="128" y2="48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
    <line x1="128" y1="208" x2="128" y2="232" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
    <path d="M184,88a40,40,0,0,0-40-40H112a40,40,0,0,0,0,80h40a40,40,0,0,1,0,80H104a40,40,0,0,1-40-40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
</svg>
// My Orders
export const MyOrders = [
    { id: "#19876", productName: "SoundSync Headphones", productSrc: "../../../assets/images/ecommerce/png/30.png", productBrand: "Accusam Brand", status: "Shippped", statusColor: "success", customer: "Mayor Kelly", qty: "6", date: "03 Sep 2024", paymentMode: "Cash On Delivery", price: "$76.00" },
    { id: "#19376", productName: "Western Ladies Bag", productSrc: "../../../assets/images/ecommerce/png/31.png", productBrand: "Vellintn Brand", status: "Pending", statusColor: "warning", customer: "Andrew Garfield", qty: "1", date: "05 Oct 2024", paymentMode: "Online Payment", price: "$13.00" },
    { id: "#19878", productName: "Digital Alarm Clock", productSrc: "../../../assets/images/ecommerce/png/32.png", productBrand: "Top Brand", status: "Shippped", statusColor: "success", customer: "Simon Cowel", qty: "2", date: "13 Nov 2024", paymentMode: "Cash On Delivery", price: "$54.00	" },
    { id: "#19879", productName: "Men's Running Shoes", productSrc: "../../../assets/images/ecommerce/png/33.png", productBrand: "Erat Brand", status: "Cancelled", statusColor: "danger", customer: "Mirinda Hers", qty: "2", date: "15 Dec 2024", paymentMode: "Online Payment", price: "$87.00" },
    { id: "#19880", productName: "Wooden Chair", productSrc: "../../../assets/images/ecommerce/png/6.png", productBrand: "Setre Brand", status: "Shippped", statusColor: "success", customer: "Alicia Keys", qty: "1", date: "28 Dec 2024", paymentMode: "Cash On Delivery", price: "$78.00" },
]

export const customerdata = [
    { id:1, icon: Bagicon, boxclass: "earning-card", iconBg: "primary", bgColor1: "white", bgColor: "primary", name: "Total Orders", count: "14,732" },
    { id:2, icon: WishlistIcon, iconBg: "secondary", bgColor1: "secondary", bgColor: "secondary", name: "My wishlist", count: "17,290" },
    { id:3, icon: CardIcon, iconBg: "success", bgColor1: "success", bgColor: "success", name: "Cart", count: "12,345" },
    { id:4, icon: DollerIcon, iconBg: "orange", bgColor1: "orangemain", bgColor: "orangemain", name: "Refunds", count: "866" },
]
