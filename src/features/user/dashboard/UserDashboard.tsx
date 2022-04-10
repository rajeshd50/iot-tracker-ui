import { Box, Button, Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { useNavigate } from "react-router-dom";
import UserWelcome from "../../../common/components/dashboard/user-welcome/UserWelcome";
import DeviceDashboardWidget, {
  IDeviceDashboardWidgetProps,
} from "../../../common/components/device/device-dashboard-widget/DeviceDashboardWidget";
import { ROUTES } from "../../../constants";

const devices: IDeviceDashboardWidgetProps[] = [
  {
    title: "Device One",
    subTitle: "truck1",
    id: 1,
    link: `${ROUTES.USER.DEVICE_DETAILS.replace(":id", "1")}`,
    status: "online",
  },
  {
    title: "Device Two",
    subTitle: "truck2",
    id: 2,
    link: `${ROUTES.USER.DEVICE_DETAILS.replace(":id", "2")}`,
    status: "offline",
  },
  {
    title: "Device Three",
    subTitle: "truck3",
    id: 3,
    link: `${ROUTES.USER.DEVICE_DETAILS.replace(":id", "3")}`,
    status: "online",
  },
  {
    title: "Device Four",
    subTitle: "truck4",
    id: 4,
    link: `${ROUTES.USER.DEVICE_DETAILS.replace(":id", "4")}`,
    status: "warning",
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
        {devices.map((device) => (
          <Grid item xs={6} sm={4} key={device.id}>
            <DeviceDashboardWidget {...device} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default UserDashboard;
