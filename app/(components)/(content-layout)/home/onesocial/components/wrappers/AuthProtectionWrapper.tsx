'use client'
import { useSession } from '@/app/SessionProvider'
import { usePathname, useRouter } from 'next/navigation'
import { Suspense } from 'react'

import type { ChildrenType } from '../../types/component'
import FallbackLoading from '../FallbackLoading'

const AuthProtectionWrapper = ({ children }: ChildrenType) => {
  const { user } = useSession()
  const { push } = useRouter()
  const pathname = usePathname()

  if (!user) {
    push(`/`)
    return <FallbackLoading />
  }

  return <Suspense>{children}</Suspense>
}

export default AuthProtectionWrapper
