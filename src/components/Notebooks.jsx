import React, { useEffect, useState } from "react";
import "../MainMenu.css";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import BookIcon from "@mui/icons-material/Book";
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
  getDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { IconButton } from "@mui/material";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
// web.cjs is required for IE11 support

const Notebooks = (props) => {
  const [user] = useAuthState(auth);
  const [docs, setDocs] = useState([]);
  const [q, setQ] = useState("");

  const handleClick = (e) => {
    // called when user clicks on the name of the notebooks only.

    props.onClick(
      e.target.offsetParent.attributes.notebookref?.nodeValue,
      e.target.offsetParent.attributes.notebookname?.nodeValue
    );
  };

  const handleClickDiv = (e) => {
    // call when user clicks on either the name of the notebooks or the whitespace around it.

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

  let notebooks = [];
  if (docs) {
    const [docs] = useCollectionData(q);
    notebooks = docs;
  }

  // function to get the notebook name
  const askForNotebookName = () => {
    const name = prompt("What is the name of the notebook?", "Notebook Name");
    return name;
  };

  const _handleAdd = async () => {
    const notebookName = askForNotebookName();
    try {
      await addDoc(collection(db, "notebooks"), {
        title: notebookName ? notebookName : `Notebook ${notebooks.length + 1}`,
        users: [user.uid],
        createdAt: Date.now(),
        modifiedAt: Date.now(),
      }).then(function (docRef) {
        updateDoc(docRef, { ref: docRef.id }); // attaching ref as a field to itself
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

  const _handleEdit = async () => {
    const notebookRef = doc(db, "notebooks", props.selected);
    const notebookTitle = await getDoc(notebookRef);
    const newName = prompt("New Name?", notebookTitle.data().title);
    console.log();
    updateDoc(notebookRef, {
      title: newName,
    }).then(() => {
      props.editNameTime();
      updateAllRelevantPages(newName);
    });
  };

  const updateAllRelevantPages = async (newName) => {
    // Work in progress

    console.log(newName);
  };

  const showBinButton = (notebookRef) => {
    if (notebookRef === props.selected) {
      return (
        <div className="bin-button">
          <IconButton
            color="primary"
            aria-label="edit"
            component="label"
            notebookref={notebookRef}
            onClick={_handleEdit}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
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
      sx={{ width: 240, bgcolor: "background.paper" }}
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
                  notebookref={notebook.ref}
                  notebookname={notebook.title}
                  selected={notebook.ref === props.selected}
                  sx={{ width: 160 }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {notebook.title}
                  </Typography>
                </ListItemButton>
              </div>
              {showBinButton(notebook.ref, notebook.title)}
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
