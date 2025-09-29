import { useState } from "react";
import type { PeriodType, CardProps } from "../../types/PlanReviewType";
import "./Card.css";
import Button from "../Button/Button";
import EditIcon from "../../assets/Vector.png";

const Card = ({ familyName, budget = "$500,000" }: CardProps) => {  
  const [activePeriod, setActivePeriod] = useState<PeriodType>("Monthly");

  const periods: PeriodType[] = ["Monthly", "Semi-Annual", "Annual"];

  const handlePeriodClick = (period: PeriodType) => {
    setActivePeriod(period);
  };

  return (
    <div className="plan-review-container">
      <div className="plan-card">
        <h2 className="plan-title">{familyName}</h2> 
        <p className="period-text">The current period of this group is:</p>

        <div className="period-buttons">
          {periods.map((period) => (
            <button 
              key={period}
              className={`period-btn ${activePeriod === period ? "active" : ""}`} 
              type="button"
              onClick={() => handlePeriodClick(period)}
            >
              {period}
            </button>
          ))}
        </div>

        <div className="budget-section">
          <label className="budget-label">Budget</label>
          <div className="budget-input-container">
            <input
              type="text"
              className="budget-input"
              value={budget} 
              readOnly
            />
            <button className="edit-btn" type="button">

            <img src={EditIcon} alt="Edit" className="edit-icon" />
            
            </button>
          </div>
        </div>

        <div className="actions-section">
          <Button text="Continue Plan" color="#82C2F6" width="180px"/>
          <Button text="Reset Period " color="#FF935A" width="180px"/>
        </div>
      </div>
    </div>
  );
};

export default Card;
