import type { ReactNode } from "react"; //ReactNode es el tipado de un componente de react, hay que especificar en el import que es type

export type TypeToDoProvider = {
  children: ReactNode;
};

export type ToDoItem = {
  id: number;
  text: string;
  done: boolean;
};

//Este es el tipado del contexto, la referencia más exacta es con el value, todo lo que vaya en el value debe estar tipado acá
export type TypeToDoContext = {
  toDoList: ToDoItem[];
  addToDo: (text: string) => void; //Las funciones siempre tienen este tipado, retornan void (vacio)
  changeStatus: (id: number) => void;
};

export type TypeAddToDo = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addToDo: (item: any) => void;
};
