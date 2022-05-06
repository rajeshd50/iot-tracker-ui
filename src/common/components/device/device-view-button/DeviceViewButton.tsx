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
      case DeviceStatus.ACTIVE:
        return "success";
      case DeviceStatus.INACTIVE:
        return "inherit";
      default:
        return "inherit";
    }
  };

  return (
    <Button
      color={getButtonColor()}
      disabled={status === DeviceStatus.INACTIVE}
      variant="outlined"
      {...buttonProps}
    >
      {text}
    </Button>
  );
}

export default DeviceViewButton;
