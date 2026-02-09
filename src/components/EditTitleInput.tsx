import { memo, useMemo } from "react";
import type { TodoMVCModel } from "../state/TodoMVCModel";
import { useTodoMVCModel, useEditing } from "../state/TodoMVCContext";

const createEventHandlers = (model: TodoMVCModel) => ({
  onSubmit: () => {
    model.commitEdit();
  },
  onKeydown: (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      model.commitEdit();
    } else if (e.key === "Escape") {
      model.cancelEdit();
    }
  },
  onInput: (e: React.InputEvent<HTMLInputElement>) => {
    model.editing.updateTitle(e.currentTarget.value);
  },
});

export const EditTitleInput = memo(() => {
  const model = useTodoMVCModel();
  const { title } = useEditing();

  const { onSubmit, onKeydown, onInput } = useMemo(
    () => createEventHandlers(model),
    [model],
  );

  return (
    <input
      autoFocus
      className="edit"
      value={title}
      onInput={onInput}
      onBlur={onSubmit}
      onKeyDown={onKeydown}
    />
  );
});
