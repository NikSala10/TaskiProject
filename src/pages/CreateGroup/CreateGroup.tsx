import React from "react";
import CreateGroupForm from "../../components/CreateGroup/CreateGroup";

const CreateGroupPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Create group submitted");
  };

  return (
    <div className="create-group-page">
      <div className="create-group-container">
        <CreateGroupForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CreateGroupPage;