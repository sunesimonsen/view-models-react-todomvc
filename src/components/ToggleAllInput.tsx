import { memo } from "react";
import { TodoMVCModelProps } from "../types/TodoMVCModelProps";
import { useModelState } from "@view-models/react";

export const ToggleAllInput = memo(({ model }: TodoMVCModelProps) => {
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
