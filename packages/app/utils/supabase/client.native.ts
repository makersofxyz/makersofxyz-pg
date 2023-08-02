import { Database } from '@my/supabase/types'
import { createClient } from '@supabase/supabase-js'
import * as SecureStore from 'expo-secure-store'
import { NativeModules } from 'react-native'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error(`NEXT_PUBLIC_SUPABASE_URL is not set. Please update the root .env.local and restart the server.`)
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error(
    `NEXT_PUBLIC_SUPABASE_ANON_KEY is not set. Please update the root .env.local and restart the server.`
  )
}

const hostname = NativeModules.SourceCode.scriptURL
  .split('://')[1] // Remove the scheme
  .split('/')[0] // Remove the path
  .split(':')[0] // Remove the port

// replace localhost with the hostname - this will not do anything if using a production / remote URL, as they don't contain `localhost`
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL.replace(
  '://localhost:',
  `://${hostname}:`
)

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key)
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value)
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key)
  },
}

export const supabase = createClient<Database>(
  supabaseUrl,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      storage: ExpoSecureStoreAdapter,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
)
