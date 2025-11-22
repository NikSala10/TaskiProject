import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addMemberToGroup, addGroup, type Group } from "../redux/slices/groupsSlice";
import { db } from "../services/firebaseConfig";
import { arrayUnion, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import type { RootState } from "../redux/store";

export const useJoinGroup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userID = useSelector((state: RootState) => state.auth.userID);
  const username = useSelector((state: RootState) => state.auth.username);
  const avatar = useSelector((state: RootState) => state.auth.avatar);
  const groups = useSelector((state: RootState) => state.group.groups); // 👈 lista actual

  const joinGroup = async (joinCode: string, e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault();
    if (!joinCode.trim()) {
      alert("Please enter a valid code.");
      return;
    }

    try {
      const q = query(collection(db, "groups"), where("inviteCode", "==", joinCode.trim())); // Qury: Crea la consulta.
      const querySnapshot = await getDocs(q); // contiene todos los grupos con ese código de invitación.

      if (querySnapshot.empty) {
        alert("No group found with that code.");
        return;
      }

      const groupDoc = querySnapshot.docs[0]; // Toma el primer elemento encontrado
      const groupId = groupDoc.id;
      const groupData = groupDoc.data();

      await updateDoc(doc(db, "groups", groupId), {
        memberIds: arrayUnion(userID), //Agrega elementos a un array solo si no existen ya, evita duplicados.
        members: arrayUnion({
          id: userID,
          username: username,
          avatar: avatar || "",
          role: "Member",
        }),
      });

      // Si el grupo no existe todavía en Redux, lo agregamos completo
      //Si Redux todavía no tiene ese grupo (!groupExists), lo agregamos con dispatch(addGroup(...))
      const groupExists = groups.some(g => g.id === groupId);
      if (!groupExists) {
          const formattedGroup: Group = {
            id: groupId,
            name: groupData.name,
            description: groupData.description,
            planBudget: groupData.planBudget,
            startDate: groupData.startDate,
            planDuration: groupData.planDuration,
            ownerID: groupData.ownerID,
            inviteCode: groupData.inviteCode,
            members: groupData.members || []
          };
          dispatch(addGroup(formattedGroup));
        }

      // Además, actualizamos los miembros en el estado
      dispatch(
        addMemberToGroup({
          groupId: groupId,
          member: {
            id: userID,
            username: username,
            avatar: avatar || "",
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
