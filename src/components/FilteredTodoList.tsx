import { TodoItem } from "./TodoItem";
import { memo } from "react";
import { useModelState } from "@view-models/react";
import { useTodoMVCModel } from "../state/TodoMVCContext";

export const FilteredTodoList = memo(() => {
  const model = useTodoMVCModel();
  const { filteredTodos } = useModelState(model);

  return (
    <ul className="todo-list">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
});
