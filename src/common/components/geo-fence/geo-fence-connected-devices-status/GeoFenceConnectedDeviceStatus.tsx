import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

export interface IGeoFenceConnectedDeviceStatusProps {
  connectedDevices?: string[];
  isMobile?: boolean;
}

function GeoFenceConnectedDeviceStatus({
  connectedDevices,
  isMobile = false,
}: IGeoFenceConnectedDeviceStatusProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          color: grey[600],
          fontSize: isMobile ? "14px" : "initial",
        }}
      >
        Devices connected
      </Typography>
      <Typography
        sx={{
          fontWeight: 500,
          marginLeft: "4px",
          fontSize: isMobile ? "14px" : "initial",
        }}
      >
        {connectedDevices ? connectedDevices.length : "N/A"}
      </Typography>
    </Box>
  );
}

export default GeoFenceConnectedDeviceStatus;
