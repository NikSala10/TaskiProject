import type { IconTextBarProps } from "../../types/ItemsBar";

const Member = ({ icon, text }: IconTextBarProps) => {
  return (
    <div
      className="member-bar"
    >
      <span className="icon-member">{icon}</span>
      <span>{text}</span>
    </div>
  );
};

export default Member;