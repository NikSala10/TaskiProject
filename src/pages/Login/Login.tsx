
import React from "react";
import LoginForm from "../../components/FormLogin/FormLogin";

const Login: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Login submitted");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <LoginForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Login;