import { ViewModel } from "@view-models/core";
import type { Todo, FilterType } from "../types/Todo";
import { Storage } from "../utils/Storage";
import { TodoEditingModel } from "./TodoEditingModel";
import { TodoCreationModel } from "./TodoCreationModel";

export type TodoArray = ReadonlyArray<Todo>;

export type TodoState = {
  filter: FilterType;
  todos: TodoArray;
  filteredTodos: TodoArray;
  allCompleted: boolean;
  activeCount: number;
  completedCount: number;
};

const getFilteredTodos = (
  todos: TodoArray,
  filter: FilterType,
): ReadonlyArray<Todo> => {
  switch (filter) {
    case "active":
      return todos.filter((todo) => !todo.completed);
    case "completed":
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
};

const getCompletedCount = (todos: TodoArray) =>
  todos.reduce((count, todo) => count + (todo.completed ? 1 : 0), 0);

const getActiveCount = (todos: TodoArray) =>
  todos.length - getCompletedCount(todos);

const getAllCompleted = (todos: TodoArray) =>
  todos.length > 0 && todos.every((todo) => todo.completed);

export class TodoMVCModel extends ViewModel<TodoState> {
  storage: Storage;
  creation: TodoCreationModel;
  editing: TodoEditingModel;

  constructor(storage: Storage) {
    super({
      filter: "all",
      todos: [],
      filteredTodos: [],
      allCompleted: false,
      activeCount: 0,
      completedCount: 0,
    });

    const todos = storage.loadTodos();
    this.updateTodes(todos);

    this.storage = storage;
    this.creation = new TodoCreationModel();
    this.editing = new TodoEditingModel();
  }

  commitNewTodo(): void {
    const { title } = this.creation.state;
    this.creation.reset();
    this.addTodo(title);
  }

  addTodo(title: string): void {
    const trimmed = title.trim();
    if (!trimmed) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: trimmed,
      completed: false,
    };

    const newTodos = [...this.state.todos, newTodo];
    this.updateTodosAndSave(newTodos);
  }

  toggleTodo(id: string): void {
    const newTodos = this.state.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    this.updateTodosAndSave(newTodos);
  }

  deleteTodo(id: string): void {
    const newTodos = this.state.todos.filter((todo) => todo.id !== id);
    this.updateTodosAndSave(newTodos);
  }

  edit(todo: Todo): void {
    this.editing.start(todo.id, todo.title);
  }

  cancelEdit(): void {
    this.editing.reset();
  }

  commitEdit(): void {
    const { editingId, title } = this.editing.state;

    if (!editingId) return;

    this.cancelEdit();

    const trimmed = title.trim();

    // If empty, delete the todo
    if (!trimmed) {
      this.deleteTodo(editingId);
      return;
    }

    const newTodos = this.state.todos.map((todo) =>
      todo.id === editingId ? { ...todo, title: trimmed } : todo,
    );
    this.updateTodosAndSave(newTodos);
  }

  toggleAll(): void {
    const newTodos = this.state.todos.map((todo) => ({
      ...todo,
      completed: !this.state.allCompleted,
    }));
    this.updateTodosAndSave(newTodos);
  }

  clearCompleted(): void {
    const newTodos = this.state.todos.filter((todo) => !todo.completed);
    this.updateTodosAndSave(newTodos);
  }

  setFilter(filter: FilterType): void {
    this.update({
      filter,
      filteredTodos: getFilteredTodos(this.state.todos, filter),
    });
  }

  private updateTodosAndSave(todos: TodoArray) {
    this.updateTodes(todos);
    this.storage.saveTodos(todos);
  }

  private updateTodes(todos: TodoArray) {
    this.update({
      todos,
      filteredTodos: getFilteredTodos(todos, this.state.filter),
      activeCount: getActiveCount(todos),
      completedCount: getCompletedCount(todos),
      allCompleted: getAllCompleted(todos),
    });
  }
}
