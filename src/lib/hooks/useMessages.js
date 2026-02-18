/**
 * Hook React pour la gestion des messages AnonBox
 * Utilisable dans :
 * - La page publique (envoi anonyme)
 * - L'inbox privée (lecture, réponse, suppression)
 */

import { useState, useCallback } from 'react'
import {
  sendAnonymousMessage,
  fetchInbox,
  fetchUnreadMessages,
  readMessage,
  replyToMessage,
  removeMessage,
  shareMessage,
  generateAndDownloadCard,
} from '../services/messageService'

// ========================================
// Hook : envoi de message anonyme (PUBLIC)
// ========================================

/**
 * Hook pour envoyer un message anonyme depuis la page publique
 * @returns {{ send, loading, success, error, reset }}
 */
export function useSendMessage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const reset = useCallback(() => {
    setSuccess(false)
    setError(null)
  }, [])

  /**
   * @param {string} userHandle
   * @param {string} content
   * @param {number|null} promptId
   */
  const send = useCallback(async (userHandle, content, promptId = null) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      await sendAnonymousMessage(userHandle, content, promptId)
      setSuccess(true)
    } catch (err) {
      setError(err.message || 'Une erreur est survenue.')
    } finally {
      setLoading(false)
    }
  }, [])

  return { send, loading, success, error, reset }
}

// ========================================
// Hook : inbox (PRIVÉ)
// ========================================

/**
 * Hook pour charger et gérer l'inbox
 * @returns {{ messages, unreadCount, totalCount, loading, error, loadInbox, loadUnread }}
 */
export function useInbox() {
  const [messages, setMessages] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const _fetch = useCallback(async (fetchFn) => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchFn()
      setMessages(data.messages || [])
      setUnreadCount(data.unread_count ?? 0)
      setTotalCount(data.total_count ?? 0)
    } catch (err) {
      setError(err.message || 'Impossible de charger les messages.')
    } finally {
      setLoading(false)
    }
  }, [])

  const loadInbox = useCallback((filters = {}) => {
    return _fetch(() => fetchInbox(filters))
  }, [_fetch])

  const loadUnread = useCallback(() => {
    return _fetch(fetchUnreadMessages)
  }, [_fetch])

  return { messages, unreadCount, totalCount, loading, error, loadInbox, loadUnread }
}

// ========================================
// Hook : actions sur un message (PRIVÉ)
// ========================================

/**
 * Hook pour effectuer des actions sur un message individuel
 * @param {Function} onSuccess - Callback après une action réussie (ex: reload inbox)
 * @returns {{ markAsRead, reply, remove, share, generateCard, loading, error }}
 */
export function useMessageActions(onSuccess) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const _run = useCallback(async (actionFn) => {
    setLoading(true)
    setError(null)
    try {
      const result = await actionFn()
      if (onSuccess) onSuccess()
      return result
    } catch (err) {
      setError(err.message || 'Une erreur est survenue.')
      return null
    } finally {
      setLoading(false)
    }
  }, [onSuccess])

  const markAsRead = useCallback((messageId) => {
    return _run(() => readMessage(messageId))
  }, [_run])

  const reply = useCallback((messageId, responseText) => {
    return _run(() => replyToMessage(messageId, responseText))
  }, [_run])

  const remove = useCallback((messageId) => {
    return _run(() => removeMessage(messageId))
  }, [_run])

  const share = useCallback((messageId) => {
    return _run(() => shareMessage(messageId))
  }, [_run])

  /**
   * Générer une carte et retourner { filename, blobUrl }
   * @param {number} messageId
   * @returns {Promise<{ filename: string, blobUrl: string }|null>}
   */
  const generateCard = useCallback((messageId) => {
    return _run(() => generateAndDownloadCard(messageId))
  }, [_run])

  return { markAsRead, reply, remove, share, generateCard, loading, error }
}