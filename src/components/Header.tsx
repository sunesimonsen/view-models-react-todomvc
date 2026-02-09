import { memo } from "react";
import { NewTodoInput } from "./NewTodoInput";

export const Header = memo(() => (
  <header className="header">
    <h1>todos</h1>
    <NewTodoInput />
  </header>
));
