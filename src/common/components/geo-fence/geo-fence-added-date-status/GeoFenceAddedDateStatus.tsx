import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { formatDateTime } from "../../../util/util";

export interface IGeoFenceAddedDateStatusProps {
  dateCreated?: string | Date;
  isMobile?: boolean;
}

function GeoFenceAddedDateStatus({
  dateCreated,
  isMobile = false,
}: IGeoFenceAddedDateStatusProps) {
  if (!dateCreated) {
    return null;
  }
  if (dateCreated) {
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
          {formatDateTime(dateCreated)}
        </Typography>
      </Box>
    );
  }
  return null;
}

export default GeoFenceAddedDateStatus;
