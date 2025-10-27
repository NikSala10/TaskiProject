import { useNavigate } from "react-router";
import "./LoginForm.css";
import Portada from "../../assets/Portada.png";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebaseConfig";

const FormLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/create-group");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };

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
          handleLogin(e);
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
