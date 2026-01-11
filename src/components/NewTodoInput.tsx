import { useModelState } from "@view-models/react";
import { memo, useMemo } from "react";
import { TodoMVCModel } from "../state/TodoMVCModel";
import { TodoMVCModelProps } from "../types/TodoMVCModelProps";

const createEventHandlers = (model: TodoMVCModel) => ({
  onInput: (e: React.InputEvent<HTMLInputElement>) => {
    model.creation.updateTitle(e.currentTarget.value);
  },
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      model.commitNewTodo();
    }
  },
});

export const NewTodoInput = memo(({ model }: TodoMVCModelProps) => {
  const { title } = useModelState(model.creation);

  const { onKeyDown, onInput } = useMemo(
    () => createEventHandlers(model),
    [model],
  );

  return (
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      value={title}
      onInput={onInput}
      onKeyDown={onKeyDown}
      autoFocus
    />
  );
});
