import type { ReactNode } from "react"; //ReactNode es el tipado de un componente de react, hay que especificar en el import que es type

export type TypeToDoProvider = {
  children: ReactNode;
};

export interface LoginFormData {
    email: string;
    password: string;
  }