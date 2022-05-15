import { Chip, ChipProps } from "@mui/material";
import React from "react";
import { GeoFenceStatus } from "../../../../models";

export interface IGeoFenceActiveStatusChipProps {
  isActive: boolean;
  chipProps?: ChipProps;
}
type ChipColor =
  | "warning"
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | undefined;
function GeoFenceActiveStatusChip({
  isActive,
  chipProps,
}: IGeoFenceActiveStatusChipProps) {
  const getChipColor = (): ChipColor => {
    return isActive ? "success" : "warning";
  };

  return (
    <Chip
      label={isActive ? "active" : "inactive"}
      color={getChipColor()}
      variant="outlined"
      size="small"
      {...chipProps}
      sx={{
        textTransform: "capitalize",
      }}
    />
  );
}

export default GeoFenceActiveStatusChip;
