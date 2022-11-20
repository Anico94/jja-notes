import React, { useState } from "react";
import Notebooks from "./Notebooks";
import Pages from "./Pages";
import StatusBar from "./StatusBar";
import SearchAppBar from "./AppBarTest";
import Notes from "./Notes";
import "../Home.css";

const Home = () => {
  const [open, setOpen] = useState(true);
  const [openPages, setOpenPages] = useState(false);
  const [notebookSelected, setNotebookSelected] = useState("");

  const handleClick = () => {
    setOpen(!open);
  };

  const showPages = () => {
    setOpenPages(!openPages);
  };

  return (
    <div className="home-page">
      <SearchAppBar className="search-app-bar" />
      <div className="main-app">
        <div className="main-menu">
          <Notebooks onClick={showPages} />
        </div>
        <div className="main-menu" hidden={!openPages}>
          <Pages />
        </div>
        <div className="main-app">
          <Notes />
        </div>
      </div>
    </div>
  );
};

export default Home;
