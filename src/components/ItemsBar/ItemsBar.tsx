import type { IconTextBarProps } from "../../types/ItemsBar";

const ItemsBar = ({ icon, text }: IconTextBarProps) => {
  return (
    <div
      className="icon-bar"
    >
      <span className="text-xl">{icon}</span>
      <span>{text}</span>
    </div>
  );
};

export default ItemsBar;