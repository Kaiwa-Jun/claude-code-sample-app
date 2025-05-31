'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Todo } from '@/types/todo'
import { mockTodos } from '@/data/mockTodos'

interface TodoContextType {
  todos: Todo[]
  addTodo: (title: string, description?: string) => void
  updateTodo: (id: string, updates: Partial<Pick<Todo, 'title' | 'description'>>) => void
}

const TodoContext = createContext<TodoContextType | undefined>(undefined)

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>(mockTodos)

  const addTodo = (title: string, description?: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      description,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setTodos([newTodo, ...todos])
  }

  const updateTodo = (id: string, updates: Partial<Pick<Todo, 'title' | 'description'>>) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, ...updates, updatedAt: new Date() }
        : todo
    ))
  }

  return (
    <TodoContext.Provider value={{ todos, addTodo, updateTodo }}>
      {children}
    </TodoContext.Provider>
  )
}

export function useTodos() {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider')
  }
  return context
}