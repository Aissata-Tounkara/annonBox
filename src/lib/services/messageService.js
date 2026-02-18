/**
 * Service métier pour les messages AnonBox
 * Couche d'abstraction entre les hooks et les endpoints API
 */

import {
  sendMessage,
  getInbox,
  markMessageAsRead,
  respondToMessage,
  deleteMessage,
  markMessageAsShared,
  generateCard,
  downloadCard,
} from '../api/endpoints'

// ========================================
// ENVOI DE MESSAGE (PUBLIC)
// ========================================

/**
 * Envoyer un message anonyme à un utilisateur
 * @param {string} userHandle - Handle du destinataire
 * @param {string} content - Contenu du message
 * @param {number|null} promptId - ID du prompt associé (optionnel)
 * @returns {Promise<Object>} { message: 'Message sent', message_id }
 */
export const sendAnonymousMessage = async (userHandle, content, promptId = null) => {
  const payload = {
    user_handle: userHandle,
    content,
  }

  if (promptId) {
    payload.prompt_id = promptId
  }

  return sendMessage(payload)
}

// ========================================
// INBOX (PRIVÉ)
// ========================================

/**
 * Récupérer tous les messages de l'inbox
 * @param {Object} filters - { status?: 'read'|'unread', prompt_id?: number }
 * @returns {Promise<Object>} { messages, unread_count, total_count }
 */
export const fetchInbox = async (filters = {}) => {
  return getInbox(filters)
}

/**
 * Récupérer uniquement les messages non lus
 * @returns {Promise<Object>} { messages, unread_count, total_count }
 */
export const fetchUnreadMessages = async () => {
  return getInbox({ status: 'unread' })
}

/**
 * Récupérer les messages liés à un prompt spécifique
 * @param {number} promptId
 * @returns {Promise<Object>} { messages, unread_count, total_count }
 */
export const fetchMessagesByPrompt = async (promptId) => {
  return getInbox({ prompt_id: promptId })
}

// ========================================
// ACTIONS SUR UN MESSAGE (PRIVÉ)
// ========================================

/**
 * Marquer un message comme lu
 * @param {number} messageId
 * @returns {Promise<Object>}
 */
export const readMessage = async (messageId) => {
  return markMessageAsRead(messageId)
}

/**
 * Répondre à un message
 * @param {number} messageId
 * @param {string} responseText
 * @returns {Promise<Object>} { message: 'Response saved', card_url? }
 */
export const replyToMessage = async (messageId, responseText) => {
  return respondToMessage(messageId, { response_text: responseText })
}

/**
 * Supprimer un message
 * @param {number} messageId
 * @returns {Promise<Object>}
 */
export const removeMessage = async (messageId) => {
  return deleteMessage(messageId)
}

/**
 * Marquer un message comme partagé
 * @param {number} messageId
 * @returns {Promise<Object>}
 */
export const shareMessage = async (messageId) => {
  return markMessageAsShared(messageId)
}

// ========================================
// CARTES (PRIVÉ)
// ========================================

/**
 * Générer une carte image pour un message
 * @param {number} messageId
 * @returns {Promise<Object>} { image_url, filename }
 */
export const createCard = async (messageId) => {
  return generateCard({ message_id: messageId })
}

/**
 * Télécharger une carte et retourner une URL locale (blob URL)
 * @param {string} filename
 * @returns {Promise<string>} URL blob locale
 */
export const getCardBlobUrl = async (filename) => {
  const blob = await downloadCard(filename)
  return URL.createObjectURL(blob)
}

/**
 * Générer et télécharger une carte en une seule opération
 * @param {number} messageId
 * @returns {Promise<{ filename: string, blobUrl: string }>}
 */
export const generateAndDownloadCard = async (messageId) => {
  const { filename } = await createCard(messageId)
  const blobUrl = await getCardBlobUrl(filename)
  return { filename, blobUrl }
}