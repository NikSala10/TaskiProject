import React from "react";
import SignUpForm from "../../components/FormRegister";
import "./SignUpPage.css";

const SignUpPage: React.FC = () => {
  return (
    <div className="signup-container">
    <div className="signup-left">
      <img src="src/assets/Portada.png" alt="Portada" className="signup-image" />
    </div>

      <div className="signup-right">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
