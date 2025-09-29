import type { InputProps } from "../../types/InputTask";

const InputTask = ({ label, placeholder, type, options = [] }: InputProps) => {
  return (
    <div className="input-container-task">
      <label className="input-label-task">{label}</label>

      {type === "select" ? (
        <select className="input-field-task">
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
        />
      )}
    </div>
  );
};

export default InputTask;
