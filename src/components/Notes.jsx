import React from "react";
import Page from "./Page";

const Notes = (props) => {
  return (
    <div className="page-container">
      <Page
        pageSelected={props.pageSelected}
        resetPage={props.resetPage}
        lastEditNameTime={props.lastEditNameTime}
      />
    </div>
  );
};

export default Notes;
