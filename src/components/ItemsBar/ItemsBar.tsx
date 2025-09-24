import type { IconTextBarProps } from "../../types/NavBarType";

const ItemsBar = ({ icon, text, isActive, onClick  }: IconTextBarProps) => {
  return (
    <div
      className={`icon-bar ${isActive ? "active" : ""}`} // añade clase si está activo
      onClick={onClick}
    >
      <span className="text-xl">{icon}</span>
      <span className="item">{text}</span>
    </div>
  );
};

export default ItemsBar;