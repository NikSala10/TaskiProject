import { useDispatch } from "react-redux";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { deleteGroup } from "../redux/slices/groupsSlice";

export const useDeleteGroup = () => {
  const dispatch = useDispatch();

  const removeGroup = async (groupId: string) => {
    if (!window.confirm("Are you sure you want to delete this group?")) return;

    try {
      // 🔥 Eliminar el grupo de Firestore
      await deleteDoc(doc(db, "groups", groupId));

      // 🧠 Actualizar Redux
      dispatch(deleteGroup(groupId));

      alert("Group deleted successfully!");
    } catch (error) {
      console.error("Error deleting group:", error);
      alert("There was a problem deleting the group.");
    }
  };

  return { removeGroup };
};
