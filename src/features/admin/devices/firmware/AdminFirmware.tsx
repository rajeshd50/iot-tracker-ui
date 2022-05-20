import { Box, Button, CircularProgress } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import PageHeader from "../../../../common/components/page-header/PageHeader";
import AddIcon from "@mui/icons-material/Add";
import { DeviceFirmware, DeviceFirmwareSyncStatus } from "../../../../models";
import AdminFirmwareFilter from "./components/AdminFirmwareFilter";
import { useSnackbar } from "notistack";
import {
  AddFirmwareDto,
  DeviceFirmwareService,
  SyncFirmwareDto,
} from "../../../../services";
import DeviceListTable from "../../../../common/components/device/device-list-table/DeviceListTable";
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import { formatDateTime } from "../../../../common/util/util";
import AdminFirmwareAddDialog from "./components/AdminFirmwareAddDialog";
import AdminFirmwareVersionCell from "./components/table-cells/AdminFirmwareVersionCell";
import AdminFirmwareSyncStatusCell from "./components/table-cells/AdminFirmwareSyncStatusCell";
import AdminFirmwareFileDownload from "./components/table-cells/AdminFirmwareFileDownload";
import AdminFirmwareSyncDetailsCell from "./components/table-cells/AdminFirmwareSyncDetailsCell";
import CloudSyncIcon from "@mui/icons-material/CloudSync";
import SyncLockIcon from "@mui/icons-material/SyncLock";
import ConfirmDialog from "../../../../common/components/confirm-dialog/ConfirmDialog";
import AdminFirmwareSyncSelected from "./components/AdminFirmwareSyncSelected";

const columns: GridColDef[] = [
  {
    field: "version",
    headerName: "Version",
    sortable: false,
    flex: 1,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams<DeviceFirmware>) => (
      <AdminFirmwareVersionCell firmware={params.row} />
    ),
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
    renderCell: (params: GridRenderCellParams<DeviceFirmware>) => (
      <AdminFirmwareSyncStatusCell firmware={params.row} />
    ),
  },
  {
    field: "syncDetails",
    headerName: "Sync Details",
    sortable: false,
    flex: 1,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams<DeviceFirmware>) => (
      <AdminFirmwareSyncDetailsCell firmware={params.row} />
    ),
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

  const [isGenerateLinkLoading, setIsGenerateLinkLoading] = useState(false);

  const [firmwareToSync, setFirmwareToSync] = useState<DeviceFirmware | null>(
    null
  );

  const [showSyncAllConfirm, setShowSyncAllConfirm] = useState(false);
  const [syncFirmwareLoading, setSyncFirmwareLoading] = useState(false);

  const [showSyncSelectedDialog, setShowSyncSelectedDialog] = useState(false);

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

  const onRegenerateLink = async (firmwareToGenLink: DeviceFirmware) => {
    try {
      setIsGenerateLinkLoading(true);

      const updatedFirmware = await DeviceFirmwareService.regenerateLink({
        id: firmwareToGenLink.id,
      });

      const updatedFirmwareList = deviceFirmware.map((firmware) => {
        if (firmware.id === firmwareToGenLink.id) {
          return updatedFirmware;
        }
        return firmware;
      });

      setDeviceFirmware(updatedFirmwareList);

      enqueueSnackbar("Firmware link generated", {
        variant: "success",
      });
    } catch (e: any) {
      enqueueSnackbar(
        e && e.message ? e.message : "Error while generating firmware link",
        {
          variant: "error",
        }
      );
    } finally {
      setIsGenerateLinkLoading(false);
    }
  };

  const callSync = async (data: SyncFirmwareDto) => {
    try {
      setSyncFirmwareLoading(true);
      const updatedFirmware = await DeviceFirmwareService.sync(data);

      const updatedFirmwareList = deviceFirmware.map((firmware) => {
        if (firmware.id === data.id) {
          return updatedFirmware;
        }
        return firmware;
      });
      setDeviceFirmware(updatedFirmwareList);
      enqueueSnackbar("Firmware sync request sent", {
        variant: "success",
      });
    } catch (e: any) {
      enqueueSnackbar(
        e && e.message ? e.message : "Error while trying to sync firmware",
        {
          variant: "error",
        }
      );
    } finally {
      setSyncFirmwareLoading(false);
    }
  };

  const onClickSyncAll = (firmware: DeviceFirmware) => {
    setFirmwareToSync(firmware);
    setShowSyncAllConfirm(true);
  };

  const onCancelSyncAll = () => {
    setFirmwareToSync(null);
    setShowSyncAllConfirm(false);
  };

  const onSyncAll = async () => {
    if (!firmwareToSync) {
      return;
    }
    await callSync({
      id: firmwareToSync.id,
      isAllDeviceSelected: true,
    });
    onCancelSyncAll();
  };

  const onClickSyncSelected = (firmware: DeviceFirmware) => {
    setFirmwareToSync(firmware);
    setShowSyncSelectedDialog(true);
  };

  const onCancelSyncSelected = () => {
    setFirmwareToSync(null);
    setShowSyncSelectedDialog(false);
  };

  const onSyncSelected = async (devices: string[]) => {
    if (!firmwareToSync) {
      return;
    }
    await callSync({
      id: firmwareToSync.id,
      isAllDeviceSelected: false,
      attachedDevices: devices,
    });
    onCancelSyncSelected();
  };

  const getColumns = () => {
    return [
      ...columns,
      {
        field: "download",
        headerName: "Firmware File",
        sortable: false,
        width: 200,
        disableColumnMenu: true,
        renderCell: (params: GridRenderCellParams<DeviceFirmware>) => (
          <AdminFirmwareFileDownload
            firmware={params.row}
            isLoading={isGenerateLinkLoading}
            onRegenerateLink={onRegenerateLink}
          />
        ),
      },
      {
        field: "actions",
        type: "actions",
        getActions: (params: GridRowParams) => [
          <GridActionsCellItem
            icon={
              <CloudSyncIcon
                color="success"
                sx={{
                  fontSize: "24px",
                }}
              />
            }
            onClick={() => onClickSyncAll(params.row)}
            label="Sync all"
            showInMenu
          />,
          <GridActionsCellItem
            icon={
              <SyncLockIcon
                color="info"
                sx={{
                  fontSize: "24px",
                }}
              />
            }
            onClick={() => onClickSyncSelected(params.row)}
            label="Sync selected"
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
      {showSyncAllConfirm && firmwareToSync ? (
        <ConfirmDialog
          title="Confirm to sync too devices with firmware"
          subTitle={`All devices will be sync with this firmware (${firmwareToSync.version})`}
          show={showSyncAllConfirm}
          onCancel={onCancelSyncAll}
          onConfirm={onSyncAll}
          isLoading={syncFirmwareLoading}
          confirmColor="primary"
          cancelColor="secondary"
        />
      ) : null}
      {showSyncSelectedDialog && firmwareToSync ? (
        <AdminFirmwareSyncSelected
          show={showSyncSelectedDialog}
          firmware={firmwareToSync}
          onClose={onCancelSyncSelected}
          onSync={onSyncSelected}
          isLoading={syncFirmwareLoading}
        />
      ) : null}
    </Box>
  );
}

export default AdminFirmware;
