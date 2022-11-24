import "../App.css";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import Reset from "./Reset";
import Profile from "./Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfileEdit from "./ProfileEdit";

function App() {
  // App function is only responsible for routing.

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/home/:uid" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
          <Route path="/profile/:uid" element={<Profile />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/profile/:uid/edit" element={<ProfileEdit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
