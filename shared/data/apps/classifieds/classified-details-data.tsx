import SpkFeatureCard from "@/shared/@spk-reusable-components/apps/reusable-classifieds/spk-feature-card";

export const RelatedAds = [
   
    {
        id: 1,
        price: "$2,226.00",
        description: "4-Bds - 4 Ba - 600ff3",
        title: "4 Beds Duplex House",
        location: "USA",
        date: "16 Nov 2024",
        badge: "Featured",
        bg: "warning",
        image: "../../assets/images/classifieds/featured-adds/1.jpg",

    },
    {
        id: 2,
        price: "$5,321.00",
        description: "2024 - 120,000km",
        title: "Cadbo Car kb43",
        location: "Banglore",
        date: "16 Nov 2024",
        badge: "Sold Out",
        bg: "danger",
        image: "../../assets/images/classifieds/featured-adds/2.jpg",

    },
    {
        id: 3,
        price: "$56,764.00",
        description: "2022 Oct 04",
        title: "Smart Phone H6",
        location: "Chennai",
        date: "16 Nov 2024",
        badge: "New",
        bg: "primary",
        image: "../../assets/images/classifieds/featured-adds/3.jpg",

    },
    {
        id: 4,
        price: "$5,763.00",
        description: "2024 - 120,000km",
        title: "Gittbos Bike Mf120",
        location: "Pune",
        date: "16 Nov 2024",
        badge: "Urgent",
        bg: "danger",
        image: "../../assets/images/classifieds/featured-adds/4.jpg",

    },
    {
        id: 5,
        price: "$2,226.00",
        description: "4-Bds - 4 Ba - 600ff3",
        title: "4 Beds Duplex House",
        location: "USA",
        date: "16 Nov 2024",
        image: "../../assets/images/classifieds/featured-adds/1.jpg",

    },
    {
        id: 6,
        price: "$5,321.00",
        description: "2024 - 120,000km",
        title: "Cadbo Car kb43",
        location: "Banglore",
        date: "16 Nov 2024",
        image: "../../assets/images/classifieds/featured-adds/2.jpg",

    },
    {
        id: 7,
        price: "$56,764.00",
        description: "2022 Oct 04",
        title: "Laptop F6",
        location: "Chennai",
        date: "16 Nov 2024",
        image: "../../assets/images/classifieds/featured-adds/6.jpg",

    },
    {
        id: 8,
        price: "$5,763.00",
        description: "2024 - 120,000km",
        title: "Gittbos Bike Mf120",
        location: "Pune",
        date: "16 Nov 2024",
        image: "../../assets/images/classifieds/featured-adds/4.jpg",

    },
    {
        id: 9,
        price: "$5,763.00",
        description: "2024 - 4 Months",
        title: "Fed Dog",
        location: "Pune",
        date: "16 Nov 2024",
        badge: "Featured",
        bg: "warning",
        image: "../../assets/images/classifieds/featured-adds/5.jpg",

    },
    {
        id: 10,
        price: "$2,226.00",
        description: "4-Bds - 4 Ba - 600ff3",
        title: "4 Beds Duplex House",
        location: "USA",
        date: "16 Nov 2024",
        badge: "Featured",
        bg: "warning",
        image: "../../assets/images/classifieds/featured-adds/1.jpg",

    },
    {
        id: 11,
        price: "$5,321.00",
        description: "2024 - 120,000km",
        title: "Cadbo Car kb43",
        location: "Banglore",
        date: "16 Nov 2024",
        badge: "Sold Out",
        bg: "danger",
        image: "../../assets/images/classifieds/featured-adds/2.jpg",

    },
    {
        id: 12,
        price: "$56,764.00",
        description: "2022 Oct 04",
        title: "Smart Phone H6",
        location: "Chennai",
        date: "16 Nov 2024",
        badge: "New",
        bg: "primary",
        image: "../../assets/images/classifieds/featured-adds/3.jpg",

    },
];


export const SwiperComponent = RelatedAds.map((candidate, index) => (
  
    <SpkFeatureCard  key={index} card={candidate} />

))

export const similarAds = [
    {
      imgSrc: "../../assets/images/classifieds/similar-products/1.jpg",
      title: "4 Beds Duplex House",
      location: "USA",
      date: "16 Nov 2024",
      price: "$2,226.00",
    },
    {
      imgSrc: "../../assets/images/classifieds/similar-products/2.jpg",
      title: "Fed Dog",
      location: "USA",
      date: "16 Nov 2024",
      price: "$25,000",
    },
    {
      imgSrc: "../../assets/images/classifieds/similar-products/3.jpg",
      title: "Gittbos Bike Mf120",
      location: "Pune",
      date: "16 Nov 2024",
      price: "$5,763.00",
    },
    {
      imgSrc: "../../assets/images/classifieds/similar-products/4.jpg",
      title: "Cadbo Car kb43",
      location: "Banglore",
      date: "16 Nov 2024",
      price: "$5,321.00",
    },
  ];

  export const items=[
    {
      price: '$2,226.00',
      title: "4-Bds - 4 Ba - 600ff3",
      description: "4 Beds Duplex House",
      location: "USA",
      date: "16 Nov 2024",
      image: "../../assets/images/classifieds/featured-adds/1.jpg",
      badge: "Featured",
      bg: "warning",
      boxClass:'',
      opacity:"opacity-3"
    },
    {
      price: '$5,321.00',
      title: "2024 - 120,000km",
      description: "Cadbo Car kb43",
      location: "Banglore",
      date: "16 Nov 2024",
      image: "../../assets/images/classifieds/featured-adds/2.jpg",
      badge: "Sold Out",
      bg: "danger",
      boxClass:'sold-out',
      opacity:"opacity-3"
  
    },
    {
      price: '$56,764.00',
      title: "2022 Oct 04",
      description: "Smart Phone H6",
      location: "Chennai",
      date: "16 Nov 2024",
      image: "../../assets/images/classifieds/featured-adds/3.jpg",
      badge: "New",
      bg: "primary",
      boxClass:'',
      opacity:"opacity-3"
    },
    {
      price: '$5,763.00',
      title: "2024 - 120,000km",
      description: "Gittbos Bike Mf120",
      location: "Pune",
      date: "16 Nov 2024",
      image: "../../assets/images/classifieds/featured-adds/4.jpg",
      badge: "Urgent",
      bg: "danger",
      boxClass:'',
      opacity:"opacity-3"
    },
    {
      price: '$2,226.00',
      title: "4-Bds - 4 Ba - 600ff3",
      description: "4 Beds Duplex House",
      location: "USA",
      date: "16 Nov 2024",
      image: "../../assets/images/classifieds/featured-adds/1.jpg",
      boxClass:'',
      opacity:"opacity-3"
    },
    {
      price: '$5,321.00',
      title: "2024 - 120,000km",
      description: "Cadbo Car kb43",
      location: "Banglore",
      date: "16 Nov 2024",
      image: "../../assets/images/classifieds/featured-adds/2.jpg",
      opacity:"opacity-3"
    },
    {
      price: '$56,764.00',
      title: "Laptop F6",
      description: "2022 Oct 04",
      location: "Chennai",
      date: "16 Nov 2024",
      image: "../../assets/images/classifieds/featured-adds/6.jpg",
      boxClass:'',
      opacity:"opacity-3",
     
    },
    {
      price: '$5,763.00',
      title: "2024 - 120,000km",
      description: "Gittbos Bike Mf120",
      location: "Pune",
      date: "16 Nov 2024",
      image: "../../assets/images/classifieds/featured-adds/4.jpg",
      boxClass:'',
      opacity:"opacity-3"
    },
    {
      price: '$5,763.00',
      title: "2024 - 4 Months",
      description: "Adorable Puppy",
      location: "Pune",
      date: "16 Nov 2024",
      image: "../../assets/images/classifieds/featured-adds/5.jpg",
      boxClass:'',
      opacity:"opacity-3",
      badge: "Featured",
      bg: "warning",
    },
    {
      price: '$2,226.00',
      title: "4-Bds - 4 Ba - 600ff3",
      description: "4 Beds Duplex House",
      location: "USA",
      date: "16 Nov 2024",
      image: "../../assets/images/classifieds/featured-adds/1.jpg",
      badge: "Featured",
      bg: "warning",
      boxClass:'',
      opacity:"opacity-3"
    },
    {
      price: '$5,321.00',
      title: "2024 - 120,000km",
      description: "Cadbo Car kb43",
      location: "Banglore",
      date: "16 Nov 2024",
      image: "../../assets/images/classifieds/featured-adds/2.jpg",
      badge: "Sold Out",
      bg: "danger",
      boxClass:'sold-out',
      opacity:"opacity-3"
  
    },
    {
      price: '$56,764.00',
      title: "2022 Oct 04",
      description: "Smart Phone H6",
      location: "Chennai",
      date: "16 Nov 2024",
      image: "../../assets/images/classifieds/featured-adds/3.jpg",
      badge: "New",
      bg: "primary",
      boxClass:'',
      opacity:"opacity-3"
    },
  ]
  