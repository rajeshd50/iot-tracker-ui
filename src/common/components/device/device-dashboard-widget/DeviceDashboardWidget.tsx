import { Box, Button, Chip, Paper, Typography } from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";

export interface IDeviceDashboardWidgetProps {
  title: string;
  subTitle: string;
  link: string;
  status: "online" | "offline" | "warning";
  id: number;
}

function DeviceDashboardWidget({
  title,
  subTitle,
  link,
  status,
}: IDeviceDashboardWidgetProps) {
  const navigate = useNavigate();
  const icons = {
    online: <CheckCircleIcon color="primary" fontSize="large" />,
    offline: <CancelIcon color="warning" fontSize="large" />,
    warning: <ErrorOutlineIcon color="error" fontSize="large" />,
  };
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
  const getButton = () => {
    switch (status) {
      case "online":
        return (
          <Button variant="text" color="primary" onClick={() => navigate(link)}>
            View details
          </Button>
        );
      case "offline":
        return (
          <Button variant="text" color="warning" onClick={() => navigate(link)}>
            View details
          </Button>
        );
      case "warning":
        return (
          <Button variant="text" color="error" onClick={() => navigate(link)}>
            View details
          </Button>
        );
      default:
        return (
          <Button variant="text" color="primary" onClick={() => navigate(link)}>
            View details
          </Button>
        );
    }
  };
  return (
    <Paper
      elevation={0}
      sx={{
        filter: "drop-shadow(0px 0px 2px rgba(0,0,0,0.32))",
        padding: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="subtitle2">{subTitle}</Typography>
        </Box>
        {icons[status]}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {getChip()}
        {getButton()}
      </Box>
    </Paper>
  );
}

export default DeviceDashboardWidget;
