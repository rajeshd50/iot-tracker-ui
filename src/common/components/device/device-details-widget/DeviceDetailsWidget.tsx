import { Box, Paper, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { Device } from "../../../../models/device.model";
import DeviceStatusChip from "../device-status-chip/DeviceStatusChip";

export interface IDeviceDetailsWidgetProps {
  device: Device;
}

function DeviceDetailsWidget({ device }: IDeviceDetailsWidgetProps) {
  return (
    <Paper elevation={0}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 15px",
          borderBottom: `1px solid ${grey[200]}`,
        }}
      >
        <Box>
          <Typography variant="h6">{device.name}</Typography>
          <Typography variant="subtitle2">{device.serialNumber}</Typography>
        </Box>
        <Box>
          <DeviceStatusChip status={device.details.status} />
        </Box>
      </Box>
    </Paper>
  );
}

export default DeviceDetailsWidget;
