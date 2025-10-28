import type { AvatarWithNameProps } from "../../types/GroupCardType";

const AvatarWithName = ({avatar, username, role, showRanking, numPoints}: AvatarWithNameProps) => {

  return (
    <div className="user-card">
      { showRanking && <div className="number-space"></div>}
        <img
        src={avatar || "https://api.dicebear.com/9.x/fun-emoji/svg?seed=ki"}
        alt={`${username} avatar`}
        className="avatar"
        />

      { showRanking && <div className="info-with-ranking">    
        <span className="name">{username}</span>
        <span className="points">{numPoints} Points</span>
      </div>
      }
      { !showRanking && <>    
        <span className="name">{username}</span>
        <span className="role">{role}</span>
      </>
      }
        
    </div>
  );
};

export default AvatarWithName;