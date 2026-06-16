export const Companydata = [
    { id: 1, src1: "../../../assets/images/faces/4.jpg", src2: "../../../assets/images/company-logos/1.png", name: 'Charlotte', time: '24, Jul 2023 - 4:45PM', score: '258', mail: 'sprukotechnologies2981@gmail.com', cell: '1678-28993-223', badgeTextColor: 'primary', badgeColor: 'primary/10', badge: 'Corporate', text1: 'Spruko Technologies', text2: 'Information Technology', contactName: 'Lisa Convay', class: 'primary' },
    { id: 2, src1: "../../../assets/images/faces/12.jpg", src2: "../../../assets/images/company-logos/3.png", name: 'Thomas', time: '15, Jul 2023 - 11:45AM', score: '335', mail: 'spiceinfotech289@gmail.com', cell: ' 8122-2342-4453', badgeTextColor: 'danger', badgeColor: 'danger/10', badge: 'Small Business', text1: 'Spice Infotech', text2: 'Telecommunications', contactName: 'Jacob Smith', class: 'danger' },
    { id: 3, src1: "../../../assets/images/faces/14.jpg", src2: "../../../assets/images/company-logos/4.png", name: 'Matthew', time: '10, Aug 2023 - 3:25PM', score: '685', mail: 'logitecheco789@gmail.com', cell: ' 1902-2001-3023', badgeTextColor: 'success', badgeColor: 'success/10', badge: 'Micro Business', text1: 'Logitech ecostics', text2: 'Logistics', contactName: 'Jake Sully', class: 'success' },
    { id: 4, src1: "../../../assets/images/faces/6.jpg", src2: "../../../assets/images/company-logos/5.png", name: 'Isabella', time: '18, Aug 2023 - 10:10AM', score: '425', mail: 'initechinfo290@gmail.com', cell: ' 1603-2032-1123', badgeTextColor: 'default', badgeColor: 'light', badge: 'Startup', text1: 'Initech Info', text2: 'Information Technology', contactName: 'Kiara Advain', class: 'default' },
    { id: 5, src1: "../../../assets/images/faces/8.jpg", src2: "../../../assets/images/company-logos/6.png", name: 'Sophia', time: '19, Jul 2023 - 12:41PM', score: '516', mail: 'massivedynamic1993@gmail.com', cell: '1129-2302-1092', badgeTextColor: 'pinkmain', badgeColor: 'pinkmain/10', badge: 'Large Enterprise', text1: 'Massive Dynamic', text2: 'Professional Services', contactName: 'Brenda Simpson', class: 'pink' },
    { id: 6, src1: "../../../assets/images/faces/9.jpg", src2: "../../../assets/images/company-logos/7.png", name: 'Jack Miller', time: '14, Aug 2023 - 5:18PM', score: '127', mail: 'globexcorp345@gmail.com', cell: ' 9923-2344-2003', badgeTextColor: 'danger', badgeColor: 'danger/10', badge: 'Small Business', text1: 'Globex Corporation', text2: 'Education', contactName: 'Json Taylor', class: 'danger' },
    { id: 7, src1: "../../../assets/images/faces/15.jpg", src2: "../../../assets/images/company-logos/8.png", name: 'Michael', time: '12, Jun 2023 - 11:38AM', score: '368', mail: 'acmecorporation78@gmail.com', cell: '7891-2093-1994', badgeTextColor: 'primary', badgeColor: 'primary/10', badge: 'Corporate', text1: 'Acme Corporation', text2: 'Telecommunications', contactName: 'Dwayne Jhonson', class: 'primary' },
    { id: 8, src1: "../../../assets/images/faces/1.jpg", src2: "../../../assets/images/company-logos/9.png", name: 'Olivia', time: '19, May 2023 - 1:57PM', score: '563', mail: 'soylentcorp678@gmail.com', cell: '	1899-2993-1923', badgeTextColor: 'warning', badgeColor: 'warning/10', badge: 'Medium Size', text1: 'Soylent Corp', text2: 'Manufacturing', contactName: 'Emiley Jackson', class: 'warning' },
    { id: 9, src1: "../../../assets/images/faces/3.jpg", src2: "../../../assets/images/company-logos/10.png", name: 'Emily', time: '28, Jul 2023 - 9:31AM', score: '185', mail: 'umbrellacorp289@gmail.com', cell: ' 1768-2332-4934', badgeTextColor: 'success', badgeColor: 'success/10', badge: 'Micro Business', text1: 'Umbrella Corporation', text2: 'Healthcare', contactName: 'Jessica Morris', class: 'success' },
    { id: 10, src1: "../../../assets/images/faces/9.jpg", src2: "../../../assets/images/company-logos/2.png", name: 'James', time: '28, Jul 2023 - 9:31AM', score: '240', mail: 'hoolitech186@gmail.com', cell: '4788-7822-4786', badgeTextColor: 'default', badgeColor: 'light', badge: 'Startup', text1: 'Hooli Technologies', text2: 'Information Technology', contactName: 'Michael Jeremy', class: 'default' }
];

interface selectdata1 {
    value: string;
    label: string;
}

export const Selectdata1: selectdata1[] = [
    { value: 'Company Size', label: 'Company Size' },
    { value: 'Corporate', label: 'Corporate' },
    { value: 'Small Business', label: 'Small Business' },
    { value: 'Micro Business', label: 'Micro Business' },
    { value: 'Startup', label: 'Startup' },
    { value: 'Large Enterprise', label: 'Large Enterprise' },
    { value: 'Medium Size', label: 'Medium Size' },
];

interface selectdata2 {
    value: string;
    label: string;
}
export const Selectdata2: selectdata2[] = [
    { value: 'Select Insustry', label: 'Select Insustry' },
    { value: 'Information Technology', label: 'Information Technology' },
    { value: 'Telecommunications', label: 'Telecommunications' },
    { value: 'Logistics', label: 'Logistics' },
    { value: 'Professional Services', label: 'Professional Services' },
    { value: 'Education', label: 'Education' },
    { value: 'Manufacturing', label: 'Manufacturing' },
    { value: 'Healthcare', label: 'Healthcare' }
];
