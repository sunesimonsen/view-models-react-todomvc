import { memo, useEffect } from "react";
import { Header } from "./Header";
import { TodoList } from "./TodoList";
import { Footer } from "./Footer";
import { useRouteName } from "@nano-router/react";
import { FilterType } from "../types/Todo";
import { useModelState } from "@view-models/react";
import { TodoMVCModelProps } from "../types/TodoMVCModelProps";

const routeToFilter = (route: string): FilterType => {
  switch (route) {
    case "active":
    case "completed":
      return route;
    default:
      return "all";
  }
};

export const TodoMVC = memo(({ model }: TodoMVCModelProps) => {
  const route = useRouteName();
  const { todos } = useModelState(model);

  useEffect(() => {
    model.setFilter(routeToFilter(route));
  }, [route]);

  return (
    <>
      <section className="todoapp" id="root">
        <div className="todoapp">
          <Header model={model} />
          {todos && <TodoList model={model} />}
          {todos && <Footer model={model} />}
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
