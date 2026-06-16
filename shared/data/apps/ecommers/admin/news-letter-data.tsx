
// SUBSCRIBERS LIST
export const SubscribersList = [
    {
        id: 1,
        name: 'Emily Johnson',
        email: 'emily.johnson@example.com',
        createdDate: '12 Oct 2024',
        status: 'Active',
        statusColor: "success",
        location: 'Pune, India',
        src: '../../../../assets/images/faces/1.jpg',
    },
    {
        id: 2,
        name: 'Alex Smith',
        email: 'alex.smith@email.com',
        createdDate: '15 Nov 2024',
        status: 'Active',
        statusColor: "success",
        location: 'Noida, India',
        src: '../../../../assets/images/faces/3.jpg',
    },
    {
        id: 3,
        name: 'Jessica Miller',
        email: 'jessica.miller@example.net',
        createdDate: '21 Jan 2024',
        status: 'Deactive',
        statusColor: "danger",
        location: 'Bangalore, Karnataka, India',
        src: '../../../../assets/images/faces/4.jpg',
    },
    {
        id: 4,
        name: 'Ryan Davis',
        email: 'ryan.davis@email.org',
        createdDate: '30 Mar 2024',
        status: 'Active',
        statusColor: "success",
        location: 'Surat, Gujarat, India',
        src: '../../../../assets/images/faces/5.jpg',
    },
    {
        id: 5,
        name: 'Megan Brown',
        email: 'megan.brown@example.co',
        createdDate: '25 April 2024',
        status: 'Deactive',
        statusColor: "danger",
        location: 'Surat, Gujarat, India',
        src: '../../../../assets/images/faces/21.jpg',
    },
    {
        id: 6,
        name: 'Jordan Taylor',
        email: 'jordan.taylor@example.info',
        createdDate: '16 May 2024',
        status: 'Active',
        statusColor: "success",
        location: 'Surat, Gujarat, India',
        src: '../../../../assets/images/faces/7.jpg',
    },
    {
        id: 7,
        name: 'Ashley White',
        email: 'ashley.white@example.biz',
        createdDate: '21 June 2024',
        status: 'Active',
        statusColor: "success",
        location: 'Surat, Gujarat, India',
        src: '../../../../assets/images/faces/8.jpg',
    },
];
interface data1 {
    id: number,
    value: string;
    label: string;
  }
  export const Locationdata: data1[] = [
    { id: 1, value: "Choice 1", label: 'Pune, India' },
    { id: 2, value: "Choice 2", label: 'Noida, India' },
    { id: 3, value: "Choice 3", label: ' Banglore, Karnataka, India' },
    { id: 4, value: "Choice 4", label: 'Surat, Gujarat, India' }
  ];
  export const Statusdata: data1[] = [
    { id: 1, value: "Choice 1", label: 'Active' },
    { id: 2, value: "Choice 2", label: 'Deactive' },
  ];