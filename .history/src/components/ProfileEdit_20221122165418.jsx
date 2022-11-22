import { auth, logOut, storage } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import SearchAppBar from "./AppBarTest";
import MainMenu from "./Notebooks";
import { useEffect, useState } from "react";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const ProfileEdit = () => {
  const navigate = useNavigate();
  //   const [currentUser, setCurrentUser] = useState();
  const [user] = useAuthState(auth);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const handleLogout = async () => {
    const res = await logOut();
    console.log(res);
    if (res) {
      navigate("/");
    }
  };

  // image upload
  const uploadImage = () => {
    if (imageUpload === null) return;
    const imageRef = ref(storage, `images/avatar/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      console.log("image upload");
    });
  };

  //image show
  const imageListRef = ref(storage, "images/avatar/");
  useEffect(() => {
    listAll(imageListRef).then((response) => {
      console.log("this is response.item: ", response.items);
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          console.log("this is url: ", url);
          setImageList((prev) => [...prev, url]);
          console.log(imageList);
        });
      });
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
          <p>Display Name: {user.uid}</p>
          <p>
            Email: {user.email} (
            {user.emailVerified ? "verified" : "unverified"})
          </p>
          <p>
            Last Logged In: {Date(Date.parse(user.metadata.lastSignInTime))}
          </p>
          <h3>TODO: add popup that allows 1. edit display name 2. avatar</h3>
        </div>
        <div>
          {imageList.map((url) => {
            return <img src={url} />;
          })}
          <img src="https://firebasestorage.googleapis.com/v0/b/jja-notes.appspot.com/o/images%2Favatar%2Fuser-avatar.pngfc2732c4-4127-45c2-a7a7-4707b965e612?alt=media&token=244bf2b0-6504-4d65-ad4c-3ebd362b5d02" />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImageUpload(e.target.files[0]);
            }}
          />
          <button onClick={uploadImage}>upload image</button>
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
