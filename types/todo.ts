export type TodoStatus = 'pending' | 'in_progress' | 'completed'

export interface Todo {
  id: string
  title: string
  description?: string
  status: TodoStatus
  createdAt: Date
  updatedAt: Date
}