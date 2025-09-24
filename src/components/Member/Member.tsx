import type {MemberBarProps } from "../../types/NavBarType";

const Member = ({ avatar, name, color  }: MemberBarProps) => {
  return (
    <div
      className="member-bar" style={{ backgroundColor: color || "#60a5fa" }}>
      <span className="icon-member">{avatar}</span>
      <span className="member">{name}</span>
    </div>
  );
};

export default Member;