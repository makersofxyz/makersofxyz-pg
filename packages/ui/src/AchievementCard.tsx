import { IconProps } from '@tamagui/helpers-icon'
import { LinearGradient } from '@tamagui/linear-gradient'
import { ChevronRight } from '@tamagui/lucide-icons'
import React from 'react'
import { useLink } from 'solito/link'

import { Button, Card, CardProps, H4, H6, Progress, SizableText, YStack } from 'tamagui'

export type AchievementCardTypes = {
  icon: React.FC<IconProps>
  title?: string
  subtitle?: string
  progress: {
    current: number
    full: number
    label?: string
  }
  action?: {
    props: ReturnType<typeof useLink>
    text: string
  }
} & CardProps

export const AchievementCard = ({
  title,
  subtitle,
  icon: Icon,
  progress,
  action,
  ...props
}: AchievementCardTypes) => {
  return (
    <Card borderRadius="$6" chromeless bordered {...props}>
      <Card.Header my="auto" padded f={1} gap="$2">
        <Icon size={24} opacity={0.5} color="$color11" />
        <YStack>
          <H4 size="$4" textTransform="capitalize" mt="$2">
            {title}
          </H4>
          <SizableText mt="$2">
            <SizableText size="$4" theme="alt1" fontWeight="900">
              {progress.current.toLocaleString()}
            </SizableText>
            <SizableText size="$2" theme="alt1">
              {' '}
              / {progress.full.toLocaleString()} {progress.label}
            </SizableText>
          </SizableText>

          <Progress
            mt="$2"
            theme="alt2"
            value={(progress.current / progress.full) * 100}
            backgroundColor="$color2"
          >
            <Progress.Indicator backgroundColor="$color7" animation="bouncy" />
          </Progress>

          {!!action && (
            <Button mt="$3" als="flex-end" size="$2" iconAfter={<ChevronRight />}>
              {action.text}
            </Button>
          )}
        </YStack>
      </Card.Header>
      <Card.Background>
        <LinearGradient
          borderRadius="$6"
          width="100%"
          height="100%"
          colors={['$color3', '$color2']}
          start={[1, 1]}
          end={[0.85, 0]}
        />
      </Card.Background>
    </Card>
  )
}
