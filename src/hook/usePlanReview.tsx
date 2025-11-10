import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, onSnapshot, query, getDocs } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { setPlanReviewGroups, setPlanReviewLoading } from "../redux/slices/planReviewSlice";
import type { RootState } from "../redux/store";

export const usePlanReview = () => {
  const dispatch = useDispatch();
  const userID = useSelector((state: RootState) => state.auth.userID);

  useEffect(() => {
    if (!userID) return;

    dispatch(setPlanReviewLoading(true));

    const q = query(collection(db, "groups"));

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const groupsData = await Promise.all(
        snapshot.docs.map(async (docSnapshot) => {
          const data = docSnapshot.data();
          
          const membersRef = collection(db, "groups", docSnapshot.id, "members");
          const membersSnapshot = await getDocs(membersRef);

          const members = membersSnapshot.docs.map((memberDoc) => ({
            id: memberDoc.id,
            avatar: memberDoc.data().avatar,
            username: memberDoc.data().username,
            role: memberDoc.data().role,
          }));

          return {
            id: docSnapshot.id,
            name: data.name || "",
            planBudget: data.planBudget || 0,
            startDate: data.startDate || "",
            planDuration: data.planDuration || "1year",
            ownerID: data.ownerID || "",
            members,
          };
        })
      );

      // Filtrar solo grupos donde el usuario es owner o miembro
      const userGroups = groupsData.filter(
        (group) =>
          group.ownerID === userID ||
          group.members.some((m) => m.id === userID)
      );

      dispatch(setPlanReviewGroups(userGroups));
      dispatch(setPlanReviewLoading(false));
    });


    return () => unsubscribe();
  }, [dispatch, userID]);
};