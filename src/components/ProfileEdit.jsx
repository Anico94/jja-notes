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

const ProfileEdit = () => {
  const navigate = useNavigate();
  //   const [currentUser, setCurrentUser] = useState();
  const [user] = useAuthState(auth);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageDisplay, setImageDisplay] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [userName, setUserName] = useState(user.displayName);

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
  const uploadImage = () => {
    if (imageUpload === null) return;
    const imageRef = ref(storage, `images/avatar/${user.uid}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      console.log("image has uploaded");
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList([url]);
      });
    });
  };

  //image show
  const imageListRef = ref(storage, `images/avatar/${user.uid}`);
  useEffect(() => {
    getDownloadURL(imageListRef)
      .then((url) => {
        setImageList([url]);
      })
      .catch((error) => {
        console.log(error);
        setImageList([
          "https://firebasestorage.googleapis.com/v0/b/jja-notes.appspot.com/o/images%2Favatar%2FavatarDefault.png?alt=media&token=2beea97a-6301-4a96-afed-fc4f69db3b4a",
        ]);
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
          <Stack spacing={3}>
            <Card sx={{ padding: 10 }}>
              <Stack spacing={4}>
                <div className="avator_frame">
                  <Avatar
                    src={imageDisplay ? imageDisplay : imageList[0]}
                    sx={{ width: 100, height: 100 }}
                    onClick={_handleClick}
                  />
                  <Fab
                    variant="extended"
                    size="small"
                    color="primary"
                    aria-label="upload picture"
                  >
                    <PhotoCamera />
                  </Fab>
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                  >
                    <input hidden accept="image/*" type="file" />
                    <PhotoCamera />
                  </IconButton>
                </div>

                <p>Name: {user.displayName}</p>
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
              </Stack>
            </Card>
          </Stack>
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

          <Button variant="contained" onClick={uploadImage}>
            upload image
          </Button>
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
