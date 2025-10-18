import { useNavigate } from "react-router";
import "./CreateGroup.css";
import Portada from "../../assets/Portada.png";

const CreateGroupForm = () => {
  const navigate = useNavigate();

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
                >
                  ✕
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
              onClick={() => navigate("/groups")}
            >
              Create Group & Generate Code
            </button>
            <button
              type="button"
              className="cgx-btn-join"
              onClick={() => navigate("/joingroup")}
            >
              Join a Group
            </button>
            <p className="cgx-code-note">
              Generate a unique code for other members to join
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateGroupForm;
