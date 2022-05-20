import { Chip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { formatDateTime } from "../../../../../../common/util/util";
import {
  DeviceFirmware,
  DeviceFirmwareSyncStatus,
} from "../../../../../../models";

export interface IAdminFirmwareSyncStatusCellProps {
  firmware: DeviceFirmware;
}

function AdminFirmwareSyncStatusCell({
  firmware,
}: IAdminFirmwareSyncStatusCellProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Chip
        variant="outlined"
        color={
          firmware.syncStatus === DeviceFirmwareSyncStatus.SYNCED
            ? "success"
            : "default"
        }
        label={
          firmware.syncStatus === DeviceFirmwareSyncStatus.SYNCED
            ? "Synced"
            : "Not Synced"
        }
        size="small"
        sx={{
          marginLeft: "4px",
        }}
      />
      {firmware.syncStatus === DeviceFirmwareSyncStatus.SYNCED &&
      firmware.syncAt ? (
        <Typography
          sx={{
            marginLeft: "4px",
          }}
          variant="subtitle2"
        >
          Last sync at {formatDateTime(firmware.syncAt)}
        </Typography>
      ) : null}
    </Box>
  );
}

export default AdminFirmwareSyncStatusCell;
