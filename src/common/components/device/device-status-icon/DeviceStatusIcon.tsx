import React from "react";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import { SvgIconProps, Tooltip } from "@mui/material";
import { DeviceStatus } from "../../../../models/device.model";

export interface IDeviceStatusIconProps extends SvgIconProps {
  status: DeviceStatus;
}

function DeviceStatusIcon({ status, ...svgProps }: IDeviceStatusIconProps) {
  switch (status) {
    case DeviceStatus.ACTIVE:
      return (
        <Tooltip title="Active">
          <CheckCircleIcon color="primary" fontSize="large" {...svgProps} />
        </Tooltip>
      );
    case DeviceStatus.INACTIVE:
      return (
        <Tooltip title="Inactive">
          <CancelIcon color="disabled" fontSize="large" {...svgProps} />
        </Tooltip>
      );
    default:
      return (
        <CheckCircleIcon color="disabled" fontSize="large" {...svgProps} />
      );
  }
}

export default DeviceStatusIcon;
