import '@styles/globals.css'
import { ReactNode } from 'react'
import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata = {
  title: 'AItinerary',
  description: 'Discover the world around you',
}

interface RootLayoutProps {
  children: ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/images/logo.svg" type="image/svg+xml" />
      </head>
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout
