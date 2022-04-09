import { Avatar, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import React from "react";

function UserBadge() {
  const theme = useTheme();
  return (
    <Avatar
      sx={{
        backgroundColor: theme.palette.primary.main,
        width: "2.5rem",
        height: "2.5rem",
      }}
      variant="circular"
    >
      <Typography variant="h5">RD</Typography>
    </Avatar>
  );
}

export default UserBadge;
