import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import React, { useCallback, useState } from "react";
import NoDataFallback from "../../../../../../common/components/no-data-fallback/NoDataFallback";
import { formatDateTime } from "../../../../../../common/util/util";
import {
  DeviceFirmware,
  DeviceFirmwareSync,
  DeviceFirmwareSyncStatus,
} from "../../../../../../models";
import { DeviceFirmwareService } from "../../../../../../services";

export interface IAdminFirmwareSyncDetailsCellProps {
  firmware: DeviceFirmware;
}

const columns: GridColDef[] = [
  {
    field: "createdAt",
    headerName: "Sync Date",
    sortable: false,
    flex: 1,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams<DeviceFirmwareSync>) => {
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
    field: "totalDeviceCount",
    headerName: "Total Devices",
    sortable: false,
    flex: 1,
    disableColumnMenu: true,
  },
  {
    field: "confirmedCount",
    headerName: "Confirmed Devices",
    sortable: false,
    flex: 1,
    disableColumnMenu: true,
  },
  {
    field: "completedAt",
    headerName: "Completed Date",
    sortable: false,
    flex: 1,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams<DeviceFirmwareSync>) => {
      if (!params.row.completedAt) {
        return <></>;
      }
      const date = new Date(params.row.completedAt);
      return (
        <Box component="span" sx={{ marginRight: "4px" }}>
          {formatDateTime(date)}
        </Box>
      );
    },
  },
];

function AdminFirmwareSyncDetailsCell({
  firmware,
}: IAdminFirmwareSyncDetailsCellProps) {
  const [firmwareSyncList, setFirmwareSyncList] = useState<
    DeviceFirmwareSync[]
  >([]);
  const [isListLoading, setIsListLoading] = useState(false);

  const [showSyncListDialog, setShowSyncListDialog] = useState(false);
  const [pageSize, setPageSize] = useState<number>(5);

  const { enqueueSnackbar } = useSnackbar();

  const loadSyncList = useCallback(async () => {
    try {
      setIsListLoading(true);
      const syncListData = await DeviceFirmwareService.syncList({
        id: firmware.id,
      });
      setFirmwareSyncList(syncListData);
    } catch (e: any) {
      enqueueSnackbar(
        e && e.message ? e.message : "Error while trying to sync firmware",
        {
          variant: "error",
        }
      );
    } finally {
      setIsListLoading(false);
    }
  }, [firmware]);

  const onClickViewList = async () => {
    await loadSyncList();
    setShowSyncListDialog(true);
  };

  const onCloseListDialog = () => {
    setShowSyncListDialog(false);
  };

  if (
    !firmware ||
    firmware.syncStatus === DeviceFirmwareSyncStatus.NOT_SYNCED
  ) {
    return <Typography>N/A</Typography>;
  }
  return (
    <Box>
      <Button
        variant="outlined"
        color="primary"
        startIcon={isListLoading ? <CircularProgress /> : null}
        onClick={onClickViewList}
      >
        View sync details
      </Button>
      {showSyncListDialog && (
        <Dialog
          open={showSyncListDialog}
          maxWidth="md"
          onClose={onCloseListDialog}
          fullWidth
          disableEscapeKeyDown
        >
          <DialogTitle
            sx={{ fontSize: "1.5rem", borderBottom: `1px solid ${grey[200]}` }}
          >
            Sync Details for firmware ({firmware.version})
          </DialogTitle>
          <DialogContent>
            <Box
              sx={{
                height: "400px",
                width: "100%",
                marginTop: "15px",
              }}
            >
              <DataGrid
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10]}
                pagination
                rowCount={firmwareSyncList.length}
                rows={firmwareSyncList}
                columns={columns}
                disableSelectionOnClick
                getRowId={(row) => row.id}
                loading={isListLoading}
                components={{
                  NoRowsOverlay: () => (
                    <NoDataFallback title="No data available" />
                  ),
                  NoResultsOverlay: () => (
                    <NoDataFallback title="No data with matching filter available" />
                  ),
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              autoFocus
              disabled={isListLoading}
              onClick={onCloseListDialog}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}

export default AdminFirmwareSyncDetailsCell;
