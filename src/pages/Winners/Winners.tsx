import CardPoint from "../../components/CardPoints/CardPoint";
import { useSetPageInfo } from "../../hook/UseSetPage";
import '../Ranking/Ranking.css';
import "./Winners.css";
import WinnerIcon from "../../../public/assets/trophy.png";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useLoadAllUsers } from "../../hook/useLoadAllUsers";
import confetti from "canvas-confetti";


const Winners = () => {
  useSetPageInfo("");
  confetti();
  useLoadAllUsers(); 
  const users = useSelector((state: RootState) => state.users.users);

  // Ordenar por puntos y tomar top 3
  const topThree = [...users]
    .filter(user => user.numPoints > 0) // solo usuarios con puntos
    .sort((a, b) => b.numPoints - a.numPoints)
    .slice(0, 3);

  return (
    <>
    <div className="header-group">
      <h1 className="tit-winners-pg">The cycle has ended and we reveal the lucky winners</h1>
      <p className="tit-winners-pg">The prize will be divided as follows: 50% for first place, 30% for second place, and 20% for third place.</p>
      <div className="winner-icon-container">
        <img src={WinnerIcon} alt="Winner Trophy" className="winner-icon" />
      </div>
    </div>  

    <div className="ranking-page">
        {topThree.map((user, index) => (
          <CardPoint
            key={user.uid}
            position={index + 1}
            name={user.username}
            points={user.numPoints}
            icon={user.avatar || ""}
          />
        ))}
      </div>
    </>

  );
};
export default Winners;