import type { GroupCardType } from "../../types/GroupCardType";
import AvatarWithName from "../AvatarWithName/AvatarWithName";
import Button from "../Button/Button";

const GroupCard = ({ groupName, members }: GroupCardType) => {
  return (
    <div className="card-group">
      <h3 className="group-name">{groupName}</h3>
      <div className="members-list">
        {members.map((member, index) => (
          <AvatarWithName
            key={index}
            avatar={member.avatar}
            namePlayer={member.namePlayer}
            rol={member.rol}
          />
        ))}
      </div>
        <Button text="Remove" color="#FF935A" width="150px" />
    </div>
  );
};

export default GroupCard;
