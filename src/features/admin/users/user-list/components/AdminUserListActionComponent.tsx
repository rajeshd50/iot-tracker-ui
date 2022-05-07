import { Box, Button, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";

export interface IAdminUserListActionComponentProps {
  onActionClick: () => void;
  loading: boolean;
}

function AdminUserListActionComponent({
  onActionClick,
  loading,
}: IAdminUserListActionComponentProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Button
        startIcon={
          loading ? (
            <CircularProgress color="primary" size="16px" />
          ) : (
            <AddIcon />
          )
        }
        disabled={loading}
        color="primary"
        variant="contained"
        onClick={onActionClick}
      >
        Add new user
      </Button>
    </Box>
  );
}

export default AdminUserListActionComponent;
