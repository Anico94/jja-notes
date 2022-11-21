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

  const notebookOnClickWrapper = (notebookRef) => {
    showPages();
    fetchNotebookRef(notebookRef);
  };

  const showPages = () => {
    setOpenPages(!openPages);
  };

  const fetchNotebookRef = (notebookRef) => {
    console.log(notebookRef);
    setNotebookSelected(notebookRef);
  };

  return (
    <div className="home-page">
      <SearchAppBar className="search-app-bar" />
      <div className="main-app">
        <div className="main-menu">
          <Notebooks onClick={notebookOnClickWrapper} />
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
