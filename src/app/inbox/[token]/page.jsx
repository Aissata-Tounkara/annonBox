"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { useInbox } from "@/lib/hooks/useMessages";
import { useMessageActions } from "@/lib/hooks/useMessages";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

export default function DashboardPage() {
  const { token } = useParams();
  const router = useRouter();
  const { user, verifySession, logout, isLoading: authLoading } = useAuth();

  const [pageReady, setPageReady] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("all"); // "all" | "unread"

  // ─── Inbox hook ─────────────────────────────────────────────────────────
  const {
    messages,
    unreadCount,
    totalCount,
    loading: inboxLoading,
    error: inboxError,
    loadInbox,
    loadUnread,
  } = useInbox();

  // ─── Message actions hook ────────────────────────────────────────────────
  // onSuccess : recharge l'inbox selon l'onglet actif
  const refreshInbox = useCallback(() => {
    if (activeTab === "unread") {
      loadUnread();
    } else {
      loadInbox();
    }
  }, [activeTab, loadInbox, loadUnread]);

  const {
    markAsRead,
    remove,
    share,
    generateCard,
    loading: actionLoading,
    error: actionError,
  } = useMessageActions(refreshInbox);

  // ─── Auth guard ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!token) {
      router.replace("/");
      return;
    }

    verifySession(token)
      .then(() => {
        setPageReady(true);
      })
      .catch(() => {
        // verifySession gère la redirection
      });
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Chargement initial de l'inbox ───────────────────────────────────────
  useEffect(() => {
    if (pageReady) {
      loadInbox();
    }
  }, [pageReady]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Scroll shadow ───────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ─── Changement d'onglet ─────────────────────────────────────────────────
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "unread") {
      loadUnread();
    } else {
      loadInbox();
    }
  };

  // ─── Écran de chargement ─────────────────────────────────────────────────
  if (!pageReady || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="flex flex-col items-center gap-4 text-text-muted-light">
          <Loader2 size={40} className="animate-spin text-primary" />
          <p className="font-semibold">Vérification de votre accès…</p>
        </div>
      </div>
    );
  }

  const publicLink = `${typeof window !== "undefined" ? window.location.origin : ""}/u/${user?.handle}`;

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
      {/* NAVBAR */}
      <div
        className={`w-full border-b border-surface-light dark:border-surface-dark bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "shadow-lg" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold tracking-tight">AnonBox</h2>
            </div>

            <div className="flex items-center gap-4">
              {user && (
                <span className="text-sm font-semibold text-text-muted-light hidden sm:block">
                  @{user.handle}
                </span>
              )}
            </div>
          </header>
        </div>
      </div>

      {/* MAIN */}
      <main className="grow max-w-7xl mx-auto w-full px-6 py-8">
        <div className="grid-cols-1 lg:grid-cols-12 gap-8 flex justify-between">

          {/* SIDEBAR */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h1 className="text-2xl font-black mb-1">Mon Inbox</h1>
              <p className="text-sm text-text-muted-light">
                Bonjour{user?.display_name ? `, ${user.display_name}` : ""} 👋{" "}
                <span>Gérez vos messages reçus</span>
              </p>
            </div>

            {/* STATS */}
            <Card className="rounded-2xl w-60">
              <CardContent>
                <p className="text-xs uppercase font-bold text-text-muted-light">Total Reçus</p>
                <p className="text-3xl font-black mt-2">{totalCount}</p>
                {unreadCount > 0 && (
                  <p className="text-xs text-primary font-semibold mt-1">{unreadCount} non lu(s)</p>
                )}
              </CardContent>
            </Card>

            {/* SHARE */}
            <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 space-y-4 w-60">
              <h3 className="font-black text-lg">Partager ma page</h3>
              <p>Obtenez plus de messages anonymes !</p>
              <span>Votre question</span>

              <textarea
                rows="2"
                placeholder="Écrivez votre propre question ici"
                className="w-full bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              />
              <button className="text-sm font-bold text-text-muted-light hover:text-primary transition">
                Générer une question aléatoire
              </button>

              <Button variant="instagram" asChild>
                <a href="https://www.instagram.com/direct/inbox/" target="_blank" rel="noopener noreferrer">
                  Partager sur Instagram
                </a>
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="whatsapp" asChild>
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent("Viens voir mon lien:" + publicLink)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full rounded-xl py-2.5 text-xs cursor-cell"
                  >
                    WhatsApp
                  </a>
                </Button>

                <Button variant="facebook" asChild>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(publicLink)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                </Button>
              </div>
            </div>

            {/* SECURITY */}
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

          {/* MESSAGES */}
          <div className="lg:col-span-9 space-y-6">

            {/* TABS */}
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-2">
              <div className="flex gap-6">
                <button
                  onClick={() => handleTabChange("all")}
                  className={`border-b-2 font-bold text-sm pb-2 transition ${
                    activeTab === "all"
                      ? "border-primary text-primary"
                      : "border-transparent text-text-muted-light"
                  }`}
                >
                  Tous les messages
                </button>
                <button
                  onClick={() => handleTabChange("unread")}
                  className={`font-medium text-sm pb-2 border-b-2 transition ${
                    activeTab === "unread"
                      ? "border-primary text-primary"
                      : "border-transparent text-text-muted-light"
                  }`}
                >
                  Non lus
                  {unreadCount > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-primary text-white text-xs">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* ERREUR */}
            {(inboxError || actionError) && (
              <div className="text-sm text-red-500 font-semibold px-1">
                {inboxError || actionError}
              </div>
            )}

            {/* CHARGEMENT */}
            {inboxLoading ? (
              <div className="flex justify-center py-16">
                <Loader2 size={32} className="animate-spin text-primary" />
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-text-muted-light gap-3">
                <svg className="w-12 h-12 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="font-semibold">Aucun message pour l'instant.</p>
                <p className="text-xs">Partagez votre lien pour recevoir des messages !</p>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap gap-5">
                  {messages.map((msg) => (
                    <MessageCard
                      key={msg.id}
                      message={msg}
                      onMarkAsRead={() => markAsRead(msg.id)}
                      onDelete={() => remove(msg.id)}
                      onShare={() => share(msg.id)}
                      onGenerateCard={() => generateCard(msg.id)}
                      disabled={actionLoading}
                    />
                  ))}
                </div>

                <div className="flex justify-center pt-6">
                  <Button
                    variant="mutedLink"
                    size="default"
                    className="text-sm font-bold text-text-muted-light hover:text-primary transition"
                    onClick={() => loadInbox()}
                  >
                    Charger plus de messages
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── Sous-composant MessageCard ──────────────────────────────────────────────

function MessageCard({ message, onMarkAsRead, onDelete, onShare, onGenerateCard, disabled }) {
  const isUnread = message.status === "unread";

  return (
    <Card className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md w-80">
      {/* Bande latérale colorée */}
      <div
        className={`absolute left-0 top-0 h-full w-1 rounded-l-2xl ${
          isUnread ? "bg-red-500" : "bg-gray-300 dark:bg-gray-600"
        }`}
      />

      <CardHeader>
        <CardTitle
          className={`uppercase text-sm tracking-wider ${
            isUnread ? "text-red-500" : "text-text-muted-light"
          }`}
        >
          {isUnread ? "Nouveau" : "Lu"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-base font-extrabold leading-snug">"{message.content}"</p>
        {message.response_text && (
          <p className="mt-3 text-sm text-text-muted-light italic border-l-2 border-primary pl-3">
            Réponse : {message.response_text}
          </p>
        )}
      </CardContent>

      <CardFooter className="flex justify-between flex-wrap gap-2">
        {isUnread && (
          <Button
            variant="ghost"
            className="text-green-600 hover:text-green-700"
            onClick={onMarkAsRead}
            disabled={disabled}
          >
            Marquer comme lu
          </Button>
        )}

        <Button
          variant="ghost"
          size="sm"
          className="text-text-muted-light hover:text-primary"
          onClick={onShare}
          disabled={disabled}
        >
          Partager
        </Button>

        <Button
          variant="destructive"
          size="sm"
          onClick={onDelete}
          disabled={disabled}
        >
          Supprimer
        </Button>
      </CardFooter>
    </Card>
  );
}