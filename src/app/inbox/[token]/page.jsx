"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Card, CardContent,CardHeader,CardTitle, CardFooter} from "@/components/ui/card"



export default function DashboardPage() {
  const { token } = useParams();          // /inbox/[token]
  const router = useRouter();
  const { user, verifySession, logout, isLoading: authLoading } = useAuth();

  const [unreadCount, setUnreadCount] = useState(0);
  const [pageReady, setPageReady] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false)
    const handleMarkAsRead = () => {
  console.log("Message marqué comme lu");
};

const handleDelete = () => {
  console.log("Message supprimé");
};


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
      <div
        className={`w-full border-b border-surface-light dark:border-surface-dark bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'shadow-lg' : ''
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
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
        <div className=" grid-cols-1 lg:grid-cols-12 gap-8 flex justify-between ">

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
            <Card className="rounded-2xl w-60">
              <CardContent>
                <p className="text-xs uppercase font-bold text-text-muted-light">
                  Total Reçus
                </p>
                <p className="text-3xl font-black mt-2">
                  {unreadCount}
                </p>
              </CardContent>
            </Card>

            {/* SHARE */}
            <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 space-y-4 w-60">
              <h3 className="font-black text-lg">Partager ma page</h3>
              <p>Obtenez plus de messages anonymes !</p>
              <span>Votre question</span>


              {/* Lien public */}
              {/* <div className="bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-sm font-mono truncate text-text-muted-light">
                {publicLink}
              </div> */}

              <textarea
                rows="2"
                placeholder="Écrivez vos propre question ici"
                className="w-full bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              />
             <button className="text-sm font-bold text-text-muted-light hover:text-primary transition">
              Générer une question aléatoire             
               </button>
            
            <Button variant="instagram" asChild>
              <a
                href="https://www.instagram.com/direct/inbox/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Partager sur Instagram
              </a>
            </Button>

              <div className="grid grid-cols-2 gap-3">
             <Button variant="whatsapp" asChild>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent("Viens voir mon lien : https://monsite.com")}`}
                target="_blank"
                rel="noopener noreferrer"
                 className="w-full rounded-xl py-2.5 text-xs cursor-cell"
              >
                WhatsApp
              </a>
            </Button>

            <Button variant="facebook" asChild>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://monsite.com/monlien")}`}
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
            <div className="flex gap-5">

            {/* MESSAGE CARDS (placeholder — à remplacer par fetch /inbox) */}
           <Card className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md w-80">

  {/* Bande rouge gauche */}
  <div className="absolute left-0 top-0 h-full w-1 bg-red-500 rounded-l-2xl" />

            <CardHeader>
              <CardTitle className="text-red-500 uppercase text-sm tracking-wider">
                Nouveau
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-1xl font-extrabold leading-snug">
                "Je kiffe trop ton style ! Tu les as achetées où tes sneakers ?"
              </p>
            </CardContent>


            <CardFooter className="flex justify-between">

              <Button
                variant="ghost"
                className="text-green-600 hover:text-green-700"
                onClick={handleMarkAsRead}
              >
                Marquer comme lu
              </Button>

              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
              >
                Supprimer
              </Button>

            </CardFooter>

          </Card>

           {/* MESSAGE CARDS (placeholder — à remplacer par fetch /inbox) */}
           <Card className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md w-80">

  {/* Bande rouge gauche */}
  <div className="absolute left-0 top-0 h-full w-1 bg-red-500 rounded-l-2xl" />

            <CardHeader>
              <CardTitle className="text-red-500 uppercase text-sm tracking-wider">
                Nouveau
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-1xl font-extrabold leading-snug">
                "Je kiffe trop ton style ! Tu les as achetées où tes sneakers ?"
              </p>
              </CardContent>

            <CardFooter className="flex justify-between">

              <Button
                  variant="ghost"
                  className="text-green-600 hover:text-green-700"
                  onClick={handleMarkAsRead}
                >
                  Marquer comme lu
              </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDelete}
                >
                  Supprimer
                </Button>

              </CardFooter>

          </Card>

          </div>


            <div className="flex justify-center pt-6">
             <Button
                variant="mutedLink"
                size="default"
             className="text-sm font-bold text-text-muted-light hover:text-primary transition">
              
                Charger plus de messages
              </Button>
            </div>

          </div>
        </div>
      </main>

    </div>
  );
}