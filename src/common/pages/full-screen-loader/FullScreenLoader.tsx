import React from "react";
import { Box, CircularProgress } from "@mui/material";

import styles from "./FullScreenLoader.module.scss";

function FullScreenLoader() {
  return (
    <Box className={styles.FullScreenLoader}>
      <CircularProgress color="primary" size="2rem" />
    </Box>
  );
}

export default FullScreenLoader;
