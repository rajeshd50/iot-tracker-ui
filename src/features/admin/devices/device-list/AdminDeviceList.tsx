import { Box, Tooltip, Typography } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { useSnackbar } from "notistack";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ToggleOffOutlinedIcon from "@mui/icons-material/ToggleOffOutlined";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import PageHeader from "../../../../common/components/page-header/PageHeader";
import AdminDeviceListFilter from "./components/AdminDeviceListFilter";
import { Device, DeviceAssignStatus, DeviceStatus } from "../../../../models";
import {
  DeviceOrderBy,
  DeviceService,
  UpdateDeviceLimitDto,
} from "../../../../services";
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import { formatDateTime } from "../../../../common/util/util";
import { OrderByDirection } from "../../../../services/common";
import DeviceListTable from "../../../../common/components/device/device-list-table/DeviceListTable";
import AdminDeviceDates from "./components/AdminDeviceDates";
import ConfirmDialog from "../../../../common/components/confirm-dialog/ConfirmDialog";
import AdminDeviceUserCell from "./components/AdminDeviceUserCell";
import AdminDeviceStatusCell from "./components/AdminDeviceStatusCell";
import AdminUserInfoDialog from "./components/AdminUserInfoDialog";
import AdminDeviceAssignDialog from "./components/AdminDeviceAssignDialog";
import AddTaskIcon from "@mui/icons-material/AddTask";
import AdminDeviceLimitUpdateDialog from "./components/AdminDeviceLimitUpdateDialog";

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
    field: "date",
    headerName: "Date",
    sortable: false,
    flex: 1,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams<Device>) => {
      if (!params.row.approvalRequestedAt && !params.row.approvedAt) {
        return <></>;
      }
      return <AdminDeviceDates device={params.row} />;
    },
  },
  {
    field: "user",
    headerName: "User",
    sortable: false,
    flex: 1,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams<Device>) => {
      if (!params.row.user) {
        return <></>;
      }
      return <AdminDeviceUserCell device={params.row} />;
    },
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

function AdminDeviceList() {
  const [serial, setSerial] = useState("");
  const [user, setUser] = useState<string>("");

  const [devices, setDevices] = useState<Device[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  const [deviceStatus, setDeviceStatus] = useState<
    DeviceStatus | string | null
  >("");
  const [assignedStatus, setAssignedStatus] = useState<
    DeviceAssignStatus | string | null
  >("");

  // accept reject variables
  const [showAcceptRejectConfirm, setShowAcceptRejectConfirm] = useState(false);
  const [deviceToAcceptReject, setDeviceToAcceptReject] =
    useState<Device | null>(null);
  const [isAccept, setIsAccept] = useState<boolean | null>(null);
  const [isAcceptRejectLoading, setIsAcceptRejectLoading] = useState(false);
  // accept reject variables ends

  // toggle status variables
  const [showToggleStatusConfirm, setShowToggleStatusConfirm] = useState(false);
  const [deviceToToggle, setDeviceToToggle] = useState<Device | null>(null);
  const [isToggleStatusLoading, setIsToggleStatusLoading] = useState(false);
  // toggle status variables ends

  // user info variables
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [toShowUserInfoUserId, setToShowUserInfoUserId] = useState("");
  // user info variables ends

  // device assign variables
  const [showDeviceAssignDialog, setShowDeviceAssignDialog] = useState(false);
  const [deviceToAssign, setDeviceToAssign] = useState<Device | null>(null);
  const [isDeviceAssigningLoading, setIsDeviceAssigningLoading] =
    useState(false);
  // device assign variables ends

  // user limit update variables
  const [showDeviceLimitUpdateDialog, setShowDeviceLimitUpdateDialog] =
    useState(false);
  const [deviceToUpdateLimit, setDeviceToUpdateLimit] = useState<Device | null>(
    null
  );
  const [isDeviceLimitUpdateLoading, setIsDeviceLimitUpdateLoading] =
    useState(false);
  // user limit update variables ends

  const { enqueueSnackbar } = useSnackbar();

  const loadDevices = async () => {
    try {
      setIsSearchLoading(true);
      const devices = await DeviceService.fetch({
        serial: serial ? serial : undefined,
        user: user ? user : undefined,
        page: currentPage + 1,
        status: deviceStatus ? deviceStatus : undefined,
        assignStatus: assignedStatus ? assignedStatus : undefined,
        perPage,
        orderBy: DeviceOrderBy.CREATED_AT,
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
  }, [currentPage, perPage, serial, user, deviceStatus, assignedStatus]);

  useEffect(() => {
    loadDevicesCallback();
  }, [
    currentPage,
    perPage,
    serial,
    user,
    deviceStatus,
    assignedStatus,
    loadDevicesCallback,
  ]);

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

  // toggle active function starts
  const onClickToggleActiveStatus = (device: Device) => {
    setDeviceToToggle(device);
    setShowToggleStatusConfirm(true);
  };
  const onCancelToggleStatus = () => {
    setDeviceToToggle(null);
    setShowToggleStatusConfirm(false);
  };

  const onConfirmToggleStatus = async () => {
    if (!deviceToToggle) {
      return;
    }
    const wasDeviceActive = deviceToToggle.status === DeviceStatus.ACTIVE;
    try {
      setIsToggleStatusLoading(true);
      await DeviceService.updateStatus({
        serial: deviceToToggle.serial,
        status: wasDeviceActive ? DeviceStatus.INACTIVE : DeviceStatus.ACTIVE,
      });
      enqueueSnackbar(
        `Device status changed to ${wasDeviceActive ? "inactive" : "active"}`,
        {
          variant: "success",
        }
      );
      loadDevices();
    } catch (e: any) {
      enqueueSnackbar(
        e && e.message
          ? e.message
          : `Error while changing device status to  ${
              wasDeviceActive ? "inactive" : "active"
            }`,
        {
          variant: "error",
        }
      );
    } finally {
      setIsToggleStatusLoading(false);
      onCancelToggleStatus();
    }
  };
  // toggle active function ends

  // device assign functions starts
  const onClickAssignDeviceToUser = (device: Device) => {
    setDeviceToAssign(device);
    setShowDeviceAssignDialog(true);
  };

  const onCloseDeviceAssign = () => {
    setDeviceToAssign(null);
    setShowDeviceAssignDialog(false);
  };

  const onDeviceAssign = async (userId: string) => {
    if (!deviceToAssign) {
      return;
    }
    try {
      setIsDeviceAssigningLoading(true);
      await DeviceService.assign({
        deviceId: deviceToAssign.id,
        userId,
      });
      loadDevices();
      enqueueSnackbar("Device assigned to user", {
        variant: "success",
      });
    } catch (e: any) {
      enqueueSnackbar(
        e && e.message ? e.message : "Error while assigning device",
        {
          variant: "error",
        }
      );
    } finally {
      setIsDeviceAssigningLoading(false);
      onCloseDeviceAssign();
    }
  };
  // device assign functions ends

  // view user info functions starts
  const onClickViewUserInfo = (device: Device) => {
    if (device.user) {
      setToShowUserInfoUserId(device.user.id);
      setShowUserInfo(true);
    }
  };
  const onCloseViewUserInfo = () => {
    setToShowUserInfoUserId("");
    setShowUserInfo(false);
  };
  // view user info functions ends

  const onClickUpdateLimit = (device: Device) => {
    setShowDeviceLimitUpdateDialog(true);
    setDeviceToUpdateLimit(device);
  };

  const onCloseUpdateLimit = () => {
    setShowDeviceLimitUpdateDialog(false);
    setDeviceToUpdateLimit(null);
  };

  const onUpdateLimit = async (data: UpdateDeviceLimitDto) => {
    try {
      setIsDeviceLimitUpdateLoading(true);
      const updatedDevice = await DeviceService.updateLimit(data);
      enqueueSnackbar("Device limit updated", {
        variant: "success",
      });
      setDevices(
        devices.map((device) => {
          if (device.id === updatedDevice.id) {
            return updatedDevice;
          }
          return device;
        })
      );
    } catch (e: any) {
      enqueueSnackbar(
        e && e.message ? e.message : "Error while updating device limit",
        {
          variant: "error",
        }
      );
    } finally {
      setIsDeviceLimitUpdateLoading(false);
      onCloseUpdateLimit();
    }
  };

  const getRowActions = (params: GridRowParams<Device>): JSX.Element[] => {
    const actions: JSX.Element[] = [];
    if (params.row.assignStatus === DeviceAssignStatus.PENDING_APPROVAL) {
      return [
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
      ];
    }
    actions.push(
      <GridActionsCellItem
        icon={
          params.row.status === DeviceStatus.ACTIVE ? (
            <Tooltip title="Mark as inactive">
              <ToggleOnIcon color="success" sx={{ fontSize: "36px" }} />
            </Tooltip>
          ) : (
            <Tooltip title="Mark as active">
              <ToggleOffOutlinedIcon
                color="warning"
                sx={{ fontSize: "36px" }}
              />
            </Tooltip>
          )
        }
        onClick={() => onClickToggleActiveStatus(params.row)}
        label={
          params.row.status === DeviceStatus.ACTIVE
            ? "Mark as inactive"
            : "Mark as active"
        }
      />
    );
    actions.push(
      <GridActionsCellItem
        icon={<AddTaskIcon color="primary" />}
        onClick={() => onClickUpdateLimit(params.row)}
        label="Update limit"
        showInMenu
      />
    );
    if (params.row.assignStatus === DeviceAssignStatus.NOT_ASSIGNED) {
      actions.push(
        <GridActionsCellItem
          icon={
            <Tooltip title="Assign to user">
              <VerifiedUserIcon color="primary" sx={{ fontSize: "24px" }} />
            </Tooltip>
          }
          onClick={() => onClickAssignDeviceToUser(params.row)}
          label="Assign to user"
          showInMenu
        />
      );
    } else {
      actions.push(
        <GridActionsCellItem
          icon={
            <Tooltip title="View user info">
              <AccountCircleIcon color="info" sx={{ fontSize: "24px" }} />
            </Tooltip>
          }
          onClick={() => onClickViewUserInfo(params.row)}
          label="View user info"
          showInMenu
        />
      );
    }
    return actions;
  };

  const getColumns = () => {
    return [
      ...columns,
      {
        field: "actions",
        type: "actions",
        getActions: (params: GridRowParams<Device>) => getRowActions(params),
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
      <AdminDeviceListFilter
        isLoading={isSearchLoading}
        onFilterReset={() => {
          console.log("Here");
          setSerial("");
          setUser("");
          setDeviceStatus("");
          setAssignedStatus("");
        }}
        onFilterUpdate={(
          updatedSerial,
          updatedUser,
          updatedStatus,
          updatedAssignedStatus
        ) => {
          updatedSerial && setSerial(updatedSerial);
          updatedUser && setUser(updatedUser);
          updatedStatus && setDeviceStatus(updatedStatus);
          updatedAssignedStatus && setAssignedStatus(updatedAssignedStatus);
        }}
      />
      <DeviceListTable<Device>
        rows={devices}
        rowHeight={64}
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

      {showToggleStatusConfirm && deviceToToggle ? (
        <ConfirmDialog
          title={
            deviceToToggle.status === DeviceStatus.ACTIVE
              ? "Confirm to make device inactive"
              : "Confirm to make device active"
          }
          subTitle={
            deviceToToggle.status === DeviceStatus.ACTIVE
              ? `Device (serial: ${deviceToToggle.serial}) will be inactive and data will not be tracked`
              : `Device (serial: ${deviceToToggle.serial}) will be active and data will be tracked`
          }
          show={showToggleStatusConfirm}
          onCancel={onCancelToggleStatus}
          onConfirm={onConfirmToggleStatus}
          isLoading={isToggleStatusLoading}
          confirmColor={
            deviceToToggle.status === DeviceStatus.ACTIVE ? "error" : "primary"
          }
          cancelColor="secondary"
          confirmText={
            deviceToToggle.status === DeviceStatus.ACTIVE
              ? "Mark as inactive"
              : "Mark as active"
          }
          cancelText="Cancel"
        />
      ) : null}
      {showUserInfo && toShowUserInfoUserId ? (
        <AdminUserInfoDialog
          show={showUserInfo}
          userId={toShowUserInfoUserId}
          onClose={onCloseViewUserInfo}
        />
      ) : null}
      {showDeviceAssignDialog && deviceToAssign ? (
        <AdminDeviceAssignDialog
          device={deviceToAssign}
          show={showDeviceAssignDialog}
          onClose={onCloseDeviceAssign}
          onDeviceAssign={onDeviceAssign}
          loading={isDeviceAssigningLoading}
        />
      ) : null}
      {showDeviceLimitUpdateDialog && deviceToUpdateLimit ? (
        <AdminDeviceLimitUpdateDialog
          loading={isDeviceLimitUpdateLoading}
          onClose={onCloseUpdateLimit}
          show={showDeviceLimitUpdateDialog}
          device={deviceToUpdateLimit}
          onUpdateLimit={onUpdateLimit}
        />
      ) : null}
    </Box>
  );
}

export default AdminDeviceList;
