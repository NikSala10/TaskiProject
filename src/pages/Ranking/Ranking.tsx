import RankingCard from "../../components/RankingUser/RankingCard";
import SquirrelIcon from "../../assets/squirrel.png";
import BearIcon from "../../assets/bear.png";
import ElephantIcon from "../../assets/elephant.png";

const RankingPage = () => {
  return (
    <div className="ranking-page">
      <RankingCard position={1} name="Squirrel" points={140} icon={SquirrelIcon} color="#50C8A9" />
      <RankingCard position={2} name="Nunu" points={110} icon={SquirrelIcon} color="#FFD54F" />
      <RankingCard position={3} name="Viper" points={107} icon={SquirrelIcon} color="#E57373" />
      <RankingCard position={4} name="Bear" points={101} icon={BearIcon} color="#FF935A" />
      <RankingCard position={5} name="Elephant" points={98} icon={ElephantIcon} color="#3F51B5" />
    </div>
  );
};

export default RankingPage;
