import { useSelector } from "react-redux";
import { useDeleteGroup } from "../../hook/useDeleteGroup";
import type { GroupCardType } from "../../types/GroupCardType";
import AvatarWithName from "../AvatarWithName/AvatarWithName";
import Button from "../Button/Button";
import type { RootState } from "../../redux/store";
import { useLeaveGroup } from "../../hook/useLeaveGroup";

const GroupCard = ({ id, ownerID, groupName, inviteCode, members, showRanking = false }: GroupCardType) => {
  const { removeGroup } = useDeleteGroup();
  const { leaveGroup } = useLeaveGroup();
  const currentUserID = useSelector((state: RootState) => state.auth.userID);

  return (
    <div className="card-group">
      <h3 className="group-name">{groupName}</h3>
      <div className="responsive-card-btn-name">
        <h3>{groupName}</h3>
        {!showRanking && ownerID === currentUserID ? (
          <Button
            text="Remove Group"
            color="#FF5A5A"
            width="150px"
            onClick={() => id && removeGroup(id)}
          />
        ) : (
          <Button
            text="Leave Group"
            color="#FF935A"
            width="150px"
            onClick={() => id && leaveGroup(id)}
          />
        )}

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
      {!showRanking && ownerID === currentUserID ? (
          <Button
            text="Remove"
            color="#FF5A5A"
            width="150px"
            onClick={() => id && removeGroup(id)}
          />
        ) : (
          <Button
            text="Leave"
            color="#FF935A"
            width="150px"
            onClick={() => id && leaveGroup(id)}
          />
        )}
    </div>
  );
};

export default GroupCard;