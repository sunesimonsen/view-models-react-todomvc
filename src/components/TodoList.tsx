import { ToggleAllInput } from "./ToggleAllInput";
import { FilteredTodoList } from "./FilteredTodoList";

export const TodoList = () => (
  <section className="main">
    <ToggleAllInput />
    <FilteredTodoList />
  </section>
);
