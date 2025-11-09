import type { AvatarWithNameProps } from "../../types/GroupCardType";

const AvatarWithName = ({avatar, username, role, showRanking, numPoints}: AvatarWithNameProps) => {

  return (
    <div className="user-card">
      { showRanking && <div className="number-space"></div>}
        <img
        src={avatar || "https://firebasestorage.googleapis.com/v0/b/algoritmosdatos2024-02.appspot.com/o/Group%20407.svg?alt=media&token=d5f5cbfc-86b0-4407-bcd9-751513aa0031"}
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