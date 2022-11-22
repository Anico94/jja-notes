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
} from "firebase/firestore";

const Pages = (props) => {
  const [open, setOpen] = useState(true);
  const [user] = useAuthState(auth);
  const [q, setQ] = useState("");
  const [docs, setDocs] = useState([]);

  const handleClick = () => {
    // setOpen(!open);
    console.log("clicked on page");
  };

  const fetchPages = async () => {
    try {
      const pageQuery = query(
        collection(db, "notebooks", props.notebookSelected, "pages")
      );
      setQ(pageQuery);
      const doc = await getDocs(pageQuery);
      console.log(doc);
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

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          <div className="menu-actions">
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            Pages
            <Button variant="contained" endIcon={<LibraryAddIcon />}>
              Add
            </Button>
          </div>
        </ListSubheader>
      }
    >
      {pages?.length > 0
        ? pages.map((page) => {
            return (
              <ListItemButton
                key={page.ref}
                onClick={handleClick}
                pageref={page.ref}
                // selected={notebook.ref === props.selected}
              >
                <ListItemText primary={page.title} />
              </ListItemButton>
            );
          })
        : "Click ADD to add page"}
    </List>
  );
};

export default Pages;
