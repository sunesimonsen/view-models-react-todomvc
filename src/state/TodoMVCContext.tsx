import { createContext, useContext } from "react";
import { TodoMVCModel } from "./TodoMVCModel";
import { LocalStorage } from "../utils/Storage";
import { useModelState } from "@view-models/react";

export const TodoMVCContext = createContext<TodoMVCModel>(
  new TodoMVCModel(new LocalStorage()),
);

export const useTodoMVCModel = () => useContext(TodoMVCContext);

export const useTodos = () => {
  const model = useTodoMVCModel();
  return useModelState(model);
};

export const useEditing = () => {
  const model = useTodoMVCModel();
  return useModelState(model.editing);
};
