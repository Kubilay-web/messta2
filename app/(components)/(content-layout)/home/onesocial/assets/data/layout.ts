import type { ProfilePanelLink } from '../../types/data'

import homeImg from '@/app/(components)/(content-layout)/home/onesocial/assets/images/icon/home-outline-filled.svg'

import personImg from '@/app/(components)/(content-layout)/home/onesocial/assets/images/icon/person-outline-filled.svg'
import medalImg from '@/app/(components)/(content-layout)/home/onesocial/assets/images/icon/medal-outline-filled.svg'
import clockImg from '@/app/(components)/(content-layout)/home/onesocial/assets/images/icon/clock-outline-filled.svg'
import earthImg from '@/app/(components)/(content-layout)/home/onesocial/assets/images/icon/earth-outline-filled.svg'
import calendarImg from '@/app/(components)/(content-layout)/home/onesocial/assets/images/icon/calendar-outline-filled.svg'
import chatImg from '@/app/(components)/(content-layout)/home/onesocial/assets/images/icon/chat-outline-filled.svg'
import notificationImg from '@/app/(components)/(content-layout)/home/onesocial/assets/images/icon/notification-outlined-filled.svg'
import cogImg from '@/app/(components)/(content-layout)/home/onesocial/assets/images/icon/cog-outline-filled.svg'
import likeImg from '@/app/(components)/(content-layout)/home/onesocial/assets/images/icon/like-outline-filled.svg'
import starImg from '@/app/(components)/(content-layout)/home/onesocial/assets/images/icon/star-outline-filled.svg'
import taskDoneImg from '@/app/(components)/(content-layout)/home/onesocial/assets/images/icon/task-done-outline-filled.svg'
import arrowBoxedImg from '@/app/(components)/(content-layout)/home/onesocial/assets/images/icon/arrow-boxed-outline-filled.svg'
import shieldImg from '@/app/(components)/(content-layout)/home/onesocial/assets/images/icon/shield-outline-filled.svg'
import handshakeImg from '@/app/(components)/(content-layout)/home/onesocial/assets/images/icon/handshake-outline-filled.svg'
import chatAltImg from '@/app/(components)/(content-layout)/home/onesocial/assets/images/icon/chat-alt-outline-filled.svg'
import trashImg from '@/app/(components)/(content-layout)/home/onesocial/assets/images/icon/trash-var-outline-filled.svg'

export const profilePanelLinksData1: ProfilePanelLink[] = [
  {
    image: homeImg,
    name: 'Feed',
    link: '/home/onesocial/profile/feed',
  },
  {
    image: personImg,
    name: 'Connections',
    link: '/home/onesocial/profile/connections',
  },
  {
    image: earthImg,
    name: 'Latest News',
    link: '/home/onesocial/blogs',
  },
  {
    image: calendarImg,
    name: 'Events',
    link: '/home/onesocial/profile/events',
  },
  {
    image: chatImg,
    name: 'Groups',
    link: '/home/onesocial/feed/groups',
  },
  {
    image: notificationImg,
    name: 'Notifications',
    link: '/home/onesocial/notifications',
  },
  {
    image: cogImg,
    name: 'Settings',
    link: '/home/onesocial/settings/account',
  },
]

export const profilePanelLinksData2: ProfilePanelLink[] = [
  {
    image: homeImg,
    name: 'Feed',
    link: '/profile/feed',
  },
  {
    image: medalImg,
    name: 'Popular',
    link: '',
  },
  {
    image: clockImg,
    name: 'Recent',
    link: '',
  },
  {
    image: likeImg,
    name: 'Subscriptions',
    link: '',
  },
  {
    image: starImg,
    name: 'My favorites',
    link: '',
  },
  {
    image: taskDoneImg,
    name: 'Wishlist',
    link: '',
  },
  {
    image: notificationImg,
    name: 'Notifications',
    link: '/notifications',
  },
  {
    image: cogImg,
    name: 'Settings',
    link: '/settings/account',
  },
  {
    image: arrowBoxedImg,
    name: 'Logout',
    link: '/auth/sign-in',
  },
]

export const settingPanelLinksData: ProfilePanelLink[] = [
  {
    image: personImg,
    name: 'Account',
    link: '/settings/account',
  },
  {
    image: notificationImg,
    name: 'Notification',
    link: '/settings/notification',
  },
  {
    image: shieldImg,
    name: 'Privacy and safety',
    link: '/settings/privacy',
  },
  {
    image: handshakeImg,
    name: 'Communications',
    link: '/settings/communication',
  },
  {
    image: chatAltImg,
    name: 'Messaging',
    link: '/settings/messaging',
  },
  {
    image: trashImg,
    name: 'Close account',
    link: '/settings/close-account',
  },
]
