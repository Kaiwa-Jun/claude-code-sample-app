# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TODO application built with Next.js (App Router) and TypeScript. The application allows users to create, view, and edit TODO items.

## Technology Stack

- **Framework**: Next.js 13.5.6 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API

## Project Structure

```
claude-code-sample-app/
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles with Tailwind
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page with TODO list
├── components/            # React components
│   ├── TodoForm.tsx       # Form for creating new TODOs
│   ├── TodoItem.tsx       # Individual TODO item display/edit
│   └── TodoList.tsx       # TODO list container
├── contexts/              # React Context providers
│   └── TodoContext.tsx    # TODO state management
├── data/                  # Mock data
│   └── mockTodos.ts       # Sample TODO items
├── types/                 # TypeScript type definitions
│   └── todo.ts           # TODO type definitions
└── package.json          # Project dependencies

```

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## Features Implemented

1. **TODO List Display** (#4)
   - Display all TODO items with title, description, status, and timestamps
   - Status color coding (Completed: green, In Progress: yellow, Pending: gray)
   - Empty state message when no TODOs exist

2. **TODO Creation** (#3)
   - Create new TODO with title (required) and description (optional)
   - Automatic ID generation and timestamp
   - Form validation for empty titles
   - Success feedback on creation

3. **TODO Editing** (#5)
   - Inline editing with edit mode toggle
   - Edit title and description
   - Automatic update timestamp
   - Save/Cancel functionality
   - Validation to prevent empty titles

## Code Conventions

- **Components**: Functional components with TypeScript interfaces
- **State Management**: React Context for global state
- **Styling**: Tailwind CSS utility classes
- **Date Handling**: Native JavaScript Date objects
- **ID Generation**: Timestamp-based unique IDs

## Testing

Currently, no automated tests are implemented. When adding tests:
- Use Jest and React Testing Library for unit tests
- Test component rendering and user interactions
- Test Context API state management

## Future Enhancements

Planned features based on GitHub issues:
- TODO deletion functionality (#6)
- TODO status management (pending/in_progress/completed) (#7)
- Filtering and search capabilities (#8)
- Backend API integration
- Data persistence