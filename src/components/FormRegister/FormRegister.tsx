import { useNavigate } from "react-router";
import "./SignUpForm.css";

const SignUpForm = () => {
  const navigate = useNavigate();

  return (
    <form  className="signup-form">
     <img src="src/assets/Portada.png" alt="Portada" className="signup-image" />
     

      <div className="form-group">
      <h2 className="signup-title">Sign up</h2>
      <p className="signup-subtitle">
        Already a member? <a href="/login" onClick={() => {navigate('/login')}}>Log in</a>
      </p>
        <label htmlFor="username">User name</label>
        <input type="text" id="username" name="username" placeholder="Enter your username" />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Enter your email" />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Enter your password" />

        <input type="checkbox" id="terms" name="terms" />
        <label htmlFor="terms">
          By entering your information, you agree to our <a href="/terms">Terms</a> and{" "}
          <a href="/privacy">Privacy Policy</a>.
        </label>
      <button type="submit" className="signup-btn" onClick={() => {navigate('/create-group')}}>Start</button>
      </div>

    </form>
  );
};

export default SignUpForm;