import { createTRPCReact } from '@trpc/react-query'

import type { AppRouter } from '@my/api'
import { replaceLocalhost } from 'app/utils/getLocalhost.native'

export const api = createTRPCReact<AppRouter>()
export { type RouterInputs, type RouterOutputs } from '@my/api'

export const getBaseUrl = () => {
  return replaceLocalhost(process.env.NEXT_PUBLIC_BASE_URL ?? `http://localhost:3000`)
}
