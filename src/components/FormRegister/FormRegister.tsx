import { useNavigate } from "react-router";
import "./SignUpForm.css";
import Portada from "../../assets/Portada.png";
import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../services/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); 
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [meetsMinPasswordLength, setMeetsMinPasswordLength] = useState<boolean | undefined>(false);
  const [error, setError] = useState("");

  // Validar longitud mínima de la contraseña
  useEffect(() => {
    setMeetsMinPasswordLength(password.length >= 6)
  }, [password])

  console.log("usuario registrado" + username);
  

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required.");
      return;
    }

    if (!acceptedTerms) {
      setError("You must accept the terms and conditions.");
      return;
    }

    if (!meetsMinPasswordLength) {
      setError("Password does not meet minimum requirements.");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        const avatarUrl = `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${username}`;

        await user.reload();
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          username: username,
          avatar: avatarUrl,
          numPoints: 0,
        });
        await updateProfile(user, { displayName: username }); 
        console.log("Nombre guardado correctamente:", user.displayName);
        navigate("/create-group");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        // ..
      });
  };

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
          handleRegister(e);
         ;
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
            required
            type="text"
            id="username"
            name="username"
            className="suf-input"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>

        <div className="suf-group">
          <label htmlFor="email" className="suf-label">
            Email
          </label>
          <input
            required
            type="email"
            id="email"
            name="email"
            className="suf-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="suf-group">
          <label htmlFor="password" className="suf-label">
            Password
          </label>
          <input
            required
            type="password"
            id="password"
            name="password"
            className="suf-input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {meetsMinPasswordLength ? undefined : <p className="suf-error">Insufficient password</p>}

        <div className="suf-terms">
          <input type="checkbox" id="terms" name="terms" className="suf-checkbox" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)}/>
          <label htmlFor="terms" className="suf-terms-label">
            By entering your information, you agree to our Terms and Privacy Policy. Your data will be kept secure and used only in accordance with these terms.{" "}
          </label>
        </div>
        {error && <p className="suf-error">{error}</p>}
        <button type="submit" className="suf-btn" disabled={!acceptedTerms}
          style={{
            opacity: !acceptedTerms ? 0.6 : 1,
            cursor: !acceptedTerms ? "not-allowed" : "pointer",
          }}>
          Start
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
