import { Chip } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

export interface IDeviceSerialNumberChipProps {
  serial: string;
}

function DeviceSerialNumberChip({ serial }: IDeviceSerialNumberChipProps) {
  return (
    <Chip
      label={`Serial no: ${serial.toLocaleUpperCase()}`}
      color="default"
      variant="outlined"
      size="medium"
      sx={{
        textTransform: "capitalize",
        borderRadius: "4px",
        borderColor: grey[300],
      }}
    />
  );
}

export default DeviceSerialNumberChip;
