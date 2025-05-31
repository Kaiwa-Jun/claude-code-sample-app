'use client'

import { Todo } from '@/types/todo'
import TodoItem from './TodoItem'

interface TodoListProps {
  todos: Todo[]
}

export default function TodoList({ todos }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">TODOアイテムがありません</p>
        <p className="text-gray-400 text-sm mt-2">
          新しいTODOを作成してください
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}