import { Button } from '@my/ui'
import { Plus } from '@tamagui/lucide-icons'
import { AddTodo, TodosScreen } from 'app/features/todos/screen'
import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Screen() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom', 'left', 'right']}>
      <Stack.Screen
        options={{
          title: 'Todos',
          headerRight: ({ tintColor }) => <AddTodoButton tintColor={tintColor} />,
        }}
      />
      <TodosScreen />
    </SafeAreaView>
  )
}

function AddTodoButton({ tintColor }: { tintColor?: string }) {
  return (
    <AddTodo
      triggerButton={
        <Button circular chromeless>
          <Plus color={tintColor} />
        </Button>
      }
    />
  )
}
