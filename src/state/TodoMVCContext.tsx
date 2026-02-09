import { createContext, useContext } from "react";
import { TodoMVCModel } from "./TodoMVCModel";
import { LocalStorage } from "../utils/Storage";

export const TodoMVCContext = createContext<TodoMVCModel>(
  new TodoMVCModel(new LocalStorage()),
);

export const useTodoMVCModel = () => useContext(TodoMVCContext);
