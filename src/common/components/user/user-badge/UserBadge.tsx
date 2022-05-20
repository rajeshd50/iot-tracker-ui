import { Avatar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { User } from "../../../../models";
import { useAppSelector } from "../../../../store/hooks";
import { selectUserDetails } from "../../../../store/reducers/userSlice";

export interface IUserBadgeProps {
  width?: string;
  height?: string;
  fontVariant?:
    | "button"
    | "caption"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "inherit"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "overline"
    | undefined;
}

function UserBadge(props: IUserBadgeProps) {
  const { width = "2.5rem", height = "2.5rem", fontVariant = "h6" } = props;
  const theme = useTheme();
  const userDetails: User = useAppSelector(selectUserDetails);
  const getInitials = () => {
    return [userDetails.firstName, userDetails.lastName]
      .map((x) => x.charAt(0))
      .join("")
      .toUpperCase();
  };
  return (
    <Avatar
      sx={{
        backgroundColor: theme.palette.primary.main,
        width,
        height,
      }}
      variant="circular"
    >
      <Typography
        variant={fontVariant}
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
