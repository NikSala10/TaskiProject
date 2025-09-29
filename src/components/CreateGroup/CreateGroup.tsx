import "./CreateGroup.css";

const CreateGroupForm = () => {
  return (
    <form className="create-group-form">

      <div className="taski-img"><img src="src/assets/Portada.png" alt="Portada" className="Group-image" /></div>
      <div className="form-grid">
        <h1 className="create-group-title">Create your group!</h1>
        <p className="create-group-subtitle">
        Manage household chores and turn teamwork into a fun challenge.<br />
        Create your group, customize it, and start assigning tasks.
        </p>
        <div className="flex-inputs">
          <div className="flex-1">

            <div className="form-group">
              <label htmlFor="groupName" className="form-label">
                <strong>Group Name</strong>
              </label>
              <input 
                type="text" 
                id="groupName" 
                name="groupName" 
                placeholder="Enter group name"
                className="form-input"
              />
            </div>
            <div className="form-group full-width">
              <label htmlFor="description" className="form-label">
                Optional Description
              </label>
              <textarea 
                id="description" 
                name="description" 
                placeholder="Enter group description (optional)"
                className="form-textarea"
                rows={3}
              />
            </div>

            <div className="form-group">
              <label htmlFor="planBudget" className="form-label">
                Plan Budget
              </label>

              <div className="budget-input-container">
                <input 
                  type="number" 
                  id="planBudget" 
                  name="planBudget" 
                  placeholder="$ 0.00"
                  className="form-input budget-input"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
        </div>
        

        <div className="flex-2">
        <div className="form-group">
            <label htmlFor="startDate" className="form-label">
              <strong>Start Date</strong>
            </label>
            <input 
              type="date" 
              id="startDate" 
              name="startDate" 
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="planDuration" className="form-label">
              Plan Duration
            </label>
            <select id="planDuration" name="planDuration" className="form-select">
              <option value="">Select duration</option>
              <option value="1month">1 Month</option>
              <option value="6months">6 Months</option>
              <option value="1year">1 Year</option>
            </select>
          </div>
      
      <p className="budget-note">
        The budget you enter will be the total <br /> amount that group members can earn.
      </p>
      </div>
      </div>
    
      <div className="final-btns">
        <button type="submit" className="create-group-btn">
          Create Group & Generate Code
        </button>

        <p className="generate-code-note">
          Generate a unique code for other members to join
        </p>
      </div>
      </div>
    </form>
  );
};

export default CreateGroupForm;