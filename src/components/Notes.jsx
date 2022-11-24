import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Page from "./Page";

const Notes = (props) => {
  return (
    <div className="page-container">
      <Page
        pageSelected={props.pageSelected}
        resetPage={props.resetPage}
        // notebookName={props.notebookName}
        lastEditNameTime={props.lastEditNameTime}
      />
    </div>
  );
};

export default Notes;
