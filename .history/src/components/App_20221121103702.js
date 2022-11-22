import "../App.css";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import Reset from "./Reset";
import Profile from "./Profile";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase-config";
import SearchAppBar from "./AppBarTest";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  // console.log(process.env.REACT_APP_API_KEY);
  const [user] = useAuthState(auth);

  // const sessionLinks = (user) => {
  //   console.log(user);
  //   if (user) {
  //     return (
  //       <div>
  //         <Link to={`/profile/${user.uid}`}>Profile ({user.displayName})</Link>
  //       </div>
  //     );
  //   }
  //   return (
  //     <div>
  //       <Link to="/signup">Sign Up</Link>
  //       <Link to="/login">Log In</Link>
  //     </div>
  //   );
  // };

  return (
    <Router>
      {/* <nav>{sessionLinks(user)}</nav> */}

      <div>
        <Routes>
          <Route path="/home/:uid" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
          <Route path="/profile/:uid" element={<Profile />} />
          <Route path="/reset" element={<Reset />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
