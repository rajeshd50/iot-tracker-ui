import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { User } from "../../../../models";
import { useAppSelector } from "../../../../store/hooks";
import { selectUserDetails } from "../../../../store/reducers/userSlice";
import UserBadge from "./UserBadge";

import styles from "./UserBadgeWithDescription.module.scss";

function UserBadgeWithDescription() {
  const userDetails: User = useAppSelector(selectUserDetails);
  const theme = useTheme();
  if (!userDetails) {
    return null;
  }
  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: theme.palette.primary.contrastText,
        borderRadius: "4px",
        maxHeight: "90px",
      }}
    >
      <Box className={styles.SidePanelUserInfoContainer}>
        <Box mr={1}>
          <UserBadge />
        </Box>
        <Box className={styles.SidePanelUserInfoDescription}>
          <Typography variant="h6">{userDetails.fullName}</Typography>
          <Typography variant="subtitle1">{userDetails.role}</Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default UserBadgeWithDescription;
