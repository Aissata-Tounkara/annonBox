"use client";

import Link from "next/link";
import { Mail } from "lucide-react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AppFooter({ variant = "default" }) {
  if (variant === "minimal") {
    return (
      <footer className="border-t border-gray-200 dark:border-[#1e2126] bg-white dark:bg-[#0f1115] py-8 px-4 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-[#57606f] dark:text-[#a4b0be]">
          <div className="flex items-center gap-2 opacity-70">
            <span className="material-symbols-outlined text-lg">verified_user</span>
            <span>Connexion sécurisée</span>
          </div>
          <div className="text-xs opacity-50">© 2026 AnonBox.</div>
        </div>
      </footer>
    );
  }

  const isLanding = variant === "landing";

  return (
    <footer
      className={cn(
        "border-t px-4 mt-auto",
        isLanding
          ? "border-surface-light dark:border-surface-dark bg-background-light dark:bg-background-dark py-12"
          : "border-surface-light dark:border-surface-dark py-8"
      )}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center text-white",
              isLanding ? "bg-black" : "bg-text-main-light dark:bg-surface-dark"
            )}
          >
            {isLanding ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            ) : (
              <Mail size={16} />
            )}
          </div>
          <span className="font-bold text-lg">AnonBox</span>
        </div>

        <div
          className={cn(
            "text-sm font-medium",
            isLanding
              ? "flex gap-3 text-text-muted-light dark:text-text-muted-dark"
              : "flex flex-wrap justify-center gap-8 text-text-muted-light"
          )}
        >
          <Link className="hover:text-primary transition-colors" href="#">
            Politique de confidentialité
          </Link>
          <Link className="hover:text-primary transition-colors" href="#">
            Conditions d'utilisation
          </Link>
          <Link className="hover:text-primary transition-colors" href="#">
            Centre de sécurité
          </Link>
          {isLanding ? (
            <Link className="hover:text-primary transition-colors" href="#">
              Aide
            </Link>
          ) : null}
        </div>

        <div className={cn("text-sm opacity-60", isLanding ? "text-text-muted-light dark:text-text-muted-dark" : "text-text-muted-light")}>
          {isLanding ? "© 2026 AnonBox. Tous droits réservés." : "© 2026 AnonBox."}
        </div>
      </div>
    </footer>
  );
}
