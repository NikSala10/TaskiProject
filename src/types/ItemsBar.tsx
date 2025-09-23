import type { ReactNode } from "react"; 

export type IconTextBarProps = {
  icon: ReactNode; // cualquier ícono (ej: <PlusIcon />)
  text: string;
  onClick?: () => void; // opcional, por si quieres que sea clickeable
};