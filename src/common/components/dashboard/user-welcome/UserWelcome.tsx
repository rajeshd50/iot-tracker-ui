import { Paper, Typography, useTheme, Box } from "@mui/material";
import React from "react";
import { selectUserDetails } from "../../../../features/common/reducers/userSlice";
import { User } from "../../../../models";
import { useAppSelector } from "../../../../store/hooks";
import AppImage from "../../system/AppImage/AppImage";

function UserWelcome() {
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
          <Typography variant="h5">{userDetails.name}</Typography>
        </Box>
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
          <AppImage src="/img/app-dashboard-welcome-image.jpg" alt="Welcome" />
        </Box>
      </Box>
    </Paper>
  );
}

export default UserWelcome;
