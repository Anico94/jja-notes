import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, sendPasswordReset } from "../firebase-config";
import logo from "../assets/1.png";
import thumbnail from "../assets/2.png";
import { Link } from "react-router-dom";

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
      </div>
      <div className="login__container right">
        <div className="login-info">
          <img src={thumbnail} alt="App Thumbnail" className="thumbnail" />
          <h2>Password Reset</h2>
          <p>
            Enter your user account&apos;s verified email address and we will
            send you a password reset link.
          </p>
          <input
            type="text"
            className="login__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <button
            className="login__btn login__google"
            onClick={() => sendPasswordReset(email)}
          >
            Send password reset email
          </button>
          <div>
            Return to <Link to="/">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reset;
