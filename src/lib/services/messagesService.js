/**
 * messagesService.js
 * Couche service — importe depuis endpoints.js et expose la logique métier messages
 */

import {
  getInbox,
  markMessageAsRead,
  deleteMessage,
  markMessageAsShared,
  generateCard,
} from '@/lib/api/endpoints'
import { MESSAGE_STATUS } from '@/lib/utils/constants'

export const messagesService = {
  /**
   * Récupère tous les messages de l'inbox
   * @param {Object} filters - { status?: 'read'|'unread', prompt_id?: number }
   */
  fetchInbox: (filters = {}) => getInbox(filters),

  /**
   * Récupère uniquement les messages non lus
   */
  fetchUnread: () => getInbox({ status: MESSAGE_STATUS.UNREAD }),

  /**
   * Marque un message comme lu — PATCH /messages/:id/read
   */
  markAsRead: (id) => markMessageAsRead(id),

  /**
   * Supprime un message — DELETE /messages/:id
   */
  remove: (id) => deleteMessage(id),

  /**
   * Marque un message comme partagé — POST /messages/:id/share
   */
  markAsShared: (id) => markMessageAsShared(id),

  /**
   * Génère une carte image — POST /cards/generate
   * Laravel attend { message_id: number }
   */
  generateCard: (id) => generateCard({ message_id: id }),
}
