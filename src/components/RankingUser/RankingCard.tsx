import "./RankingCard.css";
import type { RankingCardProps } from "../../types/RankingType";

const RankingCard = ({ position, name, points, icon }: RankingCardProps) => {
  return (
    <div className="ranking-card">
      <div className="ranking-left">
        <span className="ranking-position">{position}</span>
        <div className="ranking-icon">
          <img src={icon} alt={name} />
        </div>
        <div className="ranking-info">
          <span className="ranking-name">{name}</span>
          <span className="ranking-points">{points} points</span>
        </div>
      </div>
    </div>
  );
};

export default RankingCard;
