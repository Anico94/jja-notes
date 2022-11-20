import React, { useEffect } from "react";
import "../MainMenu.css";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import BookIcon from "@mui/icons-material/Book";
import DescriptionIcon from "@mui/icons-material/Description";
import { auth, db } from "../firebase-config";
import { query, collection, getDocs, where, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { IconButton } from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import Button from "@mui/material/Button";

const Notebooks = (props) => {
  const [open, setOpen] = React.useState(true);
  const [user] = useAuthState(auth);

  const handleClick = () => {
    props.onClick();
  };
  // const q = collection(db, `users`);
  // const [docs, loading, error] = useCollectionData(q);
  // docs.map((doc) => {
  //   console.log(doc.documentId);
  // });

  // const fetchNotebooks = async () => {
  //   try {
  //     // const q = query(collection(db, "users"), where("uid", "==", user?.uid));
  //     // const doc = await getDocs(q);
  //     // const data = doc.docs.data();
  //     const usersRef = collection(db, "users");
  //     const usersSnap = await getDoc(usersRef);
  //     const [docs, loading, error] = useCollectionData(q);
  //     // const userDocument = q.document();
  //     // const documentID = userDocument.documentID;
  //     console.log(docs.snapshotChanges());
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   fetchNotebooks();
  // }, [user]);

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          <div className="menu-actions">
            <ListItemIcon>
              <BookIcon />
            </ListItemIcon>
            Notebooks
            <Button variant="contained" endIcon={<LibraryAddIcon />}>
              Add
            </Button>
          </div>
        </ListSubheader>
      }
    >
      {/* TODO: move icons to a higher level */}
      <ListItemButton onClick={handleClick}>
        <ListItemText primary="Notebook 1" />
      </ListItemButton>

      <ListItemButton>
        <ListItemText primary="Note Book 2" />
      </ListItemButton>

      <ListItemButton onClick={handleClick}>
        <ListItemText primary="Note Book 3" />
        {/* {open ? <ExpandLess /> : <ExpandMore />} */}
      </ListItemButton>

      {/* <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="Page 1" />
          </ListItemButton>
        </List>
      </Collapse> */}
    </List>
  );
};

export default Notebooks;
