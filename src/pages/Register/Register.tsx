import FormToDo from "../components/";
// import { useToDo } from "../context/ToDoContext";
import { ToDoContext } from "../context/ToDoContext";
import { useContext } from "react";

const ToDoBuild = () => {
  const { addToDo } = useContext(ToDoContext);
  //   const { addToDo } = useToDo();

  return <FormToDo addToDo={addToDo}></FormToDo>;
};

export default ToDoBuild;
