import type { InputProps } from "../../types/InputTask";



const InputTask = ({ label, placeholder}: InputProps) => {
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
