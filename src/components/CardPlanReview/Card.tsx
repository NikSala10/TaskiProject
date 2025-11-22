import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { PeriodType, CardProps } from "../../types/PlanReviewType";
import { PERIOD_LABELS } from "../../types/PlanReviewType";
import {
  updatePlanReviewGroupPeriod,
  updatePlanReviewGroupBudget,
  updatePlanReviewGroupName,
} from "../../redux/slices/planReviewSlice";
import {
  updateGroupPeriod,
  updateGroupBudget,
  resetGroupPeriod,
} from "../../services/groupService";
import "./Card.css";
import Button from "../Button/Button";
import EditIcon from "../../../public/assets/Vector.png";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";
import { useNavigate } from "react-router";
import type { RootState } from "../../redux/store";
import { updateGroupStartDate } from "../../redux/slices/groupsSlice";

const Card = ({
  groupId,
  familyName,
  budget = 0,
  initialPeriod = "1year",
}: CardProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activePeriod, setActivePeriod] = useState<PeriodType>(initialPeriod);
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [budgetValue, setBudgetValue] = useState(budget.toString());
  const [isLoading, setIsLoading] = useState(false);
  const startDate = useSelector((state: RootState) =>
    state.group.groups.find((g) => g.id === groupId)?.startDate
  );
  const formattedStartDate = startDate
  ? new Date(startDate).toLocaleDateString()
  : "No start date";

  const canResetPeriod = () => {
    if (!startDate) return false;

    const start = new Date(startDate);
    const today = new Date();

    // Para comparar solo la fecha, sin horas
    start.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    // Solo se puede resetear si start es un día ANTERIOR al de hoy
    return start < today;
  };

  const [isEditingName, setIsEditingName] = useState(false);
  const [nameValue, setNameValue] = useState(familyName);

  const periods: PeriodType[] = ["1month", "6months", "1year"];

  const handlePeriodClick = async (period: PeriodType) => {
    if (activePeriod === period) return;

    try {
      setIsLoading(true);
      await updateGroupPeriod(groupId, period);
      alert("The period was successfully updated.");
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
  if (isLoading) return;

  if (!window.confirm("Are you sure you want to reset the period? This will reset the start date.")) {
    return;
  }

  try {
    setIsLoading(true);

    // 1. Resetea en Firestore
    await resetGroupPeriod(groupId);

    // 2. Obtiene nueva fecha desde Firestore
    const groupRef = doc(db, "groups", groupId);
    const updatedDoc = await getDoc(groupRef);
    const newStartDate = updatedDoc.data()?.startDate;

    // 3. Actualiza Redux para re-renderizar UI
    dispatch(updateGroupStartDate({ groupId, startDate: newStartDate }));

    alert("Period successfully reset.");
  } catch (error) {
    console.error("Error resetting period:", error);
    alert("Error resetting period.");
  } finally {
    setIsLoading(false);
  }
};

  const handleContinuePlan = () => {
    if (isLoading) return; // Prevenir clicks mientras carga
    navigate("/tasks");
  };

   const handleSaveName = async () => {
    if (!nameValue.trim()) return alert("The name cannot be empty.");

    try {
      setIsLoading(true);

      // 1. Actualizar en Firestore
      await updateDoc(doc(db, "groups", groupId), {
        name: nameValue,
      });

      // 2. Actualizar en Redux
      dispatch(updatePlanReviewGroupName({ groupId, name: nameValue }));

      setIsEditingName(false);
    } catch (error) {
      console.error("Error updating name:", error);
      alert("Error updating the group name");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="plan-card">
      <div className="plan-title-container">
        {isEditingName ? (
          <>
            <input
              className="budget-input"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
            />
            <button className="edit-btn save-btn" onClick={handleSaveName} disabled={isLoading}>✓</button>
            <button className="edit-btn cancel-btn" onClick={() => { setNameValue(familyName); setIsEditingName(false); }}>✕</button>
          </>
        ) : (
          <div className="plan-title-edit-container">
            <h2 className="plan-title">{familyName}</h2>
            <button className="edit-btn" onClick={() => setIsEditingName(true)}>
              <img src={EditIcon} alt="Edit" className="edit-icon" />
            </button>
          </div>
        )}
      </div>
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
      <p className="period-text"><b>Start Date:</b>{formattedStartDate}</p>

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
          text={canResetPeriod() ? "Reset Period" : "No Reset"}
          color={canResetPeriod() ? "#FF935A" : "#C4C4C4"} // gris si no se puede
          width="180px"
          onClick={canResetPeriod() ? handleResetPeriod : undefined}
          disabled={!canResetPeriod() || isLoading}
        />
      </div>
    </div>
  );
};

export default Card;