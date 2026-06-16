
import Image from "next/image";
import Link from "next/link";

export const timelineData = [
    {
        avatar: "",
        title: "Project Kick-off Meeting",
        description: "Discuss project scope, objectives, and timelines.",
        data: "E",
        color: 'primary'
    },
    {
        avatar: "../../../assets/images/faces/11.jpg",
        title: "Security and Compliance Audit",
        titleClass: "text-textmuted dark:text-textmuted/50 ",
        description: "Ensure the system adheres to security and regulatory requirements.",
    },
    {
        avatar: "../../../assets/images/faces/4.jpg",
        title: "<b>Alicia Keys</b>   shared a document with <b>you</b>",
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
        title: `<b>You</b> shared a post with 4 people <b class="sm:text-[14px] text-[12px]"> Simon,Sasha,Anagha,Hishen. </b>`,
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
        title: "<b>Json</b>  commented on Project <a class='text-secondary' href='#!'><u>#UI Technologies</u></a>.",
        description: "Technology id developing rapidly keep up your work 👌",
        timestamp: "24,Dec 2024 - 14:34",
        imgclass: "flex",
        media: [
            "../../../assets/images/media/media-26.jpg",
            "../../../assets/images/media/media-29.jpg",
        ],
    },
];
export const teamMembers = [
    {
        name: "Simon Conway",
        role: "UI Developer",
        avatar: "../../../assets/images/faces/2.jpg",
        badgeClass: "bg-primary/[0.15] text-primary",

    },
    {
        name: "Sasha Banks",
        role: "UI Designer",
        avatar: "../../../assets/images/faces/8.jpg",
        badgeClass: "bg-pinkmain/[0.15] text-pinkmain",
    },
    {
        name: "Anagha May",
        role: "UI Tester",
        avatar: "../../../assets/images/faces/5.jpg",
        badgeClass: "bg-warning/[0.15] text-warning",
    },
    {
        name: "Hishen Stuart",
        role: "Angular Developer",
        avatar: "../../../assets/images/faces/10.jpg",
        badgeClass: "bg-success/[0.15] text-success",
    },
];

export const tasks = [
    { label: "Enhance user experience", checked: true },
    { label: "Boost inventory accuracy", checked: false },
    { label: "Reduce manual errors", checked: false },
    { label: "Improve data security", checked: false },
    { label: "Increase operational efficiency", checked: true },
    { label: "Enhance reporting capabilities", checked: true },
    { label: "Reduce excess costs", checked: true },
    { label: "Achieve regulatory compliance", checked: false },
];
export const files = [
    {
        name: "Full Project",
        size: "0.45MB",
        imageSrc: "../../../assets/images/media/file-manager/1.png",
        imgcls: "p-2"
    },
    {
        name: "assets.zip",
        size: "0.99MB",
        imageSrc: "../../../assets/images/media/file-manager/3.png",
    },
    {
        name: "image-1.png",
        size: "245KB",
        imageSrc: "../../../assets/images/media/file-manager/1.png",
        imgcls: "p-2"
    },
    {
        name: "documentation.zip",
        size: "2MB",
        imageSrc: "../../../assets/images/media/file-manager/3.png",
    },
    {
        name: "landing.zip",
        size: "3.46MB",
        imageSrc: "../../../assets/images/media/file-manager/3.png",
    },
];