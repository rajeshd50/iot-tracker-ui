import { Button, ButtonProps } from "@mui/material";
import React from "react";
import { DeviceStatus } from "../../../../models/device.model";

export interface IDeviceViewButtonProps extends ButtonProps {
  status: DeviceStatus;
  text?: string;
}
type ButtonColor =
  | "inherit"
  | "warning"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | undefined;
function DeviceViewButton({
  status,
  text = "View Details",
  ...buttonProps
}: IDeviceViewButtonProps) {
  const getButtonColor = (): ButtonColor => {
    switch (status) {
      case DeviceStatus.online:
        return "success";
      case DeviceStatus.offline:
        return "inherit";
      case DeviceStatus.warning:
        return "warning";
      case DeviceStatus.critical:
        return "error";
      default:
        return "inherit";
    }
  };

  return (
    <Button color={getButtonColor()} variant="outlined" {...buttonProps}>
      {text}
    </Button>
  );
}

export default DeviceViewButton;
