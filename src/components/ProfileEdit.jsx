import { auth, logOut, storage, changeUserName } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import SearchAppBar from "./AppBarTest";
import MainMenu from "./Notebooks";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Box, Card, TextField } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import "../Profile.scss";
import { async } from "@firebase/util";

const ProfileEdit = () => {
  const navigate = useNavigate();
  //   const [currentUser, setCurrentUser] = useState();
  const [user] = useAuthState(auth);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageDisplay, setImageDisplay] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [userName, setUserName] = useState("");

  const handleLogout = async () => {
    const res = await logOut();
    console.log(res);
    if (res) {
      navigate("/");
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    await changeUserName(userName);
    navigate(`/profile/${user.uid}`);
  };
  //upload button click the input
  const _handleClick = () => {
    const imgInput = document.getElementById("imgInput");
    imgInput.click();
  };
  // image upload
  const handleImgChange = (e) => {
    setImageUpload(e.target.files[0]);
    setImageDisplay(URL.createObjectURL(e.target.files[0]));
  };

  const uid = window.location.href.split("/")[4];
  const uploadImage = () => {
    if (imageUpload === null) return;
    const imageRef = ref(storage, `images/avatar/${uid}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      console.log("image has uploaded");
      getDownloadURL(snapshot.ref).then((url) => {
        setAvatar(url);
      });
    });
  };

  //image show
  const avatarRef = ref(storage, `images/avatar/${uid}`);

  useEffect(() => {
    getDownloadURL(avatarRef)
      .then((url) => {
        setAvatar(url);
      })
      .catch((error) => {
        console.log(error);
        setAvatar(
          "https://firebasestorage.googleapis.com/v0/b/jja-notes.appspot.com/o/images%2Favatar%2FavatarDefault.png?alt=media&token=2beea97a-6301-4a96-afed-fc4f69db3b4a"
        );
      });
  }, []);

  const currentUserInfo = (user) => {
    if (!user) {
      navigate("/");
      return <p>Loading.......</p>;
    }

    return (
      <div>
        <div>
          <h1>Welcome Back {user.displayName}!</h1>

          <Box sx={{ width: 800, height: 250, padding: 8 }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Stack spacing={3}>
                  <div className="avatar_frame">
                    <div className="avatar_edit">
                      <Avatar
                        src={imageDisplay ? imageDisplay : avatar}
                        sx={{ width: 150, height: 150 }}
                      />
                    </div>
                    <div className="edit_button">
                      <Fab
                        variant="extended"
                        size="small"
                        color="primary"
                        aria-label="upload picture"
                        onClick={_handleClick}
                      >
                        <PhotoCamera />
                      </Fab>
                    </div>
                  </div>
                  <div className="avatar_upload">
                    <Button variant="contained" onClick={uploadImage}>
                      upload image
                    </Button>
                  </div>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack spacing={4}>
                  <p>Name: </p>
                  <form onSubmit={handleFormSubmit}>
                    <input
                      type="text"
                      name="name"
                      required
                      onChange={(e) => setUserName(e.target.value)}
                      value={userName}
                      placeholder={user.displayName}
                    />
                    <Button variant="contained" type="submit">
                      update
                    </Button>
                  </form>
                  {/* <p>
                      Email: {user.email} (
                      {user.emailVerified ? "verified" : "unverified"})
                    </p> */}
                  {/* <input placeholder={user.email} /> */}
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </div>

        <div>
          <input
            hidden
            id="imgInput"
            type="file"
            required
            accept="image/*"
            onChange={handleImgChange}
          />
        </div>
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

export default ProfileEdit;
