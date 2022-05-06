import { Avatar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { User } from "../../../../models";
import { useAppSelector } from "../../../../store/hooks";
import { selectUserDetails } from "../../../../store/reducers/userSlice";

function UserBadge() {
  const theme = useTheme();
  const userDetails: User = useAppSelector(selectUserDetails);
  const getInitials = () => {
    return userDetails.fullName
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
      <Typography
        variant="h6"
        sx={{
          color: theme.palette.primary.contrastText,
        }}
      >
        {getInitials()}
      </Typography>
    </Avatar>
  );
}

export default UserBadge;
