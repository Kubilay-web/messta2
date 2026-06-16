import SpkSocialmediaCard from "@/shared/@spk-reusable-components/dashboards/spk-socialmedia-card"
import Spktables from "@/shared/@spk-reusable-components/tables/spk-tables";
import SpkDropdown from "@/shared/@spk-reusable-components/uielements/spk-dropdown";
import dynamic from "next/dynamic";
import Link from "next/link";
const WorldMap = dynamic(() => import('react-svg-worldmap'), { ssr: false });
/* youtube subscribers */
export const YoutubeSeries = [{
    data: [20, 14, 19, 10, 23, 20, 22, 9, 12]
}]
export const YoutubeOptions: any = {
    chart: {
        height: 30,
        width: 100,
        type: 'area',
        zoom: {
            enabled: false
        },
        sparkline: {
            enabled: true
        }
    },
    tooltip: {
        enabled: true,
        theme: "dark",
        x: {
            show: false
        },
        y: {
            title: {
                formatter: function (_seriesName: any) {
                    return ''
                }
            }
        },
        marker: {
            show: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth',
        width: [1.5],
    },
    title: {
        text: undefined,
    },
    grid: {
        borderColor: 'transparent',
    },
    xaxis: {
        crosshairs: {
            show: false,
        }
    },
    colors: ["rgba(var(--primary-rgb))"],

    fill: {
        type: 'gradient',
        gradient: {
            opacityFrom: 0.5,
            opacityTo: 0.2,
            stops: [0, 60],
            colorStops: [
                [
                    {
                        offset: 0,
                        color: 'rgba(var(--primary-rgb),0.2)',
                        opacity: 1
                    },
                    {
                        offset: 60,
                        color: 'rgba(var(--primary-rgb),0.2)',
                        opacity: 0.1
                    }
                ],
            ]
        }
    },
}

/* twitter followers */
export const TwitterSeries = [{
    name: 'Value',
    data: [20, 14, 20, 22, 9, 12, 19, 10, 25]
}]
export const TwitterOptions: any = {
    chart: {
        type: 'area',
        height: 30,
        width: 100,
        sparkline: {
            enabled: true
        }
    },
    stroke: {
        width: [1.5],
    },
    series: [{
        name: 'Value',
        data: [20, 14, 20, 22, 9, 12, 19, 10, 25]
    }],
    yaxis: {
        min: 0,
        show: false,
        axisBorder: {
            show: false
        },
    },
    xaxis: {
        show: false,
        axisBorder: {
            show: false
        },
    },
    tooltip: {
        enabled: true,
        theme: "dark",
        x: {
            show: false
        },
        y: {
            title: {
                formatter: function (_seriesName: any) {
                    return ''
                }
            }
        },
        marker: {
            show: false
        }
    },
    colors: ["rgb(215, 124, 247)"],
    fill: {
        type: 'gradient',
        gradient: {
            opacityFrom: 0.5,
            opacityTo: 0.2,
            stops: [0, 60]
        }
    }
}

/* facebook followers */
export const FacebookSeries = [{
    name: 'Value',
    data: [20, 20, 22, 9, 14, 19, 10, 25, 12]
}]
export const FacebookOptions: any = {
    chart: {
        type: 'area',
        height: 30,
        width: 100,
        sparkline: {
            enabled: true
        }
    },
    stroke: {
        width: [1.5],
    },
    series: [{
        name: 'Value',
        data: [20, 14, 20, 22, 9, 12, 19, 10, 25]
    }],
    yaxis: {
        min: 0,
        show: false,
        axisBorder: {
            show: false
        },
    },
    xaxis: {
        show: false,
        axisBorder: {
            show: false
        },
    },
    tooltip: {
        enabled: true,
        theme: "dark",
        x: {
            show: false
        },
        y: {
            title: {
                formatter: function (_seriesName: any) {
                    return ''
                }
            }
        },
        marker: {
            show: false
        }
    },
    fill: {
        type: 'gradient',
        gradient: {
            opacityFrom: 0.5,
            opacityTo: 0.2,
            stops: [0, 60]
        }
    },
    colors: ["rgb(12 ,215, 177)"],

}

/* instagram followers */
export const InstagramSeries = [{
    name: 'Value',
    data: [20, 20, 22, 9, 12, 14, 19, 10, 25]
}]
export const InstagramOptions: any = {
    chart: {
        type: 'area',
        height: 30,
        width: 100,
        sparkline: {
            enabled: true
        }
    },
    stroke: {
        width: [1.5],
    },

    series: [{
        name: 'Value',
        data: [20, 20, 22, 9, 12, 14, 19, 10, 25]
    }],
    yaxis: {
        min: 0,
        show: false,
        axisBorder: {
            show: false
        },
    },
    xaxis: {
        show: false,
        axisBorder: {
            show: false
        },
    },
    tooltip: {
        enabled: true,
        theme: "dark",
        x: {
            show: false
        },
        y: {
            title: {
                formatter: function (_seriesName: any) {
                    return ''
                }
            }
        },
        marker: {
            show: false
        }
    },
    colors: ["rgb(254, 124 ,88)"],
    fill: {
        type: 'gradient',
        gradient: {
            opacityFrom: 0.5,
            opacityTo: 0.2,
            stops: [0, 60]
        }
    },

}

/* profile analysis */
export const ProfileSeries = [
    {
        name: "Followers",
        data: [44, 42, 57, 86, 58, 55, 70, 43, 23, 54, 77, 34],
    },
    {
        name: "Account Reached",
        data: [74, 72, 87, 116, 88, 85, 100, 73, 53, 84, 107, 64],
    },
    {
        name: "People Engaged",
        data: [84, 82, 97, 126, 98, 95, 110, 83, 63, 94, 117, 74],
    }
]
export const ProfileOptions = {
    chart: {
        stacked: true,
        type: "area",
        height: 332,
        dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 7,
            left: 1,
            blur: 3,
            color: '#000',
            opacity: 0.1
        },
        toolbar: {
            show: false,
        }
    },
    grid: {
        borderColor: "#f5f4f4",
        strokeDashArray: 5,
        yaxis: {
            lines: {
                show: true, // Ensure y-axis grids are shown
            },
        },
    },
    colors: [
        "rgba(var(--primary-rgb))",
        "rgba(215, 124, 247, 1)",
        "rgba(12, 215, 177, 1)",
    ],
    stroke: {
        curve: ["smooth", "smooth", "smooth"],
        width: [2, 2, 2],
    },
    dataLabels: {
        enabled: false,
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.4,
            opacityTo: 0.1,
            stops: [0, 90, 100],
            colorStops: [
                [
                    {
                        offset: 0,
                        color: "rgba(var(--primary-rgb),0.5)",
                        opacity: 1
                    },
                    {
                        offset: 75,
                        color: "rgba(var(--primary-rgb),0.5)",
                        opacity: 1
                    },
                    {
                        offset: 100,
                        color: "rgba(var(--primary-rgb),0.5)",
                        opacity: 1
                    }
                ],
                [
                    {
                        offset: 0,
                        color: "rgba(215, 124, 247,0.5)",
                        opacity: 1
                    },
                    {
                        offset: 75,
                        color: "rgba(215, 124, 247,0.5)",
                        opacity: 1
                    },
                    {
                        offset: 100,
                        color: "rgba(215, 124, 247,0.5)",
                        opacity: 1
                    }
                ],
                [
                    {
                        offset: 0,
                        color: "rgba(12, 215, 177,0.5)",
                        opacity: 1
                    },
                    {
                        offset: 75,
                        color: "rgba(12, 215, 177,0.5)",
                        opacity: 1
                    },
                    {
                        offset: 100,
                        color: "rgba(12, 215, 177,0.5)",
                        opacity: 1
                    }
                ]
            ]
        }
    },
    legend: {
        show: true,
        position: "top",
    },
    yaxis: {
        title: {
            style: {
                color: "#adb5be",
                fontSize: "14px",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
                cssClass: "apexcharts-yaxis-label",
            },
        },
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
        labels: {
            formatter: function (y: any) {
                return y.toFixed(0) + "";
            },
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
        theme: "dark",
    }
}

/* audience age metrics */
export const MetricsSeries = [{
    data: [462, 451, 350, 530, 470, 500, 485],
    name: 'Total Audience',
}]
export const MetricsOptions = {
    chart: {
        type: 'bar',
        height: 375,
        toolbar: {
            show: false
        },
    },
    plotOptions: {
        bar: {
            barHeight: '30%',
            borderRadius: 2,
            horizontal: true,
            distributed: true,
        }
    },
    legend: {
        show: false
    },
    dataLabels: {
        enabled: false,
    },
    grid: {
        borderColor: '#ffffff',
        xaxis: {
            lines: {
                show: false
            }
        },
        yaxis: {
            lines: {
                show: false
            }
        }
    },
    colors: ["rgba(var(--primary-rgb),0.8)", "rgba(215, 124, 247, 0.8)", "rgba(12, 215, 177, 0.8)", "rgba(254, 124, 88, 0.8)", "rgba(12, 163, 231, 0.8)", "rgba(243, 157, 45, 0.8)", "rgba(254, 84, 84, 0.8)"],
    xaxis: {
        categories: ['10-20', '20-30', '30-40', '40-50', '50-60', '60-70', '70-80'],
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
    tooltip: {
        theme: "dark",
    }
}

/* audience reached */
export const AudienceReachedSeries = [17546, 11378]
export const AudienceReachedOptions = {
    labels: ["Male", "Female"],
    chart: {
        height: 220,
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
                        fontFamily: "Montserrat, sans-serif",
                        offsetY: -5
                    },
                    value: {
                        show: true,
                        fontSize: '22px',
                        color: undefined,
                        offsetY: 5,
                        fontWeight: 600,
                        fontFamily: "Montserrat, sans-serif",
                        formatter: function (val: any) {
                            return val + "%"
                        }
                    },
                    total: {
                        show: true,
                        showAlways: true,
                        label: 'Total Audience',
                        fontSize: '14px',
                        fontWeight: 400,
                        color: '#495057',
                    }
                }
            }
        }
    },
    colors: ["rgba(var(--primary-rgb))", "rgba(215, 124, 247, 1)"],
}

/* revenue earned */
export const RevenueEarnedSeries = [76, 67, 61, 90]
export const RevenueEarnedOptions = {
    chart: {
        height: 180,
        type: 'radialBar',
    },
    plotOptions: {
        radialBar: {
            offsetY: 0,
            startAngle: 0,
            endAngle: 270,
            hollow: {
                margin: 5,
                size: '30%',
                background: 'transparent',
                image: undefined,
            },
            dataLabels: {
                name: {
                    show: false,
                },
                value: {
                    show: false,
                }
            }
        }
    },
    colors: ['rgba(var(--primary-rgb))', 'rgba(215, 124, 247, 1)', 'rgba(12, 215, 177, 1)', 'rgba(254, 124, 88, 1)'],
    labels: ['Youtube', 'Twitter', 'Facebook', 'Instagram'],
    legend: {
        show: false,
        floating: true,
        fontSize: '14px',
        position: 'left',
        labels: {
            useSeriesColors: true,
        },
        markers: {
            size: 0
        },
        formatter: function (seriesName: any, opts: any) {
            return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
        },
        itemMargin: {
            vertical: 3
        }
    },
    stroke: {
        lineCap: 'round',
    },
    responsive: [{
        breakpoint: 480,
        options: {
            legend: {
                show: false
            }
        }
    }]
}

/* sessions by device */
export const SessionsByDeviceSeries = [
    {
        name: "Tablet",
        data: [[10, 35, 80]]
    },
    {
        name: "Mobile",
        data: [[22, 10, 80]]
    },
    {
        name: "Desktop",
        data: [[25, 25, 150]]
    },
]
export const SessionsByDeviceOptions = {
    chart: {
        height: 355,
        type: "bubble",
        toolbar: {
            show: false
        }
    },
    grid: {
        borderColor: '#f3f3f3',
        strokeDashArray: 3
    },
    colors: ["rgba(var(--primary-rgb))", "rgb(215, 124, 247)", "rgb(12, 215, 177)"],
    dataLabels: {
        enabled: false
    },
    legend: {
        show: true,
        fontSize: '13px',
        labels: {
            colors: '#959595',
        },
        markers: {
            width: 10,
            height: 10,
        },
    },
    xaxis: {
        min: 0,
        max: 50,
        labels: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
    },
    yaxis: {
        max: 50,
        labels: {
            show: false,
        },
    },
    tooltip: {
        enabled: true,
        theme: "dark",
    }
}

// SOCIAL MEDIA PERFORMANCE
export const SocialMediaPerformance = [
    {
        id: 1,
        date: '2024-02-15',
        platform: 'Youtube',
        likes: "150",
        comments: "25",
        shares: "50",
        impressions: '10,000',
        impressionsColor: "primary",
        engagement: '3.5%',
        platformIcon: 'youtube-fill',
        platformTextColor: 'danger',
    },
    {
        id: 2,
        date: '2024-02-14',
        platform: 'Twitter',
        likes: "200",
        comments: "30",
        shares: "70",
        impressions: '15,000',
        impressionsColor: "secondary",
        engagement: '4.2%',
        platformIcon: 'twitter-x-fill',
        platformTextColor: 'dark',
    },
    {
        id: 3,
        date: '2024-02-13',
        platform: 'Facebook',
        likes: "300",
        comments: "40",
        shares: "90",
        impressions: '20,000',
        impressionsColor: "success",
        engagement: '5.0%',
        platformIcon: 'messenger-fill',
        platformTextColor: 'info',
    },
    {
        id: 4,
        date: '2024-02-12',
        platform: 'Instagram',
        likes: "100",
        comments: "20",
        shares: "30",
        impressions: '8,000',
        impressionsColor: "orangemain",
        engagement: '2.1%',
        platformIcon: 'instagram-fill',
        platformTextColor: 'secondary',
    },
    {
        id: 5,
        date: '2024-02-11',
        platform: 'Twitter',
        likes: "120",
        comments: "15",
        shares: "40",
        impressions: '12,000',
        impressionsColor: "info",
        engagement: '3.0%',
        platformIcon: 'twitter-x-fill',
        platformTextColor: 'dark',
    },
];
export const cardData = [
    {
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="!fill-white !text-white" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><path d="M226.59,71.53a16,16,0,0,0-9.63-11C183.48,47.65,128,48,128,48s-55.48-.35-89,12.58a16,16,0,0,0-9.63,11C27.07,80.54,24,98.09,24,128s3.07,47.46,5.41,56.47A16,16,0,0,0,39,195.42C72.52,208.35,128,208,128,208s55.48.35,89-12.58a16,16,0,0,0,9.63-10.95c2.34-9,5.41-26.56,5.41-56.47S228.93,80.54,226.59,71.53ZM112,160V96l48,32Z" opacity="0.2" /><polygon points="160 128 112 96 112 160 160 128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><path d="M24,128c0,29.91,3.07,47.45,5.41,56.47A16,16,0,0,0,39,195.42C72.52,208.35,128,208,128,208s55.48.35,89-12.58a16,16,0,0,0,9.63-10.95c2.34-9,5.41-26.56,5.41-56.47s-3.07-47.45-5.41-56.47a16,16,0,0,0-9.63-11C183.48,47.65,128,48,128,48s-55.48-.35-89,12.58a16,16,0,0,0-9.63,11C27.07,80.54,24,98.09,24,128Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>),
        bgClass: 'primary',
        svgClass: "bg-primary/[0.15] border border-primary/10",
        count: '512,345',
        label: 'Subscribers',
        percentage: '0.45%',
        chartId: 'youtube-subscribers',
        YoutubeOptions: YoutubeOptions,
        YoutubeSeries: YoutubeSeries,
    },
    {
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="!fill-white !text-white" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><polygon points="48 40 96 40 208 216 160 216 48 40" opacity="0.2" /><polygon points="48 40 96 40 208 216 160 216 48 40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><line x1="113.88" y1="143.53" x2="48" y2="216" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><line x1="208" y1="40" x2="142.12" y2="112.47" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>),
        bgClass: 'secondary',
        svgClass: "bg-secondary/[0.15] border border-secondary/10",
        count: '154,678',
        label: 'Followers',
        percentage: '0.45%',
        chartId: 'twitter-followers',
        YoutubeOptions: TwitterOptions,
        YoutubeSeries: TwitterSeries
    },
    {
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="!fill-white !text-white" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><path d="M79.93,211.11a96,96,0,1,0-35-35h0L32.42,213.46a8,8,0,0,0,10.12,10.12l37.39-12.47Z" opacity="0.2" /><polyline points="80 144 112 112 144 144 176 112" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><path d="M79.93,211.11a96,96,0,1,0-35-35h0L32.42,213.46a8,8,0,0,0,10.12,10.12l37.39-12.47Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>),
        bgClass: 'success',
        svgClass: "bg-success/[0.15] border border-success/10",
        count: '307,892',
        label: 'Followers',
        percentage: '0.45%',
        chartId: 'facebook-followers',
        YoutubeOptions: FacebookOptions,
        YoutubeSeries: FacebookSeries,
    },
    {
        svg: (<svg xmlns="http://www.w3.org/2000/svg" className="!fill-white !text-white" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><path d="M176,32H80A48,48,0,0,0,32,80v96a48,48,0,0,0,48,48h96a48,48,0,0,0,48-48V80A48,48,0,0,0,176,32ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z" opacity="0.2" /><rect x="32" y="32" width="192" height="192" rx="48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /><circle cx="128" cy="128" r="40" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="16" /><circle cx="180" cy="76" r="12" /></svg>),
        bgClass: 'orange',
        svgClass: "bg-orangemain/[0.15] border border-orangemain/10",
        count: '198,765',
        label: 'Followers',
        percentage: '0.45%',
        chartId: 'instagram-followers',
        YoutubeOptions: InstagramOptions,
        YoutubeSeries: InstagramSeries,
    }
];

export const data = [
    { platform: 'Youtube', amount: '$76,562' },
    { platform: 'Twitter', amount: '$67,454' },
    { platform: 'Facebook', amount: '$61,225' },
    { platform: 'Instagram', amount: '$90,568' },
];

interface Data {
    value: string;
    label: string;
}
export const Data1: Data[] = [
    { value: 'Youtube', label: 'Youtube' },
    { value: 'Twitter', label: 'Twitter' },
    { value: 'Facebook', label: 'Facebook' },
    { value: 'Instagram', label: 'Instagram' },

];
export const mapdata = [
    { country: "cn", value: 1389618778 }, // china
    { country: "in", value: 1311559204 }, // india
    { country: "us", value: 331883986 }, // united states
    { country: "id", value: 264935824 }, // indonesia
    { country: "pk", value: 210797836 }, // pakistan
    { country: "br", value: 210301591 }, // brazil
    { country: "ng", value: 208679114 }, // nigeria
    { country: "bd", value: 161062905 }, // bangladesh
    { country: "ru", value: 141944641 }, // russia
    { country: "mx", value: 127318112 }, // mexico
];
export const getStyle = ({
    countryValue,
    minValue,
    maxValue,
}: any) => ({
    fill: "rgb(var(--dark) / 10)",
    fillOpacity: countryValue
        ? 0.1 + (1.5 * (countryValue - minValue)) / (maxValue - minValue)
        : 0,
    stroke: "red",
    strokeWidth: 1,
    strokeOpacity: 0.5,
    cursor: "pointer",
});
export const countryData = [
    { name: "USA", value: 3201, colorClass: "text-primary" },
    { name: "India", value: 2345, colorClass: "text-secondary" },
    { name: "Vatican City", value: 106, colorClass: "text-danger" },
    { name: "Canada", value: 2857, colorClass: "text-info" },
    { name: "Mauritius", value: 169, colorClass: "text-orangemain" },
    { name: "Singapore", value: 1950, colorClass: "text-warning" },
    { name: "Palau", value: 224, colorClass: "text-success" },
    { name: "Maldives", value: 147, colorClass: "text-pinkmain" }
];
export const genderData = [
    { label: "Male", percentage: "60.64%" },
    { label: "Female", percentage: "59.36%" }
];

export const Socialmediacard = () => {
    return (
        <>
            {cardData.map((card: any, index: any) => (
                <div key={index} className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
                    <SpkSocialmediaCard card={card} />
                </div>
            ))}
        </>
    );
};
export const SocialWorldMap = () => {
    return (
        <>
            <div id="visitors-countries" className="text-center">
                <WorldMap color="var(--primary-color)" tooltipBgColor="#D3D3D3" borderColor="rgb(var(--default-border))" backgroundColor="var(--custom-white)" valueSuffix="points" data={mapdata} size="md" styleFunction={getStyle} />
            </div>
        </>
    );
};
export const SocialTable = () => {
    return (
        <>
            <Spktables tableClass="ti-custom-table ti-custom-table-head w-full" header={[{ title: 'Date' }, { title: 'Platform', }, { title: 'Likes' }, { title: 'Comments', }, { title: 'Shares' }, { title: 'Impressions' }, { title: 'Engagemen(%)' },]}>
                {SocialMediaPerformance.map((idx) => (
                    <tr key={idx.id}>
                        <td>{idx.date}</td>
                        <td>
                            <div className="flex items-center gap-2">
                                <span className={`avatar avatar-sm bg-${idx.platformTextColor}/[0.15] text-${idx.platformTextColor}`}>
                                    <i className={`ri-${idx.platformIcon} text-[1rem]`}></i>
                                </span>
                                <span className="font-medium">{idx.platform}</span>
                            </div>
                        </td>
                        <td>{idx.likes}</td>
                        <td>{idx.comments}</td>
                        <td>{idx.shares} </td>
                        <td>
                            <span className={`badge bg-${idx.impressionsColor}/[0.15] text-${idx.impressionsColor}`}>{idx.impressions}</span>
                        </td>
                        <td>{idx.engagement} </td>
                    </tr>
                ))}
            </Spktables>
        </>
    );
};
export const SocialDropdown = () => {
    return (
        <>
            <SpkDropdown Linktag={true} Linkclass="text-[0.75rem] text-textmuted dark:text-textmuted/50" Toggletext="Sort By" Arrowicon={true}>
                <li><Link scroll={false} className="ti-dropdown-item" href="#!">This Week</Link></li>
                <li><Link scroll={false} className="ti-dropdown-item" href="#!">Last Week</Link></li>
                <li><Link scroll={false} className="ti-dropdown-item" href="#!">This Month</Link></li>
            </SpkDropdown>
        </>
    );
};
export const SocialPagination = () => {
    return (
        <>
            <div className="flex items-center">
                <div> Showing 5 Entries <i className="bi bi-arrow-right  rtl:rotate-180 inline-flex  ms-2 font-semibold"></i> </div>
                <div className="ms-auto">
                    <nav aria-label="Page navigation" className="pagination-style-2">
                        <ul className="ti-pagination mb-0 flex-wrap">
                            <li className="page-item disabled">
                                <Link scroll={false} className="page-link px-3 py-[0.375rem] !border-0"
                                    href="#!">
                                    Prev
                                </Link>
                            </li>
                            <li className="page-item"><Link scroll={false} className="page-link active px-3 py-[0.375rem] !border-0"
                                href="#!">1</Link></li>
                            <li className="page-item"><Link scroll={false} className="page-link px-3 py-[0.375rem] !border-0"
                                href="#!">2</Link>
                            </li>
                            <li className="page-item">
                                <Link scroll={false} className="page-link px-3 py-[0.375rem] !text-primary !border-0"
                                    href="#!">
                                    next
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
};