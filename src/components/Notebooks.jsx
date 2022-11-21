import React, { useEffect, useState } from "react";
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
import {
  query,
  collection,
  getDocs,
  where,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { IconButton } from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import Button from "@mui/material/Button";

const Notebooks = (props) => {
  const [open, setOpen] = useState(true);
  const [user] = useAuthState(auth);
  const [notebookRefs, setNotebookRefs] = useState([]);
  const [docs, setDocs] = useState([]);
  // const [notebooks, setNotebooks] = useState([]);
  const [q, setQ] = useState("");

  const handleClick = (e) => {
    console.log(e.target.offsetParent.attributes.notebookref);
    props.onClick(e.target.offsetParent.attributes.notebookref);
  };

  const fetchNotebooks = async () => {
    try {
      const notebookQuery = query(
        collection(db, "notebooks"),
        where("users", "array-contains", user?.uid)
      );
      setQ(notebookQuery);
      const doc = await getDocs(notebookQuery);
      setDocs(doc.docs);
    } catch (err) {
      console.log("still working");
    }
  };
  useEffect(() => {
    fetchNotebooks();
  }, [user]);

  // useEffect(() => {
  let notebooks = [];
  if (docs) {
    const [docs, loading, error] = useCollectionData(q);
    notebooks = docs;
  }
  // }, []);

  const _handleAdd = async () => {
    console.log("ADD CLICKED");
    try {
      const docRef = await addDoc(collection(db, "notebooks"), {
        title: "New Notebook",
        users: [user.uid],
      }).then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        updateDoc(docRef, { ref: docRef.id });
      });
    } catch (err) {
      console.log(err);
    }
  };

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
            <Button
              variant="contained"
              endIcon={<LibraryAddIcon />}
              onClick={_handleAdd}
            >
              Add
            </Button>
          </div>
        </ListSubheader>
      }
    >
      {notebooks?.length > 0
        ? notebooks.map((notebook) => {
            return (
              <ListItemButton
                key={notebook.ref}
                onClick={handleClick}
                notebookref={notebook.ref}
              >
                <ListItemText primary={notebook.title} />
              </ListItemButton>
            );
          })
        : "Click ADD to add notebook"}
    </List>
  );
};

export default Notebooks;
