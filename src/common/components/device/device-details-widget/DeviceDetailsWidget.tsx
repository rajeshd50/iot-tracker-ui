import { Box, Chip, Paper, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

export interface IDeviceDetailsWidgetProps {
  title: string;
  subTitle: string;
  status: "online" | "offline" | "warning";
}

function DeviceDetailsWidget({
  title,
  subTitle,
  status,
}: IDeviceDetailsWidgetProps) {
  const getChip = () => {
    switch (status) {
      case "online":
        return <Chip label="Online" color="primary" variant="outlined" />;
      case "offline":
        return <Chip label="Offline" color="warning" variant="outlined" />;
      case "warning":
        return <Chip label="Warning" color="error" variant="outlined" />;
      default:
        return <Chip label="Online" color="primary" variant="outlined" />;
    }
  };
  return (
    <Paper elevation={0}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 15px",
          borderBottom: `1px solid ${grey[200]}`,
        }}
      >
        <Box>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="subtitle2">{subTitle}</Typography>
        </Box>
        <Box>{getChip()}</Box>
      </Box>
    </Paper>
  );
}

export default DeviceDetailsWidget;
