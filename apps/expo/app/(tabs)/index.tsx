import { HomeScreen } from 'app/features/home/screen'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Screen() {
  console.log(process.env.EXPO_PUBLIC_THING, 'hi xxxxx')
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'top']}>
      <HomeScreen />
    </SafeAreaView>
  )
}
