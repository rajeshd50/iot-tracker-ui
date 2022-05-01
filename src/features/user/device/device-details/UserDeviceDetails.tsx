import { Box, Fab, Typography } from "@mui/material";
import React, { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";

import UserDeviceMap from "./components/UserDeviceMap";
import UserDeviceSidePanel from "./components/UserDeviceSidePanel";
import { Device, DeviceStatus } from "../../../../models/device.model";
import DeviceDetailsWidget from "../../../../common/components/device/device-details-widget/DeviceDetailsWidget";

const deviceDetails: Device = {
  name: "test1",
  serialNumber: "0001",
  model: "tracker",
  id: "1",
  isActive: true,
  details: {
    status: DeviceStatus.online,
  },
};

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
      <Box
        sx={{
          width: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DeviceDetailsWidget device={deviceDetails} />
        <UserDeviceMap />
      </Box>
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
        device={deviceDetails}
      />
    </Box>
  );
}

export default UserDeviceDetails;
