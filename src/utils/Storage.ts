import type { Todo } from "../types/Todo";

const STORAGE_KEY = "todos-view-models-react";

export interface Storage {
  loadTodos(): ReadonlyArray<Todo>;
  saveTodos(todos: ReadonlyArray<Todo>): void;
}

export class LocalStorage implements Storage {
  loadTodos(): ReadonlyArray<Todo> {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to load todos from localStorage:", error);
      return [];
    }
  }

  saveTodos(todos: ReadonlyArray<Todo>): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error("Failed to save todos to localStorage:", error);
    }
  }
}
