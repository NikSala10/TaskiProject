import type { AvatarWithNameProps } from "../../types/GroupCardType";

const AvatarWithName = ({avatar, namePlayer, rol}: AvatarWithNameProps) => {

  return (
    <div>
        <span>{avatar}</span>
        <span>{namePlayer}</span>
        <span>{rol}</span>
    </div>
  );
};

export default AvatarWithName;
