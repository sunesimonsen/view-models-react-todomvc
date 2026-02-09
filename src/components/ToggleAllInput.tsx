import { memo } from "react";
import { useModelState } from "@view-models/react";
import { useTodoMVCModel } from "../state/TodoMVCContext";

export const ToggleAllInput = memo(() => {
  const model = useTodoMVCModel();
  const { allCompleted } = useModelState(model);

  return (
    <>
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        checked={allCompleted}
        onChange={() => model.toggleAll()}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
});
