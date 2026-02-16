"use client";

import { useState } from "react";
import { Mail, UserPlus, AtSign, ArrowRight, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/hooks/useAuth";


export default function Home() {
  const { register, isLoading, error } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [fieldError, setFieldError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldError("");

    const trimmed = displayName.trim();
    if (!trimmed) {
      setFieldError("Le nom d'utilisateur est requis.");
      return;
    }
    if (trimmed.length < 2) {
      setFieldError("Minimum 2 caractères.");
      return;
    }

    try {
      await register(trimmed);
      // La redirection vers /save-access est gérée dans useAuth
    } catch (err) {
      // err.errors contient les erreurs de validation Laravel (422)
      if (err?.errors?.display_name) {
        setFieldError(err.errors.display_name[0]);
      }
      // L'erreur générale est déjà dans `error` via le hook
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light">

      {/* HEADER */}
      <div className="w-full border-b border-surface-light bg-background-light/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6">
          <header className="flex items-center h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <Mail size={22} />
              </div>
              <h2 className="text-xl font-bold tracking-tight">AnonBox</h2>
            </div>
          </header>
        </div>
      </div>

      {/* MAIN */}
      <main className="grow flex items-center justify-center p-4 relative">
        <div className="absolute w-200 h-200 bg-primary/5 rounded-full blur-[100px] -z-10" />

        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-surface-light p-10">

            {/* ICON + TITLE */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <UserPlus size={26} />
              </div>
              <h1 className="text-3xl font-black mb-2 tracking-tight">
                Créez votre page
              </h1>
              <p className="text-text-muted-light font-medium">
                C'est rapide, gratuit et 100% anonyme.
              </p>
            </div>

            {/* FORM */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-bold mb-2 ml-1">
                  Nom d'utilisateur
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="votre-nom"
                    value={displayName}
                    onChange={(e) => {
                      setDisplayName(e.target.value);
                      setFieldError("");
                    }}
                    disabled={isLoading}
                    aria-invalid={!!(fieldError || error)}
                    className="h-14 rounded-2xl bg-gray-100 pl-5 pr-12 text-lg focus-visible:ring-primary disabled:opacity-60"
                  />
                  <AtSign
                    size={20}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors"
                  />
                </div>

                {/* Erreur de champ (validation front ou Laravel 422) */}
                {fieldError && (
                  <p className="mt-2 ml-1 text-sm text-red-500 font-medium">
                    {fieldError}
                  </p>
                )}

                {/* Erreur générale API (réseau, 500…) */}
                {error && !fieldError && (
                  <p className="mt-2 ml-1 text-sm text-red-500 font-medium">
                    {error}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/30"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Création en cours…
                  </>
                ) : (
                  <>
                    Générer mon lien
                    <ArrowRight size={20} />
                  </>
                )}
              </Button>
            </form>

            {/* WARNING */}
            <div className="mt-8 p-4 bg-orange-50 border border-orange-100 rounded-xl flex gap-3 items-start">
              <span className="text-xl">⚠️</span>
              <p className="text-sm text-orange-800 leading-relaxed">
                <strong>Attention :</strong> Aucun compte n'est requis.
                Vous recevrez un lien privé unique. S'il est perdu,
                vos messages ne pourront pas être récupérés.
              </p>
            </div>
          </div>

          {/* CONDITIONS */}
          <p className="text-center text-sm text-text-muted-light mt-6 opacity-80">
            En continuant, vous acceptez nos{" "}
            <a className="underline hover:text-primary" href="#">Conditions</a>{" "}
            et notre{" "}
            <a className="underline hover:text-primary" href="#">Politique</a>.
          </p>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-surface-light py-8 px-4 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-text-main-light rounded-lg flex items-center justify-center text-white">
              <Mail size={16} />
            </div>
            <span className="font-bold text-lg">AnonBox</span>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-text-muted-light">
            <a className="hover:text-primary transition-colors" href="#">Politique de confidentialité</a>
            <a className="hover:text-primary transition-colors" href="#">Conditions d'utilisation</a>
            <a className="hover:text-primary transition-colors" href="#">Centre de sécurité</a>
          </div>

          <div className="text-sm text-text-muted-light opacity-60">© 2026 AnonBox.</div>
        </div>
      </footer>

    </div>
  );
}