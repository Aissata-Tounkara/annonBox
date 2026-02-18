"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { token } = useParams();          // /inbox/[token]
  const router = useRouter();
  const { user, verifySession, logout, isLoading: authLoading } = useAuth();

  const [unreadCount, setUnreadCount] = useState(0);
  const [pageReady, setPageReady] = useState(false);

  // ─── Auth guard : vérifier le token au montage ──────────────────────────
  useEffect(() => {
    if (!token) {
      router.replace("/");
      return;
    }

    verifySession(token)
      .then(({ unread_count }) => {
        setUnreadCount(unread_count ?? 0);
        setPageReady(true);
      })
      .catch(() => {
        // verifySession gère déjà la redirection vers / en cas d'échec
      });
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

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
      <nav className="sticky top-0 z-50 bg-surface-light dark:bg-surface-dark border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-linear-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white shadow-md">
              ✉️
            </div>
            <span className="text-lg font-extrabold tracking-tight">AnonBox</span>
          </div>

          {/* User info + logout */}
          <div className="flex items-center gap-4">
            {user && (
              <span className="text-sm font-semibold text-text-muted-light hidden sm:block">
                @{user.handle}
              </span>
            )}
           
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <main className="grow max-w-7xl mx-auto w-full px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* SIDEBAR */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h1 className="text-2xl font-black mb-1">Mon Inbox</h1>
              <p className="text-sm text-text-muted-light">
                Bonjour{user?.display_name ? `, ${user.display_name}` : ""} 👋
                <span>
                  Gérez vos messages reçus


                </span>
              </p>
            </div>

            {/* STATS */}
            <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
              <p className="text-xs uppercase font-bold text-text-muted-light">Non lus</p>
              <p className="text-3xl font-black mt-2">{unreadCount}</p>
            </div>

            {/* SHARE */}
            <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 space-y-4">
              <h3 className="font-black text-lg">Partager ma page</h3>

              {/* Lien public */}
              <div className="bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-sm font-mono truncate text-text-muted-light">
                {publicLink}
              </div>

              <textarea
                rows="2"
                placeholder="Écrivez votre accroche ici..."
                className="w-full bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              />

              <button className="w-full py-3 rounded-xl bg-linear-to-tr from-purple-600 via-pink-600 to-orange-500 text-white font-bold text-sm hover:opacity-90 transition">
                Partager sur Instagram
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button className="py-2.5 rounded-xl bg-green-500 text-white font-bold text-xs hover:opacity-90 transition">
                  WhatsApp
                </button>
                <button className="py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:opacity-90 transition">
                  Facebook
                </button>
              </div>
            </div>

            {/* SECURITY */}
            <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 space-y-3">
              <p className="text-xs uppercase font-bold text-text-muted-light">Sécurité du lien</p>
              <button className="w-full py-2.5 rounded-xl bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 font-bold text-sm hover:opacity-90 transition">
                Régénérer mon lien
              </button>
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
                <button className="border-b-2 border-primary text-primary font-bold text-sm pb-2">
                  Tous les messages
                </button>
                <button className="text-text-muted-light font-medium text-sm pb-2">
                  Non lus{unreadCount > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-primary text-white text-xs">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* MESSAGE CARDS (placeholder — à remplacer par fetch /inbox) */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-sm border-l-4 border-l-primary border border-gray-200 dark:border-gray-800">
                <span className="text-xs font-bold text-primary uppercase">Nouveau</span>
                <p className="text-xl font-bold mt-4">
                  "Je kiffe trop ton style ! Tu les as achetées où tes sneakers ?"
                </p>
                <div className="flex justify-between mt-6">
                  <button className="text-sm font-bold text-green-600">Marquer comme lu</button>
                  <button className="text-sm font-bold text-red-500">Supprimer</button>
                </div>
              </div>

              <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 opacity-90">
                <span className="text-xs font-bold text-text-muted-light uppercase">Lu</span>
                <p className="text-lg font-medium mt-4">"C'est quoi ton projet pour cet été ?"</p>
                <div className="mt-6 text-green-600 font-bold text-sm">✔ Marqué comme lu</div>
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <button className="text-sm font-bold text-text-muted-light hover:text-primary transition">
                Charger plus de messages
              </button>
            </div>

          </div>
        </div>
      </main>

    </div>
  );
}