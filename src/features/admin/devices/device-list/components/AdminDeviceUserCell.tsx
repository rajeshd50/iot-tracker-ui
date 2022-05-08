import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Device } from "../../../../../models";

export interface IAdminDeviceUserCellProps {
  device: Device;
}

function AdminDeviceUserCell({ device }: IAdminDeviceUserCellProps) {
  if (!device.user) {
    return null;
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography>{device.user?.email}</Typography>
      </Box>
    </>
  );
}

export default AdminDeviceUserCell;
