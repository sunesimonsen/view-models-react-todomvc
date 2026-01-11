import { TodoItem } from "./TodoItem";
import { memo } from "react";
import { TodoMVCModelProps } from "../types/TodoMVCModelProps";
import { useModelState } from "@view-models/react";

export const FilteredTodoList = memo(({ model }: TodoMVCModelProps) => {
  const { filteredTodos } = useModelState(model);

  return (
    <ul className="todo-list">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} model={model} />
      ))}
    </ul>
  );
});
