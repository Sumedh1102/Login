import { signInWithGoogle, signInWithApple, logout } from "../firebase/firebaseConfig";
import { useState } from "react";

const SocialLogin = () => {
  const [user, setUser] = useState(null);

  const handleGoogleLogin = async () => {
    try {
      const loggedInUser = await signInWithGoogle();
      setUser(loggedInUser);
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  const handleAppleLogin = async () => {
    try {
      const loggedInUser = await signInWithApple();
      setUser(loggedInUser);
    } catch (error) {
      console.error("Apple Login Error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="social-login">
      {!user ? (
      <>
      <button className="social-button" onClick={handleGoogleLogin}>
        <img src="google.svg" alt="Google" className="social-icon" />
        Google
      </button>
      <button className="social-button" onClick={handleAppleLogin}>
        <img src="apple.svg" alt="Apple" className="social-icon" />
        Apple
      </button>
      </>
      ) : (
        <>
        <p> Welcome, {user.displayName} </p>
        <button className="social-button" onClick={handleLogout}>
          Logout
        </button>
        </>
      )}
    </div>
  );
};

export default SocialLogin;