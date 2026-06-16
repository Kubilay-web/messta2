import Image from "next/image";
import Link from "next/link";

export const Basicdata = [
    <div className="image-container"><Link href="/pages/blog/blog-details" className="swiper-slide relative">
        <Image fill priority src="../../../assets/images/media/blog/2.jpg" className="block w-100" alt="..." />
    </Link></div>,
    <div className="image-container">
        <Link href="/pages/blog/blog-details" className="swiper-slide relative">
            <Image fill priority src="../../../assets/images/media/blog/3.jpg" className="block w-100" alt="..." />
        </Link></div>,
    <div className="image-container"><Link href="/pages/blog/blog-details"  className="relative swiper-slide">
        <Image fill priority src="../../../assets/images/media/blog/1.jpg" className="block w-100" alt="..." />
    </Link></div>,
];
export const blogPosts = [
    {
        id: 1,
        title: "Stereoscopic 3D: How It Works",
        description: "Ever wondered how those jaw-dropping 3D movies create an illusion of depth that makes you feel like you're part of the action?",
        author: "Justin Kim",
        date: "20, Aug 2024 - 16:32",
        imageSrc: "../../../assets/images/media/blog/4.jpg",
        avatarSrc: "../../../assets/images/faces/10.jpg",
        readMoreLink: "#!"
    },
    {
        id: 2,
        title: "Anaglyph 3D: Old School, Still Cool",
        description: "Remember those red and blue glasses from the past? relies on this classic technique.",
        author: "Monika Karen",
        date: "25, Aug 2024 - 11:45",
        imageSrc: "../../../assets/images/media/blog/5.jpg",
        avatarSrc: "../../../assets/images/faces/5.jpg",
        readMoreLink: "#!"
    },
    {
        id: 3,
        title: "The Future of 3D Imaging",
        description: "As technology continues to advance, so does the world of 3D imaging. From holographic displays to glasses-free 3D experiences.",
        author: "Samantha Nans",
        date: "25, Aug 2024 - 04:25",
        imageSrc: "../../../assets/images/media/blog/6.jpg",
        avatarSrc: "../../../assets/images/faces/8.jpg",
        readMoreLink: "#!"
    }
];

export const Categories = [
    { name: 'Lifestyle', count: "24" },
    { name: 'Travel & Adventure', count: "43" },
    { name: 'Health & Wellness', count: "14" },
    { name: 'Technology', count: "132" },
    { name: 'Fashion & Beauty', count: "36" },
    { name: 'Finance', count: "4" },
];

export const tags = [
    '#Travel', '#Fitness', '#Fashion', '#FoodBlog', '#Crafting', '#BookReview',
    '#TechTalk', '#Parenting', '#Finance', '#SelfCare', '#Photography'
];

export const BlogPosts = [
    {
        id: 1,
        imageSrc: "../../../assets/images/media/blog/10.jpg",
        title: "Transforming Digital into Tangible.",
        description: "While we've been exploring the virtual aspects of 3D, let's not forget about the tangible wonders of 3D printing.",
        author: "Charlotte",
        authorImg: "../../../assets/images/faces/4.jpg",
        date: "18, Aug 2024 - 11:25",
        blogDetailsLink: "/pages/blog/blog-details/",
    },
    {
        id: 2,
        imageSrc: "../../../assets/images/media/blog/11.jpg",
        title: "Immersive 3D Worlds at Your Fingertips.",
        description: "Step into the world of Virtual Reality, where 3D images are not just seen but experienced. VR headsets transport",
        author: "Benjamin",
        authorImg: "../../../assets/images/faces/12.jpg",
        date: "18, Aug 2024 - 11:25",
        blogDetailsLink: "/pages/blog/blog-details/",
    },
    {
        id: 3,
        imageSrc: "../../../assets/images/media/blog/12.jpg",
        title: "Medical Imaging: Saving Lives with 3D Visualization",
        description: "Beyond entertainment, 3D imaging plays a crucial role in the field of medicine. Medical professionals leverage",
        author: "Isabella",
        authorImg: "../../../assets/images/faces/2.jpg",
        date: "18, Aug 2024 - 11:25",
        blogDetailsLink: "/pages/blog/blog-details/",
    },
    {
        id: 4,
        imageSrc: "../../../assets/images/media/blog/13.jpg",
        title: "Bridging the Gap Between Real and Virtual",
        description: "In the realm of augmented reality, 3D images blend seamlessly with the real world. AR overlays digital information",
        author: "William",
        authorImg: "../../../assets/images/faces/14.jpg",
        date: "18, Aug 2024 - 11:25",
        blogDetailsLink: "/pages/blog/blog-details/",
    },
];

export const BlogData = [
    {
        id: 1,
        imageSrc: "../../../assets/images/media/blog/8.jpg",
        title: "DIY 3D Modeling: Unleashing Your Creativity",
        description: "Exploring the world of 3D images doesn't have to be limited to consumption – you can also become a creator! With accessible 3D modeling software, anyone can try their hand at designing 3D models. Whether you're crafting virtual worlds.",
        author: "Abigail",
        authorImg: "../../../assets/images/faces/6.jpg",
        date: "16, Sep 2024 - 11:25",
        blogDetailsLink: "/pages/blog/blog-details/",
    },
    {
        id: 2,
        imageSrc: "../../../assets/images/media/blog/9.jpg",
        title: "3D Modeling Techniques: Crafting Digital Realities",
        description: "3D modeling is the art of creating digital representations of objects or scenes. Artists and designers use various techniques procedural generation, to shape 3D models.",
        author: "Anthony",
        authorImg: "../../../assets/images/faces/16.jpg",
        date: "25, Sep 2024 - 11:25",
        blogDetailsLink: "/pages/blog/blog-details/",
    },
];

export const RecentPosts = [
    {
        id: 1,
        avatar: "../../../assets/images/media/blog/14.jpg",
        name: "Christopher Jack",
        content: "There are many variations of passages of Lorem Ipsum available",
        date: "24,Jul 2024 - 18:27",
    },
    {
        id: 2,
        avatar: "../../../assets/images/media/blog/15.jpg",
        name: "Sophia Sam",
        content: "Latin words, combined with a handful of model sentence",
        date: "28,Jul 2024 - 10:45",
    },
    {
        id: 3,
        avatar: "../../../assets/images/media/blog/16.jpg",
        name: "Anthony Karon",
        content: "Ipsum omnis non fugit ad voluptate consequuntur, sed veritatis nesciunt...",
        date: "28,Sep 2024 - 08:32",
    },
    {
        id: 4,
        avatar: "../../../assets/images/media/blog/17.jpg",
        name: "Amelia Jackson",
        content: "Contrary to popular belief, Lorem Ipsum is not simply random",
        date: "30,Jul 2024 - 08:32",
    },
    {
        id: 5,
        avatar: "../../../assets/images/media/blog/18.jpg",
        name: "Matthew Stuart",
        content: "It was popularised in the 1960s with the release of Letraset sheets containing",
        date: "3,Aug 2024 - 11:56",
    },
];