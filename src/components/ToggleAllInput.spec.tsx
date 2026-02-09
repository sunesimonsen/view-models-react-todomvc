import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Todo } from "../types/Todo";
import { ToggleAllInput } from "./ToggleAllInput";
import { createModel, renderWithRouter } from "../test/createModel";

describe("ToggleAllInput", () => {
  it("marks all todos as completed", async () => {
    const todos: Todo[] = [
      { id: "1", title: "Todo 1", completed: false },
      { id: "2", title: "Todo 2", completed: false },
    ];
    const model = createModel(todos);

    renderWithRouter(<ToggleAllInput />, { model });

    await userEvent.click(screen.getByLabelText("Mark all as complete"));

    expect(model.state.todos.every((t) => t.completed)).toBe(true);
  });

  it("marks all todos as incomplete when all are completed", async () => {
    const todos: Todo[] = [
      { id: "1", title: "Todo 1", completed: true },
      { id: "2", title: "Todo 2", completed: true },
    ];
    const model = createModel(todos);

    renderWithRouter(<ToggleAllInput />, { model });

    await userEvent.click(screen.getByLabelText("Mark all as complete"));

    expect(model.state.todos.every((t) => !t.completed)).toBe(true);
  });

  it("reflects allCompleted state", () => {
    const todos: Todo[] = [
      { id: "1", title: "Todo 1", completed: true },
      { id: "2", title: "Todo 2", completed: true },
    ];
    const model = createModel(todos);

    renderWithRouter(<ToggleAllInput />, { model });

    expect(screen.getByLabelText("Mark all as complete")).toBeChecked();
  });
});
