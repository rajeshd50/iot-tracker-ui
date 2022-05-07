import { Box, Tooltip } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { useSnackbar } from "notistack";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import PageHeader from "../../../../common/components/page-header/PageHeader";
import AdminRecentPurchasesFilter from "./components/AdminRecentPurchasesFilter";
import { Device, DeviceAssignStatus } from "../../../../models";
import { DeviceOrderBy, DeviceService } from "../../../../services";
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import {
  formatDateTime,
  getReadableDateDifferenceWithCurrentDate,
} from "../../../../common/util/util";
import { OrderByDirection } from "../../../../services/common";
import DeviceListTable from "../../../../common/components/device/device-list-table/DeviceListTable";
import ConfirmDialog from "../../../../common/components/confirm-dialog/ConfirmDialog";

const columns: GridColDef[] = [
  {
    field: "serial",
    headerName: "Serial",
    sortable: false,
    width: 250,
    disableColumnMenu: true,
  },
  {
    field: "approvalRequestedAt",
    headerName: "Date requested",
    sortable: false,
    flex: 1.5,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams<Device>) => {
      if (!params.row.approvalRequestedAt) {
        return <></>;
      }
      const date = new Date(params.row.approvalRequestedAt);
      return (
        <>
          <Box component="span" sx={{ marginRight: "4px" }}>
            {formatDateTime(date)}
          </Box>
          <Box component="span" sx={{ marginRight: "4px" }}>
            ({getReadableDateDifferenceWithCurrentDate(date)})
          </Box>
        </>
      );
    },
  },
  {
    field: "user",
    headerName: "User",
    sortable: false,
    flex: 0.5,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams<Device>) => {
      if (!params.row.user || !params.row.user.fullName) {
        return <></>;
      }
      return (
        <Box component="span" sx={{ marginRight: "4px" }}>
          {params.row.user.fullName}
        </Box>
      );
    },
  },
  {
    field: "userEmail",
    headerName: "User Email",
    sortable: false,
    flex: 1,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams<Device>) => {
      if (!params.row.user || !params.row.user.email) {
        return <></>;
      }
      return (
        <Box component="span" sx={{ marginRight: "4px" }}>
          {params.row.user.email}
        </Box>
      );
    },
  },
];

function AdminDeviceRecentPurchaseList() {
  const [serial, setSerial] = useState("");
  const [user, setUser] = useState<string>("");

  const [devices, setDevices] = useState<Device[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  // accept reject variables
  const [showAcceptRejectConfirm, setShowAcceptRejectConfirm] = useState(false);
  const [deviceToAcceptReject, setDeviceToAcceptReject] =
    useState<Device | null>(null);
  const [isAccept, setIsAccept] = useState<boolean | null>(null);
  const [isAcceptRejectLoading, setIsAcceptRejectLoading] = useState(false);
  // accept reject variables ends

  const { enqueueSnackbar } = useSnackbar();

  // core function starts
  const loadDevices = async () => {
    try {
      setIsSearchLoading(true);
      const devices = await DeviceService.fetch({
        serial: serial ? serial : undefined,
        user: user ? user : undefined,
        page: currentPage + 1,
        assignStatus: DeviceAssignStatus.PENDING_APPROVAL,
        perPage,
        orderBy: DeviceOrderBy.APPROVAL_REQUESTED_AT,
        orderByDirection: OrderByDirection.DESCENDING,
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
  }, [currentPage, perPage, serial, user]);

  useEffect(() => {
    loadDevicesCallback();
  }, [currentPage, perPage, serial, user, loadDevicesCallback]);

  // core functions ends

  // accept reject functions starts
  const onClickAcceptReject = async (device: Device, isAccepted: boolean) => {
    setIsAccept(isAccepted);
    setDeviceToAcceptReject(device);
    setShowAcceptRejectConfirm(true);
  };

  const onCancelAcceptReject = () => {
    setIsAccept(null);
    setDeviceToAcceptReject(null);
    setShowAcceptRejectConfirm(false);
  };

  const onConfirmAcceptReject = async () => {
    if (!deviceToAcceptReject) {
      return;
    }
    try {
      setIsAcceptRejectLoading(true);
      await DeviceService.updateApproval({
        serial: deviceToAcceptReject.serial,
        isApproved: !!isAccept,
      });
      enqueueSnackbar(
        `Device approval request ${
          isAccept ? "accepted" : "rejected"
        } successfully`,
        {
          variant: "success",
        }
      );
      loadDevices();
    } catch (e: any) {
      enqueueSnackbar(
        e && e.message
          ? e.message
          : `Error while ${
              isAccept ? "accepting" : "rejecting"
            } device approval request`,
        {
          variant: "error",
        }
      );
    } finally {
      setIsAcceptRejectLoading(false);
      onCancelAcceptReject();
    }
  };

  // accept reject functions ends

  const getColumns = () => {
    return [
      ...columns,
      {
        field: "actions",
        type: "actions",
        getActions: (params: GridRowParams) => [
          <GridActionsCellItem
            icon={
              <Tooltip title="Approve">
                <CheckCircleIcon
                  color="success"
                  sx={{
                    fontSize: "24px",
                  }}
                />
              </Tooltip>
            }
            onClick={() => onClickAcceptReject(params.row, true)}
            label="Approve"
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="Reject">
                <CancelIcon
                  color="error"
                  sx={{
                    fontSize: "24px",
                  }}
                />
              </Tooltip>
            }
            onClick={() => onClickAcceptReject(params.row, false)}
            label="Reject"
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
        title="Recent Purchases"
        subTitle="Recent device add requests"
      />
      <AdminRecentPurchasesFilter
        isLoading={isSearchLoading}
        onFilterReset={() => {
          console.log("Here");
          setSerial("");
          setUser("");
        }}
        onFilterUpdate={(updatedSerial, updatedUser) => {
          updatedSerial && setSerial(updatedSerial);
          updatedUser && setUser(updatedUser);
        }}
      />
      <DeviceListTable<Device>
        rows={devices}
        columns={getColumns()}
        isLoading={isSearchLoading}
        page={currentPage}
        perPage={perPage}
        total={total}
        onPageChange={(newPage) => setCurrentPage(newPage)}
        onPerPageChange={(newPerPage) => setPerPage(newPerPage)}
      />
      {showAcceptRejectConfirm && deviceToAcceptReject ? (
        <ConfirmDialog
          title={
            isAccept === true
              ? "Confirm device activation approval"
              : "Confirm device activation rejection"
          }
          subTitle={
            isAccept === true
              ? `Device (serial: ${deviceToAcceptReject.serial}) will be active and user (${deviceToAcceptReject.user?.fullName}) will be able to access the data`
              : `Device (serial: ${deviceToAcceptReject.serial}) will be inactive and user (${deviceToAcceptReject.user?.fullName}) will not be able to access data`
          }
          show={showAcceptRejectConfirm}
          onCancel={onCancelAcceptReject}
          onConfirm={onConfirmAcceptReject}
          isLoading={isAcceptRejectLoading}
          confirmColor={isAccept === true ? "primary" : "error"}
          cancelColor="secondary"
          confirmText={
            isAccept === true ? "Accept activation" : "Reject activation"
          }
          cancelText="Cancel"
        />
      ) : null}
    </Box>
  );
}

export default AdminDeviceRecentPurchaseList;
