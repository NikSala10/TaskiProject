export type ButtonProps = {
  text: string;
  color?: string;    
  width?: string; 
  type?: "button" | "submit" | "reset";    
  onClick?: () => void;
  disabled?: boolean;
};
