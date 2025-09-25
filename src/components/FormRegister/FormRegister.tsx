import React from "react";
import "./SignUpForm.css";

interface SignUpFormProps {
  onSubmit?: (e: React.FormEvent) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="signup-form">
     <img src="src/assets/Portada.png" alt="Portada" className="signup-image" />
      <h2 className="signup-title">Sign up</h2>
      <p className="signup-subtitle">
        Already a member? <a href="/login">Log in</a>
      </p>

      <div className="form-group">
        <label htmlFor="username">User name</label>
        <input type="text" id="username" name="username" placeholder="Enter your username" />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Enter your email" />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Enter your password" />
      </div>

      <div className="terms">
        <input type="checkbox" id="terms" name="terms" />
        <label htmlFor="terms">
          By entering your information, you agree to our <a href="/terms">Terms</a> and{" "}
          <a href="/privacy">Privacy Policy</a>.
        </label>
      </div>

      <button type="submit" className="signup-btn">Start</button>
    </form>
  );
};

export default SignUpForm;