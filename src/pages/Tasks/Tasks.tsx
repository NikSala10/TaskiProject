import Button from "../../components/Button/Button";
import TasksList from "../../components/TasksList/TasksList";
import { useSetPageInfo } from "../../hook/UseSetPage";
import "./Tasks.css";
import Modal from "../../components/Modal/Modal";
import { useNavigate } from "react-router";
import Trophy from '../../../public/assets/Trophy.svg'
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
  const totalPoints = useSelector((state: RootState) => state.auth.numPoints);

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
      <div className="btn-created-task-respon" onClick={openModalTasks}>
        <p><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="#fff" d="M20.131 3.16a3 3 0 0 0-4.242 0l-.707.708l4.95 4.95l.706-.707a3 3 0 0 0 0-4.243l-.707-.707Zm-1.414 7.072l-4.95-4.95l-9.09 9.091a1.5 1.5 0 0 0-.401.724l-1.029 4.455a1 1 0 0 0 1.2 1.2l4.456-1.028a1.5 1.5 0 0 0 .723-.401z"/></g></svg></p>
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
          <p className="num-points-res-tsks">{totalPoints}</p>
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