import { auth, logOut, storage } from "../firebase-config";
import { useNavigate, Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import SearchAppBar from "./AppBarTest";
import MainMenu from "./Notebooks";
import { useState, useEffect } from "react";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { Card } from "@mui/material";

const Profile = () => {
  const navigate = useNavigate();
  //   const [currentUser, setCurrentUser] = useState();
  const [user] = useAuthState(auth);
  const avatarDeafult =
    "https://firebasestorage.googleapis.com/v0/b/jja-notes.appspot.com/o/images%2Favatar%2FavatarDefault.png?alt=media&token=2beea97a-6301-4a96-afed-fc4f69db3b4a";
  const [avatarURL, setAvatarURL] = useState(avatarDeafult);
  const handleLogout = async () => {
    const res = await logOut();
    console.log(res);
    if (res) {
      navigate("/");
    }
  };

  const uid = window.location.href.split("/")[4];
  const avatarRef = ref(storage, `images/avatar/${uid}`);

  useEffect(() => {
    getDownloadURL(avatarRef)
      .then((url) => {
        console.log("avatarUrl: ", url);
        setAvatarURL(url);
      })
      .catch(() => {
        setAvatarURL(avatarDeafult);
      });
  }, []);

  const _handleBack = () => {
    navigate(`/home/${user.uid}`);
  };

  const _handleEdit = () => {
    navigate(`/profile/${user.uid}/edit`);
  };

  const currentUserInfo = (user) => {
    if (!user) {
      navigate("/");
      return <p>Loading.......</p>;
    }
    return (
      <div>
        <div>
          <h1>Welcome Back {user.displayName}!</h1>
          <Stack spacing={3}>
            <Card sx={{ padding: 10 }}>
              <Stack spacing={4}>
                <Avatar src={avatarURL} sx={{ width: 150, height: 150 }} />
                <p>Name: {user.displayName}</p>
                <p>
                  Email: {user.email} (
                  {user.emailVerified ? "verified" : "unverified"})
                </p>
                <p>
                  Last Logged In:{" "}
                  {Date(Date.parse(user.metadata.lastSignInTime))}
                </p>
              </Stack>
            </Card>

            {/* <Link to="/profile/:uid/edit"> */}
            {/* </Link> */}
          </Stack>
        </div>
        <Button variant="outlined" onClick={_handleEdit}>
          Edit
        </Button>
        <Button variant="outlined" onClick={_handleBack}>
          Back
        </Button>
      </div>
    );
  };

  return (
    <div className="home-page">
      <SearchAppBar className="search-app-bar" />
      <div className="main-app">
        <div className="main-menu">
          <MainMenu />
        </div>
        <div className="main-app">{currentUserInfo(user)}</div>
      </div>
    </div>
  );
};
export default Profile;
