import { alpha, Box, Button, Pagination } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import TablePagination from "@mui/material/TablePagination";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useSnackbar } from "notistack";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import {
  Device,
  DeviceAssignStatus,
  DeviceLiveStatus,
  DeviceStatus,
} from "../../../../models/device.model";
import { grey } from "@mui/material/colors";
import UserDeviceListFilter from "./components/UserDeviceListFilter";
import PageHeader from "../../../../common/components/page-header/PageHeader";
import { ROUTES } from "../../../../constants";
import { useNavigate } from "react-router-dom";
import UserDeviceDetailsCardView from "./components/UserDeviceDetailsCardView";
import UserDeviceDetailsListView from "./components/UserDeviceDetailsListView";
import UserDeviceLoadingSkelton from "./components/UserDeviceLoadingSkelton";
import NoDataFallback from "../../../../common/components/no-data-fallback/NoDataFallback";
import { DeviceService } from "../../../../services";

const DEFAULT_PER_PAGE = 10;

function UserDeviceList() {
  const [page, setPage] = React.useState(1);

  const [devices, setDevices] = useState<Device[]>([]);
  const [totalDevices, setTotalDevices] = useState(0);
  const [isDeviceLoading, setIsDeviceLoading] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [liveStatus, setLiveStatus] = useState<DeviceLiveStatus | string>("");
  const [deviceStatus, setDeviceStatus] = useState<DeviceStatus | string>("");

  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down("sm"));

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const loadDevices = async () => {
    try {
      setIsDeviceLoading(true);
      const devicePaginatedResp = await DeviceService.fetch({
        page,
        perPage: DEFAULT_PER_PAGE,
        searchText: searchText || undefined,
        liveStatus: liveStatus || undefined,
        status: deviceStatus || undefined,
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

  const loadDevicesCallback = useCallback(async () => {
    await loadDevices();
  }, [page, deviceStatus, liveStatus, searchText]);

  useEffect(() => {
    loadDevicesCallback();
  }, [page, deviceStatus, liveStatus, searchText, loadDevicesCallback]);

  const onFilterReset = () => {
    setSearchText("");
    setLiveStatus("");
    setDeviceStatus("");
  };

  const onFilterUpdate = (
    searchText: string | null,
    liveStatus: DeviceLiveStatus | string | null,
    status: DeviceStatus | string | null
  ) => {
    setSearchText(searchText || "");
    setLiveStatus(liveStatus || "");
    setDeviceStatus(status || "");
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const isFilterApplied = () => {
    return !!searchText || !!liveStatus || !!deviceStatus;
  };

  const onDeviceEditClick = (deviceToEdit: Device) => {};
  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
      }}
    >
      <PageHeader
        title="Device"
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
                }}
                startIcon={<AddCircleIcon />}
              >
                Add New Device
              </Button>
            </Box>
          ) : null
        }
      />
      <UserDeviceListFilter
        isLoading={isDeviceLoading}
        onFilterReset={onFilterReset}
        onFilterUpdate={onFilterUpdate}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          padding: "10px",
          backgroundColor: alpha(grey[50], 0.5),
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination
          count={Math.ceil(totalDevices / DEFAULT_PER_PAGE)}
          color="primary"
          showFirstButton
          showLastButton
          page={page}
          onChange={handleChangePage}
        />
      </Box>
      <Box
        sx={{
          marginBottom: "96px",
        }}
      >
        {isDeviceLoading ? (
          <>
            <UserDeviceLoadingSkelton />
            <UserDeviceLoadingSkelton />
            <UserDeviceLoadingSkelton />
          </>
        ) : (
          <>
            {devices.length ? (
              <>
                {devices.map((device) =>
                  matchesXS ? (
                    <UserDeviceDetailsCardView
                      device={device}
                      key={device.id}
                      onClickEdit={onDeviceEditClick}
                    />
                  ) : (
                    <UserDeviceDetailsListView
                      device={device}
                      key={device.id}
                      onClickEdit={onDeviceEditClick}
                    />
                  )
                )}
              </>
            ) : (
              <>
                <NoDataFallback
                  title={
                    isFilterApplied()
                      ? "No device found with selected filters"
                      : "No devices added yet!"
                  }
                  showActionButton={!isFilterApplied()}
                  actionButtonText="Add new device"
                  buttonProps={{
                    startIcon: <AddCircleIcon />,
                  }}
                  onActionButtonClick={() => {
                    navigate(ROUTES.USER.ADD_NEW_DEVICE);
                  }}
                />
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}

export default UserDeviceList;
