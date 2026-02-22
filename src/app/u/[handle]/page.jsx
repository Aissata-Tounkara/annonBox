"use client";

/**
 * app/u/[handle]/page.jsx
 *
 * Style identique à Home.jsx.
 * Affiche la question du prompt exactement comme la Blade :
 *   @if($prompt) → "{displayName} demande : {question_text}"
 *   @else        → "Envoyer un message anonyme à {displayName}"
 *
 * StoreMessageRequest attend :
 *   user_id           (required|exists:users,id)
 *   anonymous_content (required|string|min:1|max:1000)
 *   prompt_id         (nullable|exists:prompts,id)
 */

import { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Send, Lock, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import AppHeader from "@/components/layout/AppHeader";
import AppFooter from "@/components/layout/AppFooter";
import { API_URL, LIMITS, MESSAGES, ROUTES } from "@/lib/utils/constants";

/* ── Fetch simple sans apiClient pour éviter tout problème de headers auth ── */
async function get(path) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const err = new Error(data?.message ?? `HTTP ${res.status}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

async function post(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const err = new Error(data?.message ?? `HTTP ${res.status}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

/* ─────────────────────────────────────────────────────────────────────────── */
export default function PublicProfilePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const handle = params?.handle;
  const promptId = searchParams?.get("q");

  const [user, setUser] = useState(null);   // { id, display_name, handle, … }
  const [prompt, setPrompt] = useState(null);   // { id, question_text, … } | null
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState(null);

  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState(null);

  const textareaRef = useRef(null);
  const MAX = LIMITS.MESSAGE_MAX_LENGTH;

  /* ── Chargement ─────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!handle) return;

    (async () => {
      setLoading(true);
      try {
        // GET /api/users/:handle → { data: { id, display_name, handle, … } }
        const userRes = await get(`/users/${handle}`);
        // Support { data: … } ou réponse plate
        const userData = userRes?.data ?? userRes;
        setUser(userData);

        if (promptId) {
          try {
            // GET /api/prompts/:id → { data: { id, question_text, user_id, … } }
            const promptRes = await get(`/prompts/${promptId}`);
            const promptData = promptRes?.data ?? promptRes;
            // On vérifie que question_text existe (prompt non supprimé)
            if (promptData?.question_text) {
              setPrompt(promptData);
            }
          } catch {
            // Prompt supprimé (404) → formulaire libre, pas d'erreur affichée
            setPrompt(null);
          }
        }
      } catch (e) {
        setPageError(
          e?.status === 404
            ? MESSAGES.ERROR.PROFILE_NOT_FOUND
            : "Impossible de charger ce profil."
        );
      } finally {
        setLoading(false);
      }
    })();
  }, [handle, promptId]);

  /* ── Envoi ───────────────────────────────────────────────────────────────── */
  const handleSend = async () => {
    if (!message.trim() || sending || !user?.id) return;
    setSending(true);
    setSendError(null);

    try {
      // POST /api/messages — champs exacts de StoreMessageRequest
      await post("/messages", {
        user_id: user.id,           // required|exists:users,id
        anonymous_content: message.trim(),     // required|string|min:1|max:1000
        ...(prompt?.id ? { prompt_id: prompt.id } : {}), // nullable|exists:prompts,id
      });
      setSent(true);
    } catch (e) {
      const d = e?.data ?? null;
      const msg = d?.errors
        ? Object.values(d.errors).flat()[0]   // erreur de validation Laravel (422)
        : (d?.message ?? "Erreur lors de l'envoi. Réessaie !");
      setSendError(msg);
    } finally {
      setSending(false);
    }
  };

  const handleChange = (e) => { if (e.target.value.length <= MAX) setMessage(e.target.value); };
  const handleKeyDown = (e) => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleSend(); };
  const handleAgain = () => {
    setSent(false); setMessage(""); setSendError(null);
    setTimeout(() => textareaRef.current?.focus(), 80);
  };

  /* ── États globaux ───────────────────────────────────────────────────────── */
  if (loading) return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark items-center justify-center gap-4">
      <Loader2 size={36} className="animate-spin text-primary" />
      <p className="text-text-muted-light font-semibold text-sm">Chargement…</p>
    </div>
  );

  if (pageError) return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark items-center justify-center px-4 gap-4 text-center">
      <p className="text-6xl">😶‍🌫️</p>
      <p className="font-black text-2xl">{pageError}</p>
      <p className="text-text-muted-light text-sm">Vérifie le lien et réessaie.</p>
      <Link href={ROUTES.HOME} className="text-primary font-bold hover:underline text-sm mt-2">← Retour à l'accueil</Link>
    </div>
  );

  const displayName = user?.display_name || `@${handle}`;

  /* ── Render ──────────────────────────────────────────────────────────────── */
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">

      <AppHeader
        variant="default"
        rightSlot={(
          <Link
            href={ROUTES.HOME}
            className="flex items-center gap-1.5 text-sm font-bold text-primary hover:opacity-80 transition-opacity"
          >
            Créer mon AnonBox <ArrowRight size={15} />
          </Link>
        )}
      />

      {/* ── MAIN ─────────────────────────────────────────────────────────────── */}
      <main className="grow flex items-center justify-center p-4 relative">
        {/* Halo — même que Home */}
        <div className="absolute w-200 h-200 bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-xl border border-surface-light dark:border-gray-800 p-10">

            {/* Avatar + nom */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-primary to-secondary text-white shadow-lg shadow-primary/20 mb-4">
                <span className="font-black text-2xl">
                  {(displayName[0] ?? "?").toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-text-muted-light font-medium mb-1">@{handle}</p>

              {/* ── Titre selon prompt — MÊME logique que la Blade ── */}
              {prompt?.question_text ? (
                <>
                  <h1 className="text-2xl font-black tracking-tight mb-3">
                    {displayName} demande :
                  </h1>
                  <div className="p-4 bg-primary/5 border border-primary/15 rounded-xl">
                    <p className="font-black text-lg leading-snug text-left">
                      "{prompt.question_text}"
                    </p>
                  </div>
                </>
              ) : (
                <h1 className="text-2xl font-black tracking-tight">
                  Envoyer un message anonyme à{" "}
                  <span className="text-primary">{displayName}</span>
                </h1>
              )}
            </div>

            {/* ── Formulaire ou confirmation ── */}
            {!sent ? (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold mb-2 ml-1">
                    {prompt?.question_text ? "Ta réponse" : "Ton message"}
                  </label>
                  <div className="relative">
                    <textarea
                      ref={textareaRef}
                      rows={5}
                      value={message}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                      placeholder={
                        prompt?.question_text
                          ? "Tape ta réponse ici…"
                          : "Dis-moi n'importe quoi..."
                      }
                      autoFocus
                      className="w-full rounded-2xl bg-gray-100 dark:bg-background-dark border border-transparent dark:border-gray-700 px-5 py-4 text-base font-medium resize-none focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all duration-200"
                      style={{ lineHeight: "1.7" }}
                    />
                    <span
                      className="absolute bottom-3 right-4 text-xs font-bold tabular-nums text-text-muted-light"
                      style={{ opacity: message.length > MAX * 0.8 ? 1 : 0.35 }}
                    >
                      {message.length}/{MAX}
                    </span>
                  </div>

                  {sendError && (
                    <p className="mt-2 ml-1 text-sm text-red-500 font-medium">{sendError}</p>
                  )}
                </div>

                {/* Bouton — même style que Home "Générer mon lien" */}
                <button
                  onClick={handleSend}
                  disabled={!message.trim() || sending}
                  className="w-full h-14 rounded-2xl text-lg font-bold text-white flex items-center justify-center gap-2.5 shadow-lg shadow-primary/30 transition-all duration-200 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    background: "linear-gradient(135deg, var(--color-primary, #7c3aed), var(--color-secondary, #a855f7))",
                  }}
                >
                  {sending
                    ? <><Loader2 size={20} className="animate-spin" /> Envoi en cours…</>
                    : <><Send size={20} /> Envoyer anonymement</>
                  }
                </button>

                <p className="text-center text-text-muted-light text-xs opacity-60">
                  Ctrl+Entrée pour envoyer
                </p>

                {/* Badge anonymat */}
                <div className="flex items-center justify-center gap-2">
                  <Lock size={12} className="text-text-muted-light opacity-50" />
                  <p className="text-xs text-text-muted-light opacity-50 font-medium">
                    100% anonyme · Jamais identifié
                  </p>
                </div>
              </div>
            ) : (
              /* ── Confirmation ── */
              <div className="space-y-5 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl shadow-lg"
                  style={{ background: "linear-gradient(135deg, #10b981, #059669)", boxShadow: "0 8px 24px rgba(16,185,129,0.3)" }}>
                  <svg width="30" height="30" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <p className="font-black text-2xl tracking-tight">Message envoyé ! 🎉</p>
                  <p className="text-text-muted-light text-sm leading-relaxed">
                    {displayName} recevra ton message de façon totalement anonyme.
                  </p>
                </div>
                <button
                  onClick={handleAgain}
                  className="w-full h-12 rounded-2xl font-bold text-sm border-2 border-primary/20 text-primary hover:bg-primary/5 transition-all duration-200"
                >
                  Envoyer un autre message
                </button>
              </div>
            )}

            {/* Warning — même style que Home */}
            {!sent && (
              <div className="mt-6 p-4 bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-800/20 rounded-xl flex gap-3 items-start">
                <span className="text-xl">🔒</span>
                <p className="text-sm text-orange-800 dark:text-orange-300 leading-relaxed">
                  Tes messages sont <strong>totalement anonymes</strong>.{" "}
                  {displayName} ne verra jamais ton identité.
                </p>
              </div>
            )}
          </div>

          {/* CTA — même style que Home "Conditions" */}
          <p className="text-center text-sm text-text-muted-light mt-6 opacity-80">
            Tu veux aussi recevoir des messages anonymes ?{" "}
            <Link href={ROUTES.HOME} className="underline hover:text-primary font-bold">
              Créer mon AnonBox gratuit
            </Link>
          </p>
        </div>
      </main>

      <AppFooter variant="default" />

    </div>
  );
}
