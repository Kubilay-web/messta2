/* btc chart */
export const BtcChartSeries = [{
    data: [105, 112, 80, 145, 98, 148, 110, 87, 102]
}]
export const BtcChartOptions = {
    chart: {
        height: 60,
        type: 'area',
        fontFamily: 'Montserrat',
        zoom: {
            enabled: false
        },
        sparkline: {
            enabled: true
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
                formatter: function (_seriesName:any) {
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
    colors: ["rgba(255,255,255,0.6)"],
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
                        color: "rgba(255,255,255,0.05)",
                        opacity: 1
                    },
                    {
                        offset: 75,
                        color: "rgba(255,255,255,0.05)",
                        opacity: 1
                    },
                    {
                        offset: 100,
                        color: "rgba(255,255,255,0.05)",
                        opacity: 1
                    }
                ]
            ]
        }
    },
}

/* eth chart */
export const EthChartSeries = [{
    data: [112, 87, 105, 102, 145, 98, 110, 148, 80]
}]

/* tether chart */
export const TetherChartSeries = [{
    data: [145, 110, 112, 87, 148, 102, 98, 105, 80]
}]

/* solana chart */
export const SolanaChartSeries = [{
    data: [105, 87, 148, 80, 110, 145, 112, 102, 98]
}]

/* coin statiistics */
export const StatiisticsSeries = [
    {
        data: [
            {
                x: new Date(1538778600000),
                y: [6629.81, 6650.5, 6623.04, 6633.33],
            },
            {
                x: new Date(1538780400000),
                y: [6632.01, 6643.59, 6620, 6630.11],
            },
            {
                x: new Date(1538782200000),
                y: [6630.71, 6648.95, 6623.34, 6635.65],
            },
            {
                x: new Date(1538784000000),
                y: [6635.65, 6651, 6629.67, 6638.24],
            },
            {
                x: new Date(1538785800000),
                y: [6638.24, 6640, 6620, 6624.47],
            },
            {
                x: new Date(1538787600000),
                y: [6624.53, 6636.03, 6621.68, 6624.31],
            },
            {
                x: new Date(1538789400000),
                y: [6624.61, 6632.2, 6617, 6626.02],
            },
            {
                x: new Date(1538791200000),
                y: [6627, 6627.62, 6584.22, 6603.02],
            },
            {
                x: new Date(1538793000000),
                y: [6605, 6608.03, 6598.95, 6604.01],
            },
            {
                x: new Date(1538794800000),
                y: [6604.5, 6614.4, 6602.26, 6608.02],
            },
            {
                x: new Date(1538796600000),
                y: [6608.02, 6610.68, 6601.99, 6608.91],
            },
            {
                x: new Date(1538798400000),
                y: [6608.91, 6618.99, 6608.01, 6612],
            },
            {
                x: new Date(1538800200000),
                y: [6612, 6615.13, 6605.09, 6612],
            },
            {
                x: new Date(1538802000000),
                y: [6612, 6624.12, 6608.43, 6622.95],
            },
            {
                x: new Date(1538803800000),
                y: [6623.91, 6623.91, 6615, 6615.67],
            },
            {
                x: new Date(1538805600000),
                y: [6618.69, 6618.74, 6610, 6610.4],
            },
            {
                x: new Date(1538807400000),
                y: [6611, 6622.78, 6610.4, 6614.9],
            },
            {
                x: new Date(1538809200000),
                y: [6614.9, 6626.2, 6613.33, 6623.45],
            },
            {
                x: new Date(1538811000000),
                y: [6623.48, 6627, 6618.38, 6620.35],
            },
            {
                x: new Date(1538812800000),
                y: [6619.43, 6620.35, 6610.05, 6615.53],
            },
            {
                x: new Date(1538814600000),
                y: [6615.53, 6617.93, 6610, 6615.19],
            },
            {
                x: new Date(1538816400000),
                y: [6615.19, 6621.6, 6608.2, 6620],
            },
            {
                x: new Date(1538818200000),
                y: [6619.54, 6625.17, 6614.15, 6620],
            },
            {
                x: new Date(1538820000000),
                y: [6620.33, 6634.15, 6617.24, 6624.61],
            },
            {
                x: new Date(1538821800000),
                y: [6625.95, 6626, 6611.66, 6617.58],
            },
            {
                x: new Date(1538823600000),
                y: [6619, 6625.97, 6595.27, 6598.86],
            },
            {
                x: new Date(1538825400000),
                y: [6598.86, 6598.88, 6570, 6587.16],
            },
            {
                x: new Date(1538827200000),
                y: [6588.86, 6600, 6580, 6593.4],
            },
            {
                x: new Date(1538829000000),
                y: [6593.99, 6598.89, 6585, 6587.81],
            },
            {
                x: new Date(1538830800000),
                y: [6587.81, 6592.73, 6567.14, 6578],
            },
            {
                x: new Date(1538832600000),
                y: [6578.35, 6581.72, 6567.39, 6579],
            },
            {
                x: new Date(1538834400000),
                y: [6579.38, 6580.92, 6566.77, 6575.96],
            },
            {
                x: new Date(1538836200000),
                y: [6575.96, 6589, 6571.77, 6588.92],
            },
            {
                x: new Date(1538838000000),
                y: [6588.92, 6594, 6577.55, 6589.22],
            },
            {
                x: new Date(1538839800000),
                y: [6589.3, 6598.89, 6589.1, 6596.08],
            },
            {
                x: new Date(1538841600000),
                y: [6597.5, 6600, 6588.39, 6596.25],
            },
            {
                x: new Date(1538843400000),
                y: [6598.03, 6600, 6588.73, 6595.97],
            },
            {
                x: new Date(1538845200000),
                y: [6595.97, 6602.01, 6588.17, 6602],
            },
            {
                x: new Date(1538847000000),
                y: [6602, 6607, 6596.51, 6599.95],
            },
            {
                x: new Date(1538848800000),
                y: [6600.63, 6601.21, 6590.39, 6591.02],
            },
            {
                x: new Date(1538850600000),
                y: [6591.02, 6603.08, 6591, 6591],
            },
            {
                x: new Date(1538852400000),
                y: [6591, 6601.32, 6585, 6592],
            },
            {
                x: new Date(1538854200000),
                y: [6593.13, 6596.01, 6590, 6593.34],
            },
            {
                x: new Date(1538856000000),
                y: [6593.34, 6604.76, 6582.63, 6593.86],
            },
            {
                x: new Date(1538857800000),
                y: [6593.86, 6604.28, 6586.57, 6600.01],
            },
            {
                x: new Date(1538859600000),
                y: [6601.81, 6603.21, 6592.78, 6596.25],
            },
            {
                x: new Date(1538861400000),
                y: [6596.25, 6604.2, 6590, 6602.99],
            },
            {
                x: new Date(1538863200000),
                y: [6602.99, 6606, 6584.99, 6587.81],
            },
            {
                x: new Date(1538865000000),
                y: [6587.81, 6595, 6583.27, 6591.96],
            },
            {
                x: new Date(1538866800000),
                y: [6591.97, 6596.07, 6585, 6588.39],
            },
            {
                x: new Date(1538868600000),
                y: [6587.6, 6598.21, 6587.6, 6594.27],
            },
            {
                x: new Date(1538870400000),
                y: [6596.44, 6601, 6590, 6596.55],
            },
            {
                x: new Date(1538872200000),
                y: [6598.91, 6605, 6596.61, 6600.02],
            },
            {
                x: new Date(1538874000000),
                y: [6600.55, 6605, 6589.14, 6593.01],
            },
            {
                x: new Date(1538875800000),
                y: [6593.15, 6605, 6592, 6603.06],
            },
            {
                x: new Date(1538877600000),
                y: [6603.07, 6604.5, 6599.09, 6603.89],
            },
            {
                x: new Date(1538879400000),
                y: [6604.44, 6604.44, 6600, 6603.5],
            },
            {
                x: new Date(1538881200000),
                y: [6603.5, 6603.99, 6597.5, 6603.86],
            },
            {
                x: new Date(1538883000000),
                y: [6603.85, 6605, 6600, 6604.07],
            },
            {
                x: new Date(1538884800000),
                y: [6604.98, 6606, 6604.07, 6606],
            },
        ],
    },
]
export const StatiisticsOptions = {
    chart: {
        type: "candlestick",
        height: 320,
        toolbar: {
            show: false,
        },
    },
    tooltip: {
        enabled: true,
        theme: "dark",
    },
    plotOptions: {
        candlestick: {
            colors: {
                upward: 'rgb(12, 215, 177)',
                downward: 'rgb(254, 84, 84)'
            },
        },
    },
    grid: {
        borderColor: "#f1f1f1",
        strokeDashArray: 3,
    },
    title: {
        align: "left",
    },
    xaxis: {
        type: "datetime",
        labels: {
            rotate: -90,
            style: {
                colors: "rgb(107 ,114 ,128)",
                fontSize: "12px",
            },
        },
    },
    yaxis: {
        tooltip: {
            enabled: true,
            theme: "dark",
        },
        labels: {
            style: {
                colors: "rgb(107 ,114 ,128)",
                fontSize: "10px",
            },
            formatter: function (e: string) {
                return "$" + e
            }
        },
    },
}

/* my assets */
export const AssetsSeries = [4.2891, 12.533, 78.890, 67.700]
export const AssetsOptions = {
    labels: ["Bitcoin", "Tether", "Dogecoin", "Solana"],
    chart: {
        height: 200,
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
                        offsetY: -4
                    },
                    value: {
                        show: true,
                        fontSize: '18px',
                        color: undefined,
                        offsetY: 8,
                        formatter: function (val: string) {
                            return val + "%"
                        }
                    },
                    total: {
                        show: true,
                        showAlways: true,
                        label: 'Total',
                        fontSize: '22px',
                        fontWeight: 600,
                        color: '#495057',
                    }

                }
            }
        }
    },
    colors: ["rgba(12, 215, 177, 0.9)", "rgba(254, 124, 88, 0.9)", "rgba(var(--primary-rgb),0.9)", "rgba(215, 124, 247, 0.9)"],
}

/* Start:: Crypto Rankings */
export const BtcRankingsSeries = [{
    name: 'Value',
    data: [0, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46]
}]
export const BtcRankingsOptions: any = ({ color }: any) => ({
    chart: {
        type: 'area',
        height: 20,
        width: 120,
        sparkline: {
            enabled: true
        },
    },
    stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'butt',
        colors: undefined,
        width: 1,
        dashArray: 0,
    },
    fill: {
        gradient: {
            enabled: false
        }
    },
    tooltip: {
        enabled: false,
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
   
    colors: [color]
})

export const EthRankingsSeries = [{
    name: 'Value',
    data: [0, 45, 54, 38, 56, 24, 65, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46, 31, 37, 39, 62, 51, 35, 41]
}]

export const DachRankingsSeries = [{
    name: 'Value',
    data: [61, 27, 54, 43, 19, 46, 31, 37, 39, 0, 45, 54, 38, 56, 24, 65, 35, 27, 93, 53, 62, 51, 35, 41]
}]

export const RupiRankingsSeries = [{
    name: 'Value',
    data: [61, 27, 54, 43, 19, 56, 24, 65, 35, 27, 93, 53, 46, 31, 37, 39, 0, 45, 54, 38, 62, 51, 35, 41]
}]

export const IotaRankingsSeries = [{
    name: 'Value',
    data: [61, 27, 54, 37, 39, 0, 45, 54, 38, 62, 51, 35, 41, 43, 19, 56, 24, 65, 35, 27, 93, 53, 46, 31]
}]

export const NeoRankingsSeries = [{
    name: 'Value',
    data: [62, 51, 35, 41, 43, 19, 56, 24, 65, 35, 27, 93, 53, 46, 31, 61, 27, 54, 37, 39, 0, 45, 54, 38]
}]




export const cardData = [
    { cardBgColor: "primary", imgBgcolor: "white", img: "../../assets/images/crypto-currencies/crypto-icons/bitcoin-btc-logo.svg", title: "Bitcoin - BTC", coin: "BTC", count: "0.8531", text: "$0.04", vol: "+2.33%", chartOptions: BtcChartOptions, chartSeries: BtcChartSeries },
    { cardBgColor: "secondary ", imgBgcolor: "white", img: "../../assets/images/crypto-currencies/crypto-icons/ethereum-eth-logo.svg", title: "Etherium - ETH", coin: "ETH", count: "3.28353", text: "$0.04", vol: "+2.33%", chartOptions: BtcChartOptions, chartSeries: EthChartSeries },
    { cardBgColor: "success", imgBgcolor: "white", img: "../../assets/images/crypto-currencies/crypto-icons/tether-usdt-logo.svg", title: "Tether - USDT", coin: "USDT", count: "302.15", text: "$0.04", vol: "+2.33%", chartOptions: BtcChartOptions, chartSeries: TetherChartSeries },
    { cardBgColor: "orange", imgBgcolor: "white", img: "../../assets/images/crypto-currencies/crypto-icons/solana-sol-logo.svg", title: "Solana - SOL", coin: "SOL", count: "2452.234", text: "$0.04", vol: "+2.33%", chartOptions: BtcChartOptions, chartSeries: SolanaChartSeries },
]

// CRYPTO RANKINGS
export const ranking = [
    { id: 1, coinName: "Bitcoin", coinSrc: "../../assets/images/crypto-currencies/regular/Bitcoin.svg", textColor: "success", price: "$45,839.10", marketCap: "$324.01B", priceChange: "0.30%", volume: "14,674,311,168", chartOptions: BtcRankingsOptions({ color: 'rgb(12, 215, 177)' }), chartSeries: BtcRankingsSeries },
    { id: 2, coinName: "Etherium", coinSrc: "../../assets/images/crypto-currencies/regular/Ethereum.svg", textColor: "success", price: "$1,217.96", marketCap: "$149,316,232,699", priceChange: "0.30%", volume: "$4,758,554,801", chartOptions: BtcRankingsOptions({ color: 'rgb(254, 84, 84)' }), chartSeries: EthRankingsSeries },
    { id: 3, coinName: "Dash", coinSrc: "../../assets/images/crypto-currencies/regular/Dash.svg", textColor: "success", price: "$43.49", marketCap: "$480,799,847", priceChange: "0.45%", volume: "$52,626,563", chartOptions: BtcRankingsOptions({ color: 'rgb(12, 215, 177)' }), chartSeries: DachRankingsSeries },
    { id: 4, coinName: "Ripple", coinSrc: "../../assets/images/crypto-currencies/regular/Ripple.svg", textColor: "success", price: "$0.3531", marketCap: "$17,791,969,465", priceChange: "0.97%", volume: "$511,598,941", chartOptions: BtcRankingsOptions({ color: 'rgb(12, 215, 177)' }), chartSeries: RupiRankingsSeries },
    { id: 5, coinName: "Iota", coinSrc: "../../assets/images/crypto-currencies/regular/IOTA.svg", textColor: "success", price: "$0.169741", marketCap: "$471,800,600", priceChange: "0.93%", volume: "$5,524,385", chartOptions: BtcRankingsOptions({ color: 'rgb(254, 84, 84)' }), chartSeries: IotaRankingsSeries },
    { id: 6, coinName: "Neo", coinSrc: "../../assets/images/crypto-currencies/regular/Neo.svg", textColor: "danger", price: "$6.43", marketCap: "$453,601,667", priceChange: "0.49%", volume: "$12,904,320", chartOptions: BtcRankingsOptions({ color: 'rgb(254, 84, 84)' }), chartSeries: NeoRankingsSeries },
]

// MY BALANCE
export const MyBlance = [
    {
        id: 1,
        currency: "Bitcoin",
        symbol: "BTC",
        coinsPossessed: "2.5 BTC",
        usdPrice: "$96,000",
        change: "+3.50%",
        changeClass: "success",
        logo: "../../assets/images/crypto-currencies/crypto-icons/bitcoin-btc-logo.svg",
    },
    {
        id: 2,
        currency: "Tether",
        symbol: "USDT",
        coinsPossessed: "10,000 USDT",
        usdPrice: "$1.00",
        change: "-0.20%",
        changeClass: "danger",
        logo: "../../assets/images/crypto-currencies/crypto-icons/tether-usdt-logo.svg",
    },
    {
        id: 3,
        currency: "Dogecoin",
        symbol: "DOGE",
        coinsPossessed: "50,000 DOGE",
        usdPrice: "$0.25",
        change: "+5.80%",
        changeClass: "success",
        logo: "../../assets/images/crypto-currencies/crypto-icons/dogecoin-doge-logo.svg",
    },
    {
        id: 4,
        currency: "Solana",
        symbol: "SOL",
        coinsPossessed: "100 SOL",
        usdPrice: "$150.00",
        change: "-1.75%",
        changeClass: "danger",
        logo: "../../assets/images/crypto-currencies/crypto-icons/solana-sol-logo.svg",
    },
    {
        id: 5,
        currency: "Binance Coin",
        symbol: "BNB",
        coinsPossessed: "20 BNB",
        usdPrice: "$300.00",
        change: "+2.00%",
        changeClass: "success",
        logo: "../../assets/images/crypto-currencies/crypto-icons/binance-usd-busd-logo.svg",
    },
    {
        id: 6,
        currency: "USD Coin",
        symbol: "USDC",
        coinsPossessed: "5,000 USDC",
        usdPrice: "$1.00",
        change: "+0.10%",
        changeClass: "success",
        logo: "../../assets/images/crypto-currencies/crypto-icons/usd-coin-usdc-logo.svg",
    },
];

export const cryptoData = [
    {
      name: 'Bitcoin',
      symbol: 'BTC',
      price: '4.2891 - BTC',
      percentage: '2.19%',
      logo: '../../assets/images/crypto-currencies/crypto-icons/bitcoin-btc-logo.svg',
      priceChangeClass: 'text-success', // Optional class for styling
    },
    {
      name: 'Tether',
      symbol: 'USDT',
      price: '12.533 - USDT',
      percentage: '1.67%',
      logo: '../../assets/images/crypto-currencies/crypto-icons/tether-usdt-logo.svg',
      priceChangeClass: 'text-success',
    },
    {
      name: 'Dogecoin',
      symbol: 'DOGE',
      price: '78.890 - DOGE',
      percentage: '21.35%',
      logo: '../../assets/images/crypto-currencies/crypto-icons/dogecoin-doge-logo.svg',
      priceChangeClass: 'text-success',
    },
    {
      name: 'Solana',
      symbol: 'SOL',
      price: '67.700 - SOL',
      percentage: '77.53%',
      logo: '../../assets/images/crypto-currencies/crypto-icons/solana-sol-logo.svg',
      priceChangeClass: 'text-danger', // Price change is negative, hence different class
    },
  ];

 export const cryptoTransactions = [
    {
      name: 'Bitcoin',
      logo: '../../assets/images/crypto-currencies/square-color/Bitcoin.svg',
      date: 'Today',
      priceChange: '+$19,123',
      symbol: 'BTC 0.0823.45',
      priceChangeClass: 'text-success', // Optional class for styling
    },
    {
      name: 'Etherium',
      logo: '../../assets/images/crypto-currencies/square-color/Ethereum.svg',
      date: '10,Jan 2024',
      priceChange: '-$1,430',
      symbol: 'ETH 10,783.23',
      priceChangeClass: 'text-danger',
    },
    {
      name: 'Dash',
      logo: '../../assets/images/crypto-currencies/square-color/Dash.svg',
      date: '25,Jan 2024',
      priceChange: '+$5,236',
      symbol: 'DASH 12,456.98',
      priceChangeClass: 'text-success',
    },
    {
      name: 'Bytecoin',
      logo: '../../assets/images/crypto-currencies/square-color/Bytecoin.svg',
      date: 'Yesterday',
      priceChange: '-$1,810',
      symbol: 'BYTE 8,154.00',
      priceChangeClass: 'text-danger',
    },
    {
      name: 'Golem',
      logo: '../../assets/images/crypto-currencies/square-color/Golem.svg',
      date: '18,Feb 2024',
      priceChange: '+$5,046',
      symbol: 'GLM 9,384.73',
      priceChangeClass: 'text-success',
    },
  ];

  interface SelectType {
    value: string;
    label: string;
}

export const Coindata: SelectType[] = [
    { value: "BTC", label: "BTC" },
    { value: "ETH", label: "ETH" },
    { value: "XRP", label: "XRP" },
    { value: "DASH", label: "DASH" },
    { value: "NEO", label: "NEO" },
    { value: "LTC", label: "LTC" },
    { value: "BSD", label: "BSD" }
];
export const Currencydata: SelectType[] = [
    { value: "USD", label: "USD" },
    { value: "AED", label: "AED" },
    { value: "AUD", label: "AUD" },
    { value: "ARS", label: "ARS" },
    { value: "AZN", label: "AZN" },
    { value: "BGN", label: "BGN" },
    { value: "BRL", label: "BRL" }
];