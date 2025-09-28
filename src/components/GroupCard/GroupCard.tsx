import type { GroupCardType } from "../../types/GroupCardType";
import AvatarWithName from "../AvatarWithName/AvatarWithName";
import Button from "../Button/Button";

const GroupCard = ({ groupName, members }: GroupCardType) => {
  return (
    <div>
      <h3>{groupName}</h3>
      <div style={{ display: "flex", gap: "10px" }}>
        {members.map((member, index) => (
          <AvatarWithName
            key={index}
            avatar={member.avatar}
            namePlayer={member.namePlayer}
            rol={member.rol}
          />
        ))}
      </div>
        <Button text="Remove" color="#FF935A" width="130px" />
    </div>
  );
};

export default GroupCard;
