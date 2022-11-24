import React, { useState } from "react";
import Notebooks from "./Notebooks";
import Pages from "./Pages";
import SearchAppBar from "./AppBarTest";
import Notes from "./Notes";
import Grow from "@mui/material/Grow";
import "../Home.css";

const Home = () => {
  const [openPages, setOpenPages] = useState(false);
  const [notebookSelected, setNotebookSelected] = useState("");
  const [previousNotebookSelected, setPreviousNotebookSelected] = useState("");
  const [pageSelected, setPageSelected] = useState("");
  const [notebookName, setNotebookName] = useState("");
  const [lastEditNameTime, setLastEditNameTime] = useState(0);

  const notebookOnClickWrapper = (notebookRef, notebookName) => {
    showPages();
    fetchNotebookRef(notebookRef, notebookName);
  };

  const showPages = () => {
    // This function controls the behaviour of opening/closing pages list.

    if (notebookSelected === previousNotebookSelected) {
      setOpenPages(!openPages);
    } else {
      setPreviousNotebookSelected(notebookSelected);
      setOpenPages(true);
    }
  };

  const fetchNotebookRef = (notebookRef, notebookName) => {
    console.log("NotebookRef collected:", notebookRef);
    if (notebookRef === undefined) {
      console.log("abandoning...");
      return;
    }

    if (notebookName === undefined) {
      return;
    }

    console.log("setting", notebookRef);
    setNotebookSelected(notebookRef);
    setNotebookName(notebookName);
  };

  const fetchPageRef = (pageRef) => {
    console.log("PageRef collected:", pageRef);
    setPageSelected(pageRef);
  };

  const resetPage = () => {
    setPageSelected("");
  };
  const resetNotebook = () => {
    setNotebookSelected("");
  };

  const editNameTime = () => {
    console.log("TIme set to: ", Date.now());
    setLastEditNameTime(Date.now());
  };

  const fetchNotebookName = (notebookName) => {
    // Still working on fetching notebook name.
    // setNotebookName(notebookName);
    console.log(notebookName);
  };

  return (
    <div className="home-page">
      <SearchAppBar className="search-app-bar" />
      <div className="main-app">
        <div className="main-menu">
          <Notebooks
            onClick={notebookOnClickWrapper}
            selected={notebookSelected}
            resetNotebook={resetNotebook}
            editNameTime={editNameTime}
            fetchNotebookName={fetchNotebookName}
          />
        </div>
        <Grow in={openPages} style={{ transformOrigin: "0 0 0" }}>
          <div className="main-menu" hidden={!openPages}>
            <Pages
              notebookSelected={notebookSelected}
              notebookName={notebookName}
              onClick={fetchPageRef}
              resetPage={resetPage}
              editNameTime={editNameTime}
            />
          </div>
        </Grow>
        <div className="main-app">
          <Notes
            pageSelected={pageSelected}
            resetPage={resetPage}
            lastEditNameTime={lastEditNameTime}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
