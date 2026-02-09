import { ToggleAllInput } from "./ToggleAllInput";
import { FilteredTodoList } from "./FilteredTodoList";
import { memo } from "react";

export const TodoList = memo(() => (
  <section className="main">
    <ToggleAllInput />
    <FilteredTodoList />
  </section>
));
