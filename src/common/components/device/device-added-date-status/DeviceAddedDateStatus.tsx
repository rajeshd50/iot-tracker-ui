import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { formatDateTime } from "../../../util/util";

export interface IDeviceAddedDateStatusProps {
  approvalRequestedAt?: string | Date;
  approvedAt?: string | Date;
  isMobile?: boolean;
}

function DeviceAddedDateStatus({
  approvalRequestedAt,
  approvedAt,
  isMobile = false,
}: IDeviceAddedDateStatusProps) {
  if (!approvalRequestedAt && !approvedAt) {
    return null;
  }
  if (approvedAt) {
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
          Date added
        </Typography>
        <Typography
          sx={{
            fontWeight: 500,
            marginLeft: "4px",
            fontSize: isMobile ? "14px" : "initial",
          }}
        >
          {formatDateTime(approvedAt)}
        </Typography>
      </Box>
    );
  }
  if (approvalRequestedAt) {
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
          Approval requested
        </Typography>
        <Typography
          sx={{
            fontWeight: 500,
            marginLeft: "4px",
            fontSize: isMobile ? "14px" : "initial",
          }}
        >
          {formatDateTime(approvalRequestedAt)}
        </Typography>
      </Box>
    );
  }
  return null;
}

export default DeviceAddedDateStatus;
