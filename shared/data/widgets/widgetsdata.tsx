

/* Total Sales */
export const TotalSalesSeries = [{
    name: 'Value',
    data: [14, 38, 26, 44, 20, 65, 35, 40]
}]
export const TotalSalesOptions: any = ({ color, gradientSettings }: any) => ({
    chart: {
        type: 'area',
        height: 60,
        width: 120,
        sparkline: {
            enabled: true
        },
    },
    grid: {
        show: false,
        xaxis: {
            lines: {
                show: false
            }
        },
        yaxis: {
            lines: {
                show: false
            }
        },
    },
    stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'butt',
        colors: undefined,
        width: 2,
        dashArray: 0,
        fill: {
            type: "gradient",
            gradient: {
                type: "horizontal",
                gradientToColors: gradientSettings.gradientToColors,
                colorStops: gradientSettings.colorStops,
            }
        }
    },
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            type: "horizontal",
            colorStops: [
                [
                    {
                        offset: 0,
                        color: "rgb(215, 124, 247)",
                        opacity: 0.03
                    },
                    {
                        offset: 90,
                        color: "rgba(var(--primary-rgb))",
                        opacity: 0.03
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
        show: false,
        axisTicks: {
            show: false
        },
        axisBorder: {
            show: false
        }
    },
   
    colors: [color]
})

/* Total Sales */
export const SalesSeries = [{
    name: 'Value',
    data: [14, 20, 15, 25, 22, 35, 15, 30, 25]
}]
export const SalesOptions: any = ({ color, gradientSettings }: any) => ({
    chart: {
        type: 'line',
        height: 40,
        width: 200,
        sparkline: {
            enabled: true
        },
        dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 3,
            bottom: -50,
            left: 0,
            blur: 3,
            color: 'rgba(var(--primary-rgb))',
            opacity: 0.3
        }
    },
    grid: {
        show: false,
        xaxis: {
            lines: {
                show: false
            }
        },
        yaxis: {
            lines: {
                show: false
            }
        },
    },
    stroke: {
        show: true,
        curve: 'straight',
        lineCap: 'butt',
        colors: undefined,
        width: 1.9,
        dashArray: 0,
    },
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            type: "horizontal",
            gradientToColors: gradientSettings.gradientToColors,
            colorStops: gradientSettings.colorStops,
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
        show: false,
        axisTicks: {
            show: false
        },
        axisBorder: {
            show: false
        }
    },
    
    colors: [color]
})

//Total Sales
export const TotalSeries = [
    {
        name: "This Week",
        data: [44, 42, 57, 86, 57, 42, 44],
    },
    {
        name: "Last Week",
        data: [-34, -22, -37, -56, -37, -22, -34],
    },
]
export const TotalOptions = {
    chart: {
        toolbar: {
            show: false,
        },
        type: "bar",
        width: 100,
        height: 100,
        stacked: true,
    },
    colors: ["rgb(215, 124, 247)", "rgba(var(--primary-rgb))"],
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: "35%",
        },
    },
    dataLabels: {
        enabled: false,
    },
    legend: {
        show: false,
    },
    grid: {
        borderColor: "rgba(0,0,0,0.1)",
        xaxis: {
            lines: {
                show: false
            }
        },
        yaxis: {
            lines: {
                show: false
            }
        }
    },
    xaxis: {
        axisBorder: {
            show: false,
        },
        labels: {
            show: false,
        }
    },
    yaxis: {
        tickAmount: 4,
        labels: {
            show: false,
        },
    },
    tooltip:{
        enable:true ,
        fixed: {
            enabled: true,
            position: 'topLeft',
        },
    }
}

//Total Revenue
export const TotalRevenuesSeries = [
    {
        name: "This Week",
        data: [86, 57, 44, 42, 44, 57, 86],
    },
    {
        name: "Last Week",
        data: [-56, -37, -34, -22, -34, -37, -56],
    },
]

//Total Customers
export const TotalCustomerSeries = [
    {
        name: "This Week",
        data: [86, 57, 45, 40, 34, 30, 25],
    },
    {
        name: "Last Week",
        data: [-56, -37, -30, -24, -20, -18, -12],
    },
]

//Total Profit 
export const TotalProfitsSeries = [
    {
        name: "This Week",
        data: [44, 42, 57, 86, 57, 42, 44],
    },
    {
        name: "Last Week",
        data: [-34, -22, -37, -56, -37, -22, -34],
    },
]
export const TotalProfitsOptions = {
    chart: {
        toolbar: {
            show: false,
        },
        type: "bar",
        width: 100,
        height: 100,
        stacked: true,
    },
    colors: ["rgb(215, 124, 247)", "rgba(var(--primary-rgb))"],
    tooltip: {
        enabled: false,
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: "35%",
        },
    },
    dataLabels: {
        enabled: false,
    },
    legend: {
        show: false,
    },
    grid: {
        borderColor: "rgba(0,0,0,0.1)",
        xaxis: {
            lines: {
                show: false
            }
        },
        yaxis: {
            lines: {
                show: false
            }
        }
    },
    xaxis: {
        axisBorder: {
            show: false,
        },
        labels: {
            show: false,
        }
    },
    yaxis: {
        tickAmount: 4,
        labels: {
            show: false,
        },
    },
}



/* Sales Overview */
export const SalesOverviewSeries = [85]
export const SalesOverviewOptions = {
    chart: {
        height: 275,
        type: 'radialBar',
        responsive: 'true',
    },
    plotOptions: {
        radialBar: {
            startAngle: -135,
            endAngle: 135,
            hollow: {
                margin: 0,
                size: '68%',
                background: '#fff',
                image: undefined,
                imageOffsetX: 0,
                imageOffsetY: 0,
                position: 'front',
            },

            dataLabels: {
                show: true,
                name: {
                    offsetY: -10,
                    show: true,
                    color: 'var(--text-muted)',
                    fontSize: '14px',
                    fontWeight: '400'
                },
                value: {
                    formatter: function (val:any) {
                        return parseInt(val);
                    },
                    color: '#111',
                    fontSize: '36px',
                    show: true,
                }
            }
        }
    },
    colors: ["rgb(215, 124, 247)", "rgba(84, 109, 254)"],
    stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'round',
        colors: "#fff",
        width: 0,
        dashArray: 0,
    },
    fill: {
        type: 'gradient',
        gradient: {
            type: 'horizontal',
            shadeIntensity: 0.5,
            gradientToColors: ['rgba(84, 109, 254)'],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
        }
    },
    labels: ["Total Sales"]
}

/* Sales Revenue */
export const SalesRevenueSeries = [{
    name: 'sales',
    type: 'column',
    data: [200, 170, 250, 240, 220, 280, 170, 155, 130, 242],
}, {
    name: 'revenue',
    type: 'line',
    data: [13, 15, 25, 17, 19, 22, 11, 10, 9, 22],
    dataLabels: {
        enabled: false,
    },
}]
export const SalesRevenueOptions = {
    chart: {
        height: 320,
        type: 'line',
        dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 0,
            left: 0,
            blur: 4,
            color: ["rgba(255,255,255,0)", "rgb(215, 124, 247)"],
            opacity: 0.4,
        },
        toolbar: {
            show: false,
        }
    },
    dataLabels: {
        enabled: true,
        enabledOnSeries: [0],
        background: {
            enabled: false,
            foreColor: '#fff',
        },
        formatter: function (val:any) {
            return val + "%";
        },
        offsetY: -10,
        style: {
            fontSize: '12px',
            colors: ["#8c9097"]
        }
    },
    stroke: {
        curve: 'smooth',
        width: [0, 2],
    },
    plotOptions: {
        bar: {
            columnWidth: "40%",
            borderRadius: 3,
        }
    },

    colors: ["rgb(215, 124, 247)", "rgb(12, 215, 177)"],
    fill: {
        type: "gradient",
        gradient: {
            shade: "dark",
            type: "vertical",
            shadeIntensity: 0,
            inverseColors: false,
            gradientToColors: ["rgba(84, 109, 254)"],
            opacityFrom: [0.9, 1],
            opacityTo: [0.9, 1],
            stops: [0, 90, 100]
        }
    },
    labels: ['1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8', '1.9', '2.0'],
    yaxis: [{

    }, {
        opposite: true,
    }],
}

/* Sales Revenue1 */
export const SalesRevenueSeries1 = [{
    name: "Sales Revenue",
    data: [20, 15, 38, 20, 24, 19, 53, 19, 21, 18, 36, 18, 60, 20]
}]
export const SalesRevenueOptions1 = {
    chart: {
        height: 320,
        type: 'line',
        zoom: {
            enabled: false
        },
        dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 2,
            left: 0,
            blur: 6,
            color: 'rgb(244, 167, 66)',
            opacity: 0.8
        },
        toolbar: { show: false }
    },
    dataLabels: {
        enabled: false
    },
    legend: {
        show: true,
        position: "top",
        offsetX: 0,
        offsetY: 8,
        markers: {
            width: 5,
            height: 5,
            strokeWidth: 0,
            strokeColor: '#fff',
            fillColors: undefined,
            radius: 12,
            customHTML: undefined,
            onClick: undefined,
            offsetX: 0,
            offsetY: 0
        },
    },
    stroke: {
        curve: 'smooth',
        width: '2',
    },
    grid: {
        borderColor: '#f5f4f4',
        strokeDashArray: 3
    },
    colors: ["rgb(244, 167, 66)"],
    yaxis: {
        labels: {
            formatter: function (y:any) {
                return y.toFixed(0) + "";
            }
        }
    },
    xaxis: {
        type: 'week',
        categories: ['0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1', '1.1', '1.2', '1.3', '1.4'],
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

/* Sales Revenue2 */
export const SalesRevenueSeries2 = [
    {
        name: "Sales",
        data: [15, 30, 22, 49, 32, 45, 30, 45, 65, 45, 25, 45],
    },
    {
        name: "Refunds",
        data: [-8, -40, -15, -32, -45, -30, -20, -35, -28, -43, -30, -40],
    }
]
export const SalesRevenueOptions2 = {
    chart: {
        type: "line",
        height: 300,
        toolbar: {
            show: false
        },
    },
    colors: [
        "rgba(var(--primary-rgb))",
        "rgb(215, 124, 247)",
    ],
    markers: {
        size: 3,
    },
    dataLabels: {
        enabled: false,
    },
    legend: {
        show: true,
        position: "top",
        offsetX: 0,
        offsetY: 8,
        markers: {
            width: 5,
            height: 5,
            strokeWidth: 0,
            strokeColor: '#fff',
            fillColors: undefined,
            radius: 12,
            customHTML: undefined,
            onClick: undefined,
            offsetX: 0,
            offsetY: 0
        },
    },
    stroke: {
        curve: 'stepline',
        width: [2, 2],
        lineCap: 'round',
    },
    grid: {
        borderColor: "#edeef1",
        strokeDashArray: 2,
    },
    yaxis: {
        axisBorder: {
            show: true,
            color: "rgba(215, 124, 247, 0.05)",
            offsetX: 0,
            offsetY: 0,
        },
        axisTicks: {
            show: true,
            borderType: "solid",
            color: "rgba(215, 124, 247, 0.05)",
            width: 6,
            offsetX: 0,
            offsetY: 0,
        },
    },
    xaxis: {
        type: "month",
        categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "sep",
            "oct",
            "nov",
            "dec",
        ],
        axisBorder: {
            show: false,
            color: "rgba(215, 124, 247, 0.05)",
            offsetX: 0,
            offsetY: 0,
        },
        axisTicks: {
            show: false,
            borderType: "solid",
            color: "rgba(215, 124, 247, 0.05)",
            width: 6,
            offsetX: 0,
            offsetY: 0,
        },
        labels: {
            rotate: -90,
        },
    },
}

// ACTIVE CUSTOMERS
export const ActiveCustomersSeries = [90, 80]
export const ActiveCustomersOptions = {
    chart: {
        height: 250,
        type: 'radialBar',
    },
    plotOptions: {
        radialBar: {
            startAngle: -180,
            endAngle: 180,
            hollow: {
                margin: 10,
                size: '70%',
            },
            dataLabels: {
                name: {
                    fontSize: '25px',
                },
                value: {
                    fontSize: '16px',
                },
                total: {
                    show: true,
                    label: 'Total',
                    formatter: function (_w:any) {
                        // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                        return 249
                    }
                }
            }
        }
    },
    stroke: {
        dashArray: 4
    },
    colors: [
        "rgba(var(--primary-rgb))",
        "rgb(215, 124, 247)",
    ],
    labels: ['Female', 'Male'],
}

// TOP SALES
export const TopSalesSeries = [{
    name: 'Sales',
    data: [0, 44, 42, 57, 86, 86, 57, 42, 44, 34, 64, 55],
},
{
    name: 'Revenue',
    data: [0, 34, 22, 37, 56, 56, 37, 22, 34, 25, 34, 42],
}
]
export const TopSalesOptions = {
    chart: {
        stacked: true,
        type: 'area',
        height: 330,
        toolbar: {
            show: false,
        },
        dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 7,
            left: 1,
            blur: 3,
            color: ["#000", "#000"],
            opacity: 0.1
        },
    },
    grid: {
        show: false,
        borderColor: '#f2f6f7',
    },
    colors: ["rgb(215, 124, 247)", "rgba(var(--primary-rgb))"],
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
                        color: "rgba(215, 124, 247,0.05)",
                        opacity: 1
                    },
                    {
                        offset: 75,
                        color: "rgba(215, 124, 247,0.05)",
                        opacity: 1
                    },
                    {
                        offset: 100,
                        color: "rgba(215, 124, 247,0.05)",
                        opacity: 1
                    }
                ],
                [
                    {
                        offset: 0,
                        color: "rgba(var(--primary-rgb),0.05)",
                        opacity: 1
                    },
                    {
                        offset: 75,
                        color: "rgba(var(--primary-rgb),0.05)",
                        opacity: 1
                    },
                    {
                        offset: 100,
                        color: "rgba(var(--primary-rgb),0.05)",
                        opacity: 1
                    }
                ]
            ]
        }
    },
    stroke: {
        curve: 'smooth',
        width: [1.5, 1.5],
        lineCap: 'round',
    },
    dataLabels: {
        enabled: false,
    },
    legend: {
        show: true,
        position: "bottom",
        offsetX: 0,
        offsetY: 8,
        markers: {
            width: 8,
            height: 8,
            strokeWidth: 0,
            strokeColor: '#fff',
            fillColors: undefined,
            radius: 12,
            customHTML: undefined,
            onClick: undefined,
            offsetX: 0,
            offsetY: 0
        },
    },
    yaxis: {
        Show: true,
        labels: {
            show: true,
        }
    },
    xaxis: {
        show: false,
        type: 'day',
        categories: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
        axisBorder: {
            show: false,
            color: 'rgba(119, 119, 142, 0.05)',
            offsetX: 0,
            offsetY: 0,
        },
    }
}

const sealsicon = <svg className="!fill-primary" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M224,200h-8V40a8,8,0,0,0-8-8H152a8,8,0,0,0-8,8V80H96a8,8,0,0,0-8,8v40H48a8,8,0,0,0-8,8v64H32a8,8,0,0,0,0,16H224a8,8,0,0,0,0-16ZM160,48h40V200H160ZM104,96h40V200H104ZM56,144H88v56H56Z"></path></svg>
const Profiticon = <svg className="!fill-warning" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"> </path></svg>
const Revenueicon = <svg className="!fill-success" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,72v41.61A184,184,0,0,1,128,136a184.07,184.07,0,0,1-88-22.38V72Zm0,128H40V131.64A200.19,200.19,0,0,0,128,152a200.25,200.25,0,0,0,88-20.37V200ZM104,112a8,8,0,0,1,8-8h32a8,8,0,0,1,0,16H112A8,8,0,0,1,104,112Z"></path></svg>
const Customersicon = <svg className="!fill-orangemain" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm40-68a28,28,0,0,1-28,28h-4v8a8,8,0,0,1-16,0v-8H104a8,8,0,0,1,0-16h36a12,12,0,0,0,0-24H116a28,28,0,0,1,0-56h4V72a8,8,0,0,1,16,0v8h16a8,8,0,0,1,0,16H116a12,12,0,0,0,0,24h24A28,28,0,0,1,168,148Z"></path></svg>
const TotalSalesicon = <svg className="!fill-primary" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"> <path d="M224,200h-8V40a8,8,0,0,0-8-8H152a8,8,0,0,0-8,8V80H96a8,8,0,0,0-8,8v40H48a8,8,0,0,0-8,8v64H32a8,8,0,0,0,0,16H224a8,8,0,0,0,0-16ZM160,48h40V200H160ZM104,96h40V200H104ZM56,144H88v56H56Z"> </path></svg>
const TotalRevenue = <svg className="!fill-secondary" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,72v41.61A184,184,0,0,1,128,136a184.07,184.07,0,0,1-88-22.38V72Zm0,128H40V131.64A200.19,200.19,0,0,0,128,152a200.25,200.25,0,0,0,88-20.37V200ZM104,112a8,8,0,0,1,8-8h32a8,8,0,0,1,0,16H112A8,8,0,0,1,104,112Z"></path></svg>
const TotalCustomers = <svg className="!fill-success" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"></path></svg>
const TotalProfit = <svg className="!fill-info" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm40-68a28,28,0,0,1-28,28h-4v8a8,8,0,0,1-16,0v-8H104a8,8,0,0,1,0-16h36a12,12,0,0,0,0-24H116a28,28,0,0,1,0-56h4V72a8,8,0,0,1,16,0v8h16a8,8,0,0,1,0,16H116a12,12,0,0,0,0,24h24A28,28,0,0,1,168,148Z"></path></svg>





const ChartGradientSettings = {
    Sales: {
        colorStops: [
            { offset: 0, color: "rgba(var(--primary-rgb))", opacity: 1 },
            { offset: 100, color: "rgb(215, 124, 247)", opacity: 1 },
        ],
    },
    Profit: {
        colorStops: [
            { offset: 0, color: "rgb(244, 167, 66)", opacity: 1 },
            { offset: 100, color: "rgb(187, 164, 44)", opacity: 1 },
        ],
    },
    Revenue: {
        gradientToColors: ["rgb(12, 215, 177)"],
        colorStops: [
            { offset: 0, color: "rgb(12, 215, 177)", opacity: 1 },
            { offset: 100, color: "rgb(0, 142, 203)", opacity: 1 },
        ],
    },
    Customers: {
        colorStops: [
            { offset: 0, color: "rgb(254, 124, 88)", opacity: 1 },
            { offset: 100, color: "rgb(245, 97, 130)", opacity: 1 },
        ],
    },
    TotalSales: {
        gradientToColors: ['rgba(var(--primary-rgb))'],
        colorStops: [
            { offset: 0, color: "rgba(var(--primary-rgb))", opacity: 0.01 },
            { offset: 90, color: "rgba(var(--primary-rgb))", opacity: 0.8 }
        ]
    },
    Revenuecolor: {
        colorStops: [
            {
                offset: 0,
                color: "rgb(190, 114, 230)",
                opacity: 0.01
            },
            {
                offset: 90,
                color: "rgb(190, 114, 230)",
                opacity: 0.8
            }
        ]
    },
    Customerscolor: {
        colorStops: [
            {
                offset: 0,
                color: "rgb(12, 215, 177)",
                opacity: 0.01
            },
            {
                offset: 90,
                color: "rgb(12, 215, 177)",
                opacity: 0.8
            }
        ]
    },
    Profitcolor: {
        colorStops: [
            {
                offset: 0,
                color: "rgb(254, 124, 88)",
                opacity: 0.01
            },
            {
                offset: 90,
                color: "rgb(254, 124, 88)",
                opacity: 0.8
            }
        ]
    },
    Income: {
        colorStops: [
            {
                offset: 0,
                color: "rgb(12, 163, 231)",
                opacity: 0.01
            },
            {
                offset: 90,
                color: "rgb(12, 163, 231)",
                opacity: 0.8
            }
        ]
    },
}



export const widgets = [
    { title: "Number Of Sales", count: "12,432", svgIcon: sealsicon, svgIconBg: "primary", chartId: "chart-1", text: "8", icon: "down", chartOptions: TotalSalesOptions({ color: 'rgba(var(--primary-rgb))', gradientSettings: ChartGradientSettings.Sales }), chartSeries: TotalSalesSeries },
    { title: "Profit By Sale", count: "$5,472", svgIcon: Profiticon, svgIconBg: "warning", chartId: "chart-2", text: "9", icon: "up", chartOptions: TotalSalesOptions({ color: 'rgba(var(--primary-rgb))', gradientSettings: ChartGradientSettings.Profit }), chartSeries: TotalSalesSeries },
    { title: "Total Revenue", count: "$1,24,624", svgIcon: Revenueicon, svgIconBg: "success", chartId: "chart-3", text: "7", icon: "down", chartOptions: TotalSalesOptions({ color: 'rgba(var(--primary-rgb))', gradientSettings: ChartGradientSettings.Revenue }), chartSeries: TotalSalesSeries },
    { title: "Total Customers", count: "1,032", svgIcon: Customersicon, svgIconBg: "orangemain", chartId: "chart-4", text: "6", icon: "down", chartOptions: TotalSalesOptions({ color: 'rgba(var(--primary-rgb))', gradientSettings: ChartGradientSettings.Customers }), chartSeries: TotalSalesSeries },
]

export const widgetsRow3 = [
    { svgIcon: "bar-chart-box-line", svgIconBg: "primary", title: "Total Sales", price: "42,312 ", badgeText: "+1.64%", badgeColor: "success", icon: "up", chartOptions: SalesOptions({ color: 'rgba(var(--primary-rgb))', gradientSettings: ChartGradientSettings.TotalSales }), chatrSeries: SalesSeries },
    { svgIcon: "wallet-3-line", svgIconBg: "secondary", title: "Revenue", price: "$1,24,328", badgeText: "+0.52%", badgeColor: "success", icon: "up", chartOptions: SalesOptions({ color: 'rgb(215, 124, 247)', gradientSettings: ChartGradientSettings.Revenuecolor }), chatrSeries: SalesSeries },
    { svgIcon: "group-line", svgIconBg: "success", title: "Customers", price: "3,25,366", badgeText: "-4.56%", badgeColor: "danger", icon: "down", chartOptions: SalesOptions({ color: 'rgb(12, 215, 177)', gradientSettings: ChartGradientSettings.Customerscolor }), chatrSeries: SalesSeries },
    { svgIcon: "money-dollar-circle-line", svgIconBg: "orangemain", title: "Profit", price: "$0.34M", badgeText: "+2.5%", badgeColor: "success", icon: "up", chartOptions: SalesOptions({ color: 'rgb(254, 124, 88)', gradientSettings: ChartGradientSettings.Profitcolor }), chatrSeries: SalesSeries },
    { svgIcon: "currency-line", svgIconBg: "info", title: "Income", price: "$1.2M", badgeText: "+0.45%", badgeColor: "success", icon: "up", chartOptions: SalesOptions({ color: 'rgb(12, 163, 231)', gradientSettings: ChartGradientSettings.Income }), chatrSeries: SalesSeries },
]

export const widgetsRow4 = [
    { icon: TotalSalesicon, iconbg: "primary", title: "Total Sales", price: "12,432", chartOptions: TotalOptions, chartSeries: TotalSeries },
    { icon: TotalRevenue, iconbg: "secondary", title: "Total Revenue", price: "$9,432", chartOptions: TotalOptions, chartSeries: TotalRevenuesSeries },
    { icon: TotalCustomers, iconbg: "success", title: "Total Customers", price: "3,132", chartOptions: TotalOptions, chartSeries: TotalCustomerSeries },
    { icon: TotalProfit, iconbg: "info", title: "Total Profit", price: "$5,325", chartOptions: TotalOptions, chartSeries: TotalSeries },
]


