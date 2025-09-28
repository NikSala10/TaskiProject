import React, { useState } from "react";
import "./Card.css";
import type { PlanCardProps } from "../../types/PlanReview";


const PlanCard: React.FC<PlanCardProps> = ({
  familyName = "Morgan Family",
  initialBudget = 500000,
}) => {
  const [period, setPeriod] = useState<"Monthly" | "Semi-Annual" | "Annual">(
    "Monthly"
  );
  const [budget, setBudget] = useState<number>(initialBudget);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // solo números
    setBudget(Number(value));
  };

  return (
    <div className="plan-card">
      <h2 className="plan-title">{familyName}</h2>
      <p>The current period of this group is:</p>

      <div className="period-buttons">
        {["Monthly", "Semi-Annual", "Annual"].map((p) => (
          <button
            key={p}
            className={`period-btn ${period === p ? "active" : ""}`}
            onClick={() => setPeriod(p as any)}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="budget-section">
        <label>Budget</label>
        <div className="budget-input">
          <input
            type="text"
            value={`$${budget.toLocaleString("es-CO")}`}
            onChange={handleBudgetChange}
            readOnly={!isEditing}
          />
          <span
            className="edit-icon"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            ✏️
          </span>
        </div>
      </div>

      <div className="actions">
        <button className="continue-btn">Continue Plan</button>
        <button className="reset-btn">Reset Period</button>
      </div>
    </div>
  );
};

export default PlanCard;
