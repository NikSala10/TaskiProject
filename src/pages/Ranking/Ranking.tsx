import RankingCard from "../../components/CardPoints/CardPoint";
import "./Ranking.css";
import { useSetPageInfo } from "../../hook/UseSetPage";
import SquirrelIcon from "../../assets/Ardilla.png";
import BearIcon from "../../assets/Oso.png";
import ElephantIcon from "../../assets/Elefante.png";
import RabitIcon from "../../assets/Conejo.png";
import ViperIcon from "../../assets/Serpiente.png";
import BunIcon from "../../assets/Mono.png";

const RankingPage = () => {

  useSetPageInfo("Ranking");

  return (
    <div className="ranking-page">
      <RankingCard position={1} name="Squirrel" points={140} icon={SquirrelIcon}  />
      <RankingCard position={2} name="Nunu" points={110} icon={RabitIcon} />
      <RankingCard position={3} name="Viper" points={107} icon={ViperIcon}  />
      <RankingCard position={4} name="Bear" points={101} icon={BearIcon}  />
      <RankingCard position={5} name="Elephant" points={98} icon={ElephantIcon}  />
      <RankingCard position={6} name="Mono" points={91} icon={BunIcon}  />
    </div>
  );
};

export default RankingPage;
