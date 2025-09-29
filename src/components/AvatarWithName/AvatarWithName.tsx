import type { AvatarWithNameProps } from "../../types/GroupCardType";

const AvatarWithName = ({avatar, namePlayer, rol, showRanking, numPoints}: AvatarWithNameProps) => {

  return (
    <div className="user-card">
      { showRanking && <div className="number-space"></div>}
        <span className="avatar">{avatar}</span>

      { showRanking && <div className="info-with-ranking">    
        <span className="name">{namePlayer}</span>
        <span className="points">{numPoints} Points</span>
      </div>
      }
      { !showRanking && <>    
        <span className="name">{namePlayer}</span>
        <span className="role">{rol}</span>
      </>
      }
        
    </div>
  );
};

export default AvatarWithName;