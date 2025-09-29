import "./CardPoint.css";
import type { CardPointProps } from "../../types/CardPoint";

const CardPoint = ({ position, name, points, icon, onClick}: CardPointProps) => {
  return (
    <div className="ranking-card" onClick={onClick}>
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

export default CardPoint;
