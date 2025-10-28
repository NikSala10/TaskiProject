import { useState } from "react";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import { useJoinGroup } from "../../hook/useJoinGroup";

interface JoinGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const JoinGroupModal = ({ isOpen, onClose }: JoinGroupModalProps) => {
  const [joinCode, setJoinCode] = useState("");
  const { joinGroup } = useJoinGroup();

  const handleJoin = async () => {
    if (!joinCode.trim()) {
      alert("Please enter a code.");
      return;
    }
    await joinGroup(joinCode);
    setJoinCode("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="content-modal-cgx">
        <h3 className="tit-code-grp">Join the group!</h3>
        <p className="invitation-code-cgx">
          Paste your invitation link here to get started.
        </p>
        <input
          type="text"
          placeholder="Enter code here"
          className="cgx-input-code-invitation"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
        />
        <Button
          text="Join Now"
          color="#82C2F6"
          width="390px"
          onClick={handleJoin}
        />
      </div>
    </Modal>
  );
};

export default JoinGroupModal;
