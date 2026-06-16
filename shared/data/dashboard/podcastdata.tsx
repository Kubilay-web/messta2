// PODCAST ACTIVITY
export const ActivitySeries = [{
    name: 'Hours',
    data: [40, 35, 66, 28, 38, 55, 45]
}]
export const ActivityOption = {
    chart: {
        height: 235,
        fontFamily: 'Poppins, Arial, sans-serif',
        type: 'bar',
        toolbar: {
            show: false
        }
    },
    grid: {
        show: false,
        borderColor: '#f2f6f7',
    },
    dataLabels: {
        enabled: false
    },
    legend: {
        position: 'top',
        fontSize: '13px',
    },
    colors: ["rgba(var(--primary-rgb),0.8)"],
    stroke: {
        width: [0],
        curve: 'straight',
    },
    plotOptions: {
        bar: {
            columnWidth: "27%",
            borderRadius: 3,
            colors: {
                ranges: [{
                    from: 41,
                    to: 100,
                    color: 'rgba(215, 124, 247, 0.8)'
                }, {
                    from: 0,
                    to: 40,
                    color: 'rgba(var(--primary-rgb),0.8)'
                }]
            },
        }
    },
    tooltip: {
        enabled: true,
        theme: "dark",
    },
    labels: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
}

// POPULAR PODCASTERS
export const PopularPodcasters = [
    {
        id: 1,
        name: "Harmony Maestro",
        bgcolor:"primary",
        category: "Music & Arts",
        episodes: 50,
        src: "../../assets/images/faces/png/1.png",
        buttonText: "Follow",
        buttonClass: "ti-btn-soft-primary",
    },
    {
        id: 2,
        name: "Aria Whisper",
        category: "Storytelling",
        bgcolor:"warning",
        episodes: 80,
        src: "../../assets/images/faces/png/7.png",
        buttonText: "Follow",
        buttonClass: "ti-btn-soft-primary",
    },
    {
        id: 3,
        name: "Luna Explorer",
        category: "Science",
        bgcolor:"secondary",
        episodes: 30,
        src: "../../assets/images/faces/png/9.png",
        buttonText: "Following",
        buttonClass: "ti-btn-primary",
    },
    {
        id: 4,
        name: "Celestial Mind",
        category: "Self-Improvement",
        bgcolor:"success",
        episodes: 60,
        src: "../../assets/images/faces/png/10.png",
        buttonText: "Follow",
        buttonClass: "ti-btn-soft-primary",
    },
]

// POPULAR PODCASTS
export const PopularPodcasts = [
    {
        id:1,
        name: 'Random Ramblings',
        host: 'Alice Mumbleton',
        frequency: 'Weekly',
        category: 'Comedy',
        categoryColor: "secondary",
        latestEpisode: '#156: Silly Stories',
        duration: '45 mins',
        rating: 4.5,
        src: '../../assets/images/media/media-85.jpg',
    },
    {
        id:2,
        name: 'Mindless Musings',
        host: 'Bob Jibberish',
        frequency: 'Bi-weekly',
        category: 'Culture',
        categoryColor: "success",
        latestEpisode: '#82: Deep Nonsense',
        duration: '30 mins',
        rating: 4.2,
        src: '../../assets/images/media/media-79.jpg',
    },
    {
        id:3,
        name: 'Chatterbox Chronicles',
        host: 'Charlie Babbleworth',
        frequency: 'Monthly',
        category: 'Personal Journal',
        categoryColor: "info",
        latestEpisode: '#30: Life\'s Random',
        duration: '60 mins',
        rating: 4.7,
        src: '../../assets/images/media/media-73.jpg',
    },
    {
        id:4,
        name: 'Ramble Roundup',
        host: 'Gary Gibberish',
        frequency: 'Daily',
        category: 'News and Politics',
        categoryColor: "warning",
        latestEpisode: '#300: Current Affairs',
        duration: '20 mins',
        rating: 4.9,
        src: '../../assets/images/media/media-71.jpg',
    },
    {
        id:5,
        name: 'Babble Bites',
        host: 'Eddie Gibberoni',
        frequency: 'Weekly',
        category: 'Food and Drink',
        categoryColor: "primary",
        latestEpisode: '#45: Culinary Capers',
        duration: '50 mins',
        rating: 4.8,
        src: '../../assets/images/media/media-60.jpg',
    },
];
export const cardData = [
    {
      image: '../../assets/images/media/media-85.jpg',
      title: 'Random Ramblings',
      author: 'Alice Mumbleton',
      duration: '2h 32m',
      listeners: '67,862'
    },
    {
      image: '../../assets/images/media/media-79.jpg',
      title: 'Mindless Musings',
      author: 'Bob Jibberish',
      duration: '3h 25m',
      listeners: '15,352'
    },
    {
      image: '../../assets/images/media/media-73.jpg',
      title: 'Chatterbox Chronicles',
      author: 'Charlie Babbleworth',
      duration: '6h 45m',
      listeners: '22,453'
    },
    {
      image: '../../assets/images/media/media-71.jpg',
      title: 'Whimsical Whispers',
      author: 'Fiona Jargonova',
      duration: '1h 15m',
      listeners: '6,352'
    }
  ];