import { memo, useMemo } from "react";
import { TodoMVCModel } from "../state/TodoMVCModel";
import { useModelState } from "@view-models/react";
import { TodoMVCModelProps } from "../types/TodoMVCModelProps";

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

export const EditTitleInput = memo(({ model }: TodoMVCModelProps) => {
  const { title } = useModelState(model.editing);

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
