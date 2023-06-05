import { XStack, YStack } from '@my/ui'
import { Onboarding } from '../onboarding/components/onboarding'

export type AuthLayoutProps = {
  children?: React.ReactNode
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <XStack f={1}>
      <YStack f={2} fb={0} jc="center">
        <YStack px="$4">{children}</YStack>
      </YStack>

      <YStack $sm={{ display: 'none' }} f={3} fb={0}>
        <Onboarding autoSwipe />
      </YStack>
    </XStack>
  )
}
