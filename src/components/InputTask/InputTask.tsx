import type { InputHTMLAttributes } from "react";



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
