import { isWeb } from '@my/ui'
import * as Linking from 'expo-linking'

export const redirect = (url: string) => {
  location.href = url
}
