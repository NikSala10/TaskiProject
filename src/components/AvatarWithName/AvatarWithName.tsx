import type { AvatarWithNameProps } from "../../types/GroupCardType";

const AvatarWithName = ({avatar, namePlayer, rol, showRanking}: AvatarWithNameProps) => {

  return (
    <div className="user-card">
      { showRanking && <div className="number-space"></div>}
        <span className="avatar">{avatar}</span>
        <span className="name">{namePlayer}</span>
        <span className="role">{rol}</span>
    </div>
  );
};

export default AvatarWithName;