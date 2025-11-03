import { useNavigate } from "react-router";
import Button from "../../components/Button/Button";
import InputTask from "../../components/InputTask/InputTask";
import { useSetPageInfo } from "../../hook/UseSetPage";
import "./CreateTask.css";
import type { RootState } from "../../redux/store";
import { useCreateTask } from "../../hook/useCreateTask";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";

const CreateTask = () => {
  
  useSetPageInfo("Create Task");
  const navigate = useNavigate();

  const { createTask } = useCreateTask();

  const groups = useSelector((state: RootState) => state.group.groups);
  const currentUser = useSelector((state: RootState) => state.auth.userID);
   
   const [title, setTitle] = useState("");
   const [selectedGroup, setSelectedGroup] = useState("");
   const [assignee, setAssignee] = useState("");
   const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
   const [schedule, setSchedule] = useState("");
   const [members, setMembers] = useState<{ id: string; username: string }[]>([]);
   
  const userGroups = useMemo(
    () => groups.filter(g => String(g.ownerID) === String(currentUser)),
    [groups, currentUser]
  );

  // 🔹 Cada vez que se seleccione un grupo, cargamos sus miembros
  useEffect(() => {
    const group = userGroups.find(g => g.id === selectedGroup);
    if (group) {
      setMembers(group.members || []); // <- usa un fallback
    } else {
      setMembers([]);
    }
  }, [selectedGroup, userGroups]);

  const handleSubmit = async () => {
    if (!title.trim() || !selectedGroup.trim()){
      alert("Please complete the required fields");
      return;
    }

    const assigneeMember = members.find(m => m.id === assignee);

    const taskData = {
      title,
      groupId: selectedGroup,
      priority,
      schedule,
      assigneeId: assignee === "none" ? null : assignee,
      assigneeName: assignee === "none" ? null : assigneeMember?.username,
    };

    // Elimina campos undefined, para poder crear tareas adicionales (Firestore no los acepta)
    Object.keys(taskData).forEach((key) => {
      if (taskData[key as keyof typeof taskData] === undefined) {
        delete taskData[key as keyof typeof taskData];
      }
    });

    await createTask(taskData);

    alert("Task created successfully!");
    navigate("/tasks");
  };

  return (
    <div className="create-task-page">
      <div className="inputs-all">
        <InputTask
          label="Title"
          placeholder="Ej: Take out the trash"
          type="text"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setTitle(e.target.value)}
        />

        <InputTask
          label="Choose group"
          type="select"
          value={selectedGroup}
          onChange={(e) => {setSelectedGroup(e.target.value);}}
          options={userGroups.map(g => ({
            value: g.id,
            label: g.name,
          }))}
        />
        <InputTask
          label="Asignee"
          type="select"
          value={assignee}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setAssignee(e.target.value)}
          options={[
            { value: "none", label: "Unassigned (Adicional)" },
            ...members.map(m => ({ value: m.id, label: m.username })),
          ]}
        />

        <InputTask
          label="Priority"
          type="select"
          value={priority}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setPriority(e.target.value as "low" | "medium" | "high")}
          options={[
            { value: "low", label: "Low" },
            { value: "medium", label: "Medium" },
            { value: "high", label: "High" },
          ]}
        />

        <InputTask
        label="Schedule"
        placeholder="Today at 10:00 AM"
        type="datetime-local"
        value={schedule}
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setSchedule(e.target.value)}
        />      
        <div className="assign-taks-nl"><Button text="Assign Task" color="#82C2F6" width="480px" onClick={handleSubmit} /></div>
        <div className="bttns-assingning-respon"> <Button text="Assign Task" color="#82C2F6" width="390px" onClick={handleSubmit}/> <Button text="Go Back" color="#C090F0" width="390px" onClick={() => {navigate('/tasks')}}/></div>
        </div>

      <div className="hed">
        <div className="heads-up">
          <h2>Heads Up!</h2>
          <div className="div-head">
            <p>Each task comes with points <br/> based on its level:</p>
            <div className="levels-container">
              <div className="level">
                <p className="val">Low</p>
                <p className="point">10 points</p>
              </div>
              <div className="level">
                <p className="val2">Medium</p>
                <p className="point">20 points</p>
              </div>
              <div className="level">
                <p className="val3">High</p>
                <p className="point">80 points</p>
              </div>
            </div>
          </div>
          <div className="go-bacck">   <Button text="Go Back" color="#C090F0" width="200px" onClick={() => {navigate('/tasks')}}/></div>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
