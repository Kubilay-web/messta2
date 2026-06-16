// Top Countrywise Ads
export const OrderSummarySeries = [
    {
        name: 'Total Ads',
        type: 'column',
        data: [23, 17, 22, 27, 13, 22, 37, 21, 44, 22, 45, 35]
    },
    {
        name: 'Active',
        type: 'column',
        data: [17, 12, 18, 23, 10, 17, 25, 18, 35, 18, 37, 28]
    },
    {
        name: 'Inactive',
        type: 'line',
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 27]
    },
]
export const OrderSummaryOptions = {
    chart: {
        toolbar: {
            show: false
        },
        height: 320,
        type: 'line',
        stacked: false,
        fontFamily: 'Poppins, Arial, sans-serif',
    },
    grid: {
        borderColor: '#f5f4f4',
        strokeDashArray: 3,
        yaxis: {
            lines: {
                show: true,
            }
        }
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
            min: 0,
            tickAmount: 5,
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
            min: 0,
            tickAmount: 5,
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
            min: 0,
            tickAmount: 5,
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
        dashArray: [0, 0, 0],
    },
    plotOptions: {
        bar: {
            columnWidth: "40%",
            borderRadius: 3,
        }
    },
    colors: ["rgba(84, 109, 254)", "rgba(84, 109, 254,0.2)", "rgb(215, 124, 247)"]
}

export const TopCountrywiseAds = [
    { id: 1, name: "U.S.A", ads: "120", flag: "../../../assets/images/flags/us_flag.jpg" },
    { id: 2, name: "France", ads: "134", flag: "../../../assets/images/flags/french_flag.jpg" },
    { id: 3, name: "U.A.E", ads: "156", flag: "../../../assets/images/flags/uae_flag.jpg" },
    { id: 4, name: "Italy", ads: "167", flag: "../../../assets/images/flags/italy_flag.jpg" },
    { id: 5, name: "Mexico", ads: "267", flag: "../../../assets/images/flags/mexico_flag.jpg" },
    { id: 6, name: "Spain", ads: "235", flag: "../../../assets/images/flags/spain_flag.jpg" },
    { id: 7, name: "Germany", ads: "567", flag: "../../../assets/images/flags/germany_flag.jpg" },
    { id: 8, name: "Russia", ads: "72", flag: "../../../assets/images/flags/russia_flag.jpg" },
    { id: 9, name: "Argentina", ads: "98", flag: "../../../assets/images/flags/argentina_flag.jpg" }
];

// Recent Users
export const RecentUsers = [
    { id: 1, name: "Mayor Kelly", email: "mayorkelly@gmail.com", status: "Active", avatar: "../../../assets/images/faces/4.jpg" },
    { id: 2, name: "Andrew Garfield", email: "andrewgarfield@gmail.com", status: "Active", avatar: "../../../assets/images/faces/15.jpg" },
    { id: 3, name: "Simon Cowel", email: "simoncowel234@gmail.com", status: "Active", avatar: "../../../assets/images/faces/11.jpg" },
    { id: 4, name: "Mirinda Hers", email: "mirindahers@gmail.com", status: "Deactive", avatar: "../../../assets/images/faces/8.jpg" },
    { id: 5, name: "Andrew Garfield", email: "andrewgarfield@gmail.com", status: "Active", avatar: "../../../assets/images/faces/16.jpg" }
];

// Recent Orders
export const RecentOrdersData = [
    {
        id: 1,
        orderId: "#19876",
        companyName: "Obligation Pvt.Ltd",
        companyLogo: "../../../assets/images/company-logos/4.png",
        subscription: "Basic",
        payment: "Offline",
        cost: "$76.00",
        status: "Paid"
    },
    {
        id: 2,
        orderId: "#19376",
        companyName: "Voluptatem Pvt.Ltd",
        companyLogo: "../../../assets/images/company-logos/10.png",
        subscription: "Pro",
        payment: "Check",
        cost: "$13.00",
        status: "Paid"
    },
    {
        id: 3,
        orderId: "#19878",
        companyName: "BloomTech.Inc",
        companyLogo: "../../../assets/images/company-logos/8.png",
        subscription: "Basic",
        payment: "Credit Card",
        cost: "$54.00",
        status: "Unpaid"
    },
    {
        id: 4,
        orderId: "#19879",
        companyName: "Beatae Industries",
        companyLogo: "../../../assets/images/company-logos/1.png",
        subscription: "Basic",
        payment: "Paypal",
        cost: "$87.00",
        status: "Paid"
    }
];

// Recent Ads
export const RecentAds = [
    {
        id: 1,
        checked: false,
        title: "4 Beds Duplex House",
        lable: "4-Bds - 4 Ba - 600ff3",
        category: "RealEstate",
        status: "Active",
        statusColor: "success",
        location: "Germany",
        date: "03 Sep 2022",
        price: "$15,000",
        src: "../../../assets/images/classifieds/featured-adds/1.jpg"
    },
    {
        id: 2,
        checked: true,
        title: "Cadbo Car kb43",
        lable: "2022 Oct 04",
        category: "Vehicle",
        status: "Pending Payment",
        statusColor: "warning",
        location: "Canada",
        date: "05 Oct 2022",
        price: "$25,000",
        src: "../../../assets/images/classifieds/featured-adds/2.jpg"
    },
    {
        id: 3,
        checked: true,
        title: "Smart Phone H6",
        lable: "2024 - 120,000km",
        category: "Electronics",
        status: "Active",
        statusColor: "success",
        location: "Europe",
        date: "13 Nov 2022",
        price: "$43,000",
        src: "../../../assets/images/classifieds/featured-adds/3.jpg"
    },
    {
        id: 4,
        checked: false,
        title: "Gittbos Bike Mf120",
        lable: "2024 - 120,000km",
        category: "Vehicle",
        status: "Inactive",
        statusColor: "danger",
        location: "USA",
        date: "15 Dec 2022",
        price: "$10,000",
        src: "../../../assets/images/classifieds/featured-adds/4.jpg"
    },
    {
        id: 5,
        checked: false,
        title: "Flap Ear Pet Dog",
        lable: "2024 - Mar, 21",
        category: "Pets",
        status: "Active",
        statusColor: "success",
        location: "Australia",
        date: "23 Mar 2022",
        price: "$2,500",
        src: "../../../assets/images/classifieds/featured-adds/5.jpg"
    }
];
export const stats = [
    {
        id: 1,
        title: 'Total Ads Posted',
        count: '14,732',
        link: '#!',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="!text-white !fill-white" viewBox="0 0 256 256">
                <rect width="256" height="256" fill="none" />
                <path
                    d="M32,208V56a8,8,0,0,1,8-8H216a8,8,0,0,1,8,8V208l-32-16-32,16-32-16L96,208,64,192Z"
                    opacity="0.2"
                />
                <line x1="80" y1="104" x2="176" y2="104" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                <line x1="80" y1="136" x2="176" y2="136" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                <path
                    d="M32,208V56a8,8,0,0,1,8-8H216a8,8,0,0,1,8,8V208l-32-16-32,16-32-16L96,208,64,192Z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                />
            </svg>
        ),
        bgColor: 'primary',
        textClass: 'text-[1.5rem] mb-0 flex-grow !text-dark font-medium',
    },
    {
        id: 2,
        title: 'Total Users',
        count: '34,732',
        link: '#!',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="!text-white !fill-white" viewBox="0 0 256 256">
                <rect width="256" height="256" fill="none" />
                <circle cx="128" cy="96" r="64" opacity="0.2" />
                <circle cx="128" cy="96" r="64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                <path d="M32,216c19.37-33.47,54.55-56,96-56s76.63,22.53,96,56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
            </svg>
        ),
        bgColor: 'secondary',
        textClass: 'text-[1.5rem] mb-0 flex-grow !text-dark font-medium',
    },
];
export const cards = [
    {
        id: 1,
        title: 'New Ads',
        count: '1,116',
        percentage: '+0.21%',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="!text-white !fill-white" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="var(--primary-color)"><g><rect fill="none" height="24" width="24"></rect></g><g><g><path d="M20,3H4C2.9,3,2,3.9,2,5v14c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V5 C22,3.9,21.1,3,20,3z M20,19H4V5h16V19z" fillRule="evenodd"></path><polygon fillRule="evenodd" points="19.41,10.42 17.99,9 14.82,12.17 13.41,10.75 12,12.16 14.82,15"></polygon><rect fillRule="evenodd" height="2" width="5" x="5" y="7"></rect><rect fillRule="evenodd" height="2" width="5" x="5" y="11"></rect><rect fillRule="evenodd" height="2" width="5" x="5" y="15"></rect></g></g></svg>
        ),
        trend: 'primary',
        trendIcon: 'ri-arrow-up-s-fill',
        svgicon: (<svg className="!fill-primary" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="var(--primary-color)"><g><rect fill="none" height="24" width="24"></rect></g><g><g><path d="M20,3H4C2.9,3,2,3.9,2,5v14c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V5 C22,3.9,21.1,3,20,3z M20,19H4V5h16V19z" fillRule="evenodd"></path><polygon fillRule="evenodd" points="19.41,10.42 17.99,9 14.82,12.17 13.41,10.75 12,12.16 14.82,15"></polygon><rect fillRule="evenodd" height="2" width="5" x="5" y="7"></rect><rect fillRule="evenodd" height="2" width="5" x="5" y="11"></rect><rect fillRule="evenodd" height="2" width="5" x="5" y="15"></rect></g></g></svg>)
    },
    {
        id: 2,
        title: 'Total Users',
        count: '1,468',
        percentage: '-0.153%',
        icon: (
            <svg className="!text-white !fill-white" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 8c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-6 4c.22-.72 3.31-2 6-2 2.7 0 5.8 1.29 6 2H9zm-3-3v-3h3v-2H6V7H4v3H1v2h3v3z"></path></svg>
        ),
        trend: 'secondary',
        trendIcon: 'ri-arrow-down-s-fill',
        svgicon: (<svg className="!fill-success" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 8c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-6 4c.22-.72 3.31-2 6-2 2.7 0 5.8 1.29 6 2H9zm-3-3v-3h3v-2H6V7H4v3H1v2h3v3z"></path></svg>)
    },
    {
        id:3,
        title: 'Featured Ads',
        count: '2,468',
        percentage: '-0.153%',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="!text-white !fill-white" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="rgb(var(--warning-rgb))"><g><rect fill="none" height="24" width="24"></rect></g><g><g><path d="M23,11.99l-2.44-2.79l0.34-3.69l-3.61-0.82L15.4,1.5L12,2.96L8.6,1.5L6.71,4.69L3.1,5.5L3.44,9.2L1,11.99l2.44,2.79 l-0.34,3.7l3.61,0.82L8.6,22.5l3.4-1.47l3.4,1.46l1.89-3.19l3.61-0.82l-0.34-3.69L23,11.99z M19.05,13.47l-0.56,0.65l0.08,0.85 l0.18,1.95l-1.9,0.43l-0.84,0.19l-0.44,0.74l-0.99,1.68l-1.78-0.77L12,18.85l-0.79,0.34l-1.78,0.77l-0.99-1.67l-0.44-0.74 l-0.84-0.19l-1.9-0.43l0.18-1.96l0.08-0.85l-0.56-0.65l-1.29-1.47l1.29-1.48l0.56-0.65L5.43,9.01L5.25,7.07l1.9-0.43l0.84-0.19 l0.44-0.74l0.99-1.68l1.78,0.77L12,5.14l0.79-0.34l1.78-0.77l0.99,1.68l0.44,0.74l0.84,0.19l1.9,0.43l-0.18,1.95l-0.08,0.85 l0.56,0.65l1.29,1.47L19.05,13.47z"></path><polygon points="10.09,13.75 7.77,11.42 6.29,12.91 10.09,16.72 17.43,9.36 15.95,7.87"></polygon></g></g></svg>
        ),
        trend: 'success',
        trendIcon: 'ri-arrow-down-s-fill',
        svgicon: (<svg className="!fill-warning" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="rgb(var(--warning-rgb))"><g><rect fill="none" height="24" width="24"></rect></g><g><g><path d="M23,11.99l-2.44-2.79l0.34-3.69l-3.61-0.82L15.4,1.5L12,2.96L8.6,1.5L6.71,4.69L3.1,5.5L3.44,9.2L1,11.99l2.44,2.79 l-0.34,3.7l3.61,0.82L8.6,22.5l3.4-1.47l3.4,1.46l1.89-3.19l3.61-0.82l-0.34-3.69L23,11.99z M19.05,13.47l-0.56,0.65l0.08,0.85 l0.18,1.95l-1.9,0.43l-0.84,0.19l-0.44,0.74l-0.99,1.68l-1.78-0.77L12,18.85l-0.79,0.34l-1.78,0.77l-0.99-1.67l-0.44-0.74 l-0.84-0.19l-1.9-0.43l0.18-1.96l0.08-0.85l-0.56-0.65l-1.29-1.47l1.29-1.48l0.56-0.65L5.43,9.01L5.25,7.07l1.9-0.43l0.84-0.19 l0.44-0.74l0.99-1.68l1.78,0.77L12,5.14l0.79-0.34l1.78-0.77l0.99,1.68l0.44,0.74l0.84,0.19l1.9,0.43l-0.18,1.95l-0.08,0.85 l0.56,0.65l1.29,1.47L19.05,13.47z"></path><polygon points="10.09,13.75 7.77,11.42 6.29,12.91 10.09,16.72 17.43,9.36 15.95,7.87"></polygon></g></g></svg>)
    },
];