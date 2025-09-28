import type { ReactNode } from "react";

export type  GroupCardType = {
  groupName?: string; 
  avatar?: ReactNode; 
  namePlayer?: string;
  rol?: "Admin" | "Member";
}

