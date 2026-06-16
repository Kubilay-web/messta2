import SpklandingTestimonials from "@/shared/@spk-reusable-components/apps/spk-landingTestimonials";

export const MarketTestimonialsData = [
    {
        name: "Jack Miller",
        role: "CEO OF NORJA",
        src: "../../assets/images/faces/21.jpg",
        text: "- Est amet sit vero sanctus labore no sed ipsum ipsum nonumy. Sit ipsum sanctus ea magna est. Aliquyam sed amet. Kasd diam rebum sit ipsum ipsum erat et kasd.Est amet sit vero sanctus labor"
    },
    {
        name: "Melissa Blue",
        role: "MANAGER CHO",
        src: "../../assets/images/faces/21.jpg",
        text: "- Est amet sit vero sanctus labore no sed ipsum ipsum nonumy. Sit ipsum sanctus ea magna est. Aliquyam sed amet. Kasd diam rebum sit ipsum ipsum erat et kasd.Est amet sit vero sanctus labor"
    },
    {
        name: "Kiara Advain",
        role: "CEO OF EMPIRO",
        src: "../../assets/images/faces/21.jpg",
        text: "- Est amet sit vero sanctus labore no sed ipsum ipsum nonumy. Sit ipsum sanctus ea magna est. Aliquyam sed amet. Kasd diam rebum sit ipsum ipsum erat et kasd.Est amet sit vero sanctus labor"
    },
    {
        name: "Jhonson Smith",
        role: "CHIEF SECRETARY MBIO",
        src: "../../assets/images/faces/21.jpg",
        text: "- Est amet sit vero sanctus labore no sed ipsum ipsum nonumy. Sit ipsum sanctus ea magna est. Aliquyam sed amet. Kasd diam rebum sit ipsum ipsum erat et kasd.Est amet sit vero sanctus labor"
    },
    {
        name: "Dwayne Stort",
        role: "CEO ARMEDILLO",
        src: "../../assets/images/faces/21.jpg",
        text: "- Est amet sit vero sanctus labore no sed ipsum ipsum nonumy. Sit ipsum sanctus ea magna est. Aliquyam sed amet. Kasd diam rebum sit ipsum ipsum erat et kasd.Est amet sit vero sanctus labor"
    },
    {
        name: "Jasmine Kova",
        role: "AGGENT AMIO",
        src: "../../assets/images/faces/21.jpg",
        text: "- Est amet sit vero sanctus labore no sed ipsum ipsum nonumy. Sit ipsum sanctus ea magna est. Aliquyam sed amet. Kasd diam rebum sit ipsum ipsum erat et kasd.Est amet sit vero sanctus labor"
    },
    {
        name: "Dolph MR",
        role: "CEO MR BRAND",
        src: "../../assets/images/faces/21.jpg",
        text: "- Est amet sit vero sanctus labore no sed ipsum ipsum nonumy. Sit ipsum sanctus ea magna est. Aliquyam sed amet. Kasd diam rebum sit ipsum ipsum erat et kasd.Est amet sit vero sanctus labor"
    },
    {
        name: "Brenda Simpson",
        role: "CEO AIBMO",
        src: "../../assets/images/faces/21.jpg",
        text: "- Est amet sit vero sanctus labore no sed ipsum ipsum nonumy. Sit ipsum sanctus ea magna est. Aliquyam sed amet. Kasd diam rebum sit ipsum ipsum erat et kasd.Est amet sit vero sanctus labor"
    },
    {
        name: "Melissa Blue",
        role: "MANAGER CHO",
        src: "../../assets/images/faces/21.jpg",
        text: "- Est amet sit vero sanctus labore no sed ipsum ipsum nonumy. Sit ipsum sanctus ea magna est. Aliquyam sed amet. Kasd diam rebum sit ipsum ipsum erat et kasd.Est amet sit vero sanctus labor"
    }
];

export const MarketSwiperComponent = MarketTestimonialsData.map((candidate, index) => (
    <SpklandingTestimonials key={index} object={candidate} />
))
export default MarketSwiperComponent;

export const MarcketProductsData = [
    {
        id: 1,
        src: "../../assets/images/marketplace/new-arrivals/1.png",
        title: "HTML Template",
        subTitle: "Aliquyam",
        price: "$120",
        ratings: "4",
        ratingCount: "4",
    },
    {
        id: 2,
        src: "../../assets/images/marketplace/new-arrivals/2.png",
        title: "UX/UI Templates",
        subTitle: "Takimata",
        price: "$59",
        ratings: "4",
        ratingCount: "161",
    },
    {
        id: 3,
        src: "../../assets/images/marketplace/new-arrivals/3.png",
        title: "React Template",
        subTitle: "Accusam",
        price: "$99",
        ratings: "4",
        ratingCount: "45",
    },
    {
        id: 4,
        src: "../../assets/images/marketplace/new-arrivals/4.png",
        title: "Vuejs Template",
        subTitle: "Erat",
        price: "$35",
        ratings: "4",
        ratingCount: "57",
    },
    {
        id: 5,
        src: "../../assets/images/marketplace/new-arrivals/1.png",
        title: "Angular Template",
        subTitle: "Dolore",
        price: "$459",
        ratings: "4",
        ratingCount: "773",
    },
    {
        id: 6,
        src: "../../assets/images/marketplace/new-arrivals/2.png",
        title: "Laravel Template",
        subTitle: "Nonumy",
        price: "$29",
        ratings: "4",
        ratingCount: "37",
    }
];
export const cards = [
    {
        id: 1,
        cardcolor: "primary ",
        title: "Vuejs Script",
        svg: (
            <svg xmlns="http://www.w3.org/2000/svg" className="fill-primary" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" id="vuejs-alt">
                <path fill="var(--primary03)" opacity="0.3" d="M12.018 19.151 4.315 6h2.823l4.886 8.407L16.871 6h2.809z"></path>
                <path fill="var(--primary-color)" d="m14.38 4.001-2.374 3.956-2.384-3.956H.825L12.02 23.115 23.161 4H14.38zm-2.362 15.15L4.315 6h2.823l4.886 8.407L16.871 6h2.809l-7.662 13.151z">
                </path>
            </svg>
        ),
    },
    {
        id: 2,
        cardcolor: "secondary ",
        title: "HTML",
        svg: (
            <svg xmlns="http://www.w3.org/2000/svg" className="fill-secondary" data-name="Layer 1" viewBox="0 0 24 24" id="html5">
                <path fill="rgb(var(--secondary-rgb))" d="M3.18249,2,4.78741,20.00071,11.98921,22l7.22171-2.00206L20.81751,2ZM17.32508,7.88728H8.87682L9.07861,10.148h8.04556l-.6059,6.778L12,18.17825v.0004l-.01015.00276L7.46747,16.92607l-.30926-3.46645h2.2162l.15718,1.76075,2.45873.66389.002-.00053v-.00015l2.46231-.6646.25632-2.86324H7.05953L6.46408,5.67957H17.52272Z">
                </path>
                <path fill="rgba(var(--pink-rgb), 0.2)" opacity="0.2" d="M17.32508,7.88728H8.87682L9.07861,10.148h8.04556l-.6059,6.778L12,18.17825v.0004l-.01015.00276L7.46747,16.92607l-.30926-3.46645h2.2162l.15718,1.76075,2.45873.66389.002-.00053v-.00015l2.46231-.6646.25632-2.86324H7.05953L6.46408,5.67957H17.52272Z">
                </path>
            </svg>
        ),
    },
    {
        id: 3,
        cardcolor: "success ",
        title: "React",
        svg: (
            <svg xmlns="http://www.w3.org/2000/svg" className="fill-success" viewBox="0 0 24 24" id="react">
                <path fill="rgb(var(--success-rgb))" d="M19.108 12.376q-.176-.201-.371-.403.136-.144.264-.287c1.605-1.804 2.283-3.614 1.655-4.701-.602-1.043-2.393-1.354-4.636-.918q-.331.065-.659.146-.063-.216-.133-.43C14.467 3.49 13.238 1.999 11.982 2c-1.204 0-2.368 1.397-3.111 3.558q-.11.32-.203.644-.219-.054-.44-.1c-2.366-.485-4.271-.165-4.898.924-.601 1.043.027 2.75 1.528 4.472q.224.255.46.5c-.186.19-.361.381-.525.571-1.465 1.698-2.057 3.376-1.457 4.415.62 1.074 2.498 1.425 4.785.975q.278-.055.553-.124.1.351.221.697C9.635 20.649 10.792 22 11.992 22c1.24 0 2.482-1.453 3.235-3.659.06-.174.115-.355.169-.541q.355.088.715.156c2.203.417 3.952.09 4.551-.95.619-1.075-.02-2.877-1.554-4.63ZM4.07 7.452c.386-.67 1.943-.932 3.986-.512q.196.04.399.09a20.464 20.464 0 0 0-.422 2.678A20.887 20.887 0 0 0 5.93 11.4q-.219-.227-.427-.465C4.216 9.461 3.708 8.081 4.07 7.452Zm3.887 5.728c-.51-.387-.985-.783-1.416-1.181.43-.396.905-.79 1.415-1.176q-.028.589-.027 1.179 0 .59.028 1.178Zm0 3.94a7.237 7.237 0 0 1-2.64.094 1.766 1.766 0 0 1-1.241-.657c-.365-.63.111-1.978 1.364-3.43q.236-.273.488-.532a20.49 20.49 0 0 0 2.107 1.7 20.802 20.802 0 0 0 .426 2.712q-.25.063-.505.114Zm7.1-8.039q-.503-.317-1.018-.613-.508-.292-1.027-.563c.593-.249 1.176-.462 1.739-.635a18.218 18.218 0 0 1 .306 1.811ZM9.68 5.835c.636-1.85 1.578-2.98 2.304-2.98.773-.001 1.777 1.218 2.434 3.197q.064.194.12.39a20.478 20.478 0 0 0-2.526.97 20.061 20.061 0 0 0-2.52-.981q.087-.3.188-.596Zm-.4 1.424a18.307 18.307 0 0 1 1.73.642q-1.052.542-2.048 1.181c.08-.638.187-1.249.318-1.823Zm-.317 7.66q.497.319 1.009.613.522.3 1.057.576a18.196 18.196 0 0 1-1.744.665 19.144 19.144 0 0 1-.322-1.853Zm5.456 3.146a7.236 7.236 0 0 1-1.238 2.333 1.766 1.766 0 0 1-1.188.748c-.729 0-1.658-1.085-2.29-2.896q-.112-.321-.206-.648a20.109 20.109 0 0 0 2.53-1.01 20.8 20.8 0 0 0 2.547.979q-.072.249-.155.494Zm.362-1.324c-.569-.176-1.16-.393-1.762-.646q.509-.267 1.025-.565.53-.306 1.032-.627a18.152 18.152 0 0 1-.295 1.838Zm.447-4.743q0 .911-.057 1.82c-.493.334-1.013.66-1.554.972-.54.311-1.073.597-1.597.856q-.827-.396-1.622-.854-.79-.455-1.544-.969-.07-.91-.07-1.822 0-.911.068-1.821a24.168 24.168 0 0 1 3.158-1.823q.816.397 1.603.851.79.454 1.55.959.065.914.065 1.831Zm.956-5.093c1.922-.373 3.37-.122 3.733.507.387.67-.167 2.148-1.554 3.706q-.115.129-.238.259a20.061 20.061 0 0 0-2.144-1.688 20.04 20.04 0 0 0-.405-2.649q.31-.076.608-.135Zm-.13 3.885a18.164 18.164 0 0 1 1.462 1.188 18.12 18.12 0 0 1-1.457 1.208q.023-.594.023-1.188 0-.604-.028-1.208Zm3.869 5.789c-.364.631-1.768.894-3.653.538q-.324-.061-.664-.146a20.069 20.069 0 0 0 .387-2.682 19.94 19.94 0 0 0 2.137-1.715q.177.183.336.364a7.234 7.234 0 0 1 1.403 2.238 1.766 1.766 0 0 1 .054 1.403Zm-8.819-6.141a1.786 1.786 0 1 0 2.44.654 1.786 1.786 0 0 0-2.44-.654Z">
                </path>
            </svg>
        ),
    },
    {
        id: 4,
        cardcolor: "orange ",
        title: "Wordpress Plugin",
        svg: (
            <svg xmlns="http://www.w3.org/2000/svg" className="fill-danger" data-name="Layer 1" viewBox="0 0 24 24" id="wordpress-simple">
                <circle cx="12" cy="12" r="10" fill="rgba(var(--orange-rgb), 0.2)" opacity="0.2"></circle>
                <path fill="rgb(var(--orange-rgb))" d="M12,1.99991a10.00009,10.00009,0,1,0,10,9.99975A10.01117,10.01117,0,0,0,12,1.99991ZM3.00928,11.99966a8.95545,8.95545,0,0,1,.77844-3.659L8.07654,20.09122A8.99125,8.99125,0,0,1,3.00928,11.99966ZM12,20.99112a8.98762,8.98762,0,0,1-2.54-.36633l2.69788-7.83869,2.7633,7.57135a.84324.84324,0,0,0,.06446.1239A8.97139,8.97139,0,0,1,12,20.99112ZM13.239,7.78427c.54126-.02844,1.02906-.08539,1.02906-.08539a.37165.37165,0,0,0-.05738-.741s-1.4563.11432-2.39648.11432c-.8833,0-2.3678-.11432-2.3678-.11432a.37165.37165,0,0,0-.057.741s.4585.05695.943.08539l1.40075,3.838-1.968,5.90088L6.49133,7.78427c.54163-.02844,1.02893-.08539,1.02893-.08539a.37166.37166,0,0,0-.05749-.741s-1.45593.11432-2.39612.11432c-.1687,0-.36768-.00416-.57861-.01093A8.98815,8.98815,0,0,1,18.07117,5.36948c-.0387-.00238-.07654-.00721-.11634-.00721A1.5567,1.5567,0,0,0,16.445,6.95792a4.21016,4.21016,0,0,0,.88317,2.1087,4.73577,4.73577,0,0,1,.74122,2.47955,10.88314,10.88314,0,0,1-.68409,2.9065l-.897,2.99634ZM16.52,19.7709l2.74609-7.93969a8.489,8.489,0,0,0,.68372-3.22028,6.9105,6.9105,0,0,0-.06043-.92456A8.99223,8.99223,0,0,1,16.52,19.7709Z">
                </path>
            </svg>
        ),
    },
    {
        id: 5,
        cardcolor: "info ",
        title: "Wordpress Theme",
        svg: (
            <svg xmlns="http://www.w3.org/2000/svg" className="fill-info" data-name="Layer 1" viewBox="0 0 24 24" id="wordpress-simple2">
                <circle cx="12" cy="12" r="10" fill="rgba(var(--info-rgb), 0.2)" opacity="0.2"></circle>
                <path fill="rgb(var(--info-rgb))" d="M12,1.99991a10.00009,10.00009,0,1,0,10,9.99975A10.01117,10.01117,0,0,0,12,1.99991ZM3.00928,11.99966a8.95545,8.95545,0,0,1,.77844-3.659L8.07654,20.09122A8.99125,8.99125,0,0,1,3.00928,11.99966ZM12,20.99112a8.98762,8.98762,0,0,1-2.54-.36633l2.69788-7.83869,2.7633,7.57135a.84324.84324,0,0,0,.06446.1239A8.97139,8.97139,0,0,1,12,20.99112ZM13.239,7.78427c.54126-.02844,1.02906-.08539,1.02906-.08539a.37165.37165,0,0,0-.05738-.741s-1.4563.11432-2.39648.11432c-.8833,0-2.3678-.11432-2.3678-.11432a.37165.37165,0,0,0-.057.741s.4585.05695.943.08539l1.40075,3.838-1.968,5.90088L6.49133,7.78427c.54163-.02844,1.02893-.08539,1.02893-.08539a.37166.37166,0,0,0-.05749-.741s-1.45593.11432-2.39612.11432c-.1687,0-.36768-.00416-.57861-.01093A8.98815,8.98815,0,0,1,18.07117,5.36948c-.0387-.00238-.07654-.00721-.11634-.00721A1.5567,1.5567,0,0,0,16.445,6.95792a4.21016,4.21016,0,0,0,.88317,2.1087,4.73577,4.73577,0,0,1,.74122,2.47955,10.88314,10.88314,0,0,1-.68409,2.9065l-.897,2.99634ZM16.52,19.7709l2.74609-7.93969a8.489,8.489,0,0,0,.68372-3.22028,6.9105,6.9105,0,0,0-.06043-.92456A8.99223,8.99223,0,0,1,16.52,19.7709Z">
                </path>
            </svg>
        ),
    },
    {
        id: 6,
        cardcolor: "warning ",
        title: "Javascript",
        svg: (
            <svg xmlns="http://www.w3.org/2000/svg" className="fill-warning" viewBox="0 0 24 24" id="java-script">
                <path fill="rgb(var(--warning-rgb))" d="M11.181 2.213a1.677 1.677 0 0 1 1.637 0l7.479 4.225a1.54 1.54 0 0 1 .778 1.325v8.475a1.556 1.556 0 0 1-.836 1.354l-7.452 4.204a1.63 1.63 0 0 1-1.655-.046l-2.236-1.292a1.316 1.316 0 0 1-.432-.311c.095-.128.265-.144.403-.2a5.22 5.22 0 0 0 .883-.412.206.206 0 0 1 .23.014c.636.365 1.267.741 1.907 1.103.136.079.274-.026.39-.09q3.658-2.068 7.317-4.13a.242.242 0 0 0 .133-.238q.003-4.193.001-8.387a.262.262 0 0 0-.156-.261q-3.714-2.092-7.426-4.186a.258.258 0 0 0-.292 0Q8.141 5.452 4.43 7.547a.259.259 0 0 0-.157.26v8.387a.237.237 0 0 0 .135.235q.99.562 1.983 1.12a1.532 1.532 0 0 0 1.24.166.94.94 0 0 0 .609-.883c.003-2.78-.002-5.56.002-8.338a.21.21 0 0 1 .228-.214c.318-.002.635-.004.953.001a.22.22 0 0 1 .207.254c-.001 2.797.003 5.594-.002 8.39a2.127 2.127 0 0 1-.995 1.922 3.064 3.064 0 0 1-2.738-.075c-.727-.363-1.42-.79-2.133-1.18a1.553 1.553 0 0 1-.835-1.354V7.763a1.542 1.542 0 0 1 .804-1.342q3.726-2.103 7.451-4.208Z">
                </path>
                <path fill="rgb(var(--warning-rgb))" d="M13.348 8.083a5.88 5.88 0 0 1 3.218.493 2.434 2.434 0 0 1 1.187 2.106.228.228 0 0 1-.247.168c-.315 0-.629.004-.943-.002a.243.243 0 0 1-.228-.236 1.436 1.436 0 0 0-.687-.992 4.071 4.071 0 0 0-1.884-.27 2.558 2.558 0 0 0-1.349.336.855.855 0 0 0-.284.955c.101.24.378.317.605.388 1.306.342 2.69.308 3.97.757a1.87 1.87 0 0 1 1.23 1.095 2.338 2.338 0 0 1-.396 2.23 3.126 3.126 0 0 1-1.678.905 8.063 8.063 0 0 1-2.533.108 3.992 3.992 0 0 1-2.228-.839 2.338 2.338 0 0 1-.753-1.844.211.211 0 0 1 .231-.186c.317-.003.633-.004.95 0a.222.222 0 0 1 .226.22 1.439 1.439 0 0 0 .536 1.01 4.06 4.06 0 0 0 2.187.398 2.97 2.97 0 0 0 1.794-.439.99.99 0 0 0 .27-.946c-.078-.28-.37-.41-.621-.495-1.29-.408-2.688-.26-3.965-.72a1.93 1.93 0 0 1-1.218-1.063 2.175 2.175 0 0 1 .434-2.262 3.506 3.506 0 0 1 2.176-.875Z">
                </path>
            </svg>
        ),
    },
];
export const deals = [
    {
      id: 1,
      discount: "20% Off",
      savings: "$100",
      buttonClass: "primary",
      title: "Wordpress Themes",
      logo: "../../assets/images/marketplace/logos/1.png",
      productsCount: "45+",
      widgetsCount: "175+",
    },
    {
      id: 2,
      discount: "40% Off",
      savings: "$300",
      buttonClass: "secondary",
      title: "React Templates",
      logo: "../../assets/images/marketplace/logos/2.png",
      productsCount: "25+",
      widgetsCount: "215+",
    },
    {
      id: 3,
      discount: "30% Off",
      savings: "$200",
      buttonClass: "success",
      title: "HTML Templates",
      logo: "../../assets/images/marketplace/logos/3.png",
      productsCount: "234+",
      widgetsCount: "342+",
    }
  ];
  export const RelatedProducts1 = [
    {
        id: 1,
        src: '../../assets/images/marketplace/templates/1.png',
        title: 'PHP Script Template',
        author: 'By Obligation Pvt.Ltd',
        ratings: "142",
        sales: "150",
        originalPrice: "399",
        discountedPrice: "120",
    },
    {
        id: 2,
        src: '../../assets/images/marketplace/templates/4.png',
        title: 'Wordpress Template',
        author: 'By Obligation Pvt.Ltd',
        ratings: "152",
        sales: "310",
        originalPrice: "439",
        discountedPrice: "320",
        badge: '40% Off',
    },
    {
        id: 3,
        src: '../../assets/images/marketplace/templates/2.png',
        title: 'HTML Template',
        author: 'By Obligation Pvt.Ltd',
        ratings: "132",
        sales: "120",
        originalPrice: "379",
        discountedPrice: "170",
    },
    {
        id: 4,
        src: '../../assets/images/marketplace/templates/3.png',
        title: 'React Template',
        author: 'By Obligation Pvt.Ltd',
        ratings: "232",
        sales: "240",
        originalPrice: "499",
        discountedPrice: "240",
        rightBadge: true,
    },
    {
        id: 5,
        src: '../../assets/images/marketplace/templates/5.png',
        title: 'Laravel Template',
        author: 'By Obligation Pvt.Ltd',
        ratings: "142",
        sales: "120",
        originalPrice: "399",
        discountedPrice: "120",
        badge: '20% Off',
        rightBadge: true
    },
    {
        id: 6,
        src: "../../assets/images/marketplace/templates/7.png",
        title: "Vuejs Template",
        author: "By Obligation Pvt.Ltd",
        ratings: "342",
        sales: "320",
        originalPrice: "499",
        discountedPrice: "220",
        badge: "20% Off",
    },
    {
        id: 7,
        src: '../../assets/images/marketplace/templates/6.png',
        title: 'Django Template',
        author: 'By Obligation Pvt.Ltd',
        ratings: "242",
        sales: "220",
        originalPrice: "499",
        discountedPrice: "220",
    },
    {
        id: 8,
        src: "../../assets/images/marketplace/templates/8.png",
        title: "Codeigniter Template",
        author: "By Obligation Pvt.Ltd",
        ratings: "142",
        sales: "120",
        originalPrice: "399",
        discountedPrice: "120",
    },
];
export const RelatedProducts2 = [
    {
        id: 1,
        src: '../../assets/images/marketplace/templates/1.png',
        title: 'PHP Script Template',
        author: 'By Obligation Pvt.Ltd',
        ratings: "142",
        sales: "150",
        originalPrice: "399",
        discountedPrice: "120",
        rightBadge: true,
    },
    {
        id: 2,
        src: '../../assets/images/marketplace/templates/3.png',
        title: 'React Template',
        author: 'By Obligation Pvt.Ltd',
        ratings: "232",
        sales: "240",
        originalPrice: "499",
        discountedPrice: "240",
        rightBadge: true,
    },
    {
        id: 3,
        src: '../../assets/images/marketplace/templates/2.png',
        title: 'HTML Template',
        author: 'By Obligation Pvt.Ltd',
        ratings: "132",
        sales: "120",
        originalPrice: "379",
        discountedPrice: "170",
        badge: '20% Off',
        rightBadge: true,
    },
    {
        id: 4,
        src: '../../assets/images/marketplace/templates/4.png',
        title: 'Wordpress Template',
        author: 'By Obligation Pvt.Ltd',
        ratings: "152",
        sales: "310",
        originalPrice: "439",
        discountedPrice: "320",
        badge: '40% Off',
        rightBadge: true,
    },
    {
        id: 5,
        src: '../../assets/images/marketplace/templates/6.png',
        title: 'Django Template',
        author: 'By Obligation Pvt.Ltd',
        ratings: "242",
        sales: "220",
        originalPrice: "499",
        discountedPrice: "220",
        rightBadge: true,
    },
    {
        id: 5,
        src: '../../assets/images/marketplace/templates/5.png',
        title: 'Laravel Template',
        author: 'By Obligation Pvt.Ltd',
        ratings: "142",
        sales: "120",
        originalPrice: "399",
        discountedPrice: "120",
        badge: '20% Off',
        rightBadge: true
    },
    {
        id: 7,
        src: "../../assets/images/marketplace/templates/7.png",
        title: "Vuejs Template",
        author: "By Obligation Pvt.Ltd",
        ratings: "342",
        sales: "320",
        originalPrice: "499",
        discountedPrice: "220",
        badge: "20% Off",
        rightBadge: true,
    },
    {
        id: 8,
        src: "../../assets/images/marketplace/templates/8.png",
        title: "Codeigniter Template",
        author: "By Obligation Pvt.Ltd",
        ratings: "142",
        sales: "120",
        originalPrice: "399",
        discountedPrice: "120",
        rightBadge: true,
    },
];