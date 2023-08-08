import { observable } from '@legendapp/state'

export type Todo = {
  id: string
  name: string
  done: boolean
}
export const state$ = observable<{ todos: Todo[] }>({
  todos: [
    { id: '1', name: 'Contribute to OSS', done: false },
    { id: '2', name: "Learn about Tamagui's latest features", done: true },
    { id: '3', name: 'Upgrade to the new Expo version', done: false },
    { id: '4', name: 'Do the dishes', done: false },
  ],
})

export const addTodo = (name: Todo['name']) => {
  state$.todos.push({
    id: String(Date.now()),
    name,
    done: false,
  })
}

export const toggleTodo = (id: Todo['id']) => {
  const todo = state$.todos.find((todo) => todo.id.get() === id)
  todo?.done.set(!todo.done.get())
}

export const deleteTodo = (id: Todo['id']) => {
  const todo = state$.todos.find((todo) => todo.id.get() === id)
  todo?.delete()
}
