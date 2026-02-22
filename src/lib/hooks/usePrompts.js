/**
 * usePrompts.js
 * Hook prompts — importe depuis promptsService
 */

import { useState, useCallback } from 'react'
import { promptsService } from '@/lib/services/promptsService'

const RANDOM_QUESTIONS = [
    "Quelle est la chose que tu n'oserais jamais me dire en face ?",
    "Quel est ton souvenir préféré avec moi ?",
    "Si tu pouvais changer une chose chez moi, ce serait quoi ?",
    "Quelle est ta plus grande peur secrète ?",
    "Qu'est-ce que tu penses vraiment de moi ?",
    "Quel conseil tu me donnerais anonymement ?",
    "Quelle est la chose la plus folle que tu aies jamais faite ?",
    "Si on pouvait partir en voyage ensemble, où irais-tu ?",
    "Qu'est-ce qui te rend heureux(se) en ce moment ?",
    "Quelle question tu aurais aimé qu'on te pose ?",
]

export function usePrompts(handle) {
    const [prompts, setPrompts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [randomQuestion, setRandomQuestion] = useState('')

    // ─── Chargement ────────────────────────────────────────────────────────
    const loadPrompts = useCallback(async () => {
        if (!handle) return
        setLoading(true)
        setError(null)
        try {
            const res = await promptsService.fetchByHandle(handle)
            setPrompts(res.data ?? [])
        } catch (err) {
            setError(err?.message ?? 'Erreur lors du chargement des questions')
        } finally {
            setLoading(false)
        }
    }, [handle])

    // ─── Création ──────────────────────────────────────────────────────────
    const addPrompt = useCallback(async (questionText) => {
        if (!questionText?.trim()) return null
        setLoading(true)
        setError(null)
        try {
            const res = await promptsService.create(questionText.trim())
            const newPrompt = res.data
            setPrompts((prev) => [newPrompt, ...prev])
            return newPrompt
        } catch (err) {
            setError(err?.message ?? 'Erreur lors de la création de la question')
            return null
        } finally {
            setLoading(false)
        }
    }, [])

    // ─── Suppression ───────────────────────────────────────────────────────
    const removePrompt = useCallback(async (id) => {
        setError(null)
        try {
            await promptsService.remove(id)
            setPrompts((prev) => prev.filter((p) => p.id !== id))
        } catch (err) {
            setError(err?.message ?? 'Erreur lors de la suppression')
        }
    }, [])

    // ─── Partage ───────────────────────────────────────────────────────────
    const sharePrompt = useCallback(async (id) => {
        try {
            await promptsService.incrementShare(id)
            setPrompts((prev) =>
                prev.map((p) =>
                    p.id === id
                        ? { ...p, stats: { ...p.stats, times_shared: (p.stats?.times_shared ?? 0) + 1 } }
                        : p
                )
            )
        } catch {
            // silencieux : cosmétique
        }
    }, [])

    // ─── Question aléatoire ────────────────────────────────────────────────
    const pickRandomQuestion = useCallback(() => {
        const pick = RANDOM_QUESTIONS[Math.floor(Math.random() * RANDOM_QUESTIONS.length)]
        setRandomQuestion(pick)
    }, [])

    return {
        prompts,
        loading,
        error,
        loadPrompts,
        addPrompt,
        removePrompt,
        sharePrompt,
        randomQuestion,
        pickRandomQuestion,
    }
}