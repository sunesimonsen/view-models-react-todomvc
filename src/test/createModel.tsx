import { render } from "@testing-library/react";
import { Router } from "@nano-router/react";
import { createMemoryHistory } from "@nano-router/history";
import { TodoMVCModel } from "../state/TodoMVCModel";
import { Storage } from "../utils/Storage";
import { Todo } from "../types/Todo";
import { routes } from "../components/routes";

class MemoryStorage implements Storage {
  todos: ReadonlyArray<Todo> = [];

  constructor(todos: ReadonlyArray<Todo> = []) {
    this.todos = todos;
  }

  loadTodos(): ReadonlyArray<Todo> {
    return this.todos;
  }

  saveTodos(todos: ReadonlyArray<Todo>): void {
    this.todos = todos;
  }
}

export const createModel = (todos: Todo[] = []) => {
  const storage = new MemoryStorage(todos);
  return new TodoMVCModel(storage);
};

export const renderWithRouter = (ui: React.ReactElement) => {
  const history = createMemoryHistory({});

  return render(
    <Router history={history} routes={routes}>
      {ui}
    </Router>,
  );
};
