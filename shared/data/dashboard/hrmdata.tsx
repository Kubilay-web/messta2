/* total employees */
export const EmployeesSeries = [{
    data: [98, 110, 80, 145, 105, 112, 87, 148, 102]
}]
export const EmployeesOptions: any = ({ color, gradientSettings }: any) => ({
    chart: {
        height: 50,
        type: 'area',
        fontFamily: 'Montserrat, sans-serif',
        foreColor: '#5d6162',
        zoom: {
            enabled: false
        },
        sparkline: {
            enabled: true
        }
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
        curve: 'smooth',
        width: [1.5],
    },
    fill: {
        type: 'gradient',
        gradient: {
            opacityFrom: 0.5,
            opacityTo: 0.2,
            stops: [0, 60],
            colorStops: gradientSettings.colorStops,
            // colorStops: [
            //     [
            //         {
            //             offset: 0,
            //             color: 'rgba(var(--primary-rgb),0.1)',
            //             opacity: 1
            //         },
            //         {
            //             offset: 60,
            //             color: 'rgba(var(--primary-rgb),0.1)',
            //             opacity: 1
            //         }
            //     ],
            // ]
        },
    },
    title: {
        text: undefined,
    },
    grid: {
        borderColor: 'transparent',
    },
    yaxis: {
        min: 50,
    },
    xaxis: {
        crosshairs: {
            show: false,
        }
    },
    colors: [color]
    // colors: ["rgba(var(--primary-rgb))"],
})

/* subscriptions overview */
export const SubscriptionsOverviewSries = [
    {
        name: "Starter",
        data: [44, 55, 41, 42, 22, 43, 21],
    },
    {
        name: "Pro",
        data: [33, 21, 32, 37, 23, 32, 47],
    },
    {
        name: "Premium",
        data: [30, 25, 36, 30, 45, 35, 64],
    },
]
export const SubscriptionsOverviewOptions = {
    chart: {
        type: "bar",
        height: 345,
        fontFamily: "Montserrat, sans-serif",
        foreColor: "#d4d7d9",
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: true,
        },
    },
    grid: {
        borderColor: "#f1f1f1",
        strokeDashArray: 2,
    },
    dataLabels: {
        enabled: false,
    },
    legend: {
        show: true,
        position: "top",
    },
    tooltip: {
        enabled: true,
        theme: "dark",
        shared: true,
        intersect: false,
    },
    colors: ["rgba(var(--primary-rgb),0.8)", "rgba(var(--primary-rgb),0.5)", "rgba(var(--primary-rgb),0.2)"],
    labels: [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ],
    plotOptions: {
        bar: {
            columnWidth: "60%",
            borderRadius: 2,
        },
    },
    yaxis: {
        show: false
    },
    xaxis: {
        show: false,

        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false
        }
    }
}


/* working format */
export const FormatSries = [44, 55, 67]
export const FormatOptions = {
    chart: {
        height: 240,
        type: 'radialBar',
    },
    plotOptions: {
        radialBar: {
            dataLabels: {
                name: {
                    fontSize: '22px',
                    offsetY: 0
                },
                value: {
                    fontSize: '14px',
                    offsetY: 5
                },
                total: {
                    show: true,
                    label: 'Total',
                    formatter: function (w:any) {
                        return 249
                    }
                }
            }
        }
    },
    stroke: {
        lineCap: 'round'
    },
    grid: {
        padding: {
            bottom: -10,
            top: -10
        }
    },
    colors: ["rgba(var(--primary-rgb))", "rgba(215, 124, 247, 1)", "rgba(12, 215, 177, 1)"],
    labels: ['From Office', 'From Home', 'Remote'],
}

const ChartGradientSettings = {
    totalFollowers: {
        colorStops: [
            { offset: 0, color: "rgba(var(--primary-rgb),0.1)", opacity: 1 },
            { offset: 60, color: "rgba(var(--primary-rgb),0.1)", opacity: 1 },
        ],
    },
    onLeave: {
        colorStops: [
            { offset: 0, color: "rgba(215, 124, 247, 0.1)", opacity: 1 },
            { offset: 60, color: "rgba(215, 124, 247, 0.1)", opacity: 1 },
        ],
    },
    NewEmployees: {
        colorStops: [
            { offset: 0, color: "rgba(12, 215, 177, 0.1)", opacity: 1 },
            { offset: 60, color: "rgba(12, 215, 177, 0.1)", opacity: 1 },
        ],
    },
    ResignedEmployees: {
        colorStops: [
            { offset: 0, color: "rgba(254, 124, 88, 0.1)", opacity: 1 },
            { offset: 60, color: "rgba(254, 124, 88, 0.1)", opacity: 1 },
        ],
    },
};


const Employees = <svg xmlns="http://www.w3.org/2000/svg" className="!fill-white !text-white" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="84" cy="108" r="52" opacity="0.2"></circle><path d="M10.23,200a88,88,0,0,1,147.54,0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><path d="M172,160a87.93,87.93,0,0,1,73.77,40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><circle cx="84" cy="108" r="52" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle><path d="M152.69,59.7A52,52,0,1,1,172,160" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path></svg>
const OnLeaveicon = <svg xmlns="http://www.w3.org/2000/svg" className="!fill-white !text-white" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M128,32A96,96,0,0,0,63.8,199.38h0A72,72,0,0,1,128,160a40,40,0,1,1,40-40,40,40,0,0,1-40,40,72,72,0,0,1,64.2,39.37A96,96,0,0,0,128,32Z" opacity="0.2"></path><circle cx="128" cy="120" r="40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle><path d="M63.8,199.37a72,72,0,0,1,128.4,0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><line x1="176" y1="56" x2="224" y2="56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><path d="M222.67,112A95.92,95.92,0,1,1,144,33.33" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path></svg>
const NewEmployeesicon = <svg xmlns="http://www.w3.org/2000/svg" className="!fill-white !text-white" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="108" cy="100" r="60" opacity="0.2"></circle><line x1="200" y1="136" x2="248" y2="136" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><line x1="224" y1="112" x2="224" y2="160" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><circle cx="108" cy="100" r="60" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle><path d="M24,200c20.55-24.45,49.56-40,84-40s63.45,15.55,84,40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path></svg>
const ResignedEmployeesicon = <svg xmlns="http://www.w3.org/2000/svg" className="!fill-white !text-white" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="108" cy="100" r="60" opacity="0.2"></circle><line x1="200" y1="136" x2="248" y2="136" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><circle cx="108" cy="100" r="60" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle><path d="M24,200c20.55-24.45,49.56-40,84-40s63.45,15.55,84,40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path></svg>


export const cardData = [
    { svgIcon: Employees,maincolor:"primary", color: "primary", count: "13,776", icon: "up", iconColor: "success", text: "0.67%", lable: "Total Employees", chartOptions: EmployeesOptions({ color: "rgba(var(--primary-rgb))", gradientSettings: ChartGradientSettings.totalFollowers }), chartSeries: EmployeesSeries },
    { svgIcon: OnLeaveicon,maincolor:"secondary", color: "secondary", count: "545", icon: "down", iconColor: "danger", text: "2.45%", lable: "On Leave", chartOptions: EmployeesOptions({ color: "rgb(215, 124, 247)", gradientSettings: ChartGradientSettings.onLeave }), chartSeries: EmployeesSeries },
    { svgIcon: NewEmployeesicon,maincolor:"success", color: "success", count: "1,467", icon: "up", iconColor: "success", text: "1.12%", lable: "New Employees", chartOptions: EmployeesOptions({ color: "rgb(12, 215, 177)", gradientSettings: ChartGradientSettings.NewEmployees }), chartSeries: EmployeesSeries },
    { svgIcon: ResignedEmployeesicon,maincolor:"orange", color: "orangemain", count: "435", icon: "up", iconColor: "success", text: "4.98%", lable: "Resigned Employees", chartOptions: EmployeesOptions({ color: "rgb(rgb(254, 124, 88))", gradientSettings: ChartGradientSettings.ResignedEmployees }), chartSeries: EmployeesSeries },
]

// EMPLOYEE STATUS
export const EmployeeStatus = [
    {
        id:1,
        name: "John Doe",
        role: "Manager",
        status: "Active",
        statusColor: "success",
        score: "85",
        src: "../../assets/images/faces/11.jpg",
    },
    {
        id:2,
        name: "Jane Smith",
        role: "Developer",
        status: "Inactive",
        statusColor: "danger",
        score: "70",
        src: "../../assets/images/faces/8.jpg",
    },
    {
        id:3,
        name: "Alex Johnson",
        role: "HR Specialist",
        status: "Active",
        statusColor: "success",
        score: "92",
        src: "../../assets/images/faces/12.jpg",
    },
    {
        id:4,
        name: "Sarah Brown",
        role: "Analyst",
        status: "Active",
        statusColor: "success",
        score: "78",
        src: "../../assets/images/faces/5.jpg",
    },
    {
        id:5,
        name: "Robert White",
        role: "Designer",
        status: "Inactive",
        statusColor: "danger",
        score: "60",
        src: "../../assets/images/faces/10.jpg",
    },
    {
        id:6,
        name: "Emily Clark",
        role: "Accountant",
        status: "Active",
        statusColor: "success",
        score: "88",
        src: "../../assets/images/faces/1.jpg",
    },
]

// RECENT JOB REQUESTS

export const RecentJobs = [
    {
        id:1,
        checked: true,
        name: "John Doe",
        email: "johndoe213@gmail.com",
        position: "Software Engineer",
        date: "2024-02-01",
        experience: "3 years",
        skills: [{ name: "Java", color: "bg-primary/[0.15] text-primary" }, { name: "Python", color: "bg-secondary/[0.15] text-secondary" }, { name: "SQL", color: "bg-warning/[0.15] text-warning" }, { name: "Web Development", color: "bg-success/[0.15] text-success" }],
        workType: "Full-time",
        src: "../../assets/images/faces/13.jpg"
    },
    {
        id:2,
        checked: false,
        name: "Jane Smith",
        email: "janesmith767@gmail.com",
        position: "Marketing Specialist",
        date: "2024-02-03",
        experience: "5 years",
        skills: [{ name: "Social Media Marketing", color: "bg-info/[0.15] text-info" }, { name: "SEO", color: "bg-success/[0.15] text-success" }, { name: "Analytics", color: "bg-orangemain/[0.15] text-orangemain" },],
        workType: "Part-time",
        src: "../../assets/images/faces/4.jpg"
    },
    {
        id:3,
        checked: false,
        name: "Mark Johnson",
        email: "markjhonson66@gmail.com",
        position: "HR Coordinator",
        date: "2024-02-05",
        experience: "2 years",
        skills: [{ name: "Recruitment", color: "bg-light text-default border border-defaultborder dark:border-defaultborder/10" }, { name: "Employee Relations", color: "bg-secondary/[0.15] text-secondary" }],
        workType: "Contract",
        src: "../../assets/images/faces/11.jpg"
    },
    {
        id:4,
        checked: true,
        name: "Emily White",
        email: "emileywhite@gmail.com",
        position: "Data Analyst",
        date: "2024-02-08",
        experience: "4 years",
        skills: [{ name: "Data Analysis", color: "bg-tealmain/[0.15] text-tealmain" }, { name: "Python", color: "bg-secondary/[0.15] text-secondary" }, { name: "SQL", color: "bg-warning/[0.15] text-warning" }, { name: "Excel", color: "bg-greenmain/[0.15] text-greenmain" }],
        workType: "Full-time",
        src: "../../assets/images/faces/7.jpg"
    },
    {
        id:5,
        checked: false,
        name: "Alex Turner",
        email: "alexturner69@gmail.com",
        position: "Graphic Designer",
        date: "2024-02-10",
        experience: "3 years",
        skills: [{ name: "Adobe Creative Suite", color: "bg-primary/[0.15] text-primary" }, { name: "UI/UX Design", color: "bg-info/[0.15] text-info" }],
        workType: "Freelance",
        src: "../../assets/images/faces/14.jpg"
    }
];

export const leaveRequests = [
    {
      name: 'Sarah Taylor',
      leaveType: 'Casual Leave',
    },
    {
      name: 'John Doe',
      leaveType: 'Vacation Leave',
    },
    {
      name: 'Jane Smith',
      leaveType: 'Sick Leave',
    },
    {
      name: 'Robert White',
      leaveType: 'Leave On Demand',
    },
    {
      name: 'Emily Clark',
      leaveType: 'Casual Leave',
    },
    {
      name: 'Alex Johnson',
      leaveType: 'Sick Leave',
    },
  ];
 export const events = [
    {
      name: 'Office Anniversary',
      date: '19,Dec 2024 - Thursday',
      type: 'Full Day',
      category: 'general-event',
      tooltip: 'View',
      color: 'text-success',
    },
    {
      name: 'Holi',
      date: '10,Mar 2024 - Sunday',
      type: 'Festival',
      category: 'festival',
      tooltip: 'View',
      color: 'text-warning',
    },
    {
      name: 'Good Friday',
      date: '05,Apr 2024 - Friday',
      type: 'Festival',
      category: 'festival',
      tooltip: 'View',
      color: 'text-warning',
    },
    {
      name: 'Independence Day',
      date: '15,Aug 2024 - Thursday',
      type: 'Government Holiday',
      category: 'govt-holiday',
      tooltip: 'View',
      color: 'text-danger',
    },
  ];