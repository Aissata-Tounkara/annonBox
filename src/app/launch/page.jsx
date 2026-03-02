'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ROUTES, STORAGE_KEYS } from '@/lib/utils/constants'

export default function LaunchPage() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.PRIVATE_TOKEN)
    router.replace(token ? ROUTES.INBOX(token) : ROUTES.HOME)
  }, [router])

  return (
    <main className="min-h-screen flex items-center justify-center bg-surface-light dark:bg-background-dark px-4">
      <p className="text-sm font-semibold text-text-muted-light dark:text-text-muted-dark">
        Ouverture de votre espace...
      </p>
    </main>
  )
}
