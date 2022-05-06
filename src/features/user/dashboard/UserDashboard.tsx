import { Box, Button, Grid } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSnackbar } from "notistack";

import UserWelcome from "../../../common/components/dashboard/user-welcome/UserWelcome";
import DeviceDashboardWidget from "../../../common/components/device/device-dashboard-widget/DeviceDashboardWidget";
import PageHeader from "../../../common/components/page-header/PageHeader";
import { ROUTES } from "../../../constants";
import {
  Device,
  DeviceAssignStatus,
  DeviceLiveStatus,
  DeviceStatus,
} from "../../../models/device.model";
import { encodeDeviceSerial } from "../../../common/util/util";
import DeviceWidgetSkeleton from "../../../common/components/device/device-widget-skeleton/DeviceWidgetSkeleton";
import { DeviceService } from "../../../services";
import NoDataFallback from "../../../common/components/no-data-fallback/NoDataFallback";

function UserDashboard() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [totalDevices, setTotalDevices] = useState(0);
  const [isDeviceLoading, setIsDeviceLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const loadDevices = async () => {
    try {
      setIsDeviceLoading(true);
      const devicePaginatedResp = await DeviceService.fetch({
        page: 1,
        perPage: 6,
      });
      setDevices(devicePaginatedResp.items || []);
      setTotalDevices(devicePaginatedResp.total);
    } catch (e: any) {
      enqueueSnackbar(e && e.message ? e.message : "Unable to fetch devices", {
        variant: "error",
      });
    } finally {
      setIsDeviceLoading(false);
    }
  };

  useEffect(() => {
    loadDevices();
  }, []);

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
          <PageHeader
            title="Devices"
            ActionComponent={
              totalDevices ? (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(ROUTES.USER.ADD_NEW_DEVICE)}
                    sx={{
                      minWidth: "160px",
                      marginRight: "16px",
                    }}
                    startIcon={<AddCircleIcon />}
                  >
                    Add New Device
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate(ROUTES.USER.DEVICE_LIST)}
                  >
                    View all
                  </Button>
                </Box>
              ) : null
            }
            showBorderBottom
          />
        </Grid>
        {isDeviceLoading ? (
          <>
            <Grid item xs={12} sm={6} md={4}>
              <DeviceWidgetSkeleton />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DeviceWidgetSkeleton />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DeviceWidgetSkeleton />
            </Grid>
          </>
        ) : (
          <>
            {devices.length ? (
              <>
                {devices.map((device) => (
                  <Grid item xs={12} sm={6} md={6} key={device.id}>
                    <DeviceDashboardWidget
                      device={device}
                      link={ROUTES.USER.DEVICE_DETAILS.replace(
                        ":serial",
                        encodeDeviceSerial(device.serial)
                      )}
                    />
                  </Grid>
                ))}
              </>
            ) : (
              <Grid item xs={12}>
                <NoDataFallback
                  title="No devices added yet!"
                  showActionButton
                  actionButtonText="Add new device"
                  buttonProps={{
                    startIcon: <AddCircleIcon />,
                  }}
                  onActionButtonClick={() => {
                    navigate(ROUTES.USER.ADD_NEW_DEVICE);
                  }}
                />
              </Grid>
            )}
          </>
        )}
      </Grid>
    </Box>
  );
}

export default UserDashboard;
