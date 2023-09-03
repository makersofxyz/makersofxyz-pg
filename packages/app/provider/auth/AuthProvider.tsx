import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, SessionContextProviderProps } from '@supabase/auth-helpers-react'
import { AUTH_COOKIE_NAME } from 'app/utils/auth'
import { useState } from 'react'
import { AuthStateChangeHandler } from './AuthStateChangeHandler'

export type AuthProviderProps = {
  initialSession?: SessionContextProviderProps['initialSession']
  children?: React.ReactNode
}

export const AuthProvider = ({ initialSession, children }: AuthProviderProps) => {
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() =>
    createPagesBrowserClient({
      cookieOptions: {
        name: AUTH_COOKIE_NAME,
        maxAge: 60 * 60 * 24 * 365 * 10, // 10 years
        sameSite: 'lax',
        path: '/',
        domain: process.env.NEXT_PUBLIC_SUPABASE_URL,
      },
    })
  )

  return (
    <SessionContextProvider supabaseClient={supabaseClient} initialSession={initialSession}>
      <AuthStateChangeHandler />
      {children}
    </SessionContextProvider>
  )
}
