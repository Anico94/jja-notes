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
                <Avatar src={imageList[0]} sx={{ width: 100, height: 100 }} />
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
          <img src={imageDisplay} />
          <input
            type="file"
            required
            accept="image/*"
            onChange={handleImgChange}
          />
          {imageList.map((url) => {
            return <img src={url} key={url} />;
          })}
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
