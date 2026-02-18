"use client"; // Obligatoire pour les fichiers error.js

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log de l'erreur pour le debug
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark p-6 text-center">
      <h2 className="text-2xl font-black mb-4">Oups ! Une erreur est survenue.</h2>
      <p className="text-text-muted-light mb-6">
        Impossible de charger votre inbox pour le moment.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition"
        >
          Réessayer
        </button>
        <button
          onClick={() => window.location.href = "/"}
          className="px-6 py-3 bg-gray-200 dark:bg-gray-800 rounded-xl font-bold transition"
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
}