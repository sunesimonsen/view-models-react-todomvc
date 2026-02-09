import { memo, useEffect } from "react";
import { Header } from "./Header";
import { TodoList } from "./TodoList";
import { Footer } from "./Footer";
import { useRouteName } from "@nano-router/react";
import { FilterType } from "../types/Todo";
import { useTodoMVCModel, useTodos } from "../state/TodoMVCContext";

const routeToFilter = (route: string): FilterType => {
  switch (route) {
    case "active":
    case "completed":
      return route;
    default:
      return "all";
  }
};

export const TodoMVC = memo(() => {
  const route = useRouteName();
  const model = useTodoMVCModel();
  const { todos } = useTodos();

  useEffect(() => {
    model.setFilter(routeToFilter(route));
    model.loadTodos();
  }, [route, model]);

  return (
    <>
      <section className="todoapp" id="root">
        <div className="todoapp">
          <Header />
          {todos && <TodoList />}
          {todos && <Footer />}
        </div>
      </section>
      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>
          Created by <a href="https://github.com/sunesimonsen">Sune Simonsen</a>
        </p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </>
  );
});
