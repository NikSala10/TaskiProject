import type { ReactNode } from "react"; 

export type IconTextBarProps = {
  icon: ReactNode; 
  text: string;
  isActive?: boolean;
  onClick?: () => void; 
};


export type MemberBarProps = {
  avatar: ReactNode; 
  name: string;
  color?: string;
};

export type NavBarProps = {
  items: IconTextBarProps[]; 
  avatars: MemberBarProps[];
};
