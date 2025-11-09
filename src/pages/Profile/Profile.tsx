import Trophy from "../../assets/Trophy.svg"
import "./profile.css";
import { useSetPageInfo } from "../../hook/UseSetPage";
import AvatarWithName from "../../components/AvatarWithName/AvatarWithName";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import confirmTrophy from '../../assets/confir-trophy.png'
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


const Profile = () => {
  useSetPageInfo("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none" stroke="#2B438D" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="48" stroke-dashoffset="48" d="M16 5v-1c0 -0.55 -0.45 -1 -1 -1h-9c-0.55 0 -1 0.45 -1 1v16c0 0.55 0.45 1 1 1h9c0.55 0 1 -0.45 1 -1v-1"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="48;0"/></path><path stroke-dasharray="12" stroke-dashoffset="12" d="M10 12h11"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="12;0"/></path><path stroke-dasharray="6" stroke-dashoffset="6" d="M21 12l-3.5 -3.5M21 12l-3.5 3.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.9s" dur="0.2s" values="6;0"/></path></g>
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
          <svg onClick={handleCloseSession}  xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none" stroke="#2B438D" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="48" stroke-dashoffset="48" d="M16 5v-1c0 -0.55 -0.45 -1 -1 -1h-9c-0.55 0 -1 0.45 -1 1v16c0 0.55 0.45 1 1 1h9c0.55 0 1 -0.45 1 -1v-1"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="48;0"/></path><path stroke-dasharray="12" stroke-dashoffset="12" d="M10 12h11"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="12;0"/></path><path stroke-dasharray="6" stroke-dashoffset="6" d="M21 12l-3.5 -3.5M21 12l-3.5 3.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.9s" dur="0.2s" values="6;0"/></path></g>
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
                  <div className="ranking-item">
                      <span className="ranking-number">1</span>
                      <AvatarWithName  avatar={<svg width="38" height="40" viewBox="0 0 38 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M16.5693 0.965726C42.2366 -1.96175 45.6597 36.9599 20.6148 39.1036C-4.3264 41.2358 -7.78405 3.74337 16.5693 0.965726ZM8.36317 28.6039H24.1301C25.3057 28.6039 28.2101 26.4486 28.8901 25.3998C30.8494 22.3801 28.8901 18.2194 25.6284 17.2282C24.7063 16.9401 22.3321 16.9401 21.8941 16.5021C21.6982 16.3062 19.4277 12.0417 19.3355 11.7305C18.9321 10.359 19.6812 8.4112 17.5951 8.84917C18.1253 9.78273 16.9036 10.7278 16.3158 10.1285C16.1544 9.96714 16.7883 8.10001 15.3476 8.999C14.8175 9.33324 14.8175 10.6587 14.4141 11.258C14.0107 11.8573 12.6622 12.4797 12.0052 13.3095C9.89607 15.9719 11.9822 14.8309 13.1232 15.3841C14.6676 17.5048 15.532 20.1557 16.627 22.553C12.3971 22.0113 8.31708 23.8899 8.34013 28.6039H8.36317Z" fill="#4EB9AA"/>
                                  <path d="M8.36326 28.6038C8.34021 23.8899 12.4202 22.0112 16.6501 22.5529C15.5667 20.1556 14.6908 17.5047 13.1464 15.3841C12.0053 14.8308 9.90768 15.9719 12.0284 13.3095C12.6853 12.4796 14.0223 11.8918 14.4372 11.2579C14.8521 10.624 14.8291 9.33317 15.3708 8.99893C16.8115 8.09994 16.1776 9.96707 16.3389 10.1284C16.9267 10.7278 18.1484 9.78266 17.6182 8.84909C19.7044 8.41112 18.9552 10.3589 19.3586 11.7305C19.4508 12.0532 21.7213 16.3176 21.9173 16.502C22.3552 16.94 24.7295 16.94 25.6515 17.2281C28.9132 18.2309 30.8726 22.3916 28.9133 25.3997C28.2332 26.4485 25.3288 28.6038 24.1532 28.6038H8.38631H8.36326ZM9.95378 27.6472H20.6264C20.9722 27.6472 23.1159 27.2438 23.6 27.117C25.882 26.4946 27.5648 25.0309 28.0834 22.6797C28.3485 21.5156 26.1586 23.0831 25.7437 23.2099C24.6257 23.5672 23.0006 23.9936 21.8711 24.1089C17.9294 24.5007 10.3456 22.2648 9.9653 27.6472H9.95378Z" fill="#F9FCFD"/>
                                  <path d="M9.95378 27.6471C10.3341 22.2647 17.9179 24.5006 21.8596 24.1088C23.0007 23.9935 24.6257 23.5555 25.7322 23.2098C26.1471 23.083 28.337 21.5155 28.0719 22.6796C27.5417 25.0423 25.8705 26.4946 23.5885 27.1169C23.1159 27.2437 20.9722 27.6471 20.6149 27.6471H9.94226H9.95378Z" fill="#4EB9AA"/>
                                  </svg>}
                              namePlayer={"Luli"}
                              rol={"Admin"}
                              showRanking={true}
                              numPoints={80}
                              ></AvatarWithName>
                      </div>
                      <div className="ranking-item">
                          <span className="ranking-number">2</span>
                      <AvatarWithName  avatar={<svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M16.3154 0.133352C31.6512 -1.59976 42.8366 13.8842 35.7331 27.7377C28.6297 41.5912 9.01813 41.2491 2.08569 27.7377C-3.80917 16.2444 3.37412 1.59281 16.3154 0.133352ZM31.8222 23.9978C31.9134 23.4505 31.7538 23.0173 31.5828 22.5156C30.6592 19.7905 28.6183 16.5523 26.6571 14.5113C26.3378 14.1693 26.1668 12.7896 25.095 13.0177C24.6389 13.1089 24.5591 13.8956 23.5215 13.8956C20.5798 13.9184 18.5731 11.8889 15.3577 13.3597C11.481 15.1156 13.4991 20.0869 10.4092 22.9146C9.17776 24.0434 5.05022 24.8188 5.03882 25.1038C5.01601 26.187 8.91552 25.3319 9.65665 25.0012C11.5722 24.1689 12.6326 21.8657 13.3851 21.478C13.8868 21.2157 13.807 21.706 13.8868 21.9113C14.8674 24.4083 16.5777 29.7217 16.6917 23.0515C18.1968 24.0434 22.3357 21.706 23.5671 22.47C23.7496 22.584 25.0494 26.6431 26.1326 25.5713C26.4747 25.2407 24.8556 22.1621 25.1862 21.7972C25.9388 21.9113 26.6343 21.1929 27.2614 21.1587C28.8463 21.0561 30.1461 23.9408 31.7994 23.9978H31.8222Z" fill="#365EA9"/>
                              <path d="M31.822 23.9981C30.1687 23.941 28.8689 21.0563 27.284 21.159C26.6569 21.1932 25.9613 21.9115 25.2088 21.7975C24.8781 22.1623 26.4858 25.2409 26.1552 25.5715C25.0606 26.6433 23.7721 22.5842 23.5897 22.4702C22.3469 21.6948 18.2079 24.0323 16.7143 23.0517C16.6003 29.7219 14.8785 24.4085 13.9094 21.9115C13.8296 21.7062 13.9094 21.216 13.4077 21.4782C12.6551 21.8659 11.5948 24.1691 9.67921 25.0014C8.93808 25.3207 5.03857 26.1758 5.06138 25.1041C5.06138 24.8076 9.20032 24.0323 10.4317 22.9149C13.5217 20.0986 11.5035 15.1273 15.3802 13.3599C18.607 11.8891 20.6024 13.9186 23.5441 13.8958C24.5817 13.8958 24.6615 13.1091 25.1176 13.0179C26.2008 12.7898 26.3604 14.1695 26.6797 14.5116C28.6408 16.5525 30.6704 19.7907 31.6053 22.5158C31.7764 23.0175 31.9474 23.4508 31.8448 23.9981H31.822Z" fill="#F9FBFE"/>
                              </svg>}
                      namePlayer={"Patiks"}
                      rol={"Member"}
                      showRanking={true}
                      numPoints={60}
                      ></AvatarWithName>
                      </div>
                      <div className="ranking-item">
                          <span className="ranking-number">3</span>
                      <AvatarWithName  avatar={<svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M16.4394 0.155561C41.8502 -2.74266 45.239 35.79 20.4444 37.9123C-4.35019 40.0346 -7.6706 2.90545 16.4394 0.155561ZM10.1523 5.79226C9.38781 5.26738 8.44077 5.94059 8.99988 6.94469C9.10257 7.11585 10.5973 7.45816 9.5704 8.11995C8.7945 8.62201 6.21577 8.11996 6.07884 9.706C5.88487 11.9424 9.39923 10.7557 9.84423 11.1437C10.2664 11.5088 12.1605 20.8425 12.0464 21.9607C11.8981 23.4782 9.57041 31.9561 10.1866 32.5609C10.643 32.5266 11.1678 32.6407 11.6014 32.5609C12.9022 32.2984 13.9291 27.449 14.9446 26.1254C15.3212 25.6348 15.4125 25.669 15.9944 25.6006C18.6758 25.2925 22.0305 25.8288 24.7917 25.669C25.8187 26.0227 27.6557 32.1615 28.2034 32.5038C28.6256 32.7662 30.0633 32.4353 30.6795 32.5609C31.4554 31.7735 26.6288 21.8694 27.2107 19.941L24.9401 20.5116L16.5763 17.6476C15.2185 13.9735 12.4686 10.3564 12.3887 6.38559L10.9738 7.64072C10.3805 7.36688 10.3805 5.96341 10.1409 5.80366L10.1523 5.79226Z" fill="#F28F30"/>
                              <path d="M10.1521 5.79247C10.3918 5.95221 10.3918 7.36708 10.9851 7.62952L12.4 6.37439C12.4798 10.3452 15.2297 13.9622 16.5876 17.6364L24.9513 20.5004L27.222 19.9298C26.6401 21.8582 31.4666 31.7623 30.6907 32.5497C30.0746 32.4355 28.6369 32.755 28.2147 32.4926C27.667 32.1503 25.8299 26.0115 24.803 25.6578C22.0417 25.8176 18.6871 25.2813 16.0056 25.5894C15.4237 25.6578 15.3325 25.6236 14.9559 26.1142C13.9404 27.4378 12.9135 32.2872 11.6127 32.5497C11.1791 32.6409 10.6542 32.5268 10.1978 32.5497C9.58164 31.9449 11.9093 23.467 12.0577 21.9495C12.1718 20.8313 10.2777 11.4976 9.8555 11.1325C9.39909 10.7445 5.88469 11.9426 6.09007 9.69479C6.227 8.09735 8.80573 8.61081 9.58163 8.10876C10.6086 7.44696 9.1138 7.10465 9.01111 6.9335C8.4406 5.91798 9.39907 5.25618 10.1636 5.78105L10.1521 5.79247ZM11.7724 8.89607C11.567 8.69068 10.0266 8.89607 10.1978 9.68338C10.4716 10.8929 12.4913 9.62633 11.7724 8.89607ZM14.7848 20.5688C14.0773 20.7856 13.986 22.7938 15.0928 22.7824C16.7473 22.7824 16.2453 20.1238 14.7848 20.5688ZM19.5657 20.9454C19.075 21.0823 18.1508 22.1206 18.0709 22.6341C17.6373 25.5779 24.7459 26.2626 24.3922 22.6455C24.1868 20.6031 21.0604 20.5118 19.5771 20.9454H19.5657Z" fill="#FFFCFA"/>
                              <path d="M19.5659 20.9454C21.0492 20.5118 24.187 20.6031 24.381 22.6456C24.7461 26.2626 17.6375 25.578 18.0597 22.6342C18.1396 22.1207 19.0638 21.0938 19.5545 20.9454H19.5659Z" fill="#F28F30"/>
                              <path d="M14.785 20.5685C16.2455 20.1349 16.7362 22.7821 15.0931 22.7821C13.9977 22.7821 14.0776 20.7739 14.785 20.5685Z" fill="#F7AB61"/>
                              <path d="M11.7727 8.89602C12.4915 9.61487 10.4719 10.8928 10.1981 9.68334C10.0269 8.90743 11.5673 8.70205 11.7727 8.89602Z" fill="#F7AB61"/>
                              </svg>}
                          namePlayer={"Hermione"}
                          rol={"Member"}
                          showRanking={true}
                          numPoints={40}
                              ></AvatarWithName>
                  </div>
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