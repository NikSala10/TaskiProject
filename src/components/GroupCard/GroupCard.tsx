import type { GroupCardType } from "../../types/GroupCardType";
import AvatarWithName from "../AvatarWithName/AvatarWithName";
import Button from "../Button/Button";

const GroupCard = ({ groupName, inviteCode, members, showRanking = false }: GroupCardType) => {
  return (
    <div className="card-group">
      <h3 className="group-name">{groupName}</h3>
      <div className="responsive-card-btn-name">
        <h3>{groupName}</h3>
        {!showRanking && <Button text="Remove" color="#FF935A" width="150px" /> }
      </div>
      <div className="responsive-card-admi">
        {(() => {
          const admin = members.find(m => m.role.toLowerCase() === "admin");
          if (!admin) return null;
          return (
            <>
              <span>{admin.avatar}</span>
              <div className="responsive-info-admi">
                <h3>{admin.username}</h3>
                <h3 className="rol-res">{admin.role}</h3>
              </div>
            </>
          );
        })()}
      </div>
      <p className="invite-code-cr-gp">Invite Code: {inviteCode}</p>
      <h4 className="members-res-tit">Members</h4>
      <div className="responsive-card-members">
        {members
        .filter(member => member.role.toLowerCase() === "member")
        .map((member, index) => (
        <div key={index} className="ranking-item">
          {showRanking && (
            <span className="ranking-number">{index + 1}</span>
          )}
          <AvatarWithName
            avatar={member.avatar}
            username={member.username}
            role={member.role}
            showRanking={showRanking}
            numPoints={member.numPoints}
          />
        </div>
      ))}
      </div>
      <div className="members-list">
        {members.map((member, index) => (
          <div key={index} className="ranking-item">
            {showRanking && <span className="ranking-number">{index + 1}</span>}
            <AvatarWithName
              avatar={member.avatar}
              username={member.username}
              role={member.role}
              showRanking={showRanking}
              numPoints={member.numPoints}
            />
          </div>
        ))}
      </div>
      {!showRanking && <Button text="Remove" color="#FF935A" width="150px" /> }
    </div>
  );
};

export default GroupCard;