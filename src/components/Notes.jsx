import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Page from "./Page";

const Notes = () => {
  return (
    <div>
      <Page />
    </div>
  );
};

export default Notes;

{
  /* <div className="notes-container">
      <div className="temp-box">
        <Box sx={{ width: 600 }}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
      </div>
      <div className="temp-box">
        <Box sx={{ width: 600 }}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
      </div>
      <div className="temp-box">
        <Box sx={{ width: 600 }}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
      </div>
      <div className="temp-box">
        <Box sx={{ width: 600 }}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
      </div>
    </div> */
}
