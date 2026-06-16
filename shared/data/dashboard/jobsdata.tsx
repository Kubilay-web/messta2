/* application statistics */
export const ApplicationStatisticsSeries = [{
    name: 'Total Applications',
    data: [44, 55, 41, 67, 42, 22, 43, 21, 41, 56, 27, 43]
}, {
    name: 'Rejected',
    data: [30, 25, 46, 28, 21, 45, 35, 64, 52, 59, 36, 39]
}, {
    name: 'Shortlisted',
    data: [23, 11, 22, 35, 17, 28, 22, 37, 21, 44, 22, 30]
},]
export const ApplicationStatisticsOptions = {
    chart: {
        height: 330,
        type: 'area',
        toolbar: {
            show: false,
        }
    },
    grid: {
        show: false,
        borderColor: '#fff',
        padding: {
            bottom: -10
        },
        enabled: false
    },
    dataLabels: {
        enabled: false
    },
    legend: {
        position: 'top',
        fontFamily: "Montserrat",
    },
    colors: ["rgb(12, 215, 177)", "rgb(215, 124, 247)", "rgba(var(--primary-rgb))"],
    stroke: {
        width: [0, 0, 0],
        curve: 'smooth',
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
                        color: 'rgba(12, 215, 177, 0.6)',
                        opacity: 1
                    },
                    {
                        offset: 85,
                        color: 'rgba(12, 215, 177, 0.6)',
                        opacity: 0.1
                    },
                    {
                        offset: 100,
                        color: 'rgba(255, 255, 255, 0.1)',
                        opacity: 1
                    }
                ],
                [
                    {
                        offset: 0,
                        color: 'rgba(215, 124, 247, 0.6)',
                        opacity: 1
                    },
                    {
                        offset: 85,
                        color: 'rgba(215, 124, 247, 0.6)',
                        opacity: 0.1
                    },
                    {
                        offset: 100,
                        color: 'rgba(255, 255, 255, 0.1)',
                        opacity: 1
                    }
                ],
                [
                    {
                        offset: 0,
                        color: "rgba(var(--primary-rgb),0.6)",
                        opacity: 50
                    },
                    {
                        offset: 85,
                        color: "rgba(var(--primary-rgb),0.6)",
                        opacity: 0.1
                    },
                    {
                        offset: 100,
                        color: 'rgba(255, 255, 255, 0.1)',
                        opacity: 0.1
                    }
                ],
            ]
        }
    },
    yaxis: {
        min: 0,
        max: 80,
    },
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    tooltip: {
        shared: true,
        theme: "dark",
    }
}

/* job statistics */
export const JobStatisticsSeries = [{
    name: 'Male',
    data: [20, 30, 40, 80, 20, 80],
}, {
    name: 'Female',
    data: [44, 76, 78, 13, 43, 10],
}]
export const JobStatisticsOptions = {
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
    plotOptions: {
        radar: {
            size: 80,
            polygons: {
                fill: {
                    colors: ['rgba(var(--primary-rgb),0.05)', 'rgba(var(--primary-rgb),0.1)']
                },

            }
        }
    },
    colors: ["rgba(var(--primary-rgb),0.8)", "rgba(215, 124, 247, 0.8)"],
    stroke: {
        width: 0
    },
    fill: {
        opacity: 0.1
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
            width: 7,
            height: 7,
            strokeWidth: 0,
            strokeColor: '#fff',
            fillColors: undefined,
            radius: 7,
            offsetX: 0,
            offsetY: 0
        },
    },
    markers: {
        size: 0
    },
    xaxis: {
        categories: ['2011', '2012', '2013', '2014', '2015', '2016']
    },
    yaxis: {
        min: 0,
        max: 80,
        tickAmount: 4,
        labels: {
            formatter: function (val: any, i: any) {
                if (i % 5 === 0) {
                    return val;
                }
            }
        }
    }
}

/* total revenue */
export const TotalRevenueSeries = [
    {
        name: "Income",
        data: [44, 42, 57, 86, 58, 55, 70],
    },
    {
        name: "Expenses",
        data: [-34, -22, -37, -56, -21, -35, -60],
    },
]
export const TotalRevenueOptions = {
    chart: {
        stacked: true,
        type: "bar",
        height: 263,
        fontFamily: "Poppins, sans-serif",
        toolbar: {
            show: false,
        },
    },
    grid: {
        borderColor: "#f1f1f1",
        strokeDashArray: 2,
    },
    colors: ["rgba(var(--primary-rgb))", "rgba(215, 124, 247, 1)"],
    plotOptions: {
        bar: {
            columnWidth: "40%",
            borderRadius: [5],
            borderRadiusWhenStacked: "all",
        },
    },
    stroke: {
        width: [5, 5]
    },
    dataLabels: {
        enabled: false,
    },
    legend: {
        show: true,
        position: "top",
    },
    yaxis: {
        show: false,
        title: {
            text: undefined,
        },
        labels: {
            formatter: function (y: any) {
                return y.toFixed(0) + "";
            },
        },
    },
    xaxis: {
        show: false,
        type: "week",
        categories: [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun",
        ],
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
        labels: {
            show: true,
            style: {
                colors: "#d4d7d9",
                fontSize: "10px",
                fontWeight: 500,
            },
        },
    },
    tooltip: {
        enabled: true,
        shared: true,
        intersect: false,
        theme: "dark",
        x: {
            show: false,
        },
    }
}

// TOP HIRING COMPANIES
export const TopHiring = [
    {
        id: 1,
        name: "Nucleus OP",
        logo: "../../assets/images/company-logos/10.png",
        vacancies: "0",
        hired: "235",
        subscription: "Starter",
        subscriptionColor: "primary",
        textColor: "white"
    },
    {
        id: 2,
        name: "Data SC",
        logo: "../../assets/images/company-logos/7.png",
        vacancies: "15",
        hired: "2",
        subscription: "Pro",
        subscriptionColor: "info",
        textColor: "white"
    },
    {
        id: 3,
        name: "Delooit XP",
        logo: "../../assets/images/company-logos/6.png",
        vacancies: "773",
        hired: "114",
        subscriptionColor: "light",
        textColor: ""
    },
    {
        id: 4,
        name: "Tech IP",
        logo: "../../assets/images/company-logos/2.png",
        vacancies: "23",
        hired: "14",
        subscription: "Premium",
        subscriptionColor: "danger",
        textColor: "white"
    },
    {
        id: 5,
        name: "LogoTech",
        logo: "../../assets/images/company-logos/1.png",
        vacancies: "45",
        hired: "23",
        subscription: "Expired",
        subscriptionColor: "light",
        textColor: "default"
    },
]

// PENDING REQUEST APPROVALS
export const PendingRequest = [
    {
        id: 1,
        icon: "global-line",
        iconColor: "primary",
        position: "DotNet Developer",
        experience: "02 Years",
        department: "Development",
        departmentColor: "primary",
        status: "Open",
        statusColor: "light",
        vacancies: "12",
        applyDate: "14.10.2024",
    },
    {
        id: 2,
        icon: "exchange-funds-line",
        iconColor: "secondary",
        position: "Graphic Designer",
        experience: "05 Years",
        department: "Designing",
        departmentColor: "secondary",
        status: "Closed",
        statusColor: "light",
        vacancies: "24",
        applyDate: "10.08.2024",
    },
    {
        id: 3,
        icon: "honor-of-kings-line",
        iconColor: "success",
        position: "Java Developer",
        experience: "0 Years",
        department: "Customer Support",
        departmentColor: "success",
        status: "Open",
        statusColor: "light",
        vacancies: "08",
        applyDate: "16.12.2024",
    },
    {
        id: 4,
        icon: "a-b",
        iconColor: "info",
        position: "QA Tester",
        experience: "04 Years",
        department: "Quality Analysis",
        departmentColor: "orangemain",
        status: "Open",
        statusColor: "light",
        vacancies: "26",
        applyDate: "05.11.2024",
    },
    {
        id: 5,
        icon: "exchange-funds-line",
        iconColor: "danger",
        position: "Graphic Designer",
        experience: "05 Years",
        department: "Marketing",
        departmentColor: "info",
        status: "Closed",
        statusColor: "light",
        vacancies: "24",
        applyDate: "10.08.2024",
    }
];


export const cardData = [
    {
        title: 'Total Jobs',
        value: '4,676',
        change: '0.67%',
        changeClass: 'text-success',
        changeIcon: "ti-arrow-narrow-up",
        iconClass: 'primary',
        iconBorderClass: 'primary',
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="!fill-white !text-white" viewBox="0 0 256 256"> <rect width="256" height="256" fill="none"></rect> <path d="M128,144a191.14,191.14,0,0,1-96-25.68h0V200a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V118.31A191.08,191.08,0,0,1,128,144Z" opacity="0.2"></path> <line x1="112" y1="112" x2="144" y2="112" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line> <rect x="32" y="64" width="192" height="144" rx="8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></rect> <path d="M168,64V48a16,16,0,0,0-16-16H104A16,16,0,0,0,88,48V64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path> <path d="M224,118.31A191.09,191.09,0,0,1,128,144a191.14,191.14,0,0,1-96-25.68" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path> </svg>),
        bgClass: 'primary'
    },
    {
        title: 'Total Applications',
        value: '1.23K',
        change: '1.95%',
        changeClass: 'text-success',
        iconClass: 'secondary',
        changeIcon: "ti-arrow-narrow-up",
        iconBorderClass: 'secondary',
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="!fill-white !text-white" viewBox="0 0 256 256"> <rect width="256" height="256" fill="none"></rect> <rect x="53.87" y="34.21" width="148.27" height="187.59" rx="8" transform="translate(24.22 -20.31) rotate(10.02)" opacity="0.2"></rect> <rect x="53.87" y="34.21" width="148.27" height="187.59" rx="8" transform="translate(24.22 -20.31) rotate(10.02)" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></rect> <line x1="97.22" y1="59.81" x2="180.2" y2="74.47" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line> <line x1="174.66" y1="105.98" x2="91.67" y2="91.33" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line> <line x1="127.62" y1="130.17" x2="86.13" y2="122.84" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line> </svg>),
        bgClass: 'secondary'
    },
    {
        title: 'Total Recruiters',
        value: '1,342',
        change: '4.45%',
        changeClass: 'text-danger',
        iconClass: 'success',
        changeIcon: "ti-arrow-narrow-down",
        iconBorderClass: 'success',
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="!fill-white !text-white" viewBox="0 0 256 256"> <rect width="256" height="256" fill="none"></rect> <path d="M205.31,71.08a16,16,0,0,1-20.39-20.39A96,96,0,0,0,63.8,199.38h0A72,72,0,0,1,128,160a40,40,0,1,1,40-40,40,40,0,0,1-40,40,72,72,0,0,1,64.2,39.37A96,96,0,0,0,205.31,71.08Z" opacity="0.2"></path> <line x1="200" y1="40" x2="200" y2="28" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line> <circle cx="200" cy="56" r="16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle> <line x1="186.14" y1="48" x2="175.75" y2="42" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line> <line x1="186.14" y1="64" x2="175.75" y2="70" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line> <line x1="200" y1="72" x2="200" y2="84" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line> <line x1="213.86" y1="64" x2="224.25" y2="70" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line> <line x1="213.86" y1="48" x2="224.25" y2="42" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line> <circle cx="128" cy="120" r="40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle> <path d="M63.8,199.37a72,72,0,0,1,128.4,0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path> <path d="M222.67,112A95.92,95.92,0,1,1,144,33.33" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path> </svg>),
        bgClass: 'success'
    },
    {
        title: 'Recruitments',
        value: '2,546',
        change: '1.56%',
        changeClass: 'text-success',
        iconClass: 'orange',
        changeIcon: "ti-arrow-narrow-up",
        iconBorderClass: 'orangemain',
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="!fill-white !text-white" viewBox="0 0 256 256"> <rect width="256" height="256" fill="none"></rect> <path d="M54.46,201.54c-9.2-9.2-3.1-28.53-7.78-39.85C41.82,150,24,140.5,24,128s17.82-22,22.68-33.69C51.36,83,45.26,63.66,54.46,54.46S83,51.36,94.31,46.68C106.05,41.82,115.5,24,128,24S150,41.82,161.69,46.68c11.32,4.68,30.65-1.42,39.85,7.78s3.1,28.53,7.78,39.85C214.18,106.05,232,115.5,232,128S214.18,150,209.32,161.69c-4.68,11.32,1.42,30.65-7.78,39.85s-28.53,3.1-39.85,7.78C150,214.18,140.5,232,128,232s-22-17.82-33.69-22.68C83,204.64,63.66,210.74,54.46,201.54Z" opacity="0.2"></path> <path d="M54.46,201.54c-9.2-9.2-3.1-28.53-7.78-39.85C41.82,150,24,140.5,24,128s17.82-22,22.68-33.69C51.36,83,45.26,63.66,54.46,54.46S83,51.36,94.31,46.68C106.05,41.82,115.5,24,128,24S150,41.82,161.69,46.68c11.32,4.68,30.65-1.42,39.85,7.78s3.1,28.53,7.78,39.85C214.18,106.05,232,115.5,232,128S214.18,150,209.32,161.69c-4.68,11.32,1.42,30.65-7.78,39.85s-28.53,3.1-39.85,7.78C150,214.18,140.5,232,128,232s-22-17.82-33.69-22.68C83,204.64,63.66,210.74,54.46,201.54Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path> <polyline points="88 136 112 160 168 104" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></polyline> </svg>),
        bgClass: 'orangemain'
    }
];