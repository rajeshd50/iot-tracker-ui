import { Chip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { DeviceFirmware } from "../../../../../../models";

export interface IAdminFirmwareVersionCellProps {
  firmware: DeviceFirmware;
}

function AdminFirmwareVersionCell({
  firmware,
}: IAdminFirmwareVersionCellProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Typography variant="h6">{firmware.version}</Typography>
      {firmware.isLatest ? (
        <Chip
          variant="outlined"
          color="success"
          label="Latest"
          size="small"
          sx={{
            marginLeft: "4px",
          }}
        />
      ) : null}
    </Box>
  );
}

export default AdminFirmwareVersionCell;
