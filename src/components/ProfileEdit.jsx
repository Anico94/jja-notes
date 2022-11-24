import { auth, storage, changeUserName } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import SearchAppBar from "./AppBarTest";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Box, Card } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import "../Profile.scss";
import Typography from "@mui/material/Typography";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageDisplay, setImageDisplay] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [userName, setUserName] = useState("");

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

  const _handleBack = () => {
    navigate(`/profile/${user?.uid}`);
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
          <h1 className="welcome-back">Welcome Back {user.displayName}!</h1>

          <Box sx={{ width: 800, height: 250, padding: 6 }}>
            <Grid container spacing={2}>
              <Grid item xs={3.5}>
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
                    <Button
                      variant="contained"
                      onClick={uploadImage}
                      startIcon={<SaveIcon />}
                    >
                      Upload Image
                    </Button>
                  </div>
                  <div className="back-button">
                    <Button
                      variant="contained"
                      onClick={_handleBack}
                      startIcon={<ArrowBackIcon />}
                      // sx={{ mt: 1.5, mb: 1.5, ml: 1.5 }}
                    >
                      Back
                    </Button>
                  </div>
                </Stack>
              </Grid>
              <Grid item xs={8}>
                <Box spacing={4}>
                  <form onSubmit={handleFormSubmit}>
                    <Card sx={{ maxWidth: 400, height: 160, padding: 3 }}>
                      <label>
                        <Stack direction="row" spacing={2}>
                          <Typography
                            paragraph
                            noWrap
                            variant="subtitle1"
                            component="div"
                          >
                            Name:
                          </Typography>

                          <input
                            type="text"
                            name="name"
                            className="login__textBox"
                            required
                            onChange={(e) => setUserName(e.target.value)}
                            value={userName}
                            placeholder={user.displayName}
                          />
                        </Stack>
                      </label>
                      <div className="update_button">
                        <Button
                          variant="contained"
                          type="submit"
                          startIcon={<SaveIcon />}
                          sx={{ mt: 3 }}
                        >
                          Update Name
                        </Button>
                      </div>
                    </Card>
                  </form>
                </Box>
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
      <div className="profile-page">{currentUserInfo(user)}</div>
    </div>
  );
};

export default ProfileEdit;
