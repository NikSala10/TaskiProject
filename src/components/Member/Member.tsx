import type {MemberBarProps } from "../../types/NavBarType";

const Member = ({ avatar, name, color  }: MemberBarProps) => {
  return (
    <div
      className="member-bar" style={{ backgroundColor: color || "#60a5fa" }}>
      <img
        src={avatar || "https://firebasestorage.googleapis.com/v0/b/algoritmosdatos2024-02.appspot.com/o/Group%20407.svg?alt=media&token=d5f5cbfc-86b0-4407-bcd9-751513aa0031"}
        alt={`${avatar} avatar`}
        className="icon-member"
        />
      <span className="member">{name}</span>
    </div>
  );
};

export default Member;