import type { StaticImageData } from 'next/image'

import logo8 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/logo/08.svg'


import logo9 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/logo/09.svg'
import logo10 from '@/app/(components)/(content-layout)/home/onesocial/assets/images/logo/10.svg'

type ExperienceType = {
  title: string
  description: string
  logo: StaticImageData
}

export const experienceData: ExperienceType[] = [
  {
    title: 'Apple Computer, Inc.',
    description: 'May 2015 – Present Employment Duration 8 mos',
    logo: logo8,
  },
  {
    title: 'Microsoft Corporation',
    description: 'May 2017 – Present Employment Duration 1 yrs 5 mos',
    logo: logo9,
  },
  {
    title: 'Tata Consultancy Services.',
    description: 'May 2022 – Present Employment Duration 6 yrs 10 mos',
    logo: logo10,
  },
]
