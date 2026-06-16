/* audience report */
export const Audienceserices = [
    {
        name: "Male",
        data: [29, 18, 26, 30, 23, 28, 23, 34]
    },
    {
        name: "Female",
        data: [23, 15, 21, 23, 18, 22, 18, 28]
    },
    {
        name: "Others",
        data: [18, 10, 15, 18, 12, 16, 12, 20]
    }
]
export const Audiencesoptions = {
    chart: {
        height: 263,
        type: 'area',
        dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 0,
            blur: 10,
            opacity: 0.2
        },
        sparkline: {
            enabled: true,
        },
    },
    colors: ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.3)'],
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: [0, 0, 0],
        curve: 'smooth'
    },
    title: {
        align: 'left',
        style: {
            fontSize: '13px',
            fontWeight: 'bold',
            color: '#8c9097'
        },
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.4,
            opacityTo: 0.1,
            stops: [0, 90, 100],
            colorStops: [
                [
                    {
                        offset: 0,
                        color: "rgba(255, 255, 255, 0.1)",
                        opacity: 1
                    },
                    {
                        offset: 75,
                        color: "rgba(255, 255, 255, 0.1)",
                        opacity: 1
                    },
                    {
                        offset: 100,
                        color: "rgba(255, 255, 255, 0.1)",
                        opacity: 1
                    }
                ],
                [
                    {
                        offset: 0,
                        color: "rgba(255, 255, 255, 0.2)",
                        opacity: 1
                    },
                    {
                        offset: 75,
                        color: "rgba(255, 255, 255, 0.2)",
                        opacity: 1
                    },
                    {
                        offset: 100,
                        color: "rgba(255, 255, 255, 0.2)",
                        opacity: 1
                    }
                ],
                [
                    {
                        offset: 0,
                        color: "rgba(255, 255, 255, 0.3)",
                        opacity: 1
                    },
                    {
                        offset: 75,
                        color: "rgba(255, 255, 255, 0.3)",
                        opacity: 1
                    },
                    {
                        offset: 100,
                        color: "rgba(255, 255, 255, 0.3)",
                        opacity: 1
                    }
                ],
            ]
        }
    },
    grid: {
        borderColor: 'transparent',
        padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
    },
    xaxis: {
        title: {
            fontSize: '13px',
            fontWeight: 'bold',
            style: {
                color: "#8c9097"
            }
        },
        labels: {
            show: true,
            style: {
                colors: "#8c9097",
                fontSize: '11px',
                fontWeight: 600,
                cssClass: 'apexcharts-xaxis-label',
            },
            offsetX: -3,
            offsetY: -20,
        },
    },
    yaxis: {
        title: {
            fontSize: '13px',
            fontWeight: 'bold',
            style: {
                color: "#8c9097"
            }
        },
        labels: {
            show: false,
            style: {
                colors: "#8c9097",
                fontSize: '11px',
                fontWeight: 600,
                cssClass: 'apexcharts-yaxis-label',
            },
            offsetX: 15,
            offsetY: 0,
        },
    },
    legend: {
        position: 'top',
        horizontalAlign: 'right',
        offsetY: 100
    },
    tooltip: {
        theme: "dark",
    },
}

/* orders status */
export const OrdersStatusSeries = [{
    name: "Paid",
    type: "column",
    data: [33, 21, 32, 37, 23, 32, 47, 31, 54, 32, 20, 38]
}, {
    name: "Unpaid",
    type: "area",
    data: [44, 55, 41, 42, 22, 43, 21, 35, 56, 27, 43, 27]
}, {
    name: "Refunded",
    type: "line",
    data: [30, 25, 36, 30, 45, 35, 64, 51, 59, 36, 39, 51]
}]
export const OrdersStatusOptions = {
    chart: {
        height: 300,
        type: "line",
        stacked: !1,
        toolbar: {
            show: !1
        }
    },
    stroke: {
        width: [0, 0, 1.5],
        dashArray: [0, 0, 4],
        show: true,
        curve: 'smooth',
        lineCap: 'butt',
    },
    grid: {
        borderColor: '#f1f1f1',
        strokeDashArray: 3
    },
    xaxis: {
        axisBorder: {
            color: 'rgba(119, 119, 142, 0.05)',
            offsetX: 0,
            offsetY: 0,
        },
        axisTicks: {
            color: 'rgba(119, 119, 142, 0.05)',
            width: 6,
            offsetX: 0,
            offsetY: 0
        },
    },
    plotOptions: {
        bar: {
            columnWidth: "20%",
            borderRadius: 3
        }
    },
    legend: {
        position: "top",
        markers: {
            strokeWidth: 0
        }
    },
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    markers: {
        size: 0
    },
    colors: ['rgba(var(--primary-rgb))', "rgba(84, 109, 254,0.05)", 'rgb(215, 124, 247)'],
    tooltip: {
        theme: "dark",
    },
}

/* recent orders */
export const RecentordersSeries = [1754, 1234, 878]
export const RecentordersOptions = {
    labels: ["Delivered", "Cancelled", "Pending"],
    chart: {
        height: 135,
        type: 'donut',
    },
    dataLabels: {
        enabled: false,
    },
    legend: {
        show: false,
    },
    stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'round',
        colors: "#fff",
        width: 0,
        dashArray: 0,
    },
    plotOptions: {
        pie: {
            expandOnClick: false,
            donut: {
                size: '80%',
                background: 'transparent',
                labels: {
                    show: true,
                    name: {
                        show: true,
                        fontSize: '20px',
                        color: '#495057',
                        offsetY: 0
                    },
                    value: {
                        show: true,
                        fontSize: '10px',
                        color: undefined,
                        offsetY: 4,
                        fontWeight: 500,
                        formatter: function (val: any) {
                            return val + "%"
                        }
                    },
                    total: {
                        show: true,
                        showAlways: true,
                        label: 'Total',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#495057',
                    }

                }
            }
        }
    },
    colors: ["rgba(var(--primary-rgb),0.8)", "rgba(215, 124, 247, 0.8)", "rgba(12, 163, 231, 0.8)"],
}

/* top selling categories */
export const SellingCategoriesSeries = [{
    name: 'Sales',
    data: [650, 770, 840, 890, 1100, 1380]
}]
export const SellingCategoriesOptions = {
    chart: {
        height: 305,
        type: 'bar',
        events: {
            click: function (chart: any, w: any, e: any) {
            }
        },
        toolbar: {
            show: false,
        }
    },
    colors: ['rgba(var(--primary-rgb))', 'rgba(215, 124, 247, 1)', 'rgba(12, 215, 177, 1)', 'rgba(254, 124, 88, 1)', 'rgba(12, 163, 231, 1)', 'rgba(243, 157, 45, 1)'],
    plotOptions: {
        bar: {
            barHeight: '20%',
            distributed: true,
            horizontal: true,
            borderRadius: 1,
        }
    },
    dataLabels: {
        enabled: false
    },
    legend: {
        show: false
    },
    grid: {
        borderColor: '#f1f1f1',
        strokeDashArray: 3
    },
    xaxis: {
        categories: [
            ['Electronics'],
            ['Fashion'],
            ['Kitchen Appliances'],
            ['Beauty Products'],
            ['Books'],
            ['Toys and Games'],
        ],
        labels: {
            show: false,
            style: {
                fontSize: '12px'
            },
        }
    },
    yaxis: {
        offsetX: 30,
        offsetY: 30,
        labels: {
            show: true,
            style: {
                colors: "#8c9097",
                fontSize: '11px',
                fontWeight: 500,
                cssClass: 'apexcharts-yaxis-label',
            },
            offsetY: 8,
        }
    },
    tooltip: {
        enabled: true,
        shared: false,
        intersect: true,
        x: {
            show: false
        },
        theme: "dark",
    },
}


// TOP SELLING PRODUCTS
export const TopSelling = [
    {
        id: 1,
        name: 'Flower Pot',
        price: '$4320.29',
        category: 'Furniture',
        categoryColor: "primary",
        src: '../../assets/images/ecommerce/jpg/1.jpg',
    },
    {
        id: 2,
        name: 'Kiwi Fruit',
        price: '$1899.99',
        category: 'Food & Dining',
        categoryColor: "success",
        src: '../../assets/images/ecommerce/jpg/4.jpg',
    },
    {
        id: 3,
        name: 'Camera',
        price: '$1176.89',
        category: 'Electronics',
        categoryColor: "secondary",
        src: '../../assets/images/ecommerce/jpg/3.jpg',
    },
    {
        id: 4,
        name: 'Donut',
        price: '$1867.29',
        category: 'Food & Dining',
        categoryColor: "warning",
        src: '../../assets/images/ecommerce/jpg/5.jpg',
    },
    {
        id: 5,
        name: 'Head Phones',
        price: '$6745.99',
        category: 'Electronics',
        categoryColor: "danger",
        src: '../../assets/images/ecommerce/jpg/2.jpg',
    },
];

// RECENT INVOICES
export const RecentInvoice = [
    {
        id: 1,
        orderId: '#1537890',
        customerName: 'Simon Cowall',
        customerEmail: 'simoncowall2143@gmail.com',
        customerSrc: '../../assets/images/faces/15.jpg',
        quantity: 1,
        price: '$4320.29',
        status: 'Shipped',
        statusColor: "success",
        date: '25,Nov 2022',
    },
    {
        id: 2,
        orderId: '#1539078',
        customerName: 'Meisha Kerr',
        customerEmail: 'meishakerr789@gmail.com',
        customerSrc: '../../assets/images/faces/4.jpg',
        quantity: 1,
        price: '$6745.99',
        status: 'Cancelled',
        statusColor: "danger",
        date: '29,Nov 2022',
    },
    {
        id: 3,
        orderId: '#1539832',
        customerName: 'Jessica',
        customerEmail: 'jessicastellar@gmail.com',
        customerSrc: '../../assets/images/faces/5.jpg',
        quantity: 2,
        price: '$1176.89',
        status: 'Under Process',
        statusColor: "info",
        date: '04,Dec 2022',
    },
    {
        id: 4,
        orderId: '#1539832',
        customerName: 'Amanda B',
        customerEmail: 'amandabella786@gmail.com',
        customerSrc: '../../assets/images/faces/6.jpg',
        quantity: 1,
        price: '$1899.99',
        status: 'Shipped',
        statusColor: "success",
        date: '10,Dec 2022',
    },
    {
        id: 5,
        orderId: '#1538267',
        customerName: 'Jason Stathman',
        customerEmail: 'jasonstathman549@gmail.com',
        customerSrc: '../../assets/images/faces/11.jpg',
        quantity: 1,
        price: '$1867.29',
        status: 'Pending',
        statusColor: "warning",
        date: '18,Dec 2022',
    },
    {
        id: 6,
        orderId: '#1537890',
        customerName: 'Khabib Hussain',
        customerEmail: 'khabibhussain645@gmail.com',
        customerSrc: '../../assets/images/faces/13.jpg',
        quantity: 1,
        price: '$2439.99',
        status: 'Success',
        statusColor: "success",
        date: '24,Dec 2022',
    },
];

export const cardData = [
    {
        title: 'Total Sales',
        value: '14,356',
        percentage: '0.45%',
        trend: 'up',
        trendColor: 'text-success',
        color: 'primary',
        maincolor: 'primary',
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="!fill-white !text-white" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><rect x="32" y="72" width="192" height="136" rx="8" opacity="0.2" /><rect x="32" y="72" width="192" height="136" rx="8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><path d="M88,96V64a40,40,0,0,1,80,0V96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>)
    },
    {
        title: 'Total Expenses',
        value: '$281K',
        percentage: '1.27%',
        trend: 'up',
        trendColor: 'text-success',
        color: 'secondary',
        maincolor: 'secondary',
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="!fill-white !text-white" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><path d="M32,208V56a8,8,0,0,1,8-8H216a8,8,0,0,1,8,8V208l-32-16-32,16-32-16L96,208,64,192Z" opacity="0.2" /><line x1="80" y1="104" x2="176" y2="104" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><line x1="80" y1="136" x2="176" y2="136" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><path d="M32,208V56a8,8,0,0,1,8-8H216a8,8,0,0,1,8,8V208l-32-16-32,16-32-16L96,208,64,192Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>)
    },
    {
        title: 'Total Orders',
        value: '2,352',
        percentage: '0.69%',
        trend: 'down',
        trendColor: 'text-danger',
        color: 'success',
        maincolor: 'success',
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="!fill-white !text-white" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><path d="M62.55,144H188.1a16,16,0,0,0,15.74-13.14L216,64H48Z" opacity="0.2" /><path d="M180,184H83.17a16,16,0,0,1-15.74-13.14L41.92,30.57A8,8,0,0,0,34.05,24H16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><circle cx="84" cy="204" r="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><circle cx="180" cy="204" r="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><path d="M62.55,144H188.1a16,16,0,0,0,15.74-13.14L216,64H48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>)
    },
    {
        title: 'Daily Revenue',
        value: '$2,565',
        percentage: '0.82%',
        trend: 'up',
        trendColor: 'text-success',
        color: 'orangemain',
        maincolor: 'orange',
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="!fill-white !text-white" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><path d="M128,128h24a40,40,0,0,1,0,80H128Z" opacity="0.2" /><path d="M128,48H112a40,40,0,0,0,0,80h16Z" opacity="0.2" /><line x1="128" y1="24" x2="128" y2="232" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><path d="M184,88a40,40,0,0,0-40-40H112a40,40,0,0,0,0,80h40a40,40,0,0,1,0,80H104a40,40,0,0,1-40-40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>)
    }
];

export const transactions = [
    {
        method: "Paypal ****2783",
        icon: "ri-paypal-line",
        date: "24,Jul 2024 at 2:45PM",
        amount: "$12,300",
        status: "Paid",
        statusClass: "text-success",
        bgClass: "bg-primary/[0.15]",
        iconColor: "text-primary"
    },
    {
        method: "Digital Wallet",
        icon: "ri-wallet-3-line",
        date: "13,May 2024 at 11:21AM",
        amount: "$11,449",
        status: "Paid",
        statusClass: "text-success",
        bgClass: "bg-secondary/[0.15]",
        iconColor: "text-secondary"
    },
    {
        method: "Mastro Card ****7893",
        icon: "ri-mastercard-line",
        date: "16,Feb 2024 at 4:36PM",
        amount: "$10,999",
        status: "Pending",
        statusClass: "text-danger",
        bgClass: "bg-success/[0.15]",
        iconColor: "text-success"
    },
    {
        method: "Visa Card ****2563",
        icon: "ri-visa-line",
        date: "21,Mar 2024 at 10:15AM",
        amount: "$9,249",
        status: "Paid",
        statusClass: "text-success",
        bgClass: "bg-info/[0.15]",
        iconColor: "text-info"
    },
    {
        method: "AliPay",
        icon: "ri-alipay-line",
        date: "24,Apr 2024 at 9:16AM",
        amount: "$7,799",
        status: "Paid",
        statusClass: "text-success",
        bgClass: "bg-warning/[0.15]",
        iconColor: "text-warning"
    }
];