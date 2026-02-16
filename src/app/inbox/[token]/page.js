"use client";
export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-surface-light dark:bg-surface-dark border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white shadow-md">
              ✉️
            </div>
            <span className="text-lg font-extrabold tracking-tight">
              AnonBox
            </span>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* SIDEBAR */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h1 className="text-2xl font-black mb-1">
                Mon Inbox
              </h1>
              <p className="text-sm text-text-muted-light">
                Gérez vos messages reçus
              </p>
            </div>

            {/* STATS */}
            <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
              <p className="text-xs uppercase font-bold text-text-muted-light">
                Total Reçus
              </p>
              <p className="text-3xl font-black mt-2">124</p>
            </div>

            {/* SHARE */}
            <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 space-y-4">
              <h3 className="font-black text-lg">
                Partager ma page
              </h3>

              <textarea
                rows="2"
                placeholder="Écrivez votre accroche ici..."
                className="w-full bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              />

              <button className="w-full py-3 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-500 text-white font-bold text-sm hover:opacity-90 transition">
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
            <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
              <p className="text-xs uppercase font-bold text-text-muted-light mb-2">
                Sécurité du lien
              </p>
              <button className="w-full py-2.5 rounded-xl bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 font-bold text-sm hover:opacity-90 transition">
                Régénérer mon lien
              </button>
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
                <button className="text-text-muted-light font-medium text-sm">
                  Non lus
                </button>
              </div>
            </div>

            {/* MESSAGE CARD */}
            <div className="grid md:grid-cols-2 gap-4">

              <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-sm border-l-4 border-l-primary border border-gray-200 dark:border-gray-800">
                <span className="text-xs font-bold text-primary uppercase">
                  Nouveau
                </span>

                <p className="text-xl font-bold mt-4">
                  "Je kiffe trop ton style ! Tu les as achetées où tes sneakers ?"
                </p>

                <div className="flex justify-between mt-6">
                  <button className="text-sm font-bold text-green-600">
                    Marquer comme lu
                  </button>
                  <button className="text-sm font-bold text-red-500">
                    Supprimer
                  </button>
                </div>
              </div>

              <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 opacity-90">
                <span className="text-xs font-bold text-text-muted-light uppercase">
                  Lu
                </span>

                <p className="text-lg font-medium mt-4">
                  "C'est quoi ton projet pour cet été ?"
                </p>

                <div className="mt-6 text-green-600 font-bold text-sm">
                  ✔ Marqué comme lu
                </div>
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
  )
}