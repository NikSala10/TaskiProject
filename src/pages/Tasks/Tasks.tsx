import { useState } from "react";
import Button from "../../components/Button/Button";
import TasksList from "../../components/TasksList/TasksList";
import { tasks } from "../../data/tasks";
import { useSetPageInfo } from "../../hook/UseSetPage";
import "./Tasks.css";
import Modal from "../../components/Modal/Modal";
import { useNavigate } from "react-router";
import Trophy from '../../assets/Trophy.svg'

const Tasks = () => {
  useSetPageInfo("Tasks");
  const navigate = useNavigate();

  const normalTasks = tasks.filter(task => !task.isAdditional);
  const additionalTasks = tasks.filter(task => task.isAdditional);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("my");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="tasks-page">
      <div className="btn-create-task-respon" onClick={() => {navigate('/create-task')}}>
        <p>+</p>
      </div>
      <div className="btn-create-task">
        <Button text="Create Task" color="#82C2F6" width="180px" onClick={() => {navigate('/create-task')}}/>
      </div>
      <h3 className="tit">All</h3>
      <div className="square-points-res-tsks">
        <div className="trophy-img">
          <img src={Trophy}/>
        </div>
        <div>
          <p className="num-points-res-tsks">140 </p>
          <p> Points</p>
        </div>
      </div>
      <div className="respon-tit-tasks">
        <h3 className={`tit-res-ts ${activeTab === "my" ? "active" : ""}`} onClick={() => setActiveTab("my")}>
          My Tasks
        </h3>
        <h3 className={`tit-res-ts ${activeTab === "additional" ? "active" : ""}`} onClick={() => setActiveTab("additional")}>
          Additional Tasks
        </h3>
      </div>
      <div className="tasks-content-respon">
        {activeTab === "my" ? (
          <TasksList tasks={normalTasks} />
        ) : (
          <TasksList tasks={additionalTasks} />
        )}
      </div>
      
      <div className="all-tasks">
        <TasksList tasks={normalTasks} />
      </div>
      <div className="add">
        <div className="aditional-info">
          <h3>Additional tasks</h3>
          <div className="tetxt">
            <p>You can accept 3 additional <br/>tasks and review them</p>
            <Button text="View" color="#82C2F6" width="100px" onClick={openModal}/>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="content">
          <h3 className="tit-additional">Aditional Tasks</h3>
            <div className="additional-tasks-list">
              <TasksList tasks={additionalTasks} />
            </div>
        </div>
      </Modal>

    </div>
  );
};

export default Tasks;
