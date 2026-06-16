/* attendance overview */
export const AttendanceOverviewSeries = [{
    name: 'Boys',
    data: [44, 42, 57, 86, 58, 55, 70],
}, {
    name: 'Girls',
    data: [-34, -22, -37, -56, -21, -35, -60],
}]
export const AttendanceOverviewOptions = {
    chart: {
        stacked: true,
        type: 'bar',
        height: 300,
        toolbar: {
            show: false
        }
    },
    grid: {
        borderColor: "#f1f1f1",
        strokeDashArray: 2,
        xaxis: {
            lines: {
                show: true
            }
        },
        yaxis: {
            lines: {
                show: false
            }
        }
    },
    colors: ["rgba(var(--primary-rgb),0.9)", "rgba(215, 124, 247, 0.9)"],
    plotOptions: {
        bar: {
            borderRadius: 5,
            borderRadiusApplication: 'end',
            borderRadiusWhenStacked: 'all',
            columnWidth: '25%',
        }
    },
    dataLabels: {
        enabled: false,
    },
    legend: {
        show: true,
        position: 'top',
        fontFamily: "Montserrat",
        markers: {
            width: 10,
            height: 10,
        }
    },
    yaxis: {
        title: {
            text: 'Attendance',
            style: {
                color: '	#adb5be',
                fontSize: '14px',
                fontFamily: 'Montserrat',
                fontWeight: 500,
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
        type: 'week',
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
        enabled: true,
        theme: "dark",
    }
}

/* overall-attendance */
export const AttendanceOverallSeries = [72, 84]
export const AttendanceOverallOptions = {
    chart: {
        height: 250,
        type: "radialBar",
    },
    colors: ["rgba(var(--primary-rgb),0.9)", "rgba(215, 124, 247, 0.9)"],
    plotOptions: {
        radialBar: {
            hollow: {
                margin: 0,
                size: "60%",
                background: "#fff",
            },
            dataLabels: {
                name: {
                    offsetY: -10,
                    color: "#4b9bfa",
                    fontSize: "16px",
                    show: false,
                },
                value: {
                    offsetY: 10,
                    color: "#4b9bfa",
                    fontSize: "22px",
                    show: true,
                },
                total: {
                    show: true,
                    label: 'Total',
                }
            },
        },
    },
    stroke: {
        lineCap: "round",
    },
}

/* earnings report */
export const EarningsSeries = [{
    name: 'Received Payments',
    type: "column",
    data: [23, 11, 22, 35, 17, 28, 22, 37, 21, 44, 22, 30]
}, {
    name: 'Pending Payments',
    type: "line",
    data: [30, 25, 36, 30, 45, 35, 64, 51, 59, 36, 39, 51]
}]

export const EarningsOptions = {
    chart: {
        fontFamily: 'Montserrat',
        height: 290,
        type: 'line',
        stacked: !1,
        toolbar: {
            show: !1
        }
    },
    grid: {
        borderColor: '#f2f6f7',
        strokeDashArray: 2,
        xaxis: {
            lines: {
                show: true
            }
        },
        yaxis: {
            lines: {
                show: false
            }
        }
    },
    dataLabels: {
        enabled: false
    },

    colors: ["rgba(var(--primary-rgb),0.9)", "rgb(215, 124, 247)"],
    stroke: {
        width: [1.5, 1.5],
        curve: ['straight', 'straight'],
        dashArray: [0, 4]
    },
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    legend: {
        show: true,
        position: 'top'
    },
    plotOptions: {
        bar: {
            columnWidth: "25%",
            borderRadius: 3
        }
    },
    tooltip: {
        enabled: true,
        theme: "dark",
    }
}


// STUDENTS MARKS
export const StudentsMarks = [
    {
        id: 1,
        rollNo: '#1116',
        name: 'Studar Little',
        class: 'IX',
        section: 'B',
        marksPercentage: '75%',
        marksGPA: '7.5',
        status: 'Pass',
        statusClass: "success",
        src: '../../assets/images/faces/2.jpg',
    },
    {
        id: 2,
        rollNo: '#8547',
        name: 'Ion Somer',
        class: 'X',
        section: 'A',
        marksPercentage: '65%',
        marksGPA: '6.5',
        status: 'Pass',
        statusClass: "success",
        src: '../../assets/images/faces/4.jpg',
    },
    {
        id: 3,
        rollNo: '#7564',
        name: 'Shakira',
        class: 'X',
        section: 'B',
        marksPercentage: '25%',
        marksGPA: '2.5',
        status: 'Fail',
        statusClass: "danger",
        src: '../../assets/images/faces/6.jpg',
    },
    {
        id: 4,
        rollNo: '#1254',
        name: 'Thomas Shelby',
        class: 'IX',
        section: 'A',
        marksPercentage: '95%',
        marksGPA: '9.5',
        status: 'Pass',
        statusClass: "success",
        src: '../../assets/images/faces/8.jpg',
    },
    {
        id: 5,
        rollNo: '#7458',
        name: 'Stefan U',
        class: 'IX',
        section: 'B',
        marksPercentage: '62%',
        marksGPA: '6.2',
        status: 'Pass',
        statusClass: "success",
        src: '../../assets/images/faces/10.jpg',
    },
    {
        id: 6,
        rollNo: '#6325',
        name: 'Michael Shreff',
        class: 'X',
        section: 'A',
        marksPercentage: '15%',
        marksGPA: '1.5',
        status: 'Fail',
        statusClass: "danger",
        src: '../../assets/images/faces/12.jpg',
    },
];

export const cardData = [
    {
        title: 'Students',
        count: '12,765',
        iconClass: 'primary',
        iconBorderClass: 'bg-primary/[0.15] border border-primary/10',
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="!fill-white !text-white" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><polygon points="224 64 128 96 32 64 128 32 224 64" opacity="0.2" /><line x1="32" y1="64" x2="32" y2="144" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><path d="M56,216c15.7-24.08,41.11-40,72-40s56.3,15.92,72,40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><polygon points="224 64 128 96 32 64 128 32 224 64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><path d="M169.34,82.22a56,56,0,1,1-82.68,0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>),
        percentChange: '0.5%',
        percentChangeClass: 'text-success font-semibold',
        timePeriod: 'This Month',
        icon: 'up'
    },
    {
        title: 'Awards',
        count: '45+',
        iconClass: 'secondary',
        iconBorderClass: 'bg-secondary/[0.15] border border-secondary/10',
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="!fill-white !text-white" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><circle cx="128" cy="96" r="48" opacity="0.2" /><circle cx="128" cy="96" r="80" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><circle cx="128" cy="96" r="48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><polyline points="176 160 176 240 127.99 216 80 240 80 160.01" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>),
        percentChange: '6.56%',
        percentChangeClass: 'text-success font-semibold',
        timePeriod: 'This Year',
        icon: 'up'
    },
    {
        title: 'Revenue',
        count: '$32,289',
        iconClass: 'success',
        iconBorderClass: 'bg-success/[0.15] border border-success/10',
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="!fill-white !text-white" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><path d="M128,128h24a40,40,0,0,1,0,80H128Z" opacity="0.2" /><path d="M128,48H112a40,40,0,0,0,0,80h16Z" opacity="0.2" /><line x1="128" y1="24" x2="128" y2="48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><line x1="128" y1="208" x2="128" y2="232" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><path d="M184,88a40,40,0,0,0-40-40H112a40,40,0,0,0,0,80h40a40,40,0,0,1,0,80H104a40,40,0,0,1-40-40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>),
        percentChange: '2.45%',
        percentChangeClass: 'text-danger font-semibold',
        timePeriod: 'This Year',
        icon: 'down'
    },
];

export const Classesdata=[
    {value:'All Classes', label:'All Classes'},
    {value:'Class-X', label:'Class-X'},
    {value:'Class-IX', label:'Class-IX'},
    ]
    export const Sectionsdata=[
    {value:'All Sections', label:'All Sections'},
    {value:'Section-A', label:'Section-A'},
    {value:'Section-B', label:'Section-B'},
    {value:'Section-C', label:'Section-C'},
    ]
    export const Subjectsdata=[
    {value:'Maths', label:'Maths'},
    {value:'Physics', label:'Physics'},
    {value:'Chemistry', label:'Chemistry'},
    ]
    export const teachers = [
        {
          name: "John Smith",
          degree: "M.Ed",
          subject: "Mathematics",
          subjectColor: "text-primary",
          img: "11.jpg"
        },
        {
          name: "Mary Johnson",
          degree: "B.A. in English",
          subject: "English",
          subjectColor: "text-secondary",
          img: "3.jpg"
        },
        {
          name: "Robert Davis",
          degree: "Ph.D. in Science",
          subject: "Physics",
          subjectColor: "text-warning",
          img: "14.jpg"
        },
        {
          name: "Sarah Thompson",
          degree: "M.A. in History",
          subject: "History",
          subjectColor: "text-info",
          img: "7.jpg"
        },
        {
          name: "Michael Brown",
          degree: "B.Ed",
          subject: "Chemistry",
          subjectColor: "text-success",
          img: "9.jpg"
        },
        {
          name: "Emily Wilson",
          degree: "M.A. in Geography",
          subject: "Geography",
          subjectColor: "text-orangemain",
          img: "2.jpg"
        },
        {
          name: "Studar Little",
          degree: "C.A. in Science",
          subject: "Science",
          subjectColor: "text-tealmain",
          img: "6.jpg"
        }
      ];
      export const tasks = [
        {
          title: "Assignment-4",
          dateRange: "1,Jul 2024 - 24,Jul 2024",
          badgeText: "3 Days Left",
          badgeClass: "bg-danger/[0.15] text-danger"
        },
        {
          title: "Class Test-3",
          dateRange: "14,Aug 2024 - 20,Aug 2024",
          badgeText: "10 Days Left",
          badgeClass: "bg-danger/[0.15] text-danger"
        },
        {
          title: "Unit Test-1",
          dateRange: "20,Sep 2024 - 30,Sep 2024",
          badgeText: "2 Months Left",
          badgeClass: "bg-success/[0.15] text-success"
        },
        {
          title: "Assignment-5",
          dateRange: "1,Nov 2024 - 10,Nov 2024",
          badgeText: "3 Months Left",
          badgeClass: "bg-success/[0.15] text-success"
        },
        {
          title: "Class Test-4",
          dateRange: "2,Jan 2025 - 12,Jan 2024",
          badgeText: "4 Months Left",
          badgeClass: "bg-success/[0.15] text-success"
        }
      ];