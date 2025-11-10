import { collection, getDocs } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUsers } from "../redux/slices/usersSlice";
import { db } from "../services/firebaseConfig";

export const useLoadAllUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {

    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const usersList = snapshot.docs.map(doc => ({
        uid: doc.id,
        username: doc.data().username,
        role: doc.data().role,
        numPoints: doc.data().numPoints || 0,
        avatar: doc.data().avatar || "",
      }));
      dispatch(setUsers(usersList));
    };

    fetchUsers();
  }, [dispatch]);
};
