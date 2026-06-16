import SpkStockCard from "@/shared/@spk-reusable-components/dashboards/spk-stockcards"

/* apple stock chart */
export const AppleSeries = [{
    name: 'Value',
    data: [20, 14, 19, 10, 18, 14, 20, 9, 22]
}]
export const AppleOptions: any = ({ color }: any) => ({
    chart: {
        type: 'line',
        height: 20,
        width: 100,
        sparkline: {
            enabled: true
        }
    },
    stroke: {
        show: true,
        curve: 'straight',
        lineCap: 'butt',
        colors: undefined,
        width: 1.5,
        dashArray: 0,
    },
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
        enabled: false,
    },
    colors: [color]
    // colors: ["rgb(12, 215, 177)"],
})

/* nvidia stock chart */
export const NvidiaSeries = [{
    name: 'Value',
    data: [20, 14, 20, 22, 9, 12, 19, 10, 25]
}]

/* amazon stock chart */
export const AmazonSeries = [{
    name: 'Value',
    data: [20, 20, 22, 9, 14, 19, 10, 25, 12]
}]

/* microsoft stocks Chart */
export const MicrosoftSeries = [{
    name: 'Value',
    data: [20, 20, 22, 9, 12, 14, 19, 10, 25]
}]

/* total Investments Chart */
export const InvestmentsSeries = [{
    'name': 'Invested',
    data: [
        [1327359600000, 30.95],
        [1327446000000, 31.34],
        [1327532400000, 31.18],
        [1327618800000, 31.05],
        [1327878000000, 31.00],
        [1327964400000, 30.95],
        [1328050800000, 31.24],
        [1328137200000, 31.29],
        [1328223600000, 31.85],
        [1328482800000, 31.86],
        [1328569200000, 32.28],
        [1328655600000, 32.10],
        [1328742000000, 32.65],
        [1328828400000, 32.21],
        [1329087600000, 32.35],
        [1329174000000, 32.44],
        [1329260400000, 32.46],
        [1329346800000, 32.86],
        [1329433200000, 32.75],
        [1329778800000, 32.54],
        [1329865200000, 32.33],
        [1329951600000, 32.97],
        [1330038000000, 33.41],
        [1330297200000, 33.27],
        [1330383600000, 33.27],
        [1330470000000, 32.89],
        [1330556400000, 33.10],
        [1330642800000, 33.73],
        [1330902000000, 33.22],
        [1330988400000, 31.99],
        [1331074800000, 32.41],
        [1331161200000, 33.05],
        [1331247600000, 33.64],
        [1331506800000, 33.56],
        [1331593200000, 34.22],
        [1331679600000, 33.77],
        [1331766000000, 34.17],
        [1331852400000, 33.82],
        [1332111600000, 34.51],
        [1332198000000, 33.16],
        [1332284400000, 33.56],
        [1332370800000, 33.71],
        [1332457200000, 33.81],
        [1332712800000, 34.40],
        [1332799200000, 34.63],
        [1332885600000, 34.46],
        [1332972000000, 34.48],
        [1333058400000, 34.31],
        [1333317600000, 34.70],
        [1333404000000, 34.31],
        [1333490400000, 33.46],
        [1333576800000, 33.59],
        [1333922400000, 33.22],
        [1334008800000, 32.61],
        [1334095200000, 33.01],
        [1334181600000, 33.55],
        [1334268000000, 33.18],
        [1334527200000, 32.84],
        [1334613600000, 33.84],
        [1334700000000, 33.39],
        [1334786400000, 32.91],
        [1334872800000, 33.06],
        [1335132000000, 32.62],
        [1335218400000, 32.40],
        [1335304800000, 33.13],
        [1335391200000, 33.26],
        [1335477600000, 33.58],
        [1335736800000, 33.55],
        [1335823200000, 33.77],
        [1335909600000, 33.76],
        [1335996000000, 33.32],
        [1336082400000, 32.61],
        [1336341600000, 32.52],
        [1336428000000, 32.67],
        [1336514400000, 32.52],
        [1336600800000, 31.92],
        [1336687200000, 32.20],
        [1336946400000, 32.23],
        [1337032800000, 32.33],
        [1337119200000, 32.36],
        [1337205600000, 32.01],
        [1337292000000, 31.31],
        [1337551200000, 32.01],
        [1337637600000, 32.01],
        [1337724000000, 32.18],
        [1337810400000, 31.54],
        [1337896800000, 31.60],
        [1338242400000, 32.05],
        [1338328800000, 31.29],
        [1338415200000, 31.05],
        [1338501600000, 29.82],
        [1338760800000, 30.31],
        [1338847200000, 30.70],
        [1338933600000, 31.69],
        [1339020000000, 31.32],
        [1339106400000, 31.65],
        [1339365600000, 31.13],
        [1339452000000, 31.77],
        [1339538400000, 31.79],
        [1339624800000, 31.67],
        [1339711200000, 32.39],
        [1339970400000, 32.63],
        [1340056800000, 32.89],
        [1340143200000, 31.99],
        [1340229600000, 31.23],
        [1340316000000, 31.57],
        [1340575200000, 30.84],
        [1340661600000, 31.07],
        [1340748000000, 31.41],
        [1340834400000, 31.17],
        [1340920800000, 32.37],
        [1341180000000, 32.19],
        [1341266400000, 32.51],
        [1341439200000, 32.53],
        [1341525600000, 31.37],
        [1341784800000, 30.43],
        [1341871200000, 30.44],
        [1341957600000, 30.20],
        [1342044000000, 30.14],
        [1342130400000, 30.65],
        [1342389600000, 30.40],
        [1342476000000, 30.65],
        [1342562400000, 31.43],
        [1342648800000, 31.89],
        [1342735200000, 31.38],
        [1342994400000, 30.64],
        [1343080800000, 30.02],
        [1343167200000, 30.33],
        [1343253600000, 30.95],
        [1343340000000, 31.89],
        [1343599200000, 31.01],
        [1343685600000, 30.88],
        [1343772000000, 30.69],
        [1343858400000, 30.58],
        [1343944800000, 32.02],
        [1344204000000, 32.14],
        [1344290400000, 32.37],
        [1344376800000, 32.51],
        [1344463200000, 32.65],
        [1344549600000, 32.64],
        [1344808800000, 32.27],
        [1344895200000, 32.10],
        [1344981600000, 32.91],
        [1345068000000, 33.65],
        [1345154400000, 33.80],
        [1345413600000, 33.92],
        [1345500000000, 33.75],
        [1345586400000, 33.84],
        [1345672800000, 33.50],
        [1345759200000, 32.26],
        [1346018400000, 32.32],
        [1346104800000, 32.06],
        [1346191200000, 31.96],
        [1346277600000, 31.46],
        [1346364000000, 31.27],
        [1346709600000, 31.43],
        [1346796000000, 32.26],
        [1346882400000, 32.79],
        [1346968800000, 32.46],
        [1347228000000, 32.13],
        [1347314400000, 32.43],
        [1347400800000, 32.42],
        [1347487200000, 32.81],
        [1347573600000, 33.34],
        [1347832800000, 33.41],
        [1347919200000, 32.57],
        [1348005600000, 33.12],
        [1348092000000, 34.53],
        [1348178400000, 33.83],
        [1348437600000, 33.41],
        [1348524000000, 32.90],
        [1348610400000, 32.53],
        [1348696800000, 32.80],
        [1348783200000, 32.44],
        [1349042400000, 32.62],
        [1349128800000, 32.57],
        [1349215200000, 32.60],
        [1349301600000, 32.68],
        [1349388000000, 32.47],
        [1349647200000, 32.23],
        [1349733600000, 31.68],
        [1349820000000, 31.51],
        [1349906400000, 31.78],
        [1349992800000, 31.94],
        [1350252000000, 32.33],
        [1350338400000, 33.24],
        [1350424800000, 33.44],
        [1350511200000, 33.48],
        [1350597600000, 33.24],
        [1350856800000, 33.49],
        [1350943200000, 33.31],
        [1351029600000, 33.36],
        [1351116000000, 33.40],
        [1351202400000, 34.01],
        [1351638000000, 34.02],
        [1351724400000, 34.36],
        [1351810800000, 34.39],
        [1352070000000, 34.24],
        [1352156400000, 34.39],
        [1352242800000, 33.47],
        [1352329200000, 32.98],
        [1352415600000, 32.90],
        [1352674800000, 32.70],
        [1352761200000, 32.54],
        [1352847600000, 32.23],
        [1352934000000, 32.64],
        [1353020400000, 32.65],
        [1353279600000, 32.92],
        [1353366000000, 32.64],
        [1353452400000, 32.84],
        [1353625200000, 33.40],
        [1353884400000, 33.30],
        [1353970800000, 33.18],
        [1354057200000, 33.88],
        [1354143600000, 34.09],
        [1354230000000, 34.61],
        [1354489200000, 34.70],
        [1354575600000, 35.30],
        [1354662000000, 35.40],
        [1354748400000, 35.14],
        [1354834800000, 35.48],
        [1355094000000, 35.75],
        [1355180400000, 35.54],
        [1355266800000, 35.96],
        [1355353200000, 35.53],
        [1355439600000, 37.56],
        [1355698800000, 37.42],
        [1355785200000, 37.49],
        [1355871600000, 38.09],
        [1355958000000, 37.87],
        [1356044400000, 37.71],
        [1356303600000, 37.53],
        [1356476400000, 37.55],
        [1356562800000, 37.30],
        [1356649200000, 36.90],
        [1356908400000, 37.68],
        [1357081200000, 38.34],
        [1357167600000, 37.75],
        [1357254000000, 38.13],
        [1357513200000, 37.94],
        [1357599600000, 38.14],
        [1357686000000, 38.66],
        [1357772400000, 38.62],
        [1357858800000, 38.09],
        [1358118000000, 38.16],
        [1358204400000, 38.15],
        [1358290800000, 37.88],
        [1358377200000, 37.73],
        [1358463600000, 37.98],
        [1358809200000, 37.95],
        [1358895600000, 38.25],
        [1358982000000, 38.10],
        [1359068400000, 38.32],
        [1359327600000, 38.24],
        [1359414000000, 38.52],
        [1359500400000, 37.94],
        [1359586800000, 37.83],
        [1359673200000, 38.34],
        [1359932400000, 38.10],
        [1360018800000, 38.51],
        [1360105200000, 38.40],
        [1360191600000, 38.07],
        [1360278000000, 39.12],
        [1360537200000, 38.64],
        [1360623600000, 38.89],
        [1360710000000, 38.81],
        [1360796400000, 38.61],
        [1360882800000, 38.63],
        [1361228400000, 38.99],
        [1361314800000, 38.77],
        [1361401200000, 38.34],
        [1361487600000, 38.55],
        [1361746800000, 38.11],
        [1361833200000, 38.59],
        [1361919600000, 39.60],
    ]
}]
export const InvestmentsOptions = {
    chart: {
        id: 'area-datetime',
        fontFamily: 'Poppins, Arial, sans-serif',
        type: 'area',
        height: 390,
        zoom: {
            autoScaleYaxis: true
        },
        toolbar: {
            show: false
        },
        dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 7,
            left: 0,
            blur: 1,
            color: ["rgba(var(--primary-rgb))"],
            opacity: 0.1,
        },
    },
    grid: {
        borderColor: '#f3f3f3',
        strokeDashArray: 3
    },
    dataLabels: {
        enabled: false
    },
    markers: {
        size: 0,
        style: 'hollow',
    },
    xaxis: {
        type: 'datetime',
        min: new Date('01 Mar 2012').getTime(),
        tickAmount: 6,
    },
    tooltip: {
        x: {
            format: 'dd MMM yyyy'
        }
    },
    colors: ["rgba(var(--primary-rgb))"],
    stroke: {
        width: [1.5],
        curve: ['stepline']
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
                        color: "rgba(var(--primary-rgb),0.1)",
                        opacity: 1
                    },
                    {
                        offset: 75,
                        color: "rgba(var(--primary-rgb),0.1)",
                        opacity: 1
                    },
                    {
                        offset: 100,
                        color: "rgba(var(--primary-rgb),0.1)",
                        opacity: 1
                    }
                ]
            ]
        }
    },
}

export const stocks = [
    { id:1, src: "../../assets/images/media/apps/apple.png",srcclass:"dark:invert-[1]", title: "Apple", lable: "Apple Inc", price: "$191.56", text: "+1.55%", textColor: "success", stocks: "180", chartOptions: AppleOptions({ color: 'rgb(12, 215, 177)' }), chartSeries: AppleSeries },
    { id:2, src: "../../assets/images/media/apps/nvidia.png",srcclass:"", title: "Nvidia", lable: "NVIDIA Corp", price: "$594.91", text: "-4.17%", textColor: "danger", stocks: "63", chartOptions: AppleOptions({ color: 'rgb(254, 84, 84)' }), chartSeries: NvidiaSeries },
    { id:3, src: "../../assets/images/media/apps/amazon.png",srcclass:"", title: "Amazon", lable: "Amazon.com, Inc.", price: "$155.34", text: "1.84%", textColor: "success", stocks: "79", chartOptions: AppleOptions({ color: 'rgb(12, 215, 177)' }), chartSeries: AmazonSeries },
    { id:4, src: "../../assets/images/media/apps/microsoft.png",srcclass:"", title: "Microsoft", lable: "Alphabet Inc", price: "$420.55", text: "+1.56%", textColor: "success", stocks: "45", chartOptions: AppleOptions({ color: 'rgb(12, 215, 177)' }), chartSeries: MicrosoftSeries },
]

// MY STOCKS
export const MyStocks = [
    {
        id:1,
        stock: 'AAPL',
        company: 'Apple Inc',
        src: '../../assets/images/media/apps/apple.png',
        open: '$150.00',
        price: '$151.25',
        close: '$152.00',
        change: '+1.75',
        marketcap: '$2.5T',
        volume: '10M',
        changeClass: 'success',
        imgcls:"dark:invert-[1]"
    },
    {
        id:2,
        stock: 'MSFT',
        company: 'Microsoft Corp',
        src: '../../assets/images/media/apps/microsoft.png',
        open: '$300.50',
        price: '$305.00',
        close: '$303.75',
        change: '-1.25',
        marketcap: '$2.2T',
        volume: '8M',
        changeClass: 'danger'
    },
    {
        id:3,
        stock: 'AMZN',
        company: 'Amazon.com Inc',
        src: '../../assets/images/media/apps/amazon.png',
        open: '$3,200.00',
        price: '$3,210.50',
        close: '$3,205.75',
        change: '-4.75',
        marketcap: '$1.6T',
        volume: '5M',
        changeClass: 'danger'
    },
    {
        id:4,
        stock: 'GOOGL',
        company: 'Google Alphabet',
        src: '../../assets/images/media/apps/google.png',
        open: '$2,800.00',
        price: '$2,810.75',
        close: '$2,805.50',
        change: '-5.25',
        marketcap: '$2.0T',
        volume: '7M',
        changeClass: 'danger'
    },
    {
        id:5,
        stock: 'FB',
        company: 'Facebook Meta',
        src: '../../assets/images/media/apps/facebook.png',
        open: '$320.00',
        price: '$325.50',
        close: '$322.75',
        change: '+0.25',
        marketcap: '$450B',
        volume: '2M',
        changeClass: 'success'
    }
]

// WATCHLIST
export const Watchlist = [
    {
        id:1,
        symbol: 'AAPL',
        company: 'Apple Inc',
        src: '../../assets/images/media/apps/apple.png',
        lastPrice: '$150.20',
        change: '+1.50%',
        changeClass: 'success',
        imgcls:"dark:invert-[1]"
    },
    {
        id:2,
        symbol: 'GOOG',
        company: 'Google',
        src: '../../assets/images/media/apps/google.png',
        lastPrice: '$2,500.5',
        change: '-5.25%',
        changeClass: 'danger'
    },
    {
        id:3,
        symbol: 'MSFT',
        company: 'Microsoft',
        src: '../../assets/images/media/apps/microsoft.png',
        lastPrice: '$300.75',
        change: '+2.30%',
        changeClass: 'success'
    },
    {
        id:4,
        symbol: 'AMZN',
        company: 'Amazon',
        src: '../../assets/images/media/apps/amazon.png',
        lastPrice: '$3,000.00',
        change: '-10.50%',
        changeClass: 'danger'
    },
    {
        id:5,
        symbol: 'TSLA',
        company: 'Tesla',
        src: '../../assets/images/media/apps/tesla.png',
        lastPrice: '$700.80',
        change: '+8.00%',
        changeClass: 'success',
        imgcls:"dark:invert-[1]"
    },
    {
        id:6,
        symbol: 'FB',
        company: 'Facebook Meta',
        src: '../../assets/images/media/apps/facebook.png',
        lastPrice: '$350.40',
        change: '-3.20%',
        changeClass: 'danger'
    },
    {
        id:7,
        symbol: 'NVDA',
        company: 'NVIDIA',
        src: '../../assets/images/media/apps/nvidia.png',
        lastPrice: '$800.60',
        change: '+5.75%',
        changeClass: 'success'
    },
    {
        id:8,
        symbol: 'V',
        company: 'Visa',
        src: '../../assets/images/media/apps/visa.png',
        lastPrice: '$250.90',
        change: '-1.80%',
        changeClass: 'danger'
    },
    {
        id:9,
        symbol: 'PYPL',
        company: 'PayPal',
        src: '../../assets/images/media/apps/paypal.png',
        lastPrice: '$230.10',
        change: '+4.60%',
        changeClass: 'success'
    },
    {
        id:10,
        symbol: 'IBM',
        company: 'IBM',
        src: '../../assets/images/media/apps/ibm.png',
        lastPrice: '$120.50',
        change: '-2.50%',
        changeClass: 'danger'
    },
    {
        id:11,
        symbol: 'INTC',
        company: 'Intel',
        src: '../../assets/images/media/apps/intel.png',
        lastPrice: '$55.75',
        change: '+0.90%',
        changeClass: 'success'
    }
];

const slidestore = [
    {
      id: '1',
      src: '../../assets/images/media/apps/apple.png',
      name: 'Apple',
      price: '$150.20',
      stockclass:'success',
      cardbg:"primary/[0.15]",
      cardbg1:"primary",
      stockgrow: '+1.50',
      stock: '$157.71',
      srcclass:"dark:invert-[1]"
    },
    {
      id: '2',
      src: '../../assets/images/media/apps/google.png',
      name: 'Google',
      price: '$2,500.50',
      stockclass:'danger',
      cardbg:"secondary/[0.15]",
      cardbg1:"secondary",
      stockgrow: '-5.25',
      stock: '$2,625.53',
    },
    {
      id: '3',
      src: '../../assets/images/media/apps/microsoft.png',
      name: 'Microsoft',
      price: '$300.75',
      stockclass:'success',
      cardbg:"success/[0.15]",
      stockgrow: '+2.30%',
      stock: '$315.79',
    },
    {
      id: '4',
      src: '../../assets/images/media/apps/amazon.png',
      name: 'Amazon',
      price: '$3,000.00',
      stockclass:'danger',
      cardbg:"orangemain/[0.15]",
      cardbg1:"orangemain",
      stockgrow: '-10.50%',
      stock: '$3,150.00',
    },
    {
      id: '5',
      src: '../../assets/images/media/apps/tesla.png',
      name: 'Tesla',
      price: '$700.80',
      stockclass:'success',
      cardbg:"info/[0.15]",
      cardbg1:"info",
      stockgrow: '+8.00%',
      stock: '$735.84',
      srcclass:"dark:invert-[1]"
    },
    {
      id: '6',
      src: '../../assets/images/media/apps/facebook.png',
      name: 'Facebook',
      price: '$350.40',
      stockclass:'danger',
      cardbg:"warning/[0.15]",
      cardbg1:"warning",
      stockgrow: '-3.20%',
      stock: '$367.92',
    }, 
    {
      id: '1',
      src: '../../assets/images/media/apps/nvidia.png',
      name: 'Nvidia',
      price: '$800.60',
      stockclass:'success',
      cardbg:"greenmain/[0.15]",
      cardbg1:"greenmain",
      stockgrow: '+5.75%',
      stock: '$840.63',
    }
  ];

export const StockSlides = slidestore.map((stock, index) => (
    <div key={index}>
      <SpkStockCard stock={stock}  />
    </div>
  ))

  export const breakpoints = {
    // when window width is >= 320px
    320: {
        slidesPerView: 1,
        spaceBetween: 20,
    },
    500: {
        slidesPerView: 2,
        spaceBetween: 20,
    },
    768: {
        slidesPerView: 3,
        spaceBetween: 20,
    },
    1024: {
        slidesPerView: 3,
        spaceBetween: 20,
    },
    1200: {
        slidesPerView: 3,
        spaceBetween: 20,
    },
    1400: {
        slidesPerView: 4,
        spaceBetween: 20,
    },
    1600: {
        slidesPerView: 4,
        spaceBetween: 20,
    },
    1800: {
        slidesPerView: 5,
        spaceBetween: 20,
    },
};
 export const TRENDING = [
    {
      name: 'Apple',
      price: '$12,289.44',
      changePercent: '0.14%',
      changeAmount: '+$1,780.80',
      imageSrc: '../../assets/images/media/apps/apple.png',
      imgcls:"dark:invert-[1]"
    },
    {
      name: 'Microsoft',
      price: '$12,289.44',
      changePercent: '0.14%',
      changeAmount: '+$1,780.80',
      imageSrc: '../../assets/images/media/apps/microsoft.png',
    },
    {
      name: 'Nvidia',
      price: '$12,289.44',
      changePercent: '0.14%',
      changeAmount: '+$1,780.80',
      imageSrc: '../../assets/images/media/apps/nvidia.png',
    },
    {
      name: 'Amazon',
      price: '$12,289.44',
      changePercent: '0.14%',
      changeAmount: '+$1,780.80',
      imageSrc: '../../assets/images/media/apps/amazon.png',
    },
  ];

  