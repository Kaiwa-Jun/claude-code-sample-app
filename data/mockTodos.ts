import { Todo } from '@/types/todo'

export const mockTodos: Todo[] = [
  {
    id: '1',
    title: 'プロジェクトの企画書を作成',
    description: '新規プロジェクトの企画書を作成し、関係者にレビューを依頼する',
    status: 'completed',
    createdAt: new Date('2024-01-15T09:00:00'),
    updatedAt: new Date('2024-01-16T14:30:00'),
  },
  {
    id: '2',
    title: 'ミーティングの準備',
    description: '明日のクライアントミーティングのアジェンダと資料を準備',
    status: 'in_progress',
    createdAt: new Date('2024-01-16T10:00:00'),
    updatedAt: new Date('2024-01-16T15:00:00'),
  },
  {
    id: '3',
    title: 'コードレビュー',
    description: 'チームメンバーのPRをレビューして、フィードバックを提供',
    status: 'pending',
    createdAt: new Date('2024-01-16T11:00:00'),
    updatedAt: new Date('2024-01-16T11:00:00'),
  },
  {
    id: '4',
    title: 'ドキュメント更新',
    description: 'APIドキュメントを最新の仕様に更新する',
    status: 'pending',
    createdAt: new Date('2024-01-16T13:00:00'),
    updatedAt: new Date('2024-01-16T13:00:00'),
  },
  {
    id: '5',
    title: 'テストコードの作成',
    description: '新機能のユニットテストとインテグレーションテストを作成',
    status: 'in_progress',
    createdAt: new Date('2024-01-16T14:00:00'),
    updatedAt: new Date('2024-01-16T16:00:00'),
  },
  {
    id: '6',
    title: 'バグ修正',
    description: '本番環境で報告されたバグを調査して修正',
    status: 'completed',
    createdAt: new Date('2024-01-15T08:00:00'),
    updatedAt: new Date('2024-01-15T17:00:00'),
  },
]