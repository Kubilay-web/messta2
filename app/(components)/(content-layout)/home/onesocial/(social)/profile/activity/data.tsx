import { addOrSubtractMinutesFromDate } from '../../../utils/date'
import type { ReactNode } from 'react'
import type { StaticImageData } from 'next/image'

import avatar7 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/07.jpg'
import avatar1 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/01.jpg'
import avatar2 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/02.jpg'
import avatar3 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/avatar/03.jpg'

export type ActivityType = {
  title: string
  type?: 'Public' | 'only me'
  avatar?: StaticImageData
  textAvatar?: {
    text: string
    variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
  }
  description?: ReactNode
  time: Date
}

export const activityData: ActivityType[] = [
  {
    title: 'Sam Lanson update a playlist on stackbros.',
    avatar: avatar7,
    time: addOrSubtractMinutesFromDate(1),
    type: 'Public',
  },
  {
    title: 'Billy Vasquez save a link.',
    time: addOrSubtractMinutesFromDate(2),
    type: 'only me',
    avatar: avatar1,
  },
  {
    title: "Sam Lanson liked Frances Guerrero's add comment.",
    time: addOrSubtractMinutesFromDate(60),
    description: <div className="mb-0 text-sm">This is the best picture I have come across today....</div>,
    textAvatar: {
      text: 'SM',
      variant: 'success',
    },
  },
  {
    title: 'Judy Nguyen likes Jacqueline Miller Photos.',
    time: addOrSubtractMinutesFromDate(240),
    description: '✌️👌👍',
    avatar: avatar2,
  },
  {
    title: 'Larry Lawson',
    time: addOrSubtractMinutesFromDate(600),
    description: (
      <>
        <p className="mb-2 text-sm">Replied to your comment on Blogzine blog theme</p>
        <div className="block rounded bg-gray-100 p-2 text-xs">Yes, I am so excited to see it live. 👍</div>
      </>
    ),
    avatar: avatar3,
  },
]