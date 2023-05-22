import { ChangePasswordScreen } from 'app/features/settings/change-password-screen'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Screen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ChangePasswordScreen />
    </SafeAreaView>
  )
}
