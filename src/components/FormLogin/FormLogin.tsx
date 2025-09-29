
import "./LoginForm.css";


const FormLogin = () => {
  return (
    <form className="login-form">
      <div className="form-group-img">
      <img src="src/assets/Portada.png" alt="Portada" className="login-image" />
      </div>

      <div className="form-group">

      <h1 className="login-title">Login</h1>
      <p className="login-subtitle">
        Not registered yet? <a href="/register" className="signup-link">Sign up</a>
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

       <button type="submit" className="login-btn">Start</button>
      </div>

    </form>
  );
};

export default FormLogin;


