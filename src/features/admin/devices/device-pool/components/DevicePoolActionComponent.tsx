import { Box, Button, CircularProgress } from "@mui/material";
import React from "react";

export interface IDevicePoolActionComponentProps {
  onActionClick: () => void;
  loading: boolean;
}

function DevicePoolActionComponent({
  onActionClick,
  loading,
}: IDevicePoolActionComponentProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Button
        startIcon={
          loading ? <CircularProgress color="primary" size="16px" /> : null
        }
        disabled={loading}
        color="primary"
        variant="contained"
        onClick={onActionClick}
      >
        Add new device entry (TEST)
      </Button>
    </Box>
  );
}

export default DevicePoolActionComponent;
