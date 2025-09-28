import type { ButtonProps } from "../../types/ButtonType";

const Button = ({ text, color = "#4CAF50", width = "150px", onClick }: ButtonProps) => {
  return (
    <button
      className="custom-button"
      style={{ backgroundColor: color, width: width }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;