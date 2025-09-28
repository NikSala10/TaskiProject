import type { GroupCardType } from "../../types/GroupCardType";
import AvatarWithName from "../AvatarWithName/AvatarWithName";
import Button from "../Button/Button";

const GroupCard = ({groupName, namePlayer, rol, avatar}: GroupCardType) => {

  return (
    <div>
        <h3>{groupName}</h3>
        <AvatarWithName  avatar={avatar} namePlayer={namePlayer} rol={rol}/>
        <Button text="Remove" color="#FF935A" width="100px" />
    </div>
  );
};

export default GroupCard;
