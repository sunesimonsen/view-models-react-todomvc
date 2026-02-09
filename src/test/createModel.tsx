import { render } from "@testing-library/react";
import { Router } from "@nano-router/react";
import { createMemoryHistory } from "@nano-router/history";
import { TodoMVCModel } from "../state/TodoMVCModel";
import { Storage } from "../utils/Storage";
import { Todo } from "../types/Todo";
import { routes } from "../components/routes";
import { TodoMVCContext } from "../state/TodoMVCContext";

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
  const model = new TodoMVCModel(storage);
  model.loadTodos();
  return model;
};

interface RenderOptions {
  model: TodoMVCModel;
}

export const renderWithRouter = (
  ui: React.ReactElement,
  { model }: RenderOptions,
) => {
  const history = createMemoryHistory({});

  return render(
    <TodoMVCContext.Provider value={model}>
      <Router history={history} routes={routes}>
        {ui}
      </Router>
    </TodoMVCContext.Provider>,
  );
};
