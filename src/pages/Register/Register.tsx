import SignUpForm from "../../components/FormRegister/FormRegister";
import "../../components/FormRegister/SignUpForm.css";

const Register = () => {
  return (
    <div className="signup-container">
    <div className="signup-left">
    </div>

      <div className="signup-right">
        <SignUpForm />
      </div>
    </div>
  );
};

export default Register;
