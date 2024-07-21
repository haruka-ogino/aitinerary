'use client'

import MyCalendar from '@/components/MyCalendar'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import {
  signIn,
  useSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers/index'

export default function Home() {
  const { data: session } = useSession()

  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null)

  useEffect(() => {
    const setUpProviders = async () => {
      const res = await getProviders()
      setProviders(res)
    }

    setUpProviders()
  }, [])

  return (
    <>
      {session?.user ? (
        <div className="max-w-7xl">
          <MyCalendar />
        </div>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider) => (
              <>
                <Link href="/" className="flex gap-2 flex-center">
                  <Image
                    src="/assets/images/logo.svg"
                    alt="Promptopia Logo"
                    width={30}
                    height={30}
                    className="object-contain"
                  />
                  <p className="logo_text">AItinerary</p>
                </Link>
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              </>
            ))}
        </>
      )}
    </>
  )
}
