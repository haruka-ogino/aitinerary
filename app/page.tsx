'use client'

import MyCalendar from '@/components/MyCalendar'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import {
  signIn,
  signOut,
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
              <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="black_btn"
              >
                Sign In
              </button>
            ))}
        </>
      )}
    </>
  )
}
