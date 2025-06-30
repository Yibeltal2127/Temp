import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tabor Digital Academy - Your Launchpad: From Idea to Income',
  description: 'Empowering African entrepreneurs with mobile-first, project-based education. Learn digital marketing, no-code development, e-commerce, AI tools, and more.',
  keywords: 'entrepreneurship, digital marketing, no-code development, e-commerce, AI tools, African entrepreneurs, online learning',
  authors: [{ name: 'Tabor Digital Academy' }],
  creator: 'Tabor Digital Academy',
  publisher: 'Tabor Digital Academy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://taboracademy.com'),
  openGraph: {
    title: 'Tabor Digital Academy - Your Launchpad: From Idea to Income',
    description: 'Empowering African entrepreneurs with mobile-first, project-based education.',
    url: 'https://taboracademy.com',
    siteName: 'Tabor Digital Academy',
    images: [
      {
        url: '/logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Tabor Digital Academy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tabor Digital Academy - Your Launchpad: From Idea to Income',
    description: 'Empowering African entrepreneurs with mobile-first, project-based education.',
    images: ['/logo.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}