import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Todo } from "../types/Todo";
import { Footer } from "./Footer";
import { createModel, renderWithRouter } from "../test/createModel";

describe("Footer", () => {
  it("displays active item count", () => {
    const todos: Todo[] = [
      { id: "1", title: "Active 1", completed: false },
      { id: "2", title: "Active 2", completed: false },
      { id: "3", title: "Completed", completed: true },
    ];
    const model = createModel(todos);

    renderWithRouter(<Footer />, { model });

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText(/items left/)).toBeInTheDocument();
  });

  it("uses singular 'item' when count is 1", () => {
    const todos: Todo[] = [{ id: "1", title: "Only one", completed: false }];
    const model = createModel(todos);

    renderWithRouter(<Footer />, { model });

    expect(screen.getByText(/item left/)).toBeInTheDocument();
    expect(screen.queryByText(/items left/)).not.toBeInTheDocument();
  });

  it("clears completed todos when button is clicked", async () => {
    const todos: Todo[] = [
      { id: "1", title: "Active", completed: false },
      { id: "2", title: "Completed", completed: true },
    ];
    const model = createModel(todos);

    renderWithRouter(<Footer />, { model });

    await userEvent.click(screen.getByText("Clear completed"));

    expect(model.state.todos).toHaveLength(1);
    expect(model.state.todos[0].title).toBe("Active");
  });

  it("hides clear completed button when no completed todos", () => {
    const todos: Todo[] = [{ id: "1", title: "Active", completed: false }];
    const model = createModel(todos);

    renderWithRouter(<Footer />, { model });

    expect(screen.queryByText("Clear completed")).not.toBeInTheDocument();
  });
});
