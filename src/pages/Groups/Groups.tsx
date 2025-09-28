import Button from "../../components/Button/Button";
import { useSetPageInfo } from "../../hook/UseSetPage";

const Groups = () => {
  useSetPageInfo("Groups");

  return (
    <>
    <p>Groups</p>
    <Button text="Create Group" color="#C090F0" width="180px" onClick={() => alert("Button Clicked!")} />
    <Button text="Join Group" color="#82C2F6" width="180px" onClick={() => alert("Button Clicked!")} />
      </>
  );
};

export default Groups;
