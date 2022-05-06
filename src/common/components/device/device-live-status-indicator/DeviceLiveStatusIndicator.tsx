import { Chip, ChipProps, SvgIconProps, Tooltip } from "@mui/material";
import React from "react";
import CloudDoneOutlinedIcon from "@mui/icons-material/CloudDoneOutlined";
import CloudOffOutlinedIcon from "@mui/icons-material/CloudOffOutlined";
import { DeviceLiveStatus } from "../../../../models";

export interface IDeviceLiveStatusProps {
  type: "chip" | "icon";
  status: DeviceLiveStatus;
  svgProps?: SvgIconProps;
  chipProps?: ChipProps;
}

interface IDeviceLiveStatusIndicatorIconProps extends SvgIconProps {
  status: DeviceLiveStatus;
}

function DeviceLiveStatusIndicatorIcon(
  props: IDeviceLiveStatusIndicatorIconProps
) {
  const { status, ...restProps } = props;

  if (status === DeviceLiveStatus.ONLINE) {
    return (
      <Tooltip title="Online">
        <CloudDoneOutlinedIcon
          color="success"
          fontSize="large"
          {...restProps}
        />
      </Tooltip>
    );
  }
  return (
    <Tooltip title="Offline">
      <CloudOffOutlinedIcon color="error" fontSize="large" {...restProps} />
    </Tooltip>
  );
}

interface IDeviceLiveStatusIndicatorChipProps extends ChipProps {
  status: DeviceLiveStatus;
}

function DeviceLiveStatusIndicatorChip(
  props: IDeviceLiveStatusIndicatorChipProps
) {
  const { status, ...restProps } = props;

  if (status === DeviceLiveStatus.ONLINE) {
    return (
      <Chip
        label="Online"
        color="success"
        variant="outlined"
        size="small"
        {...restProps}
      />
    );
  }
  return (
    <Chip
      label="Offline"
      color="error"
      variant="outlined"
      size="small"
      {...restProps}
    />
  );
}

function DeviceLiveStatusIndicator(props: IDeviceLiveStatusProps) {
  const { type, status, svgProps, chipProps } = props;
  return type === "chip" ? (
    <DeviceLiveStatusIndicatorChip status={status} {...chipProps} />
  ) : (
    <DeviceLiveStatusIndicatorIcon status={status} {...svgProps} />
  );
}

export default DeviceLiveStatusIndicator;
