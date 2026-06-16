
import Image from "next/image";
import Link from "next/link";

export const userData = [
    { id: 1, name: "Amelia Turner", imgSrc: "../../assets/images/faces/1.jpg" },
    { id: 2, name: "Henry Morgan", imgSrc: "../../assets/images/faces/14.jpg" },
    { id: 3, name: "Aurora Reed", imgSrc: "../../assets/images/faces/3.jpg" },
    { id: 4, name: "Leo Phillips", imgSrc: "../../assets/images/faces/10.jpg" },
    { id: 5, name: "Ava Taylor", imgSrc: "../../assets/images/faces/5.jpg" }
];

// PERSONAL INFO
export const PersonalInfo = [
    { id: 1, label: 'Name', value: 'Leo Phillips' },
    { id: 2, label: 'Email', value: 'your.email@example.com' },
    { id: 3, label: 'Phone', value: '+1 (555) 123-4567' },
    { id: 4, label: 'Designation', value: 'C.E.O' },
    { id: 5, label: 'Age', value: '30' },
    { id: 6, label: 'Experience', value: '12 Years' }
];


export const FriendTabdata = [
    { id: 1, src: '../../assets/images/faces/2.jpg', name: "Samantha May", mail: "samanthamay2912@gmail.com", badge: "Team Member", color: "info" },
    { id: 2, src: '../../assets/images/faces/15.jpg', name: "Andrew Garfield", mail: "andrewgarfield98@gmail.com", badge: "Team Lead", color: "success" },
    { id: 3, src: '../../assets/images/faces/5.jpg', name: "Jessica Cashew", mail: "jessicacashew143@gmail.com", badge: "Team Member", color: "info" },
    { id: 4, src: '../../assets/images/faces/11.jpg', name: "Simon Cowan", mail: "jessicacashew143@gmail.com", badge: "Team Manager", color: "warning" },
    { id: 5, src: '../../assets/images/faces/7.jpg', name: "Amanda nunes", mail: "amandanunes45@gmail.com", badge: "Team Member", color: "info" },
    { id: 6, src: '../../assets/images/faces/12.jpg', name: "Mahira Hose", mail: "mahirahose9456@gmail.com", badge: "Team Member", color: "info" },
]

// skills
export const Skills = [
    'Project Management', 'Data Analysis', 'Marketing Strategy', 'Graphic Design', 'Content Creation',
    'Market Research', 'Client Relations', 'Event Planning', 'Budgeting and Finance', 'Negotiation Skills',
    'Team Collaboration', 'Adaptability'
]

export const ContactInfo = [
    {
        id: 1,
        iconClass: "mail-line",
        color: "primary",
        label: "Email",
        value: "your.email@example.com",
    },
    {
        id: 2,
        iconClass: "phone-line",
        color: "secondary",
        label: "Phone",
        value: "+1 (555) 123-4567",
    },
    {
        id: 3,
        iconClass: "map-pin-line",
        color: "success",
        label: "Website",
        value: "www.yourwebsite.com",
    },
    {
        id: 4,
        iconClass: "building-line",
        color: "orangemain",
        label: "Location",
        value: "City, Country",
    },
];

export const SocialLinks = [
    {
        id: 1,
        iconClass: "github-fill",
        bgClass: "primary",
        label: "Github",
        link: "github.com/spruko",
    },
    {
        id: 2,
        iconClass: "twitter-x-fill",
        bgClass: "secondary",
        label: "Twitter",
        link: "twitter.com/spruko.me",
    },
    {
        id: 3,
        iconClass: "linkedin-box-fill",
        bgClass: "success",
        label: "Linkedin",
        link: "linkedin.com/in/spruko",
    },
    {
        id: 4,
        iconClass: "briefcase-2-fill",
        bgClass: "orangemain",
        label: "My Portfolio",
        link: "spruko.com/",
    },
];

export const Languagedata = [
    { value: 'Arabic', label: 'Arabic' },
    { value: 'Korean', label: 'Korean' },
    { value: 'Us English', label: 'Us English' },
    { value: 'Hindi', label: 'Hindi' },

];

//Selectdata

export const Timezonedata = [
    { value: "(GMT-11:00) Midway Island, Samoa", label: ' (GMT-11:00) Midway Island, Samoa ' },
    { value: "(GMT-10:00) Hawaii-Aleutian", label: ' (GMT-10:00) Hawaii-Aleutian ' },
    { value: "(GMT-10:00) Hawaii", label: ' (GMT-10:00) Hawaii ' },
    { value: "(GMT-09:30) Marquesas Islands", label: ' (GMT-09:30) Marquesas Islands ' },
    { value: "(GMT-09:00) Gambier Islands", label: ' (GMT-09:00) Gambier Islands ' },
    { value: "(GMT-09:00) Alaska", label: ' (GMT-09:00) Alaska ' },
    { value: "(GMT-08:00) Tijuana, Baja California", label: ' (GMT-08:00) Tijuana, Baja California ' },
    { value: " (GMT-08:00) Pitcairn Islands", label: ' (GMT-08:00) Pitcairn Islands ' },
    { value: "(GMT-08:00) Pacific Time (US &amp; Canada)", label: '(GMT-08:00) Pacific Time (US &amp; Canada) ' },
    { value: "(GMT-07:00) Mountain Time (US &amp; Canada)", label: ' (GMT-07:00) Mountain Time (US &amp; Canada) ' },
    { value: "(GMT-07:00) Chihuahua, La Paz, Mazatlan", label: ' (GMT-07:00) Chihuahua, La Paz, Mazatlan ' },
    { value: "(GMT-07:00) Arizona", label: '(GMT-07:00) Arizona ' },
    { value: "(GMT-06:00) Saskatchewan, Central America", label: ' (GMT-06:00) Saskatchewan, Central America ' },
    { value: "(GMT-06:00) Guadalajara, Mexico City, Monterrey", label: ' (GMT-06:00) Guadalajara, Mexico City, Monterrey  ' },
    { value: "Chile/EasterIsland", label: ' (GMT-06:00) Easter Island ' },
    { value: "(GMT-06:00) Easter Island", label: ' (GMT-06:00) Central Time (US &amp; Canada) ' },
    { value: "(GMT-05:00) Eastern Time (US &amp; Canada)", label: ' (GMT-05:00) Eastern Time (US &amp; Canada) ' },
    { value: "(GMT-05:00) Cuba", label: ' (GMT-05:00) Cuba ' },
    { value: "(GMT-05:00) Bogota, Lima, Quito, Rio Branco", label: ' (GMT-05:00) Bogota, Lima, Quito, Rio Branco ' },
    { value: "(GMT-04:30) Caracas", label: ' (GMT-04:30) Caracas ' },
    { value: "(GMT-04:00) Santiago", label: ' (GMT-04:00) Santiago ' },
    { value: "(GMT-04:00) La Paz", label: ' (GMT-04:00) La Paz ' },
    { value: "(GMT-04:00) Faukland Islands", label: ' (GMT-04:00) Faukland Islands ' },
    { value: "(GMT-04:00) Brazil", label: '(GMT-04:00) Brazil ' },
    { value: "America/Goose_Bay", label: ' (GMT-04:00) Atlantic Time (Goose Bay) ' },
    { value: "(GMT-04:00) Atlantic Time (Goose Bay)", label: ' (GMT-04:00) Atlantic Time (Canada) ' },
    { value: "(GMT-03:30) Newfoundland", label: ' (GMT-03:30) Newfoundland ' },
    { value: "(GMT-03:00) UTC-3 ", label: ' (GMT-03:00) UTC-3 ' },
    { value: "(GMT-03:00) Montevideo", label: ' (GMT-03:00) Montevideo ' },
    { value: "(GMT-03:00) Miquelon, St. Pierre", label: ' (GMT-03:00) Miquelon, St. Pierre ' },
    { value: "(GMT-03:00) Greenland ", label: ' (GMT-03:00) Greenland ' },
    { value: "(GMT-03:00) Buenos Aires", label: '(GMT-03:00) Buenos Aires' },
    { value: "(GMT-03:00) Brasilia", label: ' (GMT-03:00) Brasilia ' },
    { value: "(GMT-02:00) Mid-Atlantic ", label: ' (GMT-02:00) Mid-Atlantic ' },
    { value: "(GMT-01:00) Cape Verde Is.", label: '(GMT-01:00) Cape Verde Is.' },
    { value: "(GMT-01:00) Azores", label: ' (GMT-01:00) Azores ' },
    { value: "(GMT) Greenwich Mean Time : Belfast", label: ' (GMT) Greenwich Mean Time : Belfast ' },
    { value: "(GMT) Greenwich Mean Time : Dublin ", label: '(GMT) Greenwich Mean Time : Dublin ' },
    { value: "(GMT) Greenwich Mean Time : Lisbon", label: '(GMT) Greenwich Mean Time : Lisbon ' },
    { value: "(GMT) Greenwich Mean Time : London", label: '(GMT) Greenwich Mean Time : London ' },
    { value: "(GMT) Monrovia, Reykjavik", label: ' (GMT) Monrovia, Reykjavik ' },
    { value: "(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna", label: ' (GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna ' },
    { value: "(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague", label: ' (GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague ' },
    { value: "(GMT+01:00) Brussels, Copenhagen, Madrid, Paris", label: ' (GMT+01:00) Brussels, Copenhagen, Madrid, Paris  ' },
    { value: "(GMT+01:00) West Central Africa", label: ' (GMT+01:00) West Central Africa ' },
    { value: "(GMT+01:00) Windhoek", label: ' (GMT+01:00) Windhoek ' },
    { value: "(GMT+02:00) Beirut", label: ' (GMT+02:00) Beirut ' },
    { value: "(GMT+02:00) Cairo", label: ' (GMT+02:00) Cairo ' },
    { value: "(GMT+02:00) Gaza", label: ' (GMT+02:00) Gaza ' },
    { value: "(GMT+02:00) Harare, Pretoria", label: ' (GMT+02:00) Harare, Pretoria ' },
    { value: "(GMT+02:00) Jerusalem", label: ' (GMT+02:00) Jerusalem ' },
    { value: "(GMT+02:00) Minsk", label: ' (GMT+02:00) Minsk ' },
    { value: "(GMT+02:00) Syria", label: ' (GMT+02:00) Syria ' },
    { value: "(GMT+03:00) Moscow, St. Petersburg, Volgograd", label: ' (GMT+03:00) Moscow, St. Petersburg, Volgograd  ' },
    { value: "(GMT+03:00) Nairobi", label: ' (GMT+03:00) Nairobi ' },
    { value: "(GMT+03:30) Tehran ", label: ' (GMT+03:30) Tehran ' },
    { value: "(GMT+04:00) Abu Dhabi, Muscat", label: ' (GMT+04:00) Abu Dhabi, Muscat ' },
    { value: "(GMT+04:00) Yerevan", label: ' (GMT+04:00) Yerevan ' },
    { value: "(GMT+04:30) Kabul", label: ' (GMT+04:30) Kabul ' },
    { value: "(GMT+05:00) Ekaterinburg ", label: ' (GMT+05:00) Ekaterinburg ' },
    { value: "(GMT+05:00) Tashkent", label: ' (GMT+05:00) Tashkent ' },
    { value: "(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi ", label: ' (GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi  ' },
    { value: "(GMT+05:45) Kathmandu ", label: ' (GMT+05:45) Kathmandu ' },
    { value: "(GMT+06:00) Astana, Dhaka ", label: ' (GMT+06:00) Astana, Dhaka ' },
    { value: "(GMT+06:00) Novosibirsk", label: ' (GMT+06:00) Novosibirsk ' },
    { value: "(GMT+06:30) Yangon (Rangoon)", label: ' (GMT+06:30) Yangon (Rangoon) ' },
    { value: "(GMT+07:00) Bangkok, Hanoi, Jakarta", label: ' (GMT+07:00) Bangkok, Hanoi, Jakarta ' },
    { value: "(GMT+07:00) Krasnoyarsk ", label: ' (GMT+07:00) Krasnoyarsk ' },
    { value: "(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi", label: ' (GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi  ' },
    { value: "(GMT+08:00) Irkutsk, Ulaan Bataar", label: ' (GMT+08:00) Irkutsk, Ulaan Bataar ' },
    { value: "(GMT+08:00) Perth ", label: ' (GMT+08:00) Perth ' },
    { value: "(GMT+08:45) Eucla ", label: ' (GMT+08:45) Eucla ' },
    { value: "(GMT+09:00) Osaka, Sapporo, Tokyo", label: ' (GMT+09:00) Osaka, Sapporo, Tokyo ' },
    { value: "(GMT+09:00) Seoul", label: ' (GMT+09:00) Seoul ' },
    { value: "(GMT+09:00) Yakutsk", label: ' (GMT+09:00) Yakutsk ' },
    { value: "(GMT+09:30) Adelaide", label: ' (GMT+09:30) Adelaide ' },
    { value: "(GMT+09:30) Darwin", label: ' (GMT+09:30) Darwin ' },
    { value: "(GMT+10:00) Brisbane", label: ' (GMT+10:00) Brisbane ' },
    { value: "(GMT+10:00) Hobart ", label: ' (GMT+10:00) Hobart ' },
    { value: "(GMT+10:00) Vladivostok ", label: ' (GMT+10:00) Vladivostok ' },
    { value: "(GMT+10:30) Lord Howe Island ", label: '(GMT+10:30) Lord Howe Island  ' },
    { value: "(GMT+11:00) Solomon Is., New Caledonia", label: ' (GMT+11:00) Solomon Is., New Caledonia ' },
    { value: " (GMT+11:00) Magadan", label: ' (GMT+11:00) Magadan ' },
    { value: "(GMT+11:30) Norfolk Island", label: ' (GMT+11:30) Norfolk Island ' },
    { value: "(GMT+12:00) Anadyr, Kamchatka", label: ' (GMT+12:00) Anadyr, Kamchatka ' },
    { value: "(GMT+12:00) Auckland, Wellington", label: ' (GMT+12:00) Auckland, Wellington' },
    { value: "(GMT+12:00) Fiji, Kamchatka, Marshall Is.", label: ' (GMT+12:00) Fiji, Kamchatka, Marshall Is.' },
    { value: "(GMT+12:45) Chatham Islands", label: ' (GMT+12:45) Chatham Islands' },
    { value: "(GMT+13:00) Nuku alofa", label: ' (GMT+13:00) Nuku alofa' },
    { value: "(GMT+14:00) Kiritimati", label: '(GMT+14:00) Kiritimati ' }
]

export const timelineData = [
    {
        avatar: "",
        data: "E",
        color: 'primary',
        title: "<b>Started a new adventure!</b>  🌍 Excited to explore new opportunities and make memories..",
        description: "",
        timestamp: "24,Dec 2024 - 14:34",
        imgclass: "flex",
        media: [
            "../../assets/images/media/media-17.jpg",
            "../../assets/images/media/media-18.jpg",
        ],
    },
    {
        avatar: "../../assets/images/faces/11.jpg",
        title: 'Achieved a personal milestone today! 🏆 <span class="text-primary font-medium underline">#Hard work pays off</span> ',
        titleClass: " ",
        timestamp: "18,Dec 2024 - 12:16",
        description: "Ensure the system adheres to security and regulatory requirements.",
    },
    {
        avatar: "../../assets/images/faces/4.jpg",
        title: "Attended an inspiring webinar on [topic]. Learning never stops! 📚.",
        titleClass: "text-textmuted dark:text-textmuted/50 ",
        timestamp: "21,Dec 2024 - 15:32",
        desClass: 'profile-activity-media mb-0',
        description: (
            <>
                {/*<p className="profile-activity-media mb-0 ">*/}
                <Link scroll={false} href="#!">
                    <Image fill src="../../assets/images/media/file-manager/3.png" alt="" />
                </Link>
                <span className="text-[11px] text-textmuted dark:text-textmuted/50">432.87KB</span>
                {/*</p>*/}
            </>
        ),

    },
    {
        avatar: "",
        title: `Shared a delicious recipe I tried out. Cooking experiments are always fun! 🍲.`,
        titleClass: "text-textmuted dark:text-textmuted/50 ",
        description: "",
        timestamp: "28,Dec 2024 - 18:46",
        media: ["../../assets/images/media/media-75.jpg"],

        data: "P",
        color: 'success'
    },
    {
        avatar: "../../assets/images/faces/5.jpg",
        title: "Enjoyed a weekend getaway to  <a class='font-semibold text-secondary underline' href='#!'><u>#Africa</u></a>. Nature therapy at its best!",
        titleClass: "text-textmuted dark:text-textmuted/50 ",
        description: "you are already feeling the tense atmosphere of the video playing in the background",
        timestamp: "24,Dec 2024 - 14:34",
        imgclass: "flex gap-2",
        media: [
            "../../assets/images/media/media-59.jpg",
            "../../assets/images/media/media-60.jpg",
            "../../assets/images/media/media-61.jpg",
        ],
    },
    {
        avatar: "../../assets/images/media/media-39.jpg",
        title: "<b>Json</b>  commented on Project <a class='text-secondary' href='#!'><u>#UI Technologies</u></a>.",
        description: "Technology id developing rapidly keep up your work 👌",
        timestamp: "24,Dec 2024 - 14:34",
        imgclass: "flex",
        media: [
            "../../assets/images/media/media-26.jpg",
            "../../assets/images/media/media-29.jpg",
        ],
    },
];