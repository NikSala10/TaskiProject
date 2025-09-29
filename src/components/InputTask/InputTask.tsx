import type { InputProps } from "../../types/InputTask";

const InputTask = ({ label, placeholder, type}: InputProps) => {
  return (
    <div className="input-container-task">
      <label className="input-label-task">{label}</label>
      <input
        className="input-field-task"
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputTask;
