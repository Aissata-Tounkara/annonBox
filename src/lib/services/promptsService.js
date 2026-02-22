/**
 * promptsService.js
 * Couche service — importe depuis endpoints.js et expose la logique métier prompts
 */

import {
    getUserPrompts,
    createPrompt,
    deletePrompt,
    incrementPromptShare,
} from '@/lib/api/endpoints'

export const promptsService = {
    /**
     * Récupère tous les prompts actifs d'un utilisateur (PUBLIC)
     * GET /users/:handle/prompts
     */
    fetchByHandle: (handle) => getUserPrompts(handle),

    /**
     * Crée un nouveau prompt (PRIVÉ)
     * POST /prompts — Laravel attend { question_text: string } (StorePromptRequest)
     */
    create: (text) => createPrompt({ question_text: text }),

    /**
     * Supprime un prompt (PRIVÉ)
     * DELETE /prompts/:id
     */
    remove: (id) => deletePrompt(id),

    /**
     * Incrémente le compteur de partage (PUBLIC)
     * POST /prompts/:id/share
     */
    incrementShare: (id) => incrementPromptShare(id),
}