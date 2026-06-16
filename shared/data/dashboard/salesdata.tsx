//SALES STATISTICS

import Spktables from "@/shared/@spk-reusable-components/tables/spk-tables";
import SpkDropdown from "@/shared/@spk-reusable-components/uielements/spk-dropdown";
import Image from "next/image";
import Link from "next/link";

export const StatisticsSeries = [
    {
        name: "Sales",
        type: "area",
        data: [[0, 3.128957947555989],
        [1, 4.84817222898398],
        [2, 5.082875592706364],
        [3, 7.379792694345753],
        [4, 8.547667054986002],
        [5, 4.773069367954017],
        [6, 3.0454348426761015],
        [7, 3.185480541480409],
        [8, 4.450143911018419],
        [9, 8.546949979037999],
        [10, 6.050127209461188],
        [11, 4.410453949908726],
        [12, 2.8471832046168135],
        [13, 3.2079540734030276],
        [14, 0.9162857987827975],
        [15, 4.6063565674411855],
        [16, 3.8108543994622526],
        [17, 0.07206516983173028],
        [18, 2.0235838597966103],
        [19, 3.11038525002839],
        [20, 7.661023220500137],
        [21, 4.392807043336401],
        [22, 2.095095656433122],
        [23, 3.6570708335265856],
        [24, 2.4750755395505095],
        [25, 7.365775338287607],
        [26, 3.160729824900333],
        [27, 5.540806251220914],
        [28, 0.6666892513129863],
        [29, 0.45739329594884204],
        [30, 3.0811785305861257],
        [31, 2.6892574426453804],
        [32, 9.518442007203902],
        [33, 9.031943999285872],
        [34, 11.195611227357478],
        [35, 14.843438986023465],
        [36, 12.379026518714024],
        [37, 13.460750940722328],
        [38, 12.40015951232427],
        [39, 10.358446800608565]]
    },
    {
        name: "Refunds",
        type: "area",
        data: [[0, 3.324329988896064],
        [1, 4.5545479994319145],
        [2, 6.100415206277958],
        [3, 7.432637151690175],
        [4, 5.60263986254995],
        [5, 4.832425480686457],
        [6, 0.9075445440427758],
        [7, 3.1482139596880163],
        [8, 3.5885516133784767],
        [9, 8.182754904215557],
        [10, 6.837879179399149],
        [11, 7.716258659531048],
        [12, 9.75364233299447],
        [13, 7.201169154192655],
        [14, 9.630620744220206],
        [15, 11.538477281715668],
        [16, 13.035970513058636],
        [17, 9.503486957660966],
        [18, 2.105314699985755],
        [19, 2.573652620996299],
        [20, 4.36838092867314],
        [21, 5.350295101555055],
        [22, 4.69794643352061],
        [23, 3.35219679846173],
        [24, 6.91736598898101],
        [25, 4.911176901130386],
        [26, 3.090864789052763],
        [27, 3.48061479748539],
        [28, 6.426374503640886],
        [29, 7.891864381778447],
        [30, 6.837879179399149],
        [31, 7.716258659531048],
        [32, 9.75364233299447],
        [33, 7.201169154192655],
        [34, 9.630620744220206],
        [35, 11.538477281715668],
        [36, 13.035970513058636],
        [37, 9.503486957660966],
        [38, 10.105314699985755],
        [39, 11.573652620996299],],
    }
]
export const StatisticsOptions = {
    chart: {
        height: 220,
        toolbar: {
            show: false
        },
        zoom: {
            enabled: false,
        },
        sparkline: {
            enabled: true
        }
    },
    colors: [
        "rgba(12, 215, 177, 0.8)", "rgba(var(--primary-rgb), 0.7)"
    ],
    fill: {
        type: 'solid'
    },
    dataLabels: {
        enabled: false,
    },
    legend: {
        show: false,
        position: "top",
        offsetX: 0,
        offsetY: 8,
        markers: {
            width: 10,
            height: 4,
            strokeWidth: 0,
            strokeColor: '#fff',
            fillColors: undefined,
            radius: 5,
            customHTML: undefined,
            onClick: undefined,
            offsetX: 0,
            offsetY: 0
        },
    },
    stroke: {
        curve: 'smooth',
        width: [1, 1],
        lineCap: 'round',
    },
    grid: {
        borderColor: "#edeef1",
        strokeDashArray: 2,
    },
    yaxis: {
        axisBorder: {
            show: false,
            color: "rgba(119, 119, 142, 0.05)",
            offsetX: 0,
            offsetY: 0,
        },
        axisTicks: {
            show: false,
            borderType: "solid",
            color: "rgba(119, 119, 142, 0.05)",
            width: 6,
            offsetX: 0,
            offsetY: 0,
        },
        labels: {
            show: false,
            formatter: function (y: any) {
                return y.toFixed(0) + "";
            },
        },
    },
    xaxis: {
        type: "number",
        axisBorder: {
            show: false,
            color: "rgba(119, 119, 142, 0.05)",
            offsetX: 0,
            offsetY: 0,
        },
        axisTicks: {
            show: false,
            borderType: "solid",
            color: "rgba(119, 119, 142, 0.05)",
            width: 6,
            offsetX: 0,
            offsetY: 0,
        },
        labels: {
            show: false,
            rotate: -90,
        },
    },
    tooltip: {
        enabled: false,
    }
}
export const StatisticsSeries1 = [{
    name: 'Sales',
    data: [32, 15, 63, 51, 36, 62, 99, 42, 78, 76, 32, 120],
}, {
    name: 'Revenue',
    data: [56, 58, 38, 50, 64, 45, 55, 32, 15, 63, 51, 86]
}, {
    name: 'Profit',
    data: [48, 29, 50, 69, 20, 59, 52, 12, 48, 28, 17, 98]
}]

export const StatisticsOptions1 = {
    chart: {
        height: 280,
        type: 'line',
        toolbar: {
            show: false,
        },
        background: 'none',
        fill: "#fff",
        dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 7,
            left: 0,
            blur: 1,
            color: ["rgba(var(--primary-rgb))", "rgb(12, 215, 177)", "rgb(243, 143, 243)"],
            opacity: 0.05,
        },
    },
    grid: {
        borderColor: '#f1f1f1',
        strokeDashArray: 3
    },
    colors: ["rgba(var(--primary-rgb))", "rgb(12, 215, 177)", "rgb(243, 143, 243)"],
    background: 'transparent',
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth',
        width: 2,
    },

    legend: {
        show: true,
        position: 'top',
        offsetY: 30,
        markers: {
            strokeWidth: 0
        }
    },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        show: false,
        axisBorder: {
            show: false,
            color: 'rgba(119, 119, 142, 0.05)',
            offsetX: 0,
            offsetY: 0,
        },
        axisTicks: {
            show: false,
            borderType: 'solid',
            color: 'rgba(119, 119, 142, 0.05)',
            width: 6,
            offsetX: 0,
            offsetY: 0
        },
        labels: {
            show: false,
            rotate: -90,
            offsetX: 0,
            offsetY: 0,
        },
        tooltip: {
            enabled: false,
        },
    },
    yaxis: {
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        }
    },
    tooltip: {
        y: [{
            formatter: function (e: any) {
                return void 0 !== e ? e.toFixed(0) : e
            }
        }, {
            formatter: function (e: any) {
                return void 0 !== e ? "$" + e.toFixed(0) + "K" : e
            }
        }, {
            formatter: function (e: any) {
                return void 0 !== e ? "$" + e.toFixed(0) + "K" : e
            }
        }],
        theme: "dark",
    }
};

// TOP SELLING CATEGORIES

export const CategoriesSeries = [{
    name: 'Electronics',
    data: [80, 50, 30, 40, 100, 20, 40],
}, {
    name: 'Fashion',
    data: [20, 30, 40, 90, 20, 90, 35],
}, {
    name: 'Furniture',
    data: [40, 76, 78, 13, 43, 10, 80],
}]

export const CategoriesOptions = {
    chart: {
        height: 280,
        type: 'radar',
        toolbar: {
            show: false,
        }
    },
    title: {
        align: 'left',
        style: {
            fontSize: '13px',
            fontWeight: 'bold',
            color: '#8c9097'
        },
    },
    colors: ["rgba(var(--primary-rgb), 0.8)", "rgba(215, 124, 247, 0.85)", "rgba(12, 215, 177, 0.85)"],
    stroke: {
        width: 1
    },
    fill: {
        opacity: 0.05
    },
    markers: {
        size: 0
    },
    legend: {
        show: true,
        fontSize: "12px",
        position: 'top',
        horizontalAlign: 'center',
        fontFamily: "Montserrat",
        fontWeight: 500,
        offsetX: 0,
        offsetY: -8,
        height: 50,
        labels: {
            colors: '#9ba5b7',
        },
        markers: {
            size: 3,
            strokeWidth: 0,
            strokeColor: '#fff',
            fillColors: undefined,
            radius: 7,
            offsetX: 0,
            offsetY: 0
        },
    },
    xaxis: {
        categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    },
    yaxis: {
        min: 0,
        max: 100,
        tickAmount: 5,
        labels: {
            formatter: function (val: any, i: any) {
                if (i % 5 === 0) {
                    return val;
                }
            }
        }
    }
}

// RECENT TRANSACTIONS
export const RecentTransactions = [
    { orderId: "SPK-9ABC", icon: "ri-paypal-line", iconBg: "primary", paymentMode: "Paypal ****2783", transaction: "Online Transaction", amountPaid: "$1,234.78", date: "Nov 22,2024", status: "Completed", statusColor: "primary" },
    { orderId: "SPK-3Sfont", icon: "ri-wallet-3-line", iconBg: "secondary", paymentMode: "Digital Wallet", transaction: "Online Transaction", amountPaid: "$623.99", date: "Nov 22,2024", status: "Pending", statusColor: "secondary" },
    { orderId: "SPK-6SKF", icon: "ri-mastercard-line", iconBg: "success", paymentMode: "Mastro Card ****7893", transaction: "Card Payment", amountPaid: "$1,324", date: "Nov 21,2024", status: "Cancelled", statusColor: "success" },
    { orderId: "SPK-3ESD", icon: "ti ti-currency-dollar ", iconBg: "orangemain", paymentMode: "Cash On Delivery", transaction: "Pay On Delivery", amountPaid: "$1,123.49", date: "Nov 22,2024", status: "Completed", statusColor: "orange" },
    { orderId: "SPK-3KSE", icon: "ri-visa-line", iconBg: "info", paymentMode: "Visa Card ****2563", transaction: "Card Payment", amountPaid: "$1,289", date: "Nov 18,2024", status: "Cancelled", statusColor: "info" },
]

// RECENT ORDERS
export const RecentOrders = [
    { id: 1, checked: false, productName: "Flower Pot", productSrc: "../../assets/images/ecommerce/jpg/1.jpg", productDrand: "Accusam Brand", category: "Furniture", status: "Pending", statusColor: "primary", customer: "Mayor Kelly", customerEmail: "mayorkelly213@gmail.com", qty: "6", date: "03 Sep 2024", totalSales: "10", price: "$15,000" },
    { id: 2, checked: true, productName: "Head Phones", productSrc: "../../assets/images/ecommerce/jpg/2.jpg", productDrand: "Vellintn Brand", category: "Electronics", status: "Processing", statusColor: "success", customer: "Andrew Garfield", customerEmail: "andrewgarfield1994@gmail.com", qty: "1", date: "05 Oct 2024", totalSales: "20", price: "$25,000" },
    { id: 3, checked: true, productName: "Kiwi Fruit", productSrc: "../../assets/images/ecommerce/jpg/4.jpg", productDrand: "Top Brand", category: "Food", status: "Shipped", statusColor: "secondary", customer: "Simon Cowel", customerEmail: "simoncowel26@gmail.com", qty: "2", date: "13 Nov 2024", totalSales: "27", price: "$25,000" },
    { id: 4, checked: false, productName: "Donut", productSrc: "../../assets/images/ecommerce/jpg/5.jpg", productDrand: "Erat Brand", category: "Food", status: "On Hold", statusColor: "warning", customer: "Mirinda Hers", customerEmail: "mirindahers@hotmail.com", qty: "2", date: "15 Dec 2024", totalSales: "34", price: "$10,000" },
    { id: 5, checked: true, productName: "Head Phones", productSrc: "../../assets/images/ecommerce/jpg/2.jpg", productDrand: "Boalt Audio", category: "Electronics", status: "Delivered", statusColor: "info", customer: "Alicia Keys", customerEmail: "aliciakeys@gmail.com", qty: "1", date: "28 Dec 2024", totalSales: "77", price: "$4,000" },
    { id: 6, checked: false, productName: "Camera", productSrc: "../../assets/images/ecommerce/jpg/3.jpg", productDrand: "Analog.Comp", category: "Electronics", status: "Cancelled", statusColor: "danger", customer: "	Jeremy Lewis", customerEmail: "jeremylewis2000@gmail.com", qty: "3", date: "15 Dec 2024", totalSales: "19", price: "$16,000" },
]
export const cardData = [
    {
        title: 'Sales',
        value: '32,981',
        percentage: '0.45%',
        trendIcon: 'ti-trending-up',
        trendColor: 'text-success',
        iconColor: 'primary',
        iconColor1: 'primary',
        description: 'Since last month',
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="fill-white" width="32" height="32" fill="#000000" viewBox="0 0 256 256"> <path d="M216,64H176a48,48,0,0,0-96,0H40A16,16,0,0,0,24,80V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V80A16,16,0,0,0,216,64ZM128,32a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm88,168H40V80H80V96a8,8,0,0,0,16,0V80h64V96a8,8,0,0,0,16,0V80h40Z"> </path> </svg>)
    },
    {
        title: 'Profit',
        value: '$645',
        percentage: '0.18%',
        trendIcon: 'ti-trending-up',
        trendColor: 'text-success',
        iconColor: 'secondary',
        iconColor1: 'secondary',
        description: 'than last month',
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="fill-white" width="32" height="32" fill="#000000" viewBox="0 0 256 256"> <path d="M216,72H56a8,8,0,0,1,0-16H192a8,8,0,0,0,0-16H56A24,24,0,0,0,32,64V192a24,24,0,0,0,24,24H216a16,16,0,0,0,16-16V88A16,16,0,0,0,216,72Zm0,128H56a8,8,0,0,1-8-8V86.63A23.84,23.84,0,0,0,56,88H216Zm-48-60a12,12,0,1,1,12,12A12,12,0,0,1,168,140Z"> </path> </svg>)
    },
    {
        title: 'Revenue',
        value: '$14,32,145',
        percentage: '0.29%',
        trendIcon: 'ti-trending-up',
        trendColor: 'text-success',
        iconColor: 'success',
        iconColor1: 'success',
        description: 'Since last month',
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="fill-white" width="32" height="32" fill="#000000" viewBox="0 0 256 256"> <path d="M200,168a48.05,48.05,0,0,1-48,48H136v16a8,8,0,0,1-16,0V216H104a48.05,48.05,0,0,1-48-48,8,8,0,0,1,16,0,32,32,0,0,0,32,32h48a32,32,0,0,0,0-64H112a48,48,0,0,1,0-96h8V24a8,8,0,0,1,16,0V40h8a48.05,48.05,0,0,1,48,48,8,8,0,0,1-16,0,32,32,0,0,0-32-32H112a32,32,0,0,0,0,64h40A48.05,48.05,0,0,1,200,168Z"> </path> </svg>)
    },
    {
        title: 'Views',
        value: '4,678',
        percentage: '0.05%',
        trendIcon: 'ti-trending-down',
        trendColor: 'text-danger',
        iconColor: 'orangemain',
        iconColor1: 'orange',
        description: 'Since last month',
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="fill-white" width="32" height="32" fill="#000000" viewBox="0 0 256 256"> <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"> </path> </svg>)
    }
];

export const activityData = [
    {
        activityUser: "John Doe",
        activityTime: "12:47PM",
        activityDesc: " Updated profile picture",
    },
    {
        activityUser: "Jane Smith",
        activityTime: "10:22AM",
        activityDesc: "Posted a <span class='text-warning font-medium'>new status</span> <div class='!mt-2 p-2 text-defaulttextcolor dark:text-defaulttextcolor/80 rounded-1 bg-light text-[0.8125rem]'> Enjoying the weekend vibes 🌞 </div>",
    },
    {
        activityUser: "Alice Johnson",
        activityTime: "11:45AM",
        activityDesc: "Commented on a photo - <span class='font-medium text-success'>&quot;Beautiful&quot;</span>",
    },
    {
        activityUser: "Charlie Brown",
        activityTime: "04:15PM",
        activityDesc: "Shared an article",
    },
    {
        activityUser: "Bob Anderson",
        activityTime: "10:54AM",
        activityDesc: "Liked a post from <span class='badge bg-secondary/[0.15] text-secondary'>John Doe</span>",
    },
];

export const countries = [
    {
        name: "United States",
        flag: "../../assets/images/flags/us_flag.jpg",
        sales: "32,190 Sales",
        growth: "0.27%",
        value: "$32,190",
        trend: "up"
    },
    {
        name: "Germany",
        flag: "../../assets/images/flags/germany_flag.jpg",
        sales: "8,798 Sales",
        growth: "0.12%",
        value: "$29,234",
        trend: "up"
    },
    {
        name: "Mexico",
        flag: "../../assets/images/flags/mexico_flag.jpg",
        sales: "16,885 Sales",
        growth: "0.75%",
        value: "$26,166",
        trend: "down"
    },
    {
        name: "UAE",
        flag: "../../assets/images/flags/uae_flag.jpg",
        sales: "14,885 Sales",
        growth: "1.45%",
        value: "$24,263",
        trend: "up"
    },
    {
        name: "Argentina",
        flag: "../../assets/images/flags/argentina_flag.jpg",
        sales: "17,578 Sales",
        growth: "0.36%",
        value: "$23,897",
        trend: "up"
    },
    {
        name: "Russia",
        flag: "../../assets/images/flags/russia_flag.jpg",
        sales: "10,118 Sales",
        growth: "0.68%",
        value: "$20,212",
        trend: "down"
    }
];
export const SalesDropdown = () => {
    return (
        <>
            <SpkDropdown Linktag={true} Linkclass="ti-btn ti-btn-primary ti-btn-sm !m-0 btn-wave" Toggletext="Sort By" Arrowicon={true}>
                <li><Link scroll={false} className="ti-dropdown-item" href="#!">New</Link></li>
                <li><Link scroll={false} className="ti-dropdown-item" href="#!">Popular</Link></li>
                <li><Link scroll={false} className="ti-dropdown-item" href="#!">Relevant</Link></li>
            </SpkDropdown>
        </>
    );
};
export const SalesTable = () => {
    return (
        <>
            <Spktables tableRowclass='' tableClass="ti-custom-table ti-custom-table-head w-full" showCheckbox={true} header={[{ title: 'Product' }, { title: 'Category' }, { title: 'Status' }, { title: 'Customer' }, { title: 'Qty' }, { headerClassname: "text-nowrap", title: 'Date Ordered' }, { headerClassname: "text-start text-nowrap", title: 'Total Sales' }, { title: 'Price' }, { title: 'Action' },]}>
                {RecentOrders.map((idx) => (
                    <tr key={idx.id}>
                        <td className="ps-4"><input className="form-check-input" type="checkbox" id="checkboxNoLabeljob2" aria-label="..." defaultChecked={idx.checked} /></td>
                        <td>
                            <div className="flex">
                                <span className="avatar avatar-md"><Image fill src={idx.productSrc} className="" alt="..." /></span>
                                <div className="ms-2">
                                    <p className="font-semibold text-[0.8125rem] mb-0 flex items-center"><Link scroll={false} href="#!">{idx.productName}</Link></p>
                                    <p className="text-[0.75rem] text-textmuted dark:text-textmuted/50 mb-0">{idx.productDrand}</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            {idx.category}
                        </td>
                        <td><span className={`badge bg-${idx.statusColor}/[0.15] text-${idx.statusColor}`}>{idx.status}</span></td>
                        <td>
                            <span className="block font-semibold text-[0.8125rem]">{idx.customer}</span>
                            <span className="block text-textmuted dark:text-textmuted/50 text-[0.75rem] font-normal">{idx.customerEmail}</span>
                        </td>
                        <td>
                            {idx.qty}
                        </td>
                        <td>{idx.date}</td>
                        <td className="text-center">
                            {idx.totalSales}
                        </td>
                        <td className="font-semibold">{idx.price}</td>
                        <td>
                            <div className="btn-list">
                                <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-primary btn-wave">
                                    <i className="ri-eye-line"></i>
                                </button>
                                <button className="ti-btn ti-btn-sm ti-btn-icon ti-btn-soft-secondary btn-wave">
                                    <i className="ri-edit-line"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </Spktables>
        </>
    );
};
export const SalesCountries = () => {
    return (
        <>
            <ul className="list-unstyled mb-0 top-country-sales">
                {countries.map((country, index) => (
                    <li key={index}>
                        <div className="flex items-start flex-wrap gap-2">
                            <div className="leading-none">
                                <span className="avatar custom-img avatar-sm avatar-rounded text-default p-1 bg-light border border-defaultborder dark:border-defaultborder/10">
                                    <Image fill src={country.flag} alt={country.name} />
                                </span>
                            </div>
                            <div className="grow leading-none">
                                <span className="font-medium mb-2 block">{country.name}</span>
                                <span className="block text-textmuted dark:text-textmuted/50 text-[0.6875rem]">{country.sales}</span>
                            </div>
                            <div className="flex items-center">
                                <span className={`text-[0.625rem] ${country.trend === "up" ? "text-success" : "text-danger"} font-medium`}>
                                    <i className={`ti ti-arrow-narrow-${country.trend}`} />
                                    {country.growth}
                                </span>
                                <span className="text-default text-[0.8125rem] font-semibold ms-2">{country.value}</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
};