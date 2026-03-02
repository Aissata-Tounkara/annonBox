"use client";

import { Loader2, Trash2, Copy, Check, Plus, X, ChevronDown, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/lib/utils/constants";

/**
 * SidebarPanel
 *
 * Props :
 * - stats          : { totalCount, unreadCount }
 * - prompts        : Prompt[]
 * - promptsLoading : boolean
 * - promptsError   : string | null
 * - promptInput    : string
 * - setPromptInput : (v: string) => void
 * - showPromptForm : boolean
 * - setShowPromptForm : (v: boolean) => void
 * - sharePromptId  : number | null
 * - setSharePromptId : (id: number | null) => void
 * - selectedPrompt : Prompt | undefined
 * - copiedLink     : boolean
 * - userHandle     : string
 * - onAddPrompt    : () => void
 * - onRemovePrompt : (id: number) => void
 * - onCopyLink     : () => void
 * - onPickRandom   : () => void
 * - onOpenShareCard: () => void
 * - onShareInstagramCard: () => void
 * - onShareWhatsAppCard : () => void
 * - onShareFacebookCard : () => void
 */
export default function SidebarPanel({
  stats,
  prompts,
  promptsLoading,
  promptsError,
  promptInput,
  setPromptInput,
  showPromptForm,
  setShowPromptForm,
  sharePromptId,
  setSharePromptId,
  selectedPrompt,
  copiedLink,
  userHandle,
  onAddPrompt,
  onRemovePrompt,
  onCopyLink,
  onPickRandom,
  onOpenShareCard,
  onShareInstagramCard,
  onShareWhatsAppCard,
  onShareFacebookCard,
}) {
  const { totalCount, unreadCount } = stats;

  return (
    <div className="space-y-5">

      {/* ── STATS ── */}
      <Card className="rounded-2xl">
        <CardContent className="pt-5">
          <p className="text-xs uppercase font-bold text-text-muted-light">Total Reçus</p>
          <p className="text-3xl font-black mt-1">{totalCount}</p>
          {unreadCount > 0 && (
            <p className="text-xs text-primary font-semibold mt-1">{unreadCount} non lu(s)</p>
          )}
        </CardContent>
      </Card>

      {/* ── SHARE PANEL ── */}
      <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 space-y-4">
        <h3 className="font-black text-lg">Partager ma page</h3>
        <p className="text-sm text-text-muted-light">Obtenez plus de messages anonymes !</p>

        {/* Question */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm">Votre question</span>
            <button
              onClick={() => setShowPromptForm((v) => !v)}
              className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition"
            >
              {showPromptForm ? <X size={12} /> : <Plus size={12} />}
            </button>
          </div>

          {/* Formulaire création */}
          {showPromptForm && (
            <div className="space-y-2">
              <textarea
                rows="2"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="Écrivez votre propre question ici"
                className="w-full bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              />
              <button
                onClick={onPickRandom}
                className="text-sm font-bold text-text-muted-light hover:text-primary transition"
              >
                ✨ Générer une question aléatoire
              </button>
              <Button
                onClick={onAddPrompt}
                disabled={!promptInput.trim() || promptsLoading}
                className="w-full text-sm"
              >
                {promptsLoading && <Loader2 size={13} className="animate-spin mr-1" />}
                Créer la question
              </Button>
            </div>
          )}

          {promptsError && (
            <p className="text-xs text-red-500 font-semibold">{promptsError}</p>
          )}

          {/* Liste des prompts */}
          {promptsLoading && prompts.length === 0 ? (
            <div className="flex justify-center py-2">
              <Loader2 size={16} className="animate-spin text-primary" />
            </div>
          ) : prompts.length > 0 && (
            <div className="space-y-2">

              {/* Sélecteur */}
              <div className="relative">
                <select
                  value={sharePromptId ?? ""}
                  onChange={(e) => setSharePromptId(Number(e.target.value) || null)}
                  className="w-full appearance-none bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-xs font-bold pr-7 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">Ma page publique</option>
                  {prompts.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.question_text.length > 38
                        ? p.question_text.slice(0, 38) + "…"
                        : p.question_text}
                    </option>
                  ))}
                </select>
                <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted-light pointer-events-none" />
              </div>

              {/* Liste cliquable */}
              <ul className="space-y-1.5 max-h-40 overflow-y-auto">
                {prompts.map((p) => (
                  <li
                    key={p.id}
                    onClick={() => setSharePromptId(p.id)}
                    className={`flex items-start justify-between gap-2 rounded-xl px-3 py-2 border text-xs cursor-pointer transition ${
                      p.id === sharePromptId
                        ? "border-primary bg-primary/5 text-primary font-bold"
                        : "border-gray-100 dark:border-gray-700 font-semibold hover:border-primary/40"
                    }`}
                  >
                    <span className="line-clamp-2 flex-1">{p.question_text}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); onRemovePrompt(p.id); }}
                      className="shrink-0 text-text-muted-light hover:text-red-500 transition mt-0.5"
                      title="Supprimer"
                    >
                      <Trash2 size={11} />
                    </button>
                  </li>
                ))}
              </ul>

              {/* Copier le lien */}
              <div className="flex items-center gap-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2">
                <span className="text-xs font-bold text-text-muted-light truncate flex-1">
                  {selectedPrompt
                    ? selectedPrompt.question_text.slice(0, 22) + "…"
                    : userHandle ? ROUTES.PUBLIC_PROFILE(userHandle) : ROUTES.HOME}
                </span>
                <button
                  onClick={onCopyLink}
                  className="shrink-0 text-primary hover:text-primary/80 transition"
                  title="Copier le lien"
                >
                  {copiedLink ? <Check size={13} /> : <Copy size={13} />}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* CTA carte image */}
        <Button
          onClick={onOpenShareCard}
          className="w-full font-bold text-sm rounded-xl py-3 flex items-center justify-center gap-2"
        >
          <ImageIcon size={15} />
          Créer une carte à partager
        </Button>

        {/* Instagram */}
        <Button variant="instagram" className="w-full" onClick={onShareInstagramCard}>
          Partager sur Instagram
        </Button>

        {/* WhatsApp + Facebook */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="whatsapp"
            className="w-full rounded-xl py-2.5 text-xs"
            onClick={onShareWhatsAppCard}
          >
            WhatsApp
          </Button>
          <Button variant="facebook" onClick={onShareFacebookCard}>
            Facebook
          </Button>
        </div>
      </div>

      {/* ── SECURITY ── */}
      <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 space-y-3">
        <p className="text-xs uppercase font-bold text-text-muted-light">Sécurité du lien</p>
        <Button
          variant="dangerSoft"
          size="sm"
          className="w-full py-2.5 rounded-xl bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 font-bold text-sm hover:opacity-90 transition"
        >
          Régénérer mon lien
        </Button>
        <p className="text-xs text-text-muted-light opacity-70 leading-relaxed">
          ⚠️ L'ancien lien sera immédiatement invalidé.
        </p>
      </div>

    </div>
  );
}
