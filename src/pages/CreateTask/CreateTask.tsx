import Button from "../../components/Button/Button";
import { useSetPageInfo } from "../../hook/UseSetPage";

const CreateTask = () => {
  
  useSetPageInfo("Create Task");

  const sendForm = (e) => {
      e.preventDefault();
      alert("task created and assigned");
  }

  return (
    <div className="create-task-page">
      <form onSubmit={(e) => sendForm(e)}>
            
          <Button text="Assign Task" type="submit" color="#82C2F6" width="400px" />
        </form>
    </div>
  );
};

export default CreateTask;
