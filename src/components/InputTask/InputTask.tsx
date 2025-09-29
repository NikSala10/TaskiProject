import type { InputHTMLAttributes } from "react";

type InputProps = {
  label: string;
  placeholder: string;
  type?: string; 
}; 

const InputTask = ({ label, placeholder, type = "text", ...rest }: InputProps) => {
  return (
    <div className="input-container">
      <label className="input-label">{label}</label>
      <input
        className="input-field"
        type={type}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};

export default InputTask;
