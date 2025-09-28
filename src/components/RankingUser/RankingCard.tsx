import "./RankingCard.css";
import type { RankingCardProps } from "../../types/RankingType";


const RankingCard = ({ position, name, points, icon, color }: RankingCardProps) => {
  return (
    <div className="ranking-card">
      <div className="ranking-left">
        <span className="ranking-position">{position}</span>
        <div className="ranking-icon" style={{ backgroundColor: color }}>
          <img src={icon} alt={name} />
        </div>
        <span className="ranking-name">{name}</span>
      </div>
      <div className="ranking-right">
        <span className="ranking-points">{points} points</span>
      </div>
    </div>
  );
};

export default RankingCard;
