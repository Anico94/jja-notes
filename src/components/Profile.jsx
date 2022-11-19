import { auth, logOut } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const Profile = () => {
  const navigate = useNavigate();
  //   const [currentUser, setCurrentUser] = useState();
  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    const res = await logOut();
    if (res) {
      navigate("/login");
    }
  };

  const currentUserInfo = (user) => {
    if (!user) {
      return <p>Loading.......</p>;
    }
    return (
      <div>
        <h1>Welcome Back {user.displayName}!</h1>
        <p>Display Name: {user.displayName}</p>
        <p>
          Email: {user.email} ({user.emailVerified ? "verified" : "unverified"})
        </p>
        <p>Last Logged In: {Date(Date.parse(user.metadata.lastSignInTime))}</p>
        <h3>Edit user info coming soon</h3>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  };

  return <div>{currentUserInfo(user)}</div>;
};
export default Profile;
