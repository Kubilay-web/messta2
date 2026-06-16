import type { StaticImageData } from 'next/image'
import type { IconType } from 'react-icons'
import { BsGlobe, BsPeople, BsPersonPlus } from 'react-icons/bs'

import logo1 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/logo/01.svg'
import logo2 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/logo/02.svg'
import logo6 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/logo/06.svg'
import logo4 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/logo/04.svg'

export type CounterType = {
  title: string
  count: number
  icon: IconType
}

export type RelatableEventType = {
  title: string
  location: string
  image: StaticImageData
}

export const counterData: CounterType[] = [
  {
    title: 'Visitors',
    count: 125,
    icon: BsGlobe,
  },
  {
    title: 'Registered',
    count: 356,
    icon: BsPersonPlus,
  },
  {
    title: 'Attendance',
    count: 350,
    icon: BsPeople,
  },
]

export const relatableEvents: RelatableEventType[] = [
  {
    title: 'Bone thugs-n-harmony',
    location: 'San francisco',
    image: logo1,
  },
  {
    title: 'Decibel magazine',
    location: 'London',
    image: logo2,
  },
  {
    title: 'Illenium: fallen embers',
    location: 'Mumbai',
    image: logo6,
  },
  {
    title: 'Comedy on the green',
    location: 'Miami',
    image: logo4,
  },
]
