/**
 * Client API centralisé pour AnonBox
 * Gère :
 * - Authentification via X-Private-Token (pas de Bearer)
 * - Requêtes JSON (GET, POST, PATCH, DELETE)
 * - Téléchargements de fichiers binaires (cartes PNG/JPG)
 * - Gestion centralisée des erreurs
 */

import { API_URL, STORAGE_KEYS, MESSAGES } from '../utils/constants'

class ApiClient {
  constructor() {
    this.baseURL = API_URL
  }

  /**
   * Récupérer le private token depuis localStorage (client-side only)
   */
  getPrivateToken() {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(STORAGE_KEYS.PRIVATE_TOKEN)
  }

  /**
   * Headers par défaut pour requêtes JSON
   */
  getJsonHeaders(customHeaders = {}) {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...customHeaders,
    }

    // Ajouter le token privé si disponible (pour routes protégées)
    const token = this.getPrivateToken()
    if (token) {
      headers['X-Private-Token'] = token
    }

    return headers
  }

  /**
   * Headers pour téléchargements (sans Content-Type)
   */
  getDownloadHeaders(customHeaders = {}) {
    const headers = { ...customHeaders }

    const token = this.getPrivateToken()
    if (token) {
      headers['X-Private-Token'] = token
    }

    return headers
  }

  /**
   * Gestion centralisée des réponses JSON/texte
   */
  async handleJsonResponse(response) {
    const contentType = response.headers.get('content-type')
    const isJson = contentType?.includes('application/json')

    let data
    try {
      data = isJson ? await response.json() : await response.text()
    } catch {
      data = null
    }

    if (!response.ok) {
      const error = {
        status: response.status,
        message: MESSAGES.ERROR.SERVER,
        errors: {},
      }

      if (isJson && data && typeof data === 'object') {
        error.message = data.message || error.message
        error.errors = data.errors || {}
      }

      switch (response.status) {
        case 401:
          error.message = MESSAGES.ERROR.UNAUTHORIZED
          error.code = 'UNAUTHORIZED'
          // Token invalide → nettoyer le localStorage
          if (typeof window !== 'undefined') {
            localStorage.removeItem(STORAGE_KEYS.PRIVATE_TOKEN)
            localStorage.removeItem(STORAGE_KEYS.USER_HANDLE)
            localStorage.removeItem(STORAGE_KEYS.DISPLAY_NAME)
          }
          break
        case 403:
          error.message = MESSAGES.ERROR.FORBIDDEN
          error.code = 'FORBIDDEN'
          break
        case 404:
          error.message = MESSAGES.ERROR.NOT_FOUND
          error.code = 'NOT_FOUND'
          break
        case 422:
          error.message = MESSAGES.ERROR.VALIDATION
          error.code = 'VALIDATION_ERROR'
          break
        case 429:
          error.message = MESSAGES.ERROR.RATE_LIMIT
          error.code = 'RATE_LIMIT'
          break
        case 500:
          error.message = MESSAGES.ERROR.SERVER
          error.code = 'SERVER_ERROR'
          break
      }

      throw error
    }

    return data
  }

  // ==============
  // Méthodes JSON
  // ==============

  async get(endpoint, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'GET',
        headers: this.getJsonHeaders(options.headers),
        ...options,
      })
      return await this.handleJsonResponse(response)
    } catch (error) {
      if (error.status) throw error
      throw { message: MESSAGES.ERROR.NETWORK, isNetworkError: true }
    }
  }

  async post(endpoint, data, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: this.getJsonHeaders(options.headers),
        body: JSON.stringify(data),
        ...options,
      })
      return await this.handleJsonResponse(response)
    } catch (error) {
      if (error.status) throw error
      throw { message: MESSAGES.ERROR.NETWORK, isNetworkError: true }
    }
  }

  async patch(endpoint, data, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PATCH',
        headers: this.getJsonHeaders(options.headers),
        body: JSON.stringify(data),
        ...options,
      })
      return await this.handleJsonResponse(response)
    } catch (error) {
      if (error.status) throw error
      throw { message: MESSAGES.ERROR.NETWORK, isNetworkError: true }
    }
  }

  async delete(endpoint, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'DELETE',
        headers: this.getJsonHeaders(options.headers),
        ...options,
      })
      return await this.handleJsonResponse(response)
    } catch (error) {
      if (error.status) throw error
      throw { message: MESSAGES.ERROR.NETWORK, isNetworkError: true }
    }
  }

  // ===================
  // Téléchargement de fichiers (cartes PNG/JPG)
  // ===================

  /**
   * Télécharge un fichier binaire (ne retourne PAS du JSON)
   * @returns {Promise<Blob>}
   */
  async download(endpoint, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'GET',
        headers: this.getDownloadHeaders(options.headers),
        ...options,
      })

      if (!response.ok) {
        // Essayer de lire l'erreur en JSON si possible
        let message = MESSAGES.ERROR.DOWNLOAD_FAILED
        try {
          const errorData = await response.json()
          message = errorData.message || message
        } catch {
          // Ignorer si pas du JSON
        }
        throw { status: response.status, message }
      }

      return await response.blob()
    } catch (error) {
      if (error.status) throw error
      throw { message: MESSAGES.ERROR.NETWORK, isNetworkError: true }
    }
  }
}

// Export singleton
export const apiClient = new ApiClient()