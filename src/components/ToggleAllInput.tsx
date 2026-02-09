import { useTodoMVCModel, useTodos } from "../state/TodoMVCContext";

export const ToggleAllInput = () => {
  const model = useTodoMVCModel();
  const { allCompleted } = useTodos();

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
};
