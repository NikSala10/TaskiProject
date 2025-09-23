import type { ReactNode } from "react"; 

export type IconTextBarProps = {
  icon: ReactNode; 
  text: string;
  onClick?: () => void; 
};


export type MemberBarProps = {
  avatar: ReactNode; 
  name: string;
};

export type NavBarProps = {
  items: IconTextBarProps[]; 
  avatars: MemberBarProps[];
};
