import { auth, logOut, storage } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import SearchAppBar from "./AppBarTest";
import MainMenu from "./Notebooks";
import { useEffect, useState } from "react";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Box, Card, TextField } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

import Paper from "@mui/material/Paper";

import "../Profile.scss";
import { height } from "@mui/system";

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

  const handleChange = (e) => {
    setUserName(e.target.value);
  };

  const _handleClick = () => {
    console.log("imageclick");
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
  console.log(avatarRef);

  useEffect(() => {
    getDownloadURL(avatarRef)
      .then((url) => {
        setAvatar(url);
      })
      .catch((error) => {
        console.log(error);
        setAvatar([
          "https://firebasestorage.googleapis.com/v0/b/jja-notes.appspot.com/o/images%2Favatar%2FavatarDefault.png?alt=media&token=2beea97a-6301-4a96-afed-fc4f69db3b4a",
        ]);
      });
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    width: 600,
    height: 300,
  }));

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
                <Item>
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
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item>
                  <Stack spacing={4}>
                    <p>Name: </p>
                    <input
                      required
                      placeholder={user.displayName}
                      onChange={handleChange}
                    />

                    <p>
                      Email: {user.email} (
                      {user.emailVerified ? "verified" : "unverified"})
                    </p>
                    {/* <input placeholder={user.email} /> */}
                    <Button variant="contained" sx={{}}>
                      upload
                    </Button>
                  </Stack>
                </Item>
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
