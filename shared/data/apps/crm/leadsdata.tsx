export const Leadsdata = [
    { id: 1, src1: "../../../assets/images/faces/4.jpg", src2: "../../../assets/images/company-logos/1.png", name: 'Charlotte', time: '24, Jul 2023 - 4:45PM', mail: 'Charlotte2981@gmail.com', cell: '1678-28993-223', badge: 'New', text1: 'Spruko Technologies', text2: 'Social Media', text3: 'New Lead', text4: 'Prospect', textColor1: 'primary', color1: 'primary', textColor2: 'primary', color2: 'primary' },
    { id: 2, src1: "../../../assets/images/faces/12.jpg", src2: "../../../assets/images/company-logos/3.png", name: 'Thomas', time: '15, Jul 2023 - 11:45AM', mail: 'Thomas289@gmail.com', cell: ' 8122-2342-4453', badge: 'Follow-up', text1: 'Spice Infotech', text2: 'Direct mail', text3: 'Customer', text4: 'Hot Lead', textColor1: 'primary', color1: 'primary', textColor2: 'danger', color2: 'danger' },
    { id: 3, src1: "../../../assets/images/faces/14.jpg", src2: "../../../assets/images/company-logos/4.png", name: 'Matthew', time: '10, Aug 2023 - 3:25PM', mail: 'Matthew789@gmail.com', cell: ' 1902-2001-3023', badge: 'Closed', text1: 'Logitech ecostics', text2: 'Blog Articles', text3: 'Partner', text4: '', textColor1: 'success', color1: 'success', textColor2: '', color2: '' },
    { id: 4, src1: "../../../assets/images/faces/6.jpg", src2: "../../../assets/images/company-logos/5.png", name: 'Isabella', time: '18, Aug 2023 - 10:10AM', mail: 'Isabella290@gmail.com', cell: ' 1603-2032-1123', badge: 'Contacted', text1: 'Initech Info', text2: 'Affiliates', text3: 'Lost Customer', text4: 'Influencer', textColor1: '', color1: 'light text-default', textColor2: 'primary', color2: 'primary' }, 
    { id: 5, src1: "../../../assets/images/faces/8.jpg", src2: "../../../assets/images/company-logos/6.png", name: 'Sophia', time: '19, Jul 2023 - 12:41PM', mail: 'Sophia1993@gmail.com', cell: '1129-2302-1092', badge: 'New', text1: 'Massive Dynamic', text2: 'Organic search', text3: 'Subscriber', text4: 'Partner', textColor1: 'pinkmain', color1: 'pinkmain', textColor2: 'success', color2: 'success' },
    { id: 6, src1: "../../../assets/images/faces/9.jpg", src2: "../../../assets/images/company-logos/7.png", name: 'Jack Miller', time: '14, Aug 2023 - 5:18PM', mail: 'JackMiller345@gmail.com', cell: ' 9923-2344-2003', badge: 'Follow-up', text1: 'Globex Corporation', text2: 'Social media', text3: 'Hot Lead', text4: 'Referral', textColor1: 'danger', color1: 'danger', textColor2: 'info', color2: 'info' },
    { id: 7, src1: "../../../assets/images/faces/15.jpg", src2: "../../../assets/images/company-logos/8.png", name: 'Michael', time: '12, Jun 2023 - 11:38AM', mail: 'Michael78@gmail.com', cell: '7891-2093-1994', badge: 'Closed', text1: 'Acme Corporation', text2: 'Blog Articles', text3: 'Trial User', text4: 'Cold Lead', textColor1: 'warning', color1: 'warning', textColor2: 'pinkmain', color2: 'pinkmain' },
    { id: 8, src1: "../../../assets/images/faces/1.jpg", src2: "../../../assets/images/company-logos/9.png", name: 'Olivia', time: '19, May 2023 - 1:57PM', mail: 'Olivia678@gmail.com', cell: '	1899-2993-1923', badge: 'Disqualified', text1: 'Soylent Corp', text2: 'Organic search', text3: 'Influencer', text4: 'Partner', textColor1: 'success', color1: 'success', textColor2: 'info', color2: 'info' },
    { id: 9, src1: "../../../assets/images/faces/3.jpg", src2: "../../../assets/images/company-logos/10.png", name: 'Emily', time: '28, Jul 2023 - 9:31AM', mail: 'Emily289@gmail.com', cell: ' 1768-2332-4934', badge: 'Qualified', text1: 'Umbrella Corporation', text2: 'Affiliates', text3: 'New Lead', text4: 'Lost Customer', textColor1: 'primary', color1: 'primary', textColor2: '', color2: 'light text-default' },
    { id: 10, src1: "../../../assets/images/faces/9.jpg", src2: "../../../assets/images/company-logos/2.png", name: 'James', time: '28, Jul 2023 - 9:31AM', mail: 'James186@gmail.com', cell: '4788-7822-4786', badge: 'Contacted', text1: 'Hooli Technologies', text2: 'Direct mail', text3: 'New Lead', text4: 'Subscriber', textColor1: 'primary', color1: 'primary', textColor2: 'pinkmain', color2: 'pinkmain' }
];

interface data {
    value: string;
    label: string;
}

export const Data: data[] = [
    { value: 'Select Tag', label: 'Select Tag' },
    { value: 'New Lead', label: 'New Lead' },
    { value: 'Prospect', label: 'Prospect' },
    { value: 'Customer', label: 'Customer' },
    { value: 'Hot Lead', label: 'Hot Lead' },
    { value: 'Partner', label: 'Partner' },
    { value: 'LostCustomer', label: 'LostCustomer' },
    { value: 'Influencer', label: 'Influencer' },
    { value: 'Subscriber', label: 'Subscriber' }
];
interface data1 {
    value: string;
    label: string;
}
export const Data1: data1[] = [
    { value: 'Social Media', label: 'Social Media' },
    { value: 'Direct mail', label: 'Direct mail' },
    { value: 'Blog Articles', label: 'Blog Articles' },
    { value: 'Affiliates', label: 'Affiliates' },
    { value: 'Organic search', label: 'Organic search' }
];
interface data2 {
    value: string;
    label: string;
}
export const Data2: data2[] = [
    { value: 'Select Status', label: 'Select Status' },
    { value: 'New', label: 'New' },
    { value: 'Follow-up', label: 'Follow-up' },
    { value: 'Closed', label: 'Closed' },
    { value: 'Contacted', label: 'Contacted' },
    { value: 'Disqualified', label: 'Disqualified' },
    { value: 'Qualified', label: 'Qualified' }
];
