interface loppdata {
    value: string;
    label: string;
}
export const Data: loppdata[] = [
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

export const Data1: loppdata[] = [
    { value: 'Social Media', label: 'Social Media' },
    { value: 'Direct mail', label: 'Direct mail' },
    { value: 'Blog Articles', label: 'Blog Articles' },
    { value: 'Affiliates', label: 'Affiliates' },
    { value: 'Organic search', label: 'Organic search' }
];


interface LeadStatus {
    text: string;
    color: string;
  }
  
  // Define the type for each contact
  interface Contact {
    id: string;
    name: string;
    email: string;
    phone: string;
    lead: string;
    company: string;
    lastContacted: string;
    contactMethod: string;
    leadStatus: LeadStatus[];
    avatarSrc: string;
    companyLogoSrc: string;
  }

// Contacts
export const ContactsData: Contact[] = [
    {
        id:" 1",
        name: 'Lisa Convay',
        email: 'lisaconvay2981@gmail.com',
        phone: '1678-28993-223',
        lead: "258",
        company: 'Spruko Technologies',
        lastContacted: '24, Jul 2023 - 4:45PM',
        contactMethod: 'Social Media',
        leadStatus: [{ text: 'New Lead', color: "bg-primary/10 text-primary" }, { text: 'Prospect', color: "bg-primary/10 text-primary" }],
        avatarSrc: '../../../assets/images/faces/4.jpg',
        companyLogoSrc: '../../../assets/images/company-logos/1.png',
    },
    {
        id: "2",
        name: 'Jacob Smith',
        email: 'jacobsmith289@gmail.com',
        phone: '8122-2342-4453',
        lead: "685",
        company: 'Spice Infotech',
        lastContacted: '15, Jul 2023 - 11:45AM',
        contactMethod: 'Direct mail',
        leadStatus: [{ text: 'Customer', color: "bg-primary/10 text-primary" }, { text: 'Hot Lead', color: "bg-danger/10 text-danger" }],
        avatarSrc: '../../../assets/images/faces/12.jpg',
        companyLogoSrc: '../../../assets/images/company-logos/3.png',
    },
    {
        id: "3",
        name: 'Jake Sully',
        email: 'jakesully789@gmail.com',
        phone: '1902-2001-3023',
        lead: "685",
        company: 'Logitech ecostics',
        lastContacted: '10, Aug 2023 - 3:25PM',
        contactMethod: 'Blog Articles',
        leadStatus: [{ text: 'Partner', color: "bg-success/10 text-success" }],
        avatarSrc: '../../../assets/images/faces/14.jpg',
        companyLogoSrc: '../../../assets/images/company-logos/4.png',
    },
    {
        id:" 4",
        name: 'Kiara Advain',
        email: 'kiaraadvain290@gmail.com',
        phone: '1678-28993-223',
        lead: "425",
        company: 'Initech Info',
        contactMethod: 'Affiliates',
        leadStatus: [{ text: 'LostCustomer', color: "bg-light text-default" }, { text: 'Influencer', color: "bg-secondary/10 text-secondary" }],
        lastContacted: '18, Aug 2023 - 10:10AM',
        avatarSrc: '../../../assets/images/faces/6.jpg',
        companyLogoSrc: '../../../assets/images/company-logos/5.png',
    },
    {
        id: "5",
        name: 'Brenda Simpson',
        email: 'brendasimpson1993@gmail.com',
        phone: '8122-2342-4453',
        lead: "516",
        company: 'Massive Dynamic',
        contactMethod: 'Direct mail',
        leadStatus: [{ text: 'Customer', color: "bg-primary/10 text-primary" }, { text: 'Hot Lead', color: "bg-danger/10 text-danger" }],
        lastContacted: '19, Jul 2023 - 12:41PM',
        avatarSrc: '../../../assets/images/faces/8.jpg',
        companyLogoSrc: '../../../assets/images/company-logos/6.png',
    },
    {
        id: "6",
        name: "Json Taylor",
        avatarSrc: "../../../assets/images/faces/9.jpg",
        companyLogoSrc: "../../../assets/images/company-logos/7.png",
        company: "Globex Corporation",
        email: "jsontaylor345@gmail.com",
        phone: "9923-2344-2003",
        lead: "127",
        contactMethod: "Social media",
        leadStatus: [{ text: 'Hot Lead', color: "bg-danger/10 text-danger" }, { text: 'Referral', color: "bg-info/10 text-info" }],
        lastContacted: "14, Aug 2023 - 5:18PM"
    },
    {
        id: "7",
        name: "Dwayne Jhonson",
        avatarSrc: "../../../assets/images/faces/15.jpg",
        companyLogoSrc: "../../../assets/images/company-logos/8.png",
        company: "Acme Corporation",
        email: "dwayenejhonson78@gmail.com",
        phone: "7891-2093-1994",
        lead: "368",
        contactMethod: "Blog Articles",
        leadStatus: [{ text: 'Trial User', color: "bg-warning/10 text-warning" }, { text: 'Cold Lead', color: "bg-info/10 text-info" }],
        lastContacted: "12, Jun 2023 - 11:38AM"
    },
    {
        id: "8",
        name: "Emiley Jackson",
        avatarSrc: "../../../assets/images/faces/1.jpg",
        companyLogoSrc: "../../../assets/images/company-logos/9.png",
        company: "Soylent Corp",
        email: "emileyjackson678@gmail.com",
        phone: "1899-2993-0923",
        lead: "563",
        contactMethod: "Organic search",
        leadStatus: [{ text: 'Influencer', color: "bg-success/10 text-success" }, { text: 'Partner', color: "bg-info/10 text-info" }],
        lastContacted: "19, May 2023 - 1:57PM",
    },
    {
        id: "9",
        name: "Jessica Morris",
        avatarSrc: "../../../assets/images/faces/3.jpg",
        companyLogoSrc: "../../../assets/images/company-logos/10.png",
        company: "Umbrella Corporation",
        email: "jessicamorris289@gmail.com",
        phone: "1768-2332-4934",
        lead: "185",
        contactMethod: "Affiliates",
        leadStatus: [{ text: 'New Lead', color: "bg-primary/10 text-primary" }, { text: 'Lost Customer', color: "bg-light text-default" }],
        lastContacted: "28, Jul 2023 - 9:31AM",
    },
    {
        id: "10",
        name: "Michael Jeremy",
        avatarSrc: "../../../assets/images/faces/9.jpg",
        companyLogoSrc: "../../../assets/images/company-logos/2.png",
        company: "Hooli Technologies",
        email: "michaeljeremy186@gmail.com",
        phone: "4788-7822-4786",
        lead: "240",
        contactMethod: "Direct mail",
        leadStatus: [{ text: 'New Lead', color: "bg-primary/10 text-primary" }, { text: 'Subscriber', color: "bg-pinkmain/10 text-pinkmain" }],
        lastContacted: "28, Jul 2023 - 9:31AM",
    },

];