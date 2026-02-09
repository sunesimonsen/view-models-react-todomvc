import { TodoItem } from "./TodoItem";
import { memo } from "react";
import { useTodos } from "../state/TodoMVCContext";

export const FilteredTodoList = memo(() => {
  const { filteredTodos } = useTodos();

  return (
    <ul className="todo-list">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
});
