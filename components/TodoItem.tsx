'use client'

import { useState, useEffect, useRef } from 'react'
import { Todo } from '@/types/todo'
import { useTodos } from '@/contexts/TodoContext'
import ConfirmDialog from './ConfirmDialog'

interface TodoItemProps {
  todo: Todo
}

export default function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [editDescription, setEditDescription] = useState(todo.description || '')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { updateTodo, updateTodoStatus, deleteTodo } = useTodos()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowStatusDropdown(false)
      }
    }

    if (showStatusDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showStatusDropdown])

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getStatusColor = (status: Todo['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800'
      case 'pending':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: Todo['status']) => {
    switch (status) {
      case 'completed':
        return '完了'
      case 'in_progress':
        return '進行中'
      case 'pending':
        return '未着手'
      default:
        return status
    }
  }

  const handleSave = () => {
    if (!editTitle.trim()) {
      setEditTitle(todo.title)
      return
    }
    
    updateTodo(todo.id, {
      title: editTitle.trim(),
      description: editDescription.trim() || undefined,
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditTitle(todo.title)
    setEditDescription(todo.description || '')
    setIsEditing(false)
  }

  const handleDelete = () => {
    deleteTodo(todo.id)
    setShowDeleteConfirm(false)
  }

  const handleStatusChange = (status: Todo['status']) => {
    updateTodoStatus(todo.id, status)
    setShowStatusDropdown(false)
  }

  const handleCheckboxToggle = () => {
    const newStatus = todo.status === 'completed' ? 'pending' : 'completed'
    updateTodoStatus(todo.id, newStatus)
  }

  if (isEditing) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md border-2 border-blue-400">
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 text-lg font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="タイトル"
            autoFocus
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="詳細説明（オプション）"
            rows={2}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={handleCancel}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
            >
              キャンセル
            </button>
            <button
              onClick={handleSave}
              disabled={!editTitle.trim()}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            >
              保存
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow group">
        <div className="flex items-start">
          <input
            type="checkbox"
            checked={todo.status === 'completed'}
            onChange={handleCheckboxToggle}
            className="mt-1 mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
            title={todo.status === 'completed' ? '未完了にする' : '完了にする'}
          />
          <div className="flex-1">
            <h3 className={`text-lg font-semibold ${todo.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
              {todo.title}
            </h3>
            {todo.description && (
              <p className={`mt-1 text-sm ${todo.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-600'}`}>
                {todo.description}
              </p>
            )}
            <div className="mt-2 text-xs text-gray-500">
              作成日時: {formatDate(todo.createdAt)}
              {todo.updatedAt > todo.createdAt && (
                <span className="ml-3">
                  更新日時: {formatDate(todo.updatedAt)}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-start gap-2 ml-4">
          <button
            onClick={() => setIsEditing(true)}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-500 hover:text-blue-600"
            title="編集"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-500 hover:text-red-600"
            title="削除"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer hover:opacity-80 ${getStatusColor(
                todo.status
              )}`}
            >
              {getStatusText(todo.status)}
              <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showStatusDropdown && (
              <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <button
                  onClick={() => handleStatusChange('pending')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  未着手
                </button>
                <button
                  onClick={() => handleStatusChange('in_progress')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  進行中
                </button>
                <button
                  onClick={() => handleStatusChange('completed')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  完了
                </button>
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="TODOを削除"
        message={`「${todo.title}」を削除しますか？この操作は取り消せません。`}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </>
  )
}