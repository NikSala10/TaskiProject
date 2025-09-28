import { useSetPageInfo } from "../../hook/UseSetPage";
import PlanCard from "../../components/CardPlanReview/Card";

const PlanReview = () => {
    
    useSetPageInfo("Plan Review");
  return (
     <>
     <p>Plan Review</p>
     <PlanCard />
     <PlanCard />
     </>
    
  );
};

export default PlanReview;
