import { ObservableObject } from '@legendapp/state'
import { observer } from '@legendapp/state/react'
import {
  Adapt,
  Button,
  Dialog,
  H1,
  ScrollView,
  Sheet,
  SubmitButton,
  TodoCard as TodoCardBase,
  Unspaced,
  XStack,
  YStack,
  isWeb,
} from '@my/ui'
import { Plus, X } from '@tamagui/lucide-icons'
import { SchemaForm, formFields } from 'app/utils/SchemaForm'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Todo, addTodo, state$, toggleTodo } from './store'

const TodoCard = observer(function TodoCard({ todo }: { todo: ObservableObject<Todo> }) {
  return (
    <TodoCardBase
      label={todo.name.get()}
      checked={todo.done.get()}
      onCheckedChange={() => toggleTodo(todo.id.get())}
    />
  )
})

const TodoAddSchema = z.object({
  todo: formFields.text.describe('Todo // Add the deps array to your useEffect...'),
})

const TodoList = observer(function TodoList() {
  const { todos } = state$

  return (
    <ScrollView>
      {todos.map((todo) => (
        <TodoCard key={todo.id.get()} todo={todo} />
      ))}
    </ScrollView>
  )
})

export const AddTodo = function AddTodo({
  triggerButton = (
    <Button themeInverse icon={Plus}>
      Add Todo
    </Button>
  ),
}: {
  triggerButton: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
      }}
    >
      <Dialog.Trigger asChild>{triggerButton}</Dialog.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame gap="$4">
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay animation="quick" />
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
          minWidth={400}
          bordered
          elevate
          key="content"
          animateOnly={['transform', 'opacity']}
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          space
        >
          <Dialog.Title p="$4">Add Todo</Dialog.Title>
          <AddTodoForm onAdd={() => setOpen(false)} />

          <Unspaced>
            <Dialog.Close asChild>
              <Button position="absolute" top="$3" right="$3" size="$2" circular icon={X} />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}

const AddTodoForm = function ({ onAdd }: { onAdd?: () => void }) {
  const form = useForm<z.infer<typeof TodoAddSchema>>()
  return (
    <SchemaForm
      form={form}
      schema={TodoAddSchema}
      onSubmit={(data) => {
        addTodo(data.todo)
        form.reset()
        onAdd?.()
      }}
      renderAfter={({ submit }) => (
        <SubmitButton onPress={() => submit()} borderRadius="$10" themeInverse>
          Add Todo
        </SubmitButton>
      )}
    />
  )
}

export function TodosScreen() {
  return (
    <YStack $platform-web={{ p: '$4' }} gap="$5" f={1}>
      {isWeb && (
        <XStack jc="space-between" gap="$4" flexWrap="wrap">
          <H1 ta="center">Todos</H1>
          <AddTodo />
        </XStack>
      )}

      <TodoList />
    </YStack>
  )
}
