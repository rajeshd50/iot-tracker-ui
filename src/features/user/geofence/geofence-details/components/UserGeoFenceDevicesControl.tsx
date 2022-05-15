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
  GridRowParams,
} from "@mui/x-data-grid";
import React, { useState } from "react";
import DeviceListTable from "../../../../../common/components/device/device-list-table/DeviceListTable";
import { Device, GeoFence } from "../../../../../models";
import CancelIcon from "@mui/icons-material/Cancel";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";

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

  const onClickRemoveDevice = (device: Device) => {};

  const getColumns = () => {
    return [
      {
        field: "serial",
        headerName: "Device Details",
        sortable: false,
        flex: 1,
        disableColumnMenu: true,
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
            showInMenu
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
          <Button variant="outlined" color="primary" size="small">
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
                value={searchText}
                onChange={(evt) => setSearchText(evt.target.value)}
                label="Search"
                placeholder="Search by serial/name"
                InputProps={{
                  endAdornment: searchText ? (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setSearchText("")}>
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
                disabled={!searchText}
                fullWidth
                sx={{
                  height: "48px",
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
            rowHeight={48}
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
          />
        </Box>
      </Paper>
    </Box>
  );
}

export default UserGeoFenceDevicesControl;
