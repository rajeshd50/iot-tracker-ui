import { Box, Chip, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Device, DeviceAssignStatus } from "../../../../models/device.model";
import DeviceStatusChip from "../device-status-chip/DeviceStatusChip";
import DeviceViewButton from "../device-view-button/DeviceViewButton";
import DeviceStatusIcon from "../device-status-icon/DeviceStatusIcon";
import DeviceLiveStatusIndicator from "../device-live-status-indicator/DeviceLiveStatusIndicator";
import DeviceAssignStatusChip from "../device-assign-status-chip/DeviceAssignStatusChip";

export interface IDeviceDashboardWidgetProps {
  device: Device;
  link: string;
}

function DeviceDashboardWidget({ device, link }: IDeviceDashboardWidgetProps) {
  const navigate = useNavigate();
  const deviceShortInfo = [device.name, device.vehicleName]
    .filter((n) => !!n)
    .join(", ");
  return (
    <Paper
      elevation={0}
      sx={{
        filter: "drop-shadow(0px 0px 2px rgba(0,0,0,0.32))",
        padding: "16px",
        minHeight: "120px",
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {deviceShortInfo ? (
              <Typography
                variant="h6"
                sx={{
                  marginRight: "4px",
                }}
              >
                {deviceShortInfo}
              </Typography>
            ) : null}
            {device.vehicleNumber ? (
              <>
                <Typography
                  variant="subtitle2"
                  sx={{
                    textTransform: "uppercase",
                  }}
                >
                  ( {device.vehicleNumber} )
                </Typography>
              </>
            ) : null}
          </Box>
          <Typography
            variant="subtitle2"
            sx={{
              textTransform: "uppercase",
            }}
          >
            {device.serial}
          </Typography>
        </Box>
        {/* <DeviceStatusIcon status={device.status} /> */}
        <DeviceLiveStatusIndicator status={device.liveStatus} type="icon" />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <DeviceStatusChip status={device.status} />
          {device.assignStatus === DeviceAssignStatus.PENDING_APPROVAL ? (
            <DeviceAssignStatusChip status={device.assignStatus} />
          ) : null}
        </Box>
        <DeviceViewButton
          status={device.status}
          onClick={() => navigate(link)}
          variant="text"
          size="small"
        />
      </Box>
    </Paper>
  );
}

export default DeviceDashboardWidget;
