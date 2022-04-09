import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import UserBadge from "./UserBadge";

import styles from "./UserBadgeWithDescription.module.scss";

function UserBadgeWithDescription() {
  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: "rgba(0,0,0,0.08)",
        borderRadius: "4px",
      }}
    >
      <Box className={styles.SidePanelUserInfoContainer}>
        <Box mr={1}>
          <UserBadge />
        </Box>
        <Box className={styles.SidePanelUserInfoDescription}>
          <Typography variant="h6">Rajesh Dan</Typography>
          <Typography variant="subtitle1">admin</Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default UserBadgeWithDescription;
