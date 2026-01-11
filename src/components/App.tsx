import { useMemo } from "react";
import { TodoMVCModel } from "../state/TodoMVCModel";
import { TodoMVC } from "./TodoMVC";
import { Router } from "@nano-router/react";
import { routes } from "./routes";
import { createBrowserHistory } from "@nano-router/history";
import { LocalStorage } from "../utils/Storage";

export const App = () => {
  const model = useMemo(() => new TodoMVCModel(new LocalStorage()), []);
  const history = useMemo(() => createBrowserHistory(), []);

  return (
    <Router history={history} routes={routes}>
      <TodoMVC model={model} />
    </Router>
  );
};
