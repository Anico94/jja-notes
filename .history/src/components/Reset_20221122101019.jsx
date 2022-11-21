import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, sendPasswordReset } from "../firebase-config";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <div className="login">
      <div className="login__container left">
        <img src={logo} alt="App Logo" className="logo" />
        <h3>This can be the logo of the reset page</h3>
      </div>
      <div className="login__container right">
        <div className="login-info">
          <img src={thumbnail} alt="App Thumbnail" className="thumbnail" />
          <h2>Password Reset</h2>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <button onClick={() => sendPasswordReset(email)}>
            Send password reset email
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reset;
