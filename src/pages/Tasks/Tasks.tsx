import Button from "../../components/Button/Button";
import TasksList from "../../components/TasksList/TasksList";
import { useSetPageInfo } from "../../hook/UseSetPage";
import "./Tasks.css";
import Modal from "../../components/Modal/Modal";
import { useNavigate } from "react-router";
import Trophy from '../../assets/Trophy.svg'
import type { RootState } from "../../redux/store";
import { useState } from "react";
import { useTasks } from "../../hook/useTasks";
import { useSelector } from "react-redux";

const Tasks = () => {
  useSetPageInfo("Tasks");
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalTasksOpen, setIsModalTasksOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("my");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openModalTasks = () => setIsModalTasksOpen(true);
  const closeModalTasks = () => setIsModalTasksOpen(false);
  useTasks(); 

  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const userID = useSelector((state: RootState) => state.auth.userID);

  const normalTasks = tasks.filter(
    (t) => !t.isAdditional && (t.assigneeId === userID)
  );

  const additionalTasks = tasks.filter(
    (t) => t.isAdditional && t.assigneeId === null
  );
  const additionalCount = additionalTasks.length;

  const createdTasks = tasks.filter((t) => t. creatorId === userID);
  
  return (
    <div className="tasks-page">
      <div className="btn-create-task-respon" onClick={() => {navigate('/create-task')}}>
        <p>+</p>
      </div>
      <div className="btn-create-task">
        <Button text="Create Task" color="#82C2F6" width="180px" onClick={() => {navigate('/create-task')}}/>
        <Button text="Created Tasks" color="#DBB6FF" width="180px" onClick={openModalTasks}/>
      </div>
      <h3 className="tit">My Tasks</h3>
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
          normalTasks.length > 0 ? (
            <TasksList tasks={normalTasks} />
          ) : (
            <p className="no-nada-msg">You don’t have any tasks yet 😔</p>
          )
        ) : additionalTasks.length > 0 ? (
          <TasksList tasks={additionalTasks} setActiveTab={setActiveTab} />
        ) : (
          <p className="no-nada-msg">No additional tasks available 😔</p>
        )}
      </div>

      <div className="all-tasks">
        {normalTasks.length > 0 ? (
          <TasksList tasks={normalTasks} />
        ) : (
          <p className="no-nada-msg">You don’t have any tasks yet 😔</p>
        )}
      </div>
      <div className="add">
        <div className="aditional-info">
          <h3>Additional tasks</h3>
          <div className="tetxt">
            <p>You can accept {additionalCount} additional <br/>tasks and review them</p>
            <Button text="View" color="#82C2F6" width="100px" onClick={openModal}/>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="content">
          <h3 className="tit-additional">Aditional Tasks</h3>
          {additionalTasks.length > 0 ? (
            <div className="additional-tasks-list">
              <TasksList tasks={additionalTasks}  singleColumn />
            </div> ): (
            <p className="no-nada-msg">No additional tasks available 😔</p>
          )}
        </div>
      </Modal>
      <Modal isOpen={isModalTasksOpen} onClose={closeModalTasks}>
        <div className="content">
          <h3 className="tit-additional">Created Tasks By Me</h3>
          {createdTasks.length > 0 ? (
            <div className="additional-tasks-list">
              <TasksList tasks={createdTasks} showEditDelete={true} singleColumn/>
            </div>
          ) : (
            <p className="no-nada-msg">You haven’t created any tasks yet 😔</p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Tasks;