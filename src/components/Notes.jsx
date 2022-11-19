import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const Notes = () => {
  return (
    <div className="notes-container">
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
    </div>
  );
};

export default Notes;
