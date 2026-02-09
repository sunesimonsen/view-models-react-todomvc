import { useMemo } from "react";
import { TodoMVC } from "./TodoMVC";
import { Router } from "@nano-router/react";
import { routes } from "./routes";
import { createBrowserHistory } from "@nano-router/history";

export const App = () => {
  const history = useMemo(() => createBrowserHistory(), []);

  return (
    <Router history={history} routes={routes}>
      <TodoMVC />
    </Router>
  );
};
