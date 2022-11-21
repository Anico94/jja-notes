import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../firebase-config";
import logo from "../assets/1.png";
import thumbnail from "../assets/2.png";

const Signup = () => {
  const [name, setName] = useState("");
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
      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
      const [res, uid] = await signUp(email, password, name);
      if (res) navigate(`/profile/${uid}`);
      if (res.error) seterror(res.error);
    }
  };
  return (
    <div className="login">
      <div className="login__container left">
        <img src={logo} alt="App Logo" className="logo" />
        <h3>This can be the logo of the register page</h3>
      </div>
      <div className="login__container right">
        <div className="login-info">
          <img src={thumbnail} alt="App Thumbnail" className="thumbnail" />
          <h2>Sign Up</h2>
          <div>
            {error ? <div>{error}</div> : null}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                className="login__textBox"
                value={name}
                placeholder="Your Name"
                required
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                name="email"
                className="login__textBox"
                value={email}
                placeholder="Your Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                name="password"
                className="login__textBox"
                value={password}
                placeholder="Your Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                name="passwordConfirmation"
                className="login__textBox"
                value={passwordConfirmation}
                placeholder="Repeat Password"
                required
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
              <button type="submit" className="login__btn login__google">
                Submit
              </button>
            </form>
          </div>
        </div>
        <p>
          already registered? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
