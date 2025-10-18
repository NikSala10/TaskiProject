import { useNavigate } from "react-router";
import "./CreateGroup.css";
import Portada from "../../assets/Portada.png";
import { useState } from "react";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";

const CreateGroupForm = () => {
  const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openJoinModal = () => setIsJoinModalOpen(true);
    const closeJoinModal = () => setIsJoinModalOpen(false);

  return (
    <form className="cgx-form">
      <div className="cgx-container">
        {/* Imagen a la izquierda */}
        <div className="cgx-img-box">
           <button 
            type="button" 
            className="cgx-back-btn" 
            onClick={() => navigate(-1)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ffffffff" d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42a.996.996 0 0 0-1.41 0l-6.59 6.59a.996.996 0 0 0 0 1.41l6.59 6.59a.996.996 0 1 0 1.41-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1"/></svg>
          </button>

          <img src={Portada} alt="Portada" className="cgx-img" />
        </div>
        
        {/* Contenido del formulario */}
        <div className="cgx-content">
          <button
            type="button"
            className="cgx-close-btn"
            onClick={() => navigate("/groups")}
          >✕
          </button>
          <h1 className="cgx-title">Create your group!</h1>
          <p className="cgx-subtitle">
            Manage household chores and turn teamwork into a fun challenge.<br />
            Create your group, customize it, and start assigning tasks.
          </p>

          <div className="cgx-fields">
            {/* Columna izquierda */}
            <div className="cgx-col">
              <div className="cgx-group">
                <label htmlFor="groupName" className="cgx-label">
                  <strong>Group Name</strong>
                </label>
                <input
                  type="text"
                  id="groupName"
                  name="groupName"
                  placeholder="Enter group name"
                  className="cgx-input"
                />
              </div>

              <div className="cgx-group">
                <label htmlFor="description" className="cgx-label">
                  Optional Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter group description (optional)"
                  className="cgx-textarea"
                  rows={3}
                />
              </div>

              <div className="cgx-group">
                <label htmlFor="planBudget" className="cgx-label">
                  Plan Budget
                </label>
                <input
                  type="number"
                  id="planBudget"
                  name="planBudget"
                  placeholder="$ 0.00"
                  className="cgx-input"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            {/* Columna derecha */}
            <div className="cgx-col">
              <div className="cgx-group">
                <label htmlFor="startDate" className="cgx-label">
                  <strong>Start Date</strong>
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  className="cgx-input"
                />
              </div>

              <div className="cgx-group">
                <label htmlFor="planDuration" className="cgx-label">
                  Plan Duration
                </label>
                <select
                  id="planDuration"
                  name="planDuration"
                  className="cgx-select"
                >
                  <option value="">Select duration</option>
                  <option value="1month">1 Month</option>
                  <option value="6months">6 Months</option>
                  <option value="1year">1 Year</option>
                </select>
              </div>

              <p className="cgx-note">
                The budget you enter will be the total <br />
                amount that group members can earn.
              </p>
            </div>
          </div>

          {/* Botones finales */}
          <div className="cgx-actions">
            <button
              type="button"
              className="cgx-btn"
              onClick={openModal}
            >
              Create Group & Generate Code
            </button>
            <button
              type="button"
              className="cgx-btn-join"
              onClick={openJoinModal}
            >
              Join Group
            </button>
            <p className="cgx-code-note">
              Generate a unique code for other members to join
            </p>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="content-modal-cgx">
            <h3 className="tit-code-grp">All set!  Your group has <br /> been created successfully</h3>
            <p className="invitation-code-cgx">Here is your invitation code:</p>
            <div className="link-box">
              <span className="link-text">https://miapp.com/join-group?code=abc</span>
              <button className="copy-btn"><svg width="13" height="25" viewBox="0 0 13 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.547188 4.195C0.554356 1.90675 2.42051 0.0575852 4.71536 0.0647737C7.01022 0.0719622 8.86475 1.93278 8.85759 4.22103L8.81086 19.1367C8.80656 20.5096 7.68687 21.6191 6.30996 21.6148C4.93304 21.6105 3.82032 20.494 3.82462 19.1211L3.86096 7.52C3.8624 7.06235 4.23563 6.69252 4.6946 6.69396C5.15357 6.6954 5.52448 7.06756 5.52304 7.52521L5.4867 19.1263C5.48527 19.5839 5.85618 19.9561 6.31515 19.9575C6.77412 19.959 7.14735 19.5891 7.14878 19.1315L7.19551 4.21582C7.19981 2.84287 6.08709 1.72638 4.71017 1.72207C3.33326 1.71776 2.21357 2.82726 2.20927 4.2002L2.16254 19.1159C2.15538 21.4041 4.00991 23.2649 6.30476 23.2721C8.59962 23.2793 10.4658 21.4302 10.4729 19.1419L10.5093 7.54083C10.5107 7.08318 10.8839 6.71335 11.3429 6.71478C11.8019 6.71622 12.1728 7.08839 12.1714 7.54604L12.135 19.1471C12.125 22.3507 9.51237 24.9395 6.29957 24.9294C3.08678 24.9194 0.490431 22.3142 0.500465 19.1107L0.547188 4.195Z" fill="white"/>
              </svg>Copy</button>
            </div>
            <Button text="Continue" color="#82C2F6" width="390px"  onClick={() => navigate("/groups")}/>
          </div>
      </Modal>
      <Modal isOpen={isJoinModalOpen} onClose={closeJoinModal}>
        <div className="content-modal-cgx">
          <h3 className="tit-code-grp">Join the group!</h3>
          <p className="invitation-code-cgx">Paste your invitation link here to get started.</p>
          <input
            type="text"
            placeholder="Enter code here"
            className="cgx-input-code-invitation"
          />
          <Button text="Join Now" color="#82C2F6" width="390px"  onClick={() => navigate("/groups")}/>
        </div>
      </Modal>
    </form>
  );
};

export default CreateGroupForm;
