'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import AnimatedBadge from '@/components/ui/AnimatedBadge'
import { Button } from "@/components/ui/button"
import FloatingCard from '@/components/ui/FloatingCard'
import StepCard from '@/components/ui/StepCard'
import AppHeader from '@/components/layout/AppHeader'
import AppFooter from '@/components/layout/AppFooter'

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <AppHeader variant="dashboard" withShadow={isScrolled} />

      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center pt-10 pb-12 lg:pt-32 lg:pb-32 px-4 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-150 bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        {/* Hero Content */}
        <div className="max-w-3xl w-full text-center flex flex-col items-center gap-8 relative z-10">
          {/* Badge */}
          <AnimatedBadge 
            text="Maintenant disponible sur le web" 
            variant="cyan" 
          />

          {/* Main Heading */}
          <h1 className="text-center text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tighter bg-clip-text text-transparent bg-linear-to-b from-[#1e272e] to-[#57606f] dark:from-white dark:to-gray-400">
            Recevez des messages <br className="hidden sm:block"/> anonymes
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-text-muted-light dark:text-text-muted-dark max-w-2xl leading-relaxed">
            Recevez des avis honnêtes, des confessions et des questions
            brûlantes de vos amis. 100% anonyme et sécurisé.
          </p>

          {/* CTA Button */}
           <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-4">
      <Button asChild size="lg" className="bg-primary hover:bg-primary-hover text-white text-lg font-bold rounded-full shadow-lg shadow-primary/30">
        <Link href="/create" className="flex items-center justify-center gap-2 px-8 h-14 w-full sm:w-auto">
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
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Créer ma page
        </Link>
      </Button>
    </div>

          {/* Info Pills */}
          <div className="pt-8 flex items-center justify-center gap-2 text-sm text-text-muted-light dark:text-text-muted-dark">
            <svg
              className="w-5 h-5 text-secondary"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Sans inscription</span>
            <span className="mx-2 text-gray-300 dark:text-gray-700">•</span>
            <span>Gratuit à vie</span>
          </div>
        </div>

      
       {/* Floating Cards */}
      <div className="mt-20 relative w-full max-w-5xl mx-auto h-64 sm:h-80 hidden sm:block">
        <FloatingCard
          text="Tu vois quelqu'un en ce moment ? 👀"
          position="left-4 top-10 sm:left-20 sm:top-12"
          rotation="-4deg"
          color="secon"
          delay="0s"
        />
        <FloatingCard
          text="Je craque pour toi ❤️"
          position="right-4 top-4 sm:right-20 sm:top-0"
          rotation="4deg"
          color="secon"
          delay="1s"
        />

        <FloatingCard
          position="right-8 bottom-1"
          rotation="0deg"
          color="primary"
          delay="0s"
        >
          <div className="flex flex-col w-72 h-30">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-white/20 px-2 py-1 rounded text-xs font-bold">
                Nouveau Message
              </span>
              <svg className="w-5 h-5 text-white/80" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </div>
            <p className="text-1xl font-black mb-2 leading-tight">
              Envoyez-moi des messages anonymes !
            </p>
            <div className="mt-4 flex items-center gap-0 text-white/80 text-sm">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
              anonbox.com/u/kylie
            </div>
          </div>
        </FloatingCard>
      </div>
      </div>

      {/* How It Works Section */}
     <div className="py-24 px-4 bg-gray-100" id="how-it-works">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-center">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl sm:text-4xl font-black mb-6 tracking-tight">
                Étapes simples pour commencer
              </h2>
              <p className="text-lg text-text-muted-light dark:text-text-muted-dark mb-8 leading-relaxed">
                Ça prend moins d'une minute pour s'installer. Pas d'inscription
                compliquée, juste du fun anonyme.
              </p>
              <Link
                href="/create"
                className="hidden md:inline-flex bg-text-main-light dark:bg-white text-white dark:text-black px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity bg-black"
              >
                Commencer
              </Link>
            </div>

            <div className="w-full md:w-1/2 grid grid-cols-1 gap-4">
              <StepCard
                icon={
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                }
                title="1. Créez votre lien"
                description="Générez votre lien personnel unique instantanément. Aucun email requis."
                color="blue"
              />
              <StepCard
                icon={
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                }
                title="2. Partagez sur les réseaux"
                description="Collez votre lien dans votre Story Instagram, Snapchat ou bio Twitter."
                color="purple"
              />
              <StepCard
                icon={
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                }
                title="3. Recevez vos messages"
                description="Vérifiez votre boîte de réception privée pour voir ce que vos amis pensent vraiment."
                color="green"
              />
            </div>

            <div className="w-full md:hidden">
              <Link
                href="/create"
                className="w-full bg-text-main-light dark:bg-white text-white dark:text-black px-6 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity inline-flex items-center justify-center"
              >
                Commencer
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
     <div className="relative py-24 px-4 overflow-hidden">
  {/* SUPPRIMEZ CETTE LIGNE : 
  <div className="absolute inset-0 z-0 opacity-5 dark:opacity-20 bg-linear-to-br from-primary/20 to-secondary/20"></div>
  */}
  <div className="max-w-4xl mx-auto text-center relative z-10">
    <h2 className="text-4xl sm:text-5xl font-black mb-6">
      Prêt à entendre la vérité ?
    </h2>
    <p className="text-xl text-text-muted-light dark:text-text-muted-dark mb-10 max-w-xl mx-auto">
      Rejoignez des milliers d'utilisateurs qui partagent leur inbox
      anonyme aujourd'hui. C'est rapide, gratuit et fun.
    </p>
    <Link
      href="/create"
      className="inline-flex items-center justify-center h-16 px-10 rounded-full bg-primary hover:bg-primary-hover text-white text-xl font-bold shadow-xl shadow-primary/40 transition-all transform hover:-translate-y-1 active:translate-y-0"
    >
      Créer ma page
    </Link>
  </div>
</div>
      <AppFooter variant="landing" />
    </>
  )
}
