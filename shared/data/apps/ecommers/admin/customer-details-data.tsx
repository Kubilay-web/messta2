// ORDER SUMMARY
export const OrderSummarySeries = [
    {
        name: 'Total Orders',
        type: 'column',
        data: [23, 17, 22, 27, 13, 22, 37, 21, 44, 22, 45, 35]
    },
    {
        name: 'Delivered Orders',
        type: 'column',
        data: [17, 12, 18, 23, 10, 17, 25, 18, 35, 18, 37, 28]
    },
    {
        name: 'Cancelled Orders',
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


// RECENT ORDERS
export const RecentOrders = [
    {
        id: "#19876",
        productName: "Flower Pot",
        productsrc: "../../../../assets/images/ecommerce/jpg/1.jpg",
        orderDate: "09 Jan 2022",
        paymentMode: "Cash On Delivery",
        cost: "$76.00",
        status: "Shipped",
        statusClass: "success"
    },
    {
        id: "#19376",
        productName: "Kiwi Fruit",
        productsrc: "../../../../assets/images/ecommerce/jpg/4.jpg",
        orderDate: "12 Feb 2022",
        paymentMode: "Online Payment",
        cost: "$13.00",
        status: "Pending",
        statusClass: "warning"
    },
    {
        id: "#19878",
        productName: "Camera",
        productsrc: "../../../../assets/images/ecommerce/jpg/3.jpg",
        orderDate: "23 Mar 2022",
        paymentMode: "Cash On Delivery",
        cost: "$54.00",
        status: "Shipped",
        statusClass: "success"
    },
    {
        id: "#19879",
        productName: "Donut",
        productsrc: "../../../../assets/images/ecommerce/jpg/5.jpg",
        orderDate: "17 Aug 2022",
        paymentMode: "Online Payment",
        cost: "$87.00",
        status: "Cancelled",
        statusClass: "danger"
    },
    {
        id: "#19880",
        productName: "Head Phones",
        productsrc: "../../../../assets/images/ecommerce/jpg/2.jpg",
        orderDate: "21 Oct 2022",
        paymentMode: "Cash On Delivery",
        cost: "$78.00",
        status: "Shipped",
        statusClass: "success"
    }
];

export const stats = [
    {
        title: 'Total Orders',
        count: '14,732',
        link: '#!',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="!fill-white !text-white" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M216,64H176a48,48,0,0,0-96,0H40A16,16,0,0,0,24,80V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V80A16,16,0,0,0,216,64ZM128,32a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm88,168H40V80H80V96a8,8,0,0,0,16,0V80h64V96a8,8,0,0,0,16,0V80h40Z"></path></svg>
            ),
        bgColor: 'primary',
        textClass: 'text-[1.5rem] mb-0 flex-grow !text-dark font-medium',
    },
    {
        title: 'Total Wishlist',
        count: '34,732',
        link: '#!',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="!fill-white !text-white" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><path d="M128,224S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32a54,54,0,0,1,54,54C232,168,128,224,128,224Z" opacity="0.2" /><path d="M128,224S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32a54,54,0,0,1,54,54C232,168,128,224,128,224Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>

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
      trend1: 'success',
      trendborder:"border-success/10",
      trendIcon: ' ti ti-caret-up',
      svgicon:(
        <svg className="!fill-success !text-success" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M4 6h16v2H4zm2-4h12v2H6zm14 8H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zm0 10H4v-8h16v8zm-10-7.27v6.53L16 16z" /></svg>

      )
    },
    {
      title: 'Products in Cart',
      count: '1,468',
      percentage: '-0.153%',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="!fill-white !text-white" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" /></svg>
        ),
      trend: 'orange',
      trend1: 'orangemain',
      trendborder:"border-orangemain/10",
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
      trend1: 'info',
      trendborder:"border-info/10",
      trendIcon: 'ri-arrow-down-s-fill',
      svgicon:(
        <svg className="!fill-info !text-info" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" /></svg>

      )
    },
  ];
