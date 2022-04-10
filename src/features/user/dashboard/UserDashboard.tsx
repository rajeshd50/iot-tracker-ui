import { Box, Button, Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { useNavigate } from "react-router-dom";
import UserWelcome from "../../../common/components/dashboard/user-welcome/UserWelcome";
import DeviceDashboardWidget, {
  IDeviceDashboardWidgetProps,
} from "../../../common/components/device/device-dashboard-widget/DeviceDashboardWidget";
import { ROUTES } from "../../../constants";
import { Device, DeviceStatus } from "../../../models/device.model";

const deviceList: Device[] = [
  {
    name: "test1",
    serialNumber: "0001",
    model: "tracker",
    _id: "1",
    isActive: true,
    details: {
      status: DeviceStatus.online,
    },
  },
  {
    name: "test2",
    serialNumber: "0002",
    model: "tracker",
    _id: "2",
    isActive: true,
    details: {
      status: DeviceStatus.critical,
    },
  },
  {
    name: "test3",
    serialNumber: "0003",
    model: "tracker",
    _id: "3",
    isActive: true,
    details: {
      status: DeviceStatus.online,
    },
  },
  {
    name: "test4",
    serialNumber: "0004",
    model: "tracker",
    _id: "4",
    isActive: true,
    details: {
      status: DeviceStatus.warning,
    },
  },
  {
    name: "test5",
    serialNumber: "0005",
    model: "tracker",
    _id: "5",
    isActive: false,
    details: {
      status: DeviceStatus.online,
    },
  },
  {
    name: "test6",
    serialNumber: "0006",
    model: "tracker",
    _id: "6",
    isActive: true,
    details: {
      status: DeviceStatus.offline,
    },
  },
];

function UserDashboard() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <UserWelcome />
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: `1px solid ${grey[400]}`,
              paddingBottom: "16px",
            }}
          >
            <Typography variant="h5">Devices</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(ROUTES.USER.DEVICE_LIST)}
            >
              View all
            </Button>
          </Box>
        </Grid>
        {deviceList.map((device) => (
          <Grid item xs={12} sm={6} md={4} key={device._id}>
            <DeviceDashboardWidget
              device={device}
              link={ROUTES.USER.DEVICE_DETAILS.replace(":id", device._id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default UserDashboard;
