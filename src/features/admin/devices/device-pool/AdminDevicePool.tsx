import { Box } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { useSnackbar } from "notistack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import PageHeader from "../../../../common/components/page-header/PageHeader";
import { DevicePool, DevicePoolStatus } from "../../../../models";
import { DevicePoolService } from "../../../../services";
import DevicePoolFilter from "./components/DevicePoolFilter";
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import { formatDateTime } from "../../../../common/util/util";
import DeviceListTable from "../../../../common/components/device/device-list-table/DeviceListTable";
import ConfirmDialog from "../../../../common/components/confirm-dialog/ConfirmDialog";
import DevicePoolActionComponent from "./components/DevicePoolActionComponent";

const columns: GridColDef[] = [
  {
    field: "serial",
    headerName: "Serial",
    sortable: false,
    flex: 1,
    disableColumnMenu: true,
  },
  {
    field: "createdAt",
    headerName: "Date added",
    sortable: false,
    flex: 1,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams<DevicePool>) => {
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
    headerName: "Status",
    sortable: false,
    flex: 1,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams<DevicePool>) => {
      if (!params.row.status) {
        return <></>;
      }
      return (
        <Box component="span" sx={{ marginRight: "4px" }}>
          {params.row.status === DevicePoolStatus.CREATED
            ? "Created (not configured yet)"
            : "Configured"}
        </Box>
      );
    },
  },
];

function AdminDevicePoolList() {
  const [devicePool, setDevicePool] = useState<DevicePool[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [serial, setSerial] = useState("");
  const [status, setStatus] = useState<DevicePoolStatus | undefined>(undefined);

  const [showConfirm, setShowConfirm] = useState(false);
  const [toConfirmConfigData, setToConfirmConfigData] =
    useState<DevicePool | null>(null);
  const [isConfirmConfigLoading, setIsConfirmConfigLoading] = useState(false);

  const [showDelete, setShowDelete] = useState(false);
  const [toDeleteData, setToDeleteData] = useState<DevicePool | null>(null);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const [addingNewEntry, setAddingNewEntry] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const loadDevicePool = async () => {
    try {
      setIsSearchLoading(true);
      const devices = await DevicePoolService.fetch({
        serial: serial ? serial : undefined,
        status: status ? status : undefined,
        page: currentPage + 1,
        perPage,
      });
      setTotal(devices.total);
      setDevicePool(devices.items);
    } catch (e) {
      enqueueSnackbar("Error while fetching device pool", {
        variant: "error",
      });
    } finally {
      setIsSearchLoading(false);
    }
  };

  const loadDevicePoolCallback = useCallback(async () => {
    await loadDevicePool();
  }, [currentPage, perPage, serial, status]);

  useEffect(() => {
    loadDevicePoolCallback();
  }, [currentPage, perPage, serial, status, loadDevicePoolCallback]);

  const onClickMarkAsConfigured = (data: DevicePool) => {
    setToConfirmConfigData(data);
    setShowConfirm(true);
  };

  const onClickDelete = (data: DevicePool) => {
    setToDeleteData(data);
    setShowDelete(true);
  };

  const markAsConfigured = async (data: DevicePool) => {
    try {
      setIsConfirmConfigLoading(true);
      await DevicePoolService.markConfigured({
        serial: data.serial,
      });
      enqueueSnackbar("Device marked as configured", {
        variant: "success",
      });
      await loadDevicePool();
    } catch (e) {
      enqueueSnackbar("Error while marking as configured", {
        variant: "error",
      });
    } finally {
      setIsConfirmConfigLoading(false);
      setToConfirmConfigData(null);
      setShowConfirm(false);
    }
  };

  const onCancelDialog = () => {
    setToConfirmConfigData(null);
    setShowConfirm(false);
  };

  const onConfirmDialog = async () => {
    toConfirmConfigData && (await markAsConfigured(toConfirmConfigData));
  };

  const addNewEntry = async () => {
    try {
      setAddingNewEntry(true);
      await DevicePoolService.create();
      await loadDevicePool();
    } catch (e) {
      enqueueSnackbar("Error adding a new entry", {
        variant: "error",
      });
    } finally {
      setAddingNewEntry(false);
    }
  };

  const deleteFromPool = async (data: DevicePool) => {
    try {
      setIsDeleteLoading(true);
      await DevicePoolService.remove({
        serial: data.serial,
      });
      enqueueSnackbar("Device deleted from pool", {
        variant: "success",
      });
      await loadDevicePool();
    } catch (e: any) {
      enqueueSnackbar(
        e && e.message ? e.message : "Error while deleting device",
        {
          variant: "error",
        }
      );
    } finally {
      setIsDeleteLoading(false);
      setToDeleteData(null);
      setShowDelete(false);
    }
  };

  const onCancelDeleteDialog = () => {
    setToDeleteData(null);
    setShowDelete(false);
  };

  const onConfirmDeleteDialog = async () => {
    toDeleteData && (await deleteFromPool(toDeleteData));
  };

  const getColumns = () => {
    return [
      ...columns,
      {
        field: "actions",
        type: "actions",
        getActions: (params: GridRowParams) =>
          params.row.status === DevicePoolStatus.CREATED
            ? [
                <GridActionsCellItem
                  icon={<CheckCircleIcon />}
                  onClick={() => onClickMarkAsConfigured(params.row)}
                  label="Mark as configured"
                  showInMenu
                />,
                <GridActionsCellItem
                  icon={<DeleteForeverIcon />}
                  onClick={() => onClickDelete(params.row)}
                  label="Delete"
                  showInMenu
                />,
              ]
            : [
                <GridActionsCellItem
                  icon={<DeleteForeverIcon />}
                  onClick={() => onClickDelete(params.row)}
                  label="Delete"
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
        title="Device Pool"
        subTitle="All devices in system"
        ActionComponent={
          <DevicePoolActionComponent
            onActionClick={addNewEntry}
            loading={addingNewEntry}
          />
        }
      />
      <DevicePoolFilter
        isLoading={isSearchLoading}
        onFilterReset={() => {
          setSerial("");
          setStatus(undefined);
        }}
        onFilterUpdate={(updatedSerial, updatedStatus) => {
          updatedSerial && setSerial(updatedSerial);
          updatedStatus && setStatus(updatedStatus as DevicePoolStatus);
        }}
      />
      <DeviceListTable<DevicePool>
        rows={devicePool}
        columns={getColumns()}
        isLoading={isSearchLoading}
        page={currentPage}
        perPage={perPage}
        total={total}
        onPageChange={(newPage) => setCurrentPage(newPage)}
        onPerPageChange={(newPerPage) => setPerPage(newPerPage)}
      />
      {showConfirm && toConfirmConfigData ? (
        <ConfirmDialog
          title="Confirm device configuration"
          subTitle="Please make sure the device is configured"
          show={showConfirm}
          onCancel={onCancelDialog}
          onConfirm={onConfirmDialog}
          isLoading={isConfirmConfigLoading}
          confirmColor="primary"
          cancelColor="secondary"
        />
      ) : null}
      {showDelete && toDeleteData ? (
        <ConfirmDialog
          title="Confirm to delete device from pool"
          subTitle="Please note, device can only be deleted if not assign to any user"
          show={showDelete}
          onCancel={onCancelDeleteDialog}
          onConfirm={onConfirmDeleteDialog}
          isLoading={isDeleteLoading}
          confirmColor="error"
          cancelColor="primary"
          cancelText="No, Leave it"
          confirmText="Yes, Delete"
        />
      ) : null}
    </Box>
  );
}

export default AdminDevicePoolList;
