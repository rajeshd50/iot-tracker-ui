import { Box, Button, CircularProgress } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import PageHeader from "../../../../common/components/page-header/PageHeader";
import AddIcon from "@mui/icons-material/Add";
import { DeviceFirmware, DeviceFirmwareSyncStatus } from "../../../../models";
import AdminFirmwareFilter from "./components/AdminFirmwareFilter";
import { useSnackbar } from "notistack";
import { AddFirmwareDto, DeviceFirmwareService } from "../../../../services";
import DeviceListTable from "../../../../common/components/device/device-list-table/DeviceListTable";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { formatDateTime } from "../../../../common/util/util";
import AdminFirmwareAddDialog from "./components/AdminFirmwareAddDialog";

const columns: GridColDef[] = [
  {
    field: "version",
    headerName: "Version",
    sortable: false,
    width: 250,
    disableColumnMenu: true,
  },
  {
    field: "createdAt",
    headerName: "Date added",
    sortable: false,
    flex: 1,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams<DeviceFirmware>) => {
      if (!params.row.createdAt) {
        return <></>;
      }
      const date = new Date(params.row.createdAt);
      return (
        <Box component="span" sx={{ marginRight: "4px" }}>
          {formatDateTime(date)}
        </Box>
      );
    },
  },
  {
    field: "status",
    headerName: "Sync Status",
    sortable: false,
    flex: 1,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams<DeviceFirmware>) => {
      if (!params.row.status) {
        return <></>;
      }
      return (
        <Box component="span" sx={{ marginRight: "4px" }}>
          {params.row.status === DeviceFirmwareSyncStatus.SYNCED
            ? "Not synced"
            : "Synced"}
        </Box>
      );
    },
  },
];

function AdminFirmware() {
  const [version, setVersion] = useState("");
  const [status, setStatus] = useState<DeviceFirmwareSyncStatus | undefined>(
    undefined
  );
  const [deviceFirmware, setDeviceFirmware] = useState<DeviceFirmware[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  const [isAddFirmwareLoading, setIsAddFirmwareLoading] = useState(false);
  const [showAddFirmwareDialog, setShowAddFirmwareDialog] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const loadDeviceFirmware = async () => {
    try {
      setIsSearchLoading(true);
      const deviceFirmwareResp = await DeviceFirmwareService.fetch({
        version: version ? version : undefined,
        syncStatus: status ? status : undefined,
        page: currentPage + 1,
        perPage,
      });
      setTotal(deviceFirmwareResp.total);
      setDeviceFirmware(deviceFirmwareResp.items);
    } catch (e) {
      enqueueSnackbar("Error while fetching device firmware list", {
        variant: "error",
      });
    } finally {
      setIsSearchLoading(false);
    }
  };

  const loadDeviceFirmwareCallback = useCallback(async () => {
    await loadDeviceFirmware();
  }, [currentPage, perPage, version, status]);

  useEffect(() => {
    loadDeviceFirmwareCallback();
  }, [currentPage, perPage, version, status, loadDeviceFirmwareCallback]);

  const onClickAddFirmware = () => {
    setShowAddFirmwareDialog(true);
  };

  const onCloseAddFirmware = () => {
    setShowAddFirmwareDialog(false);
  };

  const onAddFirmware = async (file: File, data: AddFirmwareDto) => {
    try {
      setIsAddFirmwareLoading(true);
      await DeviceFirmwareService.add(file, data);
      enqueueSnackbar("Firmware added successfully", {
        variant: "success",
      });
      await loadDeviceFirmware();
    } catch (e: any) {
      enqueueSnackbar(
        e && e.message ? e.message : "Error while adding new firmware",
        {
          variant: "error",
        }
      );
    } finally {
      setIsAddFirmwareLoading(false);
      onCloseAddFirmware();
    }
  };

  const getColumns = () => {
    return [...columns];
  };

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
      }}
    >
      <PageHeader
        title="Device firmware"
        subTitle="Manage device firmware"
        ActionComponent={
          <Button
            startIcon={
              isAddFirmwareLoading ? (
                <CircularProgress color="primary" size="16px" />
              ) : (
                <AddIcon />
              )
            }
            disabled={isAddFirmwareLoading}
            color="primary"
            variant="contained"
            onClick={onClickAddFirmware}
          >
            Upload new firmware
          </Button>
        }
      />
      <AdminFirmwareFilter
        isLoading={isSearchLoading}
        onFilterReset={() => {
          setVersion("");
          setStatus(undefined);
        }}
        onFilterUpdate={(updatedVersion, updatedStatus) => {
          updatedVersion && setVersion(updatedVersion);
          updatedStatus && setStatus(updatedStatus as DeviceFirmwareSyncStatus);
        }}
      />
      <DeviceListTable<DeviceFirmware>
        rows={deviceFirmware}
        columns={getColumns()}
        isLoading={isSearchLoading}
        page={currentPage}
        perPage={perPage}
        total={total}
        onPageChange={(newPage) => setCurrentPage(newPage)}
        onPerPageChange={(newPerPage) => setPerPage(newPerPage)}
      />
      {showAddFirmwareDialog && (
        <AdminFirmwareAddDialog
          show={showAddFirmwareDialog}
          onClose={onCloseAddFirmware}
          onFirmwareAdd={onAddFirmware}
          loading={isAddFirmwareLoading}
        />
      )}
    </Box>
  );
}

export default AdminFirmware;
