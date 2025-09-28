import { useSetPageInfo } from "../../hook/UseSetPage";
import Card from "../../components/CardPlanReview/Card";

const PlanReview = () => {
  useSetPageInfo("Plan Review");
  
  return (
    <>
    <Card />
    </>
  
  );
};

export default PlanReview;