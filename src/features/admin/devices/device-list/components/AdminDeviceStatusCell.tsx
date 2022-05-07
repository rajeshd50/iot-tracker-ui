import { Box } from "@mui/material";
import React from "react";
import DeviceAssignStatusChip from "../../../../../common/components/device/device-assign-status-chip/DeviceAssignStatusChip";
import DeviceLiveStatusIndicator from "../../../../../common/components/device/device-live-status-indicator/DeviceLiveStatusIndicator";
import DeviceStatusChip from "../../../../../common/components/device/device-status-chip/DeviceStatusChip";
import {
  Device,
  DeviceAssignStatus,
  DeviceStatus,
} from "../../../../../models";

export interface IAdminDeviceStatusCellProps {
  device: Device;
}

function AdminDeviceStatusCell({ device }: IAdminDeviceStatusCellProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Box>
        <DeviceStatusChip status={device.status} />
      </Box>
      <Box>
        <DeviceAssignStatusChip status={device.assignStatus} />
      </Box>
      {device.status === DeviceStatus.ACTIVE &&
      device.assignStatus === DeviceAssignStatus.ASSIGNED ? (
        <Box
          sx={{
            marginLeft: "4px",
          }}
        >
          <DeviceLiveStatusIndicator type="chip" status={device.liveStatus} />
        </Box>
      ) : null}
    </Box>
  );
}

export default AdminDeviceStatusCell;
