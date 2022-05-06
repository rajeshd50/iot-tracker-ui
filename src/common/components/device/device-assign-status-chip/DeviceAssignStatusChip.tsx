import { Chip } from "@mui/material";
import React from "react";
import { DeviceAssignStatus } from "../../../../models";

export interface IDeviceAssignStatusChipProps {
  status: DeviceAssignStatus;
}

function DeviceAssignStatusChip({ status }: IDeviceAssignStatusChipProps) {
  if (status !== DeviceAssignStatus.PENDING_APPROVAL) {
    return null;
  }
  return (
    <Chip
      label="Pending approval"
      color="warning"
      variant="outlined"
      size="small"
      sx={{
        textTransform: "capitalize",
        marginLeft: "4px",
      }}
    />
  );
}

export default DeviceAssignStatusChip;
