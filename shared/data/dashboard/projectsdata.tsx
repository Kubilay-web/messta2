/* project statistics */
export const ProjectSeries = [{
    name: 'Projects',
    type: 'line',
    data: [32, 15, 63, 51, 36, 62, 99]
}, {
    name: 'Tasks',
    type: 'line',
    data: [56, 58, 38, 50, 64, 45, 55]
}, {
    name: 'Revenue',
    type: 'line',
    data: [48, 29, 50, 69, 20, 59, 52]
}]
export const ProjectOption = {
    chart: {
        height: 350,
        type: 'line',
        stacked: false,
        toolbar: {
            show: false
        },
        dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 7,
            left: 0,
            blur: 3,
            color: ["rgba(var(--primary-rgb))", "rgb(215, 124, 247)", "rgb(12, 215, 177)"],
            opacity: 0.1
        },
    },
    colors: ["rgba(var(--primary-rgb))", "rgb(215, 124, 247)", "rgb(12, 215, 177)"],
    grid: {
        borderColor: '#f1f1f1',
        strokeDashArray: 3
    },
    stroke: {
        width: [2, 2, 2],
        curve: 'smooth',
    },
    plotOptions: {
        bar: {
            columnWidth: '30%',
            borderRadius: 5,
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
        type: 'week',
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
    yaxis: {
        title: {
            style: {
                color: '#adb5be',
                fontSize: '14px',
                fontFamily: 'Mulish, sans-serif',
                fontWeight: 600,
                cssClass: 'apexcharts-yaxis-label',
            },
        },
    },
    tooltip: {
        shared: true,
        theme: "dark",
    }
}

/* task-activity */
export const ActivitySeries = [1754, 634, 878, 470]
export const ActivityOption = {
    labels: ["On Going", "Completed", "To do", "Pending"],
    chart: {
        height: 245,
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
            startAngle: -90,
            endAngle: 90,
            offsetY: 10,
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
                        offsetY: -30
                    },
                    value: {
                        show: true,
                        fontSize: '15px',
                        color: undefined,
                        offsetY: -25,
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
    grid: {
        padding: {
            bottom: -100
        }
    },
    colors: ["rgba(var(--primary-rgb),0.8)", "rgba(215, 124, 247, 0.8)", "rgba(12, 215, 177, 0.8)", "rgba(254, 124, 88, 0.8)"],
}

/* yearly revenue */
export const YearlyRevenueSeries = [{
    data: [462, 451, 350, 530, 470, 500, 485],
    name: 'Revenue',
}]
export const YearlyRevenueOption = {
    chart: {
        type: 'bar',
        height: 375,
        toolbar: {
            show: false
        },
    },
    plotOptions: {
        bar: {
            barHeight: '40%',
            borderRadius: 2,
            horizontal: true,
            colors: {
                ranges: [{
                    from: 0,
                    to: 500,
                    color: 'rgba(215, 124, 247, 1)'
                },
                {
                    from: 501,
                    to: Infinity,
                    color: "rgba(var(--primary-rgb))"
                }]
            },
        }
    },
    dataLabels: {
        enabled: false
    },
    grid: {
        borderColor: '#ffffff',
        show: false,
    },
    xaxis: {
        categories: ['2017', '2018', '2019', '2020', '2021', '2022', '2023'],
        axisBorder: {
            show: true,
            color: '#c7cacd',
            offsetX: 0,
            offsetY: 0,
        },
        axisTicks: {
            show: true,
            borderType: 'solid',
            color: '#c7cacd',
            width: 6,
            offsetX: 0,
            offsetY: 0
        },
        labels: {
            rotate: -90
        }
    },
}

// Task List
export const TaskList = [
    {
        id: 1,
        taskDetails: "Update client records in database",
        assigned: "12.43pm",
        target: "Today",
        targetColor: "primary",
        assignedTo: [
            "../../assets/images/faces/2.jpg",
            "../../assets/images/faces/8.jpg",
            "../../assets/images/faces/2.jpg"
        ]
    },
    {
        id: 2,
        taskDetails: "Design logo for new product",
        assigned: "11.25am",
        target: "Tomorrow",
        targetColor: "secondary",
        assignedTo: [
            "../../assets/images/faces/6.jpg",
            "../../assets/images/faces/9.jpg"
        ]
    },
    {
        id: 3,
        taskDetails: "Respond to customer emails promptly",
        assigned: "9.56am",
        target: "Today",
        targetColor: "primary",
        assignedTo: [
            "../../assets/images/faces/3.jpg",
            "../../assets/images/faces/5.jpg",
            "../../assets/images/faces/10.jpg",
            "../../assets/images/faces/15.jpg"
        ]
    },
    {
        id: 4,
        taskDetails: "Compile weekly sales report summary",
        assigned: "8.15am",
        target: "Today",
        targetColor: "primary",
        assignedTo: [
            "../../assets/images/faces/11.jpg"
        ]
    },
    {
        id: 5,
        taskDetails: "Review and edit blog post",
        assigned: "4.20pm",
        target: "Tomorrow",
        targetColor: "secondary",
        assignedTo: [
            "../../assets/images/faces/13.jpg",
            "../../assets/images/faces/16.jpg",
            "../../assets/images/faces/8.jpg"
        ]
    },
    {
        id: 6,
        taskDetails: "Create social media content calendar",
        assigned: "8.29am",
        target: "Today",
        targetColor: "primary",
        assignedTo: [
            "../../assets/images/faces/10.jpg",
            "../../assets/images/faces/5.jpg"
        ]
    }
]

export const TaskListTab2 = [
    {
        id: 1,
        taskDetails: "Sort and file important documents",
        assignedOn: "24 Nov 2024",
        completed: "4 hrs ago",
        assignedTo: [
            "../../assets/images/faces/5.jpg",
            "../../assets/images/faces/9.jpg"
        ]
    },
    {
        id: 2,
        taskDetails: "Test website for user experience",
        assignedOn: "30 Nov 2024",
        completed: "Today",
        assignedTo: [
            "../../assets/images/faces/11.jpg",
            "../../assets/images/faces/12.jpg",
            "../../assets/images/faces/13.jpg"
        ]
    },
    {
        id: 3,
        taskDetails: "Schedule team meeting",
        assignedOn: "11 Dec 2024",
        completed: "Yesterday",
        assignedTo: [
            "../../assets/images/faces/4.jpg"
        ]
    },
    {
        id: 4,
        taskDetails: "Write brief for marketing campaign",
        assignedOn: "6 Dec 2024",
        completed: "Yesterday",
        assignedTo: [
            "../../assets/images/faces/1.jpg",
            "../../assets/images/faces/2.jpg"
        ]
    },
    {
        id: 5,
        taskDetails: "Proofread product description text",
        assignedOn: "8 Dec 2024",
        completed: "Yesterday",
        assignedTo: [
            "../../assets/images/faces/5.jpg",
            "../../assets/images/faces/3.jpg",
            "../../assets/images/faces/11.jpg",
            "../../assets/images/faces/12.jpg"
        ]
    },
    {
        id: 6,
        taskDetails: "Organize files on cloud storage",
        assignedOn: "21 Dec 2024",
        completed: "Today",
        assignedTo: [
            "../../assets/images/faces/1.jpg"
        ]
    }
];

// PROJECTS SUMMARY
export const ProjetSummary = [
    {
        id: 1,
        name: "Website Design",
        startDate: "25-03-2024",
        progress: 40,
        progressColor: "primary",
        team: [
            "../../assets/images/faces/2.jpg",
            "../../assets/images/faces/8.jpg",
            "../../assets/images/faces/2.jpg",
        ],
        dueDate: "14-04-2024",
        status: "In Progress",
        statusColor: "primary",
        length:2
    },
    {
        id: 2,
        name: "Filemanager Application",
        startDate: "16-03-2024",
        progress: 75,
        progressColor: "secondary",
        team: [
            "../../assets/images/faces/1.jpg",
            "../../assets/images/faces/12.jpg"
        ],
        dueDate: "24-05-2024",
        status: "Pending",
        statusColor: "warning",
    },
    {
        id: 3,
        name: "Chat Interface",
        startDate: "28-02-2024",
        progress: 58,
        progressColor: "success",
        team: [
            "../../assets/images/faces/5.jpg",
            "../../assets/images/faces/8.jpg",
            "../../assets/images/faces/11.jpg"
        ],
        dueDate: "28-03-2024",
        status: "Ongoing",
        statusColor: "danger",
    },
    {
        id: 4,
        name: "Ecommerce Application",
        startDate: "18-03-2024",
        progress: 100,
        progressColor: "orangemain",
        team: [
            "../../assets/images/faces/6.jpg",
            "../../assets/images/faces/9.jpg",
            "../../assets/images/faces/13.jpg"
        ],
        dueDate: "02-04-2024",
        status: "Completed",
        statusColor: "success",
    },
    {
        id: 5,
        name: "HR Dashboard",
        startDate: "25-03-2024",
        progress: 45,
        progressColor: "info",
        team: [
            "../../assets/images/faces/10.jpg"
        ],
        dueDate: "27-03-2024",
        status: "In Progress",
        statusColor: "primary",
    }
];


export const tasks = [
    {
      type: 'ongoing',
      title: 'On Going Tasks',
      percentageChange: 1.67,
      total: 1754,
      changeType: 'Increased By',
      changeColor: 'text-success',
    },
    {
      type: 'completed',
      title: 'Completed Tasks',
      percentageChange: 0.46,
      total: 634,
      changeType: 'Increased By',
      changeColor: 'text-success',
    },
    {
      type: 'todo',
      title: 'To Do Tasks',
      percentageChange: 3.43,
      total: 878,
      changeType: 'Decreased By',
      changeColor: 'text-danger',
    },
    {
      type: 'pending',
      title: 'Pending Tasks',
      percentageChange: 0.13,
      total: 470,
      changeType: 'Increased By',
      changeColor: 'text-success',
    },
  ];
  export const todolist = [
    {
      title: 'Research Phase',
      avatarBg: 'bg-primary/[0.15]',
     
      avatarColor: (<svg xmlns="http://www.w3.org/2000/svg" className="!fill-primary !text-primary" viewBox="0 0 256 256">
      <rect width="256" height="256" fill="none"></rect>
      <path d="M56,40H200a8,8,0,0,1,8,8V200a24,24,0,0,1-24,24H72a24,24,0,0,1-24-24V48A8,8,0,0,1,56,40Z" opacity="0.2"></path>
      <line x1="96" y1="128" x2="160" y2="128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
      <line x1="96" y1="160" x2="160" y2="160" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
      <path d="M56,40H200a8,8,0,0,1,8,8V200a24,24,0,0,1-24,24H72a24,24,0,0,1-24-24V48A8,8,0,0,1,56,40Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
      <line x1="80" y1="24" x2="80" y2="56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
      <line x1="128" y1="24" x2="128" y2="56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
      <line x1="176" y1="24" x2="176" y2="56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
  </svg>),
      subTasks: [
        { text: 'Gather relevant articles', checked: false },
        { text: 'Summarize key findings', checked: true },
        { text: 'Consult experts', checked: true },
      ],
    },
    {
      title: 'Planning',
      avatarBg: 'bg-secondary/[0.15]',
     
      avatarColor: (<svg xmlns="http://www.w3.org/2000/svg" className="!fill-secondary !text-secondary" viewBox="0 0 256 256">
      <rect width="256" height="256" fill="none"></rect>
      <path d="M78.7,167A79.87,79.87,0,0,1,48,104.45C47.76,61.09,82.72,25,126.07,24a80,80,0,0,1,51.34,142.9A24.3,24.3,0,0,0,168,186v6a8,8,0,0,1-8,8H96a8,8,0,0,1-8-8v-6A24.11,24.11,0,0,0,78.7,167Z" opacity="0.2"></path>
      <line x1="88" y1="232" x2="168" y2="232" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
      <path d="M78.7,167A79.87,79.87,0,0,1,48,104.45C47.76,61.09,82.72,25,126.07,24a80,80,0,0,1,51.34,142.9A24.3,24.3,0,0,0,168,186v6a8,8,0,0,1-8,8H96a8,8,0,0,1-8-8v-6A24.11,24.11,0,0,0,78.7,167Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
      <path d="M136,56c20,3.37,36.61,20,40,40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
  </svg>),
      subTasks: [
        { text: 'List major milestones', checked: true },
        { text: 'Allocate time for each task', checked: false },
        { text: 'Include buffer time', checked: false },
      ],
    },
    {
      title: 'Execution',
      avatarBg: 'bg-success/[0.15]',
      
      avatarColor: (<svg xmlns="http://www.w3.org/2000/svg" className="!fill-success !text-success" viewBox="0 0 256 256">
      <rect width="256" height="256" fill="none"></rect>
      <path d="M207.86,123.18l16.78-21a99.14,99.14,0,0,0-10.07-24.29l-26.7-3a81,81,0,0,0-6.81-6.81l-3-26.71a99.43,99.43,0,0,0-24.3-10l-21,16.77a81.59,81.59,0,0,0-9.64,0l-21-16.78A99.14,99.14,0,0,0,77.91,41.43l-3,26.7a81,81,0,0,0-6.81,6.81l-26.71,3a99.43,99.43,0,0,0-10,24.3l16.77,21a81.59,81.59,0,0,0,0,9.64l-16.78,21a99.14,99.14,0,0,0,10.07,24.29l26.7,3a81,81,0,0,0,6.81,6.81l3,26.71a99.43,99.43,0,0,0,24.3,10l21-16.77a81.59,81.59,0,0,0,9.64,0l21,16.78a99.14,99.14,0,0,0,24.29-10.07l3-26.7a81,81,0,0,0,6.81-6.81l26.71-3a99.43,99.43,0,0,0,10-24.3l-16.77-21A81.59,81.59,0,0,0,207.86,123.18ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z" opacity="0.2"></path>
      <circle cx="128" cy="128" r="40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle>
      <path d="M41.43,178.09A99.14,99.14,0,0,1,31.36,153.8l16.78-21a81.59,81.59,0,0,1,0-9.64l-16.77-21a99.43,99.43,0,0,1,10.05-24.3l26.71-3a81,81,0,0,1,6.81-6.81l3-26.7A99.14,99.14,0,0,1,102.2,31.36l21,16.78a81.59,81.59,0,0,1,9.64,0l21-16.77a99.43,99.43,0,0,1,24.3,10.05l3,26.71a81,81,0,0,1,6.81,6.81l26.7,3a99.14,99.14,0,0,1,10.07,24.29l-16.78,21a81.59,81.59,0,0,1,0,9.64l16.77,21a99.43,99.43,0,0,1-10,24.3l-26.71,3a81,81,0,0,1-6.81,6.81l-3,26.7a99.14,99.14,0,0,1-24.29,10.07l-21-16.78a81.59,81.59,0,0,1-9.64,0l-21,16.77a99.43,99.43,0,0,1-24.3-10l-3-26.71a81,81,0,0,1-6.81-6.81Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
  </svg>),
      subTasks: [
        { text: 'Create an outline', checked: false },
        { text: 'Write content', checked: true },
        { text: 'Add proper citations', checked: true },
      ],
    },
  ];
 export const notifications = [
    {
      title: 'Task Finished',
      date: '09 Feb 2024',
      person: 'Adam Berry',
      task: 'AngularJS Template',
      type: 'finished',
    },
    {
      title: 'New Comment',
      date: '05 July 2024',
      person: 'Victoria',
      task: 'Ynex NuxtJS Template',
      type: 'commented',
    },
    {
      title: 'Deal with Client',
      date: '30 Jan 2024',
      person: 'Gaylord Barrett',
      task: 'New Deal',
      type: 'deal',
    },
    {
      title: 'Updated Profile',
      date: '12 Feb 2024',
      person: 'Magnus Haynes',
      task: 'Profile Picture',
      type: 'updated',
    },
    {
      title: 'Task Overdue',
      date: '25 Feb 2024',
      person: 'Petey Cruiser',
      task: 'Overdue',
      type: 'overdue',
    },
  ];