import { Box, Typography } from "@mui/material";
import React from "react";
import { Device } from "../../../../../models";

export interface IUserGeoFenceDeviceInfoCellProps {
  device: Device;
}

function UserGeoFenceDeviceInfoCell({
  device,
}: IUserGeoFenceDeviceInfoCellProps) {
  return (
    <Box>
      <Typography>{device.serial}</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle1">{device.name}</Typography>
        {device.vehicleNumber ? (
          <Typography
            variant="subtitle2"
            sx={{
              marginLeft: "4px",
            }}
          >
            ({device.vehicleNumber})
          </Typography>
        ) : null}
      </Box>
    </Box>
  );
}

export default UserGeoFenceDeviceInfoCell;
