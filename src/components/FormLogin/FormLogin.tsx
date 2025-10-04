import { useNavigate } from "react-router";
import "./LoginForm.css";
import Portada from "../../assets/Portada.png";

const FormLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="lfx-container">
      {/* Imagen a la izquierda */}
      <div className="lfx-img-box">
        <img src={Portada} alt="Portada" className="lfx-img" />
      </div>

      {/* Formulario a la derecha */}
      <form
        className="lfx-form"
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/create-group");
        }}
      >
        <h1 className="lfx-title">Login</h1>

        <p className="lfx-subtitle">
          Not registered yet?{" "}
          <a
            className="lfx-link"
            onClick={() => {
              navigate("/register");
            }}
          >
            Sign up
          </a>
        </p>

        <div className="lfx-group">
          <label htmlFor="email" className="lfx-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="lfx-input"
            placeholder="Enter your email"
          />
        </div>

        <div className="lfx-group">
          <label htmlFor="password" className="lfx-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="lfx-input"
            placeholder="Enter your password"
          />
        </div>

        <div className="lfx-forgot">
          <a className="lfx-forgot-link">
            Forgot your password?
          </a>
        </div>

        <button type="submit" className="lfx-btn">
          Start
        </button>
      </form>
    </div>
  );
};

export default FormLogin;
