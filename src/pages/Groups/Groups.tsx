import Button from "../../components/Button/Button";
import GroupCard from "../../components/GroupCard/GroupCard";
import { useSetPageInfo } from "../../hook/UseSetPage";
import "./Groups.css";

const Groups = () => {
  useSetPageInfo("Groups");

  return (
    <>
      <div className="btns">
        <GroupCard groupName="Morgan Family" />
        <GroupCard groupName="Chimichangas" />
      </div>
      <div className="groupButtons"> 
        <Button text="Create Group" color="#C090F0" width="180px" />
        <Button text="Join Group" color="#82C2F6" width="180px" />
      </div>
      </>
  );
};

export default Groups;
