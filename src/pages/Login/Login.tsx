
import React from "react";
import LoginForm from "../../components/FormLogin/FormLogin";

const LoginPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí irá la lógica de login
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

export default LoginPage;