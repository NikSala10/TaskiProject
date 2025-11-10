import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const updateGroupPeriod = async (
  groupId: string,
  planDuration: string
): Promise<void> => {
  try {
    const groupRef = doc(db, "groups", groupId);
    await updateDoc(groupRef, {
      planDuration,
      startDate: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error updating group period:", error);
    throw error;
  }
};

export const updateGroupBudget = async (
  groupId: string,
  planBudget: number
): Promise<void> => {
  try {
    const groupRef = doc(db, "groups", groupId);
    await updateDoc(groupRef, {
      planBudget,
    });
  } catch (error) {
    console.error("Error updating group budget:", error);
    throw error;
  }
};

export const resetGroupPeriod = async (groupId: string): Promise<void> => {
  try {
    const groupRef = doc(db, "groups", groupId);
    await updateDoc(groupRef, {
      startDate: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error resetting group period:", error);
    throw error;
  }
};