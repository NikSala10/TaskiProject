export type OptionType = {
  value: string;
  label: string;
};

export type InputProps = {
  label: string;
  value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  placeholder?: string;
  type: "text" | "email" | "password" | "number" | "select" | "datetime-local"; 
  options?: OptionType[]; 
};