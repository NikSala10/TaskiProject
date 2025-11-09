import { useState } from "react";
import { useDispatch } from "react-redux";
import type { PeriodType, CardProps } from "../../types/PlanReviewType";
import { PERIOD_LABELS } from "../../types/PlanReviewType";
import {
  updatePlanReviewGroupPeriod,
  updatePlanReviewGroupBudget,
} from "../../redux/slices/planReviewSlice";
import {
  updateGroupPeriod,
  updateGroupBudget,
  resetGroupPeriod,
} from "../../services/groupService";
import "./Card.css";
import Button from "../Button/Button";
import EditIcon from "../../assets/Vector.png";

const Card = ({
  groupId,
  familyName,
  budget = 0,
  initialPeriod = "1year",
}: CardProps) => {
  const dispatch = useDispatch();
  const [activePeriod, setActivePeriod] = useState<PeriodType>(initialPeriod);
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [budgetValue, setBudgetValue] = useState(budget.toString());
  const [isLoading, setIsLoading] = useState(false);

  const periods: PeriodType[] = ["1month", "6months", "1year"];

  const handlePeriodClick = async (period: PeriodType) => {
    if (activePeriod === period) return;

    try {
      setIsLoading(true);
      await updateGroupPeriod(groupId, period);
      setActivePeriod(period);
      dispatch(
        updatePlanReviewGroupPeriod({
          groupId,
          planDuration: period,
        })
      );
    } catch (error) {
      console.error("Error updating period:", error);
      alert("Error al actualizar el período");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditBudget = () => {
    // ✅ Limpiar el formato de moneda antes de editar
    const cleanBudget = budget.toString().replace(/[^0-9.]/g, '');
    setBudgetValue(cleanBudget);
    setIsEditingBudget(true);
  };

  const handleSaveBudget = async () => {
    const numericBudget = parseFloat(budgetValue);

    if (isNaN(numericBudget) || numericBudget < 0) {
      alert("Por favor ingresa un presupuesto válido");
      return;
    }

    try {
      setIsLoading(true);
      await updateGroupBudget(groupId, numericBudget);
      dispatch(
        updatePlanReviewGroupBudget({
          groupId,
          planBudget: numericBudget,
        })
      );
      setIsEditingBudget(false);
    } catch (error) {
      console.error("Error updating budget:", error);
      alert("Error al actualizar el presupuesto");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setBudgetValue(budget.toString());
    setIsEditingBudget(false);
  };

  const handleResetPeriod = async () => {
    if (isLoading) return; // Prevenir clicks mientras carga
    
    if (
      !window.confirm(
        "¿Estás seguro de que quieres resetear el período? Esto reiniciará la fecha de inicio."
      )
    ) {
      return;
    }

    try {
      setIsLoading(true);
      await resetGroupPeriod(groupId);
      alert("Período reseteado exitosamente");
    } catch (error) {
      console.error("Error resetting period:", error);
      alert("Error al resetear el período");
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinuePlan = () => {
    if (isLoading) return; // Prevenir clicks mientras carga
    console.log("Continuar plan para grupo:", groupId);
  };

  return (
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
            disabled={isLoading}
          >
            {PERIOD_LABELS[period]}
          </button>
        ))}
      </div>

      <div className="budget-section">
        <label className="budget-label">Budget</label>
        <div className="budget-input-container">
          {isEditingBudget ? (
            <>
              <input
                type="number"
                className="budget-input"
                value={budgetValue}
                onChange={(e) => setBudgetValue(e.target.value)}
                min="0"
                step="0.01"
              />
              <button
                className="edit-btn save-btn"
                type="button"
                onClick={handleSaveBudget}
                disabled={isLoading}
              >
                ✓
              </button>
              <button
                className="edit-btn cancel-btn"
                type="button"
                onClick={handleCancelEdit}
                disabled={isLoading}
              >
                ✕
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                className="budget-input"
                value={`$${budget.toLocaleString()}`}
                readOnly
              />
              <button
                className="edit-btn"
                type="button"
                onClick={handleEditBudget}
                disabled={isLoading}
              >
                <img src={EditIcon} alt="Edit" className="edit-icon" />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="actions-section">
        <Button
          text="Continue Plan"
          color="#82C2F6"
          width="180px"
          onClick={handleContinuePlan}
        />
        <Button
          text="Reset Period"
          color="#FF935A"
          width="180px"
          onClick={handleResetPeriod}
        />
      </div>
    </div>
  );
};

export default Card;