import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import {
  formatDateTime,
  getReadableDateDifferenceWithCurrentDate,
} from "../../../util/util";

export interface IDeviceLastSeenStatusProps {
  lastSeenAt?: string | Date;
  isMobile?: boolean;
}

function DeviceLastSeenStatus({
  lastSeenAt,
  isMobile = false,
}: IDeviceLastSeenStatusProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          color: grey[600],
          fontSize: isMobile ? "14px" : "initial",
        }}
      >
        Last seen
      </Typography>
      <Typography
        sx={{
          fontWeight: 500,
          marginLeft: "4px",
          fontSize: isMobile ? "14px" : "initial",
        }}
      >
        {lastSeenAt ? formatDateTime(lastSeenAt) : "N/A"}
      </Typography>
      {lastSeenAt ? (
        <Typography
          sx={{
            fontWeight: 500,
            marginLeft: "4px",
            color: grey[600],
            fontSize: isMobile ? "14px" : "initial",
          }}
        >
          ({getReadableDateDifferenceWithCurrentDate(lastSeenAt)})
        </Typography>
      ) : null}
    </Box>
  );
}

export default DeviceLastSeenStatus;
