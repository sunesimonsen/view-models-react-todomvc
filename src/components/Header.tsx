import { memo } from "react";
import { TodoMVCModelProps } from "../types/TodoMVCModelProps";
import { NewTodoInput } from "./NewTodoInput";

export const Header = memo(({ model }: TodoMVCModelProps) => (
  <header className="header">
    <h1>todos</h1>
    <NewTodoInput model={model} />
  </header>
));
