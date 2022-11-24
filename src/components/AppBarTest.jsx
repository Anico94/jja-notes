import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logOut } from "../firebase-config";
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import appLogo from "../assets/5.png";
import "../AppBarTest.css";

const Search = styled("div")(({ theme }) => ({
  // Search bar functionality to come - placeholder.

  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const getUser = (user) => {
    let nameInitial = "";
    if (!user) {
      return <PersonIcon />;
    }
    try {
      nameInitial = user.displayName[0].toUpperCase();
    } catch (err) {
      nameInitial = (
        <span role="img" aria-label="thinking">
          🤔
        </span>
      );
    }
    return [nameInitial, user.uid];
  };

  const handleLogout = async () => {
    handleCloseUserMenu();
    const res = await logOut();
    if (res) {
      navigate("/");
    }
  };

  const generateDropdownItems = () => {
    getUser(user);
    if (!user) {
      // If the user is not present/still loading, the following return block will run.
      return <p>Loading...</p>;
    }
    return (
      // This return block will run is the user is loaded.

      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open user options">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar>{getUser(user)[0]}</Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem key="Profile" onClick={handleCloseUserMenu}>
            <Typography
              textAlign="center"
              component={Link}
              to={`/Profile/${getUser(user)[1]}`}
            >
              Profile
            </Typography>
          </MenuItem>
          <MenuItem key="Logout" onClick={handleLogout}>
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{
          backgroundImage: "linear-gradient(to right, darkblue, darkred)",
        }}
      >
        <Toolbar>
          <a href={`/home/${getUser(user)[1]}`}>
            <img src={appLogo} alt="App Logo" className="tiny-thumbnail" />
          </a>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" }, ml: 2 }}
          >
            JJA Notes
          </Typography>
          <Search sx={{ ml: 2, mr: 2 }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          {/* Drop down items will be generated according to user login state. */}
          {generateDropdownItems()}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
