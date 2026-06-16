import SpkBadge from "@/shared/@spk-reusable-components/uielements/spk-badge";
import Image from "next/image";

const activityList = [
	{
		id: 1,
		title: "New Website Created",
		initials: "NW",
		bgColor: "bg-primary",
		textColor: "text-white",
		date: "20 Nov 2022",
		timeAgo: "30 mins ago",
		image: null
	},
	{
		id: 2,
		title: "Prepare for the new project",
		initials: "CH",
		bgColor: "bg-danger",
		textColor: "text-white",
		date: "3 Jan 2023",
		timeAgo: "2 hrs ago",
		image: null
	},
	{
		id: 3,
		title: "Decide the live discussion",
		initials: "S",
		bgColor: "bg-info",
		textColor: "text-white",
		date: "17 Feb 2023",
		timeAgo: "3 hrs ago",
		image: null
	},
	{
		id: 4,
		title: "Meeting at 3:00 pm",
		initials: null,
		image: "/assets/images/faces/12.jpg",
		date: "29 Dec 2022",
		timeAgo: "4 hrs ago"
	},
	{
		id: 5,
		title: "Prepare for presentation",
		initials: "RC",
		bgColor: "bg-success",
		textColor: "text-white",
		date: "31 Dec 2022",
		timeAgo: "4 hrs ago",
		image: null
	},
	{
		id: 6,
		title: "Brenda New product launching",
		image: "/assets/images/faces/1.jpg",
		date: "1 Jan 2023",
		timeAgo: "7 hrs ago"
	},
	{
		id: 7,
		title: "Medeleine Hey! there I'm available",
		initials: "M",
		bgColor: "bg-secondary",
		textColor: "text-white",
		date: "5 Jan 2023",
		timeAgo: "3 hrs ago",
		image: null
	},
	{
		id: 8,
		title: "Olivia New schedule release",
		initials: "OL",
		bgColor: "bg-info",
		textColor: "text-white",
		date: "6 Jan 2023",
		timeAgo: "45 mins ago",
		image: null
	},
	{
		id: 9,
		title: "Kamala Preparing for new admin launch",
		initials: "A",
		bgColor: "bg-warning",
		textColor: "text-white",
		date: "7 Jan 2023",
		timeAgo: "28 mins ago",
		image: null
	},
	{
		id: 10,
		title: "Oisha Meeting with client for dinner",
		image: "/assets/images/faces/6.jpg",
		date: "10 Jan 2023",
		timeAgo: "14 hrs ago"
	},
	{
		id: 11,
		title: "Prepare for the new project",
		initials: "CH",
		bgColor: "bg-danger",
		textColor: "text-white",
		date: "3 Jan 2023",
		timeAgo: "2 hrs ago",
		image: null
	},
	{
		id: 12,
		title: "Decide the live discussion",
		initials: "S",
		bgColor: "bg-info",
		textColor: "text-white",
		date: "17 Feb 2023",
		timeAgo: "3 hrs ago",
		image: null
	},
	{
		id: 13,
		title: "Meeting at 3:00 pm",
		initials: null,
		image: "/assets/images/faces/12.jpg",
		date: "29 Dec 2022",
		timeAgo: "4 hrs ago"
	},
	{
		id: 14,
		title: "Prepare for presentation",
		initials: "RC",
		bgColor: "bg-success",
		textColor: "text-white",
		date: "31 Dec 2022",
		timeAgo: "4 hrs ago",
		image: null
	},
];
export const OffcanvasData = () => {
	return (
		<>
			{activityList.map((item, index) => (
				<li key={item.id || index} className={`ti-list-group-item ${index === 0 ? '!border-t-0' : ''}`}>
					<div className="flex items-center">
						<div className="me-2">
							{item.image ? (
								<span className="avatar avatar-md !rounded-full relative block">
									<Image fill src={item.image} alt={item.title} className="!rounded-full object-cover" />
								</span>
							) : (
								<span className={`avatar avatar-md !rounded-full ${item.bgColor} ${item.textColor}`}>
									{item.initials}
								</span>
							)}
						</div>
						<div className="flex-grow">
							<p className="font-semibold mb-0">
								{item.title}
								<SpkBadge variant="light" customClass="text-[#8c9097] dark:text-white/50 ltr:float-right rtl:float-left">
									{item.date}
								</SpkBadge>
							</p>
							<span className="text-[0.75rem] text-[#8c9097] dark:text-white/50">
								<i className="ri-time-line align-middle me-1 inline-block"></i>
								{item.timeAgo}
							</span>
						</div>
					</div>
				</li>
			))}
		</>
	);
};
export const scrollSpyItems = [
	{ id: 1, title: "Item 1", content: "This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting." },
	{ id: 2, title: "Item 1-1", content: "This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting." },
	{ id: 3, title: "Item 1-2", content: "This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting." },
	{ id: 4, title: "Item 2", content: "This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting." },
	{ id: 5, title: "Item 3", content: "This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting." },
	{ id: 6, title: "Item 3-1", content: "This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting." },
	{ id: 7, title: "Item 3-2", content: "This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting." }
];