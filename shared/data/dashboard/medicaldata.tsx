/* patients analysis */
export const AnalysisSries = [
    {
        name: "Patients",
        data: [
            {
                x: 'Sun',
                y: [2800]
            },
            {
                x: 'Mon',
                y: [3200]
            },
            {
                x: 'Tue',
                y: [2950]
            },
            {
                x: 'Wed',
                y: [3000]
            },
            {
                x: 'Thu',
                y: [3500]
            },
            {
                x: 'Fri',
                y: [4500]
            },
            {
                x: 'Sat',
                y: [4100]
            }
        ]
    }
]
export const AnalysisOptions = {
    chart: {
        height: 323,
        type: 'bar',
        zoom: {
            enabled: false
        }
    },
    colors: ['rgba(var(--primary-rgb))'],
    plotOptions: {
        bar: {
            columnWidth: "25%",
            borderRadius: 4
        }
    },
    legend: {
        show: true,
        showForSingleSeries: true,
        position: 'top',
        horizontalAlign: 'center',
        customLegendItems: ['Patients']
    },
    dataLabels: {
        enabled: false,
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
    tooltip: {
        enabled: true,
        theme: "dark",
    }
}



/* total patients */
export const PatientsSries = [
    {
        type: "line",
        name: "This Year",
        data: [15, 30, 22, 49, 32, 45, 30, 45, 65, 45, 25, 45],
    },
    {
        type: "area",
        name: "Previous Year",
        data: [8, 40, 15, 32, 45, 30, 20, 25, 18, 23, 20, 40],
    }
]
export const PatientsOptions = {
    chart: {
        type: "line",
        height: 350,
        toolbar: {
            show: false
        },
    },
    plotOptions: {
        bar: {
            columnWidth: "40%",
            borderRadius: 4,
        }
    },
    colors: [
        "rgba(var(--primary-rgb),0.7)",
        "rgba(215, 124, 247, 0.15)",
    ],
    fill: {
        type: 'solid',
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.4,
            opacityTo: 0.1,
            stops: [0, 90, 100],
        }
    },
    dataLabels: {
        enabled: false,
    },
    legend: {
        show: true,
        position: "top",
    },
    stroke: {
        curve: 'smooth',
        width: [2, 2],
        lineCap: 'round',
        dashArray: [4, 0]
    },
    grid: {
        borderColor: "#edeef1",
        strokeDashArray: 4,
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
    yaxis: {
        axisBorder: {
            show: true,
            color: "rgba(119, 119, 142, 0.05)",
            offsetX: 0,
            offsetY: 0,
        },
        axisTicks: {
            show: true,
            borderType: "solid",
            color: "rgba(119, 119, 142, 0.05)",
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
            color: "rgba(119, 119, 142, 0.05)",
            offsetX: 0,
            offsetY: 0,
        },
        axisTicks: {
            show: false,
            borderType: "solid",
            color: "rgba(119, 119, 142, 0.05)",
            width: 6,
            offsetX: 0,
            offsetY: 0,
        },
        labels: {
            rotate: -90,
        },
    },
    tooltip: {
        enabled: true,
        theme: "dark",
    }
}

// PATIENTS LIST
export const PatientsList = [
    {
        id:1,
        checked: false,
        patientId: 'SPK-9ABC',
        name: 'Jhon Doe',
        gender: 'Male',
        contact: '123-456-7890',
        lastAppointment: '2024-10-20',
        medicalHistory: 'Hypertension',
        medicalHistoryColor: "primary",
        nextAppointment: '2024-03-15',
        src: '../../assets/images/faces/11.jpg',
    },
    {
        id:2,
        checked: true,
        patientId: 'SPK-3Sfont',
        name: 'Jane Smith',
        gender: 'Female',
        contact: '987-654-3210',
        lastAppointment: '2024-09-15',
        medicalHistory: 'Diabetes',
        medicalHistoryColor: "secondary",
        nextAppointment: '2024-02-28',
        src: '../../assets/images/faces/2.jpg',
    },
    {
        id:3,
        checked: false,
        patientId: 'SPK-6SKF',
        name: 'Robert Jhonson',
        gender: 'Male',
        contact: '456-789-0123',
        lastAppointment: '2024-11-05',
        medicalHistory: 'Asthma',
        medicalHistoryColor: "success",
        nextAppointment: '2024-04-10',
        src: '../../assets/images/faces/12.jpg',
    },
    {
        id:4,
        checked: true,
        patientId: 'SPK-3ESD',
        name: 'Emiley Davis',
        gender: 'Female',
        contact: '789-012-3456',
        lastAppointment: '2024-08-12',
        medicalHistory: 'Allergies',
        medicalHistoryColor: "orangemain",
        nextAppointment: '2024-01-20',
        src: '../../assets/images/faces/5.jpg',
    },
    {
        id:5,
        checked: true,
        patientId: 'SPK-3KSE',
        name: 'William Martinez',
        gender: 'Male',
        contact: '234-567-8901',
        lastAppointment: '2024-12-08',
        medicalHistory: 'General',
        medicalHistoryColor: "info",
        nextAppointment: '2024-05-05',
        src: '../../assets/images/faces/11.jpg',
    },
    {
        id:6,
        checked: false,
        patientId: 'SPK-4DFS',
        name: 'Sarah Wilson',
        gender: 'Female',
        contact: '567-890-1234',
        lastAppointment: '2024-07-25',
        medicalHistory: 'High Cholesterol',
        medicalHistoryColor: "warning",
        nextAppointment: '2024-03-01',
        src: '../../assets/images/faces/4.jpg',
    },
];

export const cardData = [
    {
        iconClass: 'primary',
        boxClass: "total-pateints",
        avatarClass: 'bg-primary/[0.15] border border-primary/10',
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="!text-white !fill-white" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><circle cx="152" cy="48" r="24" opacity="0.2" /><circle cx="152" cy="48" r="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><path d="M48,129s56-52.65,88-24.87C153.94,119.67,168,144,208,144" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><polyline points="152 232 152 176 109.54 145.67" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><line x1="129.53" y1="99.69" x2="72" y2="232" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>),
        count: '1.2K',
        title: 'Total Patients',
        percentage: '0.67%',
        percentageClass: 'text-success',
        percentageIcon: 'ri-arrow-up-s-fill'
    },
    {
        iconClass: 'secondary',
        boxClass: "appointments",
        avatarClass: 'bg-secondary/[0.15] border border-secondary/10',
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="!text-white !fill-white" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><path d="M208,40H48a8,8,0,0,0-8,8V208a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V48A8,8,0,0,0,208,40ZM57.78,216A72,72,0,0,1,128,160a40,40,0,1,1,40-40,40,40,0,0,1-40,40,72,72,0,0,1,70.22,56Z" opacity="0.2" /><circle cx="128" cy="120" r="40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><rect x="40" y="40" width="176" height="176" rx="8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><path d="M57.78,216a72,72,0,0,1,140.44,0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>),
        count: '256',
        title: 'Appointments',
        percentage: '1.44%',
        percentageClass: 'text-danger',
        percentageIcon: 'ri-arrow-down-s-fill'
    },
    {
        iconClass: 'success',
        boxClass: 'available-doctors',
        avatarClass: 'bg-success/[0.15] border border-success/10',
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="!text-white !fill-white" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><circle cx="200" cy="152" r="32" opacity="0.2" /><circle cx="200" cy="152" r="12" /><circle cx="200" cy="152" r="32" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><path d="M96,136v48a40,40,0,0,0,40,40h24a40,40,0,0,0,40-40h0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><path d="M128,32h16a8,8,0,0,1,8,8V79.17c0,30.77-24.48,56.43-55.26,56.83A56,56,0,0,1,40,80V40a8,8,0,0,1,8-8H64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>),
        count: '53',
        title: 'Available Doctors',
        percentage: '2.75%',
        percentageClass: 'text-success',
        percentageIcon: 'ri-arrow-up-s-fill'
    },
    {
        iconClass: 'orange',
        avatarClass: 'bg-orangemain/[0.15] border border-orangemain/10',
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="!text-white !fill-white" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><path d="M48,40H208a8,8,0,0,1,8,8V200a0,0,0,0,1,0,0H40a0,0,0,0,1,0,0V48A8,8,0,0,1,48,40Z" opacity="0.2" /><line x1="128" y1="40" x2="128" y2="224" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><line x1="160" y1="72" x2="184" y2="72" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><line x1="160" y1="104" x2="184" y2="104" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><line x1="72" y1="72" x2="96" y2="72" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><line x1="72" y1="104" x2="96" y2="104" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><path d="M48,40H208a8,8,0,0,1,8,8V200a0,0,0,0,1,0,0H40a0,0,0,0,1,0,0V48A8,8,0,0,1,48,40Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><line x1="40" y1="200" x2="40" y2="224" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><line x1="216" y1="200" x2="216" y2="224" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>),
        count: '142',
        title: 'Available Rooms',
        boxClass: 'available-rooms',
        percentage: '1.16%',
        percentageClass: 'text-success',
        percentageIcon: 'ri-arrow-up-s-fill'
    }
];

export const doctors = [
    {
        name: 'Dr. Smith',
        specialty: 'Cardiology',
        availability: 'Available',
        badgeClass: 'bg-success/[0.15] text-success',
        imageSrc: '../../assets/images/faces/doctors/1.jpg',
    },
    {
        name: 'Dr. Johnson',
        specialty: 'Orthopedics',
        availability: 'Available',
        badgeClass: 'bg-success/[0.15] text-success',
        imageSrc: '../../assets/images/faces/doctors/2.jpg',
    },
    {
        name: 'Dr. Davis',
        specialty: 'Dermatology',
        availability: 'Not Available',
        badgeClass: 'bg-danger/[0.15] text-danger',
        imageSrc: '../../assets/images/faces/doctors/3.jpg',
    },
    {
        name: 'Dr. Miller',
        specialty: 'Neurology',
        availability: 'Available',
        badgeClass: 'bg-success/[0.15] text-success',
        imageSrc: '../../assets/images/faces/doctors/4.jpg',
    },
    {
        name: 'Dr. Anderson',
        specialty: 'Ophthalmology',
        availability: 'Available',
        badgeClass: 'bg-success/[0.15] text-success',
        imageSrc: '../../assets/images/faces/doctors/5.jpg',
    },
    {
        name: 'Dr. Martinez',
        specialty: 'Gastroenterology',
        availability: 'Not Available',
        badgeClass: 'bg-danger/[0.15] text-danger',
        imageSrc: '../../assets/images/faces/doctors/6.jpg',
    },
];

export const appointments = [
    {
        title: 'General Checkup',
        id: '#SPK101',
        dateTime: '13 Feb 2024, 10:25am',
        iconClass: 'ti-stethoscope',
        bgColorClass: 'bg-primary/[0.15] !text-primary',
        status: 'Completed',
        statusClass: 'text-primary'
    },
    {
        title: 'Follow-up appointment',
        id: '#SPK121',
        dateTime: '13 Feb 2024, 11:15am',
        iconClass: 'ti-report-medical',
        bgColorClass: 'bg-secondary/[0.15] !text-secondary',
        status: 'Rescheduled',
        statusClass: 'text-secondary'
    },
    {
        title: 'Heart Checkup',
        id: '#SPK114',
        dateTime: '13 Feb 2024, 02:30pm',
        iconClass: 'ti-heartbeat',
        bgColorClass: 'bg-success/[0.15] !text-success',
        status: 'Scheduled',
        statusClass: 'text-success'
    },
    {
        title: 'Blood test results review',
        id: '#SPK132',
        dateTime: '13 Feb 2024, 03:45pm',
        iconClass: 'ti-vaccine',
        bgColorClass: 'bg-orangemain/[0.15] !text-orangemain',
        status: 'Cancelled',
        statusClass: 'text-orangemain'
    },
    {
        title: 'Dental Cleanup',
        id: '#SPK115',
        dateTime: '14 Feb 2024, 10:15am',
        iconClass: 'ti-dental',
        bgColorClass: 'bg-info/[0.15] !text-info',
        status: 'Completed',
        statusClass: 'text-info'
    },
    {
        title: 'Vaccination',
        id: '#SPK118',
        dateTime: '14 Feb 2024, 11:30am',
        iconClass: 'ti-vaccine-bottle',
        bgColorClass: 'bg-warning/[0.15] !text-warning',
        status: 'Scheduled',
        statusClass: 'text-warning'
    }
];