/* sessions overview */
export const Overviewseries = [{
    name: 'Clicks',
    type: "area",
    data: [34, 22, 37, 56, 21, 35, 60, 34, 56, 78, 89, 53],
}, {
    name: "Actions",
    type: "line",
    data: [44, 42, 57, 86, 58, 55, 70, 43, 23, 54, 77, 34]
}]
export const OverviewOptions = {
    chart: {
        height: 338,
        type: 'line',
        toolbar: {
            show: false
        },
        dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 7,
            left: 0,
            blur: 1,
            color: ["rgba(var(--primary-rgb))", "rgba(215, 124, 247,0.6)"],
            opacity: 0.1,
        },
    },
    grid: {
        borderColor: '#f1f1f1',
        strokeDashArray: 3
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: [1.5, 1.5],
        curve: "smooth",
        dashArray: [0, 4],
    },
    legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
        height: 40,
        offsetX: 0,
        offsetY: 10,
    },
    colors: ["rgba(var(--primary-rgb))", "rgba(215, 124, 247,0.6)"],
    yaxis: {
        min: 0, // Add this line to set the minimum value of y-axis to 0
        title: {
            style: {
                color: '#adb5be',
                fontSize: '14px',
                fontFamily: 'poppins, sans-serif',
                fontWeight: 500,
                cssClass: 'apexcharts-yaxis-label',
            },
        },
    },
    xaxis: {
        type: "month",
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
            offsetX: 0,
            offsetY: 0
        },
        labels: {
            rotate: -90,
            style: {
                colors: "#8c9097",
                fontSize: '11px',
                fontWeight: 500,
                cssClass: 'apexcharts-xaxis-label',
            },
        }
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
                        color: "rgba(var(--primary-rgb),0.1)",
                        opacity: 1
                    },
                    {
                        offset: 75,
                        color: "rgba(var(--primary-rgb),0.1)",
                        opacity: 1
                    },
                    {
                        offset: 100,
                        color: "rgba(var(--primary-rgb),0.1)",
                        opacity: 1
                    }
                ],
                [
                    {
                        offset: 0,
                        color: "rgba(215, 124, 247, 0.6)",
                        opacity: 1
                    },
                    {
                        offset: 75,
                        color: "rgba(215, 124, 247, 0.6)",
                        opacity: 1
                    },
                    {
                        offset: 100,
                        color: "rgba(215, 124, 247, 0.6)",
                        opacity: 1
                    }
                ],
            ]
        }
    },
    tooltip: {
        shared: true,
        intersect: false,
        theme: "dark",
    },
}

//EARNINGS REPORT
export const Earningssericrs = [{
    name: 'This Week',
    data: [44, 42, 57, 86, 58, 55, 70],
}, {
    name: 'Last Week',
    data: [34, 22, 37, 56, 21, 35, 60],
}]
export const EarningsOptions = {
    chart: {
        type: 'bar',
        height: 338
    },
    grid: {
        borderColor: '#f1f1f1',
        strokeDashArray: 3
    },
    stroke: {
        width: 1,
    },
    colors: ["rgba(var(--primary-rgb))", "rgba(215, 124, 247,1)"],
    plotOptions: {
        bar: {
            borderRadius: 3,
            colors: {
                ranges: [{
                    from: -100,
                    to: -46,
                    color: '#ebeff5'
                }, {
                    from: -45,
                    to: 0,
                    color: '#ebeff5'
                }]
            },
            columnWidth: '50%',
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 1,
                left: 1,
                blur: 2,
                opacity: 0.5,
            }
        }
    },
    dataLabels: {
        enabled: false,
    },
    legend: {
        show: true,
        position: 'top',
    },
    tooltip: {
        enabled: true,
        theme: "dark",
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
            formatter: function (y: any) {
                return y.toFixed(0) + "";
            }
        }
    },
    xaxis: {
        type: 'day',
        categories: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
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
    }
}

//SESSIONS DEVICE
export const Deviceserices = [1754, 634, 878]
export const DeviceOptions = {
    labels: ["Mobile", "Tablet", "Desktop"],
    chart: {
        height: 220,
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
                        offsetY: -4
                    },
                    value: {
                        show: true,
                        fontSize: '18px',
                        color: undefined,
                        offsetY: 8,
                        formatter: function (val: any) {
                            return val + "%"
                        }
                    },
                    total: {
                        show: true,
                        showAlways: true,
                        label: 'Total',
                        fontSize: '22px',
                        fontWeight: 600,
                        color: '#495057',
                    }

                }
            }
        }
    },
    colors: ["rgba(var(--primary-rgb))", "rgba(215, 124, 247, 1)", "rgba(12, 163, 231, 1)"],
}

// VISITORS BY BROWSER
export const Browserserices = [{
    name: 'Total Visitors',
    data: [25, 98, 56, 22, 75, 19, 86],
}]
export const Browseroptions = {
    chart: {
        height: 200,
        type: 'radar',
        toolbar: {
            show: false,
        },
        offsetY: 20
    },
    labels: ['Chrome', ' Firefox', 'Edge', 'Safari', 'Opera', 'Brave', 'Vivaldi'],
    plotOptions: {
        radar: {
            size: 75,
            polygons: {
                fill: {
                    colors: ['rgba(84, 109, 254,0.05)', 'rgba(84, 109, 254,0.05)']
                },
            }
        }
    },
    colors: ["#d77cf7"],
    stroke: {
        width: 2,
        curve: 'straight',
    },
    markers: {
        size: 4,
        strokeColor: "#d77cf7",
        colors: ['#fff'],
        strokeWidth: 1,
    },
    grid: {
        padding: {
            top: 30,
        },  
    },
    tooltip: {
        y: {
            formatter: function (val: any) {
                return val
            }
        },
        theme: 'dark',
    },
    yaxis: {
        min: 0,
        tickAmount: 7,
        labels: {
            formatter: function (val: any, i: any) {
                if (i % 5 === 0) {
                    return val
                }
            }
        }
    }
}
// impressions
export const Impressionsserices = [{
    name: 'Value',
    data: [46, 34, 40, 35, 21, 46, 37, 22, 34, 34, 40, 44, 28, 23, 18, 15, 18, 16, 17, 12, 14]
}]
export const ImpressionsOptions = {
    chart: {
        type: 'area',
        height: 50,
        sparkline: {
            enabled: true
        },
        dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 7,
            left: 0,
            blur: 1,
            color: 'rgba(var(--primary-rgb))',
            opacity: 0.15
        }
    },
    stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'butt',
        colors: undefined,
        width: 1.5,
        dashArray: 0,
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
                        color: "rgba(var(--primary-rgb),0.1)",
                        opacity: 1
                    },
                    {
                        offset: 75,
                        color: "rgba(var(--primary-rgb),0.1)",
                        opacity: 1
                    },
                    {
                        offset: 100,
                        color: "rgba(var(--primary-rgb),0.1)",
                        opacity: 1
                    }
                ]
            ]
        }
    },
    yaxis: {
        min: 0,
        show: false,
        axisBorder: {
            show: false
        },
    },
    xaxis: {
        axisBorder: {
            show: false
        },
    },

    colors: ["rgba(var(--primary-rgb))"],
    tooltip: {
        enabled: false,
    }
}

// new-subscribers
export const Subscribersserices = [{
    name: 'Value',
    data: [14, 12, 17, 16, 18, 15, 18, 23, 28, 44, 40, 34, 34, 22, 37, 46, 21, 35, 40, 34, 46]
}]
export const Subscribersoptions = {
    chart: {
        type: 'line',
        height: 50,
        sparkline: {
            enabled: true
        },
        dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 7,
            left: 0,
            blur: 1,
            color: 'rgb(243, 157, 45)',
            opacity: 0.1
        }
    },
    stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'butt',
        colors: undefined,
        width: 1.5,
        dashArray: 0,
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
                        color: "rgba(243, 157, 45, 1)",
                        opacity: 1
                    },
                    {
                        offset: 75,
                        color: "rgba(243, 157, 45, 1)",
                        opacity: 1
                    },
                    {
                        offset: 100,
                        color: "rgba(243, 157, 45, 1)",
                        opacity: 1
                    }
                ]
            ]
        }
    },
    yaxis: {
        min: 0,
        show: false,
        axisBorder: {
            show: false
        },
    },
    xaxis: {
        axisBorder: {
            show: false
        },
    },

    colors: ["rgb(243, 157, 45)"],
    tooltip: {
        enabled: false,
    }
}


// Browser Statistics
export const BrowserStatistics = [
    { src: "../../assets/images/browsers/chrome.png", browser: "Google", sessions: "1215", bounceRate: "29.52%" },
    { src: "../../assets/images/browsers/edge.png", browser: "Edge", sessions: "978", bounceRate: "24.79%" },
    { src: "../../assets/images/browsers/firefox.png", browser: "Firefox", sessions: "815", bounceRate: "35.06%" },
    { src: "../../assets/images/browsers/opera.png", browser: "Opera", sessions: "1347", bounceRate: "27.91%" },
    { src: "../../assets/images/browsers/safari.png", browser: "Safari", sessions: "1123", bounceRate: "39.13%" },
    { src: "../../assets/images/browsers/uc.png", browser: "Uc Browser", sessions: "1189", bounceRate: "28.94%" },
]

// CAMPAIGN ANALYTICS
export const CampaignAnalytics = [
    {
        id:1,
        checked: false,
        website: 'Youtube',
        clicks: '1.4K',
        impressions: '143.4K',
        ctr: '9.21%',
        amountSpent: '$1.278K',
        costPerClick: '$0.267',
        icon: 'ti-brand-youtube',
        iconBg: "danger",
        badgeClass: 'primary',
    },
    {
        id:2,
        checked: true,
        website: 'Facebook',
        clicks: '2.68K',
        impressions: '121.8K',
        ctr: '5.24%',
        amountSpent: '$2.873K',
        costPerClick: '$0.790',
        icon: 'ti-brand-facebook',
        iconBg: "primary",
        badgeClass: 'success',
    },
    {
        id:3,
        checked: false,
        website: 'Snapchat',
        clicks: '1.56K',
        impressions: '155.1K',
        ctr: '4.89%',
        amountSpent: '$3.344K',
        costPerClick: '$1.656',
        icon: 'ti-brand-snapchat',
        iconBg: "success",
        badgeClass: 'success',
    },
    {
        id:4,
        checked: false,
        website: 'Instagram',
        clicks: '6.67K',
        impressions: '178.3K',
        ctr: '7.46%',
        amountSpent: '$3.783K',
        costPerClick: '$1.076',
        icon: 'ti-brand-instagram',
        iconBg: "secondary",
        badgeClass: 'secondary',
    },
    {
        id:5,
        checked: true,
        website: 'LinkedIn',
        clicks: '3.21K',
        impressions: '116.2K',
        ctr: '1.75%',
        amountSpent: '$2.138K',
        costPerClick: '$0.242',
        icon: 'ti-brand-linkedin',
        iconBg: "info",
        badgeClass: 'warning',
    },
    {
        id:6,
        checked: false,
        website: 'Reddit',
        clicks: '1.63K',
        impressions: '157.2K',
        ctr: '4.85%',
        amountSpent: '$4.532K',
        costPerClick: '$1.435',
        icon: 'ti-brand-reddit',
        iconBg: "warning",
        badgeClass: 'warning',
    }
]

export const cardData = [
    {
        title: 'Total Users',
        value: '872',
        percentage: '+0.45%',
        icon: 'primary',
        icon1: 'primary',
        badgeClass: 'success',
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="!fill-white !text-white" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="84" cy="108" r="52" opacity="0.2"></circle><path d="M10.23,200a88,88,0,0,1,147.54,0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><path d="M172,160a87.93,87.93,0,0,1,73.77,40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><circle cx="84" cy="108" r="52" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle><path d="M152.69,59.7A52,52,0,1,1,172,160" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path></svg>)
    },
    {
        title: 'Sessions',
        value: '2,178',
        percentage: '+1.02%',
        icon: 'secondary',
        icon1: 'secondary',
        badgeClass: 'success',
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="!fill-white !text-white" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="128" cy="136" r="88" opacity="0.2"></circle><circle cx="128" cy="136" r="88" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle><line x1="128" y1="136" x2="168" y2="96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><line x1="104" y1="16" x2="152" y2="16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line></svg>)
    },
    {
        title: 'Bounce Rate',
        value: '48.46%',
        percentage: '-0.89%',
        icon: 'success',
        icon1: 'success',
        badgeClass: 'danger',
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="!fill-white !text-white" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="76" cy="76" r="28" opacity="0.2"></circle><circle cx="180" cy="180" r="28" opacity="0.2"></circle><line x1="200" y1="56" x2="56" y2="200" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><circle cx="76" cy="76" r="28" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle><circle cx="180" cy="180" r="28" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle></svg>)
    },
    {
        title: 'Avg Session Duration',
        value: '4.5 min',
        percentage: '+11.07%',
        icon: 'orangemain',
        icon1: 'orange',
        badgeClass: 'success',
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="!fill-white !text-white" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M128,128,67.2,82.4A8,8,0,0,1,64,76V40a8,8,0,0,1,8-8H184a8,8,0,0,1,8,8V75.64A8,8,0,0,1,188.82,82L128,128h0" opacity="0.2"></path><path d="M128,128,67.2,173.6A8,8,0,0,0,64,180v36a8,8,0,0,0,8,8H184a8,8,0,0,0,8-8V180.36a8,8,0,0,0-3.18-6.38L128,128h0" opacity="0.2"></path><path d="M128,128,67.2,82.4A8,8,0,0,1,64,76V40a8,8,0,0,1,8-8H184a8,8,0,0,1,8,8V75.64A8,8,0,0,1,188.82,82L128,128h0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><path d="M128,128,67.2,173.6A8,8,0,0,0,64,180v36a8,8,0,0,0,8,8H184a8,8,0,0,0,8-8V180.36a8,8,0,0,0-3.18-6.38L128,128h0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path></svg>)
    }
];