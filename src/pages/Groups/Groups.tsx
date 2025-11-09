import { useNavigate } from "react-router";
import Button from "../../components/Button/Button";
import GroupCard from "../../components/GroupCard/GroupCard";
import { useSetPageInfo } from "../../hook/UseSetPage";
import "./Groups.css";
import JoinGroupModal from "../../components/JoinGroupModal/JoinGroup";
import { useEffect, useState } from "react";
import { query, where, collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../services/firebaseConfig";
import { setGroups, type Group } from "../../redux/slices/groupsSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { onAuthStateChanged } from "firebase/auth";

const Groups = () => {
  useSetPageInfo("Groups");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const groups = useSelector((state: RootState) => state.group.groups);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        navigate("/login");
        return;
      }

      try {
        const q = query(
          collection(db, "groups"),
          where("memberIds", "array-contains", user.uid)
        );

        const snapshot = await getDocs(q);
        const userGroups: Group[] = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          const group: Group = {
            id: doc.id,
            name: data.name,
            description: data.description || "",
            planBudget: data.planBudget || 0,
            startDate: data.startDate || "",
            planDuration: data.planDuration || "",
            ownerID: data.ownerID || "",
            members: data.members || [],
            inviteCode: data.inviteCode || "",
          };
          userGroups.push(group);
        });

        dispatch(setGroups(userGroups));
      } catch (error) {
        console.error("Error fetching user groups:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);


  return (
    <div className="groups">
      <div className="btns"> 
        <Button text="Create Group" color="#C090F0" width="180px" onClick={() => {navigate('/create-group')}}/>
        <Button text="Join Group" color="#82C2F6" width="180px" onClick={() => setIsJoinModalOpen(true)} />
      </div>
      <JoinGroupModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
      />
      <div className="cardsGroups">
         {loading ? (
          <p>Cargando grupos...</p>
        ) : groups.length === 0 ? (
          <p>No estás en ningún grupo todavía.</p>
        ) : (
          groups.map((group) => (
            <GroupCard
              key={group.id}
              id={group.id}
              ownerID={group.ownerID}
              groupName={group.name}
              inviteCode={group.inviteCode}
              members={group.members || []} 
            />
          ))
        )}
        
      </div>
    </div>
  );
};

export default Groups;
