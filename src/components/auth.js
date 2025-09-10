import { auth, Googleprovider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signin = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error("An error occured during sign in", err);
    }
  };
  const signinWithGoogle = async () => {
    try {
      await signInWithPopup(auth, Googleprovider);
    } catch (err) {
      console.error("An error occured during sign in", err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("An error occured during sign out", err);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signin}>Login</button>
      <button onClick={signinWithGoogle}>SignIN With Google</button>

      <button onClick={logout}>Log Out</button>
    </div>
  );
};

export default Auth;
