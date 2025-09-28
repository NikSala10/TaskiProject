import Button from "../../components/Button/Button";
import { useSetPageInfo } from "../../hook/UseSetPage";
import "./Tasks.css";

const Tasks = () => {
  useSetPageInfo("Tasks");

  return (
    <div className="tasks-page">
      <div className="btn-create-task">
        <Button text="Create Task" color="#82C2F6" width="180px" />
      </div>
      <h3 className="tit">All</h3>
      <div className="aditional-info">
        <h3>Additional tasks</h3>
        <div className="tetxt">
          <p>You can accept 3 additional tasks and review them</p>
          <Button text="View" color="#82C2F6" width="100px" />
        </div>
      </div>
    </div>
  );
};

export default Tasks;
