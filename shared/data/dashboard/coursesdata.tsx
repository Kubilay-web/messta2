/* learning activity */
export const LearningActivitySries = [{
    name: 'This Week',
    type: 'column',
    data: [25, 18, 20, 25, 50, 20, 40]
}, {
    name: 'Last Week',
    type: 'line',
    data: [45, 55, 40, 65, 20, 45, 25]
}, {
    name: 'Average',
    type: 'line',
    data: [30, 25, 35, 30, 45, 35, 65]
}]
export const LearningActivityOptions = {
    chart: {
        height: 280,
        type: 'line',
        stacked: false,
        toolbar: {
            show: false
        },
        dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 5,
            left: 0,
            blur: 3,
            color: ["transparent", 'rgba(215, 124, 247, 0.2)', 'rgba(var(--primary-rgb),0.2)'],
            opacity: 0.5
        },
    },
    colors: ["rgba(var(--primary-rgb),0.1)", "rgb(215, 124, 247)", "rgba(var(--primary-rgb))"],
    grid: {
        show: true,
        borderColor: 'rgba(119, 119, 142, 0.1)',
        strokeDashArray: 4,
    },
    stroke: {
        width: [0, 2, 2],
        curve: 'smooth',
    },
    plotOptions: {
        bar: {
            columnWidth: '25%',
            borderRadius: 5,
            borderRadiusApplication: "end"
        }
    },
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    markers: {
        size: 0,
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
    xaxis: {
        categories: [
            ['UI/UX Design'],
            ['Programming'],
            ['QA Analyst'],
            ['SEO'],
            ['Digital Marketing'],
            ['Marketing'],
            ['DevOpsPro'],
        ],
        fontFamily: "Montserrat",
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
            rotate: -90,
            style: {
                fontSize: '10px',
            },
        }
    },
    yaxis: {
        title: {
            text: 'Growth',
            style: {
                color: '	#adb5be',
                fontSize: '14px',
                fontFamily: 'Montserrat, sans-serif',
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
    tooltip: {
        shared: true,
        intersect: false,
        y: {
            formatter: function (y:any) {
                if (typeof y !== "undefined") {
                    return y.toFixed(0) + " Hours";
                }
                return y;

            }
        }
    }
}

/* payouts */
export const PayoutsSries = [6560, 3354]
export const PayoutsOptions = {
    chart: {
        height: 180,
        type: 'donut',
    },
    colors: ["rgba(var(--primary-rgb),0.8)", "rgba(215, 124, 247, 0.8)"],
    labels: ["Paid", "Unpaid"],
    legend: {
        show: false,
    },
    plotOptions: {
        pie: {
            expandOnClick: false,
            donut: {
                size: '85%',
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
    stroke: {
        width: 0
    },
    dataLabels: {
        enabled: false,
        dropShadow: {
            enabled: false,
        },
    },
}

/* course statistics */
export const CourseSries = [{
    name: 'Completed',
    data: [44, 42, 57, 86, 58, 55, 70],
}, {
    name: 'Ongoing',
    data: [34, 22, 47, 56, 21, 35, 60],
}
]
export const CourseOptions = {
    chart: {
        type: 'bar',
        stacked: true,
        height: 338,
    },
    grid: {
        show: true,
        borderColor: 'rgba(119, 119, 142, 0.1)',
        strokeDashArray: 4,
    },
    colors: ["rgba(var(--primary-rgb),0.8)", "rgba(215, 124, 247, 0.8)"],
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '20%',
            borderRadius: 4,
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 0,
        colors: ['transparent']
    },
    states: {
        hover: {
            filter: {
                type: 'none'
            }
        }
    },
    yaxis: {
        title: {
            style: {
                color: '	#adb5be',
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
        categories: ['Mon', 'Tue', 'Web', 'Thu', 'Fri', 'Sat', 'Sun'],
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
    },
    fill: {
        opacity: 1
    },
    legend: {
        position: "top"
    },
}

// ONGOING COURSES
export const OngoingCourses = [
    {
        instructor: { name: 'John Doe', email: 'johndoe213@gmail.com', avatar: '../../assets/images/faces/13.jpg' },
        courseTitle: 'DataDash',
        dateStarted: '2024-02-01',
        progress: 75,
        progressColor: "primary",
        students: "57",
    },
    {
        instructor: { name: 'Jane Smith', email: 'janesmith767@gmail.com', avatar: '../../assets/images/faces/4.jpg' },
        courseTitle: 'CloudSnap',
        dateStarted: '2024-02-10',
        progress: 55,
        progressColor: "secondary",
        students: "120",
    },
    {
        instructor: { name: 'Mark Johnson', email: 'markjhonson66@gmail.com', avatar: '../../assets/images/faces/11.jpg' },
        courseTitle: 'DevOpsDash',
        dateStarted: '2024-03-16',
        progress: 90,
        progressColor: "success",
        students: "50",
    },
    {
        instructor: { name: 'Emily White', email: 'emileywhite@gmail.com', avatar: '../../assets/images/faces/7.jpg' },
        courseTitle: 'UI/UXSwift',
        dateStarted: '2024-03-24',
        progress: 50,
        progressColor: "orangemain",
        students: "60",
    },
    {
        instructor: { name: 'Alex Turner', email: 'alexturner69@gmail.com', avatar: '../../assets/images/faces/14.jpg' },
        courseTitle: 'CloudSnap',
        dateStarted: '2024-03-30',
        progress: 80,
        progressColor: "info",
        students: "150",
    }
];
export const cardData = [
    {
      title: 'Total Students',
      value: '23,768',
      percentage: '2.45%',
      percentageType: 'success',
      boxClass:"total-students-card",
      svg: (<svg xmlns="http://www.w3.org/2000/svg" className="!fill-white !text-white" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><polygon points="224 64 128 96 32 64 128 32 224 64" opacity="0.2"></polygon><line x1="32" y1="64" x2="32" y2="144" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><path d="M56,216c15.7-24.08,41.11-40,72-40s56.3,15.92,72,40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><polygon points="224 64 128 96 32 64 128 32 224 64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></polygon><path d="M169.34,82.22a56,56,0,1,1-82.68,0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path></svg>)
    },
    {
      title: 'Total Instructors',
      value: '1,673',
      percentage: '0.62%',
      percentageType: 'danger',
      boxClass:"total-instructors-card",
      svg: (<svg xmlns="http://www.w3.org/2000/svg" className="!fill-white !text-white" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="104" cy="144" r="32" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle><path d="M72,144a32,32,0,1,1,32,32h88V80H64v64Z" opacity="0.2"></path><path d="M53.39,208a56,56,0,0,1,101.22,0H216a8,8,0,0,0,8-8V56a8,8,0,0,0-8-8H40a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><polyline points="176 176 192 176 192 80 64 80 64 96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></polyline></svg>)
    },
    {
      title: 'Total Courses',
      value: '526',
      percentage: '3.75%',
      percentageType: 'success',
      boxClass:"total-courses-card",
      svg: (<svg xmlns="http://www.w3.org/2000/svg" className="!fill-white !text-white" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M128,232a32,32,0,0,1,32-32h64a8,8,0,0,0,8-8V64a8,8,0,0,0-8-8H160a32,32,0,0,0-32,32Z" opacity="0.2"></path><path d="M128,88a32,32,0,0,1,32-32h64a8,8,0,0,1,8,8V192a8,8,0,0,1-8,8H160a32,32,0,0,0-32,32" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><path d="M24,192a8,8,0,0,0,8,8H96a32,32,0,0,1,32,32V88A32,32,0,0,0,96,56H32a8,8,0,0,0-8,8Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><line x1="160" y1="96" x2="200" y2="96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><line x1="160" y1="128" x2="200" y2="128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><line x1="160" y1="160" x2="200" y2="160" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line></svg>)
    },
    {
      title: 'Total Revenue',
      value: '$1,26,553',
      percentage: '21.54%',
      percentageType: 'success',
      boxClass:"total-revenue-card",
      svg: (<svg xmlns="http://www.w3.org/2000/svg" className="!fill-white !text-white" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M128,128h24a40,40,0,0,1,0,80H128Z" opacity="0.2"></path><path d="M128,48H112a40,40,0,0,0,0,80h16Z" opacity="0.2"></path><line x1="128" y1="24" x2="128" y2="48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><line x1="128" y1="208" x2="128" y2="232" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><path d="M184,88a40,40,0,0,0-40-40H112a40,40,0,0,0,0,80h40a40,40,0,0,1,0,80H104a40,40,0,0,1-40-40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path></svg>)
    }
  ];
 export const courses = [
    {
      avatar: 'UI',
      background: 'bg-primary',
      title: 'UI/UX Design',
      coursesCount: 40,
      classesCount: '120+',
      badgeColor: 'bg-primary/[0.15]',
      badgeTextColor: 'text-primary',
    },
    {
      avatar: 'QA',
      background: 'bg-secondary',
      title: 'QA Analyst',
      coursesCount: 35,
      classesCount: '260+',
      badgeColor: 'bg-secondary/[0.15]',
      badgeTextColor: 'text-secondary',
    },
    {
      avatar: 'DM',
      background: 'bg-success',
      title: 'Digital Marketing',
      coursesCount: 60,
      classesCount: '420+',
      badgeColor: 'bg-success/[0.15]',
      badgeTextColor: 'text-success',
    },
    {
      avatar: 'M',
      background: 'bg-info',
      title: 'Marketing',
      coursesCount: 150,
      classesCount: '100+',
      badgeColor: 'bg-info/[0.15]',
      badgeTextColor: 'text-info',
    },
    {
      avatar: 'DP',
      background: 'bg-orangemain',
      title: 'Devops Pro',
      coursesCount: 15,
      classesCount: '120+',
      badgeColor: 'bg-orangemain/[0.15]',
      badgeTextColor: 'text-orangemain',
    },
    {
      avatar: 'P',
      background: 'bg-danger',
      title: 'Programming',
      coursesCount: 120,
      classesCount: '130+',
      badgeColor: 'bg-danger/[0.15]',
      badgeTextColor: 'text-danger',
    }
  ];
  export const POPULAR = [
    {
      image: '../../assets/images/media/media-25.jpg',
      category: 'UI/UX',
      title: 'CSS Zero to Hero Class-11',
      instructorImage: '../../assets/images/faces/1.jpg',
      instructor: 'Natasha Sil',
      views: '2,189 Views',
      rating: '4.2',
    },
    {
      image: '../../assets/images/media/media-13.jpg',
      category: 'Marketing',
      title: 'Marketing Class-27',
      instructorImage: '../../assets/images/faces/13.jpg',
      instructor: 'John Doe',
      views: '1,116 Views',
      rating: '4.5',
    },
    {
      image: '../../assets/images/media/media-24.jpg',
      category: 'Programming',
      title: 'Learn Python-16',
      instructorImage: '../../assets/images/faces/5.jpg',
      instructor: 'Jane Smith',
      views: '2,125 Views',
      rating: '4.8',
    },
    {
      image: '../../assets/images/media/media-18.jpg',
      category: 'UI/UX Design',
      title: 'Javascript-45',
      instructorImage: '../../assets/images/faces/10.jpg',
      instructor: 'Robert White',
      views: '3,677 Views',
      rating: '4.9',
    },
  ];

 export const users = [
    {
      avatar: '../../assets/images/faces/png/1.png',
      name: 'Alex Swift',
      role: 'UX Pro',
      coursesCount: '321 Courses',
      specialization: 'UI/UX Maestro',
      bgColor: 'bg-pinkmain/[0.15]',
      nameclass:"text-primary"
    },
    {
      avatar: '../../assets/images/faces/png/3.png',
      name: 'Eva Code',
      role: 'Data Ninja',
      coursesCount: '25 Courses',
      specialization: 'Networking',
      bgColor: 'bg-danger/[0.15]',
      nameclass:"text-secondary"
    },
    {
      avatar: '../../assets/images/faces/png/7.png',
      name: 'Max Blaze',
      role: 'Ethi Pro',
      coursesCount: '39 Courses',
      specialization: 'Code Optimization',
      bgColor: 'bg-warning/[0.15]',
      nameclass:"text-success"
    },
    {
      avatar: '../../assets/images/faces/png/8.png',
      name: 'Lily Byte',
      role: 'Supp Pro',
      coursesCount: '11 Courses',
      specialization: 'Digital Marketing',
      bgColor: 'bg-light',
      nameclass:"text-orangemain"
    },
    {
      avatar: '../../assets/images/faces/png/9.png',
      name: 'Jake Spark',
      role: 'Tech Guru',
      coursesCount: '124 Courses',
      specialization: 'Tech Support',
      bgColor: 'bg-info/[0.15]',
      nameclass:"text-info"
    },
    {
      avatar: '../../assets/images/faces/png/2.png',
      name: 'Leo Logic',
      role: 'Cyber Ace',
      coursesCount: '38 Courses',
      specialization: 'DevOps',
      bgColor: 'bg-orangemain/[0.15]',
      nameclass:"text-warning"
    },
  ];