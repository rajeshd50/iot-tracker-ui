import { Box, Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useCallback, useEffect, useState } from "react";
import UserWelcome from "../../../common/components/dashboard/user-welcome/UserWelcome";
import { DashboardDeviceCount, DashboardUserCount } from "../../../models";
import { DashboardService } from "../../../services";
import AdminDeviceCountWidget from "./components/AdminDeviceCountWidget";
import AdminNewDeviceCountWidget from "./components/AdminNewDeviceCountWidget";
import AdminSupportCountWidget from "./components/AdminSupportCountWidget";
import AdminUserCountWidget from "./components/AdminUserCountWidget";
import AdminDeviceCountChart from "./components/charts/AdminDeviceCountChart";
import AdminDeviceEventsChart from "./components/charts/AdminDeviceEventsChart";

function AdminDashboard() {
  const [totalSupportTickets, setTotalSupportTickets] = useState(0);
  const [deviceCount, setDeviceCount] = useState<DashboardDeviceCount | null>(
    null
  );
  const [userCount, setUserCount] = useState<DashboardUserCount | null>(null);

  const [isDashboardWidgetDataLoading, setIsDashboardWidgetDataLoading] =
    useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const loadDashboardData = async () => {
    try {
      setIsDashboardWidgetDataLoading(true);
      const deviceCountResp = await DashboardService.deviceCount();
      const userCountResp = await DashboardService.userCount();

      setDeviceCount(deviceCountResp);
      setUserCount(userCountResp);
      setTotalSupportTickets(1250);
    } catch (e) {
      enqueueSnackbar("Error while fetching data", {
        variant: "error",
      });
    } finally {
      setIsDashboardWidgetDataLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
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
            value={deviceCount?.total}
            isLoading={isDashboardWidgetDataLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AdminUserCountWidget
            value={userCount?.total}
            isLoading={isDashboardWidgetDataLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AdminNewDeviceCountWidget
            value={deviceCount?.pendingApproval}
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
          <AdminDeviceCountChart
            deviceCount={deviceCount}
            isLoading={isDashboardWidgetDataLoading}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminDashboard;
