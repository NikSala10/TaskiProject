import type { GroupCardType } from "../../types/GroupCardType";
import AvatarWithName from "../AvatarWithName/AvatarWithName";
import Button from "../Button/Button";

const GroupCard = ({ groupName, members, showRanking = false }: GroupCardType) => {
  return (
    <div className="card-group">
      <h3 className="group-name">{groupName}</h3>
      <div className="members-list">
        {members.map((member, index) => (
          <div key={index} className="ranking-item">
            {showRanking && <span className="ranking-number">{index + 1}</span>}
            <AvatarWithName
              avatar={member.avatar}
              namePlayer={member.namePlayer}
              rol={member.rol}
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