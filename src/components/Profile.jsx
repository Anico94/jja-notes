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
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
            <Card sx={{ padding: 4 }}>
              <Stack spacing={4}>
                <Avatar src={avatarURL} sx={{ width: 150, height: 150 }} />
                <p>
                  <span className="profile_title">Name: </span>
                  {user.displayName}
                </p>
                <p>
                  <span className="profile_title">Email: </span>
                  {user.email} ({user.emailVerified ? "verified" : "unverified"}
                  )
                </p>
                <p>
                  <span className="profile_title">Last Logged In: </span>
                  {Date(Date.parse(user.metadata.lastSignInTime))}
                </p>
              </Stack>
            </Card>

            {/* <Link to="/profile/:uid/edit"> */}
            {/* </Link> */}
          </Stack>
        </div>
        <div className="update_button">
          {/* <Stack direction="row" spacing={2}> */}
          <Button
            variant="contained"
            onClick={_handleEdit}
            startIcon={<EditIcon />}
            sx={{ mt: 1.5, mb: 1.5 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            onClick={_handleBack}
            startIcon={<ArrowBackIcon />}
            sx={{ mt: 1.5, mb: 1.5, ml: 1.5 }}
          >
            Back
          </Button>
          {/* </Stack> */}
        </div>
      </div>
    );
  };

  return (
    <div className="home-page">
      <SearchAppBar className="search-app-bar" />
      <div className="profile-page">{currentUserInfo(user)}</div>
    </div>
  );
};
export default Profile;
