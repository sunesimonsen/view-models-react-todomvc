import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Todo } from "../types/Todo";
import { TodoItem } from "./TodoItem";
import { createModel, renderWithRouter } from "../test/createModel";

describe("TodoItem", () => {
  it("toggles completion when checkbox is clicked", async () => {
    const todo: Todo = { id: "1", title: "Test todo", completed: false };
    const model = createModel([todo]);

    renderWithRouter(<TodoItem todo={model.state.todos[0]} />, { model });

    await userEvent.click(screen.getByRole("checkbox"));

    expect(model.state.todos[0].completed).toBe(true);
  });

  it("deletes todo when destroy button is clicked", async () => {
    const todo: Todo = { id: "1", title: "Test todo", completed: false };
    const model = createModel([todo]);

    renderWithRouter(<TodoItem todo={model.state.todos[0]} />, { model });

    await userEvent.click(screen.getByRole("button"));

    expect(model.state.todos).toHaveLength(0);
  });

  it("enters edit mode on double-click", async () => {
    const todo: Todo = { id: "1", title: "Test todo", completed: false };
    const model = createModel([todo]);

    renderWithRouter(<TodoItem todo={model.state.todos[0]} />, { model });

    await userEvent.dblClick(screen.getByText("Test todo"));

    expect(model.editing.state.editingId).toBe(todo.id);
  });

  it("commits edit on Enter key", async () => {
    const todo: Todo = { id: "1", title: "Test todo", completed: false };
    const model = createModel([todo]);
    model.edit(todo);

    renderWithRouter(<TodoItem todo={model.state.todos[0]} />, { model });

    const input = screen.getByDisplayValue("Test todo");
    await userEvent.clear(input);
    await userEvent.type(input, "Updated todo{Enter}");

    expect(model.state.todos[0].title).toBe("Updated todo");
  });

  it("cancels edit on Escape key", async () => {
    const todo: Todo = { id: "1", title: "Test todo", completed: false };
    const model = createModel([todo]);
    model.edit(todo);

    renderWithRouter(<TodoItem todo={model.state.todos[0]} />, { model });

    const input = screen.getByDisplayValue("Test todo");
    await userEvent.clear(input);
    await userEvent.type(input, "Changed{Escape}");

    expect(model.state.todos[0].title).toBe("Test todo");
    expect(model.editing.state.editingId).toBeNull();
  });

  it("deletes todo when edited to empty", async () => {
    const todo: Todo = { id: "1", title: "Test todo", completed: false };
    const model = createModel([todo]);
    model.edit(todo);

    renderWithRouter(<TodoItem todo={model.state.todos[0]} />, { model });

    const input = screen.getByDisplayValue("Test todo");
    await userEvent.clear(input);
    await userEvent.type(input, "{Enter}");

    expect(model.state.todos).toHaveLength(0);
  });
});
