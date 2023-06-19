import { IconProps } from '@tamagui/helpers-icon'
import { ListItem, ListItemProps, SizableText, XStack, YGroup, YStack } from 'tamagui'

export type SettingItemProps = {
  icon: React.FC<IconProps>
  rightLabel?: string
  accentColor?: ListItemProps['backgroundColor']
} & ListItemProps

export const SettingItem = ({
  icon: Icon,
  children,
  accentColor,
  rightLabel,
  ...props
}: SettingItemProps) => {
  return (
    <YGroup.Item>
      <ListItem
        hoverTheme
        cursor="pointer"
        gap="$2"
        borderRadius="$10"
        {...props}
        backgroundColor="transparent"
      >
        <YStack padding="$2" borderRadius="$3">
          <Icon opacity={0.6} size={18} />
        </YStack>
        <SizableText flex={1}>{children}</SizableText>
        {!!rightLabel && (
          <XStack borderRadius={100} backgroundColor="$backgroundPress" px="$3" py="$1.5">
            <SizableText size="$1" textTransform="capitalize">
              {rightLabel}
            </SizableText>
          </XStack>
        )}
      </ListItem>
    </YGroup.Item>
  )
}