import { useState } from "react";
import SocialLogin from "./components/SocialLogin";
import InputField from "./components/InputField";
import { loginWithEmail, registerWithEmail } from "./firebase/firebaseConfig";


const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isRegistering) {
        await registerWithEmail(email, password);
        alert("Account Created Successfully!");
      } else {
        await loginWithEmail(email, password);
        alert("Login Successful!");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h2 className="form-title">Log in with</h2>
      <SocialLogin />

      <p className="separator"><span>or</span></p>

      <form onSubmit={handleSubmit} className="login-form">
        <InputField type="email" placeholder="Email address" icon="mail" onChange={(e) => setEmail(e.target.value)} value={email} />
        <InputField type="password" placeholder="Password" icon="lock" onChange={(e) => setPassword(e.target.value)} value={password} />

        <a href="#" className="forgot-password-link">Forgot password?</a>
        <button type="submit" className="login-button">
          {isRegistering ? "Sign Up" : "Log In"} 
          </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <p className="signup-prompt">
          {isRegistering ? "Already have an account?" : "Don't have an account?"}
        <button onClick={() => setIsRegistering(!isRegistering)} className="toggle-auth-mode">
          {isRegistering ? "Log In" : "Sign Up"}
        </button>
      </p>
    </div>
  )
}

export default App;
