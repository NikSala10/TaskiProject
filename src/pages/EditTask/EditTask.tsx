import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Button from "../../components/Button/Button";
import InputTask from "../../components/InputTask/InputTask";
import { useSetPageInfo } from "../../hook/UseSetPage";
import "../CreateTask/CreateTask.css";
import { doc, updateDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { updateTask } from "../../redux/slices/tasksSlice";
import type { RootState } from "../../redux/store";
import type { Task } from "../../types/TasksType";
import { db } from "../../services/firebaseConfig";

const EditTask = () => {
  useSetPageInfo("Edit Task");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const groups = useSelector((state: RootState) => state.group.groups);
  const userID = useSelector((state: RootState) => state.auth.userID);


  const taskToEdit = tasks.find(t => t.id === id);

  const [title, setTitle] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [assignee, setAssignee] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
  const [schedule, setSchedule] = useState("");
  const [members, setMembers] = useState<{ id: string; username: string }[]>([]);

    useEffect(() => {
  if (!taskToEdit) return;

  setTitle(taskToEdit.title);
  setSelectedGroup(taskToEdit.groupId);
  setAssignee(taskToEdit.assigneeId || "");
  setPriority(taskToEdit.priority);
  setSchedule(taskToEdit.schedule || "");

  const group = groups.find(g => g.id === taskToEdit.groupId);
  if (group) {
    const owner = group.ownerID || group.ownerID;
    setMembers(group.members.filter(m => m.id !== owner));
  }
}, [taskToEdit, groups]);


useEffect(() => {
  const group = groups.find(g => g.id === selectedGroup);
  if (group) {
    const owner = group.ownerID || group.ownerID;
    setMembers(group.members.filter(m => m.id !== owner));
  }
}, [selectedGroup, groups]);


  const handleSubmit = async () => {
    if (!taskToEdit) return;

    const updatedTask: Task = {
        ...taskToEdit,
        title,
        groupId: selectedGroup,
        assigneeId: assignee === "none" ? null : assignee,
        assigneeName:
        assignee === "none"
            ? null
            : members.find((m) => m.id === assignee)?.username || null,
        priority,
        schedule,
        isAdditional: assignee === "none",
    };

  const taskRef = doc(db, "tasks", updatedTask.id);

  const clean = { ...updatedTask };
    Object.keys(clean).forEach(key => {
    if (clean[key as keyof typeof clean] === undefined) {
        delete clean[key as keyof typeof clean];
    }
    });

await updateDoc(taskRef, clean);

  dispatch(updateTask(updatedTask)); // ✅ Redux actualizado

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
          onChange={(e) => setSelectedGroup(e.target.value)}
          options={groups
            .filter(g => g.ownerID === userID) // ← SOLO grupos que tú creaste
            .map(g => ({ value: g.id, label: g.name }))
        }
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
        <div className="assign-taks-nl"><Button text="Save Changes" color="#82C2F6" width="480px" onClick={handleSubmit} /></div>
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

export default EditTask;