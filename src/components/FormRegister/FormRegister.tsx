import { useNavigate } from "react-router";
import "./SignUpForm.css";
import Portada from "../../assets/Portada.png";

const SignUpForm = () => {
  const navigate = useNavigate();

  return (
    <div className="suf-container">
      {/* Imagen a la izquierda */}
      <div className="suf-img-box">
        <img src={Portada} alt="Portada" className="suf-img" />
      </div>

      {/* Contenido a la derecha */}
      <form
        className="suf-form"
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/create-group");
        }}
      >
        <h2 className="suf-title">Sign up</h2>
        <p className="suf-subtitle">
          Already a member?{" "}
          <a
            className="suf-link"
            onClick={() => {
              navigate("/login");
            }}
          >
            Log in
          </a>
        </p>

        <div className="suf-group">
          <label htmlFor="username" className="suf-label">
            User name
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="suf-input"
            placeholder="Enter your username"
          />
        </div>

        <div className="suf-group">
          <label htmlFor="email" className="suf-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="suf-input"
            placeholder="Enter your email"
          />
        </div>

        <div className="suf-group">
          <label htmlFor="password" className="suf-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="suf-input"
            placeholder="Enter your password"
          />
        </div>

        <div className="suf-terms">
          <input type="checkbox" id="terms" name="terms" className="suf-checkbox" />
          <label htmlFor="terms" className="suf-terms-label">
            By entering your information, you agree to our Terms and Privacy Policy. Your data will be kept secure and used only in accordance with these terms.{" "}
          </label>
        </div>

        <button type="submit" className="suf-btn">
          Start
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
