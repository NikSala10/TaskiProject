import { useState } from "react";
import type { TypeAddToDo } from "../types/TodoType";

const FormToDo = ({ addToDo }: TypeAddToDo) => {
  const [toDoInput, setToDoInput] = useState<string>("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addToDo(toDoInput);
      }}
    >
      <input
        type="text"
        placeholder="Ingresar tarea"
        value={String(toDoInput)}
        onChange={(e) => setToDoInput(e.target.value)}
      />
      <button type="submit">Crear tarea</button>
    </form>
  );
};

export default FormToDo;
