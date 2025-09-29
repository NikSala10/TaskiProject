import Button from "../../components/Button/Button";
import InputTask from "../../components/InputTask/InputTask";
import { useSetPageInfo } from "../../hook/UseSetPage";
import "./CreateTask.css";

const CreateTask = () => {
  
  useSetPageInfo("Create Task");
  return (
    <div className="create-task-page">
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
        <Button text="Assign Task" color="#82C2F6" width="480px" />
        </div>

      <div className="hed">
        <div className="heads-up">
          <h2>Heads Up!</h2>
          <div className="div-head">
            <p>Each task comes with points <br/> based on its level:</p>
            <div className="level">
              <p className="val">Low</p>
              <p className="point">10 points</p>
            </div>
            <div className="level">
              <p className="val2">Medium</p>
              <p className="point">20 points</p>
            </div>
            <div className="level">
              <p className="val3">High</p>
              <p className="point">80 points</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
