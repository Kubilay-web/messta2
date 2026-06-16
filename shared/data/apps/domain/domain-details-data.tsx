import Link from "next/link";
import { RelatedDomains } from "./single-landing-data";

import Image from "next/image";

// Market Insights
export const MarketInsightsSeries = [{
    name: "Profit",
    data: [20, 38, 38, 72, 55, 63, 43, 76, 55, 80, 40, 80]
}, {
    name: "Total Views",
    data: [85, 65, 75, 38, 85, 35, 62, 40, 40, 64, 50, 89]
}]
export const MarketInsightsOptions = {
    chart: {
        height: 300,
        type: 'line',
        zoom: {
            enabled: false
        },
        dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 5,
            left: 0,
            blur: 3,
            color: '#000',
            opacity: 0.1
        },
    },
    dataLabels: {
        enabled: false
    },
    legend: {
        position: "top",
        horizontalAlign: "center",
        offsetX: -15,
        fontWeight: "bold",
    },
    stroke: {
        curve: 'smooth',
        width: '2',
        dashArray: [0, 5],
    },
    grid: {
        borderColor: '#f2f6f7',
    },
    colors: ["rgba(84, 109, 254)", "rgba(84, 109, 254,0.3)"],
    yaxis: {
        title: {
            text: 'Statistics',
            style: {
                color: '#adb5be',
                fontSize: '14px',
                fontFamily: 'poppins, sans-serif',
                fontWeight: 600,
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
        type: 'month',
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
    }
}


// Domain Overview
export const DomainOverview = [
    { id: 1, label: 'Domain Name', value: 'spotechtechnical.com' },
    { id: 2, label: 'Industry Type', value: 'Business' },
    { id: 3, label: 'Registrar', value: 'Spotech Technical' },
    { id: 4, label: 'Registered On', value: '13 Jan 2024' },
    { id: 5, label: 'Expires On', value: '21 Oct 2024' },
];

export const SwiperComponent = [
    <div>
        <div className="grid grid-cols-12 gap-x-6">
            {RelatedDomains.slice(0, 2).map((idx) => (
                <div className="md:col-span-6 col-span-12" key={idx.id}>
                    <div className="box">
                        <div className="box-body !p-4">
                            <div className="flex gap-4">
                                <div>
                                    <span className={`avatar avatar-lg bg-${idx.bgColor}/[0.15] svg-${idx.bgColor}`}>
                                        {idx.src ? (
                                            <Image fill src={idx.src} alt="img" className="img-fluid w-100 rounded-1" />
                                        ) : (idx.icon)}
                                    </span>
                                </div>
                                <div className="flex-grow">
                                    <div className="mb-4">
                                        <h6 className="font-semibold mb-1 text-[1.125rem]">{idx.title}</h6>
                                        <div className="flex items-baseline text-[0.6875rem]">
                                            <div className="text-[0.6875rem] text-textmuted dark:text-textmuted/50 me-2">
                                                <span className=""><i className="bi bi-geo-alt me-1"></i>USA</span>
                                                <span>,</span>
                                                <span className="">25 Feb 2024</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between flex-wrap gap-2">
                                        <h6 className="font-semibold mb-0 flex items-center gap-2">
                                            {idx.price} <span className="badge bg-danger/[0.15] text-danger">{idx.bids}  Bids</span></h6>
                                        <div className="min-w-fit">
                                            <Link scroll={false} href="#!" className="ti-btn ti-btn-primary !border-0">Bid Now</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>,
    <div>
        <div className="grid grid-cols-12 gap-x-6">
            {RelatedDomains.slice(2, 4).map((idx) => (
                <div className="md:col-span-6 col-span-12" key={idx.id}>
                    <div className="box">
                        <div className="box-body !p-4">
                            <div className="flex gap-4">
                                <div>
                                    <span className={`avatar avatar-lg bg-${idx.bgColor}/[0.15] svg-${idx.bgColor}`}>
                                        {idx.src ? (
                                            <Image fill src={idx.src} alt="img" className="img-fluid w-100 rounded-1" />
                                        ) : (idx.icon)}
                                    </span>
                                </div>
                                <div className="flex-grow">
                                    <div className="mb-4">
                                        <h6 className="font-semibold mb-1 text-[1.125rem]">{idx.title}</h6>
                                        <div className="flex items-baseline text-[0.6875rem]">
                                            <div className="text-[0.6875rem] text-textmuted dark:text-textmuted/50 me-2">
                                                <span className=""><i className="bi bi-geo-alt me-1"></i>USA</span>
                                                <span>,</span>
                                                <span className="">25 Feb 2024</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between flex-wrap gap-2">
                                        <h6 className="font-semibold mb-0 flex items-center gap-2">
                                            {idx.price} <span className="badge bg-danger/[0.15] text-danger">{idx.bids}  Bids</span></h6>
                                        <div className="min-w-fit">
                                            <Link scroll={false} href="#!" className="ti-btn ti-btn-primary !border-0">Bid Now</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>,
    <div>
        <div className="grid grid-cols-12 gap-x-6">
            {RelatedDomains.slice(4, 6).map((idx) => (
                <div className="md:col-span-6 col-span-12" key={idx.id}>
                    <div className="box">
                        <div className="box-body !p-4">
                            <div className="flex gap-4">
                                <div>
                                    <span className={`avatar avatar-lg bg-${idx.bgColor}/[0.15] svg-${idx.bgColor}`}>
                                        {idx.src ? (
                                            <Image fill src={idx.src} alt="img" className="img-fluid w-100 rounded-1" />
                                        ) : (idx.icon)}
                                    </span>
                                </div>
                                <div className="flex-grow">
                                    <div className="mb-4">
                                        <h6 className="font-semibold mb-1 text-[1.125rem]">{idx.title}</h6>
                                        <div className="flex items-baseline text-[0.6875rem]">
                                            <div className="text-[0.6875rem] text-textmuted dark:text-textmuted/50 me-2">
                                                <span className=""><i className="bi bi-geo-alt me-1"></i>USA</span>
                                                <span>,</span>
                                                <span className="">25 Feb 2024</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between flex-wrap gap-2">
                                        <h6 className="font-semibold mb-0 flex items-center gap-2">
                                            {idx.price} <span className="badge bg-danger/[0.15] text-danger">{idx.bids}  Bids</span></h6>
                                        <div className="min-w-fit">
                                            <Link scroll={false} href="#!" className="ti-btn ti-btn-primary !border-0">Bid Now</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>,
];

// Similar Domains
export const SimilarDomains = [
    {
        id: 1,
        type: "Domain",
        color: "danger",
        name: "eiusmod.com",
        location: "Kerala",
        date: "23 May 2024",
        bids: "2",
        price: "$543",
        image: "../../assets/images/marketplace/new-arrivals/1.png",
    },
    {
        id: 2,
        type: "Website",
        color: "info",
        name: "incididunt.in",
        location: "Banglore",
        date: "17 Jan 2024",
        bids: "3",
        price: "$654",
        image: "../../assets/images/marketplace/new-arrivals/2.png",
    },
    {
        id: 3,
        type: "Domain",
        color: "danger",
        name: "sanctus.org",
        location: "Chennai",
        date: "16 Mar 2024",
        bids: "2",
        price: "$234",
        image: "../../assets/images/marketplace/new-arrivals/3.png",
    },
    {
        id: 4,
        type: "Website",
        color: "info",
        name: "estametsit.net",
        location: "USA",
        date: "25 Feb 2024",
        bids: "5",
        price: "$120",
        image: "../../assets/images/marketplace/new-arrivals/4.png",
    }
];



