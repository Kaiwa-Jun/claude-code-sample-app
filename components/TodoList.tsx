'use client'

import { useState } from 'react'
import TodoItem from './TodoItem'
import { useTodos } from '@/contexts/TodoContext'

export default function TodoList() {
  const { todos } = useTodos()
  const [showCompleted, setShowCompleted] = useState(true)
  
  const filteredTodos = showCompleted 
    ? todos 
    : todos.filter(todo => todo.status !== 'completed')
  
  const completedCount = todos.filter(todo => todo.status === 'completed').length
  
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
    <div>
      {completedCount > 0 && (
        <div className="mb-4 flex items-center justify-between">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showCompleted}
              onChange={(e) => setShowCompleted(e.target.checked)}
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">
              完了したタスクを表示 ({completedCount}件)
            </span>
          </label>
        </div>
      )}
      {filteredTodos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">表示するTODOアイテムがありません</p>
          <p className="text-gray-400 text-sm mt-2">
            フィルター設定を変更するか、新しいTODOを作成してください
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  )
}