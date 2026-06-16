import type { CelebrationType } from '../../types/data'
import Link from 'next/link'

export const celebrationData: CelebrationType[] = [
  {
    id: '251',
    userId: '101',
    title: (
      <>
        <h6 className="font-semibold text-base">
          <Link href="#" className="hover:text-blue-600 transition-colors">Lori Ferguson</Link>
        </h6>
        <p className="text-sm text-gray-500 mt-1">Today is her birthday</p>
      </>
    ),
    placeholder: 'Happy birthday dear...',
  },
  {
    id: '252',
    userId: '102',
    title: (
      <>
        <h6 className="font-semibold text-base">
          <Link href="#" className="hover:text-blue-600 transition-colors">Billy Vasquez</Link>
        </h6>
        <p className="text-sm text-gray-500 mt-1">Today is her birthday</p>
      </>
    ),
    placeholder: 'Birthday wish here...',
    textAvatar: {
      text: 'BV',
      variant: 'danger',
    },
  },
  {
    id: '253',
    userId: '103',
    title: (
      <p className="mb-2">
        Congratulate{' '}
        <Link href="#" className="font-semibold hover:text-blue-600 transition-colors">
          Amanda Reed
        </Link>{' '}
        for 3 years at{' '}
        <Link href="#" className="font-semibold hover:text-blue-600 transition-colors">
          Bootstrap - Front-end framework
        </Link>
      </p>
    ),
    placeholder: 'Congratulate',
  },
  {
    id: '254',
    userId: '104',
    title: (
      <p className="mb-2">
        Judy Nguyen and 3 other connections are attending{' '}
        <strong className="font-semibold">WordCamps San Francisco.</strong>
      </p>
    ),
    isEvent: true,
  },
  {
    id: '255',
    userId: '105',
    title: (
      <>
        <h6 className="font-semibold text-base">
          <Link href="#" className="hover:text-blue-600 transition-colors">Samuel Bishop</Link>
        </h6>
        <p className="text-sm text-gray-500 mt-1">Birthday is in 2 january</p>
      </>
    ),
    placeholder: 'Birthday wish here...',
  },
  {
    id: '256',
    userId: '106',
    title: (
      <>
        <h6 className="font-semibold text-base">
          <Link href="#" className="hover:text-blue-600 transition-colors">Jacqueline Miller</Link>
        </h6>
        <p className="text-sm text-gray-500 mt-1">Birthday is in 10 march</p>
      </>
    ),
    placeholder: 'Happy Birthday dear...',
  },
  {
    id: '257',
    userId: '107',
    title: (
      <p className="mb-2">
        Congratulate{' '}
        <Link href="#" className="font-semibold hover:text-blue-600 transition-colors">
          Amanda Reed
        </Link>{' '}
        for 3 years at{' '}
        <Link href="#" className="font-semibold hover:text-blue-600 transition-colors">
          Bootstrap - Front-end framework
        </Link>
      </p>
    ),
    placeholder: 'Congratulate',
  },
  {
    id: '258',
    userId: '108',
    title: (
      <p className="mb-2">
        Joan Wallace and 5 other connections are attending{' '}
        <strong className="font-semibold">WordCamps New York.</strong>
      </p>
    ),
    isEvent: true,
  },
]