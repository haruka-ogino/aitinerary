import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Provider from '@/components/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AItinerary',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>{/* <link rel="icon" href="" type="" /> */}</head>
      <body>
        <Provider session={undefined}>
          <main className="app">{children}</main>
        </Provider>
      </body>
    </html>
  )
}
