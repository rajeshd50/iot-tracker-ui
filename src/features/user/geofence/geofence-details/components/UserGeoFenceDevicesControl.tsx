import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import React, { useCallback, useEffect, useState } from "react";
import DeviceListTable from "../../../../../common/components/device/device-list-table/DeviceListTable";
import { Device, GeoFence } from "../../../../../models";
import CancelIcon from "@mui/icons-material/Cancel";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { useSnackbar } from "notistack";
import {
  DeviceOrderBy,
  DeviceService,
  GeoFenceService,
} from "../../../../../services";
import { OrderByDirection } from "../../../../../services/common";
import UserGeoFenceAddDeviceDialog from "./UserGeoFenceAddDeviceDialog";
import ConfirmDialog from "../../../../../common/components/confirm-dialog/ConfirmDialog";
import UserGeoFenceDeviceInfoCell from "./UserGeoFenceDeviceInfoCell";

export interface IUserGeoFenceDevicesControlProps {
  geoFence: GeoFence;
}

const DEFAULT_PER_PAGE = 5;

function UserGeoFenceDevicesControl({
  geoFence,
}: IUserGeoFenceDevicesControlProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE);
  const [devices, setDevices] = useState<Device[]>([]);
  const [totalDevices, setTotalDevices] = useState(0);
  const [isDeviceLoading, setIsDeviceLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchTextValue, setSearchTextValue] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const [showConnectDeviceDialog, setShowConnectDeviceDialog] = useState(false);
  const [connectDeviceLoading, setConnectDeviceLoading] = useState(false);

  const [showDeviceDisconnectConfirm, setShowDeviceDisconnectConfirm] =
    useState(false);
  const [isDeviceDisconnectLoading, setIsDeviceDisconnectLoading] =
    useState(false);
  const [deviceToDisconnect, setDeviceToDisconnect] = useState<Device | null>(
    null
  );

  const loadDevices = async () => {
    try {
      setIsDeviceLoading(true);
      const devices = await DeviceService.fetch({
        serial: searchText ? searchText : undefined,
        page: currentPage + 1,
        perPage,
        orderBy: DeviceOrderBy.CREATED_AT,
        orderByDirection: OrderByDirection.DESCENDING,
        withGeoFence: geoFence.id,
      });
      setTotalDevices(devices.total);
      setDevices(devices.items);
    } catch (e) {
      enqueueSnackbar("Error while fetching devices", {
        variant: "error",
      });
    } finally {
      setIsDeviceLoading(false);
    }
  };

  const loadDevicesCallback = useCallback(async () => {
    await loadDevices();
  }, [currentPage, perPage, searchText]);

  useEffect(() => {
    loadDevicesCallback();
  }, [currentPage, perPage, searchText, loadDevicesCallback]);

  // device connect functions starts
  const onClickConnectDevice = () => {
    setShowConnectDeviceDialog(true);
  };
  const onCloseConnectDevice = () => {
    setShowConnectDeviceDialog(false);
  };
  const onConnectDevice = async (deviceId: string) => {
    try {
      setConnectDeviceLoading(true);
      await GeoFenceService.addToDevice({
        fenceId: geoFence.id,
        deviceId,
      });
      enqueueSnackbar("Device successfully connected to geo-fence", {
        variant: "success",
      });
      loadDevices();
    } catch (e) {
      enqueueSnackbar("Error while connecting device to geo-fence", {
        variant: "error",
      });
    } finally {
      setConnectDeviceLoading(false);
      onCloseConnectDevice();
    }
  };
  // device connect functions ends

  // device disconnect functions starts
  const onClickRemoveDevice = (device: Device) => {
    setDeviceToDisconnect(device);
    setShowDeviceDisconnectConfirm(true);
  };
  const onCloseDeviceDisconnect = () => {
    setDeviceToDisconnect(null);
    setShowDeviceDisconnectConfirm(false);
  };
  const onDeviceDisconnect = async () => {
    if (!deviceToDisconnect) {
      return;
    }
    try {
      setIsDeviceDisconnectLoading(true);
      await GeoFenceService.removeFromDevice({
        fenceId: geoFence.id,
        deviceId: deviceToDisconnect.id,
      });
      enqueueSnackbar("Device successfully disconnected from geo-fence", {
        variant: "success",
      });
      loadDevices();
    } catch (e) {
      enqueueSnackbar("Error while disconnecting device from geo-fence", {
        variant: "error",
      });
    } finally {
      setIsDeviceDisconnectLoading(false);
      onCloseDeviceDisconnect();
    }
  };
  // device disconnect functions ends

  const getColumns = () => {
    return [
      {
        field: "serial",
        headerName: "Device Info",
        sortable: false,
        flex: 1,
        disableColumnMenu: true,
        renderCell: (params: GridRenderCellParams<Device>) => {
          return <UserGeoFenceDeviceInfoCell device={params.row} />;
        },
      },
      {
        field: "actions",
        type: "actions",
        getActions: (params: GridRowParams<Device>) => [
          <GridActionsCellItem
            icon={
              <Tooltip title="Remove">
                <CancelIcon
                  color="error"
                  sx={{
                    fontSize: "24px",
                  }}
                />
              </Tooltip>
            }
            onClick={() => onClickRemoveDevice(params.row)}
            label="Remove"
          />,
        ],
      },
    ];
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          filter: "drop-shadow(0px 0px 2px rgba(0,0,0,0.32))",
          padding: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Connected Devices</Typography>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={onClickConnectDevice}
          >
            Connect new device
          </Button>
        </Box>
        <Box
          sx={{
            marginTop: "15px",
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={8} md={10} xl={8}>
              <TextField
                value={searchTextValue}
                onChange={(evt) => setSearchTextValue(evt.target.value)}
                label="Search"
                placeholder="Search by serial/name"
                InputProps={{
                  endAdornment: searchTextValue ? (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          setCurrentPage(0);
                          setSearchTextValue("");
                          setSearchText("");
                        }}
                      >
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                }}
              />
            </Grid>
            <Grid item xs={4} md={2} xl={4}>
              <Button
                startIcon={<SearchIcon />}
                variant="contained"
                color="primary"
                disabled={!searchTextValue}
                fullWidth
                sx={{
                  height: "48px",
                }}
                onClick={() => {
                  setCurrentPage(0);
                  setSearchText(searchTextValue);
                }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            marginTop: "15px",
          }}
        >
          <DeviceListTable<Device>
            rows={devices}
            rowHeight={64}
            height="380px"
            columns={getColumns()}
            isLoading={isDeviceLoading}
            page={currentPage}
            perPage={perPage}
            total={totalDevices}
            onPageChange={(newPage) => setCurrentPage(newPage)}
            onPerPageChange={(newPerPage) => setPerPage(newPerPage)}
            noRowText="No devices found"
            imageWidth="200px"
            rowsPerPageOptions={[5, 10]}
          />
        </Box>
      </Paper>
      {showConnectDeviceDialog && (
        <UserGeoFenceAddDeviceDialog
          show={showConnectDeviceDialog}
          onClose={onCloseConnectDevice}
          onDeviceAssign={onConnectDevice}
          geoFence={geoFence}
          loading={connectDeviceLoading}
        />
      )}
      {showDeviceDisconnectConfirm && deviceToDisconnect ? (
        <ConfirmDialog
          title="Confirm to disconnect device from geo-fence"
          subTitle={`Device (serial no: ${deviceToDisconnect.serial}) will be removed from this geo-fence, and you will not receive any further alerts from this device/geo-fence events!`}
          show={showDeviceDisconnectConfirm}
          onCancel={onCloseDeviceDisconnect}
          onConfirm={onDeviceDisconnect}
          isLoading={isDeviceDisconnectLoading}
          confirmColor="error"
          cancelColor="secondary"
          confirmText="Disconnect"
          cancelText="Cancel"
        />
      ) : null}
    </Box>
  );
}

export default UserGeoFenceDevicesControl;
