export type OptionType = {
  value: string;
  label: string;
};

export type InputProps = {
  label: string;
  placeholder?: string;
  type: "text" | "email" | "password" | "number" | "select";
  options?: OptionType[]; // solo se usa si es select
};