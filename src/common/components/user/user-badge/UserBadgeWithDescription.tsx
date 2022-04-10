import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { selectUserDetails } from "../../../../features/common/reducers/userSlice";
import { User } from "../../../../models";
import { useAppSelector } from "../../../../store/hooks";
import UserBadge from "./UserBadge";

import styles from "./UserBadgeWithDescription.module.scss";

function UserBadgeWithDescription() {
  const userDetails: User = useAppSelector(selectUserDetails);
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
          <Typography variant="h6">{userDetails.name}</Typography>
          <Typography variant="subtitle1">{userDetails.role}</Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default UserBadgeWithDescription;
