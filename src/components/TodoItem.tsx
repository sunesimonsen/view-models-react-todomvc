import { useEffect, useRef } from "react";
import type { Todo } from "../types/Todo";
import { useModelState } from "@view-models/react";
import { EditTitleInput } from "./EditTitleInput";
import classes from "obj-str";
import { useTodoMVCModel } from "../state/TodoMVCContext";

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const model = useTodoMVCModel();
  const editInputRef = useRef<HTMLInputElement>(null);
  const { editingId } = useModelState(model.editing);

  const isEditing = todo.id === editingId;

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [isEditing]);

  const handleEdit = () => {
    model.edit(todo);
  };

  return (
    <li className={classes({ completed: todo.completed, editing: isEditing })}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => model.toggleTodo(todo.id)}
        />
        <label onDoubleClick={handleEdit}>{todo.title}</label>
        <button className="destroy" onClick={() => model.deleteTodo(todo.id)} />
      </div>
      {isEditing && <EditTitleInput />}
    </li>
  );
};
