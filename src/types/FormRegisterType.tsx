import type { ReactNode } from "react"; 

export type TypeToDoProvider = {
  children: ReactNode;
};

export interface UserRegisterData {
    username: string;
    email: string;
    password: string;
    terms: boolean;
  }