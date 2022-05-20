import {
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Device, DeviceFirmware } from "../../../../../models";
import SyncIcon from "@mui/icons-material/Sync";
import { grey } from "@mui/material/colors";
import { DeviceOrderBy, DeviceService } from "../../../../../services";
import { OrderByDirection } from "../../../../../services/common";
import { useSnackbar } from "notistack";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import AdminDeviceUserCell from "../../device-list/components/AdminDeviceUserCell";
import AdminDeviceStatusCell from "../../device-list/components/AdminDeviceStatusCell";
import { Box } from "@mui/system";
import DeviceListTable from "../../../../../common/components/device/device-list-table/DeviceListTable";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { globalDialogClose } from "../../../../../common/util/util";

export interface IAdminFirmwareSyncSelectedProps {
  show: boolean;
  onClose: () => void;
  onSync: (devices: string[]) => void;
  isLoading: boolean;
  firmware: DeviceFirmware;
}

const columns: GridColDef[] = [
  {
    field: "serial",
    headerName: "Serial",
    sortable: false,
    width: 250,
    disableColumnMenu: true,
  },
  {
    field: "firmwareVersion",
    headerName: "Firmware Version",
    sortable: false,
    width: 150,
    disableColumnMenu: true,
  },
  {
    field: "status",
    headerName: "Status",
    sortable: false,
    flex: 1,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams<Device>) => {
      return <AdminDeviceStatusCell device={params.row} />;
    },
  },
];

function AdminFirmwareSyncSelected(props: IAdminFirmwareSyncSelectedProps) {
  const { show, onClose, onSync, isLoading, firmware } = props;
  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchTextValue, setSearchTextValue] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  const loadDevices = async () => {
    try {
      setIsSearchLoading(true);
      const devices = await DeviceService.fetch({
        page: currentPage + 1,
        perPage,
        orderBy: DeviceOrderBy.CREATED_AT,
        orderByDirection: OrderByDirection.DESCENDING,
        searchText: searchText || undefined,
      });
      setTotal(devices.total);
      setDevices(devices.items);
    } catch (e) {
      enqueueSnackbar("Error while fetching devices", {
        variant: "error",
      });
    } finally {
      setIsSearchLoading(false);
    }
  };

  const loadDevicesCallback = useCallback(async () => {
    await loadDevices();
  }, [currentPage, perPage, searchText]);

  useEffect(() => {
    loadDevicesCallback();
  }, [currentPage, perPage, searchText, loadDevicesCallback]);

  const onSelectDevice = (device: Device) => {
    setSelectedDevices([...selectedDevices, device]);
  };

  const onRemoveDevice = (device: Device) => {
    const updatedDevices = selectedDevices.filter(
      (dev) => dev.id !== device.id
    );
    setSelectedDevices(updatedDevices);
  };

  const getColumns = () => {
    return [
      ...columns,
      {
        field: "selectDevice",
        headerName: "Action",
        sortable: false,
        width: 100,
        disableColumnMenu: true,
        renderCell: (params: GridRenderCellParams<Device>) => {
          const isDeviceSelected = selectedDevices.find(
            (device) => device.id === params.row.id
          );
          if (isDeviceSelected) {
            return (
              <Button
                variant="outlined"
                color="error"
                onClick={() => onRemoveDevice(params.row)}
              >
                Remove
              </Button>
            );
          }
          return (
            <Button
              variant="contained"
              color="primary"
              onClick={() => onSelectDevice(params.row)}
            >
              Select
            </Button>
          );
        },
      },
    ];
  };

  return (
    <Dialog
      open={show}
      maxWidth="md"
      onClose={globalDialogClose(onClose)}
      fullWidth
      disableEscapeKeyDown
    >
      <DialogTitle
        sx={{ fontSize: "1.5rem", borderBottom: `1px solid ${grey[200]}` }}
      >
        Select devices to sync with firmware ({firmware.version})
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            marginTop: "15px",
            width: "100%",
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={8} lg={10}>
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
                <Grid item xs={4} lg={2}>
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
            </Grid>
            <Grid item xs={12}>
              <DeviceListTable<Device>
                rows={devices}
                rowHeight={48}
                height="351px"
                columns={getColumns()}
                isLoading={isSearchLoading}
                page={currentPage}
                perPage={perPage}
                total={total}
                onPageChange={(newPage) => setCurrentPage(newPage)}
                onPerPageChange={(newPerPage) => setPerPage(newPerPage)}
                rowsPerPageOptions={[5]}
              />
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  width: "100%",
                  maxHeight: "150px",
                }}
              >
                {selectedDevices.map((device) => (
                  <Chip
                    label={device.serial}
                    onDelete={() => onRemoveDevice(device)}
                    variant="outlined"
                    color="success"
                    sx={{
                      marginRight: "4px",
                      marginBottom: "4px",
                    }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          color="secondary"
          autoFocus
          disabled={isLoading}
          onClick={onClose}
        >
          Close
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={isLoading || !selectedDevices.length}
          startIcon={
            isLoading ? <CircularProgress size="16px" /> : <SyncIcon />
          }
          onClick={() => {
            onSync(selectedDevices.map((device) => device.id));
          }}
        >
          Sync
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AdminFirmwareSyncSelected;
