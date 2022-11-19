import "../App.css";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Register from "./Register";
import Reset from "./Reset";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  // console.log(process.env.REACT_APP_API_KEY);
  // const [user] = useAuthState(auth);

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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
