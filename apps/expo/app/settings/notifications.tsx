import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

import { NotificationsScreen } from 'app/features/settings/notifications-screen'
export default function Screen() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom', 'left', 'right']}>
      <Stack.Screen
        options={{
          title: 'Notifications',
        }}
      />
      <NotificationsScreen />
    </SafeAreaView>
  )
}
