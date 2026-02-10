"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/feed"); // redirige vers /feed
  }, [router]);

  return null; // rien à afficher ici
}