import { Box, Fab, Typography } from "@mui/material";
import React, { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";

import UserDeviceMap from "./components/UserDeviceMap";
import UserDeviceSidePanel from "./components/UserDeviceSidePanel";

function UserDeviceDetails() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const onCloseSidePanel = () => {
    setIsMobileOpen(false);
  };
  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        display: "flex",
      }}
    >
      <UserDeviceMap />
      <Fab
        color="primary"
        aria-label="settings"
        variant="extended"
        size="medium"
        sx={{
          position: "absolute",
          top: "1rem",
          right: "0",
          display: {
            xs: "flex",
            sm: "flex",
            md: "none",
          },
        }}
        onClick={() => setIsMobileOpen(true)}
      >
        <SettingsIcon
          sx={{
            marginRight: "4px",
          }}
        />
        <Typography variant="h6">Filters</Typography>
      </Fab>
      <UserDeviceSidePanel
        isMobileOpen={isMobileOpen}
        onClose={onCloseSidePanel}
      />
    </Box>
  );
}

export default UserDeviceDetails;
