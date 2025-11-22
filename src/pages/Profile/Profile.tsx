import Trophy from "../../../public/assets/Trophy.svg"
import "./Profile.css";
import { useSetPageInfo } from "../../hook/UseSetPage";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import confirmTrophy from '../../../public/assets/confir-trophy.png'
import Button from "../../components/Button/Button";
import { signOut } from "firebase/auth";
import { auth, db } from "../../services/firebaseConfig";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { setAvatar } from "../../redux/slices/authSlice";
import { updateGroup, type Member } from "../../redux/slices/groupsSlice";
import AvatarWithName from "../../components/AvatarWithName/AvatarWithName";
import { useLoadAllUsers } from "../../hook/useLoadAllUsers";


const Profile = () => {
  useSetPageInfo("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  useLoadAllUsers();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [showChangePassModal, setShowChangePassModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const avatar = useSelector((state: RootState) => state.auth.avatar);
  const userId = useSelector((state: RootState) => state.auth.userID);
  const username = useSelector((state: RootState) => state.auth.username);
  const totalPoints = useSelector((state: RootState) => state.auth.numPoints);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const userTasks = tasks.filter(t => t.assigneeId === userId);

  const users = useSelector((state: RootState) => state.users.users);
  console.log(users);
  

// Ordenar de mayor a menor por puntos
  const topUsers = [...users]
    .filter(user => user.numPoints > 0) // solo usuarios con puntos
    .sort((a, b) => b.numPoints - a.numPoints)
    .slice(0, 3);

// Contamos por estado
  const completedCount = userTasks.filter(t => t.status === "completed").length;
  const pendingCount = userTasks.filter(t => t.status === "pending").length;
  const role = useSelector((state: RootState) => {
    const userID = state.auth.userID;
    const allGroups = state.group.groups;

    for (const g of allGroups) {
      const member = g.members.find(m => m.id === userID);
      if (member) return member.role;
    }

    return "Member"; // valor por defecto si no lo encuentra
  });

  const handleCloseSession = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        alert("User signed out successfully.");
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        console.error("Error signing out:", error);
      });
  };
  const handleChangePassword = async () => {
    const user = auth.currentUser;

    if (!user) return alert("No user logged in.");

    try {
      // Reautenticar
      const credential = EmailAuthProvider.credential(user.email!, currentPass);
      await reauthenticateWithCredential(user, credential);

      // Cambiar contraseña
      await updatePassword(user, newPass);
      
      alert("Password updated successfully.");
      setShowChangePassModal(false);
      setCurrentPass("");
      setNewPass("");
    } catch (error: unknown) {
  console.error(error);

  // Verificamos si es un objeto y si tiene propiedad "code"
  if (typeof error === "object" && error !== null && "code" in error) {
    const err = error as { code: string };

    if (err.code === "auth/wrong-password") {
      alert("Current password is incorrect.");
    } else if (err.code === "auth/weak-password") {
      alert("New password is too weak.");
    } else {
      alert("Something went wrong. Try again.");
    }
  } else {
    // Si no es un error de Firebase
    alert("Unexpected error occurred.");
  }
}
  };


const avatarOptions = [
  "https://api.dicebear.com/9.x/fun-emoji/svg?seed=ujio",
  "https://api.dicebear.com/9.x/fun-emoji/svg?seed=rss",
  "https://api.dicebear.com/9.x/fun-emoji/svg?seed=oso",
  "https://api.dicebear.com/9.x/fun-emoji/svg?seed=yupo",
  "https://api.dicebear.com/9.x/fun-emoji/svg?seed=kitty",
  "https://api.dicebear.com/9.x/fun-emoji/svg?seed=medir",
  "https://api.dicebear.com/9.x/fun-emoji/svg?seed=anaconda",
  "https://api.dicebear.com/9.x/fun-emoji/svg?seed=tokio",
];

const updateAvatarInGroups = async (userId: string, newAvatar: string) => {
  const q = query(
    collection(db, "groups"),
    where("memberIds", "array-contains", userId) // ✅ ahora solo trae grupos donde ese usuario es miembro
  );

  const snapshot = await getDocs(q);

  snapshot.forEach(async (groupDoc) => {
    const data = groupDoc.data();
    const members = data.members as Member[];

    const updatedMembers = members.map((m) =>
      m.id === userId ? { ...m, avatar: newAvatar } : m
    );

    await updateDoc(doc(db, "groups", groupDoc.id), { members: updatedMembers });
    dispatch(updateGroup({
      id: groupDoc.id,
      members: updatedMembers
    }));
      });
};

  // Manejo del cambio de avatar
const handleAvatarChange = async (newAvatar: string) => {
  dispatch(setAvatar(newAvatar));

  await updateDoc(doc(db, "users", userId), { avatar: newAvatar });
  alert("Avatar updated successfully!");

  await updateAvatarInGroups(userId, newAvatar); // ✅ aquí
};




  return (
    <div className="container-profile">
        <div className="log-out-respon">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none" stroke="#2B438D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path strokeDasharray="48" strokeDashoffset="48" d="M16 5v-1c0 -0.55 -0.45 -1 -1 -1h-9c-0.55 0 -1 0.45 -1 1v16c0 0.55 0.45 1 1 1h9c0.55 0 1 -0.45 1 -1v-1"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="48;0"/></path><path strokeDasharray="12" strokeDashoffset="12" d="M10 12h11"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="12;0"/></path><path strokeDasharray="6" strokeDashoffset="6" d="M21 12l-3.5 -3.5M21 12l-3.5 3.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.9s" dur="0.2s" values="6;0"/></path></g>
          </svg>
        </div>
        <div className="header-profile">
            <div className="info-user-profile">
                <div className="img-profile">
                    <img src={avatar} alt="User" style={{ width: "120px", height: "120px", borderRadius: "50%" }}/>
                    <div className="change-img-profile" onClick={() => setShowAvatarModal(true)}>
                      <svg width="23" height="19" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="18.2402" width="10.64" height="0.760001" rx="0.380001" fill="#FFFAF8"/>
                        <path d="M16.7508 0.683403C16.9066 0.472329 17.204 0.427505 17.4151 0.583285L20.658 2.9767C20.8691 3.13248 20.9139 3.42987 20.7581 3.64095L12.7801 14.4507C12.7419 14.5025 12.6936 14.546 12.6381 14.5785L8.22432 17.1652C8.06038 17.2613 7.85496 17.2504 7.70208 17.1376C7.5492 17.0247 7.47827 16.8317 7.52175 16.6467L8.6926 11.6666C8.70732 11.6039 8.73461 11.545 8.77281 11.4932L16.7508 0.683403ZM16.2017 3.02731L18.6802 4.85659L19.7117 3.459L17.2331 1.62972L16.2017 3.02731ZM18.1161 5.62096L15.6375 3.79168L10.4518 10.818L10.4933 11.0932L10.963 11.0224C11.2224 10.9833 11.4644 11.1619 11.5035 11.4213L11.5743 11.891L12.044 11.8202C12.3034 11.7811 12.5453 11.9597 12.5844 12.2191L12.6552 12.6888L12.9304 12.6473L18.1161 5.62096ZM9.67926 11.8648L9.59507 11.9789L8.7002 15.7852L12.0736 13.8082L12.1578 13.6941C11.9697 13.6542 11.817 13.5015 11.7866 13.3001L11.7158 12.8304L11.2462 12.9012C10.9867 12.9403 10.7448 12.7617 10.7057 12.5023L10.6349 12.0326L10.1652 12.1034C9.96377 12.1337 9.77286 12.0328 9.67926 11.8648Z" fill="#FFFAF8"/>
                      </svg>
                    </div>
                </div>
                
                <div className="info-profile">
                    <span className="name-profile">{username}</span>
                    <span className="role-profile">{role}</span>
                </div>
            </div>
            
            <div className="btn-profile">
                <button className="btn-cp-profile" onClick={() => setShowChangePassModal(true)}>Change Password</button>
            </div>
        </div>
        <div className="log-out" >
          <svg onClick={handleCloseSession}  xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none" stroke="#2B438D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path strokeDasharray="48" strokeDashoffset="48" d="M16 5v-1c0 -0.55 -0.45 -1 -1 -1h-9c-0.55 0 -1 0.45 -1 1v16c0 0.55 0.45 1 1 1h9c0.55 0 1 -0.45 1 -1v-1"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="48;0"/></path><path strokeDasharray="12" strokeDashoffset="12" d="M10 12h11"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="12;0"/></path><path strokeDasharray="6" strokeDashoffset="6" d="M21 12l-3.5 -3.5M21 12l-3.5 3.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.9s" dur="0.2s" values="6;0"/></path></g>
          </svg>
        </div>
        <div className="tasks-summary">
            <div className=" tasks completed-tasks">
                <p className="task-num">{completedCount}</p>
                <p>Completed tasks</p>
            </div>
            <div className="tasks pending-tasks">
                <p className="task-num">{pendingCount}</p>
                <p>Pending tasks</p>
            </div>
        </div>
        <div className="subcontainer-profile">
            <div className="square-points" onClick={openModal}>
                <div className="trophy-img">
                    <img src={Trophy}/>
                </div>
                <p className="num-points">{totalPoints}</p>
                <p>Points</p>
            </div>
            <div className="square-points-2" onClick={openModal}>
                <div className="trophy-img-2">
                <img src={Trophy}/>
                </div>
                <div>
                    <p className="num-points-2">{totalPoints} </p>
                    <p> Points</p>
                </div>
            </div>

            <div className="groups-ranking">
              <h2 className="title-list">Ranking</h2>
              <div className="ranking-list">
                {topUsers.map((user, index) => (
                <div key={user.uid} className="ranking-item">
                  <span className="ranking-number">{index + 1}</span>
                  <AvatarWithName
                    avatar={user.avatar}
                    username={user.username}
                    role={user.role ?? "Member"} // si quieres mostrar rol
                    numPoints={user.numPoints ?? 0}
                    showRanking={true}
                  />
                </div>
              ))}
              </div>

        </div>

        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <div className="content-modal-pf">
                <h3 className="tit-prf-md">Congratulations, you have won. <br /> Please confirm if you have <br /> already received your prize. </h3>
                <img src={confirmTrophy} alt="" />
                <Button text="Confirm" color="#82C2F6" width="390px"  onClick={closeModal}/>
            </div>
        </Modal>
        {showChangePassModal && (
      <Modal isOpen={showChangePassModal} onClose={() => setShowChangePassModal(false)}>
        <h3 className="tit-additional">Change Password</h3>
        <div className="content-chng-pss">
          <label className="input-label-chang-pss">Current Password</label>
          <input
            type="password"
            placeholder="Current password"
            value={currentPass}
            onChange={(e) => setCurrentPass(e.target.value)}
            className="input-field-chn-pss"
          />
          <label className="input-label-chang-pss">New Password</label>
          <input
            type="password"
            placeholder="New password"
            className="input-field-chn-pss"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />
          <Button text="Save" color="#82C2F6" width="300px"  onClick={handleChangePassword}/>
        </div>
      </Modal>
    )}
      <Modal isOpen={showAvatarModal} onClose={() => setShowAvatarModal(false)}>
        <h3 className="tit-additional">Select your avatar</h3>
        <div className="avatar-grid">
          {avatarOptions.map((img) => (
            <img 
              key={img}
              src={img}
              onClick={() => handleAvatarChange(img)}
              style={{ width: "70px", cursor: "pointer", borderRadius: "50%" }}
            />
          ))}
        </div>
      </Modal>
    </div>
    
  );
};

export default Profile;