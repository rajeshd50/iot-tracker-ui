import React from "react";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";

import { SvgIconProps } from "@mui/material";
import { DeviceStatus } from "../../../../models/device.model";

export interface IDeviceStatusIconProps extends SvgIconProps {
  status: DeviceStatus;
}

function DeviceStatusIcon({ status, ...svgProps }: IDeviceStatusIconProps) {
  switch (status) {
    case DeviceStatus.online:
      return <CheckCircleIcon color="primary" fontSize="large" {...svgProps} />;
    case DeviceStatus.offline:
      return <CancelIcon color="disabled" fontSize="large" {...svgProps} />;
    case DeviceStatus.warning:
      return (
        <ReportGmailerrorredIcon
          color="warning"
          fontSize="large"
          {...svgProps}
        />
      );
    case DeviceStatus.critical:
      return <ErrorOutlineIcon color="error" fontSize="large" {...svgProps} />;
    default:
      return (
        <CheckCircleIcon color="disabled" fontSize="large" {...svgProps} />
      );
  }
}

export default DeviceStatusIcon;
