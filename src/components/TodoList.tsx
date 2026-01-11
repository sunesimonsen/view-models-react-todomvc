import { ToggleAllInput } from "./ToggleAllInput";
import { FilteredTodoList } from "./FilteredTodoList";
import { memo } from "react";
import { TodoMVCModelProps } from "../types/TodoMVCModelProps";

export const TodoList = memo(({ model }: TodoMVCModelProps) => (
  <section className="main">
    <ToggleAllInput model={model} />
    <FilteredTodoList model={model} />
  </section>
));
