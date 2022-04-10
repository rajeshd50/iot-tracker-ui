import { Chip, ChipProps } from "@mui/material";
import React from "react";
import { DeviceStatus } from "../../../../models/device.model";

export interface IDeviceStatusChipProps {
  status: DeviceStatus;
  chipProps?: ChipProps;
}
type ChipColor =
  | "warning"
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | undefined;
function DeviceStatusChip({ status, chipProps }: IDeviceStatusChipProps) {
  const getChipColor = (): ChipColor => {
    switch (status) {
      case DeviceStatus.online:
        return "success";
      case DeviceStatus.offline:
        return "default";
      case DeviceStatus.warning:
        return "warning";
      case DeviceStatus.critical:
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Chip
      label={status}
      color={getChipColor()}
      variant="outlined"
      size="small"
      {...chipProps}
      sx={{
        textTransform: "capitalize",
      }}
    />
  );
}

export default DeviceStatusChip;
