import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Device } from "../../../../models/device.model";
import DeviceStatusChip from "../device-status-chip/DeviceStatusChip";
import DeviceViewButton from "../device-view-button/DeviceViewButton";
import DeviceStatusIcon from "../device-status-icon/DeviceStatusIcon";

export interface IDeviceDashboardWidgetProps {
  device: Device;
  link: string;
}

function DeviceDashboardWidget({ device, link }: IDeviceDashboardWidgetProps) {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={0}
      sx={{
        filter: "drop-shadow(0px 0px 2px rgba(0,0,0,0.32))",
        padding: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h6">{device.name}</Typography>
          <Typography variant="subtitle2">{device.serialNumber}</Typography>
        </Box>
        <DeviceStatusIcon status={device.details.status} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <DeviceStatusChip status={device.details.status} />
        <DeviceViewButton
          status={device.details.status}
          onClick={() => navigate(link)}
          variant="text"
          size="small"
        />
      </Box>
    </Paper>
  );
}

export default DeviceDashboardWidget;
