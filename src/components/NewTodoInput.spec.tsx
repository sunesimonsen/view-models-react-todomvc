import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NewTodoInput } from "./NewTodoInput";
import { createModel, renderWithRouter } from "../test/createModel";

describe("NewTodoInput", () => {
  it("adds todo on Enter key", async () => {
    const model = createModel();

    renderWithRouter(<NewTodoInput />, { model });

    const input = screen.getByPlaceholderText("What needs to be done?");
    await userEvent.type(input, "New todo{Enter}");

    expect(model.state.todos).toHaveLength(1);
    expect(model.state.todos[0].title).toBe("New todo");
  });

  it("clears input after adding todo", async () => {
    const model = createModel();

    renderWithRouter(<NewTodoInput />, { model });

    const input = screen.getByPlaceholderText("What needs to be done?");
    await userEvent.type(input, "New todo{Enter}");

    expect(input).toHaveValue("");
  });

  it("does not add empty todos", async () => {
    const model = createModel();

    renderWithRouter(<NewTodoInput />, { model });

    const input = screen.getByPlaceholderText("What needs to be done?");
    await userEvent.type(input, "   {Enter}");

    expect(model.state.todos).toHaveLength(0);
  });
});
