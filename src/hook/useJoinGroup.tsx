import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addMemberToGroup } from "../redux/slices/groupsSlice";
import { db } from "../services/firebaseConfig";
import { arrayUnion, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import type { RootState } from "../redux/store";

export const useJoinGroup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userID = useSelector((state: RootState) => state.auth.userID);
  const username = useSelector((state: RootState) => state.auth.username);

  const joinGroup = async (joinCode: string, e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault();
    if (!joinCode.trim()) {
      alert("Please enter a valid code.");
      return;
    }

    try {
      // 1️⃣ Buscar grupo con ese código
      const q = query(collection(db, "groups"), where("inviteCode", "==", joinCode.trim()));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("No group found with that code.");
        return;
      }

      // 2️⃣ Tomar el primer grupo encontrado
      const groupDoc = querySnapshot.docs[0];
      const groupId = groupDoc.id;

      // 3️⃣ Agregar al usuario en el grupo (en Firestore)
      await updateDoc(doc(db, "groups", groupId), {
        members: arrayUnion({
          id: userID,
          username: username,
          role: "Member",
        }),
      });

      // 4️⃣ Guardar también en Redux
      dispatch(
        addMemberToGroup({
          groupId: groupId,
          member: {
            id: userID,
            username: username,
            role: "Member",
          },
        })
      );

      alert("You successfully joined the group!");
      navigate("/groups");
    } catch (error) {
      console.error("Error joining group:", error);
      alert("There was a problem joining the group.");
    }
  };

  return { joinGroup };
};
