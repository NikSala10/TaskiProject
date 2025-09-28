import type { GroupCardType } from "../../types/GroupCardType";

const AvatarWithName = ({avatar, namePlayer, rol}: GroupCardType) => {

  return (
    <div>
        <span>{avatar}</span>
        <span>{namePlayer}</span>
        <span>{rol}</span>
    </div>
  );
};

export default AvatarWithName;
