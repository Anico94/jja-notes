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
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { IconButton } from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import Button from "@mui/material/Button";
import firebase from "firebase/compat/app";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Typography from "@mui/material/Typography";
// web.cjs is required for IE11 support

const Notebooks = (props) => {
  const [open, setOpen] = useState(true);
  const [user] = useAuthState(auth);
  const [notebookRefs, setNotebookRefs] = useState([]);
  const [docs, setDocs] = useState([]);
  // const [notebooks, setNotebooks] = useState([]);
  const [q, setQ] = useState("");

  const handleClick = (e) => {
    // console.log(e.target);
    props.onClick(
      e.target.offsetParent.attributes.notebookref?.nodeValue,
      e.target.offsetParent.attributes.notebookname?.nodeValue
    );
  };

  const handleClickDiv = (e) => {
    // console.log(e.target);
    props.onClick(
      e.target.attributes.notebookref?.nodeValue,
      e.target.attributes.notebookname?.nodeValue
    );
  };

  const fetchNotebooks = async () => {
    try {
      const notebookQuery = query(
        collection(db, "notebooks"),
        where("users", "array-contains", user?.uid)
      );
      setQ(notebookQuery);
      const document = await getDocs(notebookQuery);
      setDocs(document.docs);
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

  //function to get the notbook name
  const askForNotebookName = () => {
    const name = prompt("What is the name of the notebook?", "Notebook Name");
    return name;
  };

  const _handleAdd = async () => {
    const notebookName = askForNotebookName();
    try {
      const docRef = await addDoc(collection(db, "notebooks"), {
        title: notebookName ? notebookName : `Notebook ${notebooks.length + 1}`,
        users: [user.uid],
        createdAt: Date.now(),
        modifiedAt: Date.now(),
      }).then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        updateDoc(docRef, { ref: docRef.id });
      });
    } catch (err) {
      console.log(err);
    }
  };

  const _handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this notebook?")) {
      deleteDoc(doc(db, "notebooks", props.selected));
      props.resetNotebook();
    }
  };

  const showBinButton = (notebookRef) => {
    if (notebookRef === props.selected) {
      return (
        <div className="bin-button">
          <IconButton
            color="primary"
            aria-label="delete"
            component="label"
            notebookref={notebookRef}
            onClick={_handleDelete}
          >
            <DeleteForeverIcon />
          </IconButton>
        </div>
      );
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
            <BookIcon />
            Notebooks
            <IconButton
              color="primary"
              aria-label="add"
              component="label"
              onClick={_handleAdd}
            >
              <LibraryAddIcon />
            </IconButton>
          </div>
        </ListSubheader>
      }
    >
      {notebooks?.length > 0 ? (
        notebooks.map((notebook) => {
          return (
            <div key={notebook.ref} className="notebook-line-items">
              <div onClick={handleClickDiv} className="notebook-titles">
                <ListItemButton
                  onClick={handleClick}
                  // key={notebook.ref}
                  notebookref={notebook.ref}
                  notebookname={notebook.title}
                  selected={notebook.ref === props.selected}
                >
                  <ListItemText primary={notebook.title} />
                </ListItemButton>
              </div>
              {showBinButton(notebook.ref)}
            </div>
          );
        })
      ) : (
        <div className="instructional-messages">
          <Typography variant="h6">Click + to add.</Typography>
        </div>
      )}
    </List>
  );
};

export default Notebooks;
