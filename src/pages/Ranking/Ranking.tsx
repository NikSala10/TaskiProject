import CardPoint from "../../components/CardPoints/CardPoint";
import "./Ranking.css";
import { useSetPageInfo } from "../../hook/UseSetPage";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useLoadAllUsers } from "../../hook/useLoadAllUsers";

const RankingPage = () => {

  useSetPageInfo("Ranking");
  const navigate = useNavigate();
  useLoadAllUsers();

  const users = useSelector((state: RootState) => state.users.users);
  console.log(users);
  const isLoading = useSelector((state: RootState) => state.users.isLoading);

  // Ordenamos los usuarios por puntos de mayor a menor
  const sortedUsers = [...users].sort((a, b) => (b.numPoints ?? 0) - (a.numPoints ?? 0));

  if (isLoading) return <p>Loading ranking...</p>;

  return (
    <div className="ranking-page">
      {sortedUsers.map((user, index) => (
        <CardPoint
          key={user.uid}
          position={index + 1} // posición real
          name={user.username}
          points={user.numPoints ?? 0}
          icon={user.avatar} 
          onClick={index === 0 ? () => navigate("/winner") : undefined}
        />
      ))}
    </div>
  );
};

export default RankingPage;
