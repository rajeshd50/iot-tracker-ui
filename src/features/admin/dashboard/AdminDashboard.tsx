import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserWelcome from "../../../common/components/dashboard/user-welcome/UserWelcome";
import AdminDeviceCountWidget from "./components/AdminDeviceCountWidget";
import AdminNewDeviceCountWidget from "./components/AdminNewDeviceCountWidget";
import AdminSupportCountWidget from "./components/AdminSupportCountWidget";
import AdminUserCountWidget from "./components/AdminUserCountWidget";
import AdminDeviceCountChart from "./components/charts/AdminDeviceCountChart";
import AdminDeviceEventsChart from "./components/charts/AdminDeviceEventsChart";

function AdminDashboard() {
  const [totalDevices, setTotalDevices] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalNewDevices, setTotalNewDevices] = useState(0);
  const [totalSupportTickets, setTotalSupportTickets] = useState(0);

  const [isDashboardWidgetDataLoading, setIsDashboardWidgetDataLoading] =
    useState(true);

  useEffect(() => {
    setTimeout(() => {
      setTotalDevices(12562);
      setTotalUsers(8596);
      setTotalNewDevices(560);
      setTotalSupportTickets(1452);
      setIsDashboardWidgetDataLoading(false);
    }, 2000);
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
      }}
    >
      <UserWelcome minimal />
      <Grid container mt={1} mb={1} spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <AdminDeviceCountWidget
            value={totalDevices}
            isLoading={isDashboardWidgetDataLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AdminUserCountWidget
            value={totalUsers}
            isLoading={isDashboardWidgetDataLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AdminNewDeviceCountWidget
            value={totalNewDevices}
            isLoading={isDashboardWidgetDataLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AdminSupportCountWidget
            value={totalSupportTickets}
            isLoading={isDashboardWidgetDataLoading}
          />
        </Grid>
      </Grid>
      <Grid container mt={1} mb={1} spacing={2}>
        <Grid item xs={12} sm={12} md={9}>
          <AdminDeviceEventsChart />
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <AdminDeviceCountChart />
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminDashboard;
