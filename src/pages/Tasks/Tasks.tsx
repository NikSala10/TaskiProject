import { useState } from "react";
import Button from "../../components/Button/Button";
import TasksList from "../../components/TasksList/TasksList";
import { tasks } from "../../data/tasks";
import { useSetPageInfo } from "../../hook/UseSetPage";
import "./Tasks.css";
import Modal from "../../components/Modal/Modal";

const Tasks = () => {
  useSetPageInfo("Tasks");
  const normalTasks = tasks.filter(task => !task.isAdditional);
  const additionalTasks = tasks.filter(task => task.isAdditional);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="tasks-page">
      <div className="btn-create-task">
        <Button text="Create Task" color="#82C2F6" width="180px" />
      </div>
      <h3 className="tit">All</h3>
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
          <h3 className="tit-additional">Aditional Tasks</h3>
          <div className="additional-tasks-list">
            <TasksList tasks={additionalTasks} />
          </div>
      </Modal>

    </div>
  );
};

export default Tasks;
