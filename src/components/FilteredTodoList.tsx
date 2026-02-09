import { TodoItem } from "./TodoItem";
import { useTodos } from "../state/TodoMVCContext";

export const FilteredTodoList = () => {
  const { filteredTodos } = useTodos();

  return (
    <ul className="todo-list">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
