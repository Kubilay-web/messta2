
import Image from "next/image";
import Link from "next/link";


export  const breakpoints = {
        // when window width is >= 320px
        320: {
            slidesPerView: 1,
            spaceBetween: 5,
        },
        // when window width is >= 640px
        640: {
            slidesPerView: 1,
            spaceBetween: 5,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 5,
        },
        1440: {
            slidesPerView:3,
            spaceBetween: 20,
        },
    };
    export  const breakpoints1 = {
        // when window width is >= 320px
        320: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        // when window width is >= 480px
        480: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        // when window width is >= 640px
        640: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        1440: {
            slidesPerView:1,
            spaceBetween: 20,
        },
    };
    export  const breakpoints2 = {
        // when window width is >= 320px
        320: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        // when window width is >= 480px
        480: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        // when window width is >= 640px
        640: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        1440: {
            slidesPerView:3,
            spaceBetween: 30,
        },
    };

export const ReviewsStyle1 = [
    {
        id: 1,
        quote: "The fact that we were able to choose them as experts for our valuable product launch and support inspires us with pleasure they lead us at every step of the way.",
        name: "Lily Brown",
        role: "Designer",
        image: "../../assets/images/faces/6.jpg",
    },
    {
        id: 2,
        quote: "Efficiently innovate customized growth strategies whereas error free paradigms. Monotonectally enhance stand-alone data with prospective innovation.",
        name: "Riley Anderson",
        role: "Client",
        image: "../../assets/images/faces/1.jpg",
    },

    {
        id: 3,
        quote: "Efficiently innovate customized growth strategies whereas error free paradigms. Monotonectally enhance stand-alone data with prospective innovation.",
        name: "Zachary Carter",
        role: "Client",
        image: "../../assets/images/faces/3.jpg",
    },
    {
        id: 4,
        quote: "The fact that we were able to choose them as experts for our valuable product launch and support inspires us with pleasure they lead us at every step of the way.",
        name: "Ava Taylor",
        role: "Client",
        image: "../../assets/images/faces/10.jpg",
    },
    {
        id: 5,
        quote: "Efficiently innovate customized growth strategies whereas error free paradigms. Monotonectally enhance stand-alone data with prospective innovation.",
        name: "Amelia Turner",
        role: "Designer",
        image: "../../assets/images/faces/5.jpg",
    },
    {
        id: 6,
        quote: "The fact that we were able to choose them as experts for our valuable product launch and support inspires us with pleasure they lead us at every step of the way.",
        name: "Leo Phillips",
        role: "Client",
        image: "../../assets/images/faces/6.jpg",
    }
];

export const ReviewsStyle1Swiper = ReviewsStyle1.map((idx) => (
    <div className="box mb-0 border-0 shadow-none overflow-hidden" key={idx.id}>
        <div className="box-body !p-6">
            <p>{idx.quote} </p>
            <div className="flex justify-between flex-wrap gap-4">
                <div className="flex">
                    <Image fill src={idx.image} alt="img" className="avatar avatar-md avatar-rounded" />
                    <div className="ms-2 my-auto mb-0">
                        <h6 className="mb-0 leading-none">{idx.name}</h6>
                        <p className="text-[0.875rem] mb-0">{idx.role}</p>
                    </div>
                </div>
                <div className="mb-0 text-warning text-[0.75rem] my-auto">
                    <i className="ri-star-fill me-1"></i>
                    <i className="ri-star-fill me-1"></i>
                    <i className="ri-star-fill me-1"></i>
                    <i className="ri-star-fill me-1"></i>
                    <i className="ri-star-half-line"></i>
                </div>
            </div>
        </div>
    </div>
))

export const ReviewsStyle2Swiper = ReviewsStyle1.map((idx) => (
    <div className="box mb-0 bg-gradient-to-tr from-primary to-secondary text-white relative" key={idx.id}>
        <i className="bx bxs-quote-alt-left review-quote review-quote1"></i>
        <i className="bx bxs-quote-alt-right review-quote review-quote2"></i>
        <div className="box-body !p-[3rem] text-white">
            <div className="sm:flex items-start gap-4 review_item">
                <Image fill src={idx.image} alt="img" className="text-center avatar avatar-xl shrink-0 !rounded-full border-[5px] border-white/10 mb-2 sm:mb-0" />
                <div className="me-4">
                    <h5 className="mb-0 text-white">{idx.name}</h5>
                    <div className="mb-2 text-warning text-[0.9375rem]">
                        <i className="ri-star-fill me-1"></i>
                        <i className="ri-star-fill me-1"></i>
                        <i className="ri-star-fill me-1"></i>
                        <i className="ri-star-fill me-1"></i>
                        <i className="ri-star-half-line"></i>
                    </div>
                    <p className="mb-0 opacity-90 text-[1rem] text-white">"{idx.quote}" </p>
                </div>
            </div>
        </div>
    </div>
));

export const ReviewsStyle3 = [
    {
        id: 1,
        image: "../../assets/images/faces/1.jpg",
        name: "Allie Grater",
        position: "Client",
        text: "This product has made a difference in my daily routine. Simple, effective, and worth every penny.",
    },
    {
        id: 2,
        image: "../../assets/images/faces/6.jpg",
        name: "Emma Grate",
        position: "Designer",
        text: "I love the modern design, and it delivers top-notch performance. A great addition to my setup!",
    },
    {
        id: 3,
        image: "../../assets/images/faces/3.jpg",
        name: "John Quil",
        position: "Client",
        text: "Initially skeptical, but this product exceeded my expectations. – highly recommended.",
    },
    {
        id: 4,
        image: "../../assets/images/faces/10.jpg",
        name: "Stanley Kade",
        position: "Client",
        text: "Does exactly what it promises. Easy to use, durable, and fantastic. I'm a happy customer!",
    },
    {
        id: 5,
        image: "../../assets/images/faces/5.jpg",
        name: "Laura Norda",
        position: "Designer",
        text: "Affordable and high-quality. This product outshines competitors. Thrilled with the value I got!",
    },
    {
        id: 6,
        image: "../../assets/images/faces/6.jpg",
        name: "Dhaval Patel",
        position: "Client",
        text: "Exceptional product. Quick responses and a genuine commitment to customer satisfaction.",
    }
];

export const ReviewsStyle3Swiper = ReviewsStyle3.map((idx) => (
    <div className="box !shadow-none mb-0 !border-0 !bg-primary" key={idx.id}>
        <div className="box-body text-center p-4">
            <Image fill src={idx.image} alt="img" className="mx-auto text-center avatar avatar-xl !rounded-full mb-4" />
            <div className="mb-2 text-warning text-[0.9375rem]">
                <i className="ri-star-fill me-1"></i>
                <i className="ri-star-fill me-1"></i>
                <i className="ri-star-fill me-1"></i>
                <i className="ri-star-fill me-1"></i>
                <i className="ri-star-half-line"></i>
            </div>
            <p className="text-white opacity-80 text-[0.875rem]">{idx.text} </p>
            <div className="flex items-center justify-start">
                <div className="flex-grow">
                    <h6 className="mb-1 text-white">{idx.name}</h6>
                    <span className="text-[0.875rem] font-normal text-white op-7">{idx.position}</span>
                </div>
                <i className="bx bxs-quote-alt-left review-quote gradient"></i>
            </div>
        </div>
    </div>
))

export const ReviewsStyle4 = [
    {
        id: 1,
        quote: "This product simplifies a daily task and has become indispensable for me. I can't imagine going back to the old way.",
        name: "Abigail Scott",
        position: "UX Guru",
        image: "../../assets/images/faces/1.jpg",
    },
    {
        id: 2,
        quote: "The sleek design caught my eye, and the functionality sealed the deal. It's not just eye candy; it performs exceptionally well.",
        name: "Leo Phillips",
        position: "Visual Wizard",
        image: "../../assets/images/faces/13.jpg",
    },
    {
        id: 3,
        quote: "I'm not tech-savvy, but this product is so easy to use. It's like it read my mind. If you want simplicity without sacrificing quality, this is it!",
        name: "Amelia Turner",
        position: "Innovation Ninja",
        image: "../../assets/images/faces/3.jpg",
    },
    {
        id: 4,
        quote: "Small in size, big on impact. This compact product packs a punch. Perfect for those tight on space but not willing to compromise on performance.",
        name: "Zachary Carter",
        position: "Design Maven",
        image: "../../assets/images/faces/9.jpg",
    },
    {
        id: 5,
        quote: "Exceptional product, excellent customer service. Quick responses and a genuine commitment to customer satisfaction.",
        name: "Aria Robinson",
        position: "UI Trailblazer",
        image: "../../assets/images/faces/5.jpg",
    },
    {
        id: 6,
        quote: "Initially skeptical, but this product exceeded my expectations. Innovative and practical – highly recommended.",
        name: "Wyatt Thompson",
        position: "Aesthetics Pro",
        image: "../../assets/images/faces/15.jpg",
    }
];


export const ReviewsStyle4Swiper = ReviewsStyle4.map((idx) => (
    <div className="box text-white" key={idx.id}>
        <div className="box-body !p-6">
            <span className="opacity-80"><sup><i className="ri-double-quotes-l fs-5 me-1 text-primary"></i></sup>{idx.quote}-- <Link scroll={false} href="#!" className="font-semibold text-[0.6875rem]" data-bs-toggle="tooltip" data-bs-custom-classname="tooltip-primary" data-bs-placement="top" data-bs-title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum autem quaerat distinctio">Read More</Link></span>
        </div>
        <div className="box-footer">
            <div className="flex items-center gap-4">
                <div className="leading-none">
                    <span className="avatar !rounded-full">
                        <Image fill src={idx.image} alt="" className="img-fluid !rounded-full" />
                    </span>
                </div>
                <div className="flex-grow">
                    <p className="mb-0 font-semibold text-[0.875rem]">{idx.name}</p>
                    <p className="mb-0 text-[0.6875rem] font-normal opacity-80">{idx.position}</p>
                </div>
                <div className="text-end">
                    <span className="opacity-80 block">Rating : </span>
                    <span className="text-warning block ms-1">
                        <i className="ri-star-fill me-1"></i>
                        <i className="ri-star-fill me-1"></i>
                        <i className="ri-star-fill me-1"></i>
                        <i className="ri-star-fill me-1"></i>
                        <i className="ri-star-half-line"></i>
                    </span>
                </div>
            </div>
        </div>
    </div>
))

export const ReviewsStyle5 = [
    {
        id: 1,
        name: 'Brenda Hans',
        email: 'brendahans@gmail.com',
        image: '../../assets/images/faces/3.jpg',
        daysAgo: '12 days ago',
    },
    {
        id: 2,
        name: 'Jack Miller',
        email: 'jackmiller@gmail.com',
        image: '../../assets/images/faces/9.jpg',
        daysAgo: '9 days ago',
    },
    {
        id: 3,
        name: 'Amanda Nanes',
        email: 'amandananes212@gmail.com',
        image: '../../assets/images/faces/8.jpg',
        daysAgo: '6 days ago',
    },
    {
        id: 4,
        name: 'Lucas Tope',
        email: 'lucastope1999@gmail.com',
        image: '../../assets/images/faces/10.jpg',
        daysAgo: '10 days ago',
    },
    {
        id: 5,
        name: 'Jenny Kingston',
        email: 'jennykingston345@gmail.com',
        image: '../../assets/images/faces/1.jpg',
        daysAgo: '16 days ago',
    },
    {
        id: 6,
        name: 'Alex Carey',
        email: 'alexcarey21@gmail.com',
        image: '../../assets/images/faces/5.jpg',
        daysAgo: '1 month ago',
    },
];

export const ReviewsStyle5Swiper = ReviewsStyle5.map((idx) => (
    <div className="box text-white border-0" key={idx.id}>
        <div className="box-body">
            <div className="flex items-center mb-3">
                <span className="avatar !rounded-full me-2">
                    <Image fill src={idx.image} alt="" className="img-fluid !rounded-full" />
                </span>
                <div>
                    <p className="mb-0 font-semibold text-[0.875rem] text-white">{idx.name}</p>
                    <p className="mb-0 text-[0.6875rem] font-normal opacity-80 text-white">{idx.email}</p>
                </div>
            </div>
            <div className="mb-3">
                <span className="opacity-80 text-white">- Lorem ipsum dolor sit amet consectetur adipisicing elit.  -- <Link scroll={false} href="#!" className="font-semibold text-[0.6875rem] text-white" data-bs-toggle="tooltip" data-bs-custom-classname="tooltip-dark" data-bs-placement="top" data-bs-title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum autem quaerat distinctio">Read More</Link></span>
            </div>
            <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center">
                    <span className="opacity-80 text-white">Rating : </span>
                    <span className="text-warning block ms-1">
                        <i className="ri-star-fill me-1"></i>
                        <i className="ri-star-fill me-1"></i>
                        <i className="ri-star-fill me-1"></i>
                        <i className="ri-star-fill me-1"></i>
                        <i className="ri-star-half-line"></i>
                    </span>
                </div>
                <div className="float-end text-[0.75rem] font-semibold opacity-80 text-end !text-white">
                    <span>{idx.daysAgo}</span>
                    <span className="block text-[0.75rem] text-success"><i>{idx.name}</i></span>
                </div>
            </div>
        </div>
    </div>
))