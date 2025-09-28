import type { ReactNode } from "react";

export type AvatarWithNameProps = {
  avatar: ReactNode;
  namePlayer: string;
  rol: "Admin"| "Member"; 
};

export type GroupCardType = {
  groupName: string;
  members: AvatarWithNameProps[];
};