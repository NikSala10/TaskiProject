import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, onSnapshot, query, getDocs } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { setPlanReviewGroups, setPlanReviewLoading } from "../redux/slices/planReviewSlice";
import type { RootState } from "../redux/store";
import type { PlanReviewGroup } from "../redux/slices/planReviewSlice";

export const usePlanReview = () => {
  const dispatch = useDispatch();
  const userID = useSelector((state: RootState) => state.auth.userID);

  useEffect(() => {
    if (!userID) return;

    dispatch(setPlanReviewLoading(true));

    const q = query(collection(db, "groups"));

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const userGroups: PlanReviewGroup[] = [];

      for (const docSnapshot of snapshot.docs) {
        const data = docSnapshot.data();
        
        // Obtener la subcolección de members
        const membersRef = collection(db, "groups", docSnapshot.id, "members");
        const membersSnapshot = await getDocs(membersRef);
        const members = membersSnapshot.docs.map(memberDoc => ({
          id: memberDoc.id,
          avatar: memberDoc.data().avatar,
          username: memberDoc.data().username,
          role: memberDoc.data().role,
        }));

        // Verificar si el usuario actual es miembro o owner
        const isMember = members.some(member => member.id === userID);
        const isOwner = data.ownerID === userID;

        if (isMember || isOwner) {
          userGroups.push({
            id: docSnapshot.id,
            name: data.name || "",
            planBudget: data.planBudget || 0,
            startDate: data.startDate || "",
            planDuration: data.planDuration || "1year",
            ownerID: data.ownerID || "",
            members: members,
          });
        }
      }

      dispatch(setPlanReviewGroups(userGroups));
      dispatch(setPlanReviewLoading(false));
    });

    return () => unsubscribe();
  }, [dispatch, userID]);
};