'use client'

import { useState } from 'react'
import { useTodos } from '@/contexts/TodoContext'

export default function TodoForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const { addTodo } = useTodos()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim()) {
      return
    }

    setIsSubmitting(true)
    
    addTodo(title.trim(), description.trim() || undefined)
    
    setTitle('')
    setDescription('')
    setIsSubmitting(false)
    
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">新しいTODOを作成</h2>
      
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          タイトル <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="TODOのタイトルを入力"
          required
        />
        {!title.trim() && title !== '' && (
          <p className="mt-1 text-sm text-red-600">タイトルは必須です</p>
        )}
      </div>
      
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          詳細説明（オプション）
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="TODOの詳細を入力"
          rows={3}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={!title.trim() || isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? '作成中...' : 'TODOを作成'}
        </button>
        
        {showSuccess && (
          <span className="text-green-600 text-sm animate-fade-in">
            ✓ TODOが作成されました
          </span>
        )}
      </div>
    </form>
  )
}