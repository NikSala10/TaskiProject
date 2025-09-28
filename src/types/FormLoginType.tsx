import type { ReactNode } from "react"; 

export type TypeToDoProvider = {
  children: ReactNode;
};

export interface LoginFormData {
    email: string;
    password: string;
  }