import Image from "next/image";

// Featured NFT's :
export const nftData = [
    {
        id:1,
        imgSrc: "../../../assets/images/nft-images/16.jpg",
        name: "Neo-Nebulae",
        heartCount: 13.2,
        totalLikes: "13,256",
        currentPrice: 1.099,
        originalPrice: 1.759,
        cryptoImg: "../../../assets/images/crypto-currencies/regular/Ethereum.svg",
    },
    {
        id:2,
        imgSrc: "../../../assets/images/nft-images/17.jpg",
        name: "Chromatic Chaos",
        heartCount: 5.2,
        totalLikes: "5,289",
        currentPrice: 7.99,
        originalPrice: 12.99,
        cryptoImg: "../../../assets/images/crypto-currencies/regular/Ethereum.svg",
    },
    {
        id:3,
        imgSrc: "../../../assets/images/nft-images/18.jpg",
        name: "Surreal Synthesis",
        heartCount: 2.4,
        totalLikes: "2,476",
        currentPrice: 1.499,
        originalPrice: 2.599,
        cryptoImg: "../../../assets/images/crypto-currencies/regular/Ethereum.svg",
    },
    {
        id:4,
        imgSrc: "../../../assets/images/nft-images/10.jpg",
        name: "Virtual Visions",
        heartCount: 1.8,
        totalLikes: "1,893",
        currentPrice: 2.299,
        originalPrice: 3.299,
        cryptoImg: "../../../assets/images/crypto-currencies/regular/Ethereum.svg",
    },
    {
        id:5,
        imgSrc: "../../../assets/images/nft-images/11.jpg",
        name: "Pixel Prism",
        heartCount: 12.9,
        totalLikes: "12,923",
        currentPrice: 8.99,
        originalPrice: 12.99,
        cryptoImg: "../../../assets/images/crypto-currencies/regular/Ethereum.svg",
    },
    {
        id:6,
        imgSrc: "../../../assets/images/nft-images/12.jpg",
        name: "Electric Euphoria",
        heartCount: 4.5,
        totalLikes: "453",
        currentPrice: 1.799,
        originalPrice: 2.499,
        cryptoImg: "../../../assets/images/crypto-currencies/regular/Ethereum.svg",
    },
];

export const Data1 = [
        { value: 'Choose Royalities', label: 'Choose Royalities' },
        { value: 'Flat Royalty', label: 'Flat Royalty' },
        { value: 'Graduated Royalty', label: 'Graduated Royalty' },
        { value: 'Tiered Royalty', label: 'Tiered Royalty' },
        { value: 'Time-Limited Royalty', label: 'Time-Limited Royalty' },
        { value: 'Customized Royalty', label: 'Customized Royalty' },
    ];

    export   const Swiperdata = [
        <div className="image-container relative">
            <Image fill priority className="img-fluid !rounded-md" src="../../../assets/images/nft-images/2.jpg" alt="img" />
        </div>,
        <div className="image-container relative">
            <Image fill priority className="img-fluid !rounded-md" src="../../../assets/images/nft-images/3.jpg" alt="img" />
        </div>,
        <div className="image-container relative">
            <Image fill priority className="img-fluid !rounded-md" src="../../../assets/images/nft-images/4.jpg" alt="img" />
        </div>,
        <div className="image-container relative">
            <Image fill priority className="img-fluid !rounded-md" src="../../../assets/images/nft-images/5.jpg" alt="img" />
        </div>
    ];