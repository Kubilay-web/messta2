/* Revenue */
export const RevenueSeries = [{
    name: 'Last Year',
    data: [
        [0, 49.331065063219285],
        [1, 48.79814898366035],
        [2, 50.61793547911337],
        [3, 53.31696317779434],
        [4, 54.78560952831719],
        [5, 53.84293992505776],
        [6, 54.682958355082874],
        [7, 56.742547193381654],
        [8, 56.99677491680908],
        [9, 56.144488388681445],
        [10, 56.567122269843885],
        [11, 60.355022877262684],
        [12, 58.7457726121753],
        [13, 61.445407102315514],
        [14, 61.112870581452086],
        [15, 58.57202276349258],
        [16, 54.72497594269612],
        [17, 52.070341498681124],
        [18, 51.09867716530438],
        [19, 47.48185519192089],
        [20, 48.57861168097493],
        [21, 48.99789250679436],
        [22, 53.582491800119456],
        [23, 50.28407438696142],
        [24, 46.24606628705599],
        [25, 48.614330310543856],
        [26, 51.75313497797672],
        [27, 51.34463925296746],
        [28, 50.217320673443936],
        [29, 54.657281647073304],
        [30, 52.445057217757245],
        [31, 53.063914668561345],
        [32, 57.07494250387825],
        [33, 52.970403392565515],
        [34, 48.723854145068756],
        [35, 52.69064629353968],
        [36, 53.590890118378205],
        [37, 58.52332126105745],
        [38, 55.1037709679581],
        [39, 58.05347017020425],
        [40, 61.350810521199946],
        [41, 57.746188675088575],
        [42, 60.276910973029786],
        [43, 61.00841651851749],
        [44, 57.786733623457636],
        [45, 56.805721677811356],
        [46, 58.90301959619822],
        [47, 62.45091969566289],
        [48, 58.75007922945926],
        [49, 58.405842466185355],
        [50, 56.746633122658444],
        [51, 52.76631598845634],
        [52, 52.3020769891715],
        [53, 50.56370473325533],
        [54, 55.407205992344544],
        [55, 50.49825590435839],
        [56, 52.4975614755482],
        [57, 48.79614749316488],
        [58, 47.46776704767111],
        [59, 43.317880548036456],
        [60, 38.96296121124144],
        [61, 34.73218432559628],
        [62, 31.033700732272116],
        [63, 32.637987000382296],
        [64, 36.89513637594264],
        [65, 35.89701755609185],
        [66, 32.742284578187544],
        [67, 33.20516407297906],
        [68, 30.82094321791933],
        [69, 28.64770271525896],
        [70, 28.44679026902145],
        [71, 27.737654438195236],
        [72, 27.755190738237744],
        [73, 25.96228929938593],
        [74, 24.38197394166947],
        [75, 21.95038772723346],
        [76, 22.08944448751686],
        [77, 23.54611335622507],
        [78, 27.309610481106425],
        [79, 30.276849322378055],
        [80, 27.25409223418214],
    ],
    type: 'bar',
}]
export const RevenueOption = {
    chart: {
        height: 100,
        sparkline: {
            enabled: true
        },
        dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 7,
            left: 1,
            blur: 3,
            color: '#000',
            opacity: 0.2
        },
    },
    plotOptions: {
        bar: {
            columnWidth: '100%'
        }
    },
    stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'butt',
        colors: undefined,
        width: [1.5, 1.5],
        dashArray: [0, 0],
    },
    grid: {
        borderColor: 'transparent',
        padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
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
                        color: "rgba(84, 109, 254,0.1)",
                        opacity: 1
                    },
                    {
                        offset: 75,
                        color: "rgba(84, 109, 254,0.1)",
                        opacity: 1
                    },
                    {
                        offset: 100,
                        color: "rgba(84, 109, 254,0.1)",
                        opacity: 1
                    }
                ]
            ]
        }
    },
    yaxis: {
        min: 0,
        max: 90,
        show: false,
        axisBorder: {
            show: false
        },
    },
    xaxis: {
        axisBorder: {
            show: false
        },
    },

    colors: ["rgba(255, 255, 255,0.1)"],
    tooltip: {
        enabled: false,
    }
}

export const RevenueSeries1 = [{
    name: 'This Year',
    data: [
        [0, 48.11708650372481],
        [1, 44.83834104995953],
        [2, 45.727409628208974],
        [3, 44.69213146554142],
        [4, 44.92113232835135],
        [5, 44.200874587557415],
        [6, 41.750527715312444],
        [7, 44.84511185791557],
        [8, 46.04672992189592],
        [9, 45.9480092098883],
        [10, 46.9249480823427],
        [11, 43.600609487921346],
        [12, 40.29988975207692],
        [13, 42.03310106988357],
        [14, 39.457750445961125],
        [15, 40.540159797957294],
        [16, 37.277912393740806],
        [17, 41.43887402339309],
        [18, 39.47430428214318],
        [19, 36.91189415889479],
        [20, 36.42847097453014],
        [21, 36.96844325047937],
        [22, 35.54647151074562],
        [23, 32.998974290143025],
        [24, 30.43526314490385],
        [25, 31.14797888879888],
        [26, 27.20589032036549],
        [27, 25.777592542626508],
        [28, 30.052675048145275],
        [29, 30.92837408600937],
        [30, 34.190241658736014],
        [31, 37.57718922878679],
        [32, 41.18083316913268],
        [33, 41.27110666976231],
        [34, 36.33819281943194],
        [35, 37.39239238651191],
        [36, 37.046485292242615],
        [37, 34.594801853250495],
        [38, 31.488044618299227],
        [39, 34.69970813498227],
        [40, 39.66083111892072],
        [41, 40.203292838001616],
        [42, 36.089709320758985],
        [43, 40.31141091738469],
        [44, 44.170004784953846],
        [45, 48.84998014705778],
        [46, 43.93624560052546],
        [47, 40.62473022491363],
        [48, 39.154068738786684],
        [49, 42.803089612673666],
        [50, 40.6511024461858],
        [51, 38.34516630158569],
        [52, 39.546885205159555],
        [53, 42.50715860274628],
        [54, 38.1455129028495],
        [55, 33.87761157196474],
        [56, 37.30125615378047],
        [57, 38.799409423316405],
        [58, 39.185431079286275],
        [59, 43.32737024276462],
        [60, 41.52185070435002],
        [61, 41.613587244137946],
        [62, 44.23763577861365],
        [63, 44.91439321362589],
        [64, 42.18546432611939],
        [65, 41.0624926886062],
        [66, 44.24453261527582],
        [67, 47.34794952778721],
        [68, 48.10833243543891],
        [69, 43.640893412371504],
        [70, 40.614056030997666],
        [71, 42.9374730102888],
        [72, 46.1355421298619],
        [73, 48.995759760197956],
        [74, 52.19926195857424],
        [75, 49.2778849176981],
        [76, 52.46274689069702],
        [77, 56.74969793098863],
        [78, 60.92623317241021],
        [79, 57.70969775380601],
        [80, 57.35168105637668],
    ],
    type: 'area'
}]
export const RevenueOption1 = {
    chart: {
        height: 100,
        sparkline: {
            enabled: true
        },
        dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 7,
            left: 0,
            blur: 3,
            color: '#000',
            opacity: 0.2
        },
    },
    plotOptions: {
        bar: {
            columnWidth: '100%'
        }
    },
    stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'butt',
        colors: undefined,
        width: [1.5, 1.5],
        dashArray: [0, 0],
    },
    grid: {
        borderColor: 'transparent',
        padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
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
                        color: "rgba(215, 124, 247, 0.15)",
                        opacity: 1
                    },
                    {
                        offset: 75,
                        color: "rgba(215, 124, 247, 0.15)",
                        opacity: 1
                    },
                    {
                        offset: 100,
                        color: "rgba(215, 124, 247, 0.15)",
                        opacity: 1
                    }
                ]
            ]
        }
    },
    yaxis: {
        min: 0,
        show: false,
        axisBorder: {
            show: false
        },
    },
    xaxis: {
        axisBorder: {
            show: false
        },
    },

    colors: ["rgb(215, 124, 247)"],
    tooltip: {
        enabled: false,
    }
}

// LIVE AUCTION
export const LiveAuction = [
    {
        id: 1,
        image: "../../assets/images/nft-images/14.jpg",
        name: "EtherEden",
        author: "@Eden Pixelist",
        openPrice: "1.27 ETH",
        auctionTime: "1hr 45min 32sec",
        auctionTimeColor: "primary",
        yourBid: "1.75 ETH",
        lastBid: "2.25 ETH",
        lastBidderImage: "../../assets/images/faces/1.jpg",
        lastBidder: "2.25 ETH",
    },
    {
        id: 2,
        image: "../../assets/images/nft-images/15.jpg",
        name: "CryptoCraze",
        author: "@TechnoTrendsetter",
        openPrice: "1.5 ETH",
        auctionTime: "1hr 45min 32sec",
        auctionTimeColor: "orangemain",
        yourBid: "2.45 ETH",
        lastBid: "3.75 ETH",
        lastBidderImage: "../../assets/images/faces/11.jpg",
        lastBidder: "3.75 ETH",
    },
    {
        id: 3,
        image: "../../assets/images/nft-images/17.jpg",
        name: "Cosmic Canvases",
        author: "@AstroArtisan",
        openPrice: "1.75 ETH",
        auctionTime: "2hr 15min 10sec",
        auctionTimeColor: "secondary",
        yourBid: "2.25 ETH",
        lastBid: "5.65 ETH",
        lastBidderImage: "../../assets/images/faces/5.jpg",
        lastBidder: "5.65 ETH",
    },
    {
        id: 4,
        image: "../../assets/images/nft-images/18.jpg",
        name: "Mystic Mosaics",
        author: "@Enigma Weaver",
        openPrice: "2.00 ETH",
        auctionTime: "3hr 30min 45sec",
        auctionTimeColor: "success",
        yourBid: "3.75 ETH",
        lastBid: "6.45 ETH",
        lastBidderImage: "../../assets/images/faces/13.jpg",
        lastBidder: "6.45 ETH",
    },
    {
        id: 5,
        image: "../../assets/images/nft-images/16.jpg",
        name: "Virtual Voyages",
        author: "@Binary Navigator",
        openPrice: "1.25 ETH",
        auctionTime: "0hr 50min 20sec",
        auctionTimeColor: "info",
        yourBid: "1.35 ETH",
        lastBid: "2.15 ETH",
        lastBidderImage: "../../assets/images/faces/7.jpg",
        lastBidder: "2.15 ETH",
    },
];

const AssetsIcon = <svg className="!fill-white !text-white" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 4h2v5l-1-.75L9 9V4zm9 16H6V4h1v9l3-2.25L13 13V4h5v16z"></path></svg>
const ValueIcon = <svg className="!fill-white !text-white" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0,0h24v24H0V0z" fill="none"></path><g><path d="M19.5,3.5L18,2l-1.5,1.5L15,2l-1.5,1.5L12,2l-1.5,1.5L9,2L7.5,3.5L6,2v14H3v3c0,1.66,1.34,3,3,3h12c1.66,0,3-1.34,3-3V2 L19.5,3.5z M15,20H6c-0.55,0-1-0.45-1-1v-1h10V20z M19,19c0,0.55-0.45,1-1,1s-1-0.45-1-1v-3H8V5h11V19z"></path><rect height="2" width="6" x="9" y="7"></rect><rect height="2" width="2" x="16" y="7"></rect><rect height="2" width="6" x="9" y="10"></rect><rect height="2" width="2" x="16" y="10"></rect></g></svg>
const Salesicon = <svg className="!fill-white !text-white" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><path d="M0,0h24v24H0V0z" fill="none"></path></g><g><g><path d="M21.41,11.41l-8.83-8.83C12.21,2.21,11.7,2,11.17,2H4C2.9,2,2,2.9,2,4v7.17c0,0.53,0.21,1.04,0.59,1.41l8.83,8.83 c0.78,0.78,2.05,0.78,2.83,0l7.17-7.17C22.2,13.46,22.2,12.2,21.41,11.41z M12.83,20L4,11.17V4h7.17L20,12.83L12.83,20z"></path><circle cx="6.5" cy="6.5" r="1.5"></circle></g></g></svg>
const Revenueicon = <svg className="!fill-white !text-white" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"></rect></g><g><path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8c0-4.41,3.59-8,8-8 s8,3.59,8,8C20,16.41,16.41,20,12,20z M12.89,11.1c-1.78-0.59-2.64-0.96-2.64-1.9c0-1.02,1.11-1.39,1.81-1.39 c1.31,0,1.79,0.99,1.9,1.34l1.58-0.67c-0.15-0.44-0.82-1.91-2.66-2.23V5h-1.75v1.26c-2.6,0.56-2.62,2.85-2.62,2.96 c0,2.27,2.25,2.91,3.35,3.31c1.58,0.56,2.28,1.07,2.28,2.03c0,1.13-1.05,1.61-1.98,1.61c-1.82,0-2.34-1.87-2.4-2.09L8.1,14.75 c0.63,2.19,2.28,2.78,3.02,2.96V19h1.75v-1.24c0.52-0.09,3.02-0.59,3.02-3.22C15.9,13.15,15.29,11.93,12.89,11.1z"></path></g></svg>

export const cardData = [
    { id: 1, maincolor: "primary", color: "primary", value: "543", title: "Total Assets", percentage: "0.25%", trend: "up",trendColor:"text-success", svgIcon: AssetsIcon },
    { id: 2, maincolor: "secondary", color: "secondary", value: "$15,322", title: "Total Value", percentage: "0.14%", trend: "down",trendColor:"text-danger", svgIcon: ValueIcon },
    { id: 3, maincolor: "success", color: "success", value: "662", title: "Total Sales", percentage: "1.57%", trend: "up",trendColor:"text-success", svgIcon: Salesicon },
    { id: 4, maincolor: "orange", color: "orangemain", value: "$67,977", title: "Total Revenue", percentage: "0.34%", trend: "up",trendColor:"text-success", svgIcon: Revenueicon },
]
interface MarketType {
    id: number;
    image: string;
    auctionTime: string;
    title: string;
    name: string;
   
    currentBid: string;
    
}

export const Marketplacedata: MarketType[] = [
    {
        id: 1,
        image: "../../assets/images/nft-images/2.jpg",
        auctionTime: "04hrs : 24m : 38s",
        title: "CryptoCanvas",
        name: "PixelCraftPro",
       
        currentBid: "2.78",
        
    },
    {
        id: 2,
        image: "../../assets/images/nft-images/3.jpg",
        auctionTime: "03hrs : 12m : 45s",
        title: "NFTNovelty",
        name: "BitBrushMaster",
        currentBid: "1.45",
        
    },
    {
        id: 3,
        image: "../../assets/images/nft-images/4.jpg",
        auctionTime: "05hrs : 03m : 20s",
        title: "EtherEcho",
        name: "NFTNirvana",
       
       
        currentBid: "2.32",
       
    },
    {
        id: 4,
        title: "NFTNebula",
        image: "../../assets/images/nft-images/5.jpg",
        auctionTime: "02hrs : 50m : 55s",
        currentBid: "1.75",
        name: "DigitalDreams",
        
       
    },
    {
        id: 5,
        title: "DazzleArtifact",
        image: "../../assets/images/nft-images/6.jpg",
        auctionTime: "06hrs : 15m : 10s",
        currentBid: "2.55",
        name: "CraftsCollective",
       
        
    },
    {
        id: 6,
        title: "PrestigePiece",
        image: "../../assets/images/nft-images/7.jpg",
        auctionTime: "01hrs : 58m : 23s",
        currentBid: "4.88",
        name: "DesignDynamo",
        
       
    },
    {
        id: 7,
        title: "BlazeBadge",
        image: "../../assets/images/nft-images/8.jpg",
        auctionTime: "03hrs : 45m : 50s",
        currentBid: "5.22",
        name: "ArtisanEnclave",
       
    },
    {
        id: 8,
        title: "VirtualVortex",
        image: "../../assets/images/nft-images/9.jpg",
        auctionTime: "07hrs : 06m : 15s",
        currentBid: "1.42",
        name: "EnigmaArtistry",
       
       
    }
]

export const nfts = [
    {
      title: 'Quantum Dreams',
      image: '../../assets/images/nft-images/10.jpg',
      creator: '@Celeste Nova',
    },
    {
      title: 'Pixel Pioneers',
      image: '../../assets/images/nft-images/11.jpg',
      creator: '@Max Byte',
    },
    {
      title: 'Galactic Gems',
      image: '../../assets/images/nft-images/12.jpg',
      creator: '@Stella Starlight',
    },
    {
      title: 'Virtual Visions',
      image: '../../assets/images/nft-images/13.jpg',
      creator: '@Digital Dynamo',
    },
    {
      title: 'EtherElegance',
      image: '../../assets/images/nft-images/4.jpg',
      creator: '@NeoCraftsman',
    },
    {
      title: 'CryptoCritters',
      image: '../../assets/images/nft-images/5.jpg',
      creator: '@Pixel Paws',
    },
    {
      title: 'TechnoTales',
      image: '../../assets/images/nft-images/2.jpg',
      creator: '@NeoCraftsman',
    },
  ];

 export const users = [
    {
      name: 'Kakashi Si',
      username: '@lunalogic011',
      avatar: '../../assets/images/faces/png/1.png',
      color: 'bg-pinkmain/[0.15]',
      usercolor:"outline-light"
      
    },
    {
      name: 'NFTNebula',
      username: '@synthwavesage',
      avatar: '../../assets/images/faces/png/2.png',
      color: 'bg-info/[0.15]',
      usercolor:"outline-light"
    },
    {
      name: 'PixelPioneer',
      username: '@binarybard89',
      avatar: '../../assets/images/faces/png/3.png',
      color: 'bg-danger/[0.15]',
      usercolor:"secondary"
    },
    {
      name: 'VirtualVisionary',
      username: '@auroracode712',
      avatar: '../../assets/images/faces/png/7.png',
      color: 'bg-warning/[0.15]',
      usercolor:"secondary"
    },
    {
      name: 'BitByteBrush',
      username: '@maxbyte98',
      avatar: '../../assets/images/faces/png/9.png',
      color: 'bg-primary/[0.15]',
      usercolor:"outline-light"
    },
    {
      name: 'NoveltyNurturer',
      username: '@celestenova89',
      avatar: '../../assets/images/faces/png/10.png',
      color: 'bg-success/[0.15]',
      usercolor:"secondary"
    },
    {
      name: 'RoboRhythms',
      username: '@circuitmaestro',
      avatar: '../../assets/images/faces/png/8.png',
      color: 'bg-primary/[0.15]',
      usercolor:"outline-light"
    },
  ];
  