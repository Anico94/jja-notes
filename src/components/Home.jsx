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
  const [previousNotebookSelected, setPreviousNotebookSelected] = useState("");
  const [pageSelected, setPageSelected] = useState("");

  const handleClick = () => {};

  const notebookOnClickWrapper = (notebookRef) => {
    showPages();
    fetchNotebookRef(notebookRef);
  };

  const showPages = () => {
    if (notebookSelected === "") {
      setOpenPages(false);
    }

    if (notebookSelected === previousNotebookSelected) {
      // console.log("notebookSelected", notebookSelected);
      // console.log("previous selected", previousNotebookSelected);
      setOpenPages(!openPages);
    } else {
      // console.log("notebookSelected", notebookSelected);
      // console.log("previous selected", previousNotebookSelected);
      setPreviousNotebookSelected(notebookSelected);
      // setOpenPages(true);
    }
  };

  const fetchNotebookRef = (notebookRef) => {
    console.log("NotebookRef collected:", notebookRef);
    if (notebookRef === undefined) {
      console.log("abandoning...");
      return;
    }
    console.log("setting", notebookRef);
    setNotebookSelected(notebookRef);
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

  return (
    <div className="home-page">
      <SearchAppBar className="search-app-bar" />
      <div className="main-app">
        <div className="main-menu">
          <Notebooks
            onClick={notebookOnClickWrapper}
            selected={notebookSelected}
            resetNotebook={resetNotebook}
          />
        </div>
        <div className="main-menu" hidden={!openPages}>
          <Pages
            notebookSelected={notebookSelected}
            onClick={fetchPageRef}
            resetPage={resetPage}
          />
        </div>
        <div className="main-app">
          <Notes pageSelected={pageSelected} resetPage={resetPage} />
        </div>
      </div>
    </div>
  );
};

export default Home;
