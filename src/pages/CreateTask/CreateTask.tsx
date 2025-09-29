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
        <InputTask
        label="Title"
        placeholder="Ej: Take out the trash"
        type="text"
      />

      <InputTask
        label="Asignee"
        placeholder="Choose a member"
        type="select"
        options={[
          { value: "alta", label: "Alta" },
          { value: "media", label: "Media" },
          { value: "baja", label: "Baja" },
        ]}
      />
        <Button text="Assign Task" type="submit" color="#82C2F6" width="400px" />
        </form>
    </div>
  );
};

export default CreateTask;
