import type {MemberBarProps } from "../../types/NavBarType";

const Member = ({ avatar, name }: MemberBarProps) => {
  return (
    <div
      className="member-bar"
    >
      <span className="icon-member">{avatar}</span>
      <span>{name}</span>
    </div>
  );
};

export default Member;