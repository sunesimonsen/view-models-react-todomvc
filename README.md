# TodoMVC - View Models React

A [TodoMVC](http://todomvc.com/) implementation using [@view-models/core](https://github.com/sunesimonsen/view-models-core) and [@view-models/react](https://github.com/sunesimonsen/view-models-react).

## Features

- **View Model Architecture**: Business logic separated in a testable `TodoApp`
- **React Integration**: Connected to React via the `useModelState` hook
- **TypeScript**: Fully typed throughout
- **Testing**: Comprehensive test coverage with Vitest
- **TodoMVC Compliant**: Implements the full TodoMVC specification
  - Create, edit, and delete todos
  - Mark todos as complete/incomplete
  - Filter todos (All, Active, Completed)
  - Clear completed todos
  - localStorage persistence
  - Routing with hash navigation

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

### Build

Build for production:

```bash
npm run build
```

### Test

Run the test suite:

```bash
npm run test
```

## Architecture

### ViewModel

The `TodoApp` extends `ViewModel<TodoState>` from `@view-models/core` and manages:

- Todo list state
- Filter state (all/active/completed)
- Edit mode state
- All business logic (CRUD operations, filtering, persistence)

### Components

- **App**: Root component that creates the `TodoApp` instance
- **TodoMVC**: Main container that connects routing and renders child components
- **Header**: Input field for creating new todos
- **TodoList**: Displays filtered todos with toggle-all checkbox
- **TodoItem**: Individual todo with edit mode, checkbox, and delete button
- **Footer**: Filter buttons, active count, and clear completed button

## Project Structure

```
src/
  components/       # React components
  state/            # TodoMVCModel and tests
  hooks/            # Custom hooks
  utils/            # Utilities (localStorage)
  types/            # TypeScript type definitions
  main.tsx          # Application entry point
```

## Credits

Created by [Sune Simonsen](https://github.com/sunesimonsen)

Part of [TodoMVC](http://todomvc.com)

## License

MIT License

Copyright (c) 2026 Sune Simonsen <sune@we-knowhow.dk>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
