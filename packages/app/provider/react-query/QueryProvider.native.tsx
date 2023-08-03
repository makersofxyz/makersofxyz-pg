import { useToastController } from '@my/ui'
import NetInfo from '@react-native-community/netinfo'
import {
  QueryClient,
  QueryClientProvider as QueryClientProviderOG,
  focusManager,
  onlineManager,
} from '@tanstack/react-query'
import { TRPCClientError, httpBatchLink } from '@trpc/client'
import { supabase } from 'app/utils/supabase/client.native'
import { useEffect, useState } from 'react'
import type { AppStateStatus } from 'react-native'
import { AppState, Platform } from 'react-native'
import superjson from 'superjson'
import { api, getBaseUrl } from './trpc.native'

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected)
  })
})

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active')
  }
}

export const QueryClientProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange)

    return () => subscription.remove()
  }, [])

  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          onError: (error) => {
            console.log(error, JSON.stringify(error))
            if (error instanceof TRPCClientError) {
              if (error.data.httpStatus === 401) {
              }
            }
          },
        },
      },
    })
  )

  const [trpcClient] = useState(() =>
    api.createClient({
      transformer: superjson,
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          async headers() {
            const headers = new Map<string, string>()
            headers.set('x-trpc-source', 'expo-react')
            const session = (await supabase.auth.getSession()).data.session

            // Manually add the auth name as the backend uses cookies to authenticate users
            // This allows mobile to authenticate via Supabase
            if (session?.access_token) {
              headers.set('Authorization', `Bearer ${session.access_token}`)
              headers.set('Refresh-Token', `${session.refresh_token}`) // required cause of Supabase's setSession()
            }
            return Object.fromEntries(headers)
          },
        }),
      ],
    })
  )

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProviderOG client={queryClient}>{children}</QueryClientProviderOG>
    </api.Provider>
  )
}
