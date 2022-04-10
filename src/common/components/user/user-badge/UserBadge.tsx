import { Avatar, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import React from "react";
import { selectUserDetails } from "../../../../features/common/reducers/userSlice";
import { User } from "../../../../models";
import { useAppSelector } from "../../../../store/hooks";

function UserBadge() {
  const theme = useTheme();
  const userDetails: User = useAppSelector(selectUserDetails);
  const getInitials = () => {
    return userDetails.name
      .split(" ")
      .map((x) => x.charAt(0))
      .join("")
      .toUpperCase();
  };
  return (
    <Avatar
      sx={{
        backgroundColor: theme.palette.primary.main,
        width: "2.5rem",
        height: "2.5rem",
      }}
      variant="circular"
    >
      <Typography variant="h6">{getInitials()}</Typography>
    </Avatar>
  );
}

export default UserBadge;
