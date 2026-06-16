// PRODUCTS OVERVIEW
export const ProductsOverviewSeries = [
    {
        type: 'area',
        name: 'Total Products',
        data: [
            {
                x: 'Jan',
                y: 100
            },
            {
                x: 'Feb',
                y: 210
            },
            {
                x: 'Mar',
                y: 180
            },
            {
                x: 'Apr',
                y: 454
            },
            {
                x: 'May',
                y: 230
            },
            {
                x: 'Jun',
                y: 320
            },
            {
                x: 'Jul',
                y: 656
            },
            {
                x: 'Aug',
                y: 830
            },
            {
                x: 'Sep',
                y: 350
            },
            {
                x: 'Oct',
                y: 350
            },
            {
                x: 'Nov',
                y: 210
            },
            {
                x: 'Dec',
                y: 410
            }
        ]
    },
    {
        type: 'line',
        name: 'Published',
        chart: {
            dropShadow: {
                enabled: true,
                enabledOnSeries: undefined,
                top: 5,
                left: 0,
                blur: 3,
                color: '#000',
                opacity: 0.1
            }
        },
        data: [
            {
                x: 'Jan',
                y: 180
            },
            {
                x: 'Feb',
                y: 620
            },
            {
                x: 'Mar',
                y: 476
            },
            {
                x: 'Apr',
                y: 220
            },
            {
                x: 'May',
                y: 520
            },
            {
                x: 'Jun',
                y: 780
            },
            {
                x: 'Jul',
                y: 435
            },
            {
                x: 'Aug',
                y: 515
            },
            {
                x: 'Sep',
                y: 738
            },
            {
                x: 'Oct',
                y: 454
            },
            {
                x: 'Nov',
                y: 525
            },
            {
                x: 'Dec',
                y: 230
            }
        ]
    },
    {
        type: 'line',
        name: 'Unpublished',
        chart: {
            dropShadow: {
                enabled: true,
                enabledOnSeries: undefined,
                top: 5,
                left: 0,
                blur: 3,
                color: '#000',
                opacity: 0.1
            }
        },
        data: [
            {
                x: 'Jan',
                y: 200
            },
            {
                x: 'Feb',
                y: 530
            },
            {
                x: 'Mar',
                y: 110
            },
            {
                x: 'Apr',
                y: 130
            },
            {
                x: 'May',
                y: 480
            },
            {
                x: 'Jun',
                y: 520
            },
            {
                x: 'Jul',
                y: 780
            },
            {
                x: 'Aug',
                y: 435
            },
            {
                x: 'Sep',
                y: 475
            },
            {
                x: 'Oct',
                y: 738
            },
            {
                x: 'Nov',
                y: 454
            },
            {
                x: 'Dec',
                y: 480
            }
        ]
    }
]
export const ProductsOverviewOptions = {

    chart: {
        height: 350,
        animations: {
            speed: 500
        },
        dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 8,
            left: 0,
            blur: 3,
            color: '#000',
            opacity: 0.1
        },
    },
    colors: ["rgba(84, 109, 254,0.05)", "rgba(215, 124, 247, 0.85)", "rgb(12, 215, 177)"],
    dataLabels: {
        enabled: false
    },
    grid: {
        borderColor: '#f1f1f1',
        strokeDashArray: 3
    },
    stroke: {
        curve: 'smooth',
        width: [0, 2, 1],
        dashArray: [0, 5, 0],
    },
    yaxis: {
        min: 0,
        tickAmount: 5,
    },
    xaxis: {
        axisTicks: {
            show: false,
        },
    },
    legend: {
        show: true,
        customLegendItems: ['Total Products', 'Published', 'Unpublished'],
        inverseOrder: true
    },
    title: {
        align: 'left',
        style: {
            fontSize: '.8125rem',
            fontWeight: 'semibold',
            color: '#8c9097'
        },
    },
    markers: {
        hover: {
            sizeOffset: 5
        }
    }
}


// MOST USED BROWSERS
export const MostUsedBrowserSeries = [1624, 1267, 1153, 1153]
export const MostUsedBrowserOptions = {

    labels: ["Chrome", "Firefox", "Safari", "Opera"],
    chart: {
        height: 250,
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
                size: '70%',
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
                        formatter: function (val:any) {
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
    colors: ["rgba(84, 109, 254)", "rgba(215, 124, 247)", "rgb(12, 215, 177)", "rgb(254, 124, 88)"],
}

// sales-report
export const SalesReportSeries = [{
    name: "Sales",
    data: [20, 38, 38, 72, 55, 63, 43, 76, 55, 80, 40, 80]
}]
export const SalesReportOptions = {
    chart: {
        height: 290,
        type: 'line',
        zoom: {
            enabled: false
        },
        dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 5,
            left: 0,
            blur: 3,
            color: '#000',
            opacity: 0.1
        },
        toolbar: { show: false }
    },
    dataLabels: {
        enabled: false
    },
    legend: {
        position: "top",
        horizontalAlign: "center",
        offsetX: -15,
        fontWeight: "bold",
    },
    stroke: {
        curve: 'smooth',
        width: '2',
        dashArray: [0, 5],
    },
    grid: {
        borderColor: '#f1f1f1',
        strokeDashArray: 3
    },
    colors: ["rgba(84, 109, 254)"],
    yaxis: {
        tickAmount: 5,
        labels: {
            formatter: function (y:any) {
                return y.toFixed(0) + "";
            }
        },
        axisBorder: {
            show: false,
            color: 'rgba(119, 119, 142, 0.05)',
            offsetX: 0,
            offsetY: 0,
            height: 0,
            width: '0%',
        },
    },
    xaxis: {
        type: 'month',
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        axisBorder: {
            show: false,
            color: 'rgba(119, 119, 142, 0.05)',
            offsetX: 0,
            offsetY: 0,
            height: 0,
            width: '0%',
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


// totalvendors-chart
export const TotalvendorsSeries = [1234, 1754]
export const TotalvendorsOptions = {
    labels: ["Inactive", "Active"],
    chart: {
        height: 240,
        type: 'donut',
        dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 5,
            left: 0,
            blur: 3,
            color: '#525050',
            opacity: 0.1
        }
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
                        formatter: function (val:any) {
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

    colors: ["rgba(84, 109, 254)", "rgb(215, 124, 247)"],

}

// TOTAL CUSTOMERS
export const TotalCustomerSeries = [76, 876]

export const stats = [
    {
        title: 'Active Properties',
        count: '14,732',
        link: '#!',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="!text-white !fill-white" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M216,64H176a48,48,0,0,0-96,0H40A16,16,0,0,0,24,80V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V80A16,16,0,0,0,216,64ZM128,32a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm88,168H40V80H80V96a8,8,0,0,0,16,0V80h64V96a8,8,0,0,0,16,0V80h40Z"></path></svg>
        ),
        bgColor: 'primary',
        textClass: 'text-[1.5rem] mb-0 flex-grow !text-dark font-medium',
    },
    {
        title: 'Total Agents',
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
      title: 'Properties Sold',
      count: '1,116',
      percentage: '+0.21%',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="!text-white !fill-white" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="var(--primary-color)"><g><rect fill="none" height="24" width="24"></rect></g><g><g><path d="M20,3H4C2.9,3,2,3.9,2,5v14c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V5 C22,3.9,21.1,3,20,3z M20,19H4V5h16V19z" fillRule="evenodd"></path><polygon fillRule="evenodd" points="19.41,10.42 17.99,9 14.82,12.17 13.41,10.75 12,12.16 14.82,15"></polygon><rect fillRule="evenodd" height="2" width="5" x="5" y="7"></rect><rect fillRule="evenodd" height="2" width="5" x="5" y="11"></rect><rect fillRule="evenodd" height="2" width="5" x="5" y="15"></rect></g></g></svg>
      ),
      trend: 'success',
      trend1:"success",
      trendIcon: ' ti ti-caret-up',
      svgicon:(<svg className="!fill-primary" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="var(--primary-color)"><g><rect fill="none" height="24" width="24"></rect></g><g><g><path d="M20,3H4C2.9,3,2,3.9,2,5v14c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V5 C22,3.9,21.1,3,20,3z M20,19H4V5h16V19z" fillRule="evenodd"></path><polygon fillRule="evenodd" points="19.41,10.42 17.99,9 14.82,12.17 13.41,10.75 12,12.16 14.82,15"></polygon><rect fillRule="evenodd" height="2" width="5" x="5" y="7"></rect><rect fillRule="evenodd" height="2" width="5" x="5" y="11"></rect><rect fillRule="evenodd" height="2" width="5" x="5" y="15"></rect></g></g></svg>)
    },
    {
      title: 'Expired Properties',
      count: '1,468',
      percentage: '-0.153%',
      icon: (
        <svg className="!text-white !fill-white" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 8c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-6 4c.22-.72 3.31-2 6-2 2.7 0 5.8 1.29 6 2H9zm-3-3v-3h3v-2H6V7H4v3H1v2h3v3z"></path></svg>
      ),
      trend: 'orange',
      trend1:"orangemain",
      trendIcon: 'ri-arrow-down-s-fill',
      svgicon:(<svg className="!fill-success" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 8c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-6 4c.22-.72 3.31-2 6-2 2.7 0 5.8 1.29 6 2H9zm-3-3v-3h3v-2H6V7H4v3H1v2h3v3z"></path></svg>)
    },
    {
      title: 'Featured Properties',
      count: '2,468',
      percentage: '-0.153%',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="!text-white !fill-white" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="rgb(var(--warning-rgb))"><g><rect fill="none" height="24" width="24"></rect></g><g><g><path d="M23,11.99l-2.44-2.79l0.34-3.69l-3.61-0.82L15.4,1.5L12,2.96L8.6,1.5L6.71,4.69L3.1,5.5L3.44,9.2L1,11.99l2.44,2.79 l-0.34,3.7l3.61,0.82L8.6,22.5l3.4-1.47l3.4,1.46l1.89-3.19l3.61-0.82l-0.34-3.69L23,11.99z M19.05,13.47l-0.56,0.65l0.08,0.85 l0.18,1.95l-1.9,0.43l-0.84,0.19l-0.44,0.74l-0.99,1.68l-1.78-0.77L12,18.85l-0.79,0.34l-1.78,0.77l-0.99-1.67l-0.44-0.74 l-0.84-0.19l-1.9-0.43l0.18-1.96l0.08-0.85l-0.56-0.65l-1.29-1.47l1.29-1.48l0.56-0.65L5.43,9.01L5.25,7.07l1.9-0.43l0.84-0.19 l0.44-0.74l0.99-1.68l1.78,0.77L12,5.14l0.79-0.34l1.78-0.77l0.99,1.68l0.44,0.74l0.84,0.19l1.9,0.43l-0.18,1.95l-0.08,0.85 l0.56,0.65l1.29,1.47L19.05,13.47z"></path><polygon points="10.09,13.75 7.77,11.42 6.29,12.91 10.09,16.72 17.43,9.36 15.95,7.87"></polygon></g></g></svg>
      ),
      trend: 'info',
      trend1:"info",
      trendIcon: 'ri-arrow-down-s-fill',
      svgicon:(<svg className="!fill-warning" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="rgb(var(--warning-rgb))"><g><rect fill="none" height="24" width="24"></rect></g><g><g><path d="M23,11.99l-2.44-2.79l0.34-3.69l-3.61-0.82L15.4,1.5L12,2.96L8.6,1.5L6.71,4.69L3.1,5.5L3.44,9.2L1,11.99l2.44,2.79 l-0.34,3.7l3.61,0.82L8.6,22.5l3.4-1.47l3.4,1.46l1.89-3.19l3.61-0.82l-0.34-3.69L23,11.99z M19.05,13.47l-0.56,0.65l0.08,0.85 l0.18,1.95l-1.9,0.43l-0.84,0.19l-0.44,0.74l-0.99,1.68l-1.78-0.77L12,18.85l-0.79,0.34l-1.78,0.77l-0.99-1.67l-0.44-0.74 l-0.84-0.19l-1.9-0.43l0.18-1.96l0.08-0.85l-0.56-0.65l-1.29-1.47l1.29-1.48l0.56-0.65L5.43,9.01L5.25,7.07l1.9-0.43l0.84-0.19 l0.44-0.74l0.99-1.68l1.78,0.77L12,5.14l0.79-0.34l1.78-0.77l0.99,1.68l0.44,0.74l0.84,0.19l1.9,0.43l-0.18,1.95l-0.08,0.85 l0.56,0.65l1.29,1.47L19.05,13.47z"></path><polygon points="10.09,13.75 7.77,11.42 6.29,12.91 10.09,16.72 17.43,9.36 15.95,7.87"></polygon></g></g></svg>)
    },
  ];