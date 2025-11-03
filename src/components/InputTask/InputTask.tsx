import type { InputProps } from "../../types/InputTask";
import "./InputTask.css";

const InputTask = ({ value, onChange, label, placeholder, type, options = [] }: InputProps) => {
  return (
    <div className="input-container-task">
      <label className="input-label-task">{label}</label>

      {type === "select" ? (
        <select className="input-field-task" value={value} onChange={onChange}>
           <option value="">Select</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          className="input-field-task"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default InputTask;
