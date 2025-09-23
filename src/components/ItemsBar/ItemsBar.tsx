import type { IconTextBarProps } from "../../types/ItemsBar";

const ItemsBar = ({ icon, text, onClick }: IconTextBarProps) => {
  return (
    <div
      className="icon-bar"
      onClick={onClick}
    >
      <span className="text-xl">{icon}</span>
      <span>{text}</span>
    </div>
  );
};

export default ItemsBar;