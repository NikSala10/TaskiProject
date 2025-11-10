import { useSelector } from "react-redux";
import { useSetPageInfo } from "../../hook/UseSetPage";
import { usePlanReview } from "../../hook/usePlanReview";
import Card from "../../components/CardPlanReview/Card";
import type { RootState } from "../../redux/store";
import type { PeriodType } from "../../types/PlanReviewType";
import "./PlanReview.css";

const PlanReview = () => {
  useSetPageInfo("Plan Review");
  usePlanReview(); // Hook para cargar los grupos desde Firebase

  const groups = useSelector((state: RootState) => state.planReview.groups);
  const isLoading = useSelector((state: RootState) => state.planReview.isLoading);

  if (isLoading) {
    return (
      <div className="plan-review-container">
        <p>Loading groups...</p>
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <div className="plan-review-container">
        <p>No groups found. Create a group to get started!</p>
      </div>
    );
  }

  return (
    <div className="plan-review-container">
      <div className="cards-plan-review">
        {groups.map((group) => (
          <Card
            key={group.id}
            groupId={group.id}
            familyName={group.name}
            budget={group.planBudget}
            initialPeriod={group.planDuration as PeriodType}
          />
        ))}
      </div>
    </div>
  );
};

export default PlanReview;