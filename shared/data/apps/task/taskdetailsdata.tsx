
import Image from "next/image";
import Link from "next/link";

export const tasks = [
	{ id: 1, text: 'Create a list of industry publications.', isChecked: true },
	{ id: 2, text: 'Define campaign goals and objectives.', isChecked: false },
	{ id: 3, text: 'Write blog posts and articles.', isChecked: false },
	{ id: 4, text: 'Schedule social media posts.', isChecked: false },
	{ id: 5, text: 'Track website traffic and conversions.', isChecked: true },
	{ id: 6, text: 'Modify content as needed.', isChecked: true },
	{ id: 7, text: 'Implement customer feedback.', isChecked: true },
	{ id: 8, text: 'Collaborate with influencers.', isChecked: false },
];

export const files = [
	{
		name: 'Full Project',
		size: '0.45MB',
		image: '../../../assets/images/media/file-manager/1.png',
		imgcls: "p-2"
	},
	{
		name: 'assets.zip',
		size: '0.99MB',
		image: '../../../assets/images/media/file-manager/3.png',
	},
	{
		name: 'image-1.png',
		size: '245KB',
		image: '../../../assets/images/media/file-manager/1.png',
		imgcls: "p-2"
	},
	{
		name: 'documentation.zip',
		size: '2MB',
		image: '../../../assets/images/media/file-manager/3.png',
	},
	{
		name: 'landing.zip',
		size: '3.46MB',
		image: '../../../assets/images/media/file-manager/3.png',
	},
];
export const timelineData = [
	{
		avatar: "",
		title: `<span class="font-medium">You</span> Commented on <span class="font-medium">Work Process</span> in this task <a class="text-secondary" href="#!"><u>#New Task</u></a>.<span class="float-end text-[0.6875rem] text-textmuted dark:text-textmuted/50">24,Dec 2024 - 14:34</span>`,
		description: `"Sure. We've completed the initial wireframes and received feedback from the client. They are happy with the direction. We're now moving on to high-fidelity design mockups."`,

		data: "E",
		color: ' primary '
	},
	{
		avatar: "../../../assets/images/faces/11.jpg",
		title: "Christopher reacted to the task 👍 .",
		titleClass: "text-textmuted dark:text-textmuted/50 ",
		timestamp: "18,Dec 2024 - 12:16",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, repellendus rem rerum excepturi aperiam ipsam temporibus inventore ullam tempora eligendi libero sequi dignissimos cumque, et a sint tenetur consequatur omnis!",
	},
	{
		avatar: "../../../assets/images/faces/4.jpg",
		title: `
		<span class="font-medium">Isabella</span> shared a document with
		 <span class="font-medium">you</span>
	`,
		titleClass: "text-textmuted dark:text-textmuted/50 ",
		timestamp: "21,Dec 2024 - 15:32",
		desClass: 'profile-activity-media mb-0',
		description: (
			<>

				<Link className="relative" scroll={false} href="#!">
					<Image fill src="../../../assets/images/media/file-manager/3.png" alt="" />
				</Link>
				<span className="text-[11px] text-textmuted dark:text-textmuted/50">432.87KB</span>

			</>
		),

	},
	{
		avatar: "",
		title: `<b>You</b> shared a post with 4 people <b class="sm:text-[14px] text-[12px]">  Amelia, Harper, Evelyn, Richard . </b>`,
		titleClass: "text-textmuted dark:text-textmuted/50 ",
		description: "",
		timestamp: "28,Dec 2024 - 18:46",
		media: ["../../../assets/images/media/media-18.jpg"],
		sharedWith: [
			"../../../assets/images/faces/2.jpg",
			"../../../assets/images/faces/8.jpg",
			"../../../assets/images/faces/5.jpg",
			"../../../assets/images/faces/10.jpg",
		],
		data: "P",
		color: 'success'
	},
	{
		avatar: "../../../assets/images/media/media-39.jpg",
		title: "<b>Json</b>  commented on Task pos <a class='text-secondary' href='#!'><u>#UI Technologies</u></a>.",
		description: "Technology id developing rapidly keep up your work 👌",
		timestamp: "24,Dec 2024 - 14:34",
		imgclass: "flex",
		media: [
			"../../../assets/images/media/media-26.jpg",
			"../../../assets/images/media/media-29.jpg",
		],
	},
];