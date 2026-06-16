// for tasks stats
export const TaskStatusSeries = [{
    name: 'New Tasks',
    data: [44, 42, 57, 86, 58, 55, 70, 43, 23, 54, 77, 34],
}, {
    name: 'Pending Tasks',
    data: [74, 72, 87, 116, 88, 85, 100, 73, 53, 84, 107, 64],
}, {
    name: 'Completed Tasks',
    data: [84, 82, 97, 126, 98, 95, 110, 83, 63, 94, 117, 74],
}, {
    name: 'In Progress Tasks',
    data: [34, 22, 37, 56, 21, 35, 60, 34, 56, 78, 89, 53],
}]
export const TaskStatusOptions = {
    chart: {
        type: "bar",
        height: 193,
        stacked: true,
        toolbar: {
            show: false,
        }
    },
    plotOptions: {
        bar: {
            columnWidth: '25%',
            borderRadius: 2,
        }
    },
    grid: {
        show: false,
        borderColor: '#f2f6f7',
    },
    dataLabels: {
        enabled: false,
    },
    colors: ["rgba(254, 124, 88, 0.9)", "rgba(12, 215, 177, 0.9)", "rgba(215, 124, 247, 0.9)", "rgba(var(--primary-rgb,0.9)"],
    stroke: {
        width: 0,
    },
    legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'center',
    },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'sep', 'oct', 'nov', 'dec'],
        labels: {
            show: true,
            style: {
                colors: "#8c9097",
                fontSize: "11px",
                fontWeight: 500,
                cssClass: "apexcharts-xaxis-label",
            },
        },
    },
    yaxis: {
        title: {
            style: {
                color: "#8c9097",
            },
        },
        labels: {
            show: true,
            style: {
                colors: "#8c9097",
                fontSize: "11px",
                fontWeight: 500,
                cssClass: "apexcharts-xaxis-label",
            },
        },
    },
}

// Total Tasks
export const TotalTasks = [
    {
        id: 1,
        checked: false,
        name: "Design New Landing Page",
        spk: "SPK - 01",
        startDate: "02-06-2024",
        status: "New",
        endDate: "10-06-2024",
        priority: "Medium",
        assignees: [
            "../../../assets/images/faces/2.jpg",
            "../../../assets/images/faces/8.jpg",
            "../../../assets/images/faces/2.jpg"
        ],
        bdgpriority:"secondary",
        statuscolor:"primary"
    },
    {
        id: 2,
        checked: true,
        name: "New Project Blueprint",
        spk: "SPK - 04",
        startDate: "05-06-2024",
        status: "Inprogress",
        endDate: "15-06-2024",
        priority: "High",
        assignees: [
            "../../../assets/images/faces/12.jpg",
            "../../../assets/images/faces/11.jpg"
        ],
        bdgpriority:"danger",
        statuscolor:"secondary"
    },
    {
        id: 3,
        checked: false,
        name: "Server Side Validation",
        spk: "SPK - 11",
        startDate: "12-06-2024",
        status: "Pending",
        endDate: "16-06-2024",
        priority: "Low",
        assignees: [
            "../../../assets/images/faces/5.jpg",
            "../../../assets/images/faces/9.jpg",
            "../../../assets/images/faces/13.jpg"
        ],
        bdgpriority:"success",
        statuscolor:"warning"
    },
    {
        id: 4,
        checked: false,
        name: "New Plugin Development",
        spk: "SPK - 24",
        startDate: "08-06-2024",
        status: "Completed",
        endDate: "17-06-2024",
        priority: "Low",
        assignees: [
            "../../../assets/images/faces/2.jpg",
            "../../../assets/images/faces/8.jpg",
            "../../../assets/images/faces/2.jpg"
        ],
        bdgpriority:"success",
        statuscolor:"success"
    },
    {
        id: 5,
        checked: true,
        name: "Designing New Authentication Page",
        spk: "SPK - 16",
        startDate: "03-06-2024",
        status: "Inprogress",
        endDate: "08-06-2024",
        priority: "Medium",
        assignees: [
            "../../../assets/images/faces/10.jpg",
            "../../../assets/images/faces/15.jpg"
        ],
        bdgpriority:"secondary",
        statuscolor:"secondary"
    },
    {
        id: 6,
        checked: true,
        name: "Documentation For New Template",
        spk: "SPK - 07",
        startDate: "12-06-2024",
        status: "New",
        endDate: "25-06-2024",
        priority: "High",
        assignees: [
            "../../../assets/images/faces/12.jpg"
        ],
        bdgpriority:"danger",
        statuscolor:"primary"
    },
    {
        id: 7,
        checked: false,
        name: "Updating Old UI",
        spk: "SPK - 13",
        startDate: "06-06-2024",
        status: "Completed",
        endDate: "12-06-2024",
        priority: "Low",
        assignees: [
            "../../../assets/images/faces/11.jpg",
            "../../../assets/images/faces/1.jpg",
            "../../../assets/images/faces/10.jpg"
        ],
        bdgpriority:"success",
        statuscolor:"success"
    },
    {
        id: 8,
        checked: true,
        name: "Developing New Events In Plugins",
        spk: "SPK - 20",
        startDate: "14-06-2024",
        status: "Pending",
        endDate: "19-06-2024",
        priority: "High",
        assignees: [
            "../../../assets/images/faces/3.jpg",
            "../../../assets/images/faces/9.jpg"
        ],
        bdgpriority:"danger",
        statuscolor:"warning"
    },
    {
        id: 9,
        checked: false,
        name: "Fixing Minor UI Issues",
        spk: "SPK - 26",
        startDate: "11-06-2024",
        status: "Completed",
        endDate: "18-06-2024",
        priority: "Medium",
        assignees: [
            "../../../assets/images/faces/5.jpg",
            "../../../assets/images/faces/14.jpg",
            "../../../assets/images/faces/12.jpg",
            "../../../assets/images/faces/3.jpg"
        ],
        bdgpriority:"secondary",
        statuscolor:"success"
    },
    {
        id: 10,
        checked: false,
        name: "Designing Of New Ecommerce Website",
        spk: "SPK - 32",
        startDate: "03-06-2024",
        status: "Inprogress",
        endDate: "09-06-2024",
        priority: "Low",
        assignees: [
            "../../../assets/images/faces/12.jpg",
            "../../../assets/images/faces/6.jpg"
        ],
        bdgpriority:"success",
        statuscolor:"secondary"
    }
];
export const taskData = [
    {
        id: 1,
        title: "New ",
        count: 43,
        badge: "12,345",
        trend: { direction: "up", value: "3.25%" },
        color: "bg-primary",
        icon: (<svg xmlns="http://www.w3.org/2000/svg" className="fill-primary" data-name="Layer 1" viewBox="0 0 24 24">
            <path d="M13,16H7a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2ZM9,10h2a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Zm12,2H18V3a1,1,0,0,0-.5-.87,1,1,0,0,0-1,0l-3,1.72-3-1.72a1,1,0,0,0-1,0l-3,1.72-3-1.72a1,1,0,0,0-1,0A1,1,0,0,0,2,3V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V13A1,1,0,0,0,21,12ZM5,20a1,1,0,0,1-1-1V4.73L6,5.87a1.08,1.08,0,0,0,1,0l3-1.72,3,1.72a1.08,1.08,0,0,0,1,0l2-1.14V19a3,3,0,0,0,.18,1Zm15-1a1,1,0,0,1-2,0V14h2Zm-7-7H7a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2Z"></path>
        </svg>),
    },
    {
        id: 2,
        title: "Completed ",
        count: 321,
        badge: "4,176",
        trend: { direction: "down", value: "1.16%" },
        color: "bg-secondary",
        icon: (<svg xmlns="http://www.w3.org/2000/svg" className="fill-secondary" viewBox="0 0 24 24">
            <path d="M11.5,20h-6a1,1,0,0,1-1-1V5a1,1,0,0,1,1-1h5V7a3,3,0,0,0,3,3h3v5a1,1,0,0,0,2,0V9s0,0,0-.06a1.31,1.31,0,0,0-.06-.27l0-.09a1.07,1.07,0,0,0-.19-.28h0l-6-6h0a1.07,1.07,0,0,0-.28-.19.29.29,0,0,0-.1,0A1.1,1.1,0,0,0,11.56,2H5.5a3,3,0,0,0-3,3V19a3,3,0,0,0,3,3h6a1,1,0,0,0,0-2Zm1-14.59L15.09,8H13.5a1,1,0,0,1-1-1ZM7.5,14h6a1,1,0,0,0,0-2h-6a1,1,0,0,0,0,2Zm4,2h-4a1,1,0,0,0,0,2h4a1,1,0,0,0,0-2Zm-4-6h1a1,1,0,0,0,0-2h-1a1,1,0,0,0,0,2Zm13.71,6.29a1,1,0,0,0-1.42,0l-3.29,3.3-1.29-1.3a1,1,0,0,0-1.42,1.42l2,2a1,1,0,0,0,1.42,0l4-4A1,1,0,0,0,21.21,16.29Z"></path>
        </svg>),
    },
    {
        id: 3,
        title: "Pending ",
        count: 81,
        badge: "7,064",
        trend: { direction: "up", value: "0.25%" },
        color: "bg-success",
        icon: (<svg xmlns="http://www.w3.org/2000/svg" className="fill-success" enableBackground="new 0 0 24 24" viewBox="0 0 24 24">
            <path d="M19,12h-7V5c0-0.6-0.4-1-1-1c-5,0-9,4-9,9s4,9,9,9s9-4,9-9C20,12.4,19.6,12,19,12z M12,19.9c-3.8,0.6-7.4-2.1-7.9-5.9C3.5,10.2,6.2,6.6,10,6.1V13c0,0.6,0.4,1,1,1h6.9C17.5,17.1,15.1,19.5,12,19.9z M15,2c-0.6,0-1,0.4-1,1v6c0,0.6,0.4,1,1,1h6c0.6,0,1-0.4,1-1C22,5.1,18.9,2,15,2z M16,8V4.1C18,4.5,19.5,6,19.9,8H16z"></path>
        </svg>),
    },
    {
        id: 4,
        title: "Inprogress ",
        count: 33,
        badge: "1,105",
        trend: { direction: "down", value: "0.46%" },
        color: "bg-orangemain",
        icon: (<svg xmlns="http://www.w3.org/2000/svg" className="fill-orangemain" enableBackground="new 0 0 24 24" viewBox="0 0 24 24">
            <path d="M19,12h-7V5c0-0.6-0.4-1-1-1c-5,0-9,4-9,9s4,9,9,9s9-4,9-9C20,12.4,19.6,12,19,12z M12,19.9c-3.8,0.6-7.4-2.1-7.9-5.9C3.5,10.2,6.2,6.6,10,6.1V13c0,0.6,0.4,1,1,1h6.9C17.5,17.1,15.1,19.5,12,19.9z M15,2c-0.6,0-1,0.4-1,1v6c0,0.6,0.4,1,1,1h6c0.6,0,1-0.4,1-1C22,5.1,18.9,2,15,2z M16,8V4.1C18,4.5,19.5,6,19.9,8H16z"></path>
        </svg>),
    },
];

interface ListType {
    value: string;
    label: string;
}
export const Listviewassigneddata: ListType[] = [
    { value: 'Angelina May', label: 'Angelina May' },
    { value: 'Kiara advain', label: 'Kiara advain' },
    { value: 'Hercules Jhon', label: 'Hercules Jhon' },
    { value: 'Mayor Kim', label: 'Mayor Kim' },
]
export const Prioritydata: ListType[] = [
    { value: 'High', label: 'High' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Low', label: 'Low' }
]
export const Statusdata: ListType[] = [
    { value: 'New', label: 'New' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Inprogress', label: 'Inprogress' },
    { value: 'Pending', label: 'Pending' }
]