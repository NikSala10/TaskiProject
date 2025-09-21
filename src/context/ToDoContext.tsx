/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import type { ToDoItem, TypeToDoProvider } from "../types/TodoType";
// import type { TypeToDoContext } from "../types/TodoType";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ToDoContext = createContext<any | undefined>(undefined);

export const ToDoProvider = ({ children }: TypeToDoProvider) => {
  const [toDoList, setTodoList] = useState<ToDoItem[]>([]);
  console.log(toDoList);

  const addToDo = (text: string) => {
    const newToDo = { id: Date.now(), text, done: false };
    setTodoList((prev) => [newToDo, ...prev]);
  };

  const changeStatus = (id: number) => {
    setTodoList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  return (
    <ToDoContext.Provider value={{ toDoList, addToDo, changeStatus }}>
      {children}
    </ToDoContext.Provider>
  );
};

export const useToDo = () => {
  const context = useContext(ToDoContext);
  return context;
};
