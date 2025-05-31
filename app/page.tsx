import TodoList from '@/components/TodoList'
import { mockTodos } from '@/data/mockTodos'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">TODOリスト</h1>
          <p className="text-gray-600 mt-2">
            タスクを管理して、生産性を向上させましょう
          </p>
        </header>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <TodoList todos={mockTodos} />
        </div>
      </div>
    </main>
  )
}