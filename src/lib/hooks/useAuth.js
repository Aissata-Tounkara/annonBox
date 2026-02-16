"use client"

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { authService } from '@/lib/services/authService'

export function useAuth() {
  const router = useRouter()

  const [user, setUser] = useState(null)
  const [privateToken, setPrivateToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // ─── Init : restaurer la session depuis localStorage ─────────────────────
  useEffect(() => {
    const { private_token, handle, display_name } = authService.getStoredSession()

    if (private_token && handle) {
      setPrivateToken(private_token)
      setUser({ handle, display_name })
    }

    setIsLoading(false)
  }, [])

  // ─── Création de compte ───────────────────────────────────────────────────
  const register = useCallback(async (display_name) => {
    setIsLoading(true)
    setError(null)

    try {
      const { user: newUser, private_token } = await authService.register({ display_name })

      setUser(newUser)
      setPrivateToken(private_token)

      // ✅ Chemin corrigé : /save (et non /save-access)
      router.push(
        `/save?token=${encodeURIComponent(private_token)}&handle=${encodeURIComponent(newUser.handle)}`
      )
    } catch (err) {
      setError(err.message || 'Une erreur est survenue lors de la création.')
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [router])

  // ─── Login via token ──────────────────────────────────────────────────────
  const loginWithToken = useCallback(async (token) => {
    setIsLoading(true)
    setError(null)

    try {
      const { user: loggedUser } = await authService.loginWithToken(token)

      setUser(loggedUser)
      setPrivateToken(token)

      router.push(`/inbox/${token}`)
      return loggedUser
    } catch (err) {
      setError(err.message || 'Token invalide ou expiré.')
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [router])

  // ─── Vérification silencieuse (guard pour pages privées) ─────────────────
  const verifySession = useCallback(async (token) => {
    setIsLoading(true)
    setError(null)

    try {
      const { user: verifiedUser, unread_count } = await authService.loginWithToken(token)
      setUser(verifiedUser)
      setPrivateToken(token)
      return { user: verifiedUser, unread_count }
    } catch (err) {
      authService.logout()
      setUser(null)
      setPrivateToken(null)
      router.push('/')
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [router])

  // ─── Déconnexion ─────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    authService.logout()
    setUser(null)
    setPrivateToken(null)
    router.push('/')
  }, [router])

  return {
    user,
    privateToken,
    isLoading,
    error,
    isAuthenticated: !!privateToken,
    register,
    loginWithToken,
    verifySession,
    logout,
  }
}