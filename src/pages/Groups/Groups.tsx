import Button from "../../components/Button/Button";
import { useSetPageInfo } from "../../hook/UseSetPage";
import "./Groups.css";

const Groups = () => {
  useSetPageInfo("Groups");

  return (
    <>
      <div className="btns">
        <Button text="Create Group" color="#C090F0" width="180px" />
        <Button text="Join Group" color="#82C2F6" width="180px" />
      </div>
      </>
  );
};

export default Groups;
