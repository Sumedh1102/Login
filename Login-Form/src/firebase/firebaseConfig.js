// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  OAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut 
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNJbszAnc7FhMxGNGdho18twjItrynWLM",
  authDomain: "ai-resume-screener-45dc1.firebaseapp.com",
  projectId: "ai-resume-screener-45dc1",
  storageBucket: "ai-resume-screener-45dc1.appspot.com",
  messagingSenderId: "891650288963",
  appId: "1:891650288963:web:0337d38e2be8c92e3553f6",
  measurementId: "G-JKYCWE4Q2B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // console.log("User Info:", result.user);
      return result.user;
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        console.log("User closed the popup");
      } else {
        console.error("Error during sign-in:", error);
      }
      return null;
    }
  };
  
  // Apple Sign-In
const appleProvider = new OAuthProvider("apple.com");
export const signInWithApple = async () => {
  try {
    const result = await signInWithPopup(auth, appleProvider);
    return result.user;
  } catch (error) {
    console.error("Apple Sign-In Error:", error);
    return null;
  }
};

// Email/Password Authentication
export const registerWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      console.error("This email is already in use. Try logging in instead.");
    } else {
      console.error("Registration Error:", error.message);
    }
    return null;
  }
};

export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Email login error:", error);
    return null;
  }
};

  // Logout Function
  export const logout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

export {auth};