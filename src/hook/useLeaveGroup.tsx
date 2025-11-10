import { doc, updateDoc, arrayRemove, getDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { setGroups, type Member } from "../redux/slices/groupsSlice";

export const useLeaveGroup = () => {
  const dispatch = useDispatch();
  const userID = useSelector((state: RootState) => state.auth.userID);
  const groups = useSelector((state: RootState) => state.group.groups);

  const leaveGroup = async (groupId: string) => {
    try {
      const groupRef = doc(db, "groups", groupId);
      const groupSnap = await getDoc(groupRef);

      if (!groupSnap.exists()) return;

      const data = groupSnap.data();
      const members = data.members as Member[];
      const updatedMembers = members.filter((m) => m.id !== userID);

      // ✅ Eliminar usuario de Firestore
      await updateDoc(groupRef, {
        memberIds: arrayRemove(userID),
        members: updatedMembers,
      });

      // ✅ Actualizar Redux
      const updatedGroups = groups.filter(g => g.id !== groupId);
      dispatch(setGroups(updatedGroups));

      alert("Has salido del grupo correctamente");
    } catch (e) {
      console.error("Error leaving group:", e);
    }
  };

  return { leaveGroup };
};
