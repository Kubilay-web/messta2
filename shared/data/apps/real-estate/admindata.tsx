import SpkSwiperlanding from "@/shared/@spk-reusable-components/apps/spk-swiper-landing";

// PROPERTIES STATISTICS
export const PropertiesStatisticsSeries = [{
    name: 'Total Properties',
    type: 'column',
    data: [23, 17, 22, 27, 13, 22, 37, 21, 44, 22, 45, 35]
}, {
    name: 'Total Sales',
    type: 'column',
    data: [17, 12, 18, 23, 10, 17, 25, 18, 35, 18, 37, 28]
}, {
    name: 'Pending Properties',
    type: 'line',
    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 27]
},
]
export const PropertiesStatisticsOptions = {
    chart: {
        toolbar: {
            show: false
        },
        height: 316,
        type: 'line',
        stacked: false,
        fontFamily: 'Poppins, Arial, sans-serif',
    },
    grid: {
        borderColor: '#f5f4f4',
        strokeDashArray: 3
    },
    dataLabels: {
        enabled: false
    },
    title: {
        text: undefined,
    },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    yaxis: [
        {
            show: true,
            axisTicks: {
                show: true,
            },
            axisBorder: {
                show: false,
                color: '#4eb6d0'
            },
            labels: {
                style: {
                    colors: '#4eb6d0',
                }
            },
            title: {
                text: undefined,
            },
            tooltip: {
                enabled: true
            }
        },
        {
            seriesName: 'Projects',
            opposite: true,
            axisTicks: {
                show: true,
            },
            axisBorder: {
                show: false,
            },
            labels: {
                style: {
                    colors: '#00E396',
                }
            },
            title: {
                text: undefined,
            },
        },
        {
            seriesName: 'Revenue',
            opposite: true,
            axisTicks: {
                show: true,
            },
            axisBorder: {
                show: false,
            },
            labels: {
                show: false,
            },
            title: {
                text: undefined,
            }
        },
    ],
    tooltip: {
        enabled: true,
    },
    legend: {
        show: true,
        position: 'top',
        offsetX: 40,
        fontSize: '13px',
        fontWeight: 'normal',
        labels: {
            colors: '#acb1b1',
        },
        markers: {
            width: 10,
            height: 10,
        },
    },
    stroke: {
        width: [1, 1, 1.5],
        curve: 'smooth',
        lineCap: 'round',
        dashArray: [0, 0, 3],
    },
    plotOptions: {
        bar: {
            columnWidth: "40%",
            borderRadius: 2
        }
    },
    colors: ["rgba(var(--primary-rgb))", "rgba(var(--primary-rgb),0.2)", "rgb(215, 124, 247)"]
}



// TOP COUNTRIES
export const TopCountries = [
    { country: 'U.S.A', flag: '../../../assets/images/flags/us_flag.jpg', earnings: '120' },
    { country: 'France', flag: '../../../assets/images/flags/french_flag.jpg', earnings: '134' },
    { country: 'U.A.E', flag: '../../../assets/images/flags/uae_flag.jpg', earnings: '$156.00' },
    { country: 'Italy', flag: '../../../assets/images/flags/italy_flag.jpg', earnings: '167' },
    { country: 'Mexico', flag: '../../../assets/images/flags/mexico_flag.jpg', earnings: '267' },
    { country: 'Spain', flag: '../../../assets/images/flags/spain_flag.jpg', earnings: '235' },
    { country: 'Germany', flag: '../../../assets/images/flags/germany_flag.jpg', earnings: '567' },
    { country: 'Russia', flag: '../../../assets/images/flags/russia_flag.jpg', earnings: '72' },
]


// RECENT REGISTERED AGENTS
export const RecentRegistered = [
    {
        id:1,
        name: 'Amanda Nanes',
        email: 'amandananes@',
        src: '../../../assets/images/faces/4.jpg',
        itemsSold: "12",
        plan: "Basic",
        planColor: "warning",
        status: 'Active',
        statusColor: "success",
        memberSince: 'Oct 12, 2024',
    },
    {
        id:2,
        name: 'Charles Achilles',
        email: '@charlesachilles',
        src: '../../../assets/images/faces/15.jpg',
        itemsSold: "2",
        plan: "Premium",
        planColor: "danger",
        status: 'Active',
        statusColor: "success",
        memberSince: 'Dec 12, 2024',
    },
    {
        id:3,
        name: 'Jack Miller',
        email: '@jackmiller',
        src: '../../../assets/images/faces/12.jpg',
        itemsSold: "6",
        plan: "Pro",
        planColor: "info",
        status: 'Active',
        statusColor: "success",
        memberSince: 'Oct 12, 2024',
    },
    {
        id:4,
        name: 'Julia Camo',
        email: '@juliacamo',
        src: '../../../assets/images/faces/5.jpg',
        itemsSold: "9",
        plan: "Basic",
        planColor: "warning",
        status: 'Deactive',
        statusColor: "danger",
        memberSince: 'Apr 10, 2024',
    },
];

// POPULAR BUILDERS
export const PopularBuilders = [
    { id:1, builderSrc: "../../../assets/images/company-logos/8.png", builderName: "BloomTech.Inc", builderMail: "@juliacamo", sold: "32", status: "Active", statusColor: "success", date: "Jan 23 2022" },
    { id:2, builderSrc: "../../../assets/images/company-logos/10.png", builderName: "Voluptatem Pvt.Ltd", builderMail: "@charlesachilles", sold: "43", status: "Active", statusColor: "success", date: "Feb 04 2022" },
    { id:3, builderSrc: "../../../assets/images/company-logos/1.png", builderName: "Beatae Industries", builderMail: "@jackmiller", sold: "26", status: "Deactive", statusColor: "danger", date: "Mar 24 2022" },
    { id:4, builderSrc: "../../../assets/images/company-logos/2.png", builderName: "Obligation Pvt.Ltd", builderMail: "amandananes@", sold: "37", status: "Active", statusColor: "success", date: "Apr 30 2022" },
]

// RECENT POSTED PROPERTIES
export const RecentPosted = [
    {
        id: 1,
        checked: false,
        imageSrc: "../../../assets/images/realestate/properties/2.png",
        name: "Duplex House",
        type: "5BHK Apartment",
        agent: {
            imageSrc: "../../../assets/images/faces/4.jpg",
            name: "Mayor Kelly",
        },
        category: "Luxury House",
        status: "Active",
        statusColor: "success",
        forSaleRent: "For Rent",
        date: "03 Sep 2022",
        location: "Germany",
        price: "$15,000",
    },
    {
        id: 2,
        checked: true,
        imageSrc: "../../../assets/images/realestate/properties/4.png",
        name: "Nature House",
        type: "3BHK Apartment",
        agent: {
            imageSrc: "../../../assets/images/faces/15.jpg",
            name: "Andrew Garfield",
        },
        category: "Garden Villa",
        status: "Expired",
        statusColor: "danger",
        forSaleRent: "For Sale",
        date: "16 Nov 2022",
        location: "Canada",
        price: "$16,000",
    },
    {
        id: 3,
        checked: true,
        imageSrc: "../../../assets/images/realestate/properties/6.png",
        name: "Riddi Houses",
        type: "2BHK Apartment",
        agent: {
            imageSrc: "../../../assets/images/faces/11.jpg",
            name: "Simon Cowel",
        },
        category: "Commercial",
        status: "Pending",
        statusColor: "warning",
        forSaleRent: "For Rent",
        date: "17 Jan 2024",
        location: "Europe",
        price: "$32,000",
    },
    {
        id: 4,
        checked: false,
        imageSrc: "../../../assets/images/realestate/properties/5.png",
        name: "Sidh Houses",
        type: "4BHK Apartment",
        agent: {
            imageSrc: "../../../assets/images/faces/8.jpg",
            name: "Mirinda Hers",
        },
        category: "Flats",
        status: "Active",
        statusColor: "success",
        forSaleRent: "For Sale",
        date: "23 Dec 2022",
        location: "USA",
        price: "$26,000",
    }
];

export const data = [
    {
        iconColor: 'primary',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="!text-white !fill-white" viewBox="0 0 256 256">
                <rect width="256" height="256" fill="none"></rect>
                <rect x="40" y="144" width="176" height="64" rx="8" opacity="0.2"></rect>
                <rect x="40" y="48" width="176" height="64" rx="8" opacity="0.2"></rect>
                <rect x="40" y="144" width="176" height="64" rx="8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></rect>
                <rect x="40" y="48" width="176" height="64" rx="8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></rect>
                <circle cx="180" cy="80" r="12"></circle>
                <circle cx="180" cy="176" r="12"></circle>
            </svg>
        ),
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="!fill-primary" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
            <path d="M0 0h24v24H0V0z" fill="none"></path>
            <path d="M19 15v4H5v-4h14m1-2H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM7 18.5c-.82 0-1.5-.67-1.5-1.5s.68-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM19 5v4H5V5h14m1-2H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM7 8.5c-.82 0-1.5-.67-1.5-1.5S6.18 5.5 7 5.5s1.5.68 1.5 1.5S7.83 8.5 7 8.5z"></path>
        </svg>),
        title: "1,116",
        subtitle: "Active Domains",
        change: "+0.21%",
        trend: "up",
        iconBg: "primary",
        textColor: "text-success",
    },
    {
        iconColor: 'secondary',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="!text-white !fill-white" viewBox="0 0 256 256">
                <rect width="256" height="256" fill="none"></rect>
                <circle cx="108" cy="100" r="60" opacity="0.2"></circle>
                <line x1="200" y1="136" x2="248" y2="136" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
                <line x1="224" y1="112" x2="224" y2="160" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
                <circle cx="108" cy="100" r="60" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle>
                <path d="M24,200c20.55-24.45,49.56-40,84-40s63.45,15.55,84,40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
            </svg>),
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="!fill-info" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
            <g>
                <rect fill="none" height="24" width="24"></rect>
            </g>
            <g>
                <path d="M20,9V6h-2v3h-3v2h3v3h2v-3h3V9H20z M9,12c2.21,0,4-1.79,4-4c0-2.21-1.79-4-4-4S5,5.79,5,8C5,10.21,6.79,12,9,12z M9,6 c1.1,0,2,0.9,2,2c0,1.1-0.9,2-2,2S7,9.1,7,8C7,6.9,7.9,6,9,6z M15.39,14.56C13.71,13.7,11.53,13,9,13c-2.53,0-4.71,0.7-6.39,1.56 C1.61,15.07,1,16.1,1,17.22V20h16v-2.78C17,16.1,16.39,15.07,15.39,14.56z M15,18H3v-0.78c0-0.38,0.2-0.72,0.52-0.88 C4.71,15.73,6.63,15,9,15c2.37,0,4.29,0.73,5.48,1.34C14.8,16.5,15,16.84,15,17.22V18z"></path>
            </g>
        </svg>),
        title: "1,468",
        subtitle: "Total Users",
        change: "-0.153%",
        trend: "down",
        iconBg: "secondary",
        textColor: "text-danger",
    },
    {
        iconColor: 'success',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="!text-white !fill-white" viewBox="0 0 256 256">
                <rect width="256" height="256" fill="none"></rect>
                <circle cx="128" cy="128" r="96" opacity="0.2"></circle>
                <circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="16"></circle>
                <line x1="128" y1="136" x2="128" y2="80" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
                <circle cx="128" cy="172" r="12"></circle>
            </svg>
        ),
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="!fill-danger" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
            <path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
        </svg>),
        title: "2,468",
        subtitle: "Auction Expired",
        change: "-0.153%",
        trend: "down",
        iconBg: "success",
        textColor: "text-danger",
    },
    {
        iconColor: 'orange',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="!text-white !fill-white" viewBox="0 0 256 256">
                <rect width="256" height="256" fill="none"></rect>
                <circle cx="128" cy="136" r="88" opacity="0.2"></circle>
                <circle cx="128" cy="136" r="88" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle>
                <line x1="128" y1="136" x2="168" y2="96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
                <line x1="104" y1="16" x2="152" y2="16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
            </svg>
        ),
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="!fill-warning" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
            <g>
                <rect fill="none" height="24" width="24" x="0"></rect>
            </g>
            <g>
                <g>
                    <path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8 S16.41,20,12,20z M12.5,7H11v6l5.2,3.2l0.8-1.3l-4.5-2.7V7z"></path>
                </g>
            </g>
        </svg>),
        title: "250",
        subtitle: "Pending",
        change: "-0.67%",
        trend: "down",
        iconBg: "orangemain",
        textColor: "text-danger",
    },
];


export const imageData7 = [
    {
      name:'spotechsols.net',
      date:'10 Bids , 27 Days Left',
      bg:"primary",
      svg:"white",
      price:"$12.00"
    },
    {
      src:"../../../assets/images/marketplace/new-arrivals/1.png",
      name:'dwaynestel.net',
      date:'12 Bids , 27 Days Left',
      bg:"secondary",
      price:"$23.00"
      
    },
    {
      name:'sanctuseadi.edu',
      date:'21 Bids , 32 Days Left',
      bg:"warning",
      svg:"white",
      price:"$56.00"
    },
    {
      src:"../../../assets/images/marketplace/new-arrivals/3.png",
      name:'incididunt.org',
      date:'17 Bids , 12 Days Left',
      bg:"secondary",
      price:"$16.00"
      
    },
    {
      name:'incididunt.org',
      date:'17 Bids , 12 Days Left',
      svg:"white",
      bg:"danger",
      price:"$16.00"
    },
    {
      name:'spotechsols.net',
      date:'10 Bids , 27 Days Left',
      svg:"info",
      bg:"info",
      price:"$12.00"
    },
    {
      src:"../../../assets/images/marketplace/new-arrivals/1.png",
      name:'dwaynestel.net',
      date:'12 Bids , 27 Days Left',
      bg:"secpondary",
      price:"$23.00"
      
    },
    {
      name:'sanctuseadi.edu',
      date:'21 Bids , 32 Days Left',
      svg:"success",
      bg:"success",
      price:"$56.00"
    },
    {
      name:'incididunt.org',
      date:'17 Bids , 12 Days Left',
      svg:"white",
      bg:"info",
      price:"$16.00"
    },
    {
      name:'incididunt.org',
      date:'17 Bids , 12 Days Left',
      svg:"white",
      bg:"danger",
      price:"$16.00"
    },
  ];

export const ReviewSwiper = imageData7.map((card, index) => (
<SpkSwiperlanding  key={index} card={card} />

))









