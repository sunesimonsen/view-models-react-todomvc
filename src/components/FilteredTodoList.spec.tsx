import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { Todo } from "../types/Todo";
import { FilteredTodoList } from "./FilteredTodoList";
import { createModel, renderWithRouter } from "../test/createModel";

describe("FilteredTodoList", () => {
  it("displays only active todos when filter is active", () => {
    const todos: Todo[] = [
      { id: "1", title: "Active todo", completed: false },
      { id: "2", title: "Completed todo", completed: true },
    ];
    const model = createModel(todos);
    model.setFilter("active");

    renderWithRouter(<FilteredTodoList />, { model });

    expect(screen.getByText("Active todo")).toBeInTheDocument();
    expect(screen.queryByText("Completed todo")).not.toBeInTheDocument();
  });

  it("displays only completed todos when filter is completed", () => {
    const todos: Todo[] = [
      { id: "1", title: "Active todo", completed: false },
      { id: "2", title: "Completed todo", completed: true },
    ];
    const model = createModel(todos);
    model.setFilter("completed");

    renderWithRouter(<FilteredTodoList />, { model });

    expect(screen.queryByText("Active todo")).not.toBeInTheDocument();
    expect(screen.getByText("Completed todo")).toBeInTheDocument();
  });

  it("displays all todos when filter is all", () => {
    const todos: Todo[] = [
      { id: "1", title: "Active todo", completed: false },
      { id: "2", title: "Completed todo", completed: true },
    ];
    const model = createModel(todos);
    model.setFilter("all");

    renderWithRouter(<FilteredTodoList />, { model });

    expect(screen.getByText("Active todo")).toBeInTheDocument();
    expect(screen.getByText("Completed todo")).toBeInTheDocument();
  });
});
