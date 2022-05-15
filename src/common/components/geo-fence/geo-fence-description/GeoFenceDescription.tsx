import { Box, Tooltip, Typography, TypographyProps } from "@mui/material";
import React from "react";
import { truncateText } from "../../../util/util";

export interface IGeoFenceDescriptionProps {
  description?: string;
  typographyProps?: TypographyProps;
}

function GeoFenceDescription({
  description,
  typographyProps,
}: IGeoFenceDescriptionProps) {
  if (!description) {
    return null;
  }
  return (
    <Tooltip title={description}>
      <Box
        sx={{
          display: "inline-flex",
        }}
      >
        <Typography variant="subtitle2" {...typographyProps}>
          {truncateText(description, 120)}
        </Typography>
      </Box>
    </Tooltip>
  );
}

export default GeoFenceDescription;
