export const activeChats = [
    {
        id: 1,
        name: 'Emma Johnson',
        time: '1:32PM',
        message: "Hey there! How's your day going? 😊",
        avatar: '../../assets/images/faces/5.jpg',
        status: 'read',
    },
    {
        id: 2,
        name: 'Amelia Turner',
        time: '12:24PM',
        message: 'Typing...',
        avatar: '../../assets/images/faces/2.jpg',
        status: 'typing',
        unreadCount: 2,
        isActive: true
    },
    {
        id: 5,
        name: 'Samuel Harris',
        time: '1:32PM',
        message: "Hey there! How's your day going? 😊",
        avatar: '../../assets/images/faces/5.jpg',
        status: 'read',
    },
    //{
    //    id: 3,
    //    name: 'Samuel Harris',
    //    time: '1:16PM',
    //    message: 'Just had the best coffee ever! ☕',
    //    avatar: '../../assets/images/faces/10.jpg',
    //    status: 'read',
    //},
    {
        id: 4,
        name: 'Aria Robinson',
        time: '12:45PM',
        message: 'Guess what? I aced that test!',
        avatar: '../../assets/images/faces/8.jpg',
        status: 'read',
    },
];

export const allChats = [
    {
        id: 5,
        name: 'Logan Brooks',
        time: '11:54AM',
        message: 'Movie night tonight? 🎬',
        avatar: '../../assets/images/faces/11.jpg',
        status: 'read',
    },
    {
        id: 6,
        name: 'Evelyn Adams',
        time: '9:45AM',
        message: 'Work is dragging...',
        avatar: '../../assets/images/faces/3.jpg',
        status: 'read',
    },
    {
        id: 7,
        name: 'Lily Brown',
        time: '8:31AM',
        message: 'Meet for lunch tomorrow?',
        avatar: '../../assets/images/faces/6.jpg',
        status: 'read',
    },
    {
        id: 8,
        name: 'Chloe Lewis',
        time: '7:23AM',
        message: 'Weekend plans?',
        avatar: '../../assets/images/faces/4.jpg',
        status: 'read',
    },
    {
        id: 9,
        name: 'Leo Phillips',
        time: '10:22AM',
        message: 'Craving pizza right now! 🍕',
        avatar: '../../assets/images/faces/13.jpg',
        status: 'read',
    },
    {
        id: 10,
        name: 'Lucas Hayes',
        time: '9:10AM',
        message: 'Got any Netflix recommendations?',
        avatar: '../../assets/images/faces/15.jpg',
        status: 'read',
    },
];


export const ChatGroups = [
    {
        id: 1,
        name: 'ChatMingle Collective',
        onlineCount: "4",
        badgeColor: 'bg-success/[0.15]',
        badgeTextColor: 'text-success',
        members: [
            '../../assets/images/faces/2.jpg',
            '../../assets/images/faces/8.jpg',
            '../../assets/images/faces/2.jpg',
            '../../assets/images/faces/10.jpg',
        ],
        extraMembers: "19",
    },
    {
        id: 2,
        name: 'ConnectHub Crew',
        onlineCount: "32",
        badgeColor: 'bg-secondary/[0.15]',
        badgeTextColor: 'text-secondary',
        members: [
            '../../assets/images/faces/1.jpg',
            '../../assets/images/faces/7.jpg',
            '../../assets/images/faces/3.jpg',
            '../../assets/images/faces/9.jpg',
            '../../assets/images/faces/12.jpg',
        ],
        extraMembers: "123",
    },
    {
        id: 3,
        name: 'TalkTide Tribe',
        onlineCount: "3",
        badgeColor: 'bg-warning/[0.15]',
        badgeTextColor: 'text-warning',
        members: [
            '../../assets/images/faces/4.jpg',
            '../../assets/images/faces/8.jpg',
            '../../assets/images/faces/13.jpg',
        ],
        extraMembers: "15",
    },
    {
        id: 4,
        name: 'DialogDynasty',
        onlineCount: "5",
        badgeColor: 'bg-danger/[0.15]',
        badgeTextColor: 'text-danger',
        members: [
            '../../assets/images/faces/1.jpg',
            '../../assets/images/faces/7.jpg',
            '../../assets/images/faces/14.jpg',
        ],
        extraMembers: "28",
    },
    {
        id: 5,
        name: 'NexusChat Nexus',
        onlineCount: "0",
        badgeColor: 'bg-light',
        badgeTextColor: 'text-dark',
        members: [
            '../../assets/images/faces/5.jpg',
            '../../assets/images/faces/6.jpg',
            '../../assets/images/faces/12.jpg',
            '../../assets/images/faces/3.jpg',
        ],
        extraMembers: "53",
    },
];

export const ChatData = [
    {
        name: "ChatMingle Collective 😍",
        time: "12:24PM",
        message: "Hira Typing...",
        avatar: "../../assets/images/faces/17.jpg",
        status: "online",
        unreadCount: 2,
        color: "chat-msg-typing",
        cardclass: "",
    },
    {
        name: "ConnectHub Crew",
        time: "1:16PM",
        message: (
            <>
                <span className="group-indivudial">Rams :</span> Happy to be part of this group
            </>
        ),
        avatar: "../../assets/images/faces/18.jpg",
        status: "online",
        unreadCount: 0,
        readicon: true,
        badge: "chat",
        cardclass: "chat-msg-unread",
    },
    {
        name: "TalkTide Tribe 😎",
        time: "3 days ago",
        message: "Simon,Melissa,Amanda,Patrick,Siddique ",
        avatar: "../../assets/images/faces/19.jpg",
        status: "offline",
        unreadCount: 0,
        cardclass: "chat-inactive",
    },
    {
        name: "DialogDynasty",
        time: "5 days ago",
        message: "Kamalan,Subha,Ambrose,Kiara,Jackson",
        avatar: "../../assets/images/faces/20.jpg",
        status: "offline",
        unreadCount: 0,
        cardclass: "chat-inactive",
    },
    {
        name: "NexusChat Nexus",
        time: "12 days ago",
        message: "Subman,Rajen,Kairo,Dibasha,Alexa",
        avatar: "../../assets/images/faces/21.jpg",
        status: "offline",
        unreadCount: 0,
        cardclass: "chat-inactive",
    },
];

export const ContactData = [
    { letter: "A", contact: [{ avatar: "../../assets/images/faces/5.jpg", name: "Ava Taylor" }] },
    { letter: "B", contact: [{ avatar: "../../assets/images/faces/12.jpg", name: "Benjamin Turner" }] },
    { letter: "C", contact: [{ avatar: "../../assets/images/faces/14.jpg", name: "Caleb Rodriguez" }] },
    { letter: "D", contact: [{ bgColor: "primary", text: "DS", name: "Daniel Sullivan" }] },
    { letter: "E", contact: [{ avatar: "../../assets/images/faces/7.jpg", name: "Emma Johnson" }] },
    { letter: "J", contact: [{ avatar: "../../assets/images/faces/15.jpg", name: "Jackson Rivera" }] },
    { letter: "L", contact: [{ bgColor: "primary", text: "LP", name: "Leo Phillips" }, { avatar: "../../assets/images/faces/2.jpg", name: "Lily Brown" }] },
    { letter: "N", contact: [{ avatar: "../../assets/images/faces/10.jpg", name: "Noah Russell" }] },
    { letter: "W", contact: [{ avatar: "../../assets/images/faces/16.jpg", name: "Wyatt Thompson" }] },

]