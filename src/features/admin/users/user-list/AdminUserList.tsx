import { Box, Chip, Tooltip } from "@mui/material";
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import ToggleOffOutlinedIcon from "@mui/icons-material/ToggleOffOutlined";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";

import React, { useCallback, useEffect, useState } from "react";
import DeviceListTable from "../../../../common/components/device/device-list-table/DeviceListTable";
import PageHeader from "../../../../common/components/page-header/PageHeader";
import { formatDateTime } from "../../../../common/util/util";
import { User } from "../../../../models";
import { UserWithDevice } from "../../../../models/user-with-device.model";
import { AddUserData, UserService } from "../../../../services";
import AdminUserListActionComponent from "./components/AdminUserListActionComponent";
import AdminUserListFilter from "./components/AdminUserListFilter";
import ConfirmDialog from "../../../../common/components/confirm-dialog/ConfirmDialog";
import AdminAddUserDialog from "./components/AdminAddUserDialog";

const columns: GridColDef[] = [
  {
    field: "email",
    headerName: "Email",
    sortable: false,
    flex: 1,
    disableColumnMenu: true,
  },
  {
    field: "fullName",
    headerName: "Name",
    sortable: false,
    flex: 1,
    disableColumnMenu: true,
  },
  {
    field: "createdAt",
    headerName: "Date registered",
    sortable: false,
    width: 300,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams<UserWithDevice>) => {
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
    field: "totalDevice",
    headerName: "Total Devices",
    sortable: false,
    width: 150,
    disableColumnMenu: true,
  },
  {
    field: "activeDevice",
    headerName: "Active Devices",
    sortable: false,
    width: 150,
    disableColumnMenu: true,
  },
  {
    field: "pendingDevice",
    headerName: "Pending approval",
    sortable: false,
    width: 150,
    disableColumnMenu: true,
  },
  {
    field: "status",
    headerName: "Status",
    sortable: false,
    width: 100,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams<UserWithDevice>) => {
      return (
        <Tooltip title={params.row.isActive ? "Active" : "Inactive"}>
          <Chip
            size="small"
            variant="outlined"
            color={params.row.isActive ? "success" : "error"}
            label={params.row.isActive ? "Active" : "Inactive"}
          />
        </Tooltip>
      );
    },
  },
];

function AdminUserList() {
  const [users, setUsers] = useState<UserWithDevice[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [isActive, setIsActive] = useState<boolean | undefined>(undefined);

  const [addingNewUser, setAddingNewUser] = useState(false);
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);

  // toggle status variables
  const [showToggleStatusConfirm, setShowToggleStatusConfirm] = useState(false);
  const [userToToggle, setUserToToggle] = useState<UserWithDevice | null>(null);
  const [isToggleStatusLoading, setIsToggleStatusLoading] = useState(false);
  // toggle status variables ends

  const { enqueueSnackbar } = useSnackbar();

  const loadUsers = async () => {
    try {
      setIsSearchLoading(true);
      const usersWithDevices = await UserService.fetchUsersWithDeviceStat({
        searchText: searchText ? searchText : undefined,
        isActive,
        page: currentPage + 1,
        perPage,
      });
      setTotal(usersWithDevices.total);
      setUsers(usersWithDevices.items);
    } catch (e) {
      enqueueSnackbar("Error while fetching users", {
        variant: "error",
      });
    } finally {
      setIsSearchLoading(false);
    }
  };

  const loadUsersCallback = useCallback(async () => {
    await loadUsers();
  }, [currentPage, perPage, searchText, isActive]);

  useEffect(() => {
    loadUsersCallback();
  }, [currentPage, perPage, searchText, isActive, loadUsersCallback]);

  // toggle active function starts
  const onClickToggleActiveStatus = (device: UserWithDevice) => {
    setUserToToggle(device);
    setShowToggleStatusConfirm(true);
  };
  const onCancelToggleStatus = () => {
    setUserToToggle(null);
    setShowToggleStatusConfirm(false);
  };

  const onConfirmToggleStatus = async () => {
    if (!userToToggle) {
      return;
    }
    const wasUserActive = userToToggle.isActive;
    try {
      setIsToggleStatusLoading(true);
      await UserService.updateUserStatus({
        id: userToToggle.id,
        isActive: !wasUserActive,
      });
      enqueueSnackbar(
        `User status changed to ${wasUserActive ? "inactive" : "active"}`,
        {
          variant: "success",
        }
      );
      loadUsers();
    } catch (e: any) {
      enqueueSnackbar(
        e && e.message
          ? e.message
          : `Error while changing user status to  ${
              wasUserActive ? "inactive" : "active"
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

  const onAddUserClose = () => {
    setShowAddUserDialog(false);
  };

  const addNewUserClick = () => {
    setShowAddUserDialog(true);
  };

  const onAddUser = async (data: AddUserData) => {
    try {
      setAddingNewUser(true);
      await UserService.addUser(data);
      enqueueSnackbar("User successfully added", {
        variant: "success",
      });
      loadUsers();
    } catch (e: any) {
      enqueueSnackbar(
        e && e.message ? e.message : "Error while adding new user",
        {
          variant: "error",
        }
      );
    } finally {
      setAddingNewUser(false);
      onAddUserClose();
    }
  };

  const getColumns = () => {
    return [
      ...columns,
      {
        field: "actions",
        type: "actions",
        getActions: (params: GridRowParams<UserWithDevice>) => [
          <GridActionsCellItem
            icon={
              params.row.isActive ? (
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
            label={params.row.isActive ? "Mark as inactive" : "Mark as active"}
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
        title="Users"
        subTitle="All users in system"
        ActionComponent={
          <AdminUserListActionComponent
            onActionClick={addNewUserClick}
            loading={addingNewUser}
          />
        }
      />
      <AdminUserListFilter
        isLoading={isSearchLoading}
        onFilterReset={() => {
          setSearchText("");
          setIsActive(undefined);
        }}
        onFilterUpdate={(updatedSearchText, updatedIsActive) => {
          updatedSearchText && setSearchText(updatedSearchText);
          setIsActive(updatedIsActive);
        }}
      />
      <DeviceListTable<UserWithDevice>
        rows={users}
        columns={getColumns()}
        isLoading={isSearchLoading}
        page={currentPage}
        perPage={perPage}
        total={total}
        onPageChange={(newPage) => setCurrentPage(newPage)}
        onPerPageChange={(newPerPage) => setPerPage(newPerPage)}
      />
      {showToggleStatusConfirm && userToToggle ? (
        <ConfirmDialog
          title={
            userToToggle.isActive
              ? "Confirm to make user inactive"
              : "Confirm to make user active"
          }
          subTitle={
            userToToggle.isActive
              ? `User (email: ${userToToggle.email}) will be inactive and will not be able to login`
              : `User (email: ${userToToggle.email}) will be active and will be able to login`
          }
          show={showToggleStatusConfirm}
          onCancel={onCancelToggleStatus}
          onConfirm={onConfirmToggleStatus}
          isLoading={isToggleStatusLoading}
          confirmColor={userToToggle.isActive ? "error" : "primary"}
          cancelColor="secondary"
          confirmText={
            userToToggle.isActive ? "Mark as inactive" : "Mark as active"
          }
          cancelText="Cancel"
        />
      ) : null}
      <AdminAddUserDialog
        loading={addingNewUser}
        onClose={onAddUserClose}
        show={showAddUserDialog}
        onAddUser={onAddUser}
      />
    </Box>
  );
}

export default AdminUserList;
