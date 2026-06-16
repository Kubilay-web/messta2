import SpkSwiperlanding from "@/shared/@spk-reusable-components/apps/spk-swiper-landing";

export const Worldicon = ({ color }: { color: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 fill-${color}`} viewBox="0 0 1024 1024">
        <path d="M919.2 404.8H104.8l6.2-19.5c12-37.9 29.2-73.8 51.4-106.9 17.8-26.6 38.6-51.2 62-73.1C302.5 131.9 404.7 91.5 512 91.5c107.3 0 209.5 40.4 287.7 113.8 23.4 21.9 44.2 46.5 62 73.1 22.2 33.1 39.4 69 51.4 106.9l6.1 19.5zm-772.9-30h731.4c-10.5-28-24.2-54.7-41-79.7-16.5-24.7-35.9-47.5-57.6-67.9C706.5 159 611.6 121.5 512 121.5c-99.6 0-194.5 37.5-267.1 105.7-21.7 20.4-41.1 43.2-57.6 67.9-16.8 24.9-30.5 51.7-41 79.7zM512 932.5c-107.3 0-209.5-40.4-287.7-113.8-23.4-22-44.2-46.5-62-73.1-22.1-33.1-39.4-69-51.4-106.9l-6.2-19.5h814.4l-6.2 19.5c-11.9 37.8-29.2 73.8-51.4 106.9-17.8 26.5-38.6 51.1-62 73.1-78.1 73.4-180.2 113.8-287.5 113.8zM146.3 649.2c10.5 28 24.3 54.8 41 79.7 16.5 24.7 35.9 47.5 57.6 67.9C317.5 865 412.4 902.5 512 902.5c99.6 0 194.5-37.5 267.1-105.7 21.7-20.4 41.1-43.2 57.6-67.9 16.7-25 30.5-51.7 41-79.7H146.3z">
        </path>
        <path d="M512 932.5c-39.6 0-78.5-18.5-112.3-53.6-31.5-32.6-58.6-79.5-78.4-135.5-11.7-33.1-20.8-69-27-106.7l-2.9-17.4h441.2l-2.9 17.4c-6.2 37.8-15.3 73.7-27 106.7-19.8 56-46.9 102.9-78.4 135.5-33.8 35.1-72.7 53.6-112.3 53.6zM327 649.2c5.7 29.6 13.3 57.9 22.6 84.2 18.4 52 43.2 95.1 71.7 124.7 28.5 29.5 59 44.5 90.7 44.5s62.3-15 90.7-44.5c28.5-29.5 53.3-72.7 71.7-124.7 9.3-26.3 16.9-54.6 22.6-84.2H327zm405.6-244.4H291.4l2.9-17.4c6.2-37.8 15.3-73.7 27-106.7 19.8-56 46.9-102.9 78.4-135.5C433.5 110 472.4 91.5 512 91.5c39.6 0 78.5 18.5 112.3 53.6 31.5 32.6 58.6 79.5 78.4 135.5 11.7 33.1 20.8 69 27 106.7l2.9 17.5zm-405.6-30h370c-5.7-29.6-13.3-57.9-22.6-84.2-18.4-52-43.2-95.1-71.7-124.7-28.5-29.5-59-44.5-90.7-44.5s-62.3 15-90.7 44.5c-28.5 29.5-53.3 72.7-71.7 124.7-9.3 26.3-16.9 54.6-22.6 84.2z">
        </path>
        <path d="M497 634.2h30v283.3h-30zM497 106.5h30v283.3h-30z">
        </path>
        <path d="M512 341c-64.2 0-125.8-14.1-183.1-41.9-38.3-18.6-73.5-42.8-104.6-71.9l-11.7-10.9 11.7-10.9C302.5 131.9 404.7 91.5 512 91.5c107.3 0 209.5 40.4 287.6 113.8l11.7 10.9-11.7 10.9c-31.1 29.2-66.3 53.4-104.6 71.9-57.2 27.9-118.8 42-183 42zM257 216.2c25.8 22.3 54.3 41 85 55.9 53.2 25.8 110.4 38.8 170 38.8 59.6 0 116.8-13.1 170-38.9 30.7-14.8 59.2-33.6 85-55.9-70.9-61.2-160.8-94.7-255-94.7-94.2.1-184.1 33.6-255 94.8zm255 716.3c-107.3 0-209.5-40.4-287.7-113.8l-11.7-10.9 11.7-10.9c31.1-29.2 66.3-53.4 104.6-72C386.2 697.1 447.8 683 512 683c64.2 0 125.8 14.1 183.1 41.9 38.3 18.5 73.4 42.7 104.6 71.9l11.7 10.9-11.7 10.9C721.5 892.1 619.3 932.5 512 932.5zM257 807.8c70.9 61.2 160.8 94.7 255 94.7 94.2 0 184.1-33.5 255-94.7-25.8-22.3-54.3-41-85-55.9-53.2-25.8-110.4-38.9-170-38.9-59.6 0-116.8 13.1-170 38.8-30.7 14.9-59.2 33.7-85 56zm684.2-158.6H82.8c-10.8 0-19.6-8.8-19.6-19.6V394.4c0-10.8 8.8-19.6 19.6-19.6h858.5c10.8 0 19.6 8.8 19.6 19.6v235.3c-.1 10.7-8.9 19.5-19.7 19.5zm-848-30h837.6V404.8H93.2v214.4z">
        </path>
        <path d="M314.1 588H282l-39-88.4-39.1 88.4h-32.1l-34.9-133.2 29-7.6 25.1 95.7 37.8-85.5h28.3l37.8 85.5 25.1-95.7 29 7.6zM804.7 588h-32.1l-39.1-88.4-39 88.4h-32.1l-34.9-133.2 29-7.6 25.1 95.7 37.8-85.5h28.3l37.8 85.5 25.1-95.7 29 7.6zM559.4 588h-32.1l-39-88.4-39.1 88.4h-32.1l-34.9-133.2 29-7.6 25.1 95.7 37.8-85.5h28.3l37.8 85.5 25.1-95.7 29 7.6zM843.2 558h29.4v30h-29.4z">
        </path>
    </svg>
);

export const DomainLandingData = [
    { icon: <Worldicon color="primary" />, bgColor: "primary", badge: "Domain", title: "spotechtechnical.com", loction: "Kondapur, Hyderabad", days: "25 ", profit: "NA", industry: "Business", age: "10", bids: "09" },
    { image: "../../assets/images/marketplace/new-arrivals/1.png", badge: "Website", title: "gtechnical.com", loction: "Gachbowli, Hyderabad", days: "10 ", profit: "$45.00", industry: "Corporate", age: "12", bids: "10" },
    { image: "../../assets/images/marketplace/new-arrivals/2.png", badge: "Website", title: "spoteksolution.com", loction: "Diego, Pune", days: "09 ", profit: "$12.00", industry: "Marketing", age: "19", bids: "24" },
    { icon: <Worldicon color="warning" />, bgColor: "warning", badge: "Domain", title: "dwaynestel.net", loction: "Spoesh, Pune", days: "13 ", profit: "NA", industry: " Corporate", age: "07", bids: "32" },
    { icon: <Worldicon color="info" />, bgColor: "info", badge: "Domain", title: "spoteksolution.com", loction: "Diego, Pune", days: "09", profit: "NA", industry: "Marketing", age: "19", bids: "24" },
    { image: "../../assets/images/realestate/properties/5.png", badge: "Website", title: "Achlles.net", loction: "Spoesh, Pune", days: "13", profit: "$345.00", industry: "Corporate", age: "07", bids: "32" },
]

export const steps = [
    {
        title: ' Evaluate Domain ',
        description: 'Est amet sit vero sanctus labore no sed ipsum ipsum nonumy. Sit ipsum sanctus ea.',
        linkText: 'Register Now',
        boxClass: 'first',
        bg: 'primary',
        bg1: 'primary',
        iconSvg: (<svg xmlns="http://www.w3.org/2000/svg" className="!text-white !fill-white" viewBox="0 0 64 64">
            <path style={{
                fontFeatureSettings: 'normal',
                fontVariantAlternates: 'normal',
                fontVariantCaps: 'normal',
                fontVariantLigatures: 'normal',
                fontVariantNumeric: 'normal',
                fontVariantPosition: 'normal',
                isolation: 'auto',
                mixBlendMode: 'normal',
                textDecorationColor: '#000',
                textDecorationLine: 'none',
                textDecorationStyle: 'solid',
                textIndent: 0,
                textOrientation: 'mixed',
                textTransform: 'none'
            }}
                d="m12.5 4.9999251c-2.4670541 0-4.5 2.0329459-4.5 4.5v45c0 2.4670541 2.0329521 4.4999916 4.5 4.5h22a1.5001499 1.5001499 0 1 0 0-3h-22c-0.85695207-2.92e-6 -1.5-0.64305409-1.5-1.5v-45c0-0.85694591 0.64305409-1.5 1.5-1.5h33c0.85694591 0 1.5 0.64305409 1.5 1.5v18a1.5001499 1.5001499 0 1 0 3 0v-18c0-2.4670541-2.0329459-4.5-4.5-4.5z" color="#000"></path> <rect width="20" height="3" x="19.021" y="20" rx="1.5" ry="1.5"></rect>
            <rect width="20" height="3" x="19.021" y="26" rx="1.5" ry="1.5"></rect> <rect width="12" height="3" x="19.021" y="32" rx="1.5" ry="1.5"></rect>
            <path style={{
                fontFeatureSettings: 'normal',
                fontVariantAlternates: 'normal',
                fontVariantCaps: 'normal',
                fontVariantLigatures: 'normal',
                fontVariantNumeric: 'normal',
                fontVariantPosition: 'normal',
                isolation: 'auto',
                mixBlendMode: 'normal',
                textDecorationColor: '#000',
                textDecorationLine: 'none',
                textDecorationStyle: 'solid',
                textIndent: 0,
                textOrientation: 'mixed',
                textTransform: 'none'
            }}
                d="m54.890477 30.837319c-2.1365316-1.2335271-4.9135872-0.48941726-6.1471143 1.6471143l-6.9990234 12.122664a1.50015 1.50015 0 1 0 2.5980762 1.5l6.9990234-12.122664c0.42847293-0.74213689 1.3069012-0.97751103 2.0490381-0.54903811l0.8660254 0.5c0.7421369 0.42847293 0.97751103 1.3069012 0.54903811 2.0490381l-10.717773 18.563728-2.8746289 0.97900337-0.58947268-2.9790034 1.21875-2.1109369a1.50015 1.50015 0 1 0-2.5980762-1.5l-1.5 2.5980762a1.50015 1.50015 0 0 0-0.17276402 1.0414236l1.0310889 5.2141016a1.50015 1.50015 0 0 0 1.955323 1.1289062l5.0310889-1.7141016a1.50015 1.50015 0 0 0 0.81551724-0.6703298l10.999023-19.050867c1.2335271-2.1365316 0.48941727-4.9135872-1.6471143-6.1471143z" color="#000"></path> </svg>)
    },
    {
        title: 'Start Bidding',
        description: 'Est amet sit vero sanctus labore no sed ipsum ipsum nonumy. Sit ipsum sanctus ea.',
        boxClass: 'second',
        linkText: 'Start Bidding',
        bg: 'secondary',
        bg1: 'secondary',
        iconSvg: (<svg xmlns="http://www.w3.org/2000/svg" className="!text-white !fill-white" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" id="usd-circle"> <path d="M10.75,8H12h0.0006104H15.5C15.776123,8,16,7.776123,16,7.5S15.776123,7,15.5,7h-3V5.5C12.5,5.223877,12.276123,5,12,5s-0.5,0.223877-0.5,0.5V7h-0.75C9.2312012,7,8,8.2312012,8,9.75s1.2312012,2.75,2.75,2.75h2.5c0.9664917,0,1.75,0.7835083,1.75,1.75S14.2164917,16,13.25,16H8.5C8.223877,16,8,16.223877,8,16.5S8.223877,17,8.5,17h3v1.5c0,0.0001831,0,0.0003662,0,0.0005493C11.5001831,18.7765503,11.723999,19.0001831,12,19c0.0001831,0,0.0003662,0,0.0006104,0c0.2759399-0.0001831,0.4995728-0.223999,0.4993896-0.5V17h0.75c1.5187988,0,2.75-1.2312012,2.75-2.75s-1.2312012-2.75-2.75-2.75h-2.5C9.7835083,11.5,9,10.7164917,9,9.75S9.7835083,8,10.75,8z M12,1C5.9248657,1,1,5.9248657,1,12s4.9248657,11,11,11c6.0722656-0.0068359,10.9931641-4.9277344,11-11C23,5.9248657,18.0751343,1,12,1z M12,22C6.4771729,22,2,17.5228271,2,12S6.4771729,2,12,2c5.5201416,0.0064697,9.9935303,4.4798584,10,10C22,17.5228271,17.5228271,22,12,22z"> </path> </svg>)
    },
    {
        title: ' Get The Domain / Website ',
        description: 'Est amet sit vero sanctus labore no sed ipsum ipsum nonumy. Sit ipsum sanctus ea.',
        boxClass: 'third',
        linkText: 'Buy Now',
        bg: 'success',
        bg1: 'success',
        iconSvg: (<svg xmlns="http://www.w3.org/2000/svg" className="!text-white !fill-white" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" id="globe"> <path d="M12,2C6.4771729,2,2,6.4771729,2,12s4.4771729,10,10,10c5.5202026-0.0062866,9.9937134-4.4797974,10-10C22,6.4771729,17.5228271,2,12,2z M8.6616211,3.6469116C7.6134033,4.7984009,6.8104248,6.4903564,6.3721313,8.5H3.7061157C4.6392822,6.2913818,6.4317627,4.5390625,8.6616211,3.6469116z M3,12c0-0.8684692,0.1296997-1.7054443,0.3592529-2.5H6.18927C6.0700073,10.2980347,6,11.131958,6,12s0.0700073,1.7019653,0.18927,2.5H3.3592529C3.1296997,13.7054443,3,12.8684692,3,12z M3.7061157,15.5h2.6660156c0.4382935,2.0096436,1.241272,3.7015991,2.2894897,4.8530884C6.4317627,19.4609375,4.6392822,17.7086182,3.7061157,15.5z M11.5,20.9544067C9.6489868,20.6220093,8.0916138,18.4655151,7.3935547,15.5H11.5V20.9544067z M11.5,14.5H7.2003174C7.0723267,13.7052002,7,12.868103,7,12s0.0723267-1.7052002,0.2003174-2.5H11.5V14.5z M11.5,8.5H7.3935547C8.0916138,5.5344849,9.6489868,3.3779907,11.5,3.0455933V8.5z M20.2905884,8.5h-2.6627197c-0.4376221-2.0064697-1.2385864-3.6965942-2.2844238-4.8479614C17.5685425,4.5457153,19.3571777,6.2954712,20.2905884,8.5z M12.5,3.0455933C14.3510132,3.3779907,15.9083862,5.5344849,16.6064453,8.5H12.5V3.0455933z M12.5,9.5h4.2996826C16.9276733,10.2947998,17,11.131897,17,12s-0.0723267,1.7052002-0.2003174,2.5H12.5V9.5z M12.5,20.9544067V15.5h4.1064453C15.9083862,18.4655151,14.3510132,20.6220093,12.5,20.9544067z M15.3383789,20.3530884c1.0482178-1.1514893,1.8511963-2.8434448,2.2894897-4.8530884h2.6660156C19.3607178,17.7086182,17.5682373,19.4609375,15.3383789,20.3530884z M17.81073,14.5C17.9299927,13.7019653,18,12.868042,18,12s-0.0700073-1.7019653-0.18927-2.5h2.8274536C20.8684692,10.2944946,20.9990234,11.1314697,21,12c0,0.8684692-0.1296997,1.7054443-0.3592529,2.5H17.81073z"> </path> </svg>)
    }
];
export const blogCards = [
    {
        imageUrl: '../../assets/images/media/blog/20.jpg',
        badgeClass: 'bg-secondary',
        badgeText: 'Apartments',
        title: 'Why People Choose Riddi For Own Properties?',
        description: 'The holographic principle, theorized to be a property of quantum gravity, postulates that the description.',
        bg: 'secondary'
    },
    {
        imageUrl: '../../assets/images/media/blog/21.jpg',
        badgeClass: 'bg-danger',
        badgeText: 'House',
        title: 'Private Home Sales Drop 27% In May 2024',
        description: 'The holographic principle, theorized to be a property of quantum gravity, postulates that the description.',
        bg: 'danger'
    },
    {
        imageUrl: '../../assets/images/media/blog/22.jpg',
        badgeClass: 'bg-warning',
        badgeText: 'Luxury Homes',
        title: 'Luxury duplex house vs a standard house in Chennai ',
        description: 'The holographic principle, theorized to be a property of quantum gravity, postulates that the description.',
        bg: 'warning'
    }
];

export const imageData1 = [

    {
        src: "../../assets/images/marketplace/new-arrivals/2.png",
        name: 'spotechsolution.net',
        date: '10 Bids , 27 Days Left',
        bg: "primary",
        price: "$12.00"

    },
    {
        name: 'sanctuseadi.edu',
        src: "../../assets/images/marketplace/new-arrivals/4.png",
        date: '21 Bids , 32 Days Left',
        bg: "danger",
        svg: "white",
        price: "$56.00"
    },
    {
        src: "../../assets/images/marketplace/new-arrivals/3.png",
        name: 'incididunt.org',
        date: '17 Bids , 12 Days Left',
        bg: "info",
        price: "$16.00"

    },
    {
        src: "../../assets/images/marketplace/new-arrivals/1.png",
        name: 'dwaynestel.net',
        date: '12 Bids , 27 Days Left',
        bg: "secpondary",
        price: "$23.00"

    },
    {
        src: "../../assets/images/marketplace/new-arrivals/3.png",
        name: 'incididunt.org',
        date: '17 Bids , 12 Days Left',
        bg: "info",
        price: "$16.00"

    },
    {
        src: "../../assets/images/marketplace/new-arrivals/2.png",
        name: 'spotechsolution.net',
        date: '10 Bids , 27 Days Left',
        bg: "primary",
        price: "$12.00"

    },
    {
        name: 'sanctuseadi.edu',
        src: "../../assets/images/marketplace/new-arrivals/4.png",
        date: '21 Bids , 32 Days Left',
        bg: "danger",
        svg: "white",
        price: "$56.00"
    },
    {
        src: "../../assets/images/marketplace/new-arrivals/3.png",
        name: 'incididunt.org',
        date: '17 Bids , 12 Days Left',
        bg: "info",
        price: "$16.00"

    },
    {
        src: "../../assets/images/marketplace/new-arrivals/1.png",
        name: 'dwaynestel.net',
        date: '12 Bids , 27 Days Left',
        bg: "secpondary",
        price: "$23.00"

    },
    {
        src: "../../assets/images/marketplace/new-arrivals/3.png",
        name: 'incididunt.org',
        date: '17 Bids , 12 Days Left',
        bg: "info",
        price: "$16.00"

    },


];

export const ReviewSwiper = imageData1.map((card, index) => (
    <SpkSwiperlanding key={index} card={card} />

))

export const imageData2 = [
    {
        name: 'spotechsols.net',
        date: '10 Bids , 27 Days Left',
        bg: "primary",
        svg: "white",
        price: "$12.00"
    },
    {
        name: 'sanctuseadi.edu',
        date: '21 Bids , 32 Days Left',
        bg: "warning",
        svg: "white",
        price: "$56.00"
    },

    {
        name: 'incididunt.org',
        date: '17 Bids , 12 Days Left',
        svg: "white",
        bg: "danger",
        price: "$16.00"
    },
    {
        name: 'spotechsols.net',
        date: '10 Bids , 27 Days Left',
        svg: "info",
        bg: "info",
        price: "$12.00"
    },

    {
        name: 'sanctuseadi.edu',
        date: '21 Bids , 32 Days Left',
        svg: "success",
        bg: "success",
        price: "$56.00"
    },
    {
        name: 'incididunt.org',
        date: '17 Bids , 12 Days Left',
        svg: "white",
        bg: "secondary",
        price: "$16.00"
    },
    {
        name: 'incididunt.org',
        date: '17 Bids , 12 Days Left',
        svg: "white",
        bg: "danger",
        price: "$16.00"
    },
    {
        name: 'spotechsols.net',
        date: '10 Bids , 27 Days Left',
        bg: "primary",
        svg: "white",
        price: "$12.00"
    },
    {
        name: 'sanctuseadi.edu',
        date: '21 Bids , 32 Days Left',
        bg: "warning",
        svg: "white",
        price: "$56.00"
    },

    {
        name: 'incididunt.org',
        date: '17 Bids , 12 Days Left',
        svg: "white",
        bg: "danger",
        price: "$16.00"
    },
    {
        name: 'spotechsols.net',
        date: '10 Bids , 27 Days Left',
        svg: "info",
        bg: "info",
        price: "$12.00"
    },

];
export const DomainSwiper = imageData2.map((card, index) => (
    <SpkSwiperlanding key={index} card={card} />

))
export const imageData3 = [
    {
      name:'spotechsols.net',
      date:'10 Bids , 27 Days Left',
      bg:"primary",
      svg:"white",
      price:"$12.00"
    },
    {
      src:"../../assets/images/marketplace/new-arrivals/1.png",
      name:'dwaynestel.net',
      date:'12 Bids , 27 Days Left',
      bg:"secondary",
      price:"$23.00"
      
    },
    {
      name:'sanctuseadi.edu',
      date:'21 Bids , 32 Days Left',
      bg:"warning",
      svg:"white",
      price:"$56.00"
    },
    {
      src:"../../assets/images/marketplace/new-arrivals/3.png",
      name:'incididunt.org',
      date:'17 Bids , 12 Days Left',
      bg:"info",
      price:"$16.00"
      
    },
    {
      name:'incididunt.org',
      date:'17 Bids , 12 Days Left',
      svg:"white",
      bg:"danger",
      price:"$16.00"
    },
    {
      name:'spotechsols.net',
      date:'10 Bids , 27 Days Left',
      svg:"info",
      bg:"info",
      price:"$12.00"
    },
    {
      src:"../../assets/images/marketplace/new-arrivals/1.png",
      name:'dwaynestel.net',
      date:'12 Bids , 27 Days Left',
      bg:"secpondary",
      price:"$23.00"
      
    },
    {
      name:'sanctuseadi.edu',
      date:'21 Bids , 32 Days Left',
      svg:"success",
      bg:"success",
      price:"$56.00"
    },
    {
      name:'incididunt.org',
      date:'17 Bids , 12 Days Left',
      svg:"white",
      bg:"info",
      price:"$16.00"
    },
    {
      name:'incididunt.org',
      date:'17 Bids , 12 Days Left',
      svg:"white",
      bg:"danger",
      price:"$16.00"
    },
  ];
export const AuctionSwiper = imageData3.map((card, index) => (
    <SpkSwiperlanding key={index} card={card} />

))