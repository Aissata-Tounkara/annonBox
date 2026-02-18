"use client";

import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
      <div className="flex flex-col items-center gap-4 text-text-muted-light">
        {/* On utilise l'icône de chargement que vous avez déjà dans votre projet */}
        <Loader2 size={40} className="animate-spin text-primary" />
        <p className="font-semibold animate-pulse text-lg">
          Chargement de vos messages...
        </p>
      </div>
    </div>
  );
}