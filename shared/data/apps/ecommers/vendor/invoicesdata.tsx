const NoteIcon = <svg xmlns="http://www.w3.org/2000/svg" className="!fill-white !text-white" data-name="Layer 1" viewBox="0 0 24 24"><path d="M13,16H7a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2ZM9,10h2a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Zm12,2H18V3a1,1,0,0,0-.5-.87,1,1,0,0,0-1,0l-3,1.72-3-1.72a1,1,0,0,0-1,0l-3,1.72-3-1.72a1,1,0,0,0-1,0A1,1,0,0,0,2,3V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V13A1,1,0,0,0,21,12ZM5,20a1,1,0,0,1-1-1V4.73L6,5.87a1.08,1.08,0,0,0,1,0l3-1.72,3,1.72a1.08,1.08,0,0,0,1,0l2-1.14V19a3,3,0,0,0,.18,1Zm15-1a1,1,0,0,1-2,0V14h2Zm-7-7H7a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2Z"></path></svg>
const NoteIcon1 = <svg xmlns="http://www.w3.org/2000/svg" className="!fill-white !text-white" viewBox="0 0 24 24"><path d="M11.5,20h-6a1,1,0,0,1-1-1V5a1,1,0,0,1,1-1h5V7a3,3,0,0,0,3,3h3v5a1,1,0,0,0,2,0V9s0,0,0-.06a1.31,1.31,0,0,0-.06-.27l0-.09a1.07,1.07,0,0,0-.19-.28h0l-6-6h0a1.07,1.07,0,0,0-.28-.19.29.29,0,0,0-.1,0A1.1,1.1,0,0,0,11.56,2H5.5a3,3,0,0,0-3,3V19a3,3,0,0,0,3,3h6a1,1,0,0,0,0-2Zm1-14.59L15.09,8H13.5a1,1,0,0,1-1-1ZM7.5,14h6a1,1,0,0,0,0-2h-6a1,1,0,0,0,0,2Zm4,2h-4a1,1,0,0,0,0,2h4a1,1,0,0,0,0-2Zm-4-6h1a1,1,0,0,0,0-2h-1a1,1,0,0,0,0,2Zm13.71,6.29a1,1,0,0,0-1.42,0l-3.29,3.3-1.29-1.3a1,1,0,0,0-1.42,1.42l2,2a1,1,0,0,0,1.42,0l4-4A1,1,0,0,0,21.21,16.29Z"></path></svg>
const PieIcon = <svg xmlns="http://www.w3.org/2000/svg" className="!fill-white !text-white" enableBackground="new 0 0 24 24" viewBox="0 0 24 24"><path d="M19,12h-7V5c0-0.6-0.4-1-1-1c-5,0-9,4-9,9s4,9,9,9s9-4,9-9C20,12.4,19.6,12,19,12z M12,19.9c-3.8,0.6-7.4-2.1-7.9-5.9C3.5,10.2,6.2,6.6,10,6.1V13c0,0.6,0.4,1,1,1h6.9C17.5,17.1,15.1,19.5,12,19.9z M15,2c-0.6,0-1,0.4-1,1v6c0,0.6,0.4,1,1,1h6c0.6,0,1-0.4,1-1C22,5.1,18.9,2,15,2z M16,8V4.1C18,4.5,19.5,6,19.9,8H16z"></path></svg>

// Invoices List
export const InvoicesList = [
    { src: "../../../assets/images/faces/11.jpg", name: "Jack Miller", mail: "jackmiller2416@gmail.com", id: "#SPK12032901", date: "21,Nov 2022", amount: "$212.45", status: "Paid", statusColor: "success", dueDate: "25,Dec 2022" },
    { src: "../../../assets/images/faces/7.jpg", name: "Suzika Stallone", mail: "suzikastallone3214@gmail.com", id: "#SPK12032912", date: "25,Nov 2022", amount: "$512.99", status: "Pending", statusColor: "warning", dueDate: "13,Dec 2022" },
    { src: "../../../assets/images/faces/15.jpg", name: "Roman Killon", mail: "romankillon143@gmail.com", id: "#SPK12032945", date: "13,Nov 2022", amount: "$2199.49", status: "Overdue", statusColor: "danger", dueDate: "30,Dec 2022" },
    { src: "../../../assets/images/faces/12.jpg", name: "Charlie Davieson", mail: "charliedavieson@gmail.com", id: "#SPK12032922", date: "30,Nov 2022", amount: "$1569.99", status: "Paid", statusColor: "success", dueDate: "18,Dec 2022" },
    { src: "../../../assets/images/faces/4.jpg", name: "Selena Deoyl", mail: "selenadeoyl114@gmail.com", id: "#SPK12032932", date: "18,Nov 2022", amount: "$4,873.99", status: "Due By 1 Day", statusColor: "primary", dueDate: "18,Dec 2022" },
    { src: "../../../assets/images/faces/7.jpg", name: "Kiara Advensh", mail: "kiaraadvensh87@gmail.com", id: "#SPK12032978", date: "02,Nov 2022", amount: "$1923.99", status: "Paid", statusColor: "success", dueDate: "18,Dec 2022" },
    { src: "../../../assets/images/faces/9.jpg", name: "Joseph Samurai", mail: "josephsamurai@gmail.com", id: "#SPK12032919", date: "15,Nov 2022", amount: "$1,623.99", status: "Paid", statusColor: "success", dueDate: "15,Dec 2022" },
    { src: "../../../assets/images/faces/13.jpg", name: "Kevin Powell", mail: "kevinpowell@gmail.com", id: "#SPK12032931", date: "21,Nov 2022", amount: "$3,423.99", status: "Pending", statusColor: "warning", dueDate: "21,Dec 2022" },
    { src: "../../../assets/images/faces/8.jpg", name: "Darla Jung", mail: "darlajung555@gmail.com", id: "#SPK12032958", date: "15,Oct 2022", amount: "$2,982.99", status: "Paid", statusColor: "success", dueDate: "15,Nov 2022" },
]

export const Invoicecards = [
    {
        id:1,
        iconBG: "primary",
        iconBgColor: "primary",
        icon: NoteIcon,
        title: "Total Amount",
        value: 471,
        valueUnit: "k",
        badge: "12,345",
        percentChange: "3.25",
        iconClass: "primary",
        percentClass: "success",
        arrowClass: "up"
    },
    {
        id:2,
        iconBG: "secondary",
        iconBgColor: "secondary",
        icon: NoteIcon1,
        title: "Total Paid",
        value: 320,
        valueUnit: "k",
        badge: "4,176",
        percentChange: "1.16",
        iconClass: "secondary",
        percentClass: "danger",
        arrowClass: "down"
    },
    {
        id:3,
        iconBG: "success",
        iconBgColor: "success",
        icon: PieIcon,
        title: "Pending Invoices",
        value: 81,
        valueUnit: "",
        badge: "7,064",
        percentChange: "0.25",
        iconClass: "success",
        percentClass: "success",
        arrowClass: "up"
    },
    {
        id:4,
        iconBG: "orange ",
        iconBgColor: "orangemain",
        icon: PieIcon,
        title: "Overdue Invoices",
        value: 33,
        valueUnit: "K",
        badge: "1,105",
        percentChange: "0.46",
        iconClass: "orange",
        percentClass: "danger",
        arrowClass: "down"
    }
];