'use client'

import TodoItem from './TodoItem'
import { useTodos } from '@/contexts/TodoContext'

export default function TodoList() {
  const { todos } = useTodos()
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