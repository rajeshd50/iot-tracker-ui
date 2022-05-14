import { Paper, Typography, useTheme, Box } from "@mui/material";
import React from "react";
import { User } from "../../../../models";
import { useAppSelector } from "../../../../store/hooks";
import { selectUserDetails } from "../../../../store/reducers/userSlice";
import AppImage from "../../system/AppImage/AppImage";

export interface IUserWelcomeProps {
  minimal?: boolean;
}

function UserWelcome({ minimal = false }: IUserWelcomeProps) {
  const theme = useTheme();
  const userDetails: User = useAppSelector(selectUserDetails);
  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: theme.palette.primary.light,
        padding: "15px",
        borderRadius: "8px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "stretch",
        }}
      >
        {minimal ? (
          <>
            <Typography
              variant="h5"
              sx={{
                color: theme.palette.primary.contrastText,
              }}
            >
              Hi {userDetails.firstName}, welcome back!
            </Typography>
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              flexDirection: "column",
              color: theme.palette.primary.contrastText,
            }}
          >
            <Typography variant="h4">Welcome back</Typography>
            <Typography variant="h5">{userDetails.fullName}</Typography>
          </Box>
        )}
        {minimal ? null : (
          <Box
            sx={{
              "& img": {
                width: "18rem",
              },
              display: {
                md: "block",
                sm: "none",
                xs: "none",
              },
            }}
          >
            <AppImage
              src="/img/app-dashboard-welcome-image.jpg"
              alt="Welcome"
            />
          </Box>
        )}
      </Box>
    </Paper>
  );
}

export default UserWelcome;
