import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../firebase-config";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, seterror] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      seterror("Passwords do not match");
    } else {
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
      const [res, uid] = await signUp(email, password);
      if (res) navigate(`/profile/${uid}`);
      if (res.error) seterror(res.error);
    }
  };
  return (
    <div>
      <h2>Sign Up</h2>
      <div>
        {error ? <div>{error}</div> : null}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Your Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Your Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            name="passwordConfirmation"
            value={passwordConfirmation}
            placeholder="Repeat Password"
            required
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        <p>
          already registered? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
