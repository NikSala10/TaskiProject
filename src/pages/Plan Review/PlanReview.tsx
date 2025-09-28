import { useSetPageInfo } from "../../hook/UseSetPage";
import Card from "../../components/CardPlanReview/Card";
import "./PlanReview.css";

const PlanReview = () => {
  useSetPageInfo("Plan Review");
  
  return (
     <div className="plan-review-container">
      <Card familyName="Morgan Family" budget="$500,000" />
      <Card familyName="Chimichangas" budget="$500,000" />
    </div>
  );
};

export default PlanReview;
