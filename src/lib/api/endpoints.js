/**
 * Endpoints API AnonBox
 * Tous les appels API Laravel mappés
 */

import { apiClient } from './client'

// ========================================
// USERS - Gestion des utilisateurs
// ========================================

/**
 * Créer un nouveau profil utilisateur
 * @param {Object} data - { display_name: string }
 * @returns {Promise<Object>} { user_id, handle, display_name, private_token, public_url, inbox_url }
 */
export const createUser = (data) => {
  return apiClient.post('/users', data)
}

/**
 * Récupérer le profil public d'un utilisateur
 * @param {string} handle - Handle unique de l'utilisateur
 * @returns {Promise<Object>} { handle, display_name, prompts: [] }
 */
export const getPublicProfile = (handle) => {
  return apiClient.get(`/users/${handle}`)
}

/**
 * Vérifier la validité d'un token privé
 * @param {string} token - Token privé
 * @returns {Promise<Object>} { valid: boolean, user?: { handle, display_name } }
 */
export const verifyToken = (token) => {
  return apiClient.post('/users/verify-token', { private_token: token })
}

/**
 * Régénérer le token privé
 * (Nécessite X-Private-Token header)
 * @returns {Promise<Object>} { new_private_token, inbox_url }
 */
export const regenerateToken = () => {
  return apiClient.post('/users/regenerate-token')
}

// ========================================
// PROMPTS - Gestion des questions
// ========================================

/**
 * Récupérer un prompt spécifique (PUBLIC)
 * @param {number} id - ID du prompt
 * @returns {Promise<Object>} { id, text, user_handle }
 */
export const getPrompt = (id) => {
  return apiClient.get(`/prompts/${id}`)
}

/**
 * Récupérer tous les prompts d'un utilisateur (PUBLIC)
 * @param {string} handle - Handle de l'utilisateur
 * @returns {Promise<Object>} { prompts: [] }
 */
export const getUserPrompts = (handle) => {
  return apiClient.get(`/users/${handle}/prompts`)
}

/**
 * Incrémenter le compteur de partage d'un prompt (PUBLIC)
 * @param {number} id - ID du prompt
 * @returns {Promise<Object>} { share_count }
 */
export const incrementPromptShare = (id) => {
  return apiClient.post(`/prompts/${id}/share`)
}

/**
 * Créer un nouveau prompt
 * (Nécessite X-Private-Token header)
 * @param {Object} data - { text: string }
 * @returns {Promise<Object>} { id, text, share_count, share_url }
 */
export const createPrompt = (data) => {
  return apiClient.post('/prompts', data)
}

/**
 * Supprimer un prompt
 * (Nécessite X-Private-Token header)
 * @param {number} id - ID du prompt
 * @returns {Promise<Object>} { message: 'Prompt deleted' }
 */
export const deletePrompt = (id) => {
  return apiClient.delete(`/prompts/${id}`)
}

// ========================================
// MESSAGES - Gestion des messages
// ========================================

/**
 * Envoyer un message anonyme (PUBLIC)
 * @param {Object} data - { user_handle: string, prompt_id?: number, content: string }
 * @returns {Promise<Object>} { message: 'Message sent', message_id }
 */
export const sendMessage = (data) => {
  return apiClient.post('/messages', data)
}

/**
 * Récupérer tous les messages de l'inbox
 * (Nécessite X-Private-Token header)
 * @param {Object} filters - { status?: 'read'|'unread', prompt_id?: number }
 * @returns {Promise<Object>} { messages: [], unread_count, total_count }
 */
export const getInbox = (filters = {}) => {
  const queryParams = new URLSearchParams()

  if (filters.status) {
    queryParams.append('status', filters.status)
  }
  if (filters.prompt_id) {
    queryParams.append('prompt_id', filters.prompt_id)
  }

  const queryString = queryParams.toString()
  const endpoint = queryString ? `/inbox?${queryString}` : '/inbox'

  return apiClient.get(endpoint)
}

/**
 * Marquer un message comme lu
 * (Nécessite X-Private-Token header)
 * @param {number} id - ID du message
 * @returns {Promise<Object>} { message: 'Message marked as read' }
 */
export const markMessageAsRead = (id) => {
  return apiClient.patch(`/messages/${id}/read`)
}

/**
 * Répondre à un message
 * (Nécessite X-Private-Token header)
 * @param {number} id - ID du message
 * @param {Object} data - { response_text: string }
 * @returns {Promise<Object>} { message: 'Response saved', card_url?: string }
 */
export const respondToMessage = (id, data) => {
  return apiClient.post(`/messages/${id}/respond`, data)
}

/**
 * Supprimer un message
 * (Nécessite X-Private-Token header)
 * @param {number} id - ID du message
 * @returns {Promise<Object>} { message: 'Message deleted' }
 */
export const deleteMessage = (id) => {
  return apiClient.delete(`/messages/${id}`)
}

/**
 * Marquer un message comme partagé
 * (Nécessite X-Private-Token header)
 * @param {number} id - ID du message
 * @returns {Promise<Object>} { message: 'Message marked as shared' }
 */
export const markMessageAsShared = (id) => {
  return apiClient.post(`/messages/${id}/share`)
}

// ========================================
// CARDS - Génération d'images
// ========================================

/**
 * Générer une carte de réponse (image PNG/JPG)
 * (Nécessite X-Private-Token header)
 * @param {Object} data - { message_id: number }
 * @returns {Promise<Object>} { image_url: string, filename: string }
 */
export const generateCard = (data) => {
  return apiClient.post('/cards/generate', data)
}

/**
 * Télécharger une carte générée (fichier binaire)
 * @param {string} filename - Nom du fichier
 * @returns {Promise<Blob>} Blob de l'image
 */
export const downloadCard = (filename) => {
  return apiClient.download(`/cards/download/${filename}`)
}

/**
 * Nettoyer les anciennes cartes
 * (Nécessite X-Private-Token header - À déplacer dans une CRON)
 * @returns {Promise<Object>} { deleted_count }
 */
export const cleanupCards = () => {
  return apiClient.delete('/cards/cleanup')
}

// ========================================
// HEALTH CHECK
// ========================================

/**
 * Vérifier le statut de l'API
 * @returns {Promise<Object>} { status: 'ok', timestamp, version }
 */
export const checkHealth = () => {
  return apiClient.get('/health')
}