import { Manrope } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata = {
  title: 'AnonBox - Recevez des messages anonymes',
  description:
    'Recevez des avis honnêtes, des confessions et des questions brûlantes de vos amis. 100% anonyme et sécurisé.',
  keywords: [
    'messages anonymes',
    'feedback anonyme',
    'questions anonymes',
    'anonbox',
    'ngl',
    'sendit',
  ],
  authors: [{ name: 'AnonBox' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://anonbox.com',
    title: 'AnonBox - Recevez des messages anonymes',
    description:
      'Recevez des avis honnêtes, des confessions et des questions brûlantes de vos amis. 100% anonyme et sécurisé.',
    siteName: 'AnonBox',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AnonBox - Recevez des messages anonymes',
    description:
      'Recevez des avis honnêtes, des confessions et des questions brûlantes de vos amis. 100% anonyme et sécurisé.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="light">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${manrope.variable} font-display antialiased`}>
        <div className="min-h-screen flex flex-col">{children}</div>
      </body>
    </html>
  )
}