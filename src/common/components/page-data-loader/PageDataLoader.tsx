import { Box, CircularProgress } from "@mui/material";
import React from "react";

function PageDataLoader() {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "calc(100vh - 150px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="primary" size="3rem" />
    </Box>
  );
}

export default PageDataLoader;
