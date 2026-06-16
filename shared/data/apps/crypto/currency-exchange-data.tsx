export const Series = [
    {
        name: "Value",
        data: [54, 38, 56, 35, 65, 43, 53, 45, 62, 80, 35, 48],
    },
]
export const Options: any = ({ color }: any) => ({
    chart: {
        type: "line",
        height: 60,
        sparkline: {
            enabled: true,
        },
        dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 0,
            left: 0,
            blur: 1,
            color: "#fff",
            opacity: 0.05,
        },
    },
    stroke: {
        show: true,
        curve: "smooth",
        lineCap: "butt",
        colors: undefined,
        width: 1,
        dashArray: 0,
    },
    fill: {
        gradient: {
            enabled: false,
        },
    },
    yaxis: {
        min: 0,
        show: false,
        axisBorder: {
            show: false,
        },
    },
    xaxis: {
        axisBorder: {
            show: false,
        },
    },
   
    colors: [color],
    // colors: ["rgba(84, 109, 254,0.5)"],
    tooltip: {
        enabled: false,
    },
})

interface SelectType {
    value: string;
    label: string;
  }

export const Options1: SelectType[] = [
    { value: 'Bitcoin', label: 'Bitcoin' },
    { value: 'Etherium', label: 'Etherium' },
    { value: 'Litecoin', label: 'Litecoin' },
    { value: 'Ripple', label: 'Ripple' },
    { value: 'Cardano', label: 'Cardano' },
    { value: 'Neo', label: 'Neo' },
    { value: 'Stellar', label: 'Stellar' },
    { value: 'EOS', label: 'EOS' },
    { value: 'NEM', label: 'NEM' },
  ];

  export const Options2: SelectType[] = [
    { value: 'USD', label: 'USD' },
    { value: 'Pound', label: 'Pound' },
    { value: 'Rupee', label: 'Rupee' },
    { value: 'Euro', label: 'Euro' },
    { value: 'Won', label: 'Won' },
    { value: 'Dinar', label: 'Dinar' },
    { value: 'Rial', label: 'Rial' }
  ];

export const cryptoData = [
    {
        id:1,
        name: 'Bitcoin - BTC',
        symbol: 'BTC',
        percentChange: '24.3%',
        price: '$30.29',
        amount: '0.00434',
        chartId: 'btc-currency-chart',
        src: '../../../assets/images/crypto-currencies/square-color/Bitcoin.svg',
        badge: '24H',
        color: 'primary',
        chartOptions: Options({ color: 'rgba(84, 109, 254,0.5)' }),
        chartSeries: Series
    },
    {
        id:2,
        name: 'Ethereum - ETH',
        symbol: 'ETH',
        percentChange: '17.67%',
        price: '$2,283.73',
        amount: '1.2923',
        chartId: 'eth-currency-chart',
        src: '../../../assets/images/crypto-currencies/square-color/Ethereum.svg',
        badge: '',
        color: 'secondary',
        chartOptions: Options({ color: 'rgba(106, 78, 237,0.5)' }),
        chartSeries: Series
    },
    {
        id:3,
        name: 'Dash - DASH',
        symbol: 'DASH',
        percentChange: '17.67%',
        price: '$2,283.73',
        amount: '1.2923',
        chartId: 'dash-currency-chart',
        src: '../../../assets/images/crypto-currencies/square-color/Dash.svg',
        badge: '',
        color: 'success',
        chartOptions: Options({ color: 'rgba(10, 145, 81,0.5)' }),
        chartSeries: Series
    },
    {
        id:4,
        name: 'Litecoin - LTC',
        symbol: 'LTC',
        percentChange: '17.67%',
        price: '$2,283.73',
        amount: '1.2923',
        chartId: 'ltc-currency-chart',
        src: '../../../assets/images/crypto-currencies/square-color/Litecoin.svg',
        badge: '',
        color: 'warning',
        chartOptions: Options({ color: 'rgba(227, 192, 11, 0.5)' }),
        chartSeries: Series
    },
    {
        id:5,
        name: 'Ripple - XRS',
        symbol: 'XRS',
        percentChange: '17.67%',
        price: '$2,283.73',
        amount: '1.2923',
        chartId: 'xrs-currency-chart',
        src: '../../../assets/images/crypto-currencies/square-color/Ripple.svg',
        badge: '',
        color: 'pink',
        chartOptions: Options({ color: 'rgba(252, 108, 133, 0.5)' }),
        chartSeries: Series
    },
    {
        id:6,
        name: 'Golem - GLM',
        symbol: 'GLM',
        percentChange: '17.67%',
        price: '$2,283.73',
        amount: '1.2923',
        chartId: 'glm-currency-chart',
        src: '../../../assets/images/crypto-currencies/square-color/Golem.svg',
        badge: '',
        color: 'purple',
        chartOptions: Options({ color: 'rgba(215, 124, 247, 0.5)' }),
        chartSeries: Series
    },
    {
        id:7,
        name: 'Monero',
        symbol: 'XMR',
        percentChange: '17.67%',
        price: '$2,283.73',
        amount: '1.2923',
        chartId: 'monero-currency-chart',
        src: '../../../assets/images/crypto-currencies/square-color/Monero.svg',
        badge: '',
        color: 'danger',
        chartOptions: Options({ color: 'rgba(237, 78, 131, 0.5)' }),
        chartSeries: Series
    },
    {
        id:8,
        name: 'EOS',
        symbol: 'EOS',
        percentChange: '17.67%',
        price: '$2,283.73',
        amount: '1.2923',
        chartId: 'eos-currency-chart',
        src: '../../../assets/images/crypto-currencies/square-color/EOS.svg',
        badge: '',
        color: 'info',
        chartOptions: Options({ color: 'rgba(70, 178, 201, 0.5)' }),
        chartSeries: Series
    }
];