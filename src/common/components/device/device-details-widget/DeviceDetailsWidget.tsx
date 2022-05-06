import { Box, Paper, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { Device } from "../../../../models/device.model";
import DeviceLiveStatusIndicator from "../device-live-status-indicator/DeviceLiveStatusIndicator";
import DeviceSerialNumberChip from "../device-serial-number-chip/DeviceSerialNumberChip";
import DeviceStatusChip from "../device-status-chip/DeviceStatusChip";

export interface IDeviceDetailsWidgetProps {
  device: Device;
  isMobile?: boolean;
}

function DeviceDetailsWidget({
  device,
  isMobile = false,
}: IDeviceDetailsWidgetProps) {
  const deviceName = [device.name, device.vehicleName]
    .filter((x) => !!x)
    .join(", ");
  return (
    <Paper elevation={0}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          padding: "0 0 15px 0",
          paddingRight: {
            xs: "0px",
            sm: "0px",
            md: "15px",
            lg: "15px",
          },
          borderBottom: `1px solid ${grey[200]}`,
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">{deviceName || "Untitled"}</Typography>
            {device.vehicleNumber ? (
              <Typography
                variant="subtitle2"
                sx={{
                  textTransform: "uppercase",
                  marginLeft: "8px",
                  marginTop: "4px",
                }}
              >
                ({device.vehicleNumber})
              </Typography>
            ) : null}
          </Box>
          <DeviceSerialNumberChip serial={device.serial} />
        </Box>
        {!isMobile ? (
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <DeviceStatusChip status={device.status} />
              <Box
                sx={{
                  marginLeft: "8px",
                }}
              >
                <DeviceLiveStatusIndicator
                  status={device.liveStatus}
                  type="chip"
                />
              </Box>
            </Box>
          </Box>
        ) : null}
      </Box>
    </Paper>
  );
}

export default DeviceDetailsWidget;
