/**
 * useMessages.js
 * Hooks messages — importe depuis messagesService
 */

import { useState, useCallback } from 'react'
import { messagesService } from '@/lib/services/messagesService'
import { MESSAGE_STATUS } from '@/lib/utils/constants'

// ─────────────────────────────────────────────────────────────────────────────
// useInbox
// ─────────────────────────────────────────────────────────────────────────────
export function useInbox() {
  const [messages, setMessages] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const _load = useCallback(async (filters = {}) => {
    setLoading(true)
    setError(null)
    try {
      const res = await messagesService.fetchInbox(filters)
      // Laravel : { data: [], stats: { total, unread } }
      setMessages(res.data ?? [])
      setTotalCount(res.stats?.total ?? 0)
      setUnreadCount(res.stats?.unread ?? 0)
    } catch (err) {
      setError(err?.message ?? "Erreur lors du chargement de l'inbox")
    } finally {
      setLoading(false)
    }
  }, [])

  const loadInbox = useCallback(() => _load(), [_load])
  const loadUnread = useCallback(() => _load({ status: MESSAGE_STATUS.UNREAD }), [_load])

  return { messages, unreadCount, totalCount, loading, error, loadInbox, loadUnread }
}

// ─────────────────────────────────────────────────────────────────────────────
// useMessageActions
// ─────────────────────────────────────────────────────────────────────────────
export function useMessageActions(onSuccess) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const _run = useCallback(async (fn) => {
    setLoading(true)
    setError(null)
    try {
      const result = await fn()
      onSuccess?.()
      return result
    } catch (err) {
      setError(err?.message ?? 'Une erreur est survenue')
      return null
    } finally {
      setLoading(false)
    }
  }, [onSuccess])

  const markAsRead = useCallback((id) => _run(() => messagesService.markAsRead(id)), [_run])
  const remove = useCallback((id) => _run(() => messagesService.remove(id)), [_run])
  const share = useCallback((id) => _run(() => messagesService.markAsShared(id)), [_run])
  const generateCard = useCallback((id) => _run(() => messagesService.generateCard(id)), [_run])

  return { markAsRead, remove, share, generateCard, loading, error }
}
