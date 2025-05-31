class TodoApp {
    constructor() {
        this.todos = this.loadTodos();
        this.currentFilter = 'all';
        this.initElements();
        this.bindEvents();
        this.render();
    }

    initElements() {
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.todoCount = document.getElementById('todoCount');
        this.clearCompleted = document.getElementById('clearCompleted');
        this.filterBtns = document.querySelectorAll('.filter-btn');
    }

    bindEvents() {
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });
        this.todoInput.addEventListener('input', () => this.updateAddButton());
        
        this.clearCompleted.addEventListener('click', () => this.clearCompletedTodos());
        
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter));
        });
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    addTodo() {
        const text = this.todoInput.value.trim();
        
        if (!text) return;
        
        const todo = {
            id: this.generateId(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        this.todos.unshift(todo);
        this.todoInput.value = '';
        this.updateAddButton();
        this.saveTodos();
        this.render();
        
        // Add animation class to new item
        setTimeout(() => {
            const newItem = document.querySelector(`[data-id="${todo.id}"]`);
            if (newItem) newItem.classList.add('new');
        }, 10);
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveTodos();
        this.render();
    }

    toggleTodo(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
        }
    }

    clearCompletedTodos() {
        this.todos = this.todos.filter(todo => !todo.completed);
        this.saveTodos();
        this.render();
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        this.filterBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === filter) {
                btn.classList.add('active');
            }
        });
        
        this.render();
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(todo => !todo.completed);
            case 'completed':
                return this.todos.filter(todo => todo.completed);
            default:
                return this.todos;
        }
    }

    updateAddButton() {
        const hasText = this.todoInput.value.trim().length > 0;
        this.addBtn.disabled = !hasText;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) {
            return '今日';
        } else if (diffDays === 1) {
            return '昨日';
        } else if (diffDays < 7) {
            return `${diffDays}日前`;
        } else {
            return date.toLocaleDateString('ja-JP', {
                month: 'short',
                day: 'numeric'
            });
        }
    }

    createTodoElement(todo) {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.dataset.id = todo.id;
        
        li.innerHTML = `
            <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
            <span class="todo-text">${this.escapeHtml(todo.text)}</span>
            <span class="todo-date">${this.formatDate(todo.createdAt)}</span>
            <button class="delete-btn" title="削除">×</button>
        `;
        
        const checkbox = li.querySelector('.todo-checkbox');
        const deleteBtn = li.querySelector('.delete-btn');
        
        checkbox.addEventListener('change', () => this.toggleTodo(todo.id));
        deleteBtn.addEventListener('click', () => this.deleteTodo(todo.id));
        
        return li;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(todo => todo.completed).length;
        const active = total - completed;
        
        let countText;
        if (total === 0) {
            countText = 'タスクなし';
        } else {
            switch (this.currentFilter) {
                case 'active':
                    countText = `${active} 個の未完了タスク`;
                    break;
                case 'completed':
                    countText = `${completed} 個の完了済みタスク`;
                    break;
                default:
                    countText = `${total} 個のタスク (完了: ${completed})`;
            }
        }
        
        this.todoCount.textContent = countText;
        
        // Show/hide clear completed button
        this.clearCompleted.style.display = completed > 0 ? 'block' : 'none';
    }

    render() {
        const filteredTodos = this.getFilteredTodos();
        
        this.todoList.innerHTML = '';
        
        if (filteredTodos.length === 0) {
            const emptyState = document.createElement('li');
            emptyState.className = 'empty-state';
            
            let emptyMessage;
            switch (this.currentFilter) {
                case 'active':
                    emptyMessage = this.todos.length === 0 
                        ? '📝<br>新しいタスクを追加してください'
                        : '🎉<br>すべてのタスクが完了しました！';
                    break;
                case 'completed':
                    emptyMessage = '📋<br>完了済みのタスクはありません';
                    break;
                default:
                    emptyMessage = '📝<br>新しいタスクを追加してください';
            }
            
            emptyState.innerHTML = `<div class="empty-state-icon">${emptyMessage}</div>`;
            this.todoList.appendChild(emptyState);
        } else {
            filteredTodos.forEach(todo => {
                const todoElement = this.createTodoElement(todo);
                this.todoList.appendChild(todoElement);
            });
        }
        
        this.updateStats();
    }

    saveTodos() {
        try {
            localStorage.setItem('todos', JSON.stringify(this.todos));
        } catch (e) {
            console.error('Failed to save todos to localStorage:', e);
        }
    }

    loadTodos() {
        try {
            const saved = localStorage.getItem('todos');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error('Failed to load todos from localStorage:', e);
            return [];
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});