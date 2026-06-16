// RECENT ORDERS
export const RecentOrdersdata = [
    { id: "#19876", productSrc: "../../../../assets/images/ecommerce/jpg/2.jpg", productName: "SoundSync Headphones", customerSrc: "../../../../assets/images/faces/4.jpg", customerName: "Mayor Kelly", status: "Shippped", statusColor: "success", paymentMode: "Cash On Delivery", cost: "$76.00" },
    { id: "#19376", productSrc: "../../../../assets/images/ecommerce/png/10.png", productName: "Western Ladies Bag", customerSrc: "../../../../assets/images/faces/15.jpg", customerName: "Andrew Garfield", status: "Pending", statusColor: "warning", paymentMode: "Online Payment", cost: "$13.00" },
    { id: "#19878", productSrc: "../../../../assets/images/ecommerce/jpg/3.jpg", productName: "Digital Camera(45M Zoom)", customerSrc: "../../../../assets/images/faces/8.jpg", customerName: "Mirinda Hers", status: "Shippped", statusColor: "success", paymentMode: "Cash On Delivery", cost: "$54.00" },
    { id: "#19879", productSrc: "../../../../assets/images/ecommerce/jpg/9.jpg", productName: "High Heel Sandals", customerSrc: "../../../../assets/images/faces/11.jpg", customerName: "Simon Cowel", status: "Cancelled", statusColor: "danger", paymentMode: "Online Payment", cost: "$87.00" },
    { id: "#19880", productSrc: "../../../../assets/images/ecommerce/png/16.png", productName: "Smart Digital Watch", customerSrc: "../../../../assets/images/faces/1.jpg", customerName: "Jack Miller", status: "Shippped", statusColor: "success", paymentMode: "Cash On Delivery", cost: "$78.00" },
]

// RECENLTY ADDED PRODUCTS
export const RecentAddedProducts = [
    { checked: false, productName: "SoundSync Headphones", productSrc: "../../../../assets/images/ecommerce/jpg/2.jpg", productBrand: "Accusam Brand", category: "Electronics", status: "Published", statusColor: "success", customer: "Mayor Kelly", customerEmail: "mayorkelly213@gmail.com", qty: "60", date: "03 Sep 2024", totalSales: "10", price: "$15,000", },
    { checked: true, productName: "Western Ladies Bag", productSrc: "../../../../assets/images/ecommerce/png/9.png", productBrand: "Vellintn Brand", category: "Women's Fashion", status: "Unpublished", statusColor: "danger", customer: "Andrew Garfield", customerEmail: "andrewgarfield1994@gmail.com", qty: "120", date: "05 Oct 2024", totalSales: "20", price: "$25,000" },
    { checked: true, productName: "Digital Camera(45M Zoom)", productSrc: "../../../../assets/images/ecommerce/jpg/3.jpg", productBrand: "Top Brand", category: "Electronics", status: "Published", statusColor: "success", customer: "Simon Cowel", customerEmail: "simoncowel26@gmail.com", qty: "279", date: "13 Nov 2024", totalSales: "27", price: "$43,000" },
    { checked: false, productName: "High Heel Sandals", productSrc: "../../../../assets/images/ecommerce/jpg/9.jpg", productBrand: "Erat Brand", category: "Women Footwear", status: "Unpublished", statusColor: "danger", customer: "Mirinda Hers", customerEmail: "mirindahers@hotmail.com", qty: "270", date: "15 Dec 2024", totalSales: "34", price: "$10,000" },
]

// RECENT INVOICES
export const RecemtInvoiceData = [
    { invoiceId: "#13425", badge: "Paid", badgeColr: "success", date: "04 Aug 2024",},
    { invoiceId: "#14565", badge: "Pending", badgeColr: "warning", date: "06 Sep 2024",},
    { invoiceId: "#15678", badge: "Unpaid", badgeColr: "danger", date: "17 Sep 2024",},
    { invoiceId: "#17542", badge: "Paid", badgeColr: "success", date: "17 Sep 2024",},
]

export const stats = [
    {
        title: 'Total Products',
        count: '14,732',
        link: '#!',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="!text-white !fill-white" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M70.55,144H196.1a16,16,0,0,0,15.74-13.14L224,64H56Z" opacity="0.2"></path><path d="M188,184H91.17a16,16,0,0,1-15.74-13.14L48.73,24H24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><circle cx="92" cy="204" r="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle><circle cx="188" cy="204" r="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle><path d="M70.55,144H196.1a16,16,0,0,0,15.74-13.14L224,64H56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path></svg>
            ),
        bgColor: 'primary',
        textClass: 'text-[1.5rem] mb-0 flex-grow !text-dark font-medium',
    },
    {
        title: 'Total Sales',
        count: '34,732',
        link: '#!',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="!text-white !fill-white" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M54.46,201.54c-9.2-9.2-3.1-28.53-7.78-39.85C41.82,150,24,140.5,24,128s17.82-22,22.68-33.69C51.36,83,45.26,63.66,54.46,54.46S83,51.36,94.31,46.68C106.05,41.82,115.5,24,128,24S150,41.82,161.69,46.68c11.32,4.68,30.65-1.42,39.85,7.78s3.1,28.53,7.78,39.85C214.18,106.05,232,115.5,232,128S214.18,150,209.32,161.69c-4.68,11.32,1.42,30.65-7.78,39.85s-28.53,3.1-39.85,7.78C150,214.18,140.5,232,128,232s-22-17.82-33.69-22.68C83,204.64,63.66,210.74,54.46,201.54Z" opacity="0.2"></path><path d="M54.46,201.54c-9.2-9.2-3.1-28.53-7.78-39.85C41.82,150,24,140.5,24,128s17.82-22,22.68-33.69C51.36,83,45.26,63.66,54.46,54.46S83,51.36,94.31,46.68C106.05,41.82,115.5,24,128,24S150,41.82,161.69,46.68c11.32,4.68,30.65-1.42,39.85,7.78s3.1,28.53,7.78,39.85C214.18,106.05,232,115.5,232,128S214.18,150,209.32,161.69c-4.68,11.32,1.42,30.65-7.78,39.85s-28.53,3.1-39.85,7.78C150,214.18,140.5,232,128,232s-22-17.82-33.69-22.68C83,204.64,63.66,210.74,54.46,201.54Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><circle cx="96" cy="96" r="16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle><circle cx="160" cy="160" r="16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle><line x1="88" y1="168" x2="168" y2="88" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line></svg>

        ),
        bgColor: 'secondary',
        textClass: 'text-[1.5rem] mb-0 flex-grow !text-dark font-medium',
    },
];
export const cards = [
    {
      title: 'Total Views',
      count: '1,116',
      percentage: '+0.21%',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="!fill-white !text-white" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M4 6h16v2H4zm2-4h12v2H6zm14 8H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zm0 10H4v-8h16v8zm-10-7.27v6.53L16 16z" /></svg>
        ),
      trend: 'success',
      trend1:"success",
      trendBorder:"border-success/10",
      trendIcon: ' ri-arrow-up-s-fill',
      svgicon:(
        <svg className="!fill-success !text-success" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M4 6h16v2H4zm2-4h12v2H6zm14 8H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zm0 10H4v-8h16v8zm-10-7.27v6.53L16 16z" /></svg>

      )
    },
    {
      title: 'Total Customers ',
      count: '1,468',
      percentage: '-0.153%',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="!fill-white !text-white" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" /></svg>
        ),
      trend: 'orange',
      trend1:"orangemain",
      trendBorder:"border-orangemain/10",
      trendIcon: 'ri-arrow-down-s-fill',
      svgicon:(
        <svg className="!fill-orangemain !text-orangemain" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" /></svg>

      )
    },
    {
      title: 'Pending Orders',
      count: '2,468',
      percentage: '-0.153%',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="!fill-white !text-white" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" /></svg>
        ),
      trend: 'info',
      trend1:"info",
      trendBorder:"border-info/20",
      trendIcon: 'ri-arrow-down-s-fill',
      svgicon:(
        <svg className="!fill-info !text-info" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" /></svg>

      )
   
    },
  ];
 export const countries = [
    { name: "U.S.A", flag: "us_flag.jpg", value: 120 },
    { name: "France", flag: "french_flag.jpg", value: 134 },
    { name: "U.A.E", flag: "uae_flag.jpg", value: 156 },
    { name: "Italy", flag: "italy_flag.jpg", value: 167 },
    { name: "Mexico", flag: "mexico_flag.jpg", value: 267 },
    { name: "Spain", flag: "spain_flag.jpg", value: 235 },
    { name: "Germany", flag: "germany_flag.jpg", value: 567 },
    { name: "Russia", flag: "russia_flag.jpg", value: 72 },
    { name: "Argentina", flag: "argentina_flag.jpg", value: 98 }
  ];