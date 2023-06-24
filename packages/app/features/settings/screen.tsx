import { Paragraph, ScrollView, Settings, YStack, isWeb, useMedia } from '@my/ui'
import { Book, Cog, Info, Lock, LogOut, Mail, Moon, Twitter } from '@tamagui/lucide-icons'
import { useThemeSetting } from 'app/provider/theme/UniversalThemeProvider'
import { redirect } from 'app/utils/redirect'
import { useUser } from 'app/utils/useUser'
import rootPackageJson from '../../../../package.json'
import packageJson from '../../package.json'
import { useLink } from 'solito/link'

const brandColors = {
  twitter: '#1DA1F2',
}

export const SettingsScreen = () => {
  const media = useMedia()

  return (
    <YStack f={1} gap="$2" jc="space-between">
      <ScrollView>
        <Settings mt="$6">
          <Settings.Items>
            <Settings.Group>
              <Settings.Item
                icon={Cog}
                {...useLink({ href: media.sm ? '/settings/general' : '/settings' })}
                accentColor="$green9"
              >
                General
              </Settings.Item>
              <Settings.Item
                icon={Lock}
                {...useLink({ href: '/settings/change-password' })}
                accentColor="$green9"
              >
                Change Password
              </Settings.Item>
              <Settings.Item
                icon={Mail}
                {...useLink({ href: '/settings/change-email' })}
                accentColor="$green9"
              >
                Change Email
              </Settings.Item>
              {/* <Settings.Item icon={Bell} {...useLink({href: "/settings/notifications"})} accentColor="$orange9">
                Notifications
              </Settings.Item> */}
            </Settings.Group>
            <Settings.Group>
              <Settings.Item
                icon={Book}
                {...useLink({ href: '/privacy-policy' })}
                accentColor="$purple9"
              >
                Privacy Policy
              </Settings.Item>
              <Settings.Item
                icon={Book}
                {...useLink({ href: '/terms-of-service' })}
                accentColor="$purple9"
              >
                Terms Of Service
              </Settings.Item>
              {/* removing about from web since landing pages are more common on web - feel free to add back if needed */}
              {!isWeb && (
                <Settings.Item icon={Info} {...useLink({ href: '/about' })} accentColor="$blue9">
                  About
                </Settings.Item>
              )}
            </Settings.Group>
            <Settings.Group>
              <Settings.Item
                icon={Twitter}
                onPress={() => redirect('https://twitter.com/tamagui_js')}
                accentColor={brandColors.twitter}
              >
                Our Twitter
              </Settings.Item>
            </Settings.Group>
            <Settings.Group>
              <SettingsThemeAction />
              <SettingsItemLogoutAction />
            </Settings.Group>
          </Settings.Items>
        </Settings>
      </ScrollView>
      {/* 
      NOTE: you should probably get the actual native version here using https://www.npmjs.com/package/react-native-version-info
      we just did a simple package.json read since we want to keep things simple for the starter
       */}
      <Paragraph py="$2" ta="center" theme="alt2">
        {rootPackageJson.name} {packageJson.version}
      </Paragraph>
    </YStack>
  )
}

const SettingsThemeAction = () => {
  const { toggle, current } = useThemeSetting()

  return (
    <Settings.Item
      icon={Moon}
      accentColor="$blue9"
      onPress={toggle}
      rightLabel={current}
      // <Switch
      //   size="$4"
      //   checked={resolvedTheme === 'dark'}
      //   onCheckedChange={() => set(resolvedTheme === 'dark' ? 'light' : 'dark')}
      // >
      //   <Switch.Thumb animation="100ms" />
      // </Switch>
    >
      Theme
    </Settings.Item>
  )
}

const SettingsItemLogoutAction = () => {
  const { logOut } = useUser()

  return (
    <Settings.Item icon={LogOut} accentColor="$red9" onPress={() => logOut()}>
      Log Out
    </Settings.Item>
  )
}
