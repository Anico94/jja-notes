import React, { useState, useEffect } from "react";
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
import { dividerClasses, IconButton } from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import Button from "@mui/material/Button";
import { auth, db } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  query,
  collection,
  getDocs,
  where,
  addDoc,
  updateDoc,
  orderBy,
  getDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import firebase from "firebase/compat/app";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Typography from "@mui/material/Typography";

const Pages = (props) => {
  const [open, setOpen] = useState(true);
  const [user] = useAuthState(auth);
  const [q, setQ] = useState("");
  const [docs, setDocs] = useState([]);
  const [pageSelected, setPageSelected] = useState("");

  const handleClick = (e) => {
    const ref = e.target.offsetParent.attributes.pageref?.nodeValue;
    if (ref) {
      props.onClick(ref);
      setPageSelected(ref);
    }
  };

  const handleClickDiv = (e) => {
    const ref = e.target.attributes.pageref?.nodeValue;
    if (ref) {
      props.onClick(e.target.attributes.pageref?.nodeValue);
      setPageSelected(e.target.attributes.pageref?.nodeValue);
    }
  };

  const fetchPages = async () => {
    // console.log("Fetching pages with new ref:", props.notebookSelected);
    try {
      const pageQuery = query(
        collection(db, "pages"),
        where("notebookRef", "==", props.notebookSelected)
      );
      setQ(pageQuery);
      const doc = await getDocs(pageQuery);
      // console.log("docs from Pages:", doc.docs);
      setDocs(doc.docs);
    } catch (err) {
      console.log("still working");
    }
  };
  useEffect(() => {
    fetchPages();
  }, [props.notebookSelected]);

  // useEffect(() => {
  let pages = [];
  if (docs) {
    const [docs, loading, error] = useCollectionData(q);
    pages = docs;
  }
  // }, []);

  const askForPageName = () => {
    const name = prompt("What is the name of the page?", "Page Name");
    console.log(name);
    return name;
  };

  const _handleAdd = async () => {
    console.log("ADD PAGE CLICKED");
    // run a function to get the name of the page
    const pageName = askForPageName();
    try {
      const docRef = await addDoc(collection(db, "pages"), {
        title: pageName ? pageName : `Page ${pages.length + 1}`,
        notebookRef: props.notebookSelected,
        notebookName: props.notebookName,
        users: [user.uid],
        content: "<h1>Title<h1>",
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

  // -----------------

  const _handleEdit = async () => {
    const pageRef = doc(db, "pages", props.pageSelected);
    const pageTitle = await getDoc(pageRef);
    console.log();
    updateDoc(pageRef, {
      title: prompt("New Name?", pageTitle.data().title),
    });
  };

  // --------------------

  const _deletePage = () => {
    if (confirm("Are you sure you want to delete this page?")) {
      const pageRef = doc(db, "pages", pageSelected);
      deleteDoc(pageRef);
      props.resetPage();
    }
  };

  const showBinButton = (pageRef) => {
    if (pageRef === pageSelected) {
      return (
        <div className="bin-button">
          <IconButton
            color="primary"
            aria-label="delete"
            component="label"
            pageref={pageRef}
            onClick={_deletePage}
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
            <DescriptionIcon />
            Pages
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
      {pages?.length > 0 ? (
        pages.map((page) => {
          return (
            <div key={page.ref} className="page-line-items">
              <div onClick={handleClickDiv} className="page-titles">
                <ListItemButton
                  key={page.ref}
                  onClick={handleClick}
                  pageref={page.ref}
                  selected={page.ref === pageSelected}
                  sx={{ width: 200 }}
                >
                  <Typography
                    variant="h6"
                    sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
                  >
                    {page.title}
                  </Typography>
                </ListItemButton>
              </div>
              {showBinButton(page.ref)}
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

export default Pages;
