"use client";

import { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const [message, setMessage] = useState("");

  return (
    <div className="bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark transition-colors duration-200 min-h-screen flex flex-col overflow-x-hidden font-display">

      {/* Background blur effect */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      {/* HEADER */}
      <header className="w-full py-6 flex justify-center items-center z-10">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <span className="text-2xl">✉️</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight">AnonBox</h2>
        </Link>
      </header>

      {/* MAIN */}
      <main className="flex-grow flex items-center justify-center px-4 py-8 z-10">
        <div className="w-full max-w-lg bg-white dark:bg-surface-dark/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-white/5 overflow-hidden ring-1 ring-black/5 dark:ring-white/10 animate-fadeIn">

          {/* PROFILE SECTION */}
          <div className="pt-10 pb-6 px-6 flex flex-col items-center text-center relative">

            <div className="relative group mb-5">
              <div className="absolute -inset-1 bg-gradient-to-br from-primary to-secondary rounded-full opacity-70 blur group-hover:opacity-100 transition duration-500"></div>

              <div className="relative w-28 h-28 rounded-full bg-surface-light dark:bg-[#15191e] p-1.5 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-5xl text-gray-400">👤</span>
                </div>
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Envoyer un message à <br className="sm:hidden" />
              <span className="text-primary bg-primary/5 px-2 py-0.5 rounded-lg whitespace-nowrap">
                @nom-utilisateur
              </span>
            </h1>
          </div>

          {/* FORM */}
          <div className="px-6 sm:px-8 pb-8">
            <form
              className="space-y-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="relative">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={1000}
                  placeholder="Écris quelque chose d'anonyme..."
                  className="w-full h-48 sm:h-56 bg-surface-light dark:bg-[#15191e] border-2 border-ring focus:border-primary/30 rounded-2xl p-5 text-lg leading-relaxed placeholder:text-text-muted-light/50 dark:placeholder:text-text-muted-dark/50 focus:ring-0 focus:bg-white dark:focus:bg-black/20 resize-none transition-all duration-300 shadow-inner"
                />

                <div className="absolute bottom-3 right-4 text-xs font-semibold text-text-muted-light/60 dark:text-text-muted-dark/60 pointer-events-none select-none">
                  {message.length}/1000
                </div>
              </div>

              {/* SECURITY TEXT */}
              <div className="flex items-center justify-center gap-1.5 py-1 select-none">
                <span className="text-sm text-secondary">🔒</span>
                <p className="text-xs font-semibold text-text-muted-light dark:text-text-muted-dark tracking-wide">
                  Votre message est 100% anonyme et sécurisé.
                </p>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full h-16 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-lg sm:text-xl shadow-xl shadow-primary/30 hover:shadow-primary/40 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3 group"
              >
                <span>Envoyer anonymement</span>
                <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                  ➤
                </span>
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-10 text-center z-10 px-4">
        <Link
          href="/create"
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-surface-dark border border-surface-light dark:border-gray-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-text-main-light to-primary  dark:to-primary-hover font-bold text-sm sm:text-base">
            Crée ta propre page de messages anonymes !
          </span>
          <span className="text-primary group-hover:translate-x-1 transition-transform">
            →
          </span>
        </Link>

        <div className="mt-8 text-sm text-text-muted-light dark:text-text-muted-dark opacity-50">
          © 2026 AnonBox
        </div>
      </footer>
    </div>
  );
}