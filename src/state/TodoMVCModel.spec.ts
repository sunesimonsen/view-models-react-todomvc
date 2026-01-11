import { describe, it, expect, beforeEach } from "vitest";
import { TodoMVCModel } from "./TodoMVCModel";
import { Storage } from "../utils/Storage";
import { Todo } from "../types/Todo";

class MemoryStorage implements Storage {
  todos: ReadonlyArray<Todo> = [];

  loadTodos(): ReadonlyArray<Todo> {
    return this.todos;
  }

  saveTodos(todos: ReadonlyArray<Todo>): void {
    this.todos = todos;
  }
}

describe("TodoMVCModel", () => {
  let storage: MemoryStorage;
  let viewModel: TodoMVCModel;

  beforeEach(() => {
    storage = new MemoryStorage();
    viewModel = new TodoMVCModel(storage);
  });

  describe("initialization", () => {
    it("initializes with default state", () => {
      expect(viewModel.state.todos).toEqual([]);
      expect(viewModel.state.filter).toBe("all");
      expect(viewModel.editing.state.editingId).toBeNull();
    });

    it("loads todos from storage", () => {
      const todos = [{ id: "1", title: "Test todo", completed: false }];
      storage.saveTodos(todos);
      const viewModel = new TodoMVCModel(storage);

      expect(viewModel.state.todos).toEqual(todos);
    });
  });

  describe("addTodo", () => {
    it("adds a new todo", () => {
      viewModel.addTodo("New todo");

      expect(viewModel.state.todos).toHaveLength(1);
      expect(viewModel.state.todos[0].title).toBe("New todo");
      expect(viewModel.state.todos[0].completed).toBe(false);
      expect(viewModel.state.todos[0].id).toBeDefined();
    });

    it("trims whitespace from title", () => {
      viewModel.addTodo("  Trimmed  ");

      expect(viewModel.state.todos[0].title).toBe("Trimmed");
    });

    it("does not add empty todos", () => {
      viewModel.addTodo("   ");

      expect(viewModel.state.todos).toHaveLength(0);
    });

    it("saves to storage", () => {
      viewModel.addTodo("Test");

      const stored = storage.todos;
      expect(stored).toHaveLength(1);
      expect(stored[0].title).toBe("Test");
    });
  });

  describe("toggleTodo", () => {
    it("toggles todo completion status", () => {
      viewModel.addTodo("Test");
      const todoId = viewModel.state.todos[0].id;

      viewModel.toggleTodo(todoId);
      expect(viewModel.state.todos[0].completed).toBe(true);

      viewModel.toggleTodo(todoId);
      expect(viewModel.state.todos[0].completed).toBe(false);
    });

    it("saves to storage", () => {
      viewModel.addTodo("Test");
      const todoId = viewModel.state.todos[0].id;

      viewModel.toggleTodo(todoId);

      const stored = storage.todos;
      expect(stored[0].completed).toBe(true);
    });
  });

  describe("deleteTodo", () => {
    it("deletes a todo", () => {
      viewModel.addTodo("Test 1");
      viewModel.addTodo("Test 2");
      const todoId = viewModel.state.todos[0].id;

      viewModel.deleteTodo(todoId);

      expect(viewModel.state.todos).toHaveLength(1);
      expect(viewModel.state.todos[0].title).toBe("Test 2");
    });

    it("saves to storage", () => {
      viewModel.addTodo("Test 1");
      viewModel.addTodo("Test 2");
      const todoId = viewModel.state.todos[0].id;

      viewModel.deleteTodo(todoId);

      const stored = storage.todos;
      expect(stored).toHaveLength(1);
    });
  });

  describe("editTodo", () => {
    it("edits a todo title", () => {
      viewModel.addTodo("Original");
      const todo = viewModel.state.todos[0];

      viewModel.edit(todo);
      viewModel.editing.updateTitle("Updated");
      viewModel.commitEdit();

      expect(viewModel.state.todos[0].title).toBe("Updated");
      expect(viewModel.editing.state.editingId).toBeNull();
    });

    it("trims whitespace", () => {
      viewModel.addTodo("Original");
      const todo = viewModel.state.todos[0];

      viewModel.edit(todo);
      viewModel.editing.updateTitle("  Updated  ");
      viewModel.commitEdit();

      expect(viewModel.state.todos[0].title).toBe("Updated");
    });

    it("deletes todo if title is empty", () => {
      viewModel.addTodo("Test");
      const todo = viewModel.state.todos[0];

      viewModel.edit(todo);
      viewModel.editing.updateTitle("  ");
      viewModel.commitEdit();

      expect(viewModel.state.todos).toHaveLength(0);
    });

    it("saves to storage", () => {
      viewModel.addTodo("Original");

      const todo = viewModel.state.todos[0];

      viewModel.edit(todo);
      viewModel.editing.updateTitle("Updated");
      viewModel.commitEdit();

      const stored = storage.todos;
      expect(stored[0].title).toBe("Updated");
    });
  });

  describe("editing state", () => {
    it("starts editing", () => {
      viewModel.addTodo("Test");
      const todo = viewModel.state.todos[0];

      viewModel.edit(todo);

      expect(viewModel.editing.state.editingId).toBe(todo.id);
    });

    it("cancels editing", () => {
      viewModel.addTodo("Original");
      const todo = viewModel.state.todos[0];

      viewModel.edit(todo);
      viewModel.editing.updateTitle("Updated");
      viewModel.cancelEdit();

      expect(viewModel.editing.state.editingId).toBeNull();
      expect(viewModel.state.todos[0].title).toBe("Original");
    });
  });

  describe("toggleAll", () => {
    it("marks all todos as completed", () => {
      viewModel.addTodo("Test 1");
      viewModel.addTodo("Test 2");

      viewModel.toggleAll();

      expect(viewModel.state.todos.every((todo) => todo.completed)).toBe(true);
    });

    it("marks all todos as incomplete if all are completed", () => {
      viewModel.addTodo("Test 1");
      viewModel.addTodo("Test 2");
      viewModel.toggleAll();

      viewModel.toggleAll();

      expect(viewModel.state.todos.every((todo) => !todo.completed)).toBe(true);
    });

    it("saves to storage", () => {
      viewModel.addTodo("Test 1");
      viewModel.addTodo("Test 2");

      viewModel.toggleAll();

      const stored = storage.todos;
      expect(stored.every((todo: any) => todo.completed)).toBe(true);
    });
  });

  describe("clearCompleted", () => {
    it("removes all completed todos", () => {
      viewModel.addTodo("Test 1");
      viewModel.addTodo("Test 2");
      viewModel.addTodo("Test 3");

      const id1 = viewModel.state.todos[0].id;
      const id2 = viewModel.state.todos[1].id;

      viewModel.toggleTodo(id1);
      viewModel.toggleTodo(id2);

      viewModel.clearCompleted();

      expect(viewModel.state.todos).toHaveLength(1);
      expect(viewModel.state.todos[0].title).toBe("Test 3");
    });

    it("saves to storage", () => {
      viewModel.addTodo("Test 1");
      viewModel.addTodo("Test 2");
      viewModel.toggleTodo(viewModel.state.todos[0].id);

      viewModel.clearCompleted();

      const stored = storage.todos;
      expect(stored).toHaveLength(1);
    });
  });

  describe("setFilter", () => {
    it("updates filter", () => {
      viewModel.setFilter("active");
      expect(viewModel.state.filter).toBe("active");

      viewModel.setFilter("completed");
      expect(viewModel.state.filter).toBe("completed");

      viewModel.setFilter("all");
      expect(viewModel.state.filter).toBe("all");
    });
  });

  describe("filteredTodos", () => {
    it('returns all todos when filter is "all"', () => {
      viewModel.addTodo("Test 1");
      viewModel.addTodo("Test 2");
      viewModel.toggleTodo(viewModel.state.todos[0].id);

      viewModel.setFilter("all");

      const { filteredTodos } = viewModel.state;

      expect(filteredTodos).toHaveLength(2);
    });

    it('returns only active todos when filter is "active"', () => {
      viewModel.addTodo("Test 1");
      viewModel.addTodo("Test 2");
      viewModel.toggleTodo(viewModel.state.todos[0].id);

      viewModel.setFilter("active");

      const { filteredTodos } = viewModel.state;

      expect(filteredTodos).toHaveLength(1);
      expect(filteredTodos[0].title).toBe("Test 2");
    });

    it('returns only completed todos when filter is "completed"', () => {
      viewModel.addTodo("Test 1");
      viewModel.addTodo("Test 2");
      viewModel.toggleTodo(viewModel.state.todos[0].id);

      viewModel.setFilter("completed");

      const { filteredTodos } = viewModel.state;

      expect(filteredTodos).toHaveLength(1);
      expect(filteredTodos[0].title).toBe("Test 1");
    });
  });

  describe("activeCount", () => {
    it("counts active todos", () => {
      viewModel.addTodo("Test 1");
      viewModel.addTodo("Test 2");
      viewModel.addTodo("Test 3");
      viewModel.toggleTodo(viewModel.state.todos[0].id);

      const { activeCount } = viewModel.state;

      expect(activeCount).toBe(2);
    });
  });

  describe("completedCount", () => {
    it("counts completed todos", () => {
      viewModel.addTodo("Test 1");
      viewModel.addTodo("Test 2");
      viewModel.addTodo("Test 3");
      viewModel.toggleTodo(viewModel.state.todos[0].id);
      viewModel.toggleTodo(viewModel.state.todos[1].id);

      const { completedCount } = viewModel.state;

      expect(completedCount).toBe(2);
    });
  });

  describe("allCompleted", () => {
    it("returns true when all todos are completed", () => {
      viewModel.addTodo("Test 1");
      viewModel.addTodo("Test 2");
      viewModel.toggleAll();

      const { allCompleted } = viewModel.state;

      expect(allCompleted).toBe(true);
    });

    it("returns false when some todos are incomplete", () => {
      viewModel.addTodo("Test 1");
      viewModel.addTodo("Test 2");
      viewModel.toggleTodo(viewModel.state.todos[0].id);

      const { allCompleted } = viewModel.state;

      expect(allCompleted).toBe(false);
    });

    it("returns false when there are no todos", () => {
      const { allCompleted } = viewModel.state;

      expect(allCompleted).toBe(false);
    });
  });
});
