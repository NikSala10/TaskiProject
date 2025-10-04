
import { useNavigate } from "react-router";
import "./LoginForm.css";

const FormLogin = () => {
  const navigate = useNavigate();

  return (
    <form className="login-form" onSubmit={(e) => {e.preventDefault();}}>
      <img src="src/assets/Portada.png" alt="Portada" className="signup-image" />
      <div className="form-group">

      <h1 className="login-title">Login</h1>
      <p className="login-subtitle">
        Not registered yet? <a className="signup-link" onClick={() => {navigate('/register')}}>Sign up</a>
      </p>

        <label htmlFor="email" className="form-label">Email</label>
        <input 
          type="email" id="email" name="email" placeholder="Enter your email" className="form-input"/>
      
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" id="password" name="password" placeholder="Enter your password" className="form-input"
        />

       <div className="forgot-password">
        <a href="/forgot-password" className="forgot-link">Forgot your password?</a>
       </div>

       <button type="submit" className="login-btn" onClick={() => {navigate('/create-group')}}>Start</button>
      </div>

    </form>
  );
};

export default FormLogin;