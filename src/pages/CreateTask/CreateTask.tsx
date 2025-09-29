import Button from "../../components/Button/Button";
import InputTask from "../../components/InputTask/InputTask";
import { useSetPageInfo } from "../../hook/UseSetPage";
import "./CreateTask.css";

const CreateTask = () => {
  
  useSetPageInfo("Create Task");

  // const sendForm = (e) => {
  //     e.preventDefault();
  //     alert("task created and assigned");
  // }

  return (
    <div className="create-task-page">
      <form>
        <div className="inputs-all">
          <InputTask
            label="Title"
            placeholder="Ej: Take out the trash"
            type="text"
          />

          <InputTask
            label="Choose group"
            type="select"
            options={[
              { value: "1", label: "Morgan Family" },
              { value: "2", label: "Chimichangas" },
            ]}
          />
          <InputTask
            label="Asignee"
            type="select"
            options={[
              { value: "alta", label: "Choose a member" },
              { value: "alta", label: "Nuni" },
              { value: "media", label: "Jui" },
              { value: "baja", label: "Patiks" },
            ]}
          />

          <InputTask
            label="Priority"
            type="select"
            options={[
              { value: "low", label: "Low" },
              { value: "medium", label: "Medium" },
              { value: "high", label: "High" },
            ]}
          />

          <InputTask
          label="Schedule"
          placeholder="Today, 6:00 PM"
          type="date"
          />

          <div className="btn-assign">
            <Button text="Assign Task" type="submit" color="#82C2F6" width="400px" />
          </div>
          </div>
        </form>
    </div>
  );
};

export default CreateTask;
