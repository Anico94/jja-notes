import React from "react";
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

const MainMenu = () => {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Note Books
        </ListSubheader>
      }
    >
      <ListItemButton>
        <ListItemIcon>
          <BookIcon />
        </ListItemIcon>
        <ListItemText primary="Note Book 1" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <BookIcon />
        </ListItemIcon>
        <ListItemText primary="Note Book 2" />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <BookIcon />
        </ListItemIcon>
        <ListItemText primary="Note Book 3" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="Page 1" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
};

export default MainMenu;
