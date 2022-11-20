import React, { useEffect, useState } from "react";
import { auth, signIn, signInWithGoogle } from "../firebase-config";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import "../Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [loadingMessage, setLoadingMessage] = useState("");
  //   const [logInError, setLogInError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      //   setLoadingMessage("Loading.......");
      return;
    }
    if (user) navigate(`/home/${user.uid}`);
    console.log(user, loading, error);
  }, [user, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    await signIn(email, password);
    // if (res[0]) {
    //     navigate(`/profile/${res[1].uid}`);
    // }
    // if (res.error) setLogInError(res.error);
  };

  return (
    <div className="login">
      <div className="login__container">
        <h2>Log In</h2>
        {/* {error ? <div>{error}</div> : null} */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            className="login__textBox"
            value={email}
            placeholder="Enter e-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            className="login__textBox"
            value={password}
            placeholder="Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value="Log In" className="login__btn" />
        </form>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
        <Link to="/reset">Forgot Password</Link>
        <div>
          Don&apos;t have an account? <Link to="/signup">Sign up</Link> now.
        </div>
      </div>
    </div>
  );
};
export default Login;
