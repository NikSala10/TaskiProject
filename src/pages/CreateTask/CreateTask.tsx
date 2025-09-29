import Button from "../../components/Button/Button";
import InputTask from "../../components/InputTask/InputTask";
import { useSetPageInfo } from "../../hook/UseSetPage";

const CreateTask = () => {
  
  useSetPageInfo("Create Task");

  // const sendForm = (e) => {
  //     e.preventDefault();
  //     alert("task created and assigned");
  // }

  return (
    <div className="create-task-page">
      <form>
        <InputTask label="Task Name" placeholder="Enter task name" type="text" />
        <InputTask label="Description" placeholder="Enter task description" type="text" />
        <InputTask label="Due Date" placeholder="Select due date" type="date" />
        <InputTask label="Assign To" placeholder="Enter assignee's name" type="text" />
        <Button text="Assign Task" type="submit" color="#82C2F6" width="400px" />
        </form>
    </div>
  );
};

export default CreateTask;
