import { Box, Fab, Typography } from "@mui/material";
import React, { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";

import UserDeviceMap from "./components/UserDeviceMap";
import UserDeviceSidePanel from "./components/UserDeviceSidePanel";
import {
  Device,
  DeviceAssignStatus,
  DeviceLiveStatus,
  DeviceStatus,
} from "../../../../models/device.model";
import DeviceDetailsWidget from "../../../../common/components/device/device-details-widget/DeviceDetailsWidget";
import { grey } from "@mui/material/colors";

const deviceDetails: Device = {
  name: "my car",
  serial: "SN-sdsdsd-fdfdf-23dsf-24dsf",
  vehicleName: "car one",
  vehicleNumber: "wb78 23ba 6767",
  id: "1",
  status: DeviceStatus.ACTIVE,
  liveStatus: DeviceLiveStatus.ONLINE,
  assignStatus: DeviceAssignStatus.ASSIGNED,
  approvalRequestedAt: "2022-04-12T08:13:55.512Z",
  approvedAt: "2022-04-12T12:35:55.512Z",
  lastSeenAt: "2022-05-05T08:13:55.512Z",
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
        <Box>
          <DeviceDetailsWidget device={deviceDetails} />
        </Box>
        <UserDeviceMap device={deviceDetails} />
      </Box>
      <Fab
        color="primary"
        aria-label="settings"
        variant="extended"
        size="medium"
        sx={{
          position: "absolute",
          top: "2.7rem",
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
