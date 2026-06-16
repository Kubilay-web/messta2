/* Total Customers Chart */

export const CustomersSeries = [{
    data: [0, 32, 18, 58]
    
}]
export const CustomersOptions: any = ({ color }: any) => ({
    //chart: {
    //    height: 40,
    //    width: 100,
    //    type: 'area',
    //    fontFamily: 'Poppins, Arial, sans-serif',
    //    foreColor: '#5d6162',
    //    zoom: {
    //        enabled: false
    //    },
    //    sparkline: {
    //        enabled: true
    //    }
    //},
    //tooltip: {
    //    enabled: true,
    //    theme: "dark",
    //    x: {
    //        show: false
    //    },
    //    y: {
    //        title: {
    //            formatter: function (_seriesName:any) {
    //                return ''
    //            }
    //        }
    //    },
    //    marker: {
    //        show: false
    //    }
    //},
    //dataLabels: {
    //    enabled: false
    //},
    //stroke: {
    //    curve: 'straight',
    //    width: [1.5],
    //},
    //title: {
    //    text: undefined,
    //},
    //grid: {
    //    borderColor: 'transparent',
    //},
    //xaxis: {
    //    crosshairs: {
    //        show: false,
    //    }
    //},
    //colors: [color],
    //// colors: ["rgb(215, 124, 247)"],
    
    //fill: {
    //    type: 'gradient',
    //    gradient: {
    //        opacityFrom: 0.5,
    //        opacityTo: 0.2,
    //        stops: [0, 60]
    //    }
    //},
    chart: {
        height: 40,
        width: 100,
        type: 'area',
        fontFamily: 'Poppins, Arial, sans-serif',
        foreColor: '#5d6162',
        zoom: {
            enabled: false
        },
        sparkline: {
            enabled: true
        },
        events: {
            mounted: (chart:any) => {
                chart.windowResizeHandler();
            }
        },
    },
    tooltip: {
        enabled: true,
        theme: "dark",
        x: {
            show: false
        },
        y: {
            title: {
                formatter: function (_seriesName:any) {
                    return ''
                }
            }
        },
        marker: {
            show: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        // curve: 'straight',
        width: [1.5],
    },
    title: {
        text: undefined,
    },
    grid: {
        borderColor: 'transparent',
    },
    xaxis: {
        crosshairs: {
            show: false,
        }
    },
    //colors: ["rgb(215, 124, 247)"],
    colors: [color],
    fill: {
        type: 'gradient',
        gradient: {
            opacityFrom: 0.5,
            opacityTo: 0.2,
            stops: [0, 60]
        }
    },
})

/* Earnings Report */
export const EarningsReportSeries = [{
    name: 'Profit',
    data: [14, 12, 17, 16, 18, 15, 18, 23, 28, 44, 40, 34, 34, 22, 37, 46, 21, 35, 40, 34, 46, 55, 62, 55, 23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 45, 35],
},
]
export const EarningsReportOptions = {
    chart: {
        type: 'bar',
        height: 100,
        stacked: true,
        sparkline: {
            enabled: true,
        }
    },
    grid: {
        borderColor: '#f2f6f7',
    },
    colors: ["rgba(255,255,255,0.6)"],
    plotOptions: {
        bar: {
            columnWidth: '40%'
        }
    },
    dataLabels: {
        enabled: false,
    },
    legend: {
        show: false,
        position: 'top',
    },
    yaxis: {
        title: {
            style: {
                color: '#adb5be',
                fontSize: '14px',
                fontFamily: 'poppins, sans-serif',
                fontWeight: 600,
                cssClass: 'apexcharts-yaxis-label',
            },
        },
        labels: {
            formatter: function (y:any) {
                return y.toFixed(0) + "";
            }
        }
    },
    xaxis: {
        type: 'month',
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'sep', 'oct', 'nov', 'dec'],
        axisBorder: {
            show: true,
            color: 'rgba(119, 119, 142, 0.05)',
            offsetX: 0,
            offsetY: 0,
        },
        axisTicks: {
            show: true,
            borderType: 'solid',
            color: 'rgba(119, 119, 142, 0.05)',
            width: 6,
            offsetX: 0,
            offsetY: 0
        },
        labels: {
            rotate: -90
        }
    },
    tooltip: {
        enabled: false,
    }
}

export const EarningsReportSeries1 = [{
    name: 'Profit',
    data: [9, 13, 21, 30, 34, 43, 48, 60, 67, 80, 95, 105]
}
]
export const EarningsReportOptions1 = {
    chart: {
        type: 'area',
        height: 140,
        stacked: true,
        sparkline: {
            enabled: true
        },
        dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 7,
            left: 1,
            blur: 3,
            color: '#000',
            opacity: 0.2
        },
    },
    grid: {
        borderColor: '#f2f6f7',
    },
    colors: ["rgba(215, 124, 247,1)"],
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: 'smooth',
        width: 2,
    },
    legend: {
        show: false,
        position: 'top',
        fontFamily: "Montserrat",
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
                        color: "rgba(215, 124, 247,0.15)",
                        opacity: 1
                    },
                    {
                        offset: 75,
                        color: "rgba(215, 124, 247,0.15)",
                        opacity: 1
                    },
                    {
                        offset: 100,
                        color: "rgba(215, 124, 247,0.15)",
                        opacity: 1
                    }
                ]
            ]
        }
    },
    yaxis: {
        title: {
            style: {
                color: '#adb5be',
                fontSize: '14px',
                fontFamily: 'poppins, sans-serif',
                fontWeight: 600,
                cssClass: 'apexcharts-yaxis-label',
            },
        },
        labels: {
            formatter: function (y:any) {
                return y.toFixed(0) + "";
            }
        }
    },
    xaxis: {
        type: 'month',
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'sep', 'oct', 'nov', 'dec'],
        axisBorder: {
            show: true,
            color: 'rgba(119, 119, 142, 0.05)',
            offsetX: 0,
            offsetY: 0,
        },
        axisTicks: {
            show: true,
            borderType: 'solid',
            color: 'rgba(119, 119, 142, 0.05)',
            width: 6,
            offsetX: 0,
            offsetY: 0
        },
        labels: {
            rotate: -90
        }
    },
    tooltip: {
        enabled: false,
    }
}

/* Revenue Analytics */
export const RevenueAnalyticsSeries = [
    {
        name: "Revenue",
        type: "column",
        data: [18, 23, 28, 36, 44, 52, 61, 71, 76, 88, 91, 100],
    },
    {
        name: "Profit",
        type: "area",
        data: [34, 38, 46, 55, 59, 68, 73, 85, 92, 105, 125, 135],
    }
]
export const RevenueAnalyticsOption = {
    chart: {
        toolbar: {
            show: false,
        },
        height: 310,
        stacked: false,
        dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 7,
            left: 1,
            blur: 3,
            color: ["transparent", "#000"],
            opacity: 0.2
        },
    },
    stroke: {
        width: [1.5, 1.5],
        curve: "smooth",
    },
    plotOptions: {
        bar: {
            columnWidth: "20%",
            borderRadius: 3,
        },
    },
    colors: [
        "rgba(var(--primary-rgb))",
        "rgb(215, 124, 247)"
    ],
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
                        color: "rgba(var(--primary-rgb))",
                        opacity: 1
                    },
                    {
                        offset: 75,
                        color: "rgba(var(--primary-rgb))",
                        opacity: 1
                    },
                    {
                        offset: 100,
                        color: "rgba(var(--primary-rgb))",
                        opacity: 1
                    }
                ],
                [
                    {
                        offset: 0,
                        color: "rgba(215, 124, 247,0.15)",
                        opacity: 1
                    },
                    {
                        offset: 75,
                        color: "rgba(215, 124, 247,0.15)",
                        opacity: 1
                    },
                    {
                        offset: 100,
                        color: "rgba(215, 124, 247,0.15)",
                        opacity: 1
                    }
                ],
            ]
        }
    },
    labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ],
    markers: {
        size: 0,
    },
    xaxis: {
        type: "month",
    },
    yaxis: {
        min: 0,
    },
    tooltip: {
        shared: true,
        theme: "dark",
        intersect: false,
        y: {
            formatter: function (y:any) {
                if (typeof y !== "undefined") {
                    return y.toFixed(0) + " points";
                }
                return y;
            },
        },
    },
    legend: {
        show: true,
        position: "top",
        horizontalAlign: "center",
        fontFamily: "Montserrat",
    },
}

// CONTACTS BY SOURCE
export const ContactBySourceSeries = [14, 23, 21, 17, 15, 10]
export const ContactBySourceOptions = {
    chart: {
        type: 'polarArea',
        height: 357
    },
    stroke: {
        colors: ['#fff'],
    },
    fill: {
        opacity: 1
    },
    legend: {
        position: 'bottom',
        itemMargin: {
            horizontal: 5,
            vertical: 5
        },
        fontFamily: "Montserrat",
    },
    grid: {
       show: false
    },
    labels: ['Organic Search', 'Paid Search', 'Direct Traffic', 'Social Media', 'Referrals', "Others"],
    colors: ["rgba(var(--primary-rgb))", "rgb(215, 124, 247)", "rgb(12, 215, 177)", "rgb(254, 124, 88)", "rgb(12, 163, 231)", "rgb(243, 157, 45)"],
    responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                width: 200
            },
            legend: {
                position: 'bottom'
            }
        }
    }]
}

/* Leads By Source */
export const leadsBySourceSeries = [
    {
        name: 'Actual',
        data: [
            {
                x: 'Mobile',
                y: 1292,
            },
            {
                x: 'Desktop',
                y: 4432,
            },
            {
                x: 'Laptop',
                y: 5423,
            },
            {
                x: 'Tablet',
                y: 6653,
            }
        ]
    }
]
export const leadsBySourceOptions = {
    chart: {
        height: 317,
        type: 'bar'
    },
    plotOptions: {
        bar: {
            columnWidth: '40%',
            distributed: true,
            borderRadius: 3,
        }
    },
    colors: ['rgba(var(--primary-rgb))', "rgba(215, 124, 247, 1)", "rgba(12, 215, 177, 1)", "rgba(254, 124, 88, 1)"],
    dataLabels: {
        enabled: false
    },
    grid: {
        borderColor: '#f1f1f1',
        strokeDashArray: 3
    },
    legend: {
        show: false,
        showForSingleSeries: true,
        customLegendItems: ['Expected'],
        fontFamily: "Montserrat",
    },
    xaxis: {
        labels: {
            show: true,
            style: {
                colors: "#8c9097",
                fontSize: '11px',
                fontWeight: 600,
                cssClass: 'apexcharts-xaxis-label',
            },
        }
    },
    yaxis: {
        labels: {
            show: true,
            style: {
                colors: "#8c9097",
                fontSize: '11px',
                fontWeight: 600,
                cssClass: 'apexcharts-xaxis-label',
            },
        }
    },
    tooltip: {
        theme: "dark",
    }
}


const CustomersIcon = <svg xmlns="http://www.w3.org/2000/svg" className="!fill-white !text-white" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="84" cy="108" r="52" opacity="0.2"></circle><path d="M10.23,200a88,88,0,0,1,147.54,0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><path d="M172,160a87.93,87.93,0,0,1,73.77,40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><circle cx="84" cy="108" r="52" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle><path d="M152.69,59.7A52,52,0,1,1,172,160" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path></svg>
const Ratioicon = <svg xmlns="http://www.w3.org/2000/svg" className="!fill-white !text-white" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><polygon points="232 128 232 184 128 184 128 72 24 72 24 128 232 128" opacity="0.2"></polygon><polyline points="232 128 232 184 128 184 128 72 24 72 24 128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></polyline></svg>
const Dealsicon = <svg xmlns="http://www.w3.org/2000/svg" className="!fill-white !text-white" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M128,144a191.14,191.14,0,0,1-96-25.68h0V200a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V118.31A191.08,191.08,0,0,1,128,144Z" opacity="0.2"></path><line x1="112" y1="112" x2="144" y2="112" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><rect x="32" y="64" width="192" height="144" rx="8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></rect><path d="M168,64V48a16,16,0,0,0-16-16H104A16,16,0,0,0,88,48V64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><path d="M224,118.31A191.09,191.09,0,0,1,128,144a191.14,191.14,0,0,1-96-25.68" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path></svg>

export const cardData = [
    { id: 1,maincolor:"secondary", color: "secondary", count: "1,56,290", lable: "Total Customers", badgeText: "-0.56%", badgeColor: "danger", icon: "down", chartOptions: CustomersOptions({ color: "rgb(215, 124, 247)" }), chartSeries: CustomersSeries, svgIcon: CustomersIcon },
    { id: 2,maincolor:"success", color: "success", count: "16.87%", lable: "Conversion Ratio", badgeText: "+4.63%", badgeColor: "success", icon: "up", chartOptions: CustomersOptions({ color: "rgb(12, 215, 177)" }), chartSeries: CustomersSeries, svgIcon: Ratioicon },
    { id: 3,maincolor:"orange", color: "orangemain", count: "$73,239", lable: "Total Deals", badgeText: "+12.67%", badgeColor: "success", icon: "up", chartOptions: CustomersOptions({ color: "rgb(254, 124, 88)" }), chartSeries: CustomersSeries, svgIcon: Dealsicon },
]

// TOP DEALS
export const TopDeals = [
    {
        id:1,
        deal: 'Et Management',
        value: '$121K',
        probability: '50%',
        status: 'Contract Sent',
        statusColor: "primary",
        statusClass: 'bg-primary/[0.15] text-primary',
        avatar: 'bg-primary',
        icon: 'fe-terminal',
    },
    {
        id:2,
        deal: 'Raslk Assoc',
        value: '$68K',
        probability: '70%',
        status: 'On Hold',
        statusColor: "warning",
        statusClass: 'bg-warning/[0.15] text-warning',
        avatar: 'bg-secondary text-white',
        initials: 'RA',
    },
    {
        id:3,
        deal: 'Sed Systems',
        value: '$221K',
        probability: '10%',
        status: 'Contract Failed',
        statusColor: "danger",
        statusClass: 'bg-danger/[0.15] text-danger',
        avatar: 'bg-orangemain',
        icon: 'fe-monitor',
    },
    {
        id:4,
        deal: 'Justo Manufacturers',
        value: '$521K',
        probability: '70%',
        status: 'Won',
        statusColor: "success",
        statusClass: 'bg-success/[0.15] text-success',
        avatar: 'bg-success text-white',
        initials: 'JM',
    },
    {
        id:5,
        deal: 'At Developers',
        value: '$51K',
        probability: '90%',
        status: 'Contract Sent',
        statusColor: "primary",
        statusClass: 'bg-primary/[0.15] text-primary',
        avatar: 'bg-info text-white',
        initials: 'AD',
    },
    {
        id:6,
        deal: 'Jumbotrics',
        value: '$51K',
        probability: '90%',
        status: 'Closed',
        statusColor: "danger",
        statusClass: 'bg-danger/[0.15] text-danger',
        avatar: 'bg-warning text-white',
        initials: 'JU',
    },
]

// DEAL STATISTICS

export const DealStatistics = [
    {
        id: 1,
        deal: "Xenon Tech. Ed.",
        salesRepname: "Simon Cowall",
        salesRepavatar: "../../assets/images/faces/15.jpg",
        email: "mayorkelly@gmail.com",
        amount: "$4320.29",
        location: "Germany",
        locationColor: "primary",
        salesCycle: "43 Days",
    },
    {
        id: 2,
        deal: "Ideal IT Sol.",
        salesRepname: "Meisha Kerr",
        salesRepavatar: "../../assets/images/faces/4.jpg",
        email: "andrewgarfield@gmail.com",
        amount: "$6745.99",
        location: "Canada",
        locationColor: "secondary",
        salesCycle: "45 Days",
    },
    {
        id: 3,
        deal: "Inferno Xo",
        salesRepname: "Jessica",
        salesRepavatar: "../../assets/images/faces/5.jpg",
        email: "simoncowel234@gmail.com",
        amount: "$1176.89",
        location: "Singapore",
        locationColor: "success",
        salesCycle: "50 Days",
    },
    {
        id: 4,
        deal: "Myami Group & Tech.",
        salesRepname: "Amanda B",
        salesRepavatar: "../../assets/images/faces/6.jpg",
        email: "mirindahers@gmail.com",
        amount: "$1899.99",
        location: "USA",
        locationColor: "orangemain",
        salesCycle: "55 Days",
    },
    {
        id: 5,
        deal: "Mevengo Tech Et Sed",
        salesRepname: "Jason Stathman",
        salesRepavatar: "../../assets/images/faces/11.jpg",
        email: "jacobsmith@gmail.com",
        amount: "$1867.29",
        location: "Europe",
        locationColor: "info",
        salesCycle: "30 Days",
    },
    {
        id: 6,
        deal: "Lackme Info Et.",
        salesRepname: "Khabib Hussain",
        salesRepavatar: "../../assets/images/faces/13.jpg",
        email: "Hussain@gmail.com",
        amount: "$2439.99",
        location: "Canada",
        locationColor: "danger",
        salesCycle: "35 Days",
    },
];

export const countries = [
    {
      name: "United States",
      flag: "../../assets/images/flags/us_flag.jpg",
      sales: "(32,879)",
      trend: "0.65%",
      trendDirection: "up",
      trendClass: "text-success",
    },
    {
      name: "Russia",
      flag: "../../assets/images/flags/russia_flag.jpg",
      sales: "(22,710)",
      trend: "0.55%",
      trendDirection: "up",
      trendClass: "text-success",
    },
    {
      name: "Germany",
      flag: "../../assets/images/flags/germany_flag.jpg",
      sales: "(36,291)",
      trend: "0.69%",
      trendDirection: "down",
      trendClass: "text-danger",
    },
    {
      name: "Italy",
      flag: "../../assets/images/flags/italy_flag.jpg",
      sales: "(45,870)",
      trend: "0.86%",
      trendDirection: "up",
      trendClass: "text-success",
    },
    {
      name: "Uae",
      flag: "../../assets/images/flags/uae_flag.jpg",
      sales: "(37,357)",
      trend: "0.73%",
      trendDirection: "up",
      trendClass: "text-success",
    },
    {
      name: "Spain",
      flag: "../../assets/images/flags/spain_flag.jpg",
      sales: "(34,798)",
      trend: "0.64%",
      trendDirection: "down",
      trendClass: "text-danger",
    },
    {
      name: "Argentina",
      flag: "../../assets/images/flags/argentina_flag.jpg",
      sales: "(24,667)",
      trend: "0.42%",
      trendDirection: "up",
      trendClass: "text-success",
    },
  ];