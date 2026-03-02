'use client'

import { useCallback, useEffect, useState } from 'react'

const DISMISS_KEY = 'anonbox_pwa_install_dismiss_until'
const DISMISS_DURATION_MS = 3 * 24 * 60 * 60 * 1000

export default function PwaInstallPrompt() {
  const [isOpen, setIsOpen] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const isIosDevice = typeof window !== 'undefined' && /iphone|ipad|ipod/i.test(window.navigator.userAgent)

  const closePrompt = useCallback(() => {
    localStorage.setItem(DISMISS_KEY, String(Date.now() + DISMISS_DURATION_MS))
    setIsOpen(false)
  }, [])

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const result = await deferredPrompt.userChoice

    if (result?.outcome === 'accepted') {
      localStorage.removeItem(DISMISS_KEY)
    } else {
      localStorage.setItem(DISMISS_KEY, String(Date.now() + DISMISS_DURATION_MS))
    }

    setDeferredPrompt(null)
    setIsOpen(false)
  }, [deferredPrompt])

  useEffect(() => {
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true
    if (isStandalone) return

    const dismissUntil = Number(localStorage.getItem(DISMISS_KEY) || '0')
    if (dismissUntil > Date.now()) return

    const ios = /iphone|ipad|ipod/i.test(window.navigator.userAgent)
    let iosTimer = null

    const onBeforeInstallPrompt = (event) => {
      event.preventDefault()
      setDeferredPrompt(event)
      setIsOpen(true)
    }

    const onInstalled = () => {
      localStorage.removeItem(DISMISS_KEY)
      setIsOpen(false)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
    window.addEventListener('appinstalled', onInstalled)

    if (ios) {
      iosTimer = window.setTimeout(() => setIsOpen(true), 0)
    }

    return () => {
      if (iosTimer) window.clearTimeout(iosTimer)
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-x-3 bottom-4 z-[70] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[360px]">
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl">
        <div className="flex items-start gap-3">
          <div className="shrink-0 rounded-xl bg-primary/10 px-2 py-1 text-primary font-black">
            AB
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-text-main-light">Installer AnonBox</p>
            <p className="mt-1 text-xs leading-relaxed text-text-muted-light">
              {isIosDevice
                ? "Ajoutez l'app à l'écran d'accueil via Partager puis Sur l'écran d'accueil."
                : "Installez l'application pour ouvrir directement votre inbox et un accès plus rapide."}
            </p>
          </div>
          <button
            type="button"
            onClick={closePrompt}
            className="shrink-0 rounded-lg px-2 py-1 text-xs font-semibold text-text-muted-light hover:bg-gray-100"
            aria-label="Fermer la suggestion d'installation"
          >
            Fermer
          </button>
        </div>

        {!isIosDevice && deferredPrompt && (
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={handleInstall}
              className="inline-flex items-center rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primary-hover"
            >
              Installer
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
